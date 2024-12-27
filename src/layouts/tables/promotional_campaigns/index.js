import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import campaignsData from "../data/promotionalCampaignsTableData";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from "@mui/material/Autocomplete";
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import { validateName, validateNameOnly, validateMobileNumber, validateEmail, validatePassword } from "../validations";
import Chip from '@mui/material/Chip'; // Import the Chip component



const targetAudienceOptions = [
  { label: "Students", value: "students" },
  { label: "Professionals", value: "professionals" },
  { label: "Teachers", value: "teachers" },
  { label: "Parents", value: "parents" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Kids", value: "Kids" },
];
function Campaigns() {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [Input, setInput] = useState({});
  const [editInput, setEditInput] = useState({});
  const [selectedAudience, setSelectedAudience] = React.useState([]);

  const [campaignNameError, setCampaignNameError] = useState("");
  const [editCampaignNameError, setEditCampaignNameError] = useState("");

  const actionsColumn = {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <React.Fragment>
        <IconButton onClick={() => handleEdit(row.original)} color="info" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.original.id)} color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    )
  };


  const handleAddCampaignNameChange = (e) => {
    const value = e.target.value;
    setInput({ ...Input, campaigns_name: e.target.value });
    setCampaignNameError(validateName(value));
  };

  const handleAddStartDateChange = (e) => {
    setInput({ ...Input, start_date: e.target.value });
  };

  const handleAddEndDateChange = (e) => {
    setInput({ ...Input, end_date: e.target.value });
  };

  const handleAudienceChange = (e, value) => {
    setSelectedAudience(value);
    setInput((prevInput) => ({
      ...prevInput,
      target_audience: value.map((option) => option.value),
    }));
  };




  const handleEditCampaignNameChange = (e) => {
    const value = e.target.value;
    setEditedRow({ ...editedRow, campaigns_name: e.target.value });
    setEditCampaignNameError(validateName(value));
  };

  const handleEditStartDateChange = (e) => {
    setEditedRow({ ...editedRow, start_date: e.target.value });
  };

  const handleEditEndDateChange = (e) => {
    setEditedRow({ ...editedRow, end_date: e.target.value });
  };
  const handleEditAudienceChange = (event, value) => {
    setEditedRow((prevRow) => ({
      ...prevRow,
      target_audience: value,
    }));
  };




  const handleEdit = (rowData) => {
    setEditedRow({
      ...rowData,
      target_audience: rowData.target_audience.split(",").map((audience) => {
        return targetAudienceOptions.find((option) => option.value === audience) || { label: audience, value: audience };
      }),
    });
    setOpenEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedRow(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((row) => row.campaigns_id !== selectedRow);
    console.log("Updated Rows after Deletion:", updatedRows);

    setOpenDeleteModal(false);
  };

  const handleSaveEdit = () => {
    const updatedRows = rows.map((row) =>
      row.campaigns_id === editedRow.campaigns_id ? editedRow : row
    );
    console.log("Updated Rows:", updatedRows);
    setOpenEditModal(false);
  };


  const handleClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setOpenAddModal(false);
  };
  const handleAdd = () => {
    setOpenAddModal(true);
  }

  const { columns, rows } = campaignsData(handleEdit, handleDelete);

  const tableColumns = [...columns, actionsColumn];
  console.log("editedRow:", editedRow); // Check if start_date is correct


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
                  Promotional Campaigns Table
                </MDTypography>
              </MDBox>
              <MDBox sx={{ textAlign: 'right', mt: 4, mr: 4 }}>
                <MDButton color="success" onClick={() => handleAdd()} >
                  Add
                </MDButton>

                <Dialog open={openAddModal} onClose={handleClose} fullWidth maxWidth="md">
                  <DialogTitle>Add Promotional Campaigns</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Campaign Name"
                          name="campaigns_name"
                          onChange={handleAddCampaignNameChange}
                          fullWidth
                          margin="normal"
                          helperText={campaignNameError}
                          className={campaignNameError ? 'errorInput' : ''}  
                          FormHelperTextProps={{
                            className: campaignNameError ? 'errorMessage' : '', 
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Start Date"
                          name="start_date"
                          type="date"
                          onChange={handleAddStartDateChange}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ shrink: true }}

                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          label="End Date"
                          name="end_date"
                          type="date"
                          onChange={handleAddEndDateChange}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>

                    <Autocomplete
                      multiple
                      options={targetAudienceOptions}
                      getOptionLabel={(option) => option.label}
                      value={selectedAudience}
                      onChange={handleAudienceChange} // Use the new handler here
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Target Audience"
                          placeholder="Select audience"
                          fullWidth
                          margin="normal"
                        />
                      )}
                      renderTags={(value, getTagProps) => 
                        value.map((option, index) => (
                          <Chip
                            label={option.label}
                            {...getTagProps({ index })}
                            style={{
                              backgroundColor: 'green', // Green background for selected value
                              color: 'white', // White text color
                              margin: 2, // Optional: Adjust the spacing between the chips
                            }}
                          />
                        ))
                      }
                    />
                  </Grid>


                    </Grid>
                  </DialogContent>

                  <DialogActions>
                    <MDButton onClick={handleClose}  >Cancel</MDButton>
                    <MDButton onClick={handleAdd} color="info">Save</MDButton>
                  </DialogActions>
                </Dialog>

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

      <Dialog open={openEditModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Promotional Campaigns</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Campaign Name"
                name="campaigns_name"
                value={editedRow?.campaigns_name || ""}
                onChange={handleEditCampaignNameChange}
                fullWidth
                margin="normal"
                helperText={editCampaignNameError}
                className={editCampaignNameError ? 'errorInput' : ''}  
                FormHelperTextProps={{
                  className: editCampaignNameError ? 'errorMessage' : '', 
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={editedRow?.start_date?.slice(0, 10) || ""}
                onChange={handleEditStartDateChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                name="end_date"
                type="date"
                value={editedRow?.end_date?.slice(0, 10) || ""}
                onChange={handleEditEndDateChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                options={targetAudienceOptions}
                getOptionLabel={(option) => option.label}
                value={editedRow?.target_audience || []}
                onChange={handleEditAudienceChange} // Use the new handler here
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Target Audience"
                    placeholder="Select audience"
                    fullWidth
                    margin="normal"
                  />
                )}
                renderTags={(value, getTagProps) => 
                  value.map((option, index) => (
                    <Chip
                      label={option.label}
                      {...getTagProps({ index })}
                      style={{
                        backgroundColor: 'green', // Green background for selected value
                        color: 'white', // White text color
                        margin: 2, // Optional: Adjust the spacing between the chips
                      }}
                    />
                  ))
                }
              />

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleClose}>Cancel</MDButton>
          <MDButton onClick={handleSaveEdit} color="info">
            Save
          </MDButton>
        </DialogActions>
      </Dialog>
      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleClose}>
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
          <MDBox p={2} style={{ backgroundColor: red[50], borderLeft: `5px solid ${red[700]}` }}>
            <MDTypography variant="body1">
              Are you sure you want to delete this item?.
            </MDTypography>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleClose} style={{ color: 'gray' }}>Cancel</MDButton>
          <MDButton onClick={handleConfirmDelete} color="primary">Delete</MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Campaigns;
