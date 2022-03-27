import type { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type CardViewProps = {
  title: string;
  body: string;
  image: {
    url: string;
    alt: string;
  };
};

const CardView: FC<CardViewProps> = ({ title, body, image: { url, alt } }) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={url} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardView;
