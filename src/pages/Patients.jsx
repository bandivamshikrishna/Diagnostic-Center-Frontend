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
  Menu,
  MenuItem,
} from "@mui/material";
import { Loading } from "../components/Loading";
import { ErrorDialog } from "../components/ErrorDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { useGetSearchFiltersQuery } from "../redux/apis/GenericLovs";
import { SingleSelect } from "../components/SingleSelect";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import {
  useGetMedicalTestLovsQuery,
  useGetMedicalTestsQuery,
  useActivateOrDeActivateMedicalTestMutation,
} from "../redux/apis/MedicalTest";

export const Patients = () => {
  //variables
  const navigate = useNavigate();
  const EMPTY_SEARCH_FILTERS = {
    filterType: 1,
    ID: "",
    category: "",
    testName: "",
    department: "",
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const useSuccessRef = useRef();
  const useErrorRef = useRef();

  //apis
  const {
    data: medicalTestsList = [],
    isLoading,
    isFetching,
    refetch: fetchUpdatedMedicalTests,
  } = useGetMedicalTestsQuery(debounceSearchFilters, {
    refetchOnMountOrArgChange: true,
  });
  const [
    activateOrDeActivateTest,
    { isLoading: isActivateOrDeActivateTestLoading },
  ] = useActivateOrDeActivateMedicalTestMutation();
  const { data: filterTypes = [1] } = useGetSearchFiltersQuery("SA");
  const { data: departmentsList } = useGetMedicalTestLovsQuery("DEPARTMENTS");
  const { data: categoriesList } = useGetMedicalTestLovsQuery("CATEGORIES");

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
    navigate(`/admin/medical-test/${id}`);
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

  const handleMedicalTestOpenMenu = (e, user) => {
    setAnchorEl(e.currentTarget);
    setSelectedUser(user);
  };

  const handleMedicalTestCloseMenu = () => {
    setAnchorEl(null);
  };

  const activateOrDeActivateSelectedTest = async () => {
    handleMedicalTestCloseMenu();
    try {
      const response = await activateOrDeActivateTest(selectedUser.id).unwrap();
      useSuccessRef.current.setSuccessMsg(response.message, "");
      useSuccessRef.current.openModal();
      fetchUpdatedMedicalTests();
    } catch (e) {
      let errorList = e?.data?.errorMessages;
      useErrorRef.current.addError(errorList);
      useErrorRef.current.openModal();
    }
  };

  return (
    <>
      {(isLoading || isFetching || isActivateOrDeActivateTestLoading) && (
        <Loading />
      )}
      <SuccessDialog ref={useSuccessRef} />
      <ErrorDialog ref={useErrorRef} />
      <Box position="relative" width="100%">
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

      <Box height={40} />
      <Box mx={3}>
        <Grid container spacing={5}>
          <Grid size={3} xs={12} md={3}>
            <TextField
              size="small"
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
              size="small"
              label="Test Name"
              name="name"
              value={searchFilters.name}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "name"}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={3}>
            <SingleSelect
              name={"department"}
              label={"Department"}
              options={departmentsList}
              value={searchFilters.department}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "department"}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={3}>
            <SingleSelect
              name={"category"}
              label={"Category"}
              options={categoriesList}
              value={searchFilters.category}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "category"}
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
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
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
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
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
            navigate("/admin/create-medical-test");
          }}
        >
          Create New Medical Test
        </Button>
      </Box>
      <Table component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Test Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>More Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalTestsList?.content?.map((test, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  viewSpecificUsersDetails(test.id);
                }}
                hover
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell>{test.testCode}</TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell>{test.department}</TableCell>
                <TableCell>{test.category}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMedicalTestOpenMenu(e, test);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMedicalTestCloseMenu}
          >
            <MenuItem
              onClick={activateOrDeActivateSelectedTest}
              sx={{ textAlign: "center" }}
            >
              <Typography variant="body1">
                {selectedUser?.active ? "De-Activate Test" : "Activate Test"}
              </Typography>
            </MenuItem>
          </Menu>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                page={searchFilters.pageNo}
                rowsPerPage={searchFilters.pageSize}
                count={medicalTestsList?.totalElements}
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
