import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import discountCodeData from "../data/promotionalDiscountTableData";
import AddDiscountCodeModal from "./AddDiscountCodeModel";  // Ensure correct file name
import EditDiscountCodeModal from "./EditDiscountCodeModel";
import DeleteConfirmModal from "./DeleteDiscountCodeModel";

function DiscountCode() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [editedRow, setEditedRow] = useState({
        discount_code: '',
        discount_type: '',
        discount_value: '',
        valid_from: new Date(),
        valid_to: new Date(),
        usage_limit: '',
        minimum_purchase_amount: '',
        applicable_products: []
    });

    const initialEditedRowState = {
        discount_code: '',
        discount_type: '',
        discount_value: '',
        valid_from: new Date(),
        valid_to: new Date(),
        usage_limit: '',
        minimum_purchase_amount: '',
        applicable_products: []
    };

    const handleEdit = (rowData) => {
        setSelectedRow(rowData);
        setEditedRow({ ...rowData, valid_from: new Date(rowData.valid_from), valid_to: new Date(rowData.valid_to) });
        setOpenEditModal(true);
    };

    const handleDelete = (rowData) => {
        setSelectedRow(rowData);
        setOpenDeleteModal(true);
    };

    const handleOpenAddModal = () => {
        setEditedRow(initialEditedRowState); // Reset the editedRow state
        setOpenAddModal(true);
    };

    const { columns, rows } = discountCodeData();
    const tableColumns = columns.concat([{
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
            <React.Fragment>
                <IconButton onClick={() => handleEdit(row.original)} color="info">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row.original)} color="error">
                    <DeleteIcon />
                </IconButton>
            </React.Fragment>
        )
    }]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                                <MDTypography variant="h6" color="white">Promotional Discount Codes</MDTypography>
                            </MDBox>
                            <MDBox sx={{ textAlign: 'right', mt: 4, mr: 4 }}>
                                <MDButton color="success" onClick={handleOpenAddModal}>Add Discount Code</MDButton>
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

            <AddDiscountCodeModal
                open={openAddModal}
                handleClose={() => setOpenAddModal(false)}
                handleAdd={() => console.log("Adding", editedRow)}
                editedRow={editedRow}
                setEditedRow={setEditedRow}
            />

            <EditDiscountCodeModal
                open={openEditModal}
                handleClose={() => setOpenEditModal(false)}
                handleSave={() => console.log("Saving", editedRow)}
                editedRow={editedRow}
                setEditedRow={setEditedRow}
            />

            <DeleteConfirmModal
                open={openDeleteModal}
                handleClose={() => setOpenDeleteModal(false)}
                handleConfirmDelete={() => console.log("Deleting", selectedRow.discount_code)}
            />
        </DashboardLayout>
    );
}

export default DiscountCode;
