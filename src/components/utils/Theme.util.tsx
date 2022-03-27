import type { FC } from "react";
import { useMemo } from "react";
import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material";
// import { useSelector } from "react-redux";
// import { selectColorMode } from "_slices/app/app.slice";
// import type { Shadows } from "@mui/material/styles/shadows";

const common: ThemeOptions = {
  // shape: {
  //   borderRadius: 15,
  // },
  // shadows: Array(25).fill("none") as Shadows,
};

const lightTheme: ThemeOptions = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: "#FF0000",
      },
    },
  },
};

const darkTheme: ThemeOptions = {};

const Theme: FC<{}> = ({ children }) => {
  // const mode = useSelector(selectColorMode);
  const mode = "dark";
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
        ...(mode === "dark" ? darkTheme : lightTheme),
        ...common,
      }),
    [mode]
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
