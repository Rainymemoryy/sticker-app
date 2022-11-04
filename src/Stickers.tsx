/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  DashPathEffect,
  DiscretePathEffect,
  Group,
  Paint,
  Path,
  Skia,
  useFont,
  useImage,
  useValue,
} from "@shopify/react-native-skia";
import React, { useMemo, useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";

import { GestureHandler } from "./GestureHandler";
import { GestureHandlerV2 } from "./GestureHandlerV2";
import { HelloSticker, HelloStickerDimensions } from "./HelloSticker";
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker";
import type { DrawingElement, DrawingElements } from "./types";
import { useTouchDrawing } from "./useTouchDrawing";

const { width, height } = Dimensions.get("window");

const zurich = require("./assets/zurich.jpg");
const aveny = require("./assets/aveny.ttf");

export const Stickers = () => {
  const helloMatrix = useValue(Skia.Matrix());
  const locationMatrix = useValue(Skia.Matrix());
  const [elements, setElements] = useState<DrawingElements>();
  const touchHandle = useTouchDrawing();

  const elementComponents = useMemo(
    () =>
      elements?.map((element: DrawingElement, index) => {
        switch (element.type) {
          case "image":
            return (
              // <Image
              //   fit="fill"
              //   key={index}
              //   image={element.image}
              //   rect={() => getBounds(element)}
              // />
              <></>
            );
          default:
            switch (element.pathType) {
              case "discreted":
                return (
                  <Group key={index}>
                    <Paint style="stroke" strokeWidth={4}>
                      <DiscretePathEffect length={3} deviation={5} />
                    </Paint>
                    <Path
                      path={element.path}
                      color={element.color}
                      style="stroke"
                      strokeWidth={element.size}
                      strokeCap="round"
                    />
                  </Group>
                );
              case "dashed":
                return (
                  <Group key={index}>
                    <Paint style="stroke" strokeWidth={4}>
                      <DashPathEffect
                        intervals={[element.size * 2, element.size * 2]}
                      />
                    </Paint>
                    <Path
                      path={element.path}
                      color={element.color}
                      style="stroke"
                      strokeWidth={element.size}
                      strokeCap="round"
                    />
                  </Group>
                );
              default:
                return (
                  <Path
                    key={index}
                    path={element.path}
                    color={element.color}
                    style="stroke"
                    strokeWidth={element.size}
                    strokeCap="round"
                  />
                );
            }
        }
      }),
    [elements]
  );

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
          {elementComponents}
          {/* <HelloSticker matrix={helloMatrix} /> */}
          <LocationSticker font={font} matrix={locationMatrix} />
        </Canvas>

        {/* <GestureHandler
          matrix={helloMatrix}
          dimensions={HelloStickerDimensions}
        /> */}
        <GestureHandlerV2
          matrix={locationMatrix}
          dimensions={LocationStickerDimensions}
        />
      </View>
    </SafeAreaView>
  );
};
