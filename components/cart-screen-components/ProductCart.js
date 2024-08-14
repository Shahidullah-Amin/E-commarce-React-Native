import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = () => {
  return (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: 'https://m.media-amazon.com/images/I/815eN0AS-CL._AC_AA180_.jpg' }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>Apple iPhone 15 Pro Max (256 GB) - Mavi Titanyum</Text>
        <View style={styles.productPriceBlock}>
          <Text style={styles.productPrice}>77.799,00 TL</Text>
        </View>
        <Text style={styles.productAvailability}>Stokta var</Text>
        <Text style={styles.productShipping}>Kargo Bedava Kapsamında</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  productImage: {
    width: 90,
    height: 90,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  productPriceBlock: {
    marginTop: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  productAvailability: {
    fontSize: 12,
    color: '#006400', // green color for available
    marginTop: 4,
  },
  productShipping: {
    fontSize: 12,
    color: '#006400', // green color for available
  },
});

export default ProductCard;
