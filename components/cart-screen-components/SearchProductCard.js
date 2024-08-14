import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomIcon from '../CustomIcon';

const SearchProductCard = ({ item }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
    };

    const renderStarRating = () => {
        const stars = [];
        const rating = parseFloat(item.rating);
        const fullStars = Math.floor(rating);
        const remainder = rating - fullStars;

        for (let i = 1; i <= fullStars; i++) {
            stars.push(
                <CustomIcon
                    key={i}
                    name="star"
                    color="#f9c100"
                    size={18}
                />
            );
        }

        if (remainder > 0) {
            stars.push(
                <CustomIcon
                    key={fullStars + 1}
                    name="star-half"
                    color="#f9c100"
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

    return (
        <View style={styles.productCard}>
            <TouchableOpacity onPress={handleNextImage}>
                <Image
                    source={{ uri: item.images[currentImageIndex] }}
                    style={styles.productImage}
                />
            </TouchableOpacity>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productPrice}>{`$${item.price}`}</Text>
            <Text style={styles.productDiscount}>Discount: {item.discount}</Text>
            <View style={styles.productRating}>
                {renderStarRating()}
            </View>
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
                <CustomIcon name="heart-outline" size={24} color="#FF6347" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: '#1e2a38',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '47%',
        marginHorizontal: '1.5%',
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#fff',
    },
    productBrand: {
        fontSize: 14,
        color: '#999',
    },
    productPrice: {
        fontSize: 14,
        color: '#f9c100',
    },
    productDiscount: {
        fontSize: 12,
        color: '#ff0000',
    },
    productRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    addToCartButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addToCartButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default SearchProductCard;
