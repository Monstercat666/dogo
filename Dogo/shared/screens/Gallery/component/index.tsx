import React, {useState} from 'react';
import {Image, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsMounted} from '../../../hooks/useIsMounted';
import Styles from './Styles';

interface Props {
  images: [string, string];
  handleRefresh: () => void;
}

export const GalleryComponent: React.FC<Props> = props => {
  const {images, handleRefresh} = props;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const isMounted = useIsMounted();

  async function _handleRefresh() {
    setIsRefreshing(true);
    await handleRefresh();
    if (!isMounted.current) {
      return;
    }
    setIsRefreshing(false);
  }

  return (
    <ScrollView
      contentContainerStyle={Styles.contentContainer}
      style={Styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={_handleRefresh} />
      }>
      <Image style={Styles.firstImage} source={{uri: images[0]}} />
      <Image style={Styles.secondImage} source={{uri: images[1]}} />
    </ScrollView>
  );
};
