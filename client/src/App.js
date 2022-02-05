import "./styles/App.css";
import CustomDataCard from "./components/CustomDataCard";
import DataTable from "./components/DataTable";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import { Grid, Card, TextField } from "@mui/material";

function App() {
  const footerHeaderHeight = 60;

  return (
    <div className="App">
      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          lg={12}
          style={{ height: footerHeaderHeight }}
        >
          THIS IS HEADER
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            id="outlined-basic"
            label="Input your MetaMask address..."
            variant="outlined"
            sx={{ width: "40%" }}
          />
        </Grid>

        <Grid
          container
          xs={12}
          md={12}
          sm={12}
          lg={12}
          sx={{ ml: 10, mr: 10, mt: 5 }}
        >
          <Grid item xs={3} md={3} sm={3} lg={3}>
            <CustomDataCard
              margins={{ mt: 0, mr: 0, mb: 0, ml: 2 }}
              name="AVERAGE"
              details="Average cost of a transaction"
            />
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3}>
            <CustomDataCard
              margins={{ mt: 0, mr: 0, mb: 0, ml: 2 }}
              name="MEDIAN"
              details="Median cost of a transaction"
            />
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3}>
            <CustomDataCard
              margins={{ mt: 0, mr: 2, mb: 0, ml: 2 }}
              name="MAX"
              details="Maximum paid for a transaction"
            />
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3}>
            <CustomDataCard
              margins={{ mt: 0, mr: 0, mb: 0, ml: 0 }}
              name="TOTAL"
              details="The sum of all transactions paid"
            />
          </Grid>
        </Grid>

        <Grid item xs={6} md={6} sm={6} lg={6}>
          <Card variant="outlined" sx={{ ml: 10, mt: 5, p: 3 }}>
            <PieChart />
          </Card>
        </Grid>
        <Grid item xs={6} md={6} sm={6} lg={6}>
          <Card variant="outlined" sx={{ mr: 10, mt: 5, ml: 5, mb: 5, p: 2 }}>
            <LineChart />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          lg={12}
          sx={{ mr: 10, mt: 5, ml: 10, mb: 5 }}
        >
          <DataTable />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          lg={12}
          style={{ height: footerHeaderHeight }}
        >
          THIS IS FOOTER
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
