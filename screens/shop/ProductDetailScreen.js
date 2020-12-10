import React from 'react';
import {
  View, Text, Image, StyleSheet, Button, ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = (props) => {
  const { navigation } = props;
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector(
    (state) => state.products.availableProducts.find((product) => product.id === productId),
  );
  return (
    <View>
      <Text>
        {selectedProduct.title}
      </Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam('productTitle'),
});

const styles = StyleSheet.create({});

export default ProductDetailScreen;
