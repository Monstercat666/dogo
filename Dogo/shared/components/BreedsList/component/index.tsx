import React from 'react';
import {FlatList} from 'react-native';
import {Props} from '../container/index';
import {MasterSection} from './MasterSection';
import Styles from './Styles';

export const BreedsListComponent: React.FC<Props> = props => {
  const {breeds} = props;

  return (
    <>
      {breeds && (
        <FlatList
          keyExtractor={breed => breed[0]}
          data={Array.from(Object.entries(breeds))}
          renderItem={({item}) => {
            return (
              <MasterSection
                mainBreed={item[0]}
                subBreeds={item[1]}
                containerStyle={Styles.divider}
              />
            );
          }}
        />
      )}
    </>
  );
};
