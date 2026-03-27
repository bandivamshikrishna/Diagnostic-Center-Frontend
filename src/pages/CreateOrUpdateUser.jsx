import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, TextField } from "@mui/material";
import { SingleSelect } from "../components/SingleSelect";
import {
  useVendorDropDownQuery,
  useVendorBranchesQuery,
} from "../redux/apis/Vendor";
import {
  useGetUserRolesQuery,
  useCreateUserMutation,
} from "../redux/apis/UserDetails";
import { useEffect, useRef, useState } from "react";
import { ErrorDialog } from "../components/ErrorDialog";
import { SuccessDialog } from "../components/SuccessDialog";
import { Loading } from "../components/Loading";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

export const CreateOrUpdateUser = () => {
  //variables
  const userVendor = useSelector((state) => state.userDetails.user?.vendor);
  const EMPTY_USER = {
    fullName: "",
    email: "",
    role: "",
    vendor: userVendor || "",
    vendorBranch: "",
  };

  const EMPTY_USER_ERRORS = {
    fullName: "",
    email: "",
    role: "",
    vendor: "",
    vendorBranch: "",
  };

  const [user, setUser] = useState(EMPTY_USER);
  const [userErrors, setUserErrors] = useState(EMPTY_USER_ERRORS);
  const useErrorRef = useRef();
  const useSuccessRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const userRole = useSelector((state) => state.userDetails.user?.role);

  //api's
  const { data: vendorsList } = useVendorDropDownQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: vendorBranchesList, refetch: refetchVendorBranches } =
    useVendorBranchesQuery(user.vendor, {
      skip: !user.vendor,
      refetchOnMountOrArgChange: true,
    });
  const { data: rolesList } = useGetUserRolesQuery();
  const [createUser, { isLoading }] = useCreateUserMutation();

  //functions
  useEffect(() => {
    if (vendorsList?.length && userVendor) {
      setUser((user) =>
        user.vendor === userVendor ? user : { ...user, vendor: userVendor },
      );
    }
  }, [userVendor, vendorsList]);
  useEffect(() => {
    if (user.vendor) {
      const timer = setTimeout(() => {
        refetchVendorBranches();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [user.vendor, refetchVendorBranches]);

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      ...(e.target.name === "vendor" ? { vendorBranch: "" } : {}),
    });
  };

  const handlUserSubmit = async (e) => {
    e.preventDefault();
    let newUserErrors = { ...EMPTY_USER_ERRORS };
    let errorsList = [];

    let showValidations = false;

    if (!user.fullName) {
      newUserErrors.fullName = "Please Enter Full Name";
      errorsList.push("Please Enter Full Name");
      showValidations = true;
    }
    if (!user.email) {
      newUserErrors.email = "Please Enter Email";
      errorsList.push("Please Enter Email");
      showValidations = true;
    }
    if (!user.role) {
      newUserErrors.role = "Please Select Role";
      errorsList.push("Please Select Role");
      showValidations = true;
    }
    if (!user.vendor) {
      newUserErrors.vendor = "Please Select Vendor";
      errorsList.push("Please Select Vendor");
      showValidations = true;
    }
    if (!user.vendorBranch) {
      newUserErrors.vendorBranch = "Please Select Vendor Branch";
      errorsList.push("Please Select Vendor Branch");
      showValidations = true;
    }
    if (showValidations) {
      setUserErrors(newUserErrors);
      useErrorRef.current.addError(errorsList);
      useErrorRef.current.openModal(true);
    } else {
      try {
        const response = await createUser(user).unwrap();
        useSuccessRef.current.setSuccessMsg(response.message, "/users");
        useSuccessRef.current.openModal();
        setUser({ ...EMPTY_USER });
        setUserErrors({ ...EMPTY_USER_ERRORS });
      } catch (e) {
        let errorList = e?.data?.errorMessages;
        useErrorRef.current.addError(errorList);
        useErrorRef.current.openModal(true);
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <ErrorDialog ref={useErrorRef} />
      <SuccessDialog ref={useSuccessRef} />
      <Typography variant="h4" textAlign={"center"}>
        Create User
      </Typography>
      <Divider />
      <Box height={20} />
      <Box p={5} component={"form"} onSubmit={handlUserSubmit}>
        <Grid container spacing={5}>
          <Grid size={4}>
            <TextField
              label="Full Name"
              name="fullName"
              value={user.fullName}
              onChange={handleUserChange}
              error={!!userErrors.fullName}
              helperText={userErrors.fullName}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              error={!!userErrors.email}
              helperText={userErrors.email}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect
              name={"role"}
              label={"Role Name"}
              options={rolesList}
              value={user.role}
              onChange={handleUserChange}
              error={!!userErrors.role}
              helperText={userErrors.role}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect
              name={"vendor"}
              label={"Vendor Name"}
              options={vendorsList}
              value={user.vendor}
              onChange={handleUserChange}
              error={!!userErrors.vendor}
              helperText={userErrors.vendor}
              disabled={userRole && userRole.toLowerCase() != "ad"}
            />
          </Grid>
          <Grid size={4}>
            <SingleSelect
              name={"vendorBranch"}
              label={"Vendor Branch"}
              options={vendorBranchesList}
              value={user.vendorBranch}
              onChange={handleUserChange}
              error={!!userErrors.vendorBranch}
              helperText={userErrors.vendorBranch}
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
                navigate("/users");
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
