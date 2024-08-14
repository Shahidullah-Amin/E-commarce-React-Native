import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native';

const CategoryScreen = () => {
  const categories = [
    {
      id: '1',
      name: 'Electronics',
      image: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UL320_.jpg',
      subcategories: [
        { name: 'Mobile Phones', image: 'https://via.placeholder.com/150' },
        { name: 'Laptops', image: 'https://via.placeholder.com/150' },
        { name: 'Computer', image: 'https://via.placeholder.com/150' },
        { name: 'Desktop', image: 'https://via.placeholder.com/150' },
        { name: 'SSD SATA', image: 'https://via.placeholder.com/150' },
        { name: 'Headphones', image: 'https://via.placeholder.com/150' }
      ],
    },
    {
      id: '2',
      name: 'Clothing',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Men', image: 'https://via.placeholder.com/150' },
        { name: 'Women', image: 'https://via.placeholder.com/150' },
        { name: 'Kids', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '3',
      name: 'Books',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Fiction', image: 'https://via.placeholder.com/150' },
        { name: 'Non-fiction', image: 'https://via.placeholder.com/150' },
        { name: 'Children', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '4',
      name: 'Home Decor',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Living Room', image: 'https://via.placeholder.com/150' },
        { name: 'Bedroom', image: 'https://via.placeholder.com/150' },
        { name: 'Kitchen', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '5',
      name: 'Sports',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Outdoor', image: 'https://via.placeholder.com/150' },
        { name: 'Indoor', image: 'https://via.placeholder.com/150' },
        { name: 'Fitness', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '6',
      name: 'Beauty',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Skincare', image: 'https://via.placeholder.com/150' },
        { name: 'Makeup', image: 'https://via.placeholder.com/150' },
        { name: 'Fragrances', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '7',
      name: 'Toys',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Action Figures', image: 'https://via.placeholder.com/150' },
        { name: 'Dolls', image: 'https://via.placeholder.com/150' },
        { name: 'Board Games', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '8',
      name: 'Food & Drink',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Snacks', image: 'https://via.placeholder.com/150' },
        { name: 'Beverages', image: 'https://via.placeholder.com/150' },
        { name: 'Cooking Essentials', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '9',
      name: 'Health & Fitness',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Supplements', image: 'https://via.placeholder.com/150' },
        { name: 'Fitness Equipment', image: 'https://via.placeholder.com/150' },
        { name: 'Health Monitors', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '10',
      name: 'Furniture',
      image: 'https://via.placeholder.com/500x300',
      subcategories: [
        { name: 'Living Room', image: 'https://via.placeholder.com/150' },
        { name: 'Bedroom', image: 'https://via.placeholder.com/150' },
        { name: 'Outdoor', image: 'https://via.placeholder.com/150' },
      ],
    },
  ];

  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.subcategory}>
      <Image source={{ uri: item.image }} style={styles.subcategoryImage} />
      <Text style={styles.subcategoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity>
        <ImageBackground source={{ uri: item.image }} style={styles.categoryImage}>
          <Text style={styles.categoryName}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <FlatList
        data={item.subcategories}
        renderItem={renderSubcategoryItem}
        keyExtractor={(subItem, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subcategoriesContainer}
      />
    </View>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(7, 22, 46, 0.9)',
  },
  categoryContainer: {
    marginBottom: 50,
  },
  categoryImage: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subcategoriesContainer: {
    marginTop: 10,
  },
  subcategory: {
    marginRight: 10,
  },
  subcategoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  subcategoryName: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default CategoryScreen;
