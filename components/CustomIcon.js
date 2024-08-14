import { View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomIcon = ({ name, color, size, badgeNumber = 0, badgeColor = 'white', badgeBackgroundColor = '#027aa6' , style}) => {

    return (
        <View style={[styles.container,style]}>
            <View style={styles.badgeContainer}>
                {badgeNumber > 0 && (
                    <Badge style={[styles.badge, {backgroundColor:badgeBackgroundColor , color:badgeColor}]}>{badgeNumber}</Badge>
                )}
                <Icon
                    name={name}
                    color={color}
                    size={size}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        zIndex: 1,
    },
});

export default CustomIcon;
