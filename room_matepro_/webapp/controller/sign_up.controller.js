sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
   "roommatepro/utils/AppConstants",
    "roommatepro/utils/BaseApi"
], function (Controller, MessageToast, MessageBox,AppConstants,BaseApi) {
  "use strict";

  return Controller.extend("roommatepro.controller.sign_up", {
    onInit: function () {
      var oModel = new sap.ui.model.json.JSONModel({
        signup: {
          full_name: "",
          email: "",
          phone_number: "",
          password_pwd: "",
          role_user:"user",
          confirm_pwd: "",

          full_nameError: false,
          emailError: false,
          phoneError: false,
          passwordError: false,
          confirmPasswordError: false,

          full_nameErrorText: "",
          emailErrorText: "",
          phoneErrorText: "",
          passwordErrorText: "",
          confirmPasswordErrorText: "",

          // visibility flags
          showEmail: false,
          showPhone: false,
          showPassword: false,
          showConfirmPassword: false
        }
      });
      this.getView().setModel(oModel, "signUpModel");
    },

    onSignIn: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("login");
    },

   onFullNameLiveChange: function (oEvent) {
    var value = oEvent.getParameter("value");
    var oModel = this.getView().getModel("signUpModel");

    oModel.setProperty("/signup/full_name", value);
    var isValid = value.trim().length >= 5;

    oModel.setProperty("/signup/showEmail", isValid);
    oModel.setProperty("/signup/full_nameError", !isValid);
    oModel.setProperty("/signup/full_nameErrorText", isValid ? "" : "Enter your full name");
},

onEmailLiveChange: function (oEvent) {
    var value = oEvent.getParameter("value");
    var oModel = this.getView().getModel("signUpModel");

    oModel.setProperty("/signup/email", value);

    // Only valid if email ends with ".com"
    var emailPattern = /^[^\s@]+@[^\s@]+\.com$/i;
    var isValid = emailPattern.test(value);

    oModel.setProperty("/signup/showPhone", isValid);
    oModel.setProperty("/signup/emailError", !isValid);
    oModel.setProperty("/signup/emailErrorText", isValid ? "" : "Enter a valid .com email");
},

onPhoneLiveChange: function (oEvent) {
    var value = oEvent.getParameter("value");
    var oModel = this.getView().getModel("signUpModel");

    oModel.setProperty("/signup/phone_number", value);
    var isValid = /^\d{10,}$/.test(value); // at least 10 digits

    oModel.setProperty("/signup/showPassword", isValid);
    oModel.setProperty("/signup/phoneError", !isValid);
    oModel.setProperty("/signup/phoneErrorText", isValid ? "" : "Enter your phone number");
},

onPasswordLiveChange: function (oEvent) {
    var value = oEvent.getParameter("value");
    var oModel = this.getView().getModel("signUpModel");

    oModel.setProperty("/signup/password_pwd", value);
    var isValid = value.length >= 6;

    oModel.setProperty("/signup/showConfirmPassword", isValid);
    oModel.setProperty("/signup/passwordError", !isValid);
    oModel.setProperty("/signup/passwordErrorText", isValid ? "" : "Enter a password (min 6 chars)");
},

onConfirmPasswordLiveChange: function (oEvent) {
    var value = oEvent.getParameter("value");
    var oModel = this.getView().getModel("signUpModel");
    var password = oModel.getProperty("/signup/password_pwd");

    oModel.setProperty("/signup/confirm_password", value);
    var isValid = value === password && value.length > 0;

    oModel.setProperty("/signup/confirmPasswordError", !isValid);
    oModel.setProperty("/signup/confirmPasswordErrorText", isValid ? "" : "Passwords do not match");
},


    onSignUp: function () {
    var oModel = this.getView().getModel("signUpModel");
    var data = oModel.getProperty("/signup");

   
    data.full_nameError = false;
    data.emailError = false;
    data.phoneError = false;
    data.passwordError = false;
    data.confirmPasswordError = false;

    data.full_nameErrorText = "";
    data.emailErrorText = "";
    data.phoneErrorText = "";
    data.passwordErrorText = "";
    data.confirmPasswordErrorText = "";

    var bError = false;

   
    if (!data.full_name || data.full_name.trim().length < 5) {
        data.full_nameError = true;
        data.full_nameErrorText = "Enter your full name (min 5 characters)";
        bError = true;
    }

    
    var emailPattern =  /^[^\s@]+@[^\s@]+\.com$/i;
    if (!data.email || !emailPattern.test(data.email)) {
        data.emailError = true;
        data.emailErrorText = "Enter a valid email (.com, .in, .org, .net)";
        bError = true;
    }

 
    var phonePattern = /^\d{10,}$/;
    if (!data.phone_number || !phonePattern.test(data.phone_number)) {
        data.phoneError = true;
        data.phoneErrorText = "Enter a valid phone number (min 10 digits)";
        bError = true;
    }

    
    if (!data.password_pwd || data.password_pwd.length < 6) {
        data.passwordError = true;
        data.passwordErrorText = "Enter a password (min 6 characters)";
        bError = true;
    }

 
    if (!data.confirm_password) {
        data.confirmPasswordError = true;
        data.confirmPasswordErrorText = "Re-enter your password";
        bError = true;
    } else if (data.confirm_password !== data.password_pwd) {
        data.confirmPasswordError = true;
        data.confirmPasswordErrorText = "Passwords do not match";
        bError = true;
    }

    oModel.refresh(true);

    if (bError) {
        //MessageBox.error("Please correct the highlighted fields.");
        oModel.refresh(true);
         setTimeout(function () {
        var oModel = this.getView().getModel("signUpModel");

        // Reset all error flags
        oModel.setProperty("/signup/full_nameError", false);
        oModel.setProperty("/signup/emailError", false);
        oModel.setProperty("/signup/phoneError", false);
        oModel.setProperty("/signup/passwordError", false);

    }.bind(this), 2000);
        return;
    }

    this.fetchSignUp();
}
,
    fetchSignUp: async function () {
  try {
    let signupData = this.getView().getModel("signUpModel").getData().signup;
      // let signupData = this.getView().getModel("signUpModel").getProperty("/signup");

    if (
      !signupData.full_name ||
      !signupData.email ||
      !signupData.phone_number ||
      !signupData.password_pwd ||
      !signupData.confirm_password
    ) {
      MessageToast.show("Please fill in all the fields");
      return;
    }

    // Check password match
    if (signupData.password_pwd !== signupData.confirm_password) {
      MessageToast.show("Passwords do not match");
      return;
    }

    // Prepare request payload
    let request = {
      full_name: signupData.full_name,
      email: signupData.email,
      phone_number: signupData.phone_number,
      password_pwd: signupData.password_pwd,
       role_user:signupData.role_user,
       confirm_pwd: signupData.confirm_pwd
    };

    let URL = AppConstants.URL.endpoint + AppConstants.URL.Signup;


    let response = await BaseApi.restMethodpost(URL, request);

    this.getView().setBusy(false);

    if (response) {
     
      setTimeout(() => {
           // MessageToast.show("Login Successful!");
           // this.byId("email").setBusy(false);
            MessageToast.show("Signup Successful!");
                 this.getOwnerComponent().getRouter().navTo("login");

           this.getView().setBusy(false);
          }, 2000);
    }
  } catch (error) {
    this.getView().setBusy(false);
    console.error("Error in fetchSignUp: ", error);
    MessageToast.show("Something went wrong during signup.");
  }
}

  });
});
