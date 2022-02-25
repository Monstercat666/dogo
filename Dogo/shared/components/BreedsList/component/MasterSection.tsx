import React from 'react';
import {StyleProp, Text, View, ViewStyle, TouchableOpacity} from 'react-native';
import {capitalizeFirstLetter} from '../../../localization/Localization';
import {SubSection} from './SubSection';
import Styles from './Styles';

interface Props {
  mainBreed: string;
  subBreeds: string[];
  containerStyle?: StyleProp<ViewStyle>;
}

export const MasterSection: React.FC<Props> = props => {
  const {mainBreed, subBreeds, containerStyle} = props;

  return (
    <TouchableOpacity>
      <View style={[Styles.masterSectionContainer, containerStyle]}>
        <Text style={Styles.masterSectionTextStyle} numberOfLines={1}>
          {capitalizeFirstLetter(mainBreed)}
        </Text>
      </View>
      {subBreeds.map(subBreed => {
        return (
          <SubSection containerStyle={Styles.divider} subBreed={subBreed} />
        );
      })}
    </TouchableOpacity>
  );
};
