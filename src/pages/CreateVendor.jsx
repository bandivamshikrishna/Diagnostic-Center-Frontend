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

export const CreateVendor = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [branchDetails, setBranchDetails] = useState([
    {
      sNo: 1,
      branchCode: 234,
      branchName: "test",
      branchAddress: "Test Address",
    },
  ]);

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
    } else {
      addNewBranch();
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

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        Add Vendor
      </Typography>
      <Divider />
      <Box height={20} />
      <Box p={5}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Name"
              placeholder="Enter Name"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Email ID"
              placeholder="Enter Email ID"
              type="email"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Phone Number"
              placeholder="Enter Phone Number"
              type="number"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              label="Max No Of Users"
              placeholder="Enter Max No Of Users"
              type="number"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Enter Activation End Date"
                format="DD/MM/YYYY"
                disablePast
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              type="file"
              sx={{ width: "100%" }}
              label="Upload Logo"
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
                  {branchDetails.map((branch) => (
                    <TableRow key={branch.sNo}>
                      <TableCell>{branch.sNo}</TableCell>
                      <TableCell>{branch.branchCode}</TableCell>
                      <TableCell>{branch.branchName}</TableCell>
                      <TableCell>{branch.branchAddress}</TableCell>
                      <TableCell>
                        <Box ml={"auto"}>
                          <Button color="black">
                            <EditIcon />
                          </Button>
                          <Button color="error">
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Table>

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
                <Button variant="contained" color="success" sx={{ px: 5 }}>
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
