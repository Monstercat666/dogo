import React from 'react';
import {Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {capitalizeFirstLetter} from '../../../localization/Localization';
import {FilteredSubBreeds} from '../../../util/Types';
import Styles from './Styles';

interface Props {
  subBreed: FilteredSubBreeds;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SubSection: React.FC<Props> = props => {
  const {subBreed, containerStyle} = props;

  return (
    <TouchableOpacity style={[Styles.subSectionContainer, containerStyle]}>
      <Text style={Styles.subSectionTextStyle}>
        {capitalizeFirstLetter(subBreed.name)}
      </Text>
    </TouchableOpacity>
  );
};
