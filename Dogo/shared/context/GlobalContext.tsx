import React, {createContext, useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';
import {useIsMounted} from '../hooks/useIsMounted';
import {isFailure} from '../util/Failure';
import {getAllBreeds, getFilterFormattedBreeds} from '../util/Functions';
import {FilteredBreedsMap} from '../util/Types';

export const GlobalDataContext = createContext<{
  filterFormattedBreedsMap?: FilteredBreedsMap;
  setFilterFormattedBreedsMap: (map: FilteredBreedsMap | undefined) => void;
}>({
  filterFormattedBreedsMap: new Map(),
  setFilterFormattedBreedsMap: () => {},
});

export const GlobalDataProvider: React.FC = props => {
  const [filterFormattedBreedsMap, setFilterFormattedBreedsMap] =
    useState<FilteredBreedsMap>();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      _getAllBreeds();
    });
  }, []);

  const isMounted = useIsMounted();

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
        setFilterFormattedBreedsMap: setFilterFormattedBreedsMap,
      }}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};
