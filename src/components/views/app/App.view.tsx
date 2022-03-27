import ListView from "_views/list/List.view";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeUtil from "../../utils/Theme.util";
import AppBar from "../app-bar/AppBar.view";
import CardView from "_views/card/Card.view";

const AppView = () => {
  return (
    <ThemeUtil>
      <CssBaseline>
        <AppBar />
        <ListView component={CardView} />
      </CssBaseline>
    </ThemeUtil>
  );
};

export default AppView;
