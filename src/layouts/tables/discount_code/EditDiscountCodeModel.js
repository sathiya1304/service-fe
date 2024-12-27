import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete } from '@mui/material';
import { Select, InputLabel, FormControl } from '@mui/material';
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";


function EditDiscountCodeModal({
  open,
  handleClose,
  handleSave,
  editedRow,
  setEditedRow,
  productOptions = [ { label: "Product 1", value: "product 1" },
  { label: "Product 2", value: "product 2" },
  { label: "Product 3", value: "product 3" }]
}) {
  // Additional check for value of Autocomplete
  const safeProductOptions = Array.isArray(productOptions) ? productOptions : [];
  const safeApplicableProducts = Array.isArray(editedRow.applicable_products) ? editedRow.applicable_products : [];

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedRow(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, date) => {
    setEditedRow(prev => ({ ...prev, [field]: date }));
  };

  const handleAutocompleteChange = (event, newValue) => {
    setEditedRow(prev => ({ ...prev, applicable_products: newValue }));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Discount Code</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDBox>
              <TextField
                label="Discount Code"
                name="discount_code"
                value={editedRow.discount_code}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              </MDBox>
            </Grid> 
            <Grid item xs={12} sm={6}>
              <MDBox>
              <FormControl fullWidth margin="normal">
                <InputLabel id="discount-type-label">Discount Type</InputLabel>
                <Select
                  labelId="discount-type-label"
                  label="Discount Type"
                  name="discount_type"
                  fullWidth
                  margin="normal"
                  value={editedRow.discount_type}
                  onChange={handleFieldChange}
                  sx={{ height: '45px' }} // Adjust this value to fit your needs
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="flat">Flat</MenuItem>
                </Select>
              </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox>
              <TextField
                label="Discount Value"
                name="discount_value"
                type="number"
                value={editedRow.discount_value}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox>
              <TextField
                label="Usage Limit"
                name="usage_limit"
                type="number"
                value={editedRow.usage_limit}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              </MDBox>
            </Grid>

           
            <Grid item xs={12} sm={6}>
              <MDBox>
              <TextField
                label="Minimum Purchase Amount"
                name="minimum_purchase_amount"
                type="number"
                value={editedRow.minimum_purchase_amount}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              </MDBox>
            </Grid>

             
            <Grid item xs={12} sm={6}>
              <MDBox>
              <Autocomplete
                multiple
                options={safeProductOptions}
                getOptionLabel={(option) => option.name}
                value={safeApplicableProducts}
                onChange={handleAutocompleteChange}
                renderInput={(params) => <TextField {...params} label="Applicable Products" placeholder="Select products" fullwidth margin="normal"  sx={{
                  "& .MuiInputBase-root": {
                    height: 45, // Set the height for the input
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 12px", // Adjust padding if needed for height consistency
                  },
                }}/>
                  }
                  sx={{
                    "& .MuiAutocomplete-tag": {
                      backgroundColor: "green", // Background color for selected tags
                      color: "black",              // Text color for the tags
                    },
                  
                  }}
                                />
                   </MDBox>
            </Grid>

            <Grid item xs={12} sm={6} mt={2}>
              <DatePicker
                label="Valid From"
                value={editedRow.valid_from}
                onChange={(date) => handleDateChange('valid_from', date)}
                renderInput={(params) => <TextField {...params} fullWidth  margin="normal"/>}
              />
              
            </Grid>
            <Grid item xs={12} sm={6} mt={2}>
              <DatePicker
                label="Valid To"
                value={editedRow.valid_to}
                onChange={(date) => handleDateChange('valid_to', date)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
           
            
          </Grid>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
         <MDButton onClick={handleSave} color="success" variant="gradient">Edit</MDButton>
      </DialogActions>
    </Dialog>
  );
}

export default EditDiscountCodeModal;
