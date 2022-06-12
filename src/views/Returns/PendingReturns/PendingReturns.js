import * as React from "react";
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
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import SideBar from "../../../components/Sidebar";

function createData(
  CreatedDate,
  ID,
  RecipientName,
  Phone,
  Description,
  District,
  City,
  COD,
  Status
) {
  return {
    CreatedDate,
    ID,
    RecipientName,
    Phone,
    Description,
    District,
    City,
    COD,
    Status,
  };
}

const rows = [
  createData(
    "11/05/2022 11.42am",
    34393535,
    "Mikasa",
    "0770543554",
    "Product",
    "Colombo",
    "Colombo-Pettah",
    233,
    "Delivered"
  ),
  createData(
    "03/09/2022 02:37 pm",
    34390937,
    "Thuhini",
    "0988765432",
    "Test",
    "Matale",
    "Matale",
    0,
    "Picked Up"
  ),
  createData(
    "10/05/2022 11.42am",
    34363535,
    "Mikasa",
    "0770543554",
    "Product",
    "Colombo",
    "Colombo-Pettah",
    233,
    "Delivered"
  ),
  createData(
    "01/09/2022 02:37 pm",
    343930537,
    "Thuhini",
    "0988765432",
    "Test",
    "Matale",
    "Matale",
    0,
    "Picked Up"
  ),
  createData(
    "01/05/2022 11.42am",
    34313535,
    "Mikasa",
    "0770543554",
    "Product",
    "Colombo",
    "Colombo-Pettah",
    233,
    "Delivered"
  ),
  createData(
    "01/03/2022 02:37 pm",
    34393437,
    "Thuhini",
    "0988765432",
    "Test",
    "Matale",
    "Matale",
    0,
    "Picked Up"
  ),
];

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
              "aria-label": "select all Shipments",
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
            <TableSortLabel
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
            </TableSortLabel>
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
          variant="h4"
          TableSortLabel
          id="tableTitle"
          component="div"
        >
          All Shipments
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
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

export default function PendingReturns() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.CreatedDate);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, CreatedDate) => {
    const selectedIndex = selected.indexOf(CreatedDate);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, CreatedDate);
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (CreatedDate) => selected.indexOf(CreatedDate) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
        <div style={{ paddingTop: 100 }}>
          <Paper
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              marginLeft: 45,
            }}
          >
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.CreatedDate);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          align="Left"
                          onClick={(event) =>
                            handleClick(event, row.CreatedDate)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.CreatedDate}
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
                            {row.CreatedDate}
                          </TableCell>
                          <TableCell align="left">{row.ID}</TableCell>
                          <TableCell align="left">
                            {row.RecipientName}
                          </TableCell>
                          <TableCell align="left">{row.Phone}</TableCell>
                          <TableCell align="left">{row.Description}</TableCell>
                          <TableCell align="left">{row.District}</TableCell>
                          <TableCell align="left">{row.City}</TableCell>
                          <TableCell align="left">{row.COD}</TableCell>
                          <TableCell align="left">{row.Status}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </Box>
    </div>
  );
}
