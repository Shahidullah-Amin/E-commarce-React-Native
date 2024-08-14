import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import SearchBar from '../components/home-screen-components/SearchBar';
import CustomIcon from '../components/CustomIcon';

const placeholderImage = 'https://via.placeholder.com/150';

const FavoriteItem = ({ item }) => {
    const [imageUri, setImageUri] = useState(item.image);

    const renderStars = () => {
        const stars = [];
        const rating = parseFloat(item.rating);
        const fullStars = Math.floor(rating);
        const remainder = rating - fullStars;

        for (let i = 1; i <= fullStars; i++) {
            stars.push(
                <CustomIcon
                    key={i}
                    name="star"
                    color="yellow"
                    size={18}
                />
            );
        }

        if (remainder > 0) {
            stars.push(
                <CustomIcon
                    key={fullStars + 1}
                    name="star-half"
                    color="yellow"
                    size={18}
                />
            );
        }

        for (let i = fullStars + 1 + (remainder > 0 ? 1 : 0); i <= 5; i++) {
            stars.push(
                <CustomIcon
                    key={i}
                    name="star-outline"
                    color="#bbb"
                    size={18}
                />
            );
        }

        return stars;
    };

    const handleRemoveFromFavorites = () => {
        // Remove from favorites logic...
    };

    return (
        <View style={styles.productCard}>
            <Image
                source={{ uri: imageUri }}
                style={styles.productImage}
                onError={() => setImageUri(placeholderImage)}
            />
            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFromFavorites}>
                <CustomIcon name="heart-remove-outline" color="red" size={25} />
            </TouchableOpacity>
            <View style={styles.productDetails}>
                <View style={styles.productTitleContainer}>
                    <Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
                </View>
                <Text style={styles.productAuthor}>{item.author}</Text>
                <View style={styles.productRating}>
                    {renderStars()}
                    <Text style={styles.ratingText}>({item.reviews})</Text>
                </View>
                <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.productPreviousPrice}>{item.previousPrice}</Text>
                </View>
                <Text style={styles.productDiscount}>{item.discount}</Text>
                <Text style={styles.dateAdded}>Added : {item.dateAdded}</Text>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const FavoritesScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [filterBy, setFilterBy] = useState('all');

    const favoriteItems = [
        {
            id: '1',
            title: 'Apple AirPods (3. nesil) ve MagSafe Şarj Kutusu',
            image: 'https://m.media-amazon.com/images/I/317wIEH5tjL._SS135_.jpg',
            author: 'Apple (Elektronik)',
            rating: '1.7 / 5 yıldız',
            reviews: '1.582',
            price: '5.899,00 TL',
            previousPrice: '6.359,00 TL',
            discount: '%7',
            dateAdded: '21 Mayıs 2024',
        },
        {
            id: '2',
            title: 'Samsung Galaxy Watch 4',
            image: 'https://m.media-amazon.com/images/I/41VIMjJ3fCS._SS135_.jpg',
            author: 'Samsung (Elektronik)',
            rating: '3.5 / 5 yıldız',
            reviews: '987',
            price: '2.299,00 TL',
            previousPrice: '2.599,00 TL',
            discount: '%12',
            dateAdded: '20 Mayıs 2024',
        },
        {
            id: '3',
            title: 'Sony WH-1000XM4 Kablosuz Gürültü Engelleme Kulaklık',
            image: 'https://m.media-amazon.com/images/I/61HvRERCIcL._SS135_.jpg',
            author: 'Sony (Elektronik)',
            rating: '4 / 5 yıldız',
            reviews: '2.345',
            price: '2.099,00 TL',
            previousPrice: '2.699,00 TL',
            discount: '%22',
            dateAdded: '19 Mayıs 2024',
        },
        {
            id: '4',
            title: 'Fitbit Charge 5 Akıllı Saat',
            image: 'https://m.media-amazon.com/images/I/81zkZvwrERL._SS135_.jpg',
            author: 'Fitbit (Spor)',
            rating: '2 / 5 yıldız',
            reviews: '534',
            price: '1.299,00 TL',
            previousPrice: '1.499,00 TL',
            discount: '%13',
            dateAdded: '18 Mayıs 2024',
        },
        {
            id: '5',
            title: 'Dell XPS 13 9310 Dizüstü Bilgisayar',
            image: 'https://m.media-amazon.com/images/I/61Cy-lJWg8L._SS135_.jpg',
            author: 'Dell (Bilgisayar)',
            rating: '3.5 / 5 yıldız',
            reviews: '1.145',
            price: '10.999,00 TL',
            previousPrice: '11.799,00 TL',
            discount: '%7',
            dateAdded: '17 Mayıs 2024',
        },
        {
            id: '6',
            title: 'Canon EOS R5 Aynasız Fotoğraf Makinesi',
            image: 'https://m.media-amazon.com/images/I/81OvGtHWDbL._SS135_.jpg',
            author: 'Canon (Kamera)',
            rating: '2.6 / 5 yıldız',
            reviews: '876',
            price: '31.999,00 TL',
            previousPrice: '34.999,00 TL',
            discount: '%9',
            dateAdded: '16 Mayıs 2024',
        },
        {
            id: '7',
            title: 'Sony PlayStation 5 Oyun Konsolu',
            image: 'https://m.media-amazon.com/images/I/71v8bXlZD2L._SS135_.jpg',
            author: 'Sony (Oyun)',
            rating: '2.8 / 5 yıldız',
            reviews: '3.476',
            price: '7.299,00 TL',
            previousPrice: '7.999,00 TL',
            discount: '%8',
            dateAdded: '15 Mayıs 2024',
        },
        {
            id: '8',
            title: 'Logitech G Pro X Kablolu Oyuncu Kulaklık',
            image: 'https://m.media-amazon.com/images/I/61k44iONuRL._SS135_.jpg',
            author: 'Logitech (Oyuncu Ekipmanları)',
            rating: '4.4 / 5 yıldız',
            reviews: '624',
            price: '1.299,00 TL',
            previousPrice: '1.499,00 TL',
            discount: '%13',
            dateAdded: '14 Mayıs 2024',
        },
        {
            id: '9',
            title: 'LG CX OLED 4K Ultra HD Akıllı TV',
            image: 'https://m.media-amazon.com/images/I/81QW44+U9XL._SS135_.jpg',
            author: 'LG (Televizyon)',
            rating: '4 / 5 yıldız',
            reviews: '1.238',
            price: '13.999,00 TL',
            previousPrice: '15.999,00 TL',
            discount: '%13',
            dateAdded: '13 Mayıs 2024',
        },
        {
            id: '10',
            title: 'Bose QuietComfort 45 Aktif Gürültü Önleyici Kulaklık',
            image: 'https://m.media-amazon.com/images/I/61yZ2NJd2+L._SS135_.jpg',
            author: 'Bose (Elektronik)',
            rating: '0.7 / 5 yıldız',
            reviews: '1.564',
            price: '2.999,00 TL',
            previousPrice: '3.499,00 TL',
            discount: '%14',
            dateAdded: '12 Mayıs 2024',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerContainer}>
                <SearchBar
                    placeholder="Search your favorites"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <BlurView intensity={50} style={styles.header}>
                    <Text style={styles.headerTitle}>My Favorites</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => setSortBy('price')}>
                            <CustomIcon name="filter" color="white" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFilterBy('category')}>
                            <CustomIcon name="tune" color="white" size={24} />
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
            <FlatList
                data={favoriteItems}
                renderItem={({ item }) => <FavoriteItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No favorites found.</Text>}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07162e',
    },
    headerContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerIcons: {
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    listContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 100,
    },
    productCard: {
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1e2a38',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    productImage: {
        width: 100,
        height: '100%',
        borderRadius: 5,
    },
    removeButton: {
        position: 'absolute',
        top: 3,
        left: 3,
        zIndex: 1, // Ensure the button is displayed on top
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 50,
        padding: 5,
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        borderRadius: 10,
    },
    productTitleContainer: {
        height: 45, // Adjust the height as needed for two lines of text
        marginBottom: 2,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    productAuthor: {
        fontSize: 14,
        color: '#999',
        marginBottom: 5,
    },
    productRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingText: {
        color: '#bbb',
        marginLeft: 5,
    },
    productPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f9c100',
        marginRight: 10,
    },
    productPreviousPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    productDiscount: {
        fontSize: 14,
        color: '#ff0000',
        marginBottom: 5,
    },
    dateAdded: {
        fontSize: 12,
        color: '#999',
    },
    addToCartButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addToCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});

export default FavoritesScreen;
