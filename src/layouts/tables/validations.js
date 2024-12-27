
/* For category and Product validations */

export const validateName = (name) => {
    const regex = /^[a-zA-Z0-9_]*$/;
  
    if (!name) {

      return "Required";

    }
  
    if (!regex.test(name)) {
      return "Name must contain only letters, numbers, and underscores.";
    }
  

    return ""; 
  };

 /*  Required field Validation */

  export const validateRequired = (value) => {
    if (!value) {
      return "Required.";
    }
    return "";
  };

/*  Validation for title and message (should include letters, numbers, and special characters) */

export const validateText = (text) => {
    const regex = /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]*$/;
    if (!text) {
      return "Required";
    }
    if (!regex.test(text)) {
      return "Must include letters, numbers, and special characters.";
    }
    return "";
  };
  


  export const validateNameOnly = (name) => {
    const regex = /^[a-zA-Z]*$/; 
  
    if (!name) {
      return "Name is required.";
    }
  
    if (!regex.test(name)) {
      return "Name must contain only letters.";
    }
  
    return ""; 
  };

  export const validateMobileNumber = (mobile) => {
    const regex = /^[6-9]\d{9}$/; // Ensures the number starts with 6-9 and is exactly 10 digits long
  
    if (!mobile) {
      return "Mobile number is required.";
    }
  
    if (!regex.test(mobile)) {
      return "Enter a valid 10-digit mobile number";
    }
  
    return ""; 
  };

  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex pattern
    
    if (!email) {
      return "Email is required.";
    }
  
    if (!regex.test(email)) {
      return "Enter a valid email address.";
    }
  
    return "";
  };
  
  export const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
  
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
  
    return "";
  };
  export const validateNumbers = (value) => {
    // Regex to allow numbers, symbols, and dot
    const regex = /^[0-9@#$%^&*().+-]+$/;
  
    if (!value) {
      return "Required.";
    }
    if (!regex.test(value)) {
      return "Must include only numbers, symbols, or dots.";
    }
    return "";
  }
  
