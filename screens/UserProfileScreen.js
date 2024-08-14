import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserAccountScreen = () => {

    const navigation = useNavigation(); 


    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');

            const response = await axios.post(
                'http://127.0.0.1:8000/chak/api/logout/',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (response.status === 200) {
                navigation.navigate('SignIn')
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Account</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <CustomIcon name="translate" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <CustomIcon name="cog" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Profile Image */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Hello, Shahidullah Amin</Text>
            </View>
            {/* Sections */}
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="account" size={24} color="#555" />
                <Text style={styles.sectionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="information-outline" size={24} color="#555" />
                <Text style={styles.sectionText}>User Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="package-variant-closed" size={24} color="#555" />
                <Text style={styles.sectionText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="credit-card-outline" size={24} color="#555" />
                <Text style={styles.sectionText}>Payments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="chart-bar" size={24} color="#555" />
                <Text style={styles.sectionText}>Statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="gift-outline" size={24} color="#555" />
                <Text style={styles.sectionText}>Gifts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="translate" size={24} color="#555" />
                <Text style={styles.sectionText}>Change Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <CustomIcon name="tune" size={24} color="#555" />
                <Text style={styles.sectionText}>Options</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section} onPress={logout} >
                <CustomIcon name="logout" size={24} color="#555" />
                <Text style={styles.sectionText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 8,

    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#555',
        borderRadius: 8,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#555',
    },
    profileName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#555',
    },
});

export default UserAccountScreen;
