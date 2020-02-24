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
var sendForApproval = formContext.getAttribute("new_opportunitysendforapproval").getValue();  //added by Swapnil on 8/11/2019
if(sendForApproval == 1)
 {
	 TabEnableDisable(executionContext);
	}
}

function TabEnableDisable(executionContext)						//added by Swapnil on 8/11/2019
 {
   var formContext = executionContext.getFormContext();
   var Tab = formContext.ui.tabs.get("Summary");
   	if(Tab == null)
   	 {
   	   var alertStrings = { text : "Tab : "+tab.getName()+" is not on the form" };
   	   var alertOptions = { height: 200, width: 500 };
   	   Xrm.Navigation.openAlertDialog(alertStrings,alertOptions).then( function() { });
   	  }
  	else
  	 {
  	   var TabSections = Tab.sections.get();
  	   for(var i in TabSections)
  	    {
  	      var SECNAME = TabSections[i].getName();
  	      var TABNAME = Tab.getName();
  	      DisableSection(executionContext,TABNAME,SECNAME,true);
  	     }
  	  }
  }
function DisableSection(executionContext,tabName,sectionName,status)    //added by Swapnil on 8/11/2019
 {
   debugger;
   var formContext = executionContext.getFormContext();
    if(formContext.ui.tabs.get(tabName).sections.get(sectionName) != null)
     {
       var Controls = formContext.ui.tabs.get(tabName).sections.get(sectionName).controls.get();
       var numberOfControls = Controls.length;
       var CA = formContext.ui.tabs.get("Remarks").sections.get("tab_8_section_2"); //added by aditya sir,edited by Swapnil on 5/11/2019
       CA.setVisible(false); //added by aditya sir,edited by Swapnil on 5/11/2019
			 
			 for(var i=0 ; i<numberOfControls ; i++)
        {
          var fieldName = Controls[i].getName();
          var type = formContext.getControl(fieldName).getControlType();

          if(type != "webresource" && type != "subgrid")
           {
           	 Controls[i].getAttribute().setSubmitMode("always");
           	 Controls[i].setDisabled(status);
           	 Controls[i].getAttribute().setSubmitMode("always");
            }
         }
      }
  }

function SFA(executionContext)
{
	debugger;
	var formContext = executionContext.getFormContext();
	var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
	var AgreementDuration = formContext.getAttribute("new_agreementdurationmonths").getValue();
	var SLAReponseTime1 = formContext.getAttribute("new_sla1responsetime").getValue();
	var SLAResolutiontime1 = formContext.getAttribute("new_sla1resolutiontime").getValue();
	var SLAReponseTime2 = formContext.getAttribute("new_sla2responsetime").getValue();
	var SLAResolutiontime2 = formContext.getAttribute("new_sla2resolutiontime").getValue();
	var SLAReponseTime3 = formContext.getAttribute("new_sla3responsetime").getValue();
	var SLAResolutiontime3 = formContext.getAttribute("new_sla3resolutiontime").getValue();
		
  if(OpportunityType == "100000000")
	 {
     if (AgreementDuration == null || SLAReponseTime1 == null || SLAResolutiontime1 == null || SLAReponseTime2 == null || SLAResolutiontime2 == null || SLAReponseTime3 == null || SLAResolutiontime3 == null)
      {
        var alertStrings = { text: "Please Enter All Agreement and SLA Details" };
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
					       	formContext.getAttribute("new_opportunitysendforapproval").setValue(true); //added by swapnil on 8/11/2019
								  var confirmStrings = { text:"Do you want to Send For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
								  var confirmOptions = { height: 200, width: 500}; 
								  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
							    function (success) {    
								    if (success.confirmed)
						  		   {					    
                    	 formContext.getAttribute("new_sendforapproval").setValue(true);
                    	 TabEnableDisable(executionContext); //added by Swapnil on 8/11/2019
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
					  function error(error) 
					   {
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
					             formContext.getAttribute("new_opportunitysendforapproval").setValue(true); //added by swapnil on 8/11/2019
										   var confirmStrings = { text:"Do you want to Send For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
										   var confirmOptions = { height: 200, width: 500}; 
										   Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
										   function (success) {    
										    if (success.confirmed)
										     {					    
													 formContext.getAttribute("new_sendforapproval").setValue(true);
					                 TabEnableDisable(executionContext); //added by Swapnil on 8/11/2019
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
					           	formContext.getAttribute("new_opportunitysendforapproval").setValue(true); //added by swapnil on 8/11/2019
										  var confirmStrings = { text:"Do you want to Send For Approval", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
										  var confirmOptions = { height: 200, width: 500}; 
										  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
										    function (success) {    
										    if (success.confirmed)
										     {					    
														formContext.getAttribute("new_sendforapproval").setValue(true);
					                 	TabEnableDisable(executionContext); //added by Swapnil on 8/11/2019
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

function Approve(executionContext)
{
		debugger;
		var formContext = executionContext.getFormContext();
		var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
    var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;
		var oppApprovedCM = formContext.getAttribute("new_opportunityapprovedforcommercial").getValue();//added by Swapnil on 04/11/2019
		var oppApprovedCEO = formContext.getAttribute("new_opportunityapproved").getValue();//added by Swapnil on 04/11/2019

    if (oppApprovedCEO == 1 || oppApprovedCM == 1)//added by swapnil on 6/11/2019
     {
     	if(oppApprovedCM == 1) // added by Swapnil on 4/11/2019
 			 {
		   	 var alertStrings = { text :"Already Approved by CM" };
    		 var alertOptions = { height: 200, width: 500 };
    	   Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );
 			  }
	  	if(oppApprovedCEO == 1)//added by Swapnil on 04/11/2019
   	   {
	    	 var alertStrings = { text :"Already Approved by CEO/COO" };
	    	 var alertOptions = { height: 200, width: 500 };
	    	 Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );
   	    }
      }
    else
     {
     	 for(var i=0; i<Role.length;i++)
        {
         Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
         function success(result) 
          {
        	 if(OpportunityType == "100000000" || OpportunityType == "100000003" )
        	  {
             if(result.name != null )
              {
               if(result.name == "CEO" || result.name == "COO")
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
               if(result.name == "CM")
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
 }

function DisApprove(executionContext)
{
		debugger;
		var formContext = executionContext.getFormContext();
		var OpportunityType = formContext.getAttribute("new_opportunitytype").getValue();
		var Role = Xrm.Utility.getGlobalContext().userSettings.securityRoles;
		var oppDisApprovedCM = formContext.getAttribute("new_opportunitydisapprovedforcommercial").getValue(); ////edited by Swapnil on 04/11/2019
		var oppDisApprovedCEO = formContext.getAttribute("new_opportunitydisapproved").getValue(); ////edited by Swapnil on 04/11/2019

    if(oppDisApprovedCEO == 1 || oppDisApprovedCM ==1) //added by swapnil on 06/11/2019
     {
     	 if(oppDisApprovedCM == 1)//added by swapnil on 04/11/2019
       	{
 			    var alertStrings = { text :"Already Disapproved by CM" };
 	    	  var alertOptions = { height: 200, width: 500 };
 	     	  Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );
       	 }
       if(oppDisApprovedCEO == 1) // added by swapnil on 4/11/2019
        {
					var alertStrings = { text :"Already Disapproved by CEO/COO" };
   	      var alertOptions = { height: 200, width: 500 };
   	      Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then( function () { }  );
			   }
      }
    else
     {
     	for(var i=0; i<Role.length;i++)
       {
         Xrm.WebApi.retrieveRecord("roles",Role[i],"?$select=name").then(
         function success(result) 
          {
           if(result.name != null)
        	  {
        	   if(OpportunityType == "100000000" || OpportunityType == "100000003")
            	{
            	 if(result.name == "CEO" || result.name == "COO")
                {
                  var formContext = executionContext.getFormContext();
				  				var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
				  				var confirmOptions = { height: 200, width: 500}; 
			            Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
									function (success) {    
				    			 if (success.confirmed)
				    	  		{					    
      	  		    		formContext.getAttribute("new_disapproved").setValue(true);
        		      		formContext.getAttribute('new_ceocooremarks').setRequiredLevel('required');//added by swapnil on 04/11/2019
        		      		//formContext.data.entity.save(); edited by swapnil on 06/11/2019
				    		     }
				    			 else 
				    				formContext.getAttribute("new_disapproved").setValue(false);
				    			});
				    		 formContext.data.entity.save(); 
                }
            	 }
             else if(OpportunityType == "100000002")
       	 		  {
       	 			 if(result.name == "CM")
                {
                  var formContext = executionContext.getFormContext();
						  	  var confirmStrings = { text:"Do you want to Disapprove", title:"Confirmation", "cancelButtonLabel": "No", confirmButtonLabel: "Yes" }; 
						      var confirmOptions = { height: 200, width: 500}; 
						  	  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then( 
						      function (success) {    
						       if (success.confirmed)
						        {					    
		                  formContext.getAttribute("new_disapprovedforcommercial").setValue(true);
		                  formContext.getAttribute('new_cmremarks').setRequiredLevel('required');//added by swapnil on 04/11/2019
	                    //formContext.data.entity.save(); edited by swapnil on 06/11/2019
						    	 	 }
						       else 
						        formContext.getAttribute("new_disapprovedforcommercial").setValue(false);
						       });
						  	  formContext.data.entity.save(); 
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