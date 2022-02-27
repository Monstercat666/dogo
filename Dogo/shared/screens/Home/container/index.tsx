import React, {FC, useContext} from 'react';
import {GlobalDataContext} from '../../../context/GlobalContext';
import {filterBreeds} from '../../../util/Functions';
import {HomeComponent} from '../component';

export const Home: FC = () => {
  const {filterFormattedBreedsMap, setFilterFormattedBreedsMap} =
    useContext(GlobalDataContext);

  // The downside here is that the filter changes will be applied to the data existing in the context
  // It's not a big deal because we're only adding the hidden property, so on the component level I can decide if I wanna show/hide the element (I mean in different screens)
  // I could just add a state in this component and apply the filter changes to it, but since we don't have other screens now we can rely on the context value and mutate it
  function _filterBreeds(input?: string) {
    if (!filterFormattedBreedsMap) {
      return;
    }

    setFilterFormattedBreedsMap(
      new Map(filterBreeds(filterFormattedBreedsMap, input)),
    );
  }
  return (
    <HomeComponent
      // I could just check the context value from the component instead of passing it, but I think it's cleaner to have the main logic in the container
      filterFormattedBreedsMap={filterFormattedBreedsMap}
      filterBreeds={_filterBreeds}
    />
  );
};
