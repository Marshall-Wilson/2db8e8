import React from "react";
import moment from "moment";

import { Grid, CircularProgress } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button"

import PageTitle from "pages/mainlayout/PageTitle";
import PaginatedTable from "common/PaginatedTable";
import { useTableStyles } from "../../styles/table";

const Content = ({
  paginatedData,
  isDataLoading,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  selected,
  numSelected,
  handleCheckboxClick,
  handleSelectAll
}) => {
  const { checkboxInfoRoot } = useTableStyles();

  const rowData = paginatedData.map((row) => [ 
    (<Checkbox 
        checked={selected[row.id] === true} // comparison to true avoids uncontrolled checkbox when undefined
        onChange={e => handleCheckboxClick(e, row.id)}
        aria-label={`select ${row.first_name} ${row.last_name}`}
        color="primary"
    />),
    row.email,
    row.first_name,
    row.last_name,
    moment(row.created_at).format("MMM d"),
    moment(row.updated_at).format("MMM d"),
  ]);

  const selectedOnPage = paginatedData.reduce(((sum, row) => selected[row.id] ? sum + 1 : sum), 0);


  const checkboxInfo = (
    <div className={checkboxInfoRoot}>
      <p>{numSelected} of {count} selected</p>
      <Button variant="outlined">Add to Campaign</Button> {/* TODO: Add functionality for button */}
    </div>
  )

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
              indeterminate={selectedOnPage > 0 && selectedOnPage < paginatedData.length} 
              checked={paginatedData.length > 0 && selectedOnPage === paginatedData.length} 
              onChange={handleSelectAll}
              inputProps={{
                'aria-label': 'select all prospects on page',
              }}
              color="secondary"
            />),
            "Email",
            "First Name",
            "Last Name",
            "Created",
            "Updated",
          ]}
          rowData={rowData}
          checkboxInfo={checkboxInfo}
        />
      )}
    </>
  );
};

export default Content;
