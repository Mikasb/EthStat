import "./styles/App.css";
import CustomCardGroup from "./components/CustomCardGroup";
import DataTable from "./components/DataTable";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import { Grid, Card, TextField, Button } from "@mui/material";
import React, { Component } from "react";
import Typography from "@mui/material/Typography";

const footerHeaderHeight = 60;
const OUTER_CONTAINER_PADDING = 10;
const INNER_GRID_PADDING = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      maxFee: 0,
      avgFee: 0,
      feeSum: 0,
      topTen: [],
      transNum: 0,
      defiMap: {},
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState(
      {
        [name]: value,
      },
      () => console.log(this.state.maxFee)
    );
  };

  submitAddress = async () => {
    try {
      const response = await fetch("http://localhost:8080/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: this.state.address }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        for (const prop in data) {
          this.setState({
            [prop]: data[prop],
          });
        }
      } else {
        console.error(
          "Status:" +
            response.status +
            " " +
            response.statusText +
            " : " +
            data.message
        );
      }
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
            <Typography variant="h4" sx={{ fontFamily: "monospace" }}>
              Ethereum address stats
            </Typography>
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
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
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

          <CustomCardGroup
            maxFee={this.state.maxFee}
            avgFee={this.state.avgFee}
            feeSum={this.state.feeSum}
            transNum={this.state.transNum}
          />

          <Grid container={2} sx={{ pb: INNER_GRID_PADDING }}>
            <Grid item xs={6} md={6} sm={6} lg={6} sx={{ pr: 3 }}>
              <Card variant="outlined">
                <PieChart defiMap={this.state.defiMap} />
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
            <DataTable topTen={this.state.topTen} />
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
