import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Pick up Request
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
