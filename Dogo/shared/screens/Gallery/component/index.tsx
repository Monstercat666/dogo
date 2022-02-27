import React from 'react';
import {View} from 'react-native';
import Spacings from '../../../styles/Spacings';

interface Props {}

export const GalleryComponent: React.FC<Props> = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Spacings.Large,
        paddingVertical: Spacings.Medium,
        justifyContent: 'space-between',
      }}>
      {/* <Image source={}/> */}
      {/* <Image /> */}
    </View>
  );
};
