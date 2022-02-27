import React from 'react';
import {View, Image} from 'react-native';
import Styles from './Styles';

interface Props {
  images: [string, string];
}

export const GalleryComponent: React.FC<Props> = props => {
  const {images} = props;

  return (
    <View style={Styles.container}>
      <Image style={Styles.firstImage} source={{uri: images[0]}} />
      <Image style={Styles.secondImage} source={{uri: images[1]}} />
    </View>
  );
};
