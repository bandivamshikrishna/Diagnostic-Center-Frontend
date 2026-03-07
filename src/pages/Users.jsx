import {
  Typography,
  Box,
  Divider,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Loading } from "../components/Loading";
import { ErrorDialog } from "../components/ErrorDialog";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const Users = () => {
  //variables
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        User Details
      </Typography>
      <Divider />
      <Box height={40} />

      <Box display="flex" justifyContent="flex-end" mb={3} mr={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ color: "white", fontWeight: "600" }}
          onClick={() => {
            navigate("/create-user/");
          }}
        >
          Create New User
        </Button>
      </Box>

      <Table component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>View More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>test</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>test</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>test</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>test</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Table>
    </>
  );
};
