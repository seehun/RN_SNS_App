import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';

import home_on from '../assets/icons/bottomTab/home_on.png';
import home from '../assets/icons/bottomTab/home.png';
import search from '../assets/icons/bottomTab/search.png';
import search_on from '../assets/icons/bottomTab/search_on.png';
import add from '../assets/icons/bottomTab/add_circle.png';
import play from '../assets/icons/bottomTab/auto_read_play.png';
import play_on from '../assets/icons/bottomTab/auto_read_play_on.png';
import person from '../assets/icons/bottomTab/person.png';
import person_on from '../assets/icons/bottomTab/person_on.png';

const CustomBottomTabs = ({state, navigation, insets, descriptors}) => {
  //   console.log(state, navigation, descriptors, insets);
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;
  const tab5Value = useRef(new Animated.Value(0)).current;

  const scaleAnimated = (value, animatedValue) =>
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 150,
    });

  const animatedValue = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
    4: tab5Value,
  };

  return (
    <View style={[styles.bottomTabsWrapper]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        const animatedOf = animatedValue[index];

        const iconFlag = bool => {
          switch (label) {
            case 'Home':
              return bool ? home_on : home;
            case 'Search':
              return bool ? search_on : search;
            case 'Add':
              return add;
            case 'Shorts':
              return bool ? play_on : play;
            case 'Person':
              return bool ? person_on : person;
          }
        };
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          scaleAnimated(1, animatedOf).start(({finished}) => {
            if (finished) {
              scaleAnimated(0, animatedOf).start();
            }
          });
        };

        return (
          <TouchableOpacity
            style={styles.bottomTab}
            activeOpacity={0.7}
            key={index}
            onPress={onPress}>
            <Animated.Image
              source={iconFlag(isFocused)}
              style={[
                styles.icon,
                {
                  transform: [
                    {
                      scale: animatedOf.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.9],
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabs;

const styles = StyleSheet.create({
  bottomTabsWrapper: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee',
    paddingTop: 10,
    zIndex: 10,
    paddingBottom: 10,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
