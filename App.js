import { NavigationContainer } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store/store';



export default function App() {

  return (
    <Provider store={store} >
      <GluestackUIProvider mode='light'>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}