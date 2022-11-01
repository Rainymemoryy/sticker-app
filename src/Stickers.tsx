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

import { HelloSticker, HelloStickerDimensions } from "./HelloSticker";
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker";
import { GestureHandler } from "./GestureHandler";
import { Picture, PictureDimensions } from "./Picture";
import { GestureHandlerV2 } from "./GestureHandlerV2";

const { width, height } = Dimensions.get("window");

const zurich = require("./assets/zurich.jpg");
const aveny = require("./assets/aveny.ttf");

export const Stickers = () => {
  // const pictureMatrix = useValue(Skia.Matrix());
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
          {/* <Picture matrix={pictureMatrix} image={image} /> */}
          <HelloSticker matrix={helloMatrix} />
          <LocationSticker font={font} matrix={locationMatrix} />
        </Canvas>
        {/* <GestureHandler
          matrix={pictureMatrix}
          dimensions={PictureDimensions}
          debug={true}
        /> */}
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
