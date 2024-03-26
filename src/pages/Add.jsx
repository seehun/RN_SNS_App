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
import React, {useEffect, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const {width, height} = Dimensions.get('window');

const Add = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const renderImage = ({item, index}) => {
    const selectHandler = () => {
      setSelectedImage(item);
      setSelectedIndex(index);
    };
    return (
      <TouchableOpacity onPress={selectHandler}>
        {index === selectedIndex && <View style={styles.selected} />}
        <Image source={{uri: item.uri}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
      groupTypes: 'All',
    }).then(res => {
      if (!selectedImage) {
        setSelectedImage(res.edges[0].node.image);
        setSelectedIndex(0);
      }
      setImages(res.edges.map(e => e.node.image));
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={{backgroundColor: '#000', flex: 0.5}}>
        {selectedImage && (
          <Image
            source={{uri: selectedImage.uri}}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </View>
      <View style={{flex: 0.5}}>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={item => item.uri}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  image: {
    width: width / 4,
    height: width / 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  selected: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width / 4,
    height: width / 4,
    backgroundColor: '#000',
    opacity: 0.4,
    zIndex: 10,
  },
});
