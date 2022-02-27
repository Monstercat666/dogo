import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DogIcon from '../../icons/DogIcon';
import Styles from './Styles';

interface Props {
  handleAscendingSorting: () => void;
  handleDescendingSorting: () => void;
}

export const Sort: React.FC<Props> = props => {
  const {handleAscendingSorting, handleDescendingSorting} = props;

  const callback = useCallback(
    () => handleDescendingSorting(),
    [handleDescendingSorting],
  );

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() => {
          callback();
          //   setCallback();
        }}>
        <DogIcon />
      </TouchableOpacity>
    </View>
  );
};
