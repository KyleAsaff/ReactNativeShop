import React from 'react';
import { Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer
});

export default function App() {
  return (
    <Provider store={store}>
    <View>
      <Text>A new app!</Text>
    </View>
    </Provider>
  );
}
