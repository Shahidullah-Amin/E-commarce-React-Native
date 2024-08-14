import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, FlatList, ScrollView, Image } from 'react-native';
import Header from '../components/home-screen-components/Header'
import SearchBar from '../components/home-screen-components/SearchBar';
import HomeProductCard from '../components/home-screen-components/HomeProductCard';
import { setImageUrl } from '../helpers/ImageHelpers';







const apiBaseUrl = 'http://127.0.0.1:8000/chak/api/';

const fetchBrands = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}brands/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}categories/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

const fetchSubCategories = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}sub-categories/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return [];
  }
};

const fetchBestSellingProducts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/chak/api/best-selling-products/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch best selling products:", error);
    return [];
  }
};




const HomeScreen = () => {

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      const brandsData = await fetchBrands();
      const categoriesData = await fetchCategories();
      const subCategoriesData = await fetchSubCategories();
      const bestSellingData = await fetchBestSellingProducts();

      setBrands(brandsData);
      setCategories(categoriesData);
      setSubCategories(subCategoriesData);
      setBestSelling(bestSellingData);
    };

    loadData();
  }, []);








  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={{ uri: item.image ? item.image.replace('http://127.0.0.1:8000/media/', '').replace('https%3A', 'https://') : 'https://via.placeholder.com/150' }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.category_name}</Text>
    </TouchableOpacity>
  );




  const renderBrandItem = ({ item }) => {


    return (

      <TouchableOpacity key={item.id} style={styles.brandItem}>
          <Image source={{ uri: setImageUrl(item.brand_image)}} style={styles.brandLogo} resizeMode="cover" />
          <Text style={styles.brandName} numberOfLines={1} ellipsizeMode="tail">{item.brand_name}</Text>
        </TouchableOpacity>

    )
  }

  const renderSubcategories = (sub_categories, category) => (
    <View style={styles.subcategoryContainer}>
      <Text style={styles.subcategoryTitle}>{category}</Text>
      <View style={styles.subcategoryProductsContainer}>
        {sub_categories.map(s_category => (
          <TouchableOpacity key={s_category.id} style={styles.subcategoryProductItem}>
            {console.log(setImageUrl(s_category.image).replace('/media/', ''))}
            <Image source={{ uri: setImageUrl(s_category.image).replace('/media/', '') }} style={styles.subcategoryProductImage} />
            <Text style={styles.subcategoryProductOverlayText}>{s_category.category_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );





  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
          {/*  Header Area  'components/home-screen-components/Header.js' */}
          <Header backgroundColor={'rgba(7, 22, 46,0)'} />
          {/* Brands  */}
          <FlatList
            data={brands}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsContainer}
          />
          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
          {/* Best selling products */}
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <FlatList
            data={bestSelling}
            renderItem={({ item }) => <HomeProductCard item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
          {/* Suggested products */}
          <Text style={styles.sectionTitle}>Suggested</Text>
          <FlatList
            data={bestSelling}
            renderItem={({ item }) => <HomeProductCard item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
          {/* Subcategories */}
          <View style={styles.subcategoriesContainer}>
            {categories.map(category => (
              <View key={category.id}>
                {renderSubcategories(category.sub_categories, `${category.category_name}`)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    paddingBottom: 60,
  },
  brandsContainer: {
    paddingBottom: 20,
  },
  brandItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  brandLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  brandName: {
    marginTop: 5,
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    width: 70,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  categoriesContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  categoryItem: {
    marginRight: 10,
  },
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },

  subcategoriesContainer: {
    marginTop: 20,
  },
  subcategoryContainer: {
    marginBottom: 20,
  },
  subcategoryTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Arial',
    marginBottom: 10,
  },
  subcategoryProductsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subcategoryProductItem: {
    width: '48%',
    marginBottom: 10,
  },
  subcategoryProductImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  subcategoryProductOverlayText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'black',
    padding: 5,
    fontSize: 12,
    textAlign: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default HomeScreen;
