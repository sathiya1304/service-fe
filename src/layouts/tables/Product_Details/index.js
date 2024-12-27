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
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Description } from "@mui/icons-material";
import productsdata from "../data/productsTableData";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { validateName, validateNumbers, validateRequired, validateText } from "../validations";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';;


function ProductDetails() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    category: '',
    status: '',
    price: '',
    discount_price: '',
    sku: '',
    stock_quantity: "",
    weight: '',
    dimensions: '',
    tags: '',
    vendor: '',
    productNameError: '',
    descriptionError: '',
    categoryError: '',
    statusError: '',
    priceError: '',
    discountPriceError: '',
    skuError: '',
    stockQuantityError: '',
    weightError: '',
    dimensionsError: '',
    tagsError: '',
    vendorError: ''

  });

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      setImages([...files]);
    }
  };



  const Input = styled('input')({
    display: 'none',
  });

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


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate based on the field name
    let error = '';
    if (name === 'product_name') {
      error = validateName(value);
      setFormData((prevData) => ({
        ...prevData,
        productNameError: error,
      }));
    } else if (name === 'price' || name === 'discount_price') {
      error = validateNumbers(value);
      if (name === 'price') {
        setFormData((prevData) => ({
          ...prevData,
          priceError: error,
        }));
      } if (name === 'discount_price') {
        setFormData((prevData) => ({
          ...prevData,
          discountPriceError: error,
        }));
        if (name === 'stock_quantity') {
          setFormData((prevData) => ({
            ...prevData,
            stockQuantityError: error,
          }));
        }
      }
    }
    else if (name === 'description') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        descriptionError: error,
      }));
    }

    else if (name === 'sku') {
      error = validateText(value);
      setFormData((prevData) => ({
        ...prevData,
        skuError: error,
      }));
    }
    else if (name === 'weight') {
      error = validateText(value);
      setFormData((prevData) => ({
        ...prevData,
        weightError: error,
      }));
    }

    else if (name === 'dimensions') {
      error = validateText(value);
      setFormData((prevData) => ({
        ...prevData,
        dimensionsError: error,
      }));
    }


    else if (name === 'tags') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        tagsError: error,
      }));
    }





    console.log(formData.notificationError, formData.titleError, formData.messageError);
    //console.log(audienceError);

  };


  const handleEditChange = (name, value) => {
    // Update the editedRow with the new value
    setEditedRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));

    // Validate based on the field name
    let error = '';
    if (name === 'product_name') {
      error = validateName(value);
      setFormData((prevData) => ({
        ...prevData,
        productNameError: error,
      }));
    } else if (name === 'price' || name === 'discount_price') {
      error = validateNumbers(value);
      if (name === 'price') {
        setFormData((prevData) => ({
          ...prevData,
          priceError: error,
        }));
      } if (name === 'discount_price') {
        setFormData((prevData) => ({
          ...prevData,
          discountPriceError: error,
        }));
        if (name === 'stock_quantity') {
          setFormData((prevData) => ({
            ...prevData,
            stockQuantityError: error,
          }));
        }
      }
    }
    else if (name === 'description') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        descriptionError: error,
      }));
    }

    else if (name === 'sku') {
      error = validateText(value);
      setFormData((prevData) => ({
        ...prevData,
        skuError: error,
      }));
    }
    else if (name === 'weight') {
      error = validateText(value);
      setFormData((prevData) => ({
        ...prevData,
        weightError: error,
      }));
    }

    else if (name === 'dimensions') {
      error = validateText(value);
      setFormData((prevData) => ({
        ...prevData,
        dimensionsError: error,
      }));
    }


    else if (name === 'tags') {
      error = validateRequired(value);
      setFormData((prevData) => ({
        ...prevData,
        tagsError: error,
      }));
    }





  };


  const handleEdit = (rowData) => {
    setSelectedRow(rowData);
    setEditedRow(rowData);
    setOpenEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedRow(id);
    setOpenDeleteModal(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving edits for row:", editedRow);
    setOpenEditModal(false);

  };

  const handleConfirmDelete = () => {
    console.log("Deleting row with ID:", selectedRow);
    setOpenDeleteModal(false);

  };

  const handleClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setOpenAddModal(false);
    setFormData({
      product_name: '',
      description: '',
      category: '',
      status: '',
      price: '',
      discount_price: '',
      sku: '',
      stock_quantity: "",
      weight: '',
      dimensions: '',
      tags: '',
      vendor: '',
      productNameError: '',
      descriptionError: '',
      categoryError: '',
      statusError: '',
      priceError: '',
      discountPriceError: '',
      skuError: '',
      stockQuantityError: '',
      weightError: '',
      dimensionsError: '',
      tagsError: '',
      vendorError: ''

    });
  };


  const handleCategoryChange = (event) => {
    const value = event.target.value;


    const error = validateRequired(value);
    setFormData((prevData) => ({
      ...prevData,
      categoryError: error,
      category: value
    }));
    // Update the formData state with the selected value


  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    const error = validateRequired(value);
    setFormData((prevData) => ({
      ...prevData,
      statusError: error,
      status: value
    }));
    // Update the formData state with the selected value

  };

  const handleAdd = () => {
    setOpenAddModal(true);
  }

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  }; */

  // Pass the handleEdit and handleDelete functions to authorsTableData
  const { columns, rows } = productsdata(handleEdit, handleDelete);
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
                  Product Details Table
                </MDTypography>
              </MDBox>
              <MDBox sx={{ textAlign: 'right', mt: 4, mr: 4 }}>
                <MDButton color="success" onClick={() => handleAdd()} >
                  Add
                </MDButton>

                <Dialog open={openAddModal} onClose={handleClose} fullWidth maxWidth="md">
                  <DialogTitle>Add Product Details</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      {console.log(columns)}  {/* Log the original columns array */}
                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Product Name"
                            name="product_name"
                            value={formData.product_name}

                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.productNameError}
                            helperText={formData.productNameError}


                          />
                        </MDBox>


                      </Grid>

                     

                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <FormControl fullWidth sx={{ minWidth: 220 }} margin="normal" error={!!formData.categoryError}>
                            <InputLabel id="status-label">Category</InputLabel>
                            <Select
                              labelId="status-label"
                              label="Status"
                              name="status"
                              value={formData.category || ''} // Ensure a fallback value for the Select field


                              onChange={handleCategoryChange}  // Handle the change event
                              sx={{
                                height: 45,  // Adjust the height as needed
                                display: 'flex',
                                alignItems: 'center',

                              }}
                            >
                              <MenuItem value="active">   </MenuItem>
                              <MenuItem value="active">Vivo</MenuItem>
                              <MenuItem value="inactive">Sunflower</MenuItem>
                              <MenuItem value="inactive">Rin</MenuItem>
                            </Select>
                          </FormControl>
                        </MDBox>
                      </Grid>



                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.priceError}
                            helperText={formData.priceError}

                          />
                        </MDBox>

                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Discount Price"
                            name="discount_price"
                            value={formData.discount_price}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.discountPriceError}
                            helperText={formData.discountPriceError}

                          />
                        </MDBox>

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="sku"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.skuError}
                            helperText={formData.skuError}

                          />
                        </MDBox>

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Stock Quantity"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.stockQuantityError}
                            helperText={formData.stockQuantityError}

                          />
                        </MDBox>

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.weightError}
                            helperText={formData.weightError}

                          />
                        </MDBox>

                      </Grid>

                      {/* <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Dimensions"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.dimensionsError}
                            helperText={formData.dimensionsError}

                          />
                        </MDBox>

                      </Grid> */}

{/* 
                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.tagsError}
                            helperText={formData.tagsError}

                          />
                        </MDBox>

                      </Grid> */}

                      <Grid item xs={12} sm={6}>
                        <MDBox>
                          <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!formData.descriptionError}
                            helperText={formData.descriptionError}
                            multiline 
                            rows={4}  
                             
                          />
                        </MDBox>

                      </Grid>




                      <Grid item xs={12}>
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          multiple
                          type="file"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="icon-button-file">
                          <Tooltip title="Select one or more images">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              startIcon={<PhotoCamera />}
                              style={{ color: 'white', backgroundColor: '#3f51b5' }}
                            >
                              Upload Image
                            </Button>
                          </Tooltip>
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                          {images.map((file, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(file)}
                              alt={`preview ${index}`}
                              style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}
                              onLoad={() => URL.revokeObjectURL(file)}
                            />
                          ))}
                        </div>
                      </Grid>
                      
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <StyledButton onClick={handleAdd}>Save</StyledButton>
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

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Product Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Product Name"
                  name="product_name"
                  value={editedRow ? editedRow.product_name : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.productNameError}
                  helperText={formData.productNameError}


                />
              </MDBox>


            </Grid>



            <Grid item xs={12} sm={6}>
              <MDBox>
                <FormControl fullWidth sx={{ minWidth: 220 }} margin="normal" error={!!formData.categoryError}>
                  <InputLabel id="status-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    label="Category"
                    name="category"
                    value={editedRow ? editedRow.category : ""}
                    onChange={(e) =>
                      handleEditChange(e.target.name, e.target.value)
                    }

                    sx={{
                      height: 45,  // Adjust the height as needed
                      display: 'flex',
                      alignItems: 'center',

                    }}
                  >
                    <MenuItem value="active"> none  </MenuItem>
                    <MenuItem value="active">Vivo</MenuItem>
                    <MenuItem value="inactive">Sunflower</MenuItem>
                    <MenuItem value="inactive">Rin</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>



            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Price"
                  name="price"
                  value={editedRow ? editedRow.price : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.priceError}
                  helperText={formData.priceError}

                />
              </MDBox>

            </Grid>

            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Discount Price"
                  name="discount_price"
                  value={editedRow ? editedRow.discount_price : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.discountPriceError}
                  helperText={formData.discountPriceError}

                />
              </MDBox>

            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="sku"
                  name="sku"
                  value={editedRow ? editedRow.sku : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.skuError}
                  helperText={formData.skuError}

                />
              </MDBox>

            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Stock Quantity"
                  name="stock_quantity"
                  value={editedRow ? editedRow.stock_quantity : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.stockQuantityError}
                  helperText={formData.stockQuantityError}

                />
              </MDBox>

            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Weight"
                  name="weight"
                  value={editedRow ? editedRow.weight : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.weightError}
                  helperText={formData.weightError}

                />
              </MDBox>

            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Dimensions"
                  name="dimensions"
                  value={editedRow ? editedRow.dimensions : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.dimensionsError}
                  helperText={formData.dimensionsError}

                />
              </MDBox>

            </Grid>


            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Tags"
                  name="tags"
                  value={editedRow ? editedRow.tags : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.tagsError}
                  helperText={formData.tagsError}

                />
              </MDBox>

            </Grid> */}
            <Grid item xs={12} sm={6}>
              <MDBox>
                <TextField
                  label="Description"
                  name="description"
                  type="textarea"
                  value={editedRow ? editedRow.description : ""}
                  onChange={(e) =>
                    handleEditChange(e.target.name, e.target.value)
                  }

                  fullWidth
                  margin="normal"
                  error={!!formData.descriptionError}
                  helperText={formData.descriptionError}
                  multiline 
                  rows={4}  

                />
              </MDBox>

            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageChange}
                id="icon-button-file-edit"
                style={{ display: 'none' }}
              />
              <label htmlFor="icon-button-file-edit">
                <Tooltip title="Select one or more images">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<PhotoCamera />}
                    style={{ color: 'white', backgroundColor: '#3f51b5' }}
                  >
                    Upload Image
                  </Button>
                </Tooltip>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                {images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}
                    onLoad={() => URL.revokeObjectURL(file)}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <StyledButton onClick={handleSaveEdit} color="primary">Save</StyledButton>
        </DialogActions>
      </Dialog>

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
              Are you sure you want to delete this item?
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

export default ProductDetails;
