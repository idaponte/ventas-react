

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider, { AuthContext } from './contexts/AuthProvider';
import AuthNavigator from './navigators/AuthNavigator';
import DrawerNavigator from './navigators/DrawerNavigator';
import { useContext, useEffect } from 'react';

const Stack = createNativeStackNavigator();

const Router = () => {
  const { isLogged } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {
          isLogged ? (
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          ) : (
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          )
        }

      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>

    </SafeAreaProvider>
  );
}

export default App;




