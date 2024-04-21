import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {Colors, Fontsize, Spacing, Typography} from '../theme';

interface Tabs {
  label: string;
}

interface TabsProps {
  tabs: Tabs[];
  activeTab: number;
  onTabPress: (index: number) => void;
  tabStyle?: object;
  activeTabStyle?: object;
  textStyle?: object;
  activeTextStyle?: object;
  inactiveTabStyle?: object;
  inactiveTextStyle?: object;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabPress,
  tabStyle = {},
  activeTabStyle = {},
  textStyle = {},
  activeTextStyle = {},
  inactiveTabStyle,
  inactiveTextStyle,
}) => {
  return (
    <View style={[styles.tabContainer, tabStyle]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onTabPress(index)}
          style={[
            styles.tab,
            activeTab === index
              ? [styles.activeTab, activeTabStyle]
              : inactiveTabStyle,
          ]}>
          <Text
            style={[
              styles.tabText,
              activeTab === index
                ? [styles.activeTabText, activeTextStyle]
                : inactiveTextStyle,
              textStyle,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 2,
  },
  activeTab: {
    borderBottomWidth: 1.5,
    borderColor: Colors.grey,
  },
  tabText: {
    color: Colors.lightGrey,
    fontFamily: Typography.Regular,
    fontSize: Fontsize.description,
  },
  activeTabText: {
    color: Colors.grey,
    fontFamily: Typography.Regular,
    fontSize: Fontsize.description,
  },
});

export default Tabs;
