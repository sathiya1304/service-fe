import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import WarningIcon from '@mui/icons-material/Warning'; // Import a warning icon
import { red } from '@mui/material/colors'; // Import color for styling
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Autocomplete from "@mui/material/Autocomplete";

import { FormControl, InputLabel, Select, MenuItem,FormHelperText} from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Data
import MDButton from "components/MDButton";

import notificationdata from "../data/pushNotificationsData";
import { validateRequired, validateText } from "../validations";

function Notification() {
 const [openAddModal,setOpenAddModal]= useState(false);
 const [openEditModal,setOpenEditModal]= useState(false);
 const [openDeleteModal,setOpenDeleteModal] = useState(false);
 const [selectedRow, setSelectedRow] = useState(null);
 const [editedRow, setEditedRow] = useState(null);
 const [input, setInput] = useState({ status: "" });
 const [audienceError,setAudienceError]= useState(false);
 const [formData, setFormData] = useState({
    notification_id: '',
    title: '',
    message: '',
    status: '',
    targetAudience: [],
    notificationError: '',
    titleError: '',
    messageError: '',
    statusError: '',
    targetAudienceError: '',
  });
 

const [selectedAudience, setSelectedAudience] = useState([]);
 const targetUsersOptions = [
    { label: "Users above 20", value: "users_above_20" },
    { label: "All Users", value: "all_users" },
    { label: "Frequent Buyers", value: "frequent_buyers" },
    { label: "Female Users", value: "female_users" },
    { label: "Students", value: "students" },
 ];

 
 
 const handleClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setOpenAddModal(false);
    setSelectedAudience([]);
    setAudienceError(false);
    setFormData({
        notification_id: '',
        title: '',
        message: '',
        status: '',
        targetAudience: [],
        notificationError: '',
        titleError: '',
        messageError: '',
        statusError: '',
        targetAudienceError: '',
     }); // Reset form state when closing the modal
  };

  
  const handleAdd = () => {
    setOpenAddModal(true);
  };
  const handleStatusChange = (event) => {
    const value = event.target.value;
    
    // Update the formData state with the selected value
    setFormData((prevData) => ({
      ...prevData,
      status: value,
      statusError: validateRequired(value) ? 'Status is required' : '',  // Handle error message if needed
    }));

    const validateRequired = (value) => {
        return !value;  // Returns true if the value is empty
      };
  };

 


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate based on the field name
    let error = '';
    if (name === 'notification_id') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        notificationError: error,
      }));
    } else if (name === 'title' || name === 'message') {
      error = validateText(value);
      if (name === 'title') {
        setFormData((prevData) => ({
          ...prevData,
          titleError: error,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          messageError: error,
        }));
      }
    } else if (name === 'status') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        statusError: error,
      }));
    }
    console.log(formData.notificationError, formData.titleError, formData.messageError);
//console.log(audienceError);
   
  };
 
   const handleSaveEdit = () => {
    console.log("Saving edits for row:", editedRow);
    setOpenEditModal(false); 


   
  };
  
  // Handle change in form fields and validate on the fly
const handleEditChange = (name, value) => {


    setEditedRow((prevRow) => ({
        ...prevRow,
        [name]: value,
      }));
  
    let error = '';
    if (name === 'notification_id') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        notificationError: error,
      }));
    } else if (name === 'title' || name === 'message') {
      error = validateText(value);
      if (name === 'title') {
        setFormData((prevData) => ({
          ...prevData,
          titleError: error,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          messageError: error,
        }));
      }
    } else if (name === 'status') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        statusError: error,
      }));
    }
    else if (name === 'target_users') {
        if (Array.isArray(value) && value.length === 0) {
          error = 'At least one audience must be selected.';
        } else {
          error = '';
        }
    
        setFormData((prevData) => ({
          ...prevData,
          targetAudienceError: error, // Add an error for target_users in formData
        }));
      }
   
   
    
  
  };
  
 
  const handleConfirmDelete = () => {
    console.log("Deleting row with ID:", selectedRow);
    setOpenDeleteModal(false); // Close the delete modal after confirming
    // Your logic to delete the row, e.g., update state or make an API call
  };
  
  const handleDelete = (id) => {
    setSelectedRow(id);
    setOpenDeleteModal(true); // Open the delete confirmation modal
  };
  
  const handleEdit = (rowData) => {
    setSelectedRow(rowData);
    setEditedRow(rowData); // Pre-fill the form with the row data
    setOpenEditModal(true); // Open the edit modal
  };

  const handleInputChange = (e, value) => {
    if (e?.target?.name) {
      setInput({ ...input, [e.target.name]: e.target.value });
    } else {
      setSelectedAudience(value);
    }

    if (value.length === 0) {
        setAudienceError('At least one audience must be selected.');
      } else {
        setAudienceError('');
      }
  };
  
  const StyledDeleteButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

  const StyledButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

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
  
  const { columns, rows } = notificationdata(handleEdit,handleDelete);
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
                  Notifications Table
                </MDTypography>
              </MDBox>
              <MDBox sx={{ textAlign: "right", mt: 2, mr: 4 }}>
                <MDButton color="success" onClick={handleAdd}>
                  Add Notification
                </MDButton>

                {/* Add Modal */}
              <Dialog open={openAddModal} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Add Notification</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                    {/* Form Fields */}
                   

                    <Grid item xs={12} sm={6}>
                      <MDBox>
                       <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.titleError}
                            helperText={formData.titleError}
                        />
                     </MDBox>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                       <MDBox>
                        <TextField
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.messageError}
                            helperText={formData.messageError}
                           
                        />
                        </MDBox>
                    </Grid>    

                
                   

                 <Grid item xs={12} sm={6}>
                        <Autocomplete
                        multiple
                        options={targetUsersOptions}
                        getOptionLabel={(option) => option.label}
                        value={selectedAudience}
                       
                        onChange={(event, value) => handleInputChange(null, value)}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Target Users"
                            name="target_users"
                            placeholder="Select audience"
                            fullWidth
                            margin="normal"
                            error={!!audienceError} // Display error if there is an error
                            helperText={audienceError}
                            sx={{
                                "& .MuiInputBase-root": {
                                  height: 45, // Set the height for the input
                                },
                                "& .MuiInputBase-input": {
                                  padding: "10px 12px", // Adjust padding if needed for height consistency
                                },
                              }}
                            
                            />
                        )} sx={{
                            "& .MuiAutocomplete-tag": {
                              backgroundColor: "green", // Background color for selected tags
                              color: "black",              // Text color for the tags
                            },
                           
                          }}


                        
                      
                        />
                </Grid>

                   
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <MDButton color="success" onClick={handleAdd}>
                    Save
                    </MDButton>
                </DialogActions>
                </Dialog>
              </MDBox>  


                                       
                <Dialog open={openEditModal} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Edit Notification</DialogTitle>
            <DialogContent>
                {selectedRow && (
                <Grid container spacing={2}>
                     

                    <Grid item xs={12} sm={6}>
                      <MDBox>
                       <TextField
                            label="Title"
                            name="title"
                            value={editedRow ? editedRow.title : ""}
                            onChange={(e) =>
                                handleEditChange(e.target.name, e.target.value)
                            }
                            fullWidth
                            margin="normal"
                            error={!!formData.titleError}
                            helperText={formData.titleError}
                        />
                     </MDBox>
                    </Grid>

                    
                    <Grid item xs={12} sm={6} >
                       <MDBox>
                        <TextField
                            label="Message"
                            name="message"
                            value={editedRow ? editedRow.message : ""}
                            onChange={(e) =>
                                handleEditChange(e.target.name, e.target.value)
                            }
                            
                            fullWidth
                            margin="normal"
                            error={!!formData.messageError}
                            helperText={formData.messageError}

                        />
                        </MDBox>
                    </Grid> 

            
           


                
                   <Grid item xs={12} sm={6}>
                        <Autocomplete
                            multiple
                            options={targetUsersOptions}
                            name="target_users"
                            getOptionLabel={(option) => option.label}
                            value={editedRow ? editedRow.targetAudience || [] : []} // Use the value from editedRow
                            onChange={(event, value) =>
                            handleEditChange("targetAudience", value) // Update the editedRow with the new value
                            }
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Target Users"
                                placeholder="Select users"
                                fullWidth
                                margin="normal"
                                error={!!formData.targetAudienceError} // Show error if there's an error
                                helperText={formData.targetAudienceError} // Display the error message
                            />
                            )}
                            sx={{
                            "& .MuiAutocomplete-tag": {
                                backgroundColor: "green", // Background color for selected tags
                                color: "black",           // Text color for the tags
                            },
                            }}
                        />
                        </Grid>

                    
                </Grid>

                
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <MDButton color="success" onClick={handleSaveEdit}>
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
                        Are you sure you want to delete this item? This action cannot be undone.
                    </MDTypography>
                    </MDBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ color: 'gray' }}>Cancel</Button>
                    <StyledDeleteButton onClick={handleConfirmDelete}>Delete</StyledDeleteButton>
                </DialogActions>
                </Dialog>     

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



      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Notification;
