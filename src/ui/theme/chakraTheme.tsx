import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  fonts: {
    body: `'Montserrat', sans-serif`,
    heading: `'Montserrat', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        scrollBehavior: "smooth",
      },
    },
  },
  breakpoints: {
    base: "0em",
    sm: "35em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
});

export { chakraTheme };
