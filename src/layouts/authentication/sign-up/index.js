import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import { Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { validateName, validateNameOnly, validateMobileNumber, validateEmail, validatePassword } from "../../tables/validations";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/shop8.webp";
import Swal from "sweetalert2";

function Cover() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [businessNameError, setBusinessNameError] = useState("");
  const [ownerNameError, setOwnerNameError] = useState("");
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleBusinessNameChange = (e) => {
    const value = e.target.value;
    setBusinessName(value);
    setBusinessNameError(validateName(value));
  };

  const handleOwnerNameChange = (e) => {
    const value = e.target.value;
    setOwnerName(value);
    setOwnerNameError(validateNameOnly(value));
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setmobileNumberError(validateMobileNumber(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(e.target.value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(e.target.value);
    setPasswordError(validatePassword(value));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/vendor_register/`, {
        business_name: businessName,
        owner_name: ownerName,
        email: email,
        password: password,
        business_type: businessType,
        mobile_number: mobileNumber,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Successfully Registered!",
          text: "Redirecting to the login page...",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          didClose: () => {
            navigate("/");
          },
        });
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: response.data.msg || "Unable to register. Please check your details.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card className="customCard">
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Business Name"
                    variant="standard"
                    value={businessName}
                    onChange={handleBusinessNameChange}
                    helperText={businessNameError}  
                    fullWidth
                    className={businessNameError ? 'errorInput' : ''} 
                    FormHelperTextProps={{
                      className: businessNameError ? 'errorMessage' : '',
                    }}
                  />
                </MDBox>
              </Grid>


              <Grid item xs={12} sm={6}>
                <MDBox mb={2} display="flex" alignItems="center">
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="business-type-label">Business Type</InputLabel>
                    <Select
                      labelId="business-type-label"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      sx={{ height: '30px' }}
                    >
                      <MenuItem value="Retail">Retail</MenuItem>
                      <MenuItem value="Wholesale">Wholesale</MenuItem>
                      <MenuItem value="Service">Service</MenuItem>
                      <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Owner Name"
                    variant="standard"
                    value={ownerName}
                    onChange={handleOwnerNameChange}
                    helperText={ownerNameError}  
                    className={ownerNameError ? 'errorInput' : ''}  
                    FormHelperTextProps={{
                      className: ownerNameError ? 'errorMessage' : '',
                    }}
                    fullWidth
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="tel"
                    label="Mobile Number"
                    variant="standard"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    helperText={mobileNumberError} 
                    className={mobileNumberError ? 'errorInput' : ''}  
                    FormHelperTextProps={{
                      className: mobileNumberError ? 'errorMessage' : '', 
                    }}
                    fullWidth
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={handleEmailChange}
                    helperText={emailError}  
                    className={emailError ? 'errorInput' : ''}  
                    FormHelperTextProps={{
                      className: emailError ? 'errorMessage' : '', 
                    }}
                    fullWidth
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Password"
                    variant="standard"
                    value={password}
                    onChange={handlePasswordChange}
                    helperText={passwordError}
                    className={passwordError ? 'errorInput' : ''}  
                    FormHelperTextProps={{
                      className: passwordError ? 'errorMessage' : '', 
                    }}
                    fullWidth
                  />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                Sign Up
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
