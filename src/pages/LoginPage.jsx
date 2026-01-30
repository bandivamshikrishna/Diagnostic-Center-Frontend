import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPage = () => {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight="100vh"
      >
        <Box
          bgcolor={"primary.main"}
          width="70vw"
          height="70vh"
          display={"flex"}
          borderRadius={5}
        >
          <Box
            width="55%"
            height="100%"
            sx={{
              backgroundImage: `url('loginLogo.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Box
            width="50%"
            height="100%"
            display={"flex"}
            bgcolor="white"
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5" fontWeight={600}>
              Login
            </Typography>

            <img
              src="logo.png"
              alt="Image Not rendered"
              height="150px"
              width="150px"
            />
            <Stack spacing={2} width="300px">
              <TextField label="Email" type="email"></TextField>
              <TextField label="Password" type="password"></TextField>
              <Button
                variant="contained"
                sx={{ color: "white", fontWeight: "600" }}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};
