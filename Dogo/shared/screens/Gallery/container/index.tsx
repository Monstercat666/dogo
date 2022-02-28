import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, InteractionManager} from 'react-native';
import {
  getAndStoreBreedImages,
  GlobalDataContext,
} from '../../../context/GlobalContext';
import {useIsMounted} from '../../../hooks/useIsMounted';
import strings, {
  capitalizeFirstLetter,
} from '../../../localization/Localization';
import {Route, RouteName} from '../../../navigation/Routes';
import Colors from '../../../styles/Colors';
import {isFailure} from '../../../util/Failure';
import {BreedImagesMap} from '../../../util/Types';
import {GalleryComponent} from '../component';
import Styles from '../component/Styles';

interface Props {
  navigation?: NativeStackNavigationProp<Route>;
  route?: RouteProp<Route, RouteName.GalleryScreen>;
}

export const Gallery: React.FC<Props> = props => {
  const isMounted = useIsMounted();

  const navigation = useNavigation();

  const {breedImages} = useContext(GlobalDataContext);

  const [images, setImages] = useState<[string, string]>();

  const subBreedName: string = (props.route?.params as any)?.subBreed?.name;
  const masterBreedName: string = (props.route?.params as any)?.masterBreed
    ?.name;

  const _getAndStoreBreedImages = useCallback(
    async (
      _masterBreedName: string,
      _subBreedName: string,
      breedImagesMap: BreedImagesMap,
      forceFetch?: boolean,
    ) => {
      const _images = await getAndStoreBreedImages(
        _masterBreedName,
        _subBreedName,
        breedImagesMap,
        forceFetch,
      );
      if (!isMounted.current) {
        return;
      }
      if (isFailure(_images)) {
        return _images;
      }

      setImages([_images[0], _images[1]]);
    },
    [isMounted],
  );

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      function handleScreenTitle() {
        navigation.setOptions({
          title: capitalizeFirstLetter(
            subBreedName
              ? `${subBreedName} ${capitalizeFirstLetter(masterBreedName)}`
              : masterBreedName ?? strings.gallery,
          ),
        });
      }

      handleScreenTitle();
      _getAndStoreBreedImages(
        masterBreedName,
        subBreedName,
        breedImages,
        undefined,
      );
    });
  }, [
    props.route?.params,
    masterBreedName,
    subBreedName,
    breedImages,
    navigation,
    isMounted,
    _getAndStoreBreedImages,
  ]);

  return (
    <>
      {images ? (
        <GalleryComponent
          images={images}
          handleRefresh={async () => {
            return _getAndStoreBreedImages(
              masterBreedName,
              subBreedName,
              breedImages,
              true,
            );
          }}
        />
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
