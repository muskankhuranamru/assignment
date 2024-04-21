import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Spacing, Typography} from '../theme';
import {Image} from 'react-native';
import Fontsize from '../theme/Fontsize';

interface HeaderProps {
  title: string;
  containerStyle?: ViewStyle;
  showInfoIcon?: boolean;
  onPressInfoIcon?: () => void;
  showTitle?: boolean;
  rightIconSource?: ImageSourcePropType;
}

const Header: React.FC<HeaderProps> = ({
  title,
  containerStyle,
  showInfoIcon,
  onPressInfoIcon,
  showTitle = true,
  rightIconSource,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleBackPress}>
        <Image
          style={[styles.icon]}
          source={require('../assets/images/back.png')}
        />
      </TouchableOpacity>
      {showTitle && <Text style={styles.headerTitle}>{title}</Text>}
      {showInfoIcon && (
        <TouchableOpacity
          style={styles.iconContainer2}
          onPress={onPressInfoIcon}>
          <Image style={[styles.icon]} source={rightIconSource} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.large,
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerTitle: {
    fontSize: Fontsize.subHeading,
    color: Colors.grey,
    fontFamily: Typography.bold,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    paddingRight: Spacing.large,
    paddingLeft: Spacing.small,
  },
  iconContainer2: {
    position: 'absolute',
    right: 0,
    paddingRight: Spacing.large,
    paddingLeft: Spacing.medium,
  },
  icon: {height: 36, width: 36},
});

export default Header;
