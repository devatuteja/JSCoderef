//this variable stores if async operation was already completed
    var isAsyncOperationCompleted = false;
    //this variable stores the result - if button enabled or not
    var isButtonEnabled = false;
function SHOWHideAD(formContext) {
    debugger;    
    var TFDA = formContext.getAttribute("new_technicalfeasibilitydone").getValue();
    var CFDA = formContext.getAttribute("new_commercialfeasibilitydone").getValue();
    var TFDD = formContext.getAttribute("new_technicalfeasibilitydonedisapproved").getValue();
    var CFDD = formContext.getAttribute("new_commercialfeasibilitydonedisapproved").getValue();
        //If async operation was already completed I just return the result of it
    if (isAsyncOperationCompleted) {
        return isButtonEnabled;
    }

    //getting of userid from the context
    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace("{", "").replace("}", "");

    //fetching user by id and expanding roles to get role names

    Xrm.WebApi.retrieveRecord("systemuser", userId, "?$expand=systemuserroles_association($select=name)").then(
        function success(result) {
            //Async operation was completed successfully
            isAsyncOperationCompleted = true;

            //looping through all the roles available for user
            for (var i = 0; i < result.systemuserroles_association.length; i++) {
                //getting current role name
                var roleName = result.systemuserroles_association[i]["name"];

                //if role name is equal to "System Administrator" - setting variable to true
                if (roleName === "CEM") {

                    isButtonEnabled = true;                    
                }
                
            }

            //so if role is there - just refresh the ribbon to see the button
            if (isButtonEnabled) {
                formContext.ui.refreshRibbon();
            }
        },
        function (error) {
            //if something went wrong during the data retrieval
            //operation is marked as completed and error message is shown
            isAsyncOperationCompleted = true;
            Xrm.Navigation.openAlertDialog({ text: error.message });
        }
    );

   return false;

}

