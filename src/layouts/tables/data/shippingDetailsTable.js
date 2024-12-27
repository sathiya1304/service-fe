import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";



export default function shippingdata() {
  

  return {
    columns: [
      { Header: "Order Id", accessor: "order_id", align: "left" },
      { Header: "Shipping Method", accessor: "shipping_method", align: "left" },
      { Header: "Tracking Number", accessor: "tracking_number", align: "center" },
      { Header: "Estimated Delivery Date", accessor: "edd", align: "center" },
        ],

    rows: [
      {
        "order_id": "001",
        "shipping_method": "Local Delivery",
        "tracking_number": "TI-123868979",
        "edd": "27-12-2024"
       
      },

      {
        "order_id": "002",
        "shipping_method": "In-store Delivery",
        "tracking_number": "TI-123865456",
        "edd": "29-12-2024"
      },

      
      {
        "order_id": "003",
        "shipping_method": "Two-days Delivery",
        "tracking_number": "TI-123813425",
        "edd": "25-12-2024"
       
      },
      
      {
        "order_id": "004",
        "shipping_method": "Local Delivery",
        "tracking_number": "TI-123862345",
        "edd": "25-12-2024"
       
      },
      
      {
        "order_id": "002",
        "shipping_method": "Overnight Delivery",
        "tracking_number": "TI-937468979",
        "edd": "26-12-2024"
       
      },
     
     
    ],
  };
}
