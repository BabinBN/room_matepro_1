sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "roommatepro/utils/AppConstants",
    "roommatepro/utils/BaseApi"
  ], function (Controller, MessageToast, JSONModel,AppConstants,BaseApi) {
    "use strict";
  
    return Controller.extend("roommatepro.controller.sign_in", {
      onInit: function () {
        this.initializeValidationModel();
      },
  
      initializeValidationModel: function () {
        var oFormModel = new JSONModel({
          login: {
            email: "",
            emailError: false,
            emailErrorText: "",
            password: "",
            passwordError: false,
            passwordErrorText: ""
          }
        });
        this.getView().setModel(oFormModel, "loginModel");
      },
      onEmailInputLiveChange: function (oEvent) {
        var sValue = oEvent.getParameter("value");
        var oFormModel = this.getView().getModel("loginModel");
        var oData = oFormModel.getData().login;
        oData.email = sValue;
        oData.emailError = false;
        oData.emailErrorText = "";
        oFormModel.refresh(true); // Refresh the model to update the view
      },
      onPasswordInputLiveChange: function (oEvent) {    
        var sValue = oEvent.getParameter("value");
        var oFormModel = this.getView().getModel("loginModel");
        var oData = oFormModel.getData().login;
        oData.password = sValue;
        oData.passwordError = false;
        oData.passwordErrorText = "";
        oFormModel.refresh(true); // Refresh the model to update the view
      },
      onLogin: function () {
        var oFormModel = this.getView().getModel("loginModel");
        var oData = oFormModel.getData().login;
        var isValid = true;
  
        if (!oData.email) {
          oData.emailError = true;
          oData.emailErrorText = "Email is required.";
          isValid = false;
        } else if (!this.isValidEmail(oData.email)) {
          oData.emailError = true;
          oData.emailErrorText = "Invalid email format.";
          isValid = false;
        }
  
       
        if (!oData.password) {
          oData.passwordError = true;
          oData.passwordErrorText = "Password is required.";
          isValid = false;
        } else if (oData.password.length < 3) {
          oData.passwordError = true;
          oData.passwordErrorText = "Password must be at least 6 characters.";
          isValid = false;
        }
  
        oFormModel.refresh(true); 
  
        if (isValid) {
          this.fetchSignIn();

          
        } else {
          MessageToast.show("Please fix the errors.");
        }
      },
      onForgotPassword: function () {
        
        
      },
  
      onSignUp: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("signup");
      },
  
      isValidEmail: function (sEmail) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(sEmail);
      },
      fetchSignIn:async function () {
        try{
          let request = {
            email: this.getView().getModel("loginModel").getData().login.email,
            password_pwd: this.getView().getModel("loginModel").getProperty("/login/password")
          };
            var URL=AppConstants.URL.endpoint+AppConstants.URL.Signin;
            //let req=await BaseApi.restMethodpost(URL,request)
            let response = await BaseApi.restMethodpost(URL, request);

            if(response)
              {
                this.getView().setBusy(true);
        //  this.byId("email").setBusy(true);
          setTimeout(() => {
           // MessageToast.show("Login Successful!");
           // this.byId("email").setBusy(false);
           this.getView().setBusy(false);
          }, 2000);
              MessageToast.show("Login Successful!");
              this.getOwnerComponent().getRouter().navTo("dashboard");
            }
        }
        catch(error)
        {
          console.error("Error in fetchSignIn: ", error);
        }
      }
    });
  });
  