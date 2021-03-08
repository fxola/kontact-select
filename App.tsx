import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ImageCollage from "./screens/ImageCollage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Contacts from "./screens/Contacts";

const App = () => {
  const [screen, setScreen] = useState(true);

  const toggleScreen = useCallback(() => {
    setScreen(!screen);
  }, [screen]);

  return (
    <View style={styles.container}>
      {screen ? <ImageCollage /> : <Contacts />}
      <TouchableOpacity onPress={toggleScreen} style={styles.switch}>
        <Text>Change Screens</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  switch: {
    padding: 3,
    borderColor: "black",
    borderWidth: 1
  }
});

export default App;
