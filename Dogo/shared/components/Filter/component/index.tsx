import React from 'react';
import {TextInput, View} from 'react-native';
import {Props} from '../container';
import Styles from './Styles';
import Colors from '../../../styles/Colors';
import strings from '../../../localization/Localization';

export const FilterComponent: React.FC<Props> = props => {
  const {containerStyle, onChange} = props;

  const handleTextChange = (text: string) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <View style={[Styles.container, containerStyle]}>
      <TextInput
        placeholder={strings.filterPlaceHolder}
        placeholderTextColor={Colors.Black}
        style={Styles.textInput}
        onChangeText={handleTextChange}
      />
    </View>
  );
};
