
import { NavigationContainer } from '@react-navigation/native';

import Formulario from './screens/Formulario';
import Agenda from './screens/Agenda';
import Presupuestos from './screens/Presupuestos';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalColors } from './styles/globals';

const Stack = createNativeStackNavigator();


function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: true,
          statusBarColor: 'transparent',
          headerStyle: { backgroundColor: globalColors.primary[700] },
          headerTitleStyle: { color: 'white' },
        }}
        >
          <Stack.Screen name="Presupuestos" component={Presupuestos} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="Formulario" component={Formulario} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;




