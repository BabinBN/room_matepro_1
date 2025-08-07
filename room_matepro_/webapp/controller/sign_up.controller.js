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
          confirm_password: "",

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
      oModel.setProperty("/signup/showEmail", value.trim().length >= 5);
    },

    onEmailLiveChange: function (oEvent) {
      var value = oEvent.getParameter("value");
      var oModel = this.getView().getModel("signUpModel");

      oModel.setProperty("/signup/email", value);
      oModel.setProperty("/signup/showPhone", value.includes("@") && value.includes("."));
    },

    onPhoneLiveChange: function (oEvent) {
      var value = oEvent.getParameter("value");
      var oModel = this.getView().getModel("signUpModel");

      oModel.setProperty("/signup/phone_number", value);
      oModel.setProperty("/signup/showPassword", value.length >= 10);
    },

    onPasswordLiveChange: function (oEvent) {
      var value = oEvent.getParameter("value");
      var oModel = this.getView().getModel("signUpModel");

      oModel.setProperty("/signup/password_pwd", value);
      oModel.setProperty("/signup/showConfirmPassword", value.length >= 6);
    },

    onConfirmPasswordLiveChange: function (oEvent) {
      var value = oEvent.getParameter("value");
      var oModel = this.getView().getModel("signUpModel");

      oModel.setProperty("/signup/confirm_password", value);
    },

    onSignUp: function () {
      var oModel = this.getView().getModel("signUpModel");
      var data = oModel.getProperty("/signup");


      // Reset errors
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

      if (!data.full_name) {
        data.full_nameError = true;
        data.full_nameErrorText = "Enter your full name";
        bError = true;
      }

      if (!data.email) {
        data.emailError = true;
        data.emailErrorText = "Enter a valid email";
        bError = true;
      }

      if (!data.phone_number) {
        data.phoneError = true;
        data.phoneErrorText = "Enter your phone number";
        bError = true;
      }

      if (!data.password_pwd) {
        data.passwordError = true;
        data.passwordErrorText = "Enter a password";
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
        MessageBox.error("Please correct the highlighted fields.");
        return;
      }
  this.fetchSignUp();
    },
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
       role_user:signupData.role_user
    };

    let URL = AppConstants.URL.endpoint + AppConstants.URL.Signup;


    let response = await BaseApi.restMethodpost(URL, request);

    this.getView().setBusy(false);

    if (response) {
      MessageToast.show("Signup Successful!");
      setTimeout(() => {
           // MessageToast.show("Login Successful!");
           // this.byId("email").setBusy(false);
           this.getView().setBusy(false);
          }, 2000);
      this.getOwnerComponent().getRouter().navTo("login");
    }
  } catch (error) {
    this.getView().setBusy(false);
    console.error("Error in fetchSignUp: ", error);
    MessageToast.show("Something went wrong during signup.");
  }
}

  });
});
