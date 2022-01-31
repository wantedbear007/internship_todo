import React from 'react';
import Home from './src/screens/Home';
import {SafeAreaView, StatusBar} from 'react-native';
import {colors} from './src/components/Colors/colors';

const App = () => (
  <SafeAreaView>
    <StatusBar backgroundColor={colors.while} barStyle="dark-content" />
    <Home />
  </SafeAreaView>
);

export default App;
