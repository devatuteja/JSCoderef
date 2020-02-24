function ShowHide(executionContext)
{
var formContext = executionContext.getFormContext();
var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
if(OpportunityType == "100000000")
{
var PLI = formContext.ui.tabs.get("Product_Line_Items");
PLI.setVisible(false);
var Quotes = formContext.ui.tabs.get("QUOTES");
Quotes.setVisible(false);
var AgrrementandSLA = formContext.ui.tabs.get("tab_5");
AgrrementandSLA.setVisible(true);
formContext.getControl("new_quotationaccepted").setVisible(false);
formContext.getControl("new_officialletterreceived").setVisible(false);
formContext.getControl("new_acceptancelettersent").setVisible(true);
formContext.getControl("new_acceptanceletteraccepted").setVisible(true);
}
else if(OpportunityType == "100000003")
{
var PLI = formContext.ui.tabs.get("Product_Line_Items");
PLI.setVisible(false);
var Quotes = formContext.ui.tabs.get("QUOTES");
Quotes.setVisible(false);
var AgrrementandSLA = formContext.ui.tabs.get("tab_5");
AgrrementandSLA.setVisible(false);
formContext.getControl("new_quotationaccepted").setVisible(false);
formContext.getControl("new_officialletterreceived").setVisible(false);
formContext.getControl("new_acceptancelettersent").setVisible(true);
formContext.getControl("new_acceptanceletteraccepted").setVisible(true);
}
else if(OpportunityType == "100000002")
{
var PLI = formContext.ui.tabs.get("Product_Line_Items");
PLI.setVisible(true);
var Quotes = formContext.ui.tabs.get("QUOTES");
Quotes.setVisible(true);
var AgrrementandSLA = formContext.ui.tabs.get("tab_5");
AgrrementandSLA.setVisible(false);
formContext.getControl("new_quotationaccepted").setVisible(true);
formContext.getControl("new_officialletterreceived").setVisible(true);
}
}

function SFA(executionContext)
{
	var formContext = executionContext.getFormContext();
	var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
	var AggrementDuration = formContext.getAttribute("new_agreementdurationmonths").getValue();
	var SLAReponseTime1 = formContext.getAttribute("new_sla1responsetime").getValue();
	var SLAResolutiontime1 = formContext.getAttribute("new_sla1resolutiontime").getValue();
	var SLAReponseTime2 = formContext.getAttribute("new_sla2responsetime").getValue();
	var SLAResolutiontime2 = formContext.getAttribute("new_sla2resolutiontime").getValue();
	var SLAReponseTime3 = formContext.getAttribute("new_sla3responsetime").getValue();
	var SLAResolutiontime3 = formContext.getAttribute("new_sla3resolutiontime").getValue();
	
if(OpportunityType == "100000000")
	{
       if (AggrementDuration == null && SLAReponseTime1== null && SLAResolutiontime1 == null && SLAReponseTime2 == null && SLAResolutiontime2 == null && SLAReponseTime3 == null && SLAResolutiontime3 == null)
       {
       	var alertStrings = { text: "Please Enter Agreement and SLA Details" };
							var alertOptions = { height: 200, width: 500 };
							Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  ); 
				     		executionContext.getEventArgs().preventDefault(); 

		}
			else
				{		
					var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

					    for(var i=0; i<Role.length;i++)
					    {
					        
					        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
					        function success(result) 
					        {
					            
					            if(result.name != null )
					            {
					                if(result.name == "SR" || result.name == "RM")
					                    {
					                    	var formContext = executionContext.getFormContext();
										  var confirmStrings = { text:"Do you want to Send For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
										  var confirmOptions = { height: 200, width: 500}; 
										  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
										    function (success) {    
										    if (success.confirmed)
										    {					    
					
					                    	formContext.getAttribute("new_sendforapproval").setValue(true);
					                        formContext.data.entity.save();

										    }
										    else 
										    {
										    formContext.getAttribute("new_sendforapproval").setValue(false);
										    formContext.data.entity.save(); 
										     }          
										    });




					                    }
					            }
					        },
					        function error(error) {
					        // Show error
					        Xrm.Navigation.openAlertDialog(error.message, null);
					        });         
					        
					    }

		  	}
		}
		else if (OpportunityType == "100000002")
			{

			var gridContext = formContext.getControl("quote");
			var Quote = gridContext.getGrid("quote").getTotalRecordCount();
            if (Quote > 0 )
            {
			var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

					    for(var i=0; i<Role.length;i++)
					    {
					        
					        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
					        function success(result) 
					        {
					            
					            if(result.name != null )
					            {
					                if(result.name == "SR" || result.name == "RM")
					                    {
					                    	var formContext = executionContext.getFormContext();
										  var confirmStrings = { text:"Do you want to Send For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
										  var confirmOptions = { height: 200, width: 500}; 
										  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
										    function (success) {    
										    if (success.confirmed)
										    {					    
					
					                    	formContext.getAttribute("new_sendforapproval").setValue(true);
					                        formContext.data.entity.save();

										    }
										    else 
										    {
										    formContext.getAttribute("new_sendforapproval").setValue(false);
										    formContext.data.entity.save(); 
										     }          
										    });


					                    }
					            }
					        },
					        function error(error) {
					        // Show error
					        Xrm.Navigation.openAlertDialog(error.message, null);
					        });         
					        
					    
					}
			}
			else
			{
				var alertStrings = { text: "Please Add Quotes" };
							var alertOptions = { height: 200, width: 500 };
							Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  ); 
				     		executionContext.getEventArgs().preventDefault(); 

			}

	}
	else if (OpportunityType == "100000003")
	{
		var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

					    for(var i=0; i<Role.length;i++)
					    {
					        
					        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
					        function success(result) 
					        {
					            
					            if(result.name != null )
					            {
					                if(result.name == "SR" || result.name == "RM")
					                    {
					                    	var formContext = executionContext.getFormContext();
										  var confirmStrings = { text:"Do you want to Send For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
										  var confirmOptions = { height: 200, width: 500}; 
										  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
										    function (success) {    
										    if (success.confirmed)
										    {					    
					
					                    	formContext.getAttribute("new_sendforapproval").setValue(true);
					                        formContext.data.entity.save();

										    }
										    else 
										    {
										    formContext.getAttribute("new_sendforapproval").setValue(false);
										    formContext.data.entity.save(); 
										     }          
										    });




					                    }
					            }
					        },
					        function error(error) {
					        // Show error
					        Xrm.Navigation.openAlertDialog(error.message, null);
					        });         
					        
					    }
	}
	ShowHide(); //edited on 24/10
}
function Approve(executionContext)
{
		var formContext = executionContext.getFormContext();
		var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
		var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

    for(var i=0; i<Role.length;i++)
    {
        
        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
        function success(result) 
        {
        	if(OpportunityType == "100000000" || OpportunityType == "100000003" )
        	{
            
           	 if(result.name != null )
            	{
                if(result.name == "SR" || result.name == "RM")
                    {
                    var formContext = executionContext.getFormContext();
					  var confirmStrings = { text:"Do you want to Approve", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
					  var confirmOptions = { height: 200, width: 500}; 
					  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
					    function (success) {    
					    if (success.confirmed)
					    {					    
                    	
                    	formContext.getAttribute("new_approved").setValue(true);
                        formContext.data.entity.save();
					    }
					    else 
					    {
					    formContext.getAttribute("new_approved").setValue(false);
					    formContext.data.entity.save(); 
					     }          
					    });


                    }
            	}
       	 	}	
       		 else if(OpportunityType == "100000002")
       	 		{
       	 			if(result.name != null )
            			{
                		if(result.name == "SR" || result.name == "RM")
                  		  {
                  		  	var formContext = executionContext.getFormContext();
						  var confirmStrings = { text:"Do you want to Approve", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
						  var confirmOptions = { height: 200, width: 500}; 
						  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
						    function (success) {    
						    if (success.confirmed)
						    {					    
	   
	                  	  	formContext.getAttribute("new_approvedforcommercial").setValue(true);
	                        formContext.data.entity.save();

						    }
						    else 
						    {
						    formContext.getAttribute("new_approvedforcommercial").setValue(false);
						    formContext.data.entity.save(); 
						     }          
						    });


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
		var formContext = executionContext.getFormContext();
		var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
		var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

    for(var i=0; i<Role.length;i++)
    {
        
        Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
        function success(result) 
        {
        	if(OpportunityType == "100000000" || OpportunityType == "100000003" )
        	{
            
           	 if(result.name != null )
            	{
                if(result.name == "SR" || result.name == "RM")
                    {
                      var formContext = executionContext.getFormContext();
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
					    {
					    formContext.getAttribute("new_disapproved").setValue(false);
					    formContext.data.entity.save(); 
					     }          
					    });

                    }
            	}
       	 	}	
       		 else if(OpportunityType == "100000002")
       	 		{
       	 			if(result.name != null )
            			{
                		if(result.name == "SR" || result.name == "RM")
                  		  {
                  		  var formContext = executionContext.getFormContext();
						  var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
						  var confirmOptions = { height: 200, width: 500}; 
						  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
						    function (success) {    
						    if (success.confirmed)
						    {					    
		                    formContext.getAttribute("new_disapprovedforcommercial").setValue(true);
	                        formContext.data.entity.save();
						    }
						    else 
						    {
						    formContext.getAttribute("new_disapprovedforcommercial").setValue(false);
						    formContext.data.entity.save(); 
						     }          
						    });

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
function CheckInventory(executionContext)
{
	var formContext = executionContext.getFormContext();
	var Account = formContext.getAttribute("parentaccountid").getValue();
	if(Account == null)
	{
		var alertStrings = { text: "Please attach the Account before checking the Inventory" };
							var alertOptions = { height: 200, width: 500 };
							Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  ); 
				     		executionContext.getEventArgs().preventDefault(); 

	}
	else
	{
	formContext.data.entity.save(); 
	}
}