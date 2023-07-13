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
        background: "#000000",
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
    Box:{
      defaultProps:{
        border:"none"
      }
    },
    Button:{
      baseStyle: {
        fontWeight: "bold", // Normally, it is "semibold"
      },
      variants: {
        "primary": {
          bg: "transparent",
          color:"#FFEC19",
          boxShadow: "1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19, 3px 3px 0px 0px #FFEC19, 4px 4px 0px 0px #FFEC19, 5px 5px 0px 0px #FFEC19",
          border: "solid 1.5px #FFEC19",
          borderRadius: "0",
          _hover:{filter: "brightness(250%)", boxShadow: "1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19" },
        },
        "secondary": {
          bg: "transparent",
          color: "#FFFFFF",
          boxShadow: "1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px #FFFFFF, 3px 3px 0px 0px #FFFFFF, 4px 4px 0px 0px #FFFFFF, 5px 5px 0px 0px #FFFFFF",
          border: "solid 1.5px #FFFFFF",
          borderRadius: "0",
          _hover:{color: "#23E5F1", border:"solid 1.5px #23E5F1", boxShadow: "1px 1px 0px 0px #23E5F1, 2px 2px 0px 0px #23E5F1" },
        },
      },
      defaultProps: {
        size: "lg", // default is md
      },
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "#23E5F1"
        }
      }
    },
    IconButton:{
      variants:{
        "no-bg": {
          bg:"transparent"
        }
      }
    }
  },
});

export default theme;
