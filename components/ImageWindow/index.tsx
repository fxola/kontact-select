import React from "react";
import { useCallback, useRef } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import ViewShot from "react-native-view-shot";
import { ImageType } from "../AssetSelector";

const ImageWindow = (
  props: { images: ImageType[]; onCapture: (uri: string) => void },
  ref: React.RefObject<ImageBackground>
) => {
  const { images, onCapture } = props;
  const translationXRef = useRef(new Animated.Value(0));
  const translationYRef = useRef(new Animated.Value(0));

  const onGestureEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: translationXRef.current,
            translationY: translationYRef.current
          }
        }
      ],
      { useNativeDriver: true }
    ),
    []
  );
  return (
    <ViewShot onCapture={onCapture}>
      <ImageBackground
        source={{ uri: images[0].uri }}
        resizeMode="cover"
        style={styles.imageBackground}
        ref={ref}
      >
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.Image
            source={{ uri: images[1].uri }}
            style={[
              styles.innerImage,
              {
                transform: [
                  { translateX: translationXRef.current },
                  { translateY: translationYRef.current }
                ]
              }
            ]}
          />
        </PanGestureHandler>
      </ImageBackground>
    </ViewShot>
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
    borderWidth: 1,
    marginTop: 20
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  innerImage: {
    width: "60%",
    height: "60%"
  }
});

export default React.forwardRef(ImageWindow);
