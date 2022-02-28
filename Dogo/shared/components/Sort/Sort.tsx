import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Styles from './Styles';
import {SvgXml} from 'react-native-svg';
import Colors from '../../styles/Colors';
import {DogIcon} from '../../icons/DogIcon';

interface Props {
  handleToggle: (bool: boolean) => void;
}

export const Sort: React.FC<Props> = props => {
  const {handleToggle} = props;

  const [isDescending, setIsDescending] = useState(false);

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleToggle(!isDescending);
          setIsDescending(prev => !prev);
        }}>
        <SvgXml
          xml={DogIcon}
          fill={Colors.Blue}
          style={[
            Styles.svgContainer,
            {
              transform: [{rotate: isDescending ? '180deg' : '0deg'}],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};
