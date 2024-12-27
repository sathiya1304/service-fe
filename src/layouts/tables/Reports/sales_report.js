import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Select, MenuItem, FormControl, InputLabel, TextField, Grid, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import DataTable from "examples/Tables/DataTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getRevenueData, getAverageOrderValue, getBestSellingProduct, getSalesByCategory } from '../data/reportsData';
import MDButton from "components/MDButton";

function SalesReport() {
    const [selectedOption, setSelectedOption] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [category, setCategory] = useState(null);
    const [tableData, setTableData] = useState({ columns: [], rows: [] });

    const categories = [
        { label: 'Electronics', id: 1 },
        { label: 'Clothing', id: 2 },
        { label: 'Accessories', id: 3 },
        { label: 'Food', id: 4 },
        { label: 'Books', id: 5 }
    ];

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setTableData({ columns: [], rows: [] }); // Clear previous data
    };

    const handleFetchData = () => {
        let data;
        switch(selectedOption) {
            case 'report1':
                data = getRevenueData(startDate, endDate);
                break;
            case 'report2':
                data = getAverageOrderValue(startDate, endDate);
                break;
            case 'report3':
                data = getBestSellingProduct(startDate, endDate);
                break;
            case 'report4':
                if (category) {
                    data = getSalesByCategory(startDate, endDate).rows.filter(row => row.category === category.label);
                    // You need to manually adjust columns for filtered data or create a separate fetch function
                }
                break;
            default:
                data = { columns: [], rows: [] };
                break;
        }
        setTableData(data);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text("Report", 14, 15);
        doc.autoTable({
            theme: "striped",
            head: [tableData.columns.map(col => col.Header)],
            body: tableData.rows.map(row => tableData.columns.map(col => row[col.accessor])),
            startY: 20,
        });
        doc.save(`${selectedOption}-report.pdf`);
    };

    return (
        <DashboardLayout>
          <DashboardNavbar />
            <MDBox pt={6} pb={3}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Card>
                    <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                     <MDTypography variant="h6" color="white">Sales Report</MDTypography>
                    </MDBox> 
                    <MDBox pt={3} pl={3} pb={1}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Select Report Type</InputLabel>
                                        <Select
                                            label="Select Report Type"
                                            name="report-type-select"
                                            value={selectedOption}
                                            onChange={handleChange}
                                            sx={{
                                                height: '45px',
                                                width: '250px',
                                                // backgroundColor: 'lightblue',
                                                // color: 'darkblue',
                                                // '& .MuiSvgIcon-root': { color: 'darkblue' },
                                                // '&:hover': { backgroundColor: 'yellow' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' }
                                            }}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem value="report1">Total Revenue</MenuItem>
                                            <MenuItem value="report2">Average Order Value</MenuItem>
                                            <MenuItem value="report3">Best Selling Product</MenuItem>
                                            <MenuItem value="report4">Sales by Category</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                        {selectedOption && (
                            <>
                                {(selectedOption === 'report1' || selectedOption === 'report2' || selectedOption === 'report3') && (
                                    <>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                label="Start Date"
                                                value={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                label="End Date"
                                                value={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </Grid>
                                    </>
                                )}
                                {selectedOption === 'report4' && (
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="category-search"
                                            options={categories}
                                            sx={{ width: 250, mt: 2 }}
                                            value={category}
                                            onChange={(event, newValue) => setCategory(newValue)}
                                            renderInput={(params) => <TextField {...params} label="Search Categories" />}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <MDButton variant="contained"  color="success" onClick={handleFetchData} sx={{ mr: 1 }}>
                                        Generate Report
                                    </MDButton>
                                    {tableData.columns.length > 0 && (
                                        <MDButton onClick={handleExportPDF} variant="contained"  color="error">
                                            Export as PDF
                                        </MDButton>
                                    )}
                                </Grid>
                                {tableData.columns.length > 0 && (
                                    <Grid item xs={12}>
                                        <DataTable
                                            table={tableData}
                                            isSorted={true}
                                            entriesPerPage={true}
                                            showTotalEntries={true}
                                            canSearch={true}
                                            noEndBorder
                                        />
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                </LocalizationProvider>
            </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    
        </DashboardLayout>
    );
}

export default SalesReport;
