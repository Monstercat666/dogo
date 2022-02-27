import React from 'react';
import {StyleProp, Text, View, ViewStyle, TouchableOpacity} from 'react-native';
import {capitalizeFirstLetter} from '../../../localization/Localization';
import {SubSection} from './SubSection';
import Styles from './Styles';
import {FilteredMasterBreeds} from '../../../util/Types';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../../navigation/Routes';

interface Props {
  mainBreed: FilteredMasterBreeds;
  containerStyle?: StyleProp<ViewStyle>;
}

export const MasterSection: React.FC<Props> = props => {
  const {mainBreed, containerStyle} = props;

  const navigation = useNavigation();

  return (
    <>
      {!mainBreed.hidden && (
        <View>
          <TouchableOpacity
            style={[Styles.masterSectionContainer, containerStyle]}
            onPress={() => {
              // the type error here is coming from the overloaded function in the node module
              navigation.navigate({name: Route.GalleryScreen});
            }}>
            <Text style={Styles.masterSectionTextStyle} numberOfLines={1}>
              {capitalizeFirstLetter(mainBreed.name)}
            </Text>
          </TouchableOpacity>
          {mainBreed.subBreeds.map(subBreed => {
            return (
              <SubSection
                key={subBreed.name}
                containerStyle={Styles.divider}
                subBreed={subBreed}
              />
            );
          })}
        </View>
      )}
    </>
  );
};
