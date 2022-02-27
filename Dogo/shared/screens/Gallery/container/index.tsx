import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {GlobalDataContext} from '../../../context/GlobalContext';
import {useIsMounted} from '../../../hooks/useIsMounted';
import strings, {
  capitalizeFirstLetter,
} from '../../../localization/Localization';
import {Route, RouteName} from '../../../navigation/Routes';
import Colors from '../../../styles/Colors';
import {isFailure} from '../../../util/Failure';
import {
  getMasterSubBreedCombinationString,
  getRandomMasterBreedImages,
  getRandomSubBreedImages,
} from '../../../util/Functions';
import {GalleryComponent} from '../component';
import Styles from '../component/Styles';

interface Props {
  navigation?: NativeStackNavigationProp<Route>;
  route?: RouteProp<Route, RouteName.GalleryScreen>;
}

export const Gallery: React.FC<Props> = props => {
  const {breedImages, setBreedImages} = useContext(GlobalDataContext);

  const [images, setImages] = useState<[string, string]>();

  const navigation = useNavigation();

  const isMounted = useIsMounted();

  useEffect(() => {
    const subBreedName = props.route?.params?.subBreed?.name;
    const masterBreedName = props.route?.params?.masterBreed?.name;
    const isSubBreed: boolean = subBreedName && masterBreedName;

    function handleScreenTitle() {
      navigation.setOptions({
        title: capitalizeFirstLetter(
          subBreedName ?? masterBreedName ?? strings.gallery,
        ),
      });
    }

    async function getAndStoreBreedImages() {
      if (!props.route?.params) {
        return;
      }

      // Define the key for the Map
      const _key = isSubBreed
        ? getMasterSubBreedCombinationString(masterBreedName, subBreedName)
        : masterBreedName;

      // Check if the value exists in the context map
      const _twoBreedImages = breedImages.get(_key);

      if (_twoBreedImages?.length && _twoBreedImages.length > 1) {
        setImages([_twoBreedImages[0], _twoBreedImages[1]]);
      } else {
        // Fetch the value
        const twoRandomImages = isSubBreed
          ? await getRandomSubBreedImages(masterBreedName, subBreedName, 2)
          : await getRandomMasterBreedImages(masterBreedName, 2);
        if (!isMounted.current) {
          return;
        }
        if (isFailure(twoRandomImages)) {
          return twoRandomImages;
        }

        // Update the context
        setImages([twoRandomImages[0], twoRandomImages[1]]);
        breedImages.set(_key, [twoRandomImages[0], twoRandomImages[1]]);
        setBreedImages(new Map(breedImages));
      }
    }

    handleScreenTitle();
    getAndStoreBreedImages();
  }, [props.route?.params]);

  return (
    <>
      {images ? (
        <GalleryComponent images={images} />
      ) : (
        <ActivityIndicator
          size={'large'}
          color={Colors.Blue}
          style={Styles.activityIndicatorStyle}
        />
      )}
    </>
  );
};
