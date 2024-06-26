import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState, useRef} from 'react';

import searchIcon from '../assets/icons/search.png';
import deleteIcon from '../assets/icons/delete.png';

const RecentSearchItem = () => {
  return (
    <View style={recentSearchItemStyles.itemWrapper}>
      <TouchableOpacity style={recentSearchItemStyles.profileWrapper}>
        <Image
          source={{uri: 'https://picsum.photos/130/130'}}
          style={recentSearchItemStyles.image}
        />
        <Text>asdf</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={deleteIcon} style={recentSearchItemStyles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const SearchList = ({route, navigation}) => {
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef();

  const handleCancleButton = () => {
    setKeyword('');
    Keyboard.dismiss();
    inputRef.current.focus();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* search */}
      <View style={styles.searchMenuWrapper}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity style={styles.touchIconStyle}>
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            returnKeyType="search"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            value={keyword}
            onChangeText={text => setKeyword(text)}
            allowFontScaling={false}
            style={styles.inputStyle}
            autoFocus
            ref={inputRef}
            onSubmitEditing={() => console.log(1)}
          />
        </View>
        <TouchableOpacity onPress={handleCancleButton}>
          <Text style={styles.cancel}>취소</Text>
        </TouchableOpacity>
      </View>
      {/* 검색어들 */}
      <View>
        <View style={styles.SearchTextWrapper}>
          <Text style={styles.searchText}>최근 검색</Text>
          <TouchableOpacity>
            <Text style={[styles.searchText, styles.allDeleteLabel]}>
              전체삭제
            </Text>
          </TouchableOpacity>
        </View>
        {/* 최근검색어목록 */}
        <View>
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  searchMenuWrapper: {
    height: 68,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  searchWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    marginRight: 8,
    marginLeft: 16,
    marginVertical: 12,
    borderRadius: 4,
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
  cancel: {
    color: '#2F80ED',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 16,
  },
  //text
  SearchTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
  },
  searchText: {
    fontSize: 16,
    fontWeight: '500',
  },
  allDeleteLabel: {
    color: '#828282',
  },
});

const recentSearchItemStyles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  deleteIcon: {
    width: 16,
    height: 16,
  },
});
