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
  Checkbox,
} from "@mui/material";
import { Loading } from "../components/Loading";
import { ErrorDialog } from "../components/ErrorDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import { SingleSelect } from "../components/SingleSelect";
import { useEffect, useRef, useState } from "react";
import {
  useGetMedicalTestLovsQuery,
  useGetMedicalTestsOfVendorQuery,
  useSaveMedicalTestsOfVendorMutation,
} from "../redux/apis/MedicalTest";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";

export const ManageTests = () => {
  //variables
  const EMPTY_SEARCH_FILTERS = {
    category: "",
    testName: "",
    department: "",
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
  const successRef = useRef();
  const errorRef = useRef();
  const [selectedTestsMap, setSelectedTestsMap] = useState({});

  //apis
  const {
    data: medicalTestsList = [],
    isLoading,
    isFetching,
    refetch: fetchUpdatedVendorTests,
  } = useGetMedicalTestsOfVendorQuery(debounceSearchFilters, {
    refetchOnMountOrArgChange: true,
  });
  const [saveVendorTests, { isLoading: saveVendorTestLoading }] =
    useSaveMedicalTestsOfVendorMutation();
  const tests = medicalTestsList?.content || [];
  const { data: departmentsList } = useGetMedicalTestLovsQuery("DEPARTMENTS");
  const { data: categoriesList } = useGetMedicalTestLovsQuery("CATEGORIES");

  //functions
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearchFilters({
        ...searchFilters,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilters, activeField]);

  useEffect(() => {
    if (medicalTestsList?.content) {
      setSelectedTestsMap((prev) => {
        const updated = { ...prev };

        medicalTestsList.content.forEach((test) => {
          if (!updated[test.id]) {
            updated[test.id] = {
              selected: test.selected || false,
              price: test.testPrice || 0,
            };
          }
        });
        return updated;
      });
    }
  }, [medicalTestsList]);

  const handleSearchFilters = (e) => {
    if (
      e.target.name !== "sortBy" &&
      e.target.name !== "sortDirection" &&
      e.target.name !== "pageNo" &&
      e.target.name !== "pageSize"
    )
      setActiveField(e.target.value ? e.target.name : null);
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handleSelect = (id, checked) => {
    setSelectedTestsMap((prev) => ({
      ...prev,
      [id]: {
        selected: checked,
        price: checked ? prev[id]?.price || 0 : 0,
      },
    }));
  };

  const handlePriceChange = (id, value) => {
    setSelectedTestsMap((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        price: value === "" ? 0 : Number(value),
      },
    }));
  };

  const handleSave = async () => {
    const payload = Object.entries(selectedTestsMap)
      .filter(([_, v]) => v.selected)
      .map(([id, v]) => ({
        testID: Number(id),
        testPrice: v.price,
      }));

    try {
      const response = await saveVendorTests(payload).unwrap();
      successRef.current.setSuccessMsg(response.message, "/manage-tests");
      successRef.current.openModal();
      fetchUpdatedVendorTests();
    } catch (e) {
      let errorList = e?.data?.errorMessages;
      errorRef.current.addError(errorList);
      errorRef.current.openModal(true);
    }

    // await saveVendorTests(payload);
  };

  return (
    <>
      {(isLoading || isFetching || saveVendorTestLoading) && <Loading />}
      <SuccessDialog ref={successRef} />
      <ErrorDialog ref={errorRef} />
      <Box position="relative" width="100%">
        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          display="flex"
          alignItems="center"
        ></Box>
      </Box>

      <Box height={40} />
      <Box mx={3}>
        <Grid container spacing={5}>
          <Grid size={6}>
            <TextField
              size="small"
              label="Test Name"
              name="testName"
              value={searchFilters.testName}
              onChange={handleSearchFilters}
              disabled={activeField !== null && activeField !== "testName"}
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
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ color: "white", fontWeight: "600" }}
        >
          Save Changes
        </Button>
      </Box>
      <Table component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Test Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => {
              const state = selectedTestsMap[test.id] || {
                selected: false,
                price: 0,
              };
              return (
                <TableRow key={test.id}>
                  <TableCell>
                    <Checkbox
                      checked={state.selected}
                      onChange={(e) => handleSelect(test.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>{test.department}</TableCell>
                  <TableCell>{test.category}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      name="price"
                      value={state.selected ? test.testPrice : 0}
                      disabled={!state.selected}
                      onChange={(e) => {
                        handlePriceChange(test.id, e.target.value);
                      }}
                      sx={{
                        backgroundColor: state.selected ? "white" : "#f5f5f5",
                        borderRadius: 1,
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#777",
                        },
                      }}
                      inputProps={{
                        step: "0.01",
                        min: 0,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                page={searchFilters.pageNo}
                count={medicalTestsList?.totalElements}
                rowsPerPage={searchFilters.pageSize}
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
