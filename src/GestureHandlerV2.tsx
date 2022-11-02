/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import {
  Skia,
  SkiaMutableValue,
  SkMatrix,
  SkRect,
  useSharedValueEffect,
} from "@shopify/react-native-skia";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  concat4,
  identity4,
  Matrix4,
  multiply4,
  processTransform3d,
  toMatrix3,
} from "react-native-redash";
import { vec3 } from "./MatrixHelpers";

interface GestureHandlerProps {
  matrix: SkiaMutableValue<SkMatrix>;
  dimensions: SkRect;
  debug?: boolean;
}

export const GestureHandlerV2 = ({
  matrix: skMatrix,
  dimensions,
  debug,
}: GestureHandlerProps) => {
  const { x, y, width, height } = dimensions;
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const matrix = useSharedValue(identity4);

  const origin = useSharedValue(vec3(0, 0, 0));

  useSharedValueEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any);
  }, matrix);

  const setMatrix = () => {
    // matrix.value = concat4(identity4, [
    //   { translateX: offset.value.x },
    //   { translateY: offset.value.y },
    //   {
    //     rotateZ: rotation.value,
    //   },
    //   {
    //     scale: scale.value,
    //   },
    // ]);
    matrix.value = processTransform3d([
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      {
        rotateZ: rotation.value,
      },
      {
        scale: scale.value,
      },
    ]);
  };

  useSharedValueEffect(() => {
    // console.log("offset");
    setMatrix();
  }, offset);

  useSharedValueEffect(() => {
    // console.log("scale");
    setMatrix();
  }, scale);

  useSharedValueEffect(() => {
    // console.log("rotation");
    setMatrix();
  }, rotation);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: x,
    top: y,
    width,
    height,
    backgroundColor: debug ? "rgba(100, 200, 300, 0.4)" : "transparent",
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const zoomOut = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = savedScale.value * 1.5;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Race(
    zoomOut,
    Gesture.Simultaneous(
      dragGesture,
      Gesture.Simultaneous(zoomGesture, rotateGesture)
    )
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
