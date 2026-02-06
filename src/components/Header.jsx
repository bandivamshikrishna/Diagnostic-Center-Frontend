import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Button onClick={() => navigate("/")}>
            <Box
              component="img"
              src="logo-mini.png"
              alt="No Image Rendered"
              sx={{
                width: "6vw",
                height: "auto",
              }}
            ></Box>
          </Button>
          <Box
            sx={{ ml: "auto" }}
            display="flex"
            gap={10}
            justifyContent={"space-between"}
          >
            <Button
              onClick={() => navigate("/")}
              sx={{ color: "black", fontWeight: "600" }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/about")}
              sx={{ color: "black", fontWeight: "600" }}
            >
              About
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{ color: "black", fontWeight: "600" }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
