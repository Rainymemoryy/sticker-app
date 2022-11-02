/* eslint-disable prettier/prettier */
import { useTouchHandler } from "@shopify/react-native-skia";

export const useTouchDrawing = () => {
  return useTouchHandler({
    onStart: ({ x, y }) => {
      console.log("start", x, y);
    },
    onActive: ({ x, y }) => {
      console.log("move", x, y);
    },
    onEnd: () => {
      console.log("end");
    },
  });
};
