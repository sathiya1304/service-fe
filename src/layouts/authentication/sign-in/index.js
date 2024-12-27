import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import axios from "axios"; 
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress"; 
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Cover from "layouts/authentication/sign-up";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Swal from "sweetalert2"; 
import 'sweetalert2/dist/sweetalert2.min.css';
import bgImage from "assets/images/shop7.avif";
import "./login.css";
import { validateName, validateNameOnly, validateMobileNumber, validateEmail, validatePassword } from "../../tables/validations";
function Basic() {
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

 
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
     setEmailError(validateEmail(value));
  };


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
     setPasswordError(validatePassword(value));
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const swalInstance = Swal.fire({
      title: 'Logging in...',
      html: 'Please wait while we log you in.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading();
      },
    });
  
    try {
      const response = await axios.post(`/vendor_login/`, {
        email_id: email,
        password: password,
      });
  
      if (response.data.status === 1) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", response.data.email);
  
     
        swalInstance.close();
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to the dashboard...',
          timer: 5000,
          timerProgressBar: true,
          didClose: () => {
            navigate('/dashboard');
          },
        });
      } else if (response.data.status === 0) {
    
        Swal.update({
          icon: 'error',
          title: 'Login Failed',
          html: `<p>${response.data.message}</p>`,
          showConfirmButton: true,
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
     
      Swal.update({
        icon: 'error',
        title: 'Login Failed',
        html: `<p>${error.response ? error.response.data.message : 'An unexpected error occurred'}</p>`,
        showConfirmButton: true,
        confirmButtonText: 'Try Again',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleLoginError = (message, errorType) => {
    let alertMessage = "Authentication failed";
    if (errorType === "wrong_email") {
      alertMessage = "Invalid email ID.";
    } else if (errorType === "wrong_password") {
      alertMessage = "Invalid password.";
    }
  
    setAlert({ show: true, message: alertMessage, variant: "danger" });
  };
  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                helperText={emailError}  
                    className={emailError ? 'errorInput' : ''}  
                    FormHelperTextProps={{
                      className: emailError ? 'errorMessage' : '', 
                    }}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                helperText={passwordError}
                className={passwordError ? 'errorInput' : ''}  
                FormHelperTextProps={{
                  className: passwordError ? 'errorMessage' : '', 
                }}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSignIn}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/sign_up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
