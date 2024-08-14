import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    FlatList,
    Text,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

const SearchingScreen = ({ navigation }) => {
    const [previousSearches, setPreviousSearches] = useState([
        'Laptop',
        'Headphones',
        'Smartphone',
    ]);

    const searchSuggestionsData = [
        'Keyboard',
        'Mouse',
        'Monitor',
        'Laptop bag',
        'Bluetooth headphones',
        'Smartwatch',
        'Gaming mouse',
        'Computer monitor',
        'Desk lamp',
        'USB cable',
        'Wireless charger',
        'External hard drive',
        'Graphics card',
        'Smart TV',
        'Fitness tracker',
        'Power bank',
        'Earbuds',
        'Gaming headset',
        'Wireless keyboard',
    ];

    const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Computers', 'Mobile Phones'];

    const suggestedProducts = [
        { id: 1, name: 'Wireless Mouse', image: 'https://m.media-amazon.com/images/I/61agI90cKJL.AC_UF1000,1000_QL80.jpg' },
        { id: 2, name: 'Bluetooth Speaker', image: 'https://m.media-amazon.com/images/I/81-GfDZuAOL.AC_UF894,1000_QL80.jpg' },
        { id: 3, name: 'Gaming Keyboard', image: 'https://m.media-amazon.com/images/I/71d7UKkg6xL.AC_SL1500.jpg' },
    ];

    const [searchText, setSearchText] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef(null);

    const handleInputChange = (text) => {
        setSearchText(text);
        if (text.length > 0) {
            setShowSuggestions(true);
            const filtered = searchSuggestionsData.filter((suggestion) =>
                suggestion.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                inputRef.current?.focus();
            }
        );

        inputRef.current?.focus();

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSearchClear = () => {
        setSearchText('');
        setShowSuggestions(false);
    };

    const handleRemovePreviousSearch = (item) => {
        setPreviousSearches((prevSearches) =>
            prevSearches.filter((search) => search !== item)
        );
    };

    const handleSearch = (query, type) => {
        navigation.navigate('SearchResults', { data: { query, type } });
    };

    const renderSuggestionItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleSearch(item, 1)}>
            <View style={styles.suggestionItem}>
                <MaterialIcons name="search" size={24} color="black" style={styles.suggestionIcon} />
                <Text style={styles.suggestionText}>{item}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderProductItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleSearch(item.name, 1)}>
            <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleSearch(item, 2)}>
            <View style={styles.item}>
                <Text>{item}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderPreviousSearchItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleSearch(item, 3)}>
            <View style={styles.previousSearchItem}>
                <Text style={styles.previousSearchText}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemovePreviousSearch(item)} style={styles.removeIconContainer}>
                    <MaterialIcons name="close" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderContent = () => {
        if (showSuggestions) {
            return (
                <FlatList
                    data={filteredSuggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSuggestionItem}
                    keyboardShouldPersistTaps="always"
                />
            );
        } else {
            return (
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Suggested Products</Text>
                        <FlatList
                            data={suggestedProducts}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderProductItem}
                            keyboardShouldPersistTaps="always"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderCategoryItem}
                            keyboardShouldPersistTaps="always"
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Previous Searches</Text>
                        <FlatList
                            data={previousSearches}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderPreviousSearchItem}
                            keyboardShouldPersistTaps="always"
                        />
                    </View>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <MaterialIcons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.searchContainer}>
                            <MaterialIcons name="search" size={24} color="gray" style={styles.icon} />
                            <TextInput
                                ref={inputRef}
                                style={styles.input}
                                placeholder="Search for products"
                                placeholderTextColor="gray"
                                onChangeText={handleInputChange}
                                value={searchText}
                                autoFocus={true}
                                onSubmitEditing={() => handleSearch(searchText)}
                            />
                            {searchText ? (
                                <TouchableOpacity onPress={handleSearchClear} style={styles.iconContainer}>
                                    <MaterialIcons name="close" size={24} color="gray" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.iconContainer}>
                                    <MaterialIcons name="camera-alt" size={24} color="gray" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <FlatList
                        data={[]}
                        ListHeaderComponent={renderContent}
                        keyExtractor={(_, index) => index.toString()}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingRight: 10,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 2,
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
        color: 'black',
        height: 40,
        paddingHorizontal: 2,
    },
    contentContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    suggestionIcon: {
        marginRight: 10,
    },
    suggestionText: {
        fontSize: 16,
        color: 'black',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    productName: {
        fontSize: 16,
    },
    previousSearchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        marginRight: 10,
    },
    previousSearchText: {
        fontSize: 16,
        flex: 1,
    },
    removeIconContainer: {
        padding: 5,
    },
});

export default SearchingScreen;
