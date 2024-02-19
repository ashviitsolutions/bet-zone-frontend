import React from 'react';
import {Text, View} from 'react-native';
import Tabs from './src/Navigation/TabsNav';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/Navigation/StackNav';
function App() {
  return (

<NavigationContainer>
  <StackNav/>

</NavigationContainer>


  );
}

export default App;
