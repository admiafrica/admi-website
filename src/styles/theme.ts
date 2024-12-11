import { createTheme } from "@mantine/core";

import { generateColors } from "@mantine/colors-generator";

export const defaultTheme = createTheme({
  colors: {
    "admi-orange": generateColors("#BA2E36"),
    "admi-shamrok": generateColors("#08F6CF")
  },
  primaryColor: "admi-orange",
});
