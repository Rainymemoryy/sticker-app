/* eslint-disable prettier/prettier */
/* eslint-disable no-lonely-if */
import { useTouchHandler } from "@shopify/react-native-skia";

export const useTouchDrawing = () => {
  return useTouchHandler({
    onStart: ({ x, y }) => {},
    onActive: ({ x, y }) => {},
    onEnd: () => {},
  });
};
