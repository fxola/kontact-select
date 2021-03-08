import React, { useCallback, useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground
} from "react-native";

import constant from "../constants";
import { Toast } from "../utils";

//components
import ImageWindow from "../components/ImageWindow";
import {
  AssetsSelectorComponent as Gallery,
  ImageType
} from "../components/AssetSelector";

const Page = () => {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const imageWindowRef = useRef<ImageBackground>();
  const toggle = useCallback(() => {
    setShow(!show);
  }, [show]);

  const onDone = (data: ImageType[]): void => {
    if (!data.length || data.length === 1) {
      return Toast("Please Select Two Images");
    }

    setImages(data);
    toggle();
  };

  const swap = () => {
    setImages([images[1], images[0]]);
  };

  const onCapture = useCallback(uri => {
    MediaLibrary.saveToLibraryAsync(uri);
    Toast("Screenshot saved to Gallery");
  }, []);

  const onPressCapture = useCallback(() => {
    captureRef(imageWindowRef).then(onCapture);
  }, [onCapture]);

  const renderImageWindow = () => {
    if (images.length && images.length > 1) {
      return (
        <ImageWindow
          images={images}
          onCapture={onCapture}
          ref={imageWindowRef}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {show ? (
        <Gallery onDone={onDone} goBack={toggle} />
      ) : (
        <View style={styles.container}>
          <View style={styles.window}>{renderImageWindow()}</View>
          <TouchableOpacity onPress={toggle} style={styles.selectButton}>
            <Text>Select pictures</Text>
          </TouchableOpacity>
          {images.length ? (
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity onPress={swap} style={styles.secondaryButton}>
                <Text>Swap pictures</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressCapture}
                style={styles.secondaryButton}
              >
                <Text>Take Screenshot</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  selectButton: {
    borderColor: "black",
    padding: 6,
    borderWidth: 2,
    marginTop: 20
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignItems: "center",
    alignContent: "center"
  },
  secondaryButton: {
    borderColor: "black",
    padding: 6,
    borderWidth: 2,
    flex: 0.5,
    marginTop: 10,
    marginLeft: 5,
    alignItems: "center"
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  window: {
    marginTop: constant.height * 0.05,
    height: constant.height * 0.7,
    width: constant.width * 0.95,
    borderWidth: 2,
    borderColor: "black"
  }
});

export default Page;
