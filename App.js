import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";
import {store} from "./src/store";
import {AppNavigator} from "./src/navigation/AppNavigator";

export default function App() {

  return (
      <Provider store={store} >
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
