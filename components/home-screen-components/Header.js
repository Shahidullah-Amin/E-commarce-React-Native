import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import CustomIcon from '../CustomIcon';

const Header = ({ backgroundColor }) => {
    const navigation = useNavigation(); // Get navigation object using useNavigation hook

    return (
        <View style={[styles.header, { backgroundColor: backgroundColor }]}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}></Text>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.notificationIcon}>
                    <CustomIcon name="bell-outline" size={30} color="black" badgeNumber={2} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3, // Add elevation for a card-like effect
        marginBottom: 10,
        paddingLeft: 0
    },
    logoContainer: {
        backgroundColor: 'rgba(0,0,0,0)', // Green background color for the logo container
        paddingBottom: 6,
        borderRadius: 10,
    },
    logoText: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Arial', // Font family for the logo text
        fontWeight: 'bold',
    },
    headerIcons: {
        paddingLeft:10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        marginRight: 10,
    },
    notificationIcon: {
        marginLeft: 10,
    },
});

export default Header;
