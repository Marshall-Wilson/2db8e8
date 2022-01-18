import React from "react";
import moment from "moment";

import { Grid, CircularProgress } from "@material-ui/core";

import PageTitle from "pages/mainlayout/PageTitle";
import PaginatedTable from "common/PaginatedTable";

const Content = ({
  paginatedData,
  isDataLoading,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const rowData = paginatedData.map((row) => [ 
    // TODO: add data for checkbox. maybe just: row.checkbox,
    row.email,
    row.first_name,
    row.last_name,
    moment(row.created_at).format("MMM d"),
    moment(row.updated_at).format("MMM d"),
  ]);
  return (
    <>
      <PageTitle>Prospects</PageTitle>
      {isDataLoading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <PaginatedTable  
          // TODO: add prop for "xx of xxx selected" and "add to campaign". possibly just boolean toggle
          paginatedData={paginatedData}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          headerColumns={[ 
            // TODO: column header with checkbox for checking/unchecking page
            "Email",
            "First Name",
            "Last Name",
            "Created",
            "Updated",
          ]}
          rowData={rowData} 
        />
      )}
    </>
  );
};

export default Content;
