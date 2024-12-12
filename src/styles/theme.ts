import { createTheme } from "@mantine/core";

import { generateColors } from "@mantine/colors-generator";

export const defaultTheme = createTheme({
  colors: {
    "admiOrange": generateColors("#BA2E36"),
    "admiShamrok": generateColors("#08F6CF"),
    "admiRed": generateColors('#F60834')
  },
  primaryColor: "admiOrange",
});
