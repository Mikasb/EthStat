import "./styles/App.css";
import CustomDataCard from "./components/CustomDataCard";
import DataTable from "./components/DataTable";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import { Grid, Card, TextField, Button } from "@mui/material";
import React, { Component } from "react";

const footerHeaderHeight = 60;
const OUTER_CONTAINER_PADDING = 10;
const INNER_GRID_PADDING = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "0x1db3439a222c519ab44bb1144fc28167b4fa6ee6",
    };
  }

  submitAddress = async () => {
    try {
      const response = await fetch("http://localhost:8080/api", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.greeting);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{ p: OUTER_CONTAINER_PADDING, maxWidth: 1500, minWidth: 850 }}
        >
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
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            sx={{
              pt: INNER_GRID_PADDING,
              pl: INNER_GRID_PADDING,
              pr: INNER_GRID_PADDING,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Input your MetaMask address..."
              variant="outlined"
              sx={{ width: "40%" }}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              onClick={this.submitAddress}
            >
              Submit
            </Button>
          </Grid>

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
                name="AVERAGE"
                details="Average cost of a transaction"
              />
            </Grid>
            <Grid item xs={3} md={3} sm={3} lg={3}>
              <CustomDataCard
                margins={{ mt: 0, mr: 1, mb: 0, ml: 1 }}
                name="MEDIAN"
                details="Median cost of a transaction"
              />
            </Grid>
            <Grid item xs={3} md={3} sm={3} lg={3}>
              <CustomDataCard
                margins={{ mt: 0, mr: 1, mb: 0, ml: 1 }}
                name="MAX"
                details="Maximum paid for a transaction"
              />
            </Grid>
            <Grid item xs={3} md={3} sm={3} lg={3}>
              <CustomDataCard
                margins={{ mt: 0, mr: 0, mb: 0, ml: 1 }}
                name="TOTAL"
                details="The sum of all transactions paid"
              />
            </Grid>
          </Grid>

          <Grid container={2} sx={{ pb: INNER_GRID_PADDING }}>
            <Grid item xs={6} md={6} sm={6} lg={6} sx={{ pr: 3 }}>
              <Card variant="outlined">
                <PieChart />
              </Card>
            </Grid>
            <Grid item xs={6} md={6} sm={6} lg={6} sx={{ pl: 3 }}>
              <Card variant="outlined">
                <LineChart />
              </Card>
              <Card variant="outlined">
                <LineChart />
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <DataTable />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            lg={12}
            sx={{ height: footerHeaderHeight, pt: 5 }}
          >
            THIS IS FOOTER
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
