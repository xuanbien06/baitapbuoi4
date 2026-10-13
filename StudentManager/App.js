import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './src/screens/ListScreen';
import EditScreen from './src/screens/EditScreen';
import i18n from './src/locales/i18n';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
          options={{ title: i18n.t('listTitle') }} 
        />
        <Stack.Screen 
          name="Edit" 
          component={EditScreen} 
          options={({ route }) => ({ 
            title: route.params?.student ? i18n.t('edit') : i18n.t('addStudent') 
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}