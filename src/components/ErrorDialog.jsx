import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

export const ErrorDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    addError: (msg) => {
      setErrorList(msg);
    },
  }));

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
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
