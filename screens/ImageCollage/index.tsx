import React, { useCallback, useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";

import constant from "../../constants";
import { Toast } from "../../utils";

//components
import ImageWindow from "../../components/ImageWindow";
import {
  ImageType,
  AssetsSelectorComponent as Gallery
} from "../../components/AssetSelector";
import constants from "../../constants";

const ImageCollage = () => {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const imageWindowRef = useRef<ImageBackground>();

  const toggleGallery = useCallback(() => {
    setShow(!show);
  }, [show]);

  const onDone = (data: ImageType[]): void => {
    if (!data.length || data.length === 1) {
      return Alert.alert("Please Select Two Images");
    }

    setImages(data);
    toggleGallery();
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

  const renderImageCollage = () => {
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
        <Gallery onDone={onDone} goBack={toggleGallery} />
      ) : (
        <View style={styles.container}>
          <View style={styles.window}>{renderImageCollage()}</View>
          <TouchableOpacity
            onPress={toggleGallery}
            style={styles.selectButton}
            testID={"select-pictures"}
          >
            <Text style={{ color: "white" }}>Select pictures</Text>
          </TouchableOpacity>
          {images.length ? (
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                onPress={swap}
                style={styles.secondaryButton}
                testID={"swap-pictures"}
              >
                <Text>Swap pictures</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressCapture}
                style={styles.secondaryButton}
                testID={"take-screenshot"}
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
    padding: 10,
    backgroundColor: "black",
    borderWidth: 2,
    marginTop: 20,
    alignItems: "center",
    width: constants.width * 0.95
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
    alignContent: "center"
  },
  secondaryButton: {
    borderColor: "black",
    padding: 6,
    borderWidth: 2,
    flex: 0.5,
    marginTop: 10,
    marginHorizontal: 1,
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

export default ImageCollage;
