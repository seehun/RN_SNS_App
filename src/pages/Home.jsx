import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import logo from '../assets/icons/logo.png';
import heart from '../assets/icons/heart.png';
import comment from '../assets/icons/comment.png';
import more from '../assets/icons/more.png';

import dummy_person from '../static/dummy_person';
import dummy_feed from '../static/dummy_feed';

const {width, height} = Dimensions.get('window');

const Header = () => {
  const renderStories = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.personProfile,
          index === 0 ? {marginHorizontal: 16} : {marginRight: 16},
        ]}>
        <Image
          source={{uri: item.profileImage}}
          style={[
            styles.personImage,
            !item.isOpen
              ? {borderWidth: 2, borderColor: '#2f85ff', borderRadius: 26}
              : '',
          ]}
        />
        <Text numberOfLines={1} style={styles.PersonText}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {/* header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image source={heart} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={comment} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* stories */}
      <View>
        <FlatList
          data={dummy_person}
          renderItem={renderStories}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </>
  );
};

const Home = () => {
  const renderFeeds = ({item, index}) => {
    return (
      <View style={styles.feedContainer}>
        <View style={styles.feedHeader}>
          <TouchableOpacity style={styles.feedHeaderProfile}>
            <Image
              source={{uri: item.profileImage}}
              style={styles.feedProfileImage}
            />
            <Text style={styles.PersonText}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={more} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: item.feedImg[0]}}
          style={{width: width, height: width, marginBottom: 8}}
          resizeMode="contain"
        />
        <View style={styles.feedDetail}>
          <View style={styles.icons}>
            <TouchableOpacity>
              <Image source={heart} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={comment} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text>외 21명이 좋아합니다.</Text>
        </View>
        {/* contents */}
        <View style={styles.feedContents}>
          <Text style={[styles.PersonText, {fontWeight: '600'}]}>
            {item.name}
          </Text>
          <Text style={styles.PersonText}>{item.contents}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* feed */}
        <FlatList
          data={dummy_feed}
          renderItem={renderFeeds}
          keyExtractor={item => item.id}
          removeClippedSubviews
          ListHeaderComponent={() => <Header />} //header도 스크롤하면 내려감
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 88,
    height: 21,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  personProfile: {
    alignItems: 'center',
  },
  personImage: {
    width: 52,
    height: 52,
    marginBottom: 2,
  },
  PersonText: {
    maxWidth: 52,
    fontSize: 16,
    color: '#4f4f4f',
  },
  //feed
  feedContainer: {
    paddingVertical: 24,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  feedHeaderProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedProfileImage: {
    width: 32,
    height: 32,
  },
  feedDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  feedContents: {
    marginHorizontal: 16,
  },
});
