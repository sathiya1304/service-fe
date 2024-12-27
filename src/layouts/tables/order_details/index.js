import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import IconButton from "@mui/material/IconButton";
import Cancel from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Ordersdata from "../data/ordersTableData";
import MDButton from "components/MDButton";

const StyledRejectButton = styled(Button)(({ disabled }) => ({
  background: disabled ? "gray" : "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: disabled ? "none" : "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  cursor: disabled ? "not-allowed" : "pointer",
}));

function OrderDetails() {
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [customerMessage, setCustomerMessage] = useState(""); 
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); 

  const handleReject = (id) => {
    setSelectedRow(id);
    setCustomerMessage("");
    setIsCheckboxChecked(false); 
    setOpenRejectModal(true);
  };

  const handleConfirmReject = () => {
    if (isCheckboxChecked) {
      console.log("Rejecting order with ID:", selectedRow);
      console.log("Message to customer:", customerMessage);

      setOpenRejectModal(false); 
    }
  };

  const handleClose = () => {
    setOpenRejectModal(false);
  };

  const { columns, rows } = Ordersdata();

  const actionsColumn = {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <React.Fragment>
        <IconButton onClick={() => handleReject(row.original.id)} color="error" aria-label="reject">
          <Cancel />
        </IconButton>
      </React.Fragment>
    )
  };

  const tableColumns = [...columns, actionsColumn];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Order Details
                </MDTypography>
              </MDBox>
              <MDBox pt={1}>
                <DataTable
                  table={{ columns: tableColumns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog open={openRejectModal} onClose={handleClose}>
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <WarningIcon style={{ color: red[700], fontSize: 40 }} />
            </Grid>
            <Grid item>
              <MDTypography variant="h6" component="span">
                Confirm Reject Order
              </MDTypography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <MDBox p={2} style={{ backgroundColor: red[50], borderLeft: `5px solid ${red[700]}` }}>
            <MDTypography variant="body1" gutterBottom>
              Are you sure you want to reject this order? This action cannot be undone.
            </MDTypography>
            <TextField
              fullWidth
              label="Message to Customer"
              variant="outlined"
              multiline
              rows={3}
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                />
              }
              label="I confirm to send the message and reject this order."
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'gray' }}>Cancel</Button>
          <MDButton
            onClick={handleConfirmReject}
            disabled={!isCheckboxChecked} 
            color="primary"
          >
            Reject Order
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default OrderDetails;
