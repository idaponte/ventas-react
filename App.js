import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider, { AuthContext } from './contexts/AuthProvider';
import AuthNavigator from './navigators/AuthNavigator';
import MiAppState from './navigators/DrawerNavigator';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  const { isLogged, loading } = useContext(AuthContext);

  if (loading) return <LoadingScreen />
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {
          isLogged ? (
            <Stack.Screen name="DrawerNavigator" component={MiAppState} />
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




