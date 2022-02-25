import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {FilterComponent} from '../component';

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (input?: string) => void;
}

export const Filter: React.FC<Props> = props => {
  return <FilterComponent {...props} />;
};
