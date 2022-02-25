import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Props} from '../container';
import Styles from './Styles';
import Colors from '../../../styles/Colors';
import strings from '../../../localization/Localization';

export const FilterComponent: React.FC<Props> = props => {
  const {containerStyle, onChange} = props;

  const [textInput, setTextInput] = useState<string>();

  useEffect(() => {
    if (onChange) {
      onChange(textInput);
    }
  }, [textInput, onChange]);

  return (
    <View style={containerStyle ?? Styles.container}>
      <TextInput
        placeholder={strings.filterPlaceHolder}
        placeholderTextColor={Colors.Black}
        value={textInput}
        style={Styles.textInput}
        onChangeText={setTextInput}
      />
    </View>
  );
};
