import Dashboard from "layouts/dashboard";
// import Products from "layouts/products"; // Example layout for Products
// import Categories from "layouts/categories"; // Example layout for Categories
import Icon from "@mui/material/Icon";
import Category from "layouts/tables/Category";

import ShippingDetails from "layouts/tables/Shipping_details";
import Notification from "layouts/tables/Push_notification";

import Campaigns from "layouts/tables/promotional_campaigns";

import DiscountCode from "layouts/tables/discount_code";
import SalesReport from "layouts/tables/Reports/sales_report";
import ProductDetails from "layouts/tables/Product_Details";
import OrderDetails from "layouts/tables/order_details";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Product Management",
    key: "product-management",
    icon: <Icon fontSize="small">local_mall</Icon>,
  
    children: [
      {
        type: "collapse",
        name: "Categories",
        key: "categories",
        icon: <Icon fontSize="small">category</Icon>,
        route: "/product_management/Category",
        component: <Category />,
      },
      {
        type: "collapse",
        name: "Product Details",
        key: "products",
        icon: <Icon fontSize="small">list_alt</Icon>,
        route: "/product_management/Products",
        component: <ProductDetails />,
      },
      
    ],
  },
  {
    type: "collapse",
    name: "Order Management",
    key: "order-management",
    icon: <Icon fontSize="small">store</Icon>,
    children: [
      {
        type: "collapse",
        name: "Order Details",
        key: "order-details",
        icon: <Icon fontSize="small">store</Icon>,
        route: "/order_management/OrderDetails",
        component: <OrderDetails />,
      },
      {
        type: "collapse",
        name: "Shipping Information",
        key: "shipping-information",
        icon: <Icon fontSize="small">inventory</Icon>,
        route: "/order_management/Shipping_details",
        component: <ShippingDetails />,


    },

      
    ],
  },
  {
    type: "collapse",
    name: "Promotion And Discounts",
    key: "product-management",
    icon: <Icon fontSize="small">loyalty</Icon>,
    children: [
      {
        type: "collapse",
        name: "Discount Code",
        key: "discount_code",
        icon: <Icon fontSize="small">category</Icon>,
        route: "/promotion_discount/discount_code",
        component: <DiscountCode />,
      },
      {
        type: "collapse",
        name: "Promotional Campaigns",
        key: "products",
        icon: <Icon fontSize="small">inventory</Icon>,
        route: "/promotional_campaigns/Campaigns",
        component: <Campaigns />,
      },
      
    ],
  },
  {
    type: "collapse",
    name: "Report And Analytics",
    key: "reportandanalalytics",
    icon: <Icon fontSize="small">equalizer</Icon>,
    children: [
      {
        type: "collapse",
        name: "Sales Reports",
        key: "sales_reports",
        icon: <Icon fontSize="small">category</Icon>,
        route: "/reports/sales_report",
        component: <SalesReport />,
      },
      // {
      //   type: "collapse",
      //   name: "Customer Reports",
      //   key: "products",
      //   icon: <Icon fontSize="small">inventory</Icon>,
      //   route: "/tables/products",
      //   component: <Tables />,
      // },
      
    ],
  },

  {
    type: "collapse",
    name: "Push Notifications",
    key: "pushnotification",
    icon: <Icon fontSize="small">notifications_icon</Icon>,
    route: "/Push_notification",
    component: <Notification />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Dashboard />,
  },
];

export default routes;
