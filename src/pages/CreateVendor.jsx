import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableBody,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateVendorMutation } from "../redux/apis/Vendor";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
import { ErrorDialog } from "../components/ErrorDialog";
import { SuccessDialog } from "../components/SuccessDialog";

export const CreateVendor = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [branchDetails, setBranchDetails] = useState([]);
  const [actionType, setActionType] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [errorDialogOpen, SetErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [index, setIndex] = useState(0);
  let createVendorData;
  const [createVendor, { isLoading }] = useCreateVendorMutation();
  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    activationEndDate: null,
    maxNoOfUsers: "",
    branches: [],
  });

  const [logoErrors, setLogoErrors] = useState("");

  const [vendorErrors, setVendorErrors] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    activationEndDate: "",
    maxNoOfUsers: "",
    branches: "",
  });

  const [branchErrors, setBranchErrors] = useState({
    branchCode: "",
    branchName: "",
    branchAddress: "",
  });

  const [newBranch, setNewBranch] = useState({
    sNo: "",
    branchCode: "",
    branchName: "",
    branchAddress: "",
  });

  const handleSetVendor = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSetNewBranch = (e) => {
    setNewBranch({ ...newBranch, [e.target.name]: e.target.value });
  };

  const validateNewBranch = () => {
    let newBranchErrors = { branchCode: "", branchName: "", branchAddress: "" };
    let showValidations = false;
    if (!newBranch.branchCode.trim()) {
      newBranchErrors.branchCode = "Enter Branch Code";
      showValidations = true;
    }
    if (!newBranch.branchName.trim()) {
      newBranchErrors.branchName = "Enter Branch Name";
      showValidations = true;
    }
    if (!newBranch.branchAddress.trim()) {
      newBranchErrors.branchAddress = "Enter Branch Address";
      showValidations = true;
    }

    if (showValidations) {
      setBranchErrors(newBranchErrors);
    } else if (actionType == "add") {
      addNewBranch();
    } else if (actionType == "edit") {
      const newBranchWithSno = { ...newBranch, sNo: index + 1 };
      console.log("from edit");
      console.log(newBranchWithSno);
      setBranchDetails(
        branchDetails.map((branch, i) =>
          i === index ? newBranchWithSno : branch,
        ),
      );
      setDialogOpen(false);
    }
  };

  const addNewBranch = () => {
    const newBranchWithSno = { ...newBranch, sNo: branchDetails.length + 1 };
    setBranchDetails([...branchDetails, newBranchWithSno]);
    setDialogOpen(!dialogOpen);
    setBranchErrors({ branchCode: "", branchName: "", branchAddress: "" });
    setNewBranch({
      sNo: "",
      branchCode: "",
      branchName: "",
      branchAddress: "",
    });
  };

  const viewBranchDetails = (index) => {
    setNewBranch({
      sNo: branchDetails[index].sNo,
      branchCode: branchDetails[index].branchCode,
      branchName: branchDetails[index].branchName,
      branchAddress: branchDetails[index].branchAddress,
    });
    setIndex(index);
    setActionType("edit");
    setDialogOpen(true);
  };

  const deleteBranch = (index) => {
    setBranchDetails(
      branchDetails
        .filter((_, i) => i != index)
        .map((branch, i) => ({ ...branch, sNo: i + 1 })),
    );
  };

  const handleCreateVendor = async (e) => {
    e.preventDefault();
    let newVendorErrors = {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      activationEndDate: "",
      maxNoOfUsers: 0,
      branches: "",
    };

    let showValidations = false;
    if (!vendor.name.trim()) {
      newVendorErrors.name = "Enter Name";
      showValidations = true;
    }
    if (!vendor.email.trim()) {
      newVendorErrors.email = "Enter Email";
      showValidations = true;
    }
    if (!vendor.phoneNumber.trim()) {
      newVendorErrors.phoneNumber = "Enter Phone Number";
      showValidations = true;
    }
    if (!vendor.maxNoOfUsers) {
      newVendorErrors.maxNoOfUsers = "Enter Max No Of Users";
      showValidations = true;
    }
    if (!vendor.activationEndDate) {
      newVendorErrors.activationEndDate = "Enter Activation End Date";
      showValidations = true;
    }

    if (!vendor.address.trim()) {
      newVendorErrors.address = "Enter Address";
      showValidations = true;
    }
    if (branchDetails.length == 0) {
      newVendorErrors.branches = "Enter Atleast One branch";
      showValidations = true;
    }
    if (e.target.logo.files[0] == null || e.target.logo.files[0] == undefined) {
      setLogoErrors("Upload Logo File");
      showValidations = true;
    }
    if (showValidations) {
      setVendorErrors(newVendorErrors);
    } else {
      newVendorErrors = {
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        activationEndDate: "",
        maxNoOfUsers: 0,
        branches: "",
      };
      var createVendorFormData = new FormData();
      createVendorData = {
        ...vendor,
        activationEndDate: dayjs(vendor.activationEndDate).format("YYYY-MM-DD"),
        branches: branchDetails,
      };
      console.log("the vendor data is ", createVendorData);

      createVendorFormData.append("logo", e.target.logo.files[0]);
      createVendorFormData.append(
        "data",
        new Blob([JSON.stringify(createVendorData)], {
          type: "application/json",
        }),
      );

      try {
        const response = await createVendor(createVendorFormData).unwrap();
        console.log("The res", response);
        setSuccessMsg(response?.message);
        setSuccessDialogOpen(true);
        setVendor({
          name: "",
          email: "",
          address: "",
          phoneNumber: "",
          activationEndDate: null,
          maxNoOfUsers: "",
          branches: [],
        });
      } catch (e) {
        console.log("The error is :", e);
        let newErrorList = [],
          len = 0;
        if (e?.data?.phoneNumber) {
          newVendorErrors.phoneNumber = e?.data?.phoneNumber;
          len = newErrorList.length;
          newErrorList[len] = e?.data?.phoneNumber;
        }
        if (e?.data?.email) {
          newVendorErrors.email = e?.data?.email;
          len = newErrorList.length;
          newErrorList[len] = e?.data?.email;
        }
        setVendorErrors(newVendorErrors);
        setErrorList(newErrorList);
        if (newErrorList.length > 0) {
          SetErrorDialogOpen(true);
        }
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <ErrorDialog
        open={errorDialogOpen}
        close={() => SetErrorDialogOpen(false)}
        errorList={errorList}
      />

      <SuccessDialog
        open={successDialogOpen}
        close={() => setSuccessDialogOpen(false)}
        msg={successMsg}
      />

      <Typography variant="h4" textAlign={"center"}>
        Add Vendor
      </Typography>
      <Divider />
      <Box height={20} />
      <Box p={5} onSubmit={handleCreateVendor} component={"form"}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Name"
              placeholder="Enter Name"
              value={vendor.name}
              name="name"
              onChange={handleSetVendor}
              error={!!vendorErrors.name}
              helperText={vendorErrors.name}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Email ID"
              placeholder="Enter Email ID"
              type="email"
              value={vendor.email}
              onChange={handleSetVendor}
              error={!!vendorErrors.email}
              helperText={vendorErrors.email}
              name="email"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Phone Number"
              placeholder="Enter Phone Number"
              type="number"
              value={vendor.phoneNumber}
              onChange={handleSetVendor}
              error={!!vendorErrors.phoneNumber}
              helperText={vendorErrors.phoneNumber}
              name="phoneNumber"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Max No Of Users"
              placeholder="Enter Max No Of Users"
              type="number"
              value={vendor.maxNoOfUsers}
              onChange={handleSetVendor}
              error={!!vendorErrors.maxNoOfUsers}
              helperText={vendorErrors.maxNoOfUsers}
              name="maxNoOfUsers"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Enter Activation End Date"
                format="DD-MM-YYYY"
                disablePast
                value={vendor.activationEndDate}
                onChange={(newValue) => {
                  setVendor({ ...vendor, activationEndDate: newValue });
                }}
                name="activationEndDate"
                slotProps={{
                  textField: {
                    error: Boolean(vendorErrors.activationEndDate),
                    helperText: vendorErrors.activationEndDate,
                  },
                }}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              type="file"
              sx={{ width: "100%" }}
              label="Upload Logo"
              name="logo"
              error={!!logoErrors}
              helperText={logoErrors}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              type="text"
              label="Enter Address"
              placeholder="Enter Main Head Office/Quaters Address"
              multiline
              value={vendor.address}
              onChange={handleSetVendor}
              error={!!vendorErrors.address}
              helperText={vendorErrors.address}
              name="address"
              rows={2}
              sx={{ width: "100%" }}
            ></TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ color: "white", fontWeight: "600" }}
                onClick={() => {
                  setDialogOpen(!dialogOpen);
                  setActionType("add");
                  setBranchErrors({
                    branchCode: "",
                    branchName: "",
                    branchAddress: "",
                  });
                }}
              >
                Add
              </Button>
            </Box>
            <Box
              sx={{
                border: vendorErrors.branches ? "1px solid red" : "none",

                borderRadius: 1,
              }}
            >
              <Table component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Branch Code</TableCell>
                      <TableCell>Branch Name</TableCell>
                      <TableCell>Branch Address</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {branchDetails.map((branch, index) => (
                      <TableRow key={index}>
                        <TableCell>{branch.sNo}</TableCell>
                        <TableCell>{branch.branchCode}</TableCell>
                        <TableCell>{branch.branchName}</TableCell>
                        <TableCell>{branch.branchAddress}</TableCell>
                        <TableCell>
                          <Box ml={"auto"}>
                            <Button
                              color="black"
                              onClick={() => {
                                viewBranchDetails(index);
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              color="error"
                              onClick={() => {
                                deleteBranch(index);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Table>
            </Box>

            <Dialog open={dialogOpen}>
              <DialogTitle sx={{ textAlign: "center" }}>
                Add Branch
                <Divider />
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2} mt={2}>
                  <Grid size={6}>
                    <TextField
                      name="branchCode"
                      label="Branch Code"
                      value={newBranch.branchCode}
                      onChange={handleSetNewBranch}
                      error={!!branchErrors.branchCode}
                      helperText={branchErrors.branchCode}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      name="branchName"
                      label="Branch Name"
                      value={newBranch.branchName}
                      onChange={handleSetNewBranch}
                      error={!!branchErrors.branchName}
                      helperText={branchErrors.branchName}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      name="branchAddress"
                      value={newBranch.branchAddress}
                      onChange={handleSetNewBranch}
                      error={!!branchErrors.branchAddress}
                      helperText={branchErrors.branchAddress}
                      multiline
                      rows={3}
                      label="Branch Address"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ px: 5 }}
                  onClick={validateNewBranch}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ px: 5 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Grid size={{ xs: 12 }} sx={{ mt: 5 }}>
              <Box display={"flex"} justifyContent="center" gap={20}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ px: 5 }}
                  type="submit"
                >
                  Submit
                </Button>
                <Button variant="contained" color="error" sx={{ px: 5 }}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
