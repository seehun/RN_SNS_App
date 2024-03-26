import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Video from 'react-native-video';
import React from 'react';

import dummy_video from '../static/dummy_video';

const Shorts = () => {
  const {width, height} = useWindowDimensions();
  const renderVideo = ({item}) => {
    return (
      <View>
        <Video
          source={{uri: item.url}}
          resizeMode="cover" //cover , contain
          playInBackground={false} //background에서 동작 x
          playWhenInactive={false}
          repeat={true}
          rate={1}
          style={{width: width, height: height}}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.screen}>
        <FlatList
          data={dummy_video}
          renderItem={renderVideo}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          snapToInterval={height} //얼마만큼 snap 될건지
          snapToAlignment="start" //snap의 시작점
          decelerationRate={'fast'} //빠르게 snap 하겠다
        />
      </View>
    </SafeAreaView>
  );
};

export default Shorts;

const styles = StyleSheet.create({
  screen: {flex: 1},
});
