/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  Skia,
  useFont,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, SafeAreaView, View } from "react-native";

import { GestureHandler } from "./GestureHandler";
import { GestureHandlerV2 } from "./GestureHandlerV2";
import { HelloSticker, HelloStickerDimensions } from "./HelloSticker";
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker";

const { width, height } = Dimensions.get("window");

const zurich = require("./assets/zurich.jpg");
const aveny = require("./assets/aveny.ttf");

export const Stickers = () => {
  const touchHandle = useTouchHandler({
    onStart: ({ x, y }) => {
      console.log(x, y);
    },
    onActive: ({ x, y }) => {
      console.log(x, y);
    },
    onEnd: () => {
      console.log("end");
    },
  });
  const helloMatrix = useValue(Skia.Matrix());
  const locationMatrix = useValue(Skia.Matrix());
  const image = useImage(zurich);
  const font = useFont(aveny, 56);
  if (!image || !font) {
    return null;
  }

  return (
    <SafeAreaView>
      <View>
        <Canvas
          style={{ width, height, backgroundColor: "red" }}
          onTouch={touchHandle}
        >
          <HelloSticker matrix={helloMatrix} />
          <LocationSticker font={font} matrix={locationMatrix} />
        </Canvas>

        <GestureHandler
          matrix={helloMatrix}
          dimensions={HelloStickerDimensions}
        />
        <GestureHandlerV2
          matrix={locationMatrix}
          dimensions={LocationStickerDimensions}
        />
      </View>
    </SafeAreaView>
  );
};
