import {
  Typography,
  Box,
  Divider,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Grid,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { Loading } from "../components/Loading";
import { ErrorDialog } from "../components/ErrorDialog";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import {
  useGetUserRolesQuery,
  useGetUsersQuery,
} from "../redux/apis/UserDetails";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGetSearchFiltersQuery } from "../redux/apis/GenericLovs";
import { SingleSelect } from "../components/SingleSelect";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import dayjs from "dayjs";

export const Users = () => {
  //variables
  const navigate = useNavigate();
  const EMPTY_SEARCH_FILTERS = {
    filterType: 1,
    ID: "",
    fullName: "",
    email: "",
    role: "",
    startDate: null,
    endDate: null,
    sortBy: null,
    sortDirection: null,
    pageNo: 0,
    pageSize: 5,
  };

  const [searchFilters, setSearchFilters] = useState({
    ...EMPTY_SEARCH_FILTERS,
  });
  const [debounceSearchFilters, setDebounceSearchFilters] =
    useState(searchFilters);
  const [activeField, setActiveField] = useState(null);

  //apis
  const { data: usersList = [], isLoading } = useGetUsersQuery(
    debounceSearchFilters,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const { data: filterTypes = [1] } = useGetSearchFiltersQuery("SA");
  const { data: rolesList } = useGetUserRolesQuery();

  //functions
  useEffect(() => {
    const handler = setTimeout(() => {
      if (activeField === "date") {
        if (!searchFilters.startDate || !searchFilters.endDate) {
          return;
        }
      }
      setDebounceSearchFilters({
        ...searchFilters,
        startDate: searchFilters.startDate
          ? dayjs(searchFilters.startDate).format("DD-MM-YYYY")
          : null,
        endDate: searchFilters.endDate
          ? dayjs(searchFilters.endDate).format("DD-MM-YYYY")
          : null,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilters, activeField]);

  const viewSpecificUsersDetails = (id) => {
    navigate(`/user/${id}`);
  };

  const handleSearchFilters = (e) => {
    if (
      e.target.name !== "filterType" &&
      e.target.name !== "sortBy" &&
      e.target.name !== "sortDirection" &&
      e.target.name !== "pageNo" &&
      e.target.name !== "pageSize"
    )
      setActiveField(e.target.value ? e.target.name : null);
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Box position="relative" width="100%">
        <Typography variant="h4" textAlign="center">
          User Details
        </Typography>

        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          display="flex"
          alignItems="center"
        >
          <Box width={150}>
            <SingleSelect
              name="filterType"
              options={filterTypes}
              value={searchFilters.filterType}
              onChange={handleSearchFilters}
              customHeight={40}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box height={40} />
      <Box mx={3}>
        <Grid container spacing={5}>
          <Grid size={3}>
            <TextField
              label="ID"
              name="ID"
              value={searchFilters.ID}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "ID"}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              label="Name"
              name="name"
              value={searchFilters.name}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "name"}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              label="Email"
              name="email"
              value={searchFilters.email}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "email"}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={3}>
            <SingleSelect
              name={"role"}
              label={"Role Name"}
              options={rolesList}
              value={searchFilters.role}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "role"}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                format="DD-MM-YYYY"
                name="startDate"
                value={searchFilters.startDate}
                disabled={activeField !== null && activeField !== "date"}
                onChange={(newValue) => {
                  setSearchFilters({ ...searchFilters, startDate: newValue });
                  setActiveField(newValue ? "date" : null);
                }}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                format="DD-MM-YYYY"
                name="endDate"
                value={searchFilters.endDate}
                disabled={activeField !== null && activeField !== "date"}
                onChange={(newValue) => {
                  setSearchFilters({ ...searchFilters, endDate: newValue });
                  setActiveField(newValue ? "date" : null);
                }}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        mb={3}
        mr={3}
        gap={2}
        mt={3}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<RestartAltIcon />}
          sx={{ color: "white", fontWeight: "600" }}
          onClick={() => {
            setSearchFilters(EMPTY_SEARCH_FILTERS);
            setActiveField(null);
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ color: "white", fontWeight: "600" }}
          onClick={() => {
            navigate("/create-user/");
          }}
        >
          Create New User
        </Button>
      </Box>
      <Table component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>View More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList?.content?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.userCode}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      viewSpecificUsersDetails(user.id);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                page={searchFilters.pageNo}
                rowsPerPage={searchFilters.pageSize}
                count={usersList?.totalElements}
                onPageChange={(e, newPage) => {
                  setSearchFilters({ ...searchFilters, pageNo: newPage });
                }}
                onRowsPerPageChange={(e) => {
                  setSearchFilters({
                    ...searchFilters,
                    pageSize: e.target.value,
                    pageNo: 0,
                  });
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Table>
    </>
  );
};
