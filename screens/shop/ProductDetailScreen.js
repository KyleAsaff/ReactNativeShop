import React from 'react';
import {
  View, Text, Image, StyleSheet, Button, ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = (props) => {
  const { navigation } = props;
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector(
    (state) => state.products.availableProducts.find((product) => product.id === productId),
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Card" onPress={() => {}} />
      </View>
      <Text style={styles.price}>
        $
        {selectedProduct.price.toFixed(2)}
      </Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam('productTitle'),
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
