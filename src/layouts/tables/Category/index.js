import React, { useState, useEffect } from "react";
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import Checkbox from "@mui/material/Checkbox";
import Tree from "react-d3-tree";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import IconButton from '@mui/material/IconButton';
import MDButton from "components/MDButton";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { validateName } from "../validations"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

const columns = [
  {
    Header: "Id",
    accessor: "id",
    sortable: true,
  },
  {
    Header: "Category Name",
    accessor: "category_name",
    sortable: true,
  },
  {
    Header: "Parent Category",
    accessor: "parent_category_name",
    sortable: true,
  },
  {
    Header: "Options",
    accessor: "option",
  },
];

function Category() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isParentDisabled, setIsParentDisabled] = useState(true);

  const [parentCategory, setParentCategory] = useState("");
  const [Input, setInput] = useState({ parent_category_name: "" });
  const [categoryData, setCategoryData] = useState({ name: "Root", children: [] });
  const [updateCategoryData, setUpdateCategoryData] = useState({ name: "", children: [] });
  const [editInput, setEditInput] = useState({ parent_category_name: "" }); 
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/fetch");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddChange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value, });

  };

  const handleEditChange = (e) => {
    setEditInput({ ...editInput, [e.target.name]: e.target.value });

  };


  const addCategory = async (event) => {
    console.log("success");
    event.preventDefault();
    event.persist();

    try {
      const response = await axios.post('/category/add', {
        category_name: Input.category_name,
        parent_category_name: Input.parent_category_name,
      });

      setOpenAddModal(false);
      console.log(response.data);

      if (response.data.success) {
        Swal.fire({
          title: 'Successfully Inserted!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500 // Close after 1.5 seconds
        });
        fetchCategories();
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || 'Server Problem. Please Try Again...',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error adding record:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'An unexpected error occurred',
        icon: 'error',
      });
    }
  };

  const updateCategory = (event) => {
    event.preventDefault();
    try {
      event.persist();

      axios
        .put(`/category/edit/${editInput.id}`, {
          category_name: editInput.category_name,
          parent_category_name: editInput.parent_category_name,
        })
        .then((res) => {
          setOpenEditModal(false);
          console.log(res.data);
          if (res.data.success === true) {
            Swal.fire({
              title: 'Successfully Updated!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500 // Close after 1.5 seconds
            });
            fetchCategories();
          } else {
            Swal.fire({
              icon: "error",
              text: res.data.msg,
              type: "error",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.error("Error updating category allocation:", error);
      Swal.fire({
        title: 'Error',
        text: "An unexpected error occurred. Please try again.",
        icon: 'error',
      });
    }
  };

  const data = categories.map((category) => ({
    id: category.id,
    category_name: category.category_name,
    parent_category_name: category.parent_category_name, // Fixed typo
    option: (
      <div style={{ display: "flex" }}>
        <IconButton
          color="info"
          size="sm"
          onClick={() => {
            setOpenEditModal({
              id: category.id,
              category_name: category.category_name,
              parent_category_name: category.parent_category_name,
            });
            setEditInput({
              id: category.id,
              category_name: category.category_name,
              parent_category_name: category.parent_category_name,
            });
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          size="sm"
          style={{ marginLeft: "5px" }}
          onClick={() => {
            setDeleteCategoryId(category.id);
            setOpenDeleteModal(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  }));

  const deleteCategory = async (event) => {
    event.preventDefault();
    if (deleteCategoryId) {
      try {
        const response = await axios.delete(`/category/delete/${deleteCategoryId}`);
        console.log(response.data.success);
        setOpenDeleteModal(false);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            text: "Successfully deleted...",
            type: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchCategories();
        } else {
          Swal.fire({
            icon: "error",
            text: response.data.message || "Server Problem. Please Try Again...",
            type: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        Swal.fire({
          icon: "error",
          text: "An unexpected error occurred. Please try again.",
          type: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } else {
      console.error("No category ID provided for deletion.");
    }
  };



  const toggleParentCategory = () => {
    setIsParentDisabled((prev) => {
      if (!prev) {
        setParentCategory('');
      }
      return !prev;
    });
  };



  useEffect(() => {
   
      setCategoryData({
        name: Input.parent_category_name,
        children: Input.category_name ? [{ name: Input.category_name }] : []
      });
      

      setUpdateCategoryData({
        name: editInput.parent_category_name,
        children: editInput.category_name ? [{ name: editInput.category_name }] : []
      });
     
    
  }, [Input,editInput]);


  const handleClose = () => {
    setInput("");
    setCategoryData({ name: "Root", children: [] });
    setIsParentDisabled(true);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setOpenAddModal(false);
  };






  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">Category</MDTypography>
              </MDBox>
              <MDBox sx={{ textAlign: "right", mt: 4, mr: 4 }}>
                <MDButton color="success" onClick={() => setOpenAddModal(true)}>Add Category</MDButton>
              </MDBox>
              <MDBox pt={3}>


                <DataTable
                  table={{ columns: columns, rows: data }}

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

      {/* Add Modal */}
      <Dialog open={openAddModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add Category</DialogTitle>
        <MDBox component="form" onSubmit={addCategory}>
          <DialogContent>

            <Grid container spacing={2}>
              {/* Left Section: Form Fields */}
              <Grid item xs={6}>
                <MDBox>
                  <TextField
                    label="Category Name"
                    name="category_name"
                    onChange={handleAddChange}
                    fullWidth
                    margin="normal"


                  />
                  <FormControl fullWidth margin="normal" disabled={isParentDisabled}>
                    <InputLabel id="parent-category-label">Parent Category</InputLabel>
                    <Select
                      labelId="parent-category-label"
                      label="Parent Category"
                      name="parent_category_name"
                      value={Input.parent_category_name}
                      onChange={handleAddChange}
                      sx={{ height: '45px' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.category_name}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <MDBox display="flex" alignItems="center" mt={2}>
                    <Checkbox
                      checked={!isParentDisabled}
                      onChange={toggleParentCategory}
                      color="primary"
                    />
                    <MDTypography variant="body2" ml={1}>
                      Enable Parent Category
                    </MDTypography>
                  </MDBox>

                </MDBox>
              </Grid>

              {/* Right Section: Dendrogram */}
              <Grid item xs={6}>
                <MDBox style={{ height: "300px", width: "100%", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px" }}>
                  <MDTypography variant="h6" mb={2}>
                    Category Structure
                  </MDTypography>
                  <div style={{ height: "100%" }}>
                    {categoryData ? (
                      <Tree data={categoryData} orientation="vertical" />
                    ) : (
                      <MDTypography variant="body2" color="textSecondary">
                        Enter category details to see the structure.
                      </MDTypography>
                    )}
                  </div>
                </MDBox>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <MDButton type="submit" color="success" > {/* This should trigger the actual add function */}
              Save
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>



      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleClose} fullWidth maxWidth="md">

        <DialogTitle>Edit Category</DialogTitle>
        <MDBox component="form" onSubmit={updateCategory}>
          <DialogContent>

            <Grid container spacing={2}>
              {/* Left Section: Form Fields */}
              <Grid item xs={6}>
                <MDBox>
                  <TextField
                    label="Category Name"
                    name="category_name"
                    value={editInput.category_name}
                    onChange={(e) => handleEditChange(e)}
                    fullWidth
                    margin="normal"


                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="edit-parent-category-label">Parent Category</InputLabel>
                    <Select
                      labelId="edit-parent-category-label"
                      id="edit-parent-category-select"
                      name="parent_category_name"
                      value={editInput.parent_category_name}
                      label="Parent Category"
                      onChange={(e) => handleEditChange(e)}
                      sx={{ height: '45px' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.category_name}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                </MDBox>
              </Grid>

              {/* Right Section: Dendrogram */}
              <Grid item xs={6}>
                <MDBox
                  style={{
                    height: "300px",
                    width: "100%",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <MDTypography variant="h6" mb={2}>
                    Category Structure
                  </MDTypography>
                  <div style={{ height: "100%" }}>
                    {updateCategoryData ? (
                      <Tree data={updateCategoryData} orientation="vertical" />
                    ) : (
                      <MDTypography variant="body2" color="textSecondary">
                        Edit category details to see the structure.
                      </MDTypography>
                    )}
                  </div>
                </MDBox>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <MDButton color="success" type="submit">
              Save
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>


      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleClose}>
        <MDBox component="form" onSubmit={deleteCategory}>
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
            <MDButton type="submit" color="primary">Delete</MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>

    </DashboardLayout>
  );
}

export default Category;
