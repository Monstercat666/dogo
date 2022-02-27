import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {capitalizeFirstLetter} from '../../../localization/Localization';
import {RouteName} from '../../../navigation/Routes';
import {FilteredSubBreeds} from '../../../util/Types';
import Styles from './Styles';

interface Props {
  mainBreedName: string;
  subBreed: FilteredSubBreeds;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SubSection: React.FC<Props> = props => {
  const {subBreed, containerStyle, mainBreedName} = props;

  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate(RouteName.GalleryScreen, {
      mainBreed: mainBreedName,
      subBreed: subBreed,
    });
  }

  return (
    <TouchableOpacity
      style={[Styles.subSectionContainer, containerStyle]}
      onPress={handleNavigation}>
      <Text style={Styles.subSectionTextStyle}>
        {capitalizeFirstLetter(subBreed.name)}
      </Text>
    </TouchableOpacity>
  );
};
