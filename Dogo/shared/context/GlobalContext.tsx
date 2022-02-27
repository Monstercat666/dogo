import React, {createContext, useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';
import {useIsMounted} from '../hooks/useIsMounted';
import {isFailure, Result} from '../util/Failure';
import {
  getAllBreeds,
  getFilterFormattedBreeds,
  getMasterSubBreedCombinationString,
  getRandomMasterBreedImages,
  getRandomSubBreedImages,
} from '../util/Functions';
import {
  BreedImagesMap as BreedImagesMap,
  FilteredBreedsMap,
} from '../util/Types';

export const GlobalDataContext = createContext<{
  filterFormattedBreedsMap?: FilteredBreedsMap;
  breedImages: BreedImagesMap;
  setFilterFormattedBreedsMap: (map: FilteredBreedsMap | undefined) => void;
  setBreedImages: (map: BreedImagesMap) => void;
}>({
  filterFormattedBreedsMap: new Map(),
  breedImages: new Map(),
  setFilterFormattedBreedsMap: () => {},
  setBreedImages: () => {},
});

/**
 * Gets breed (Master/Sub) images and store them into the context
 * @param forceFetch To force a fresh fetching of images regardless of the stored values
 */
export async function getAndStoreBreedImages(
  masterBreedName: string,
  subBreedName: string | undefined,
  breedImages: BreedImagesMap,
  setBreedImages: (map: BreedImagesMap) => void,
  forceFetch?: boolean,
): Promise<Result<[string, string]>> {
  const isSubBreed = subBreedName && masterBreedName;

  // Define the key for the Map
  const _key = isSubBreed
    ? getMasterSubBreedCombinationString(masterBreedName, subBreedName)
    : masterBreedName;

  // Check if the value exists in the context map
  const _twoBreedImages = breedImages.get(_key);

  if (!forceFetch && _twoBreedImages?.length && _twoBreedImages.length > 1) {
    return [_twoBreedImages[0], _twoBreedImages[1]];
  } else {
    // Fetch the value
    const twoRandomImages = isSubBreed
      ? await getRandomSubBreedImages(masterBreedName, subBreedName, 2)
      : await getRandomMasterBreedImages(masterBreedName, 2);
    if (isFailure(twoRandomImages)) {
      return twoRandomImages;
    }

    // Update the context
    breedImages.set(_key, [twoRandomImages[0], twoRandomImages[1]]);
    setBreedImages(new Map(breedImages));
    return [twoRandomImages[0], twoRandomImages[1]];
  }
}

export const GlobalDataProvider: React.FC = props => {
  const [filterFormattedBreedsMap, setFilterFormattedBreedsMap] =
    useState<FilteredBreedsMap>();
  // As for the breed images we will let the user populate the map, by pressing on the breed names
  // So we don't have to build the map on mount
  const [breedImages, setBreedImages] = useState<BreedImagesMap>(new Map());

  const isMounted = useIsMounted();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      _getAllBreeds();
    });
  }, []);

  async function _getAllBreeds() {
    const allBreeds = await getAllBreeds();
    if (!isMounted.current) {
      return;
    }
    if (isFailure(allBreeds)) {
      return allBreeds;
    }
    setFilterFormattedBreedsMap(getFilterFormattedBreeds(allBreeds));
  }

  return (
    <GlobalDataContext.Provider
      value={{
        filterFormattedBreedsMap: filterFormattedBreedsMap,
        breedImages: breedImages,
        setFilterFormattedBreedsMap: setFilterFormattedBreedsMap,
        setBreedImages: setBreedImages,
      }}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};
