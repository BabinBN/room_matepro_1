sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("roommatepro.controller.sign_up", {
    onInit: function () {
      var oModel = new sap.ui.model.json.JSONModel({
        signup: {
          full_name: "",
          email: "",
          phone_number: "",
          password_pwd: "",
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

      // All validations passed
      MessageToast.show("Sign Up Successful!");
      // Here you can send data to backend if needed
    }
  });
});
