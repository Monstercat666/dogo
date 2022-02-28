import React from 'react';
import {FilteredMasterBreeds} from '../../../util/Types';
import {BreedsListComponent} from '../component/index';

export interface Props {
  breeds: FilteredMasterBreeds[];
  isDesc: boolean;
}

export const BreedsList: React.FC<Props> = props => {
  return <BreedsListComponent {...props} />;
};
