import React from "react";
import moment from "moment";

import { Grid, CircularProgress } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox"


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
  selected,
  handleCheckboxClick,
  handleSelectAll
}) => {
  const rowData = paginatedData.map((row) => [ 
    (<Checkbox 
        checked={selected[row.id] === true} // comparison to true avoids uncontrolled checkbox when undefined
        onChange={e => handleCheckboxClick(e, row.id)}
    />),
    row.email,
    row.first_name,
    row.last_name,
    moment(row.created_at).format("MMM d"),
    moment(row.updated_at).format("MMM d"),
  ]);

  const selectedOnPage = paginatedData.reduce(((sum, row) => selected[row.id] ? sum + 1 : sum), 0);

  return (
    <>
      <PageTitle>Prospects</PageTitle>
      {isDataLoading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <PaginatedTable  
          paginatedData={paginatedData}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          headerColumns={[ 
            (<Checkbox // Header checkbox for select/deselect all
              color="primary"
              indeterminate={selectedOnPage > 0 && selectedOnPage < paginatedData.length} 
              checked={paginatedData.length > 0 && selectedOnPage === paginatedData.length} 
              onChange={handleSelectAll}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />),
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
