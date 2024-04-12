
import { NavigationContainer } from '@react-navigation/native';

import Formulario from './screens/Formulario';
import Agenda from './screens/Agenda';
import Presupuestos from './screens/Presupuestos';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();


function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
          initialRouteName='Formulario'
        >
          <Stack.Screen name="Formulario" component={Formulario} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="Presupuestos" component={Presupuestos} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;