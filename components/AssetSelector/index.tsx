import React, { FC } from "react";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export interface ImageType {
  height: number;
  uri: string;
  width: number;
}

interface Props {
  goBack: () => void;
  onDone: (data: Array<ImageType>) => void;
}

export const AssetsSelectorComponent: FC<Props> = ({ goBack, onDone }) => {
  return (
    <View style={styles.container}>
      <AssetsSelector
        options={{
          manipulate: {
            width: 512,
            compress: 0.7,
            base64: false,
            saveTo: "jpeg"
          },
          assetsType: ["photo"],
          maxSelections: 2,
          margin: 3,
          portraitCols: 4,
          landscapeCols: 5,
          widgetWidth: 100,
          widgetBgColor: "white",
          spinnerColor: "black",
          videoIcon: {
            Component: Ionicons,
            iconName: "ios-videocam",
            color: "white",
            size: 20
          },
          selectedIcon: {
            Component: Ionicons,
            iconName: "ios-checkmark-circle-outline",
            color: "white",
            bg: "rgba(0,0,0,0.4)",
            size: 20
          },
          defaultTopNavigator: {
            continueText: "Done",
            goBackText: "Back",
            buttonStyle: styles.buttonStyle,
            textStyle: styles.textStyle,
            backFunction: goBack,
            doneFunction: data => onDone(data)
          },
          noAssets: {
            Component: () => <View />
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  textStyle: {
    color: "black",
    fontWeight: "bold"
  },
  buttonStyle: {
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "black",
    width: 100
  }
});
