import React from 'react';
import {StyleProp, Text, View, ViewStyle, TouchableOpacity} from 'react-native';
import {capitalizeFirstLetter} from '../../../localization/Localization';
import {SubSection} from './SubSection';
import Styles from './Styles';
import {FilteredMasterBreeds} from '../../../util/Types';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../../navigation/Routes';

interface Props {
  masterBreed: FilteredMasterBreeds;
  containerStyle?: StyleProp<ViewStyle>;
}

export const MasterSection: React.FC<Props> = props => {
  const {masterBreed, containerStyle} = props;

  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate(RouteName.GalleryScreen, {
      masterBreed: masterBreed,
    });
  }

  return (
    <>
      {!masterBreed.hidden && (
        <View>
          <TouchableOpacity
            style={[Styles.masterSectionContainer, containerStyle]}
            onPress={handleNavigation}>
            <Text style={Styles.masterSectionTextStyle} numberOfLines={1}>
              {capitalizeFirstLetter(masterBreed.name)}
            </Text>
          </TouchableOpacity>
          {masterBreed.subBreeds.map(subBreed => {
            return (
              <>
                {!subBreed.hidden && (
                  <SubSection
                    key={subBreed.name}
                    containerStyle={Styles.divider}
                    masterBreed={masterBreed}
                    subBreed={subBreed}
                  />
                )}
              </>
            );
          })}
        </View>
      )}
    </>
  );
};
