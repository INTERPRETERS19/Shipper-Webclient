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
import { ShipmentContext } from "../../../context/ShipmentProvider/ShipmentProvider";
import Client from "../../../api/Client";

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
    id: "ID",
    numeric: false,
    disablePadding: false,
    label: "ID",
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
    id: "Street No",
    numeric: false,
    disablePadding: false,
    label: "Street No",
  },
  {
    id: "City",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "District",
    numeric: false,
    disablePadding: false,
    label: "District",
  },
  {
    id: "COD",
    numeric: true,
    disablePadding: true,
    label: "COD Amount",
  },
  {
    id: "Status",
    numeric: false,
    disablePadding: false,
    label: "Status",
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
              "aria-label": "select all shipments",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 900 }}
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
  const { numSelected, selectedShipments, getShipments, updateSelected } =
    props;
  const handleDelete = async () => {
    selectedShipments.map(async (selectedShipment) => {
      const res = await Client.post("/delete_shipment", {
        id: selectedShipment,
      });
      if (res.data.success) {
        console.log(res.data.message);
        getShipments();
      } else {
        if (!res.data.isNewOrDelivered) {
          window.alert(res.data.error);
        }
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
        <h2>All Shipments</h2>
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
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AllShipment() {
  const { allShipments, getAllShipments } = useContext(ShipmentContext);
  useEffect(() => {
    getAllShipments();
  }, []);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = (
        allShipments !== undefined ? allShipments.data : []
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (allShipments !== undefined ? allShipments.count : 0)
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
              width: "72%",
              display: "flex",
              flexDirection: "column",
              marginLeft: 45,
            }}
          >
            <EnhancedTableToolbar
              numSelected={selected.length}
              selectedShipments={selected}
              getShipments={getAllShipments}
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
                  rowCount={allShipments !== undefined ? allShipments.count : 0}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(
                    allShipments !== undefined ? allShipments.data : [],
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
                          <TableCell align="left">{row.r_no_street}</TableCell>
                          <TableCell align="left">{row.r_city}</TableCell>
                          <TableCell align="left">{row.r_district}</TableCell>
                          <TableCell align="left">{row.COD}</TableCell>
                          <TableCell align="left">
                            {row.current_status}
                          </TableCell>
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
              count={allShipments !== undefined ? allShipments.count : 0}
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
