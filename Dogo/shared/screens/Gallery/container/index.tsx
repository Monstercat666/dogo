import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalDataContext} from '../../../context/GlobalContext';
import {useIsMounted} from '../../../hooks/useIsMounted';
import strings, {
  capitalizeFirstLetter,
} from '../../../localization/Localization';
import {Route, RouteName} from '../../../navigation/Routes';
import {isFailure} from '../../../util/Failure';
import {
  extractBreedFromImageURL,
  getMasterSubBreedCombinationString,
  getRandomMasterBreedImages,
  getRandomSubBreedImages,
} from '../../../util/Functions';
import {GalleryComponent} from '../component';

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
    const subBreedName = props.route.params.subBreed?.name;
    const mainBreedName = props.route.params.mainBreed?.name;

    function handleScreenTitle() {
      navigation.setOptions({
        title: capitalizeFirstLetter(
          subBreedName ?? mainBreedName ?? strings.gallery,
        ),
      });
    }

    async function getAndStoreBreedImages() {
      if (!props.route?.params) {
        return;
      }

      // If it's a sub breed
      if (subBreedName && mainBreedName) {
        const _key = getMasterSubBreedCombinationString(
          mainBreedName,
          subBreedName,
        );
        const _twoBreedImages = breedImages.get(_key);
        // Check if the value already exists in the contet
        if (_twoBreedImages?.length && _twoBreedImages.length > 1) {
          setImages([_twoBreedImages[0], _twoBreedImages[1]]);
        } else {
          // Fetch the value from the api
          const twoRandomImages = await getRandomSubBreedImages(
            mainBreedName,
            subBreedName,
            2,
          );
          if (!isMounted.current) {
            return;
          }
          if (isFailure(twoRandomImages)) {
            return twoRandomImages;
          }

          setImages([twoRandomImages[0], twoRandomImages[1]]);
          breedImages.set(_key, twoRandomImages);
          setBreedImages(new Map(breedImages));
        }
      }
      // If it's a master breed
      else if (mainBreedName) {
        if (false) {
          // TODO
          // check in the context but the checking will be tricky here
        } else {
          const twoRandomImages = await getRandomMasterBreedImages(
            mainBreedName,
            2,
          );
          if (!isMounted.current) {
            return;
          }
          if (isFailure(twoRandomImages)) {
            return twoRandomImages;
          }

          twoRandomImages.forEach(randomImage => {
            const breedKey = extractBreedFromImageURL(randomImage);
            const _twoCachedImages = breedImages.get(breedKey);

            if (_twoCachedImages) {
              if (_twoCachedImages.length === 2) {
                // We shift and push to make sure the recent image is added and the oldest one is removed
                // the two random images of the master breed could be for the same sub breed
                // for example: hound-afghan and hound-afghan
                _twoCachedImages?.shift();
                _twoCachedImages?.push(randomImage);
              } else if (_twoCachedImages.length === 1) {
                _twoCachedImages?.push(randomImage);
              }
            } else {
              breedImages.set(breedKey, [randomImage]);
            }
          });

          setImages([twoRandomImages[0], twoRandomImages[1]]);
          setBreedImages(new Map(breedImages));
        }
      }
    }

    handleScreenTitle();
    getAndStoreBreedImages();
  }, [props.route?.params]);

  return <GalleryComponent images={images} />;
};
