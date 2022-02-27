import React from 'react';
import {FilteredBreedsMap} from '../../../util/Types';
import {BreedsListComponent} from '../component/index';

export interface Props {
  breeds: FilteredBreedsMap;
}

export const BreedsList: React.FC<Props> = props => {
  return <BreedsListComponent {...props} />;
};
