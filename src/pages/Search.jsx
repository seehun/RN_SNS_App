import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import searchIcon from '../assets/icons/search.png';
import multi from '../assets/icons/multi.png';

import dummy_search from '../static/dummy_search';

const {width, height} = Dimensions.get('window');

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const renderSearch = ({item}) => {
    return (
      <TouchableOpacity style={styles.searchItemWrapper}>
        {item.isMulti && <Image source={multi} style={styles.multiPhoto} />}
        <Image source={{uri: item.image}} style={styles.searchItem} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {/* searchWrapper */}
        <View style={{height: 68, backgroundColor: '#fff'}}>
          <View style={styles.searchWrapper}>
            <TouchableOpacity style={styles.touchIconStyle}>
              <Image source={searchIcon} style={styles.icon} />
            </TouchableOpacity>
            <TextInput
              placeholder="검색어를 입력하세요"
              placeholderTextColor={'#828282'}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
              value={keyword}
              onChangeText={text => setKeyword(text)}
              allowFontScaling={false}
              style={styles.inputStyle}
            />
          </View>
        </View>
        {/* imageList */}
        <FlatList
          data={dummy_search}
          renderItem={renderSearch}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  touchIconStyle: {
    marginLeft: 16,
    marginRight: 3,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    color: '#828282',
    fontSize: 16,
    fontWeight: '400',
    alignItems: 'center',
  },
  //search Item
  searchItemWrapper: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchItem: {
    width: width / 3 - 2,
    height: width / 3 - 2,
  },
  multiPhoto: {
    position: 'absolute',
    width: 24,
    height: 24,
    top: 8,
    right: 8,
    zIndex: 4,
  },
});
