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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SideBar from "../../../components/Sidebar";
import Client from "../../../api/Client";
import { Grid, Stack } from "@mui/material";
import { Button } from "@mui/material";
import Popup from "../../../components/Popup";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ShipmentContext } from "../../../context/ShipmentProvider/ShipmentProvider";
import { id } from "date-fns/locale";

// function createData(
//   created_at,
//   id,
//   recipient_name,
//   mobile_phone_number,
//   description,
//   receipient_address_district,
//   receipient_address_city,
//   COD
// ) {
//   return {
//     created_at,
//     id,
//     recipient_name,
//     mobile_phone_number,
//     description,
//     receipient_address_district,
//     receipient_address_city,
//     COD,
//   };
// }

// const rows = [
//   createData(
//     "11/05/2022 11.42am",
//     34393535,
//     "gowtham",
//     "0770543554",
//     "Product",
//     "mathala",
//     "Mathala-Pettah",
//     6000,
//     "New "
//   ),
//   createData(
//     "16/05/2022 10.02am",
//     34390937,
//     "Saman perera",
//     "0988765432",
//     "goods",
//     "Matale",
//     "Matale",
//     0,
//     "New "
//   ),
//   createData(
//     "14/05/2022 09.42am",
//     34378378,
//     "perera",
//     "098445432",
//     "goods",
//     "Matale",
//     "Matale",
//     0,
//     "New "
//   ),
//   createData(
//     "06/05/2022 05:30 pm",
//     43239305,
//     "Nipuni",
//     "076993672",
//     "buns",
//     "Mannar",
//     "Muthurr",
//     8900,
//     "New "
//   ),
//   createData(
//     "07/03/2022 08.42am",
//     87653535,
//     "Saki sasu",
//     "0760549854",
//     "hair bands",
//     "Kandy",
//     "Kandy-Town",
//     233,
//     "New "
//   ),
//   createData(
//     "04/06/2022 06.57am",
//     87430937,
//     "janith",
//     "0776543234",
//     "frock bulk",
//     "Jaffna",
//     "Jaffna-town",
//     0,
//     "New "
//   ),
//   createData(
//     "12/03/2022 09.42am",
//     33438937,
//     "Lavan",
//     "0785543289",
//     "Tea packets",
//     "Jaffna",
//     "Kodikamam",
//     5000
//   ),
// ];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: "CreatedDate",
    numeric: false,
    disablePadding: true,
    label: "Created date",
  },
  {
    id: "TRK",
    numeric: false,
    disablePadding: true,
    label: "TRK",
  },
  {
    id: "RecipientName",
    numeric: false,
    disablePadding: false,
    label: "Recipient Name",
  },
  {
    id: "Phone",
    numeric: true,
    disablePadding: true,
    label: "Phone Number",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "District",
    numeric: false,
    disablePadding: false,
    label: "District",
  },
  {
    id: "City",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "COD",
    numeric: true,
    disablePadding: true,
    label: "COD Amount",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select new request",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="Left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel> */}
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
  const { numSelected, selectedShipments, getShipments } = props;
  const handleDelete = async () => {
    selectedShipments.map(async (selectedShipment) => {
      const res = await Client.post("/delete_shipment", {
        id: selectedShipment,
      });
      if (res.data.success) {
        console.log(res.data.message);
        // updateSelected(numSelected - 1);
        getShipments();
      } else {
        console.log("Delete not successful");
      }
    });
  };
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
          New Shipments
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              window.confirm(
                "Are you sure you want to delete these shipments?"
              ) && handleDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function NewShipments() {
  const { allNewShipments, getAllNewShipments } = useContext(ShipmentContext);
  useEffect(() => {
    getAllNewShipments();
    // console.log(allShipments);
  }, []);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [dense, setDense] = useState(false);
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = (
        allNewShipments !== undefined ? allNewShipments.data : []
      ).map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    // console.log(selected);
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
            (allNewShipments !== undefined ? allNewShipments.count : 0)
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
              getShipments={getAllNewShipments}
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
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={
                    allNewShipments !== undefined ? allNewShipments.count : 0
                  }
                />
                <TableBody>
                  {stableSort(
                    allNewShipments !== undefined ? allNewShipments.data : [],
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
                          onClick={(event) => handleClick(event, row._id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
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
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">
                            {row.recipient_name}
                          </TableCell>
                          <TableCell align="left">
                            {row.mobile_phone_number}
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.r_city}</TableCell>
                          <TableCell align="left">{row.r_district}</TableCell>
                          <TableCell align="left">{row.COD}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                    // style={{
                    //   height: (dense ? 33 : 53) * emptyRows,
                    // }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allNewShipments !== undefined ? allNewShipments.count : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Grid sx={{ padding: "15px", paddingLeft: "85%" }}>
              <Button
                sx={{ padding: "10px" }}
                variant="contained"
                onClick={() => setOpenPopup(true)}
              >
                Pickup Request
              </Button>
            </Grid>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
              <Stack>
                <div>
                  <p>Please select your convenient Date and time to PickUp</p>
                  <br></br>
                </div>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Paper>
                  <Stack spacing={8}>
                    <DateTimePicker
                      disableToolbar
                      variant="inline"
                      inputVariant="outlined"
                      value={value}
                      onChange={handleChange}
                      // inputFormat="dd/mm/yyyy hh:mm"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </Paper>
              </LocalizationProvider>
              <Stack
                sx={{
                  padding: "15px",
                  paddingLeft: "35%",
                }}
                spacing={2}
                direction="row"
              >
                <Button
                  sx={{ padding: "10px" }}
                  variant="outlined"
                  onClick={() => setOpenPopup(false)}
                >
                  Cancle
                </Button>
                <Button sx={{ padding: "10px" }} variant="contained">
                  Pickup Request
                </Button>
              </Stack>
            </Popup>
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
