import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Routes} from './shared/navigation/Routes';
import Styles from './Styles';

const App: React.FC = () => {
  return (
    <>
      <SafeAreaView style={Styles.appHeader} />
      <SafeAreaView style={Styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <Routes />
      </SafeAreaView>
    </>
  );
};

export default App;
