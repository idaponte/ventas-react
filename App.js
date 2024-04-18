

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './contexts/AuthProvider';
import AuthNavigator from './navigators/AuthNavigator';
import DrawerNavigator from './navigators/DrawerNavigator';

const Stack = createNativeStackNavigator();


function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>

    </SafeAreaProvider>
  );
}

export default App;




