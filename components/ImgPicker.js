import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const ImgPicker = props => {
  return (
    <View style={styles.imagePicker}>
        { (props.imagePreview) ? <View style={styles.imageContainer}><Image style={styles.image} source={{uri: `data:image/gif;base64,${props.imagePreview}`}} /></View>: <View></View> }
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 200,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 10
  },
  image: {
      width: '100%',
      height: '100%',
  },
});

export default ImgPicker;
