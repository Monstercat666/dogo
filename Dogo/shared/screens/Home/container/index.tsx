import React, {useEffect, useState, FC} from 'react';
import {InteractionManager} from 'react-native';
import {isFailure} from '../../../util/Failure';
import {getAllBreeds} from '../../../util/Functions';
import {HomeComponent} from '../component';

export type AllBreeds = Map<string, Array<string>>;

export const Home: FC = () => {
  const [allBreeds, setAllBreeds] = useState<AllBreeds>();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      _getAllBreeds();
    });
  }, []);

  const _getAllBreeds = async () => {
    const _allBreeds = await getAllBreeds();
    if (isFailure(_allBreeds)) {
      // TODO handle failure in UI (Something went wrong bla bla bla)
      return;
    }

    setAllBreeds(_allBreeds);
  };

  return <HomeComponent allBreeds={allBreeds} />;
};
