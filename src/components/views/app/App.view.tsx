import { useHook } from "hooks";
import ListView from "_views/list/List.view";
import { Button } from "@mui/material";

const AppView = () => {
  const hook = useHook();
  return (
    <>
      <div>{hook}</div>
      <Button variant="contained" onClick={() => alert("This is 2002")}>
        Hi
      </Button>
      <ListView />
    </>
  );
};

export default AppView;
