function Displayfieldsandsetmandatory(executionContext)
{
debugger;
var formContext = executionContext.getFormContext();
if(formContext.getAttribute("new_leadtype") != null )
    {
    var LeadType=formContext.getAttribute("new_leadtype").getValue();
    if (LeadType == "100000000")//Retail
        {
            formContext.getControl("new_producttype").setVisible(true);
            formContext.getAttribute("new_producttype").setRequiredLevel("required");
        
            formContext.getControl("new_interviewdone").setVisible(true);
            formContext.getAttribute("new_interviewdone").setRequiredLevel("required");
        }
        else if(LeadType == "100000003")//Distributor
        {
            formContext.getControl("new_producttype").setVisible(true);
            formContext.getAttribute("new_producttype").setRequiredLevel("required");
        
            formContext.getControl("new_interviewdone").setVisible(true);
            formContext.getAttribute("new_interviewdone").setRequiredLevel("required");

            formContext.getControl("new_tenderprocessdone").setVisible(true);
            formContext.getAttribute("new_tenderprocessdone").setRequiredLevel("required");
        
        }
        else if(LeadType == "100000001")//tenant
        {
            formContext.getControl("new_producttype").setVisible(false);
            formContext.getAttribute("new_producttype").setRequiredLevel("none");
                        
            formContext.getControl("new_interviewdone").setVisible(true);
            formContext.getAttribute("new_interviewdone").setRequiredLevel("required");

            formContext.getControl("new_tenderprocessdone").setVisible(true);
            formContext.getAttribute("new_tenderprocessdone").setRequiredLevel("required");
        }
            
            else if(LeadType == "100000002")//Commercial
        {
            formContext.getControl("new_producttype").setVisible(false);
            formContext.getAttribute("new_producttype").setRequiredLevel("none");
                        
            formContext.getControl("new_interviewdone").setVisible(false);
            formContext.getAttribute("new_interviewdone").setRequiredLevel("none");

            formContext.getControl("new_tenderprocessdone").setVisible(false);
            formContext.getAttribute("new_tenderprocessdone").setRequiredLevel("none");
        }   
    }
}
function onchangeofLeadStatus(executionContext)
{
debugger;
var formContext = executionContext.getFormContext();
if(formContext.getAttribute("statuscode") != null )
    {
        var LeadStatus = formContext.getAttribute("statuscode").getValue();
        if(LeadStatus == "100000003")
        {
            formContext.getControl("new_interviewdone").setVisible(true);
            formContext.getAttribute("new_interviewdone").setRequiredLevel("required");
        }
        else if(LeadStatus != "100000003")
        {
            formContext.getControl("new_interviewdone").setVisible(false);
            formContext.getAttribute("new_interviewdone").setRequiredLevel("none");

        }
    }
}
function Approve(executionContext)
{
debugger;
var formContext = executionContext.getFormContext();
var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

    for(var i=0; i<Role.length;i++)
    {
        
        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
        function success(result) 
        {
            
            if(result.name != null )
            {
                if(result.name == "CEM")
                    {
                        var formContext = executionContext.getFormContext();
                        formContext.getAttribute("new_technicalfeasibilityapprovalremarks").setRequiredLevel("required");
                        var TFAR = formContext.getAttribute("new_technicalfeasibilityapprovalremarks").getValue();
                        
                        if(TFAR != "" && TFAR != null)
                            {
                            var LeadStatus = formContext.getAttribute("statuscode").getValue();
                            if(LeadStatus == "100000001" )
                            {
                                
                                var confirmStrings = { text:"Do you want to Approve", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                                var confirmOptions = { height: 200, width: 500}; 
                                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                                function (success) {    
                                if (success.confirmed)
                                {
                                formContext.getAttribute("new_technicalfeasibilityapproved").setValue(true);
                                formContext.data.entity.save();
                                }
                                else 
                                formContext.getAttribute("new_technicalfeasibilityapproved").setValue(false);
                                });
                                formContext.data.entity.save();                             
                            }
                            
                            }
                            else
                            {
                            var alertStrings = { text: "Please Enter Technical Feasibility Approval Remarks" };
                            var alertOptions = { height: 200, width: 500 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  ); 
                            executionContext.getEventArgs().preventDefault(); 
                            }
                        }
                        else if(result.name != "CEM")
                        {
                             var formContext = executionContext.getFormContext();
                            formContext.getAttribute("new_technicalfeasibilityapprovalremarks").setRequiredLevel("none");
                        }
                       if(result.name == "SR" || result.name == "RTM")
                        {
                        var formContext = executionContext.getFormContext();
                        formContext.getAttribute("new_commercialfeasibilityapprovalremarks").setRequiredLevel("required");
                        var CFAR = formContext.getAttribute("new_commercialfeasibilityapprovalremarks").getValue();
                        if(CFAR != "" && CFAR != null)
                            {
                            var LeadStatus = formContext.getAttribute("statuscode").getValue();
                            if (LeadStatus == "100000002")
                            {
                                
                                var confirmStrings = { text:"Do you want to Approve", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                                var confirmOptions = { height: 200, width: 500}; 
                                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                                function (success) {    
                                if (success.confirmed)
                                {
                                formContext.getAttribute("new_commercialfeasibilityapproved").setValue(true);
                                formContext.data.entity.save();
                                }
                                else 
                                formContext.getAttribute("new_commercialfeasibilityapproved").setValue(false);
                                });
                                 formContext.data.entity.save();

                            }
                          
                            }
                            else
                            {
                            var alertStrings = { text: "Please Enter Commercial Feasibility Approval Remarks" };
                            var alertOptions = { height: 200, width: 500 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );    
                            executionContext.getEventArgs().preventDefault(); 
                        
                            }
                        }
                        else if(result.name != "SR" && result.name != "RTM"  )
                        {
                        var formContext = executionContext.getFormContext();
                        formContext.getAttribute("new_commercialfeasibilityapprovalremarks").setRequiredLevel("none");
                        }
            }
            
        },
        function error(error) {
        // Show error
        Xrm.Navigation.openAlertDialog(error.message, null);
        });         
        
    }
}

function Disapprove(executionContext)
{
debugger;
var formContext = executionContext.getFormContext();
var Role =  Xrm.Utility.getGlobalContext().userSettings.securityRoles;

    for(var i=0; i<Role.length;i++)
    {
        
        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
        function success(result) 
        {
            
            if(result.name != null )
            {
                if(result.name == "CEM")
                    {
                        var formContext = executionContext.getFormContext();
                        formContext.getAttribute("new_technicalfeasibilitydisapprovalremarks").setRequiredLevel("required");
                        var TFAR = formContext.getAttribute("new_technicalfeasibilitydisapprovalremarks").getValue();
                        if(TFAR != "" && TFAR != null)
                            {
                                var LeadStatus = formContext.getAttribute("statuscode").getValue();
                                if(LeadStatus == "100000001" )
                                {
                                
                                var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                                var confirmOptions = { height: 200, width: 500}; 
                                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                                function (success) {    
                                if (success.confirmed)
                                 {
                                 formContext.getAttribute("new_technicalfeasibilitydisapproved").setValue(true);
                                 formContext.data.entity.save();
                                 }
                                else 
                                formContext.getAttribute("new_technicalfeasibilitydisapproved").setValue(false);
                                });
                                 formContext.data.entity.save();
                                    
                                }
                                                                                
                            }
                            else
                            {  
                            var alertStrings = { text: "Please Enter Technical Feasibility Disapproval Remarks" };
                            var alertOptions = { height: 200, width: 500 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );  
                            executionContext.getEventArgs().preventDefault(); 
                                
                            }
                        }
                        else if(result.name != "CEM")
                        {
                            var formContext = executionContext.getFormContext();
                            formContext.getAttribute("new_technicalfeasibilitydisapprovalremarks").setRequiredLevel("none");
                        }
                        if(result.name == "SR" || result.name == "RTM")
                        {
                         var formContext = executionContext.getFormContext();
                         formContext.getAttribute("new_commercialfeasibilitydisapprovalremarks").setRequiredLevel("required");
                         var CFAR = formContext.getAttribute("new_commercialfeasibilitydisapprovalremarks").getValue(); 
                        if(CFAR != "" && CFAR != null)
                            {
                            if (LeadStatus == "100000002")
                            {
                        
                            var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                            var confirmOptions = { height: 200, width: 500}; 
                            Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                            function (success) {    
                                if (success.confirmed)
                                {
                                formContext.getAttribute("new_commercialfeasibilitydisapproved").setValue(true);
                                formContext.data.entity.save();
                                }
                                else 
                                formContext.getAttribute("new_commercialfeasibilitydisapproved").setValue(false);
                                });
                               formContext.data.entity.save();

                            }
                           
                            }
                            else
                            {
                            var alertStrings = { text: "Please Enter Commercial Feasibility Disapproval Remarks" };
                            var alertOptions = { height: 200, width: 500 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );
                            executionContext.getEventArgs().preventDefault(); 
                            formContext.getAttribute("new_commercialfeasibilitydisapproved").setValue(false);
                            }
                        
                        }
                        else if(result.name != "SR" && result.name != "RTM"  )
                            {
                            var formContext = executionContext.getFormContext();
                            formContext.getAttribute("new_commercialfeasibilitydisapprovalremarks").setRequiredLevel("none");
                            formContext.data.entity.save();
                            }
            }
            
        },
        function error(error) {
        // Show error
        Xrm.Navigation.openAlertDialog(error.message, null);
        });         
        
    }
}
function SFTA(executionContext)
{
    debugger;
  var formContext = executionContext.getFormContext();
  var confirmStrings = { text:"Do you want to Send for technical feasibility Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
  var confirmOptions = { height: 200, width: 500}; 
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
    function (success) {    
    if (success.confirmed)
    {
    formContext.getAttribute("new_sendfortechnicalapproval").setValue(true);
    formContext.data.entity.save();
    }
    else 
    formContext.getAttribute("new_sendfortechnicalapproval").setValue(false);
                  
    });
  }

function SFCA(executionContext)
{
    debugger;
  var formContext = executionContext.getFormContext();
  var confirmStrings = { text:"Do you want to Send for Commercial Feasibility Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
  var confirmOptions = { height: 200, width: 500}; 
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
    function (success) {    
    if (success.confirmed)
    {
        formContext.getAttribute("new_sendforcommercialapproval").setValue(true);
        formContext.data.entity.save();
    }     
    else 
        formContext.getAttribute("new_sendforcommercialapproval").setValue(false);
                
    });

}

function SHOWHideSCA(executionContext)
{
    var formContext = executionContext;
    var LeadStatus = formContext.getAttribute("statuscode").getValue();
    if(LeadStatus == "100000003" || LeadStatus == "100000006")
    {
        return true;
    }
    else
    {
        return false;
    }
    
}
function SHOWHideSTA(executionContext)
{
    var formContext = executionContext;
    var LeadStatus = formContext.getAttribute("statuscode").getValue();
    if(LeadStatus == "100000005" || LeadStatus == "1" )
    {
        return true;
    }
    else
    {
        return false;
    }
    
}

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

