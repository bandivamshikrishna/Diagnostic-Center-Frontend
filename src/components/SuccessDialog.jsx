import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";

export const SuccessDialog = ({ msg, open, close }) => {
  return (
    <>
      <Dialog
        open={open}
        slotProps={{
          paper: {
            sx: {
              minWidth: 400,
            },
          },
        }}
      >
        <DialogTitle textAlign={"center"}>Success</DialogTitle>
        <Divider />
        <DialogContent>
          <p style={{ color: "green" }}>{msg}</p>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ px: 5 }}
            onClick={close}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
