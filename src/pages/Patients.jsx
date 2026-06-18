import { Box, Button, Divider, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

export const Patients = () => {
  //variables
  const navigate = useNavigate();

  return (
    <>
      <Box position="relative" width="100%">
        <Typography variant="h4" textAlign="center">
          Patient Details
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
      <Box height={40} />
      <Box mx={3}></Box>
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
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ color: "white", fontWeight: "600" }}
          onClick={() => {
            navigate("/create-patient");
          }}
        >
          Create New Patient
        </Button>
      </Box>
    </>
  );
};
