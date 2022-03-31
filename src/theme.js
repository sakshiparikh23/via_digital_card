import { extendTheme, gradient, useColorModeValue } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { mode } from "@chakra-ui/theme-tools";
// import Button from "./Button.ts";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/400.css";

const breakpoints = createBreakpoints({
  xs: "30em", // 480px
  sm: "40em", // 640px
  "2sm": "48em", // 768px
  md: "52em", // 832px
  lg: "64em", //1024px
  xl: "80em", //1280px
  "2xl": "96em", //1536px
});
// Box: {
//   borderColor: theme.colorMode === "light" ? "gray.200" : "gray.900"
// }
// const value = useColorModeValue("white", "black");

const theme = extendTheme({
  fonts: {
    body: "Open Sans",
  },
  colors: {
    orange: {
      100: "#ff8533",
    },
    red: {
      100: "#f73131",
    },
    lightblue: {
      100: "#60d7f7",
    },
    purple: {
      100: "#d063ff",
    },
    brand: {
      500: "#7ECE05",
    },
    greenBrand: {
      100: "#77C208",
    },

    gray: {
      100: "#8A8A8A",
      200: "#E7E7E7",
      300: "#646468",
    },
    black: {
      100: "#353647",
      200: "#242734",
    },
    brand: {
      100: "#7ECE05",
      200: "#7ECE05",
      300: "#7ECE05",
      400: "#7ECE05",
      500: "#7ECE05",
      600: "#7ECE05",
      700: "#7ECE05",
      800: "#7ECE05",
      900: "#7ECE05",
    },
  },

  components: {
    Button: {
      variants: {
        red: {
          bg: "#f73131",
          _hover: {
            bg: "#f73131",
          },
          _active: {
            bg: "#eb1515",
          },
        },
        lightblue: {
          bg: "#60d7f7",
          _hover: {
            bg: "#60d7f7 ",
          },
          _active: {
            bg: "60d7f7 ",
          },
        },
        orange: {
          bg: "#ff8533",
          _hover: {
            bg: "#ff8533",
          },
          _active: {
            bg: "#ff8533",
          },
        },
        purple: {
          bg: "#d063ff",
          _hover: {
            bg: "#d063ff",
          },
          _active: {
            bg: "#d063ff",
          },
        },
        solid: (props) => ({
          bg: "linear-gradient(97.21deg, #88E000 29.8%, #77C208 69.57%)",
          color: "white",
          _hover: {
            bg: "linear-gradient(97.21deg, #7EC90A 29.8%, #88E105 69.57%)",
          },
          _active: {
            bg: "#7ECE05",
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "10px",
            border: "1px",
            borderColor: "#88E000",
          },
          _focus: {
            border: "1px",
            borderColor: "#88E000",
            boxShadow: "none",
          },
        },
      },
    },
    Steps,
  },
  breakpoints,
});

export default theme;
