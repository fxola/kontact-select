import React from "react";
import { useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Animated,
  PanResponder
} from "react-native";
import ViewShot from "react-native-view-shot";
import constants from "../../constants";
import { ImageType } from "../AssetSelector";

const HEIGHT = constants.height * 0.7;
const WIDTH = constants.width * 0.95;

const ImageWindow = (
  props: { images: ImageType[]; onCapture: (uri: string) => void },
  ref: React.RefObject<ImageBackground>
) => {
  const { images, onCapture } = props;

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <ViewShot onCapture={onCapture}>
      <ImageBackground
        source={{ uri: images[0].uri }}
        resizeMode="cover"
        style={styles.imageBackground}
        ref={ref}
      >
        <Animated.Image
          {...panResponder.panHandlers}
          source={{ uri: images[1].uri }}
          style={[
            styles.innerImage,
            {
              transform: [
                {
                  translateX: pan.x.interpolate({
                    inputRange: [0, WIDTH / 2.5],
                    outputRange: [0, WIDTH / 2.5],
                    extrapolate: "clamp"
                  })
                },
                {
                  translateY: pan.y.interpolate({
                    inputRange: [0, HEIGHT / 2.5],
                    outputRange: [0, HEIGHT / 2.5],
                    extrapolate: "clamp"
                  })
                }
              ]
            }
          ]}
        />
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
