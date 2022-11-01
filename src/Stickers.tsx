/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  Skia,
  useFont,
  useImage,
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
        <Canvas style={{ width, height }}>
          <HelloSticker matrix={helloMatrix} />
          <LocationSticker font={font} matrix={locationMatrix} />
        </Canvas>

        <GestureHandler
          matrix={helloMatrix}
          dimensions={HelloStickerDimensions}
          debug={true}
        />
        <GestureHandlerV2
          matrix={locationMatrix}
          dimensions={LocationStickerDimensions}
          debug={true}
        />
      </View>
    </SafeAreaView>
  );
};
