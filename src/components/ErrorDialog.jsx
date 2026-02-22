import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";

export const ErrorDialog = ({ errorList, open, close }) => {
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
        <DialogTitle textAlign={"center"}>Error</DialogTitle>
        <Divider />
        <DialogContent>
          {errorList.map((error, index) => (
            <p style={{ color: "red" }} key={index}>
              {index + 1}. {error}
            </p>
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
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
