sap.ui.define([], function(coreLibrary) {
    "use strict";

    return {
        restMethodpost: async function (URL, request) {
            try {
                // const username = "babin";
                // const password = "babin@2003";
                // const base64Credentials = btoa(username + ":" + password); 
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                        
                    },
                    body: JSON.stringify(request)
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                return data;

            } catch (error) {
                console.error("Error in restMethodpost: ", error);
            }
        }

    }});

    