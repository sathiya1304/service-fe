import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { Schedule } from "@mui/icons-material";



export default function notificationdata() {
  

  return {
    columns: [
      { Header: "Notification ID", accessor: "notification_id", align: "left" },
      { Header: "Title", accessor: "title", align: "left" },
      { Header: "Message", accessor: "message", align: "left" },
      { Header: "Target Users", accessor: "target_users", align: "left" },
      { Header: "Schedule Time", accessor: "schedule_time", align: "left" },
     
        ],
    rows: [
      {
        "notification_id": "001",
        "title": "Christmas Offer",
        "message": "Exciting 50% off on Dresses",
        "target_users": "All users",
        "schedule_time":"24-12-2024 @8:00AM",
       
       
      },

      {
        "notification_id": "002",
        "title": "Christmas Offer",
        "message": "Flat 20% off on Appliances",
        "target_users": "Users above 20 years",
        "schedule_time":"24-12-2024 @8:00AM",
        
       
      },

      {
        "notification_id": "003",
        "title": "New Year Offer",
        "message": "Buy 2 get 1 free offer on TwinBirds products",
        "target_users": "All users",
        "schedule_time":"28-12-2024 @8:00AM",
       
       
      },
      {
        "notification_id": "004",
        "title": "New Year Offer",
        "message": "Exciting 10% off on Groceries in Velavan Stores",
        "target_users": "Frequent buyers",
        "schedule_time":"28-12-2024 @8:00AM",
       
       
      },

      {
        "notification_id": "005",
        "title": "Christmas Offer",
        "message": "Exciting 50% off on Handbags",
        "target_users": "All Female users",
        "schedule_time":"24-12-2024 @8:00AM",
        
       
      },

    
     
     
    ],
  };
}
