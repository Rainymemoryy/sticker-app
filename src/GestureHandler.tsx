import type {
  SkiaMutableValue,
  SkMatrix,
  SkRect,
} from "@shopify/react-native-skia";
import { Skia, useSharedValueEffect } from "@shopify/react-native-skia";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Matrix4, multiply4, toMatrix3, identity4 } from "react-native-redash";

import { concat, vec3 } from "./MatrixHelpers";

interface GestureHandlerProps {
  matrix: SkiaMutableValue<SkMatrix>;
  dimensions: SkRect;
  debug?: boolean;
}

export const GestureHandler = ({
  matrix: skMatrix,
  dimensions,
  debug,
}: GestureHandlerProps) => {
  // const { x, y, width, height } = dimensions;
  // const origin = useSharedValue(vec3(0, 0, 0));
  // const matrix = useSharedValue(identity4);
  // const offset = useSharedValue(identity4);

  // useSharedValueEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any);
  // }, matrix);

  // const pan = Gesture.Pan().onChange((e) => {
  //   matrix.value = multiply4(
  //     Matrix4.translate(e.changeX, e.changeY, 0),
  //     matrix.value
  //   );
  // });

  // const rotate = Gesture.Rotation()
  //   .onBegin((e) => {
  //     origin.value = [e.anchorX, e.anchorY, 0];
  //     offset.value = matrix.value;
  //   })
  //   .onChange((e) => {
  //     matrix.value = concat(offset.value, origin.value, [
  //       { rotateZ: e.rotation },
  //     ]);
  //   });

  // const scale = Gesture.Pinch()
  //   .onBegin((e) => {
  //     origin.value = [e.focalX, e.focalY, 0];
  //     offset.value = matrix.value;
  //   })
  //   .onChange((e) => {
  //     matrix.value = concat(offset.value, origin.value, [{ scale: e.scale }]);
  //   });

  // const style = useAnimatedStyle(() => ({
  //   position: "absolute",
  //   left: x,
  //   top: y,
  //   width,
  //   height,
  //   backgroundColor: debug ? "rgba(100, 200, 300, 0.4)" : "transparent",
  //   transform: [
  //     { translateX: -width / 2 },
  //     { translateY: -height / 2 },
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     { matrix: matrix.value as any },
  //     { translateX: width / 2 },
  //     { translateY: height / 2 },
  //   ],
  // }));

  // return (
  //   <GestureDetector gesture={Gesture.Race(pan, rotate, scale)}>
  //     <Animated.View style={style} />
  //   </GestureDetector>
  // );
  const { x, y, width, height } = dimensions;
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  // useSharedValueEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any);
  // }, matrix);

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

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
