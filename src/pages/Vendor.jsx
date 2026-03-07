import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetAllVendorsQuery } from "../redux/apis/Vendor";
import { Loading } from "../components/Loading";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Navigate, useNavigate } from "react-router";
import { ErrorDialog } from "../components/ErrorDialog";
import AddIcon from "@mui/icons-material/Add";

export const Vendor = () => {
  const { data = [], isLoading } = useGetAllVendorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("is loading ", isLoading);
  const navigate = useNavigate();

  const viewSpecificVendor = (id) => {
    navigate(`/admin/vendor/${id}`);
  };

  return (
    <>
      {isLoading && <Loading />}

      <Typography variant="h4" textAlign={"center"}>
        Vendor Details
      </Typography>
      <Divider />
      <Box height={40} />

      <Box display="flex" justifyContent="flex-end" mb={3} mr={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ color: "white", fontWeight: "600" }}
          onClick={() => {
            navigate("/admin/create-vendor");
          }}
        >
          Add New Vendor
        </Button>
      </Box>

      <Table component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created Date</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>View More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((vendor, index) => (
              <TableRow key={index}>
                <TableCell>{vendor.vendorCode}</TableCell>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phoneNumber}</TableCell>
                <TableCell>{vendor.createdDate}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      viewSpecificVendor(vendor.id);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Table>
    </>
  );
};
