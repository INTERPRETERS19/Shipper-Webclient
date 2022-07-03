import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";
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
import QrCodeIcon from "@mui/icons-material/QrCode";

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
  {
    id: "DeliveryFee",
    numeric: true,
    disablePadding: true,
    label: "DeliveryFee",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

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
            sx={{ fontWeight: 900 }}
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
  const navigate = useNavigate();
  const { numSelected, selectedShipments, getShipments, setSelected } = props;
  const handleDelete = async () => {
    selectedShipments.map(async (selectedShipment) => {
      const res = await Client.post("/delete_shipment", {
        id: selectedShipment,
      });
      if (res.data.success) {
        console.log(res.data.message);
        getShipments();
      } else {
        console.log("Delete not successful");
      }
    });
  };
  const componentA = () => {
    navigate("/shipment/qrcode", { state: { id: selectedShipments } });
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
        ></Typography>
      ) : (
        <h2> New Shipments</h2>
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
        ""
      )}
      {numSelected > 0 ? (
        <Tooltip title="">
          <IconButton
            onClick={() => {
              componentA();
            }}
          >
            <QrCodeIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
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
  }, []);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [dense, setDense] = useState(false);
  const [value, setValue] = useState(new Date());

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

  const upstatus = async () => {
    selected.map(async (selectedShipment) => {
      const date = new Date().valueOf();
      if (value > date) {
        const res = await Client.post("/update_shipment", {
          id: selectedShipment,
          value,
        });
        if (res.data.success) {
          console.log(res.data.message);
          window.confirm("PickUp request is send to Service Provider.");
          getAllNewShipments();
          setOpenPopup(false);
          setValue(new Date());
        } else {
          console.log("Update not successful");
        }
      } else {
        window.confirm(
          "We cannot take PickUp date as past date...Please Select appropriate date to pickup."
        );
      }
    });
  };

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
                size={dense ? "small" : "medium"}
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
                          <TableCell
                            align="left"
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="left">
                            {row.recipient_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.mobile_phone_number}
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">
                            {" "}
                            {row.receipient_address !== undefined
                              ? ""
                              : row.r_district}
                          </TableCell>
                          <TableCell align="left">
                            {" "}
                            {row.receipient_address !== undefined
                              ? ""
                              : row.r_city}
                          </TableCell>
                          <TableCell align="left">{row.COD}</TableCell>
                          <TableCell align="left">{row.delivery_fee}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
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
                <Button
                  sx={{ padding: "10px" }}
                  variant="contained"
                  onClick={upstatus}
                >
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
