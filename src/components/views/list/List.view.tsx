import type { FC } from "react";
import { useFakeApi } from "hooks";
import type CardView from "../card/Card.view";
import { Container } from "@mui/material";

type ListViewProps = {
  component: typeof CardView;
};

const ListView: FC<ListViewProps> = ({ component: CardView }) => {
  const list = useFakeApi();

  if (!list.length) {
    return (
      <Container style={{ textAlign: "center" }}>Nothing here...</Container>
    );
  }

  return (
    <Container style={{ maxWidth: 600 }} sx={{ mt: 2 }}>
      {list.map(({ title, body }) => (
        <CardView
          title={title}
          body={body}
          image={{ url: "img.png", alt: "hi" }}
        />
      ))}
    </Container>
  );
};

export default ListView;
