import React, {createContext, useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';
import {useIsMounted} from '../hooks/useIsMounted';
import {isFailure} from '../util/Failure';
import {getAllBreeds, getFilterFormattedBreeds} from '../util/Functions';
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

export const GlobalDataProvider: React.FC = props => {
  const [filterFormattedBreedsMap, setFilterFormattedBreedsMap] =
    useState<FilteredBreedsMap>();
  // As for the breed images we will let the user populate the map, by pressing on the breed names
  // So we don't have to build the map on mount
  const [breedImages, setBreedImages] = useState<BreedImagesMap>(new Map());

  const isMounted = useIsMounted();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
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

      _getAllBreeds();
    });
  }, [isMounted]);

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
