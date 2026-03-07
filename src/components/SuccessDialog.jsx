import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router";

export const SuccessDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [link, setLink] = useState("/");
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    setSuccessMsg: (msg, link) => {
      setSuccessMsg(msg);
      setLink(link);
    },
    navigateTo: (link) => {
      navigate(link);
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
        <DialogTitle textAlign={"center"}>Success</DialogTitle>
        <Divider />
        <DialogContent>
          <p style={{ color: "green" }}>{successMsg}</p>
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
            onClick={() => {
              setOpen(false);
              navigate(link);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
