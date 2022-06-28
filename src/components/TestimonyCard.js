import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function TestimonyCard({
  cardClass,
  mediaClass,
  contentClass,
  user,
  text,
}) {
  return (
    <Card xs={12} className={cardClass}>
      <CardMedia
        className={mediaClass}
        image={user.picture.large}
        title={`Portrait of ${user.name.first}`}
      />
      <CardContent className={contentClass}>
        <Typography variant="h4">{user.name.first}</Typography>
        <Typography variant="h6">{text}</Typography>
      </CardContent>
    </Card>
  );
}
