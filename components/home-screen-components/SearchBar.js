import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Animated, Text } from 'react-native';
import CustomIcon from '../CustomIcon'; // Import the CustomIcon component
import { useNavigation } from '@react-navigation/native';


const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const clearIconOpacity = useRef(new Animated.Value(0)).current;



    const navigator = useNavigation();


    const handleInputChange = (text) => {
        setSearchText(text);
        // Show clear icon if input is not empty
        if (text) {
            Animated.timing(clearIconOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(clearIconOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    const clearSearchText = () => {
        setSearchText('');
        // Hide clear icon
        Animated.timing(clearIconOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const onFocus = () => {

        navigator.navigate('Searching',{query:searchText})
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const openCamera = () => {
        // Logic to open the camera
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBarContainer}>
                    <CustomIcon name="magnify" size={24} color="gray" style={[styles.icon]} />
                    <TextInput
                        placeholder="Search products, brands, and categories"
                        style={styles.searchInput}
                        placeholderTextColor="gray"
                        onChangeText={handleInputChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={searchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity style={styles.iconContainer} onPress={clearSearchText}>
                            <Animated.View style={{ opacity: clearIconOpacity }}>
                                <CustomIcon name="close-circle-outline" size={25} color="red" style={styles.icon} />
                            </Animated.View>
                        </TouchableOpacity>
                    )}
                    {!isFocused && !searchText && (
                        <TouchableOpacity style={styles.iconContainer} onPress={openCamera}>
                            <CustomIcon name="camera" size={27} color="gray" style={[styles.icon, {marginRight:0}]} />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={styles.addressContainer} onPress={() => console.log("Address pressed")}>
                    <CustomIcon name="map-marker-account" size={24} color="orange" style={styles.addressIcon} />
                    <Text numberOfLines={1} style={styles.addressText}>
                        Main St, City, Country
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex:100,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // Slightly darker than white
        width: '85%', // Adjusted to take 85% of the container width
    },
    icon: {
        marginHorizontal: 2 ,
    },
    searchInput: {

        flex: 1,
        height: 50,
        fontSize: 17,
        color: '#333',
        backgroundColor:'white'
    },
    iconContainer: {
        padding: 7,
        backgroundColor:'white'
    },
    addressContainer: {
        height: 50,
        flex:1,
        borderColor:'gray',
        borderWidth:0,
        borderLeftWidth:'1px',
        flexDirection: 'column',
        alignItems: 'center',
        width: '15%',
        backgroundColor:'white'
    },
    addressIcon: {
        marginRight: 5,
    },
    addressText: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Arial',
    },
});

export default SearchBar;