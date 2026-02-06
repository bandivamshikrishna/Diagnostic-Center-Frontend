import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useLoginUserMutation } from "../redux/apis/UserDetails";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

export const LoginPage = () => {
  const [userLoginForm, setUserLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let showValidations = false;
    let newErrors = { email: "", password: "" };

    if (!userLoginForm.email.trim()) {
      newErrors.email = "Email is requried";
      showValidations = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userLoginForm.email)) {
      newErrors.email = "Enter a Valid Email";
      showValidations = true;
    }

    if (!userLoginForm.password.trim()) {
      newErrors.password = "Password is required";
      showValidations = true;
    }

    if (showValidations) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({ email: "", password: "" });
    }

    //Login User
    try {
      await loginUser(userLoginForm).unwrap();
      navigate("/dashboard");
    } catch (e) {
      newErrors = { email: "", password: "" };

      if (e?.data?.email) {
        newErrors.email = e?.data?.email;
      } else {
        newErrors.email = e?.data?.message;
        newErrors.password = e?.data?.message;
      }

      setErrors(newErrors);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <Header />
      <Box
        display={"flex"}
        marginTop={5}
        justifyContent={"center"}
        minHeight="80vh"
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
            <Stack
              spacing={1}
              width="70%"
              component="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <TextField
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email}
                value={userLoginForm.email}
                onChange={(e) =>
                  setUserLoginForm({
                    ...userLoginForm,
                    email: e.target.value,
                  })
                }
              ></TextField>
              <TextField
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
                value={userLoginForm.password}
                onChange={(e) =>
                  setUserLoginForm({
                    ...userLoginForm,
                    password: e.target.value,
                  })
                }
              ></TextField>
              <Button
                variant="contained"
                sx={{ color: "white", fontWeight: "600" }}
                type="submit"
                disabled={isLoading}
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
