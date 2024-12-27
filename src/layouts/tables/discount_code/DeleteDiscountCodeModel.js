import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid
} from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function DeleteConfirmModal({ open, handleClose, handleConfirmDelete }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <WarningIcon style={{ color: red[700], fontSize: 40 }} />
          </Grid>
          <Grid item>
            <MDTypography variant="h6" component="span">
              Confirm Delete
            </MDTypography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container style={{ backgroundColor: red[50], borderLeft: `5px solid ${red[700]}`, padding: 16 }}>
          <MDTypography variant="body1">
            Are you sure you want to delete this item?
          </MDTypography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: 'gray' }}>Cancel</Button>
        <MDButton onClick={handleConfirmDelete} color="error" variant="gradient">Delete</MDButton>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmModal;
