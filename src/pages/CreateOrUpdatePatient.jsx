import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SingleSelect } from "../components/SingleSelect";

export const CreateOrUpdatePatient = () => {
  return (
    <>
      <Box position="relative" width="100%">
        <Typography variant="h4" textAlign="center">
          Create New Patient
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
      <Box p={5} component={"form"}>
        <Grid container spacing={5}>
          <Grid size={4}>
            <TextField
              label="Full Name"
              name="fullName"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="email"
              type="email"
              name="email"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect name={"role"} label={"Role Name"} />
          </Grid>
          <Grid size={4}>
            <SingleSelect name={"vendor"} label={"Vendor Name"} />
          </Grid>
          <Grid size={4}>
            <SingleSelect name={"vendorBranch"} label={"Vendor Branch"} />
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
            <Button variant="contained" color="error" sx={{ px: 5 }}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};
