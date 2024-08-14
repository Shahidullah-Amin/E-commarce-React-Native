import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import CustomIcon from '../components/CustomIcon';

const CartScreen = () => {
    const products = [
        {
            id: '1',
            title: 'Apple iPhone 15 Pro Max (256 GB) - Mavi Titanyum',
            price: '77.799,00 TL',
            imageUri: 'https://m.media-amazon.com/images/I/815eN0AS-CL._AC_AA180_.jpg',
            availability: 'Stokta var',
            shipping: 'Kargo Bedava Kapsamında',
            quantity: 1,
        },
        {
            id: '2',
            title: 'Samsung Galaxy S22 Ultra (512 GB) - Phantom Black',
            price: '89.999,00 TL',
            imageUri: 'https://m.media-amazon.com/images/I/61YlrrL-HqL._AC_SX569_.jpg',
            availability: 'Stokta var',
            shipping: 'Ücretsiz ve Hızlı Kargo',
            quantity: 2,
        },
        {
            id: '3',
            title: 'Sony PlayStation 5 - 1 TB SSD',
            price: '6.999,00 TL',
            imageUri: 'https://m.media-amazon.com/images/I/619BkvKW35L._AC_UY218_.jpg',
            availability: 'Sınırlı Stok',
            shipping: 'Kargo Bedava Kapsamında',
            quantity: 3,
        },
        {
            id: '4',
            title: 'Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage) - Space Gray',
            price: '27.999,00 TL',
            imageUri: 'https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_SX569_.jpg',
            availability: 'Stokta var',
            shipping: 'Ücretsiz Kargo',
            quantity: 1,
        },

    ];

    const incrementQuantity = (id) => {
        console.log(`Incremented quantity for product with id ${id}`);
    };

    const decrementQuantity = (id) => {
        console.log(`Decremented quantity for product with id ${id}`);
    };

    const removeFromCart = (id) => {
        console.log(`Removed product with id ${id} from cart`);
    };

    const clearCart = () => {
        console.log('Cleared all products from cart');
    };

    const calculateTotal = () => {
        return products.reduce((total, product) => total + parseFloat(product.price.replace(/[^\d,]/g, '').replace(',', '.')) * product.quantity, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <BlurView intensity={80} style={styles.header}>
                <View style={styles.headerContent}>
                    <CustomIcon name="cart-variant" color="white" size={30} style={styles.cartIcon} />
                    <Text style={styles.headerTitle}>My Cart</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => console.log('Filter by category')} style={styles.headerButton}>
                        <CustomIcon name="delete-empty" color="#FF6000" size={28} />
                    </TouchableOpacity>
                </View>
            </BlurView>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContentContainer}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.imageUri }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <View style={styles.productPriceBlock}>
                                <Text style={styles.productPrice}>{item.price}</Text>
                            </View>
                            <Text style={styles.productAvailability}>{item.availability}</Text>
                            <Text style={styles.productShipping}>{item.shipping}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
                                    <CustomIcon name="minus" size={15} color="#e74c3c" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
                                    <CustomIcon name="plus" size={15} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                            <Ionicons name="trash" size={25} color="#FF6000" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            {/* Proceed to Payment */}
            <BlurView intensity={100} tint='dark' style={styles.footer}>
                <Text style={styles.totalText}>Total: {calculateTotal()} TL</Text>
                <TouchableOpacity style={styles.paymentButton}>
                    <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        paddingTop:40
    },
    header: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: 15,
    },
    listContentContainer: {
        paddingTop:10,
        paddingBottom: 200,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C2C2C',
        borderWidth: 1,
        borderColor: '#444',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 12,
        marginHorizontal: 16,
    },
    productImage: {
        width: 80,
        height: 100,
        marginRight: 12,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F5F5F5',
    },
    productPriceBlock: {
        marginTop: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f9c100',
    },
    productAvailability: {
        fontSize: 12,
        color: '#32CD32',
        marginTop: 4,
    },
    productShipping: {
        fontSize: 12,
        color: '#32CD32',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 8,
        color: '#F5F5F5',
    },
    removeButton: {
        marginLeft: 8,
    },
    footer: {
        backgroundColor: '#2C2C2C',
        padding: 16,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#444',
        position: 'absolute',
        bottom: 85,
        width: '100%',
        zIndex: 1,
        elevation: 5,
    },
    totalText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    paymentButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default CartScreen;