// Sample data for report types
const revenueData = {
    columns: [
        { Header: "Date", accessor: "date" },
        { Header: "Total Revenue", accessor: "totalRevenue" },
        { Header: "Transactions", accessor: "transactions" }
    ],
    rows: [
        { id: 1, date: "2023-01-01", totalRevenue: "$5000", transactions: 150 },
        { id: 2, date: "2023-01-02", totalRevenue: "$6000", transactions: 180 },
    ]
};

const orderValueData = {
    columns: [
        { Header: "Date", accessor: "date" },
        { Header: "Average Order Value", accessor: "averageOrderValue" },
        { Header: "Orders", accessor: "orders" }
    ],
    rows: [
        { id: 1, date: "2023-01-01", averageOrderValue: "$50", orders: 100 },
        { id: 2, date: "2023-01-02", averageOrderValue: "$55", orders: 110 },
    ]
};

const bestSellingProductData = {
    columns: [
        { Header: "Product Name", accessor: "productName" },
        { Header: "Units Sold", accessor: "unitsSold" },
        { Header: "Revenue", accessor: "revenue" }
    ],
    rows: [
        { id: 1, productName: "Laptop", unitsSold: 50, revenue: "$50000" },
        { id: 2, productName: "Smartphone", unitsSold: 75, revenue: "$45000" },
    ]
};

const salesByCategoryData = {
    columns: [
        { Header: "Category", accessor: "category" },
        { Header: "Total Sales", accessor: "totalSales" },
        { Header: "Units Sold", accessor: "unitsSold" }
    ],
    rows: [
        { id: 1, category: "Electronics", totalSales: "$100000", unitsSold: 100 },
        { id: 2, category: "Clothing", totalSales: "$50000", unitsSold: 200 },
    ]
};

// Functions to fetch data (simulated here with static data)
export const getRevenueData = (startDate, endDate) => revenueData;
export const getAverageOrderValue = (startDate, endDate) => orderValueData;
export const getBestSellingProduct = (startDate, endDate) => bestSellingProductData;
export const getSalesByCategory = (startDate, endDate) => salesByCategoryData;
