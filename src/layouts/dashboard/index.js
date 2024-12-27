// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Divider from "@mui/material/Divider";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import MDTypography from "components/MDTypography";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox mt={2}>
              <ComplexStatisticsCard
                color="dark"
                icon="trending_up"
                title="Total Sales"
                count={500}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox mt={2}>
              <ComplexStatisticsCard
                icon="local_mall"
                title="Total Products"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox mt={2}>
              <ComplexStatisticsCard
                color="success"
                icon="people_alt"
                title="Total Customers"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox mt={2}>
              <ComplexStatisticsCard
                color="primary"
                icon="store"
                title="Total Orders"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox mt={2}>
              <ComplexStatisticsCard
                color="warning"
                icon="local_offer"
                title="Active Promotions"
                count="6"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 30 }} />
        <MDTypography variant="h4" mt={4}>
          Sales Overview
        </MDTypography>
        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mt={4}>
                <ReportsBarChart
                  color="info"
                  title="Sales Today"
                  description="Products sold today"
                  date="updated 4 min ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mt={4}>
                <ReportsLineChart
                  color="success"
                  title="Sales this week"
                  description="Products sold this week"
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mt={4}>
                <ReportsLineChart
                  color="dark"
                  title="Sales this month"
                  description="Products sold this month"
                  date="updated 4 min ago"
                  chart={tasks}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mt={4}>
                <ReportsLineChart
                  color="primary"
                  title="Sales last month"
                  description="Products sold last month"
                  date="updated 4 min ago"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Divider style={{ marginTop: 30 }} />
        <MDTypography variant="h4" mt={4}>
          Order Summary
        </MDTypography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mt={6}>
              <ComplexStatisticsCard
                color="warning"
                icon="access_time_filled"
                title="Pending Orders"
                count="100"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mt={6}>
              <ComplexStatisticsCard
                color="success"
                icon="done_outline"
                title="Completed Orders"
                count="500"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mt={6}>
              <ComplexStatisticsCard
                color="error"
                icon="cancel"
                title="cancelled Orders"
                count="91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
