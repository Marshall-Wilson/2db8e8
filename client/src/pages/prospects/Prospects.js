import React, { useState, useEffect } from "react";
import withAuth from "common/withAuth";
import Drawer from "common/Drawer";
import ProspectsContent from "./ProspectsContent";
import axios from "axios";
import { DEFAULT_NUM_ROWS_PER_PAGE } from "../../constants/table";

const Prospects = () => {
  const [prospectsData, setProspectsData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_NUM_ROWS_PER_PAGE);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState({});
  const [numSelected, setNumSelected] = useState(0);

  const handleChangeRowsPerPage = (event, _) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(0);
  };

  const handleChangePage = (_, index) => {
    setCurrentPage(index);
  };

  const updateNumSelected = (newSelected) => {
    setNumSelected(Object.values(newSelected).reduce(((sum, isSelected) => isSelected ? sum + 1 : sum), 0));
  }

  const handleCheckboxClick = (e, id) => {
    let newSelected = {...selected, [id]: !selected[id]};
    setSelected(newSelected);
    updateNumSelected(newSelected);
  }

  const handleSelectAll = (e) => {
    let newSelected = {...selected};
    prospectsData.map(row => {
      newSelected[row.id] = e.target.checked;
    })
    setSelected(newSelected);
    updateNumSelected(newSelected);
  }

  // TODO: set up handler for "add to campaign" click 

  useEffect(() => {
    const fetchProspects = async () => {
      setIsDataLoading(true);

      try {
        const resp = await axios.get(
          `/api/prospects?page=${currentPage}&page_size=${rowsPerPage}`,
        );
        if (resp.data.error) throw new Error(resp.data.error);
        setProspectsData(resp.data.prospects);
        setCount(resp.data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchProspects();
  }, [rowsPerPage, currentPage]);

  return (
    <>
      <Drawer
        RightDrawerComponent={
          <ProspectsContent
            isDataLoading={isDataLoading}
            paginatedData={prospectsData}
            count={count}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            selected={selected}
            numSelected={numSelected}
            handleCheckboxClick={handleCheckboxClick}
            handleSelectAll={handleSelectAll}
          />
        }
      />
      {/* TODO: Include modal/dialog for adding prospects. 
      Create new component for loading campaign options */}
    </>
  );
};

export default withAuth(Prospects);
