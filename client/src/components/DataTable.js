import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

function DataTable(props) {
  const { topTen } = props;

  const rows = [];
  let id = 1;
  topTen.forEach((transaction) => {
    rows.push({ id: id, col1: transaction.fee, col2: transaction.txHash });
    id++;
  });

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "col1", headerName: "Fees paid", width: 150 },
    { field: "col2", headerName: "Transaction hash", width: 600 },
  ];
  return (
    <div style={{ height: 350, width: "100%" }}>
      <Typography variant="h5" sx={{ fontFamily: "monospace" }}>
        TOP 10 transactions by fees spent
      </Typography>
      <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[0]} />
    </div>
  );
}

export default DataTable;
