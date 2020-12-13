import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  try {
    const response = await fetch(
      `https://reactnativeshop-6be78-default-rtdb.firebaseio.com/orders/${userId}.json`,
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    const loadedOrders = [];

    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date),
        ),
      );
    }
    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  } catch (err) {
    throw err;
  }
};

export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const { userId } = getState().auth;
  const date = new Date();
  const response = await fetch(
    `https://reactnativeshop-6be78-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date,
    },
  });

  for (const cartItem of cartItems) {
    const pushToken = cartItem.productPushToken;

    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        title: 'Order was placed!',
        body: cartItem.productTitle,
      }),
    });
  }
};
