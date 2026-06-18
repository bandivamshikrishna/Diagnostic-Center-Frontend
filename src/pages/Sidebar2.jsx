import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Sidebar2() {
  const users = [
    {
      id: "U000000015",
      name: "test 7",
      email: "test7@gmail.com",
      role: "Lab Supervisor",
    },
    {
      id: "U000000014",
      name: "Test User 6",
      email: "test6@gmail.com",
      role: "Lab Supervisor",
    },
  ];

  return (
    <Box>
      {/* PAGE HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={700}>
          Users Management
        </Typography>

        <TextField
          select
          size="small"
          defaultValue="Active"
          sx={{ width: 140 }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {/* FILTER CARD */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth size="medium" label="ID" />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Name" />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth size="small" label="Email" />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField fullWidth select size="small" label="Role">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="lab">Lab Supervisor</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* ACTIONS */}
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  color="error"
                >
                  Reset
                </Button>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  }}
                >
                  Create User
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* TABLE CARD */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
        }}
      >
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["ID", "Name", "Email", "Role", "Actions"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontWeight: 700,
                      background: "#f9fafb",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} hover sx={{ transition: "0.2s" }}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell fontWeight={600}>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>

                  <TableCell>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
