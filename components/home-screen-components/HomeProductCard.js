import { useState } from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";


const HomeProductCard = ({ item }) => {

    const p_image = item.product_images[1].image;

    const [source, setSource] = useState({ uri: p_image.replace('http://127.0.0.1:8000/media/', '').replace('http%3A', 'https:/') })


    return (
        <TouchableOpacity style={styles.productItem}>
            <Image
                source={source}
                style={styles.productImage}
                onError={() => {

                    setSource({ uri: 'https://via.placeholder.com/150' })
                }}
            />
            {/* <Text style={styles.productText}>{item.product_name}</Text> */}
        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    productsContainer: {
        marginBottom: 20,
    },
    productItem: {
        marginRight: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    productText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginTop: 5,
    },
})


export default HomeProductCard;