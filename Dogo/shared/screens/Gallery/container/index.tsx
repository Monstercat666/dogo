import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
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

  const subBreedName: string = props.route?.params?.subBreed?.name;
  const masterBreedName: string = props.route?.params?.masterBreed?.name;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      handleScreenTitle();
      _getAndStoreBreedImages();
    });
  }, [props.route?.params]);

  function handleScreenTitle() {
    navigation.setOptions({
      title: capitalizeFirstLetter(
        subBreedName ?? masterBreedName ?? strings.gallery,
      ),
    });
  }

  async function _getAndStoreBreedImages(forceFetch?: boolean) {
    const _images = await getAndStoreBreedImages(
      masterBreedName,
      subBreedName,
      breedImages,
      setBreedImages,
      forceFetch,
    );
    if (!isMounted.current) {
      return;
    }
    if (isFailure(_images)) {
      return _images;
    }

    setImages([_images[0], _images[1]]);
  }

  return (
    <>
      {images ? (
        <GalleryComponent
          images={images}
          handleRefresh={() => {
            _getAndStoreBreedImages(true);
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
