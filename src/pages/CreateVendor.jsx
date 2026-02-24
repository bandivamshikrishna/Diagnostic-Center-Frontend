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
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateVendorMutation } from "../redux/apis/Vendor";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
import { ErrorDialog } from "../components/ErrorDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import { useParams } from "react-router";
import { useGetSpecificVendorDetailsQuery } from "../redux/apis/Vendor";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router";

dayjs.extend(customParseFormat);

export const CreateVendor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [branchDetails, setBranchDetails] = useState([]);
  const [actionType, setActionType] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [errorDialogOpen, SetErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [index, setIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [filePreviewURL, setFilePreviewURL] = useState(null);
  let createVendorData;
  const [createVendor, { isLoading }] = useCreateVendorMutation();
  const {
    data,
    isLoading: isLoadingSpecificVendor,
    isSuccess,
  } = useGetSpecificVendorDetailsQuery(id, { skip: !id });
  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    activationEndDate: null,
    maxNoOfUsers: "",
    branches: [],
  });

  useEffect(() => {
    if (isSuccess && !dataUpdated) {
      setVendor({
        name: data.name,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        activationEndDate: dayjs(data.activationEndDate, "DD-MM-YYYY"),
        maxNoOfUsers: data.maxNoOfUsers,
        branches: data.branches.map((branch, index) => ({
          ...branch,
          sNo: index + 1,
        })),
      });
      setBranchDetails(
        data.branches.map((branch, index) => ({ ...branch, sNo: index + 1 })),
      );
      setDataUpdated(true);
    }
  }, [isSuccess, data, dataUpdated]);

  const [vendorErrors, setVendorErrors] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    activationEndDate: "",
    maxNoOfUsers: "",
    branches: "",
  });

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreviewURL(URL.createObjectURL(uploadedFile));
    }
  };

  useEffect(() => {
    return () => {
      if (filePreviewURL) URL.revokeObjectURL(filePreviewURL);
    };
  }, [filePreviewURL]);

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
    let newErrorList = [];
    let len = 0;
    let newVendorErrors = {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      activationEndDate: "",
      maxNoOfUsers: "",
      branches: "",
    };

    let showValidations = false;
    if (!vendor.name.trim()) {
      newVendorErrors.name = "Enter Name";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.name;
    }
    if (!vendor.email.trim()) {
      newVendorErrors.email = "Enter Email";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.email;
    }
    if (!vendor.phoneNumber.trim()) {
      newVendorErrors.phoneNumber = "Enter Phone Number";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.phoneNumber;
    }
    if (!vendor.maxNoOfUsers) {
      newVendorErrors.maxNoOfUsers = "Enter Max No Of Users";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.maxNoOfUsers;
    }
    if (!vendor.activationEndDate) {
      newVendorErrors.activationEndDate = "Enter Activation End Date";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.activationEndDate;
    }

    if (!vendor.address.trim()) {
      newVendorErrors.address = "Enter Address";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.address;
    }
    if (branchDetails.length == 0) {
      newVendorErrors.branches = "Add Atleast One branch Details";
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = newVendorErrors.branches;
    }
    if (e.target.logo.files[0] == null || e.target.logo.files[0] == undefined) {
      showValidations = true;
      len = newErrorList.length;
      newErrorList[len] = "Upload Logo File";
    }
    if (showValidations) {
      setVendorErrors(newVendorErrors);
      setErrorList(newErrorList);
      if (newErrorList.length > 0) {
        SetErrorDialogOpen(true);
      }
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

      createVendorFormData.append("logo", e.target.logo.files[0]);
      createVendorFormData.append(
        "data",
        new Blob([JSON.stringify(createVendorData)], {
          type: "application/json",
        }),
      );

      try {
        const response = await createVendor(createVendorFormData).unwrap();
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
        setBranchDetails([]);
        setVendorErrors({
          name: "",
          email: "",
          address: "",
          phoneNumber: "",
          activationEndDate: "",
          maxNoOfUsers: "",
          branches: "",
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
      {(isLoading || isLoadingSpecificVendor) && <Loading />}
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
        {(!id ? "Add" : "Update") + " Vendor"}
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
                value={
                  vendor.activationEndDate ? vendor.activationEndDate : null
                }
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
            <Button
              variant="contained"
              component="label"
              sx={{ color: "white", fontWeight: "200" }}
            >
              Upload File
              <input
                type="file"
                hidden
                name="logo"
                onChange={handleFileChange}
              />
            </Button>
            {file && (
              <Typography variant="body2">
                Selected File: {file.name}
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 8 }}>
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
              rows={4}
              sx={{ width: "100%" }}
            ></TextField>
          </Grid>
          <Grid size={{ xs: 4 }}>
            {filePreviewURL && file.type.startsWith("image/") && (
              <Box
                component="img"
                src={filePreviewURL}
                alt="Preview"
                onClick={() => {
                  window.open(filePreviewURL, "_blank");
                }}
                sx={{ width: 200, borderRadius: 1 }}
              />
            )}
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
                      type="number"
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
                  {!id ? "Submit" : "Update"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ px: 5 }}
                  onClick={() => {
                    navigate("/admin/vendor");
                  }}
                >
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
