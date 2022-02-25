import React from 'react';
import {MasterAndSubBreeds} from '../../../util/Functions';
import {BreedsListComponent} from '../component/index';

export interface Props {
  breeds?: MasterAndSubBreeds;
}

export const BreedsList: React.FC<Props> = props => {
  return <BreedsListComponent {...props} />;
};
