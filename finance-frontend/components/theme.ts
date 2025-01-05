// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      500: "#2A004E", 
    },
  },
  textStyles: {
    heading: {
      color: "white", 
    },
    body: {
      color: "white",
    },
  },
  styles: {
    global: {
      body: {
        backgroundColor: "#2A004E", 
        color: "white", 
      },
      a: {
        color: "white",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
