	function SFA(executionContext)
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
	                if(result.name == "MPM ")

						{
							var confirmStrings = { text:"Do you want to Send for For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
	                        var confirmOptions = { height: 200, width: 500}; 
	                        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
	                        function (success) {    
	                        if (success.confirmed)
	                         {
	                         formContext.getAttribute("new_sendforapproval").setValue(true);
							formContext.data.entity.save(); 
	                         }
	                        else 
	                      		formContext.getAttribute("new_sendforapproval").setValue(false);
	                        
	                        });
	                         formContext.data.entity.save();
						
						}
						else 
						{
						formContext.getAttribute("new_sendforapproval").setValue(false);
						executionContext.getEventArgs().preventDefault(); 
						}
					}
				},

			        function error(error) {
			        // Show error
			        Xrm.Navigation.openAlertDialog(error.message, null);
			        });         
			        
			}

	}
	

function Approve(executionContext)
{
debugger;
var formContext = executionContext.getFormContext();
var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;
var campApprovedLM = formContext.getAttribute("new_campaignapproved").getValue();
var campApprovedCEO = formContext.getAttribute("new_campaignapprovedby").getValue();

    for(var i=0; i<Role.length;i++)
    {
        
        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
        function success(result) 
        {
            
          if(result.name != null )
            {
                if(result.name == "COO" || result.name == "CEO")
                    {
                        if(campApprovedCEO == 0)
                         {
                            var confirmStrings = { text:"Do you want to Approve", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                            var confirmOptions = { height: 200, width: 500}; 
                            Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                            function (success) 
                            {    
                            if (success.confirmed)
                            {
                            formContext.getAttribute("new_approvedbyceocoo").setValue(true);
                            formContext.data.entity.save();
                            }
                            else 
                             formContext.getAttribute("new_approvedbyceocoo").setValue(false);
                             });
                            formContext.data.entity.save();                             
                           }
                        else
                         {
                            var alertStrings = { text:"Campaign Already Approved"};
                            var alertOptions = { height:200 , width:500};
                            Xrm.Navigation.openAlertDialog(alertStrings,alertOptions).then( function () { }  );
                          } 
                     }
                else if(result.name == "LM" )
                    {
                        if(campApprovedLM == 0)
                         {
                            var confirmStrings = { text:"Do you want to Approve", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                            var confirmOptions = { height: 200, width: 500}; 
                            Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                            function (success) {    
                            if (success.confirmed)
                             {
                               formContext.getAttribute("new_approve").setValue(true);
                               formContext.data.entity.save();
                              }
                            else 
                               formContext.getAttribute("new_approve").setValue(false);
                             });
                            formContext.data.entity.save();
                           }
                        else
                         {
                            var alertStrings = { text:"Campaign Already Approved"};
                            var alertOptions = { height:200 , width:500};
                           Xrm.Navigation.openAlertDialog(alertStrings,alertOptions).then( function () { }  );
                           }                           
                      }
            }
            
        },
        function error(error) {
        // Show error
        Xrm.Navigation.openAlertDialog(error.message, null);
        });         
        
    }
}


function DisApprove(executionContext)
{
debugger;
var formContext = executionContext.getFormContext();
var LMRemarks =  formContext.getAttribute("new_lmremarks").getValue();
var CEOCOORemarks=  formContext.getAttribute("new_ceocooremarks").getValue();
var Role =  Xrm.Utility.getGlobalContext().userSettings.securityRoles;
var campDisApprovedLM = formContext.getAttribute("new_campaigndisapproved").getValue();
var campDisApprovedCEO = formContext.getAttribute("new_campaigndisapprovedbyceocoo").getValue();

    for(var i=0; i<Role.length;i++)
    {
        
        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
        function success(result) 
        {
            
            if(result.name != null )
            {
                if(result.name == "LM")
                    {
                       if(campDisApprovedLM == 0)
                         {
                            if(LMRemarks != null)
                             {
                                var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                                var confirmOptions = { height: 200, width: 500}; 
                                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                                function (success) {    
                                if (success.confirmed)
                                 {
                                   formContext.getAttribute("new_disapproved").setValue(true);
                                   formContext.data.entity.save();
                                  }
                                else 
                                  formContext.getAttribute("new_disapproved").setValue(false);
                                });
                                formContext.data.entity.save();                                       
                              }
                            else
                             {  
                                var alertStrings = { text: "Please Enter Disapproval Remarks" };
                                var alertOptions = { height: 200, width: 500 };
                                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );  
                                executionContext.getEventArgs().preventDefault(); 
                              }
                          }
                        else
                         {
                            var alertStrings = { text:"Campaign Already Disapproved"};
                            var alertOptions = { height:200 , width:500};
                           Xrm.Navigation.openAlertDialog(alertStrings,alertOptions).then( function () { }  );
                           }
                     }
                    else if(result.name == "COO" || result.name == "CEO")
                      {
                            if (campDisApprovedCEO == 0)
                             {
                                if(CEOCOORemarks != null)
                                 {
                                    var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
                                    var confirmOptions = { height: 200, width: 500}; 
                                    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
                                    function (success) {    
                                    if (success.confirmed)
                                    {
                                     formContext.getAttribute("new_disapprovedbycooceo").setValue(true);
                                     formContext.data.entity.save();
                                    }
                                    else 
                                     formContext.getAttribute("new_disapprovedbycooceo").setValue(false);
                                    });
                                    formContext.data.entity.save();
                                 }
                                 else
                                  {  
                                    var alertStrings = { text: "Please Enter Disapproval Remarks" };
                                    var alertOptions = { height: 200, width: 500 };
                                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );  
                                    executionContext.getEventArgs().preventDefault();
                                   }
                              }
                             else
                              {
                                var alertStrings = { text:"Campaign Already Disapproved"};
                                var alertOptions = { height:200 , width:500};
                                 Xrm.Navigation.openAlertDialog(alertStrings,alertOptions).then( function () { }  );                               
                              }
                       }
            }
            
        },
        function error(error) {
        // Show error
        Xrm.Navigation.openAlertDialog(error.message, null);
        });         
    }
}
