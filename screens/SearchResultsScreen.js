import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import SearchProductCard from '../components/cart-screen-components/SearchProductCard';

const SearchResultsScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const { query, type } = data;

  const [searchText, setSearchText] = useState(query);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const sortModalAnimation = useRef(new Animated.Value(0)).current;
  const filterModalAnimation = useRef(new Animated.Value(0)).current;

  const products = [
    {
      id: '1',
      name: 'Product 1',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/0000FF',
        'https://via.placeholder.com/150/FFFF00',
      ],
      price: 100,
      rating: 4.5,
      discount: '10%',
      brand: 'Brand A',
      color: 'Red',
      seller: 'Seller 1',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Product 2',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/00FF00',
        'https://via.placeholder.com/150/FF00FF',
      ],
      price: 200,
      rating: 4.0,
      discount: '15%',
      brand: 'Brand B',
      color: 'Blue',
      seller: 'Seller 2',
      category: 'Fashion',
    },
    {
      id: '3',
      name: 'Product 3',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/FF0000',
        'https://via.placeholder.com/150/0000FF',
      ],
      price: 300,
      rating: 3.5,
      discount: '20%',
      brand: 'Brand C',
      color: 'Green',
      seller: 'Seller 3',
      category: 'Home & Kitchen',
    },
    {
      id: '4',
      name: 'Product 3',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/FF0000',
        'https://via.placeholder.com/150/0000FF',
      ],
      price: 300,
      rating: 3.5,
      discount: '20%',
      brand: 'Brand C',
      color: 'Green',
      seller: 'Seller 3',
      category: 'Home & Kitchen',
    },
    {
      id: '5',
      name: 'Product 3',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/FF0000',
        'https://via.placeholder.com/150/0000FF',
      ],
      price: 300,
      rating: 3.5,
      discount: '20%',
      brand: 'Brand C',
      color: 'Green',
      seller: 'Seller 3',
      category: 'Home & Kitchen',
    },
    {
      id: '6',
      name: 'Product 3',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/FF0000',
        'https://via.placeholder.com/150/0000FF',
      ],
      price: 300,
      rating: 3.5,
      discount: '20%',
      brand: 'Brand C',
      color: 'Green',
      seller: 'Seller 3',
      category: 'Home & Kitchen',
    },
  ];

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [query]);

  const handleInputChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (criterion) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (criterion === 'price') {
        return a.price - b.price;
      } else if (criterion === 'rating') {
        return b.rating - a.rating;
      } else if (criterion === 'discount') {
        return parseInt(b.discount) - parseInt(a.discount);
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
    toggleSortModal();
  };

  const toggleSortModal = () => {
    if (sortModalVisible) {
      Animated.timing(sortModalAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setSortModalVisible(false));
    } else {
      setSortModalVisible(true);
      Animated.timing(sortModalAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleFilterModal = () => {
    if (filterModalVisible) {
      Animated.timing(filterModalAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setFilterModalVisible(false));
    } else {
      setFilterModalVisible(true);
      Animated.timing(filterModalAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search for products"
            placeholderTextColor="gray"
            onChangeText={handleInputChange}
            value={searchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.sortFilterContainer}>
          <TouchableOpacity onPress={toggleFilterModal} style={styles.sortFilterButton}>
            <MaterialIcons name="filter-list" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSortModal} style={styles.sortFilterButton}>
            <MaterialIcons name="sort" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.resultsHeader}>Search Results</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SearchProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 100 }}
      />
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={toggleSortModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  translateY: sortModalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity
              onPress={() => handleSort('price')}
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSort('rating')}
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSort('discount')}
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>Discount</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSortModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  translateY: filterModalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter By</Text>
            {/* Add your filtering options here */}
            <TouchableOpacity onPress={toggleFilterModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(7, 22, 46,0.9)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#333',
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 25,
    paddingHorizontal: 12,
    borderColor: 'gray',
    borderWidth: 0.5,
    flex: 1,
  },
  iconContainer: {
    marginLeft: 0,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    height: 40,
    paddingHorizontal: 2,
  },
  sortFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  sortFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 5,
  },
  sortFilterText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical:10,
    color: 'white',
  },
  row: {
    justifyContent: 'space-between',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#424242',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#ffffff',
  },
  modalCloseButton: {
    marginTop: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#027aa6',
  },
});

export default SearchResultsScreen;
