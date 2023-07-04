import { extendTheme } from "@chakra-ui/react";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["IBM Plex Mono:300,400,500,600,700,800,700i,800i"],
  },
});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "#FFEC19",
        background: "#1C1C1C",
      },
    },
  },
  fonts: {
    heading: "IBM Plex Mono",
    body: "IBM Plex Mono",
  },
});

export default theme;
