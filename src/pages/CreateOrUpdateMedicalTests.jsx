import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { SingleSelect } from "../components/SingleSelect";
import { useRef, useState } from "react";
import { ErrorDialog } from "../components/ErrorDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCreateMedicalTestMutation } from "../redux/apis/MedicalTest";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router";
import {
  useGetMedicalTestDepartmentLovsQuery,
  useGetMedicalTestCategoriesLovsQuery,
  useGetMedicalTestMethodsLovsQuery,
  useGetMedicalTestSpecimensLovsQuery,
  useGetMedicalTestUnitsLovsQuery,
} from "../redux/apis/MedicalTest";

export const CreateOrUpdateMedicalTests = () => {
  //variables
  const EMPTY_MEDICAL_TEST = {
    department: "",
    category: "",
    panelName: "",
    panelYesOrNo: "N",
    testName: "",
    testCode: "",
    specimen: "",
    method: "",
    normalRange: "",
    unit: "",
    panel: false,
  };

  const EMPTY_ERRORS = {
    department: "",
    category: "",
    panelName: "",
    panelYesOrNo: "",
    testName: "",
    testCode: "",
    specimen: "",
    method: "",
    normalRange: "",
    unit: "",
  };

  const Yes_OR_No_Lovs = [
    {
      name: "Y",
      value: "Yes",
    },
    {
      name: "N",
      value: "No",
    },
  ];

  const [medicalTest, setMedicalTest] = useState(EMPTY_MEDICAL_TEST);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const successRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const [openDepartmentDialog, setOpenDepartmentDialog] = useState(false);

  //apis
  const [createMedicalTest, { isLoading: isCreateMedicalTestLoading }] =
    useCreateMedicalTestMutation();
  const { data: departmentsList } = useGetMedicalTestDepartmentLovsQuery();
  const { data: categoriesList } = useGetMedicalTestCategoriesLovsQuery();
  const { data: methodsList } = useGetMedicalTestMethodsLovsQuery();
  const { data: specimensList } = useGetMedicalTestSpecimensLovsQuery();
  const { data: unitsList } = useGetMedicalTestUnitsLovsQuery();

  //functions
  const handleMedicalTestChange = (e) => {
    setMedicalTest({
      ...medicalTest,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const errorList = [];

    const rules = {
      department: "Please Enter Department",
      category: "Please Enter Category",
      panelName: "Please Enter Panel Name",
      panelYesOrNo: "Please Select Is Panel",
      testName: "Please Enter Test Name",
      testCode: "Please Enter Test Code",
      specimen: "Please Enter Specimen",
      method: "Please Enter Method",
      normalRange: "Please Enter Normal Range",
      unit: "Please Enter Unit",
    };

    Object.keys(rules).forEach((field) => {
      if (!medicalTest[field]) {
        if (field != "panelName") {
          newErrors[field] = rules[field];
          errorList.push(rules[field]);
        } else if (
          field == "panelName" &&
          medicalTest["panelYesOrNo"].toLowerCase() == "y"
        ) {
          newErrors[field] = rules[field];
          errorList.push(rules[field]);
        }
      }
    });

    setErrors(newErrors);
    if (errorList.length > 0) {
      errorRef.current.addError(errorList);
      errorRef.current.openModal();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const finalMedicalTest = {
        ...medicalTest,
        panel: medicalTest.panel === "Yes",
      };
      setMedicalTest(finalMedicalTest);
      const response = await createMedicalTest(finalMedicalTest).unwrap();
      successRef.current.setSuccessMsg(response.message, "/medical-tests");
      successRef.current.openModal();
      setMedicalTest({ ...EMPTY_MEDICAL_TEST });
      setErrors({ ...EMPTY_ERRORS });
    } catch (e) {
      let errorList = e?.data?.errorMessages;
      errorRef.current.addError(errorList);
      errorRef.current.openModal(true);
      setErrors(e?.data?.errors);
    }
  };

  return (
    <>
      <ErrorDialog ref={errorRef} />
      <SuccessDialog ref={successRef} />
      {isCreateMedicalTestLoading && <Loading />}
      <Box position="relative" width="100%">
        <Typography variant="h4" textAlign="center">
          Create New Medical Test
        </Typography>

        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          display="flex"
          alignItems="center"
        ></Box>
      </Box>
      <Divider />
      <Box height={20} />
      <Box p={5} component={"form"} onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid size={4}>
            <SingleSelect
              size="small"
              label="Department"
              name="department"
              options={departmentsList}
              value={medicalTest.department}
              onChange={handleMedicalTestChange}
              showAdd={true}
              addLabel="Add New Department"
              error={!!errors.department}
              helperText={errors.department}
              onAddClick={() => setOpenDepartmentDialog(true)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect
              size="small"
              label="Category"
              name="category"
              options={categoriesList}
              value={medicalTest.category}
              onChange={handleMedicalTestChange}
              showAdd={true}
              addLabel="Add New Category"
              error={!!errors.category}
              helperText={errors.category}
              onAddClick={() => setOpenDepartmentDialog(true)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              size="small"
              label="Test Name"
              name="testName"
              value={medicalTest.testName}
              onChange={handleMedicalTestChange}
              error={!!errors.testName}
              helperText={errors.testName}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={4}>
            <SingleSelect
              size="small"
              label="Specimen"
              name="specimen"
              options={specimensList}
              value={medicalTest.specimen}
              onChange={handleMedicalTestChange}
              showAdd={true}
              addLabel="Add New Specimen"
              error={!!errors.specimen}
              helperText={errors.specimen}
              onAddClick={() => setOpenDepartmentDialog(true)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect
              size="small"
              label="Method"
              name="method"
              options={methodsList}
              value={medicalTest.method}
              onChange={handleMedicalTestChange}
              showAdd={true}
              addLabel="Add New Method"
              error={!!errors.method}
              helperText={errors.method}
              onAddClick={() => setOpenDepartmentDialog(true)}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={4}>
            <SingleSelect
              size="small"
              label="Unit"
              name="unit"
              options={unitsList}
              value={medicalTest.unit}
              onChange={handleMedicalTestChange}
              showAdd={true}
              addLabel="Add New Units"
              error={!!errors.unit}
              helperText={errors.unit}
              onAddClick={() => setOpenDepartmentDialog(true)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect
              name="panelYesOrNo"
              label="Is Panel"
              size="small"
              options={Yes_OR_No_Lovs}
              value={medicalTest.panelYesOrNo}
              onChange={handleMedicalTestChange}
              error={!!errors.panelYesOrNo}
              helperText={errors.panelYesOrNo}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Panel Name"
              name="panelName"
              size="small"
              value={medicalTest.panelName}
              onChange={handleMedicalTestChange}
              error={!!errors.panelName}
              helperText={errors.panelName}
              sx={{ width: "100%" }}
              disabled={medicalTest.panelYesOrNo === "N"}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Normal Range"
              name="normalRange"
              multiline
              rows={3}
              value={medicalTest.normalRange}
              onChange={handleMedicalTestChange}
              error={!!errors.normalRange}
              helperText={errors.normalRange}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>

        <Grid size={12} sx={{ mt: 5 }}>
          <Box display={"flex"} justifyContent={"center"} gap={20}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ px: 5 }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ px: 5 }}
              onClick={() => {
                navigate("/admin/medical-tests");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};
