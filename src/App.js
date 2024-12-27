import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import "./assets/login.css";
import "./assets/sidenav.css";
import "./assets/validation.css";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Basic from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
import Cover from "layouts/authentication/sign-up";
import Category from "layouts/tables/Category";
import ProductDetails from "layouts/tables/Product_Details";
import OrderDetails from "layouts/tables/order_details";
import Campaigns from "layouts/tables/promotional_campaigns";

import ShippingDetails from "layouts/tables/Shipping_details";
import Notification from "layouts/tables/Push_notification";

import DiscountCode from "layouts/tables/discount_code";
import SalesReport from "layouts/tables/Reports/sales_report";





export default function App() {

  axios.defaults.baseURL = "http://127.0.0.1:5000";

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();


  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);


  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);


  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return  (

      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
        <Sidenav
          color={sidenavColor}
          brandName={
            <div
              className="sidenav-brand-name"
            >
              Vendor
            </div>
          }
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />

            <Configurator />
            {configsButton}
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route
            path="/"
            element={<Basic />}
          />
                <Route
            path="/sign_up"
            element={<Cover />}
          />
          
         <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
          
        />
        {getRoutes(routes)}
          <Route
            path="/product_management/Category"
            element={<Category />}
          />

        {getRoutes(routes)}
          <Route
            path="/product_management/Products"
            element={<ProductDetails />}
          />
          {getRoutes(routes)}
          <Route
            path="/order_management/OrderDetails"
            element={<OrderDetails />}
          />

        {getRoutes(routes)}
          <Route
            path="/promotional_campaigns/Campaigns"
            element={<Campaigns />}
          />
        {getRoutes(routes)}
          <Route
            path="/promotion_discount/discount_code"
            element={<DiscountCode />}
          />
          
        {getRoutes(routes)}
          <Route
            path="/order_management/Shipping_details"
            element={<ShippingDetails />}
          />

          
        {getRoutes(routes)}
          <Route
            path="/order_management/Shipping_details"
            element={<ShippingDetails />}
          />

              
        {getRoutes(routes)}
          <Route
            path="/push_notification"
            element={<Notification />}
          />

        {getRoutes(routes)}
        <Route
          path="/reports/sales_report"
          element={<SalesReport/>}
        />

        </Routes>
      </ThemeProvider>

  
  );
}
