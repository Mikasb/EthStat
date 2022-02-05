import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CustomDataCard(props) {
  return (
    <Card
      sx={{
        ml: props.margins.ml,
        mt: props.margins.mt,
        mr: props.margins.mr,
        mb: props.margins.mb,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h5" component="div">
          SOMEWORDS
        </Typography>
        <Typography sx={{ mb: 1.5 }} />
        <Typography variant="body2">{props.details}</Typography>
      </CardContent>
    </Card>
  );
}

export default CustomDataCard;
