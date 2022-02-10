import CustomDataCard from "./CustomDataCard";
import { Grid } from "@mui/material";

const INNER_GRID_PADDING = 5;

function CustomCardGroup(props) {
  return (
    <Grid
      container
      xs={12}
      md={12}
      sm={12}
      lg={12}
      sx={{ pb: INNER_GRID_PADDING }}
    >
      <Grid item xs={3} md={3} sm={3} lg={3}>
        <CustomDataCard
          margins={{ mt: 0, mr: 1, mb: 0, ml: 0 }}
          name="TRANSACTION #"
          value={props.transNum}
          details="Total number of transactions"
        />
      </Grid>
      <Grid item xs={3} md={3} sm={3} lg={3}>
        <CustomDataCard
          margins={{ mt: 0, mr: 1, mb: 0, ml: 1 }}
          name="TOTAL SUM"
          value={props.feeSum}
          details="Total sum of transactions"
        />
      </Grid>
      <Grid item xs={3} md={3} sm={3} lg={3}>
        <CustomDataCard
          margins={{ mt: 0, mr: 1, mb: 0, ml: 1 }}
          name="MAX"
          value={props.maxFee}
          details="Maximum paid for a transaction"
        />
      </Grid>
      <Grid item xs={3} md={3} sm={3} lg={3}>
        <CustomDataCard
          margins={{ mt: 0, mr: 0, mb: 0, ml: 1 }}
          name="AVERAGE"
          value={props.avgFee}
          details="Average paid for a transaction"
        />
      </Grid>
    </Grid>
  );
}
export default CustomCardGroup;
