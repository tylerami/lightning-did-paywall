import { extendTheme } from "@chakra-ui/react";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "IBM Plex Mono:300,400,500,600,700,800,700i,800i",
      "IBM Plex Sans:300,400,500,600,700,800,700i,800i",
    ],
  },
});

const theme = extendTheme({
  styles: {
    global: {
      brand: {
        yellow: "#FFEC19",
        cyan: "#23E5F1"
      },
      body: {
        color: "#FFEC19",
        background: "#1C1C1C",
        primaryFill: "#FFFFFF",
        secondaryFill: "#EEEEEE"
      },
    },
  },
  fonts: {
    heading: "IBM Plex Mono",
    body: "IBM Plex Mono",
  },
  components: {
    Button:{
        // 1. We can update the base styles
        baseStyle: {
          fontWeight: "bold", // Normally, it is "semibold"
        },
        sizes: {
        },
        // 3. We can add a new visual variant
        variants: {
          "primary": {
            bg: "#FFEC19",
            color:"#000",
            _hover: {filter: "brightness(150%);"}
          },
          "secondary": {
            bg: "#FFFFFF",
            color: "#1C1C1C",
            _hover:{ background: "#23E5F1", transition: "200ms ease" }
          },
        },
        // 6. We can overwrite defaultProps
        defaultProps: {
          size: "lg", // default is md
          variant: "primary"
        },
      },
    }
});

export default theme;
