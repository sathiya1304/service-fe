export default function discountCodeData() {
    return {
        columns: [
            { Header: "Discount Code", accessor: "discount_code", align: "left" },
            { Header: "Discount Type", accessor: "discount_type", align: "left" },
            { Header: "Discount Value", accessor: "discount_value", align: "center" },
            { Header: "Valid From", accessor: "valid_from", align: "center" },
            { Header: "Valid To", accessor: "valid_to", align: "center" },
            { Header: "Usage Limit", accessor: "usage_limit", align: "center" },
            { Header: "Min Purchase Amount", accessor: "minimum_purchase_amount", align: "center" },
            { Header: "Applicable Products", accessor: "applicable_products", align: "center" }
        ],
        rows: [
            {
                discount_code: "DISC100",
                discount_type: "percentage",
                discount_value: 10,
                valid_from: "2024-01-01",
                valid_to: "2024-06-30",
                usage_limit: 100,
                minimum_purchase_amount: 500.00,
                applicable_products: "product 1, product 2"
            },
            {
                discount_code: "FLAT50",
                discount_type: "flat",
                discount_value: 50,
                valid_from: "2024-01-01",
                valid_to: "2024-12-31",
                usage_limit: 200,
                minimum_purchase_amount: 1000.00,
                applicable_products:"product 3, product 4"
            }
        ]
    };
}
