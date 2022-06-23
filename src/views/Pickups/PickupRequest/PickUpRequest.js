import React from "react";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SideBar from "../../../components/Sidebar";
import { ShipmentContext } from "../../../context/ShipmentProvider/ShipmentProvider";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "TRK",
    numeric: false,
    disablePadding: true,
    label: "TRK",
  },
  {
    id: "CreatedDate",
    numeric: false,
    disablePadding: true,
    label: "Created date",
  },
  {
    id: "PickupDate",
    numeric: false,
    disablePadding: true,
    label: "Pickup date",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "Status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="Left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", padding: 3 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Pickup requests
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Pickups() {
  const { allPickups, getAllPickups } = useContext(ShipmentContext);
  useEffect(() => {
    getAllPickups();
  }, []);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //const [openPopup, setOpenPopup] = React.useState(false);
  const [dense, setDense] = useState(false);
  // const [value, setValue] = React.useState(new Date());

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (allPickups !== undefined ? allPickups.count : 0)
        )
      : 0;

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",

        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        <SideBar />
        <div style={{ paddingTop: 140 }}>
          <Paper
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              marginLeft: 45,
            }}
          >
            <EnhancedTableToolbar
              numSelected={selected.length}
              selectedShipments={selected}
              getShipments={getAllPickups}
              updateSelected={setSelected}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                // size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  //   onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={allPickups !== undefined ? allPickups.count : 0}
                />
                <TableBody>
                  {stableSort(
                    allPickups !== undefined ? allPickups.data : [],
                    getComparator(order, orderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          align="Left"
                          //   onClick={(event) => handleClick(event, row._id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell
                            align="left"
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell
                            align="left"
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.created_at.substring(0, 10)}
                          </TableCell>
                          <TableCell
                            align="left"
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.pickup_date.substring(0, 10)}
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">
                            {row.current_status}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allPickups !== undefined ? allPickups.count : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  );
}
