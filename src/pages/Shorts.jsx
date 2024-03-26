import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import React from 'react';

import dummy_video from '../static/dummy_video';

import heartIcon from '../assets/icons/whiteHeart.png';
import commentIcon from '../assets/icons/whiteComment.png';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Shorts = () => {
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
          style={styles.video}
          muted
        />
        <View style={styles.shortsTextContainer}>
          <View style={styles.shortsBackground} />
          <View style={styles.shortsTextWrapper}>
            <View styles={styles.shortsText}>
              <View style={styles.shortsProfile}>
                <TouchableOpacity style={styles.profileWrapper}>
                  <Image
                    source={{uri: 'https://picsum.photos/130/130'}}
                    style={styles.profileImage}
                  />
                  <Text style={styles.profileText}>{item.user}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.followBtn}>
                  <Text style={styles.followText}>팔로우</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
            <View style={styles.shortsLikeAndComment}>
              <View style={{marginBottom: 4, alignItems: 'center'}}>
                <TouchableOpacity style={{marginBottom: 8}}>
                  <Image source={heartIcon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.numberText}>{item.like}</Text>
              </View>
              <View style={{marginBottom: 4, alignItems: 'center'}}>
                <TouchableOpacity style={{marginBottom: 8}}>
                  <Image source={commentIcon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.numberText}>{item.comments}</Text>
              </View>
            </View>
          </View>
        </View>
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
          snapToInterval={SCREEN_HEIGHT - 40} //얼마만큼 snap 될건지
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
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 40, //bottom Tab 크기 빼주기
  },
  //shorts text
  shortsTextContainer: {
    position: 'absolute',
    bottom: 64,
    right: 0,
    left: 0,
    zIndex: 4,
  },
  shortsBackground: {
    position: 'absolute',
    bottom: -40,
    width: SCREEN_WIDTH,
    height: 180,
    backgroundColor: '#000',
    opacity: 0.2,
  },
  shortsTextWrapper: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortsText: {
    // gap: 16,
  },
  shortsProfile: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'center',
    marginBottom: 8,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
  },
  followBtn: {
    width: 58,
    height: 32,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  followText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  commentText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
  },
  numberText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
});
