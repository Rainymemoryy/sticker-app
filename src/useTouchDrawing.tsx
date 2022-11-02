/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { SkPoint, useTouchHandler } from "@shopify/react-native-skia";
import { useRef } from "react";
import type { DrawingElements } from "./types";

interface Props {
  setElements: React.Dispatch<
    React.SetStateAction<DrawingElements | undefined>
  >;
}

export const useTouchDrawing = () => {
  const prevPointRef = useRef<SkPoint>();
  // const drawContext = useDrawContext();
  // const uxContext = useUxContext();

  return useTouchHandler({
    onStart: ({ x, y }) => {
      // switch (uxContext.state.menu) {
      //   case undefined:
      //   case "drawing":
      //   case "chooseSticker":
      //   case "colors": {
      //     const { color, size, pathType } = drawContext?.state;
      //     drawContext.commands.addElement(
      //       createPath(x, y, color, size, pathType)
      //     );
      //     break;
      //   }

      //   default:
      //     break;
      // }
      prevPointRef.current = { x, y };
    },
    onActive: ({ x, y }) => {
      // switch (uxContext.state.menu) {
      //   case undefined:
      //   case "drawing":
      //   case "chooseSticker":
      //   case "colors": {
      //     const element =
      //       drawContext.state.elements[drawContext.state.elements.length - 1];
      //     const xMid = (prevPointRef.current!.x + x) / 2;
      //     const yMid = (prevPointRef.current!.y + y) / 2;
      //     element?.path?.quadTo(
      //       prevPointRef.current!.x,
      //       prevPointRef.current!.y,
      //       xMid,
      //       yMid
      //     );
      //     break;
      //   }
      //   default:
      //     break;
      // }
      // const element =
      //   drawContext.state.elements[drawContext.state.elements.length - 1];
      // const xMid = (prevPointRef.current!.x + x) / 2;
      // const yMid = (prevPointRef.current!.y + y) / 2;
      // element?.path?.quadTo(
      //   prevPointRef.current!.x,
      //   prevPointRef.current!.y,
      //   xMid,
      //   yMid
      // );
      // prevPointRef.current = { x, y };
    },
  });
};
