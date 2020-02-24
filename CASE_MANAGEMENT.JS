function Approve(formContext)
{
  debugger;
  var confirmStrings = {text : "Do you really wish to continue?", title : "Confirmation Dialog"};
  var confirmOptions = {height:200, width:450};
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function(success){
      if (success.confirmed) {
        formContext.getAttribute("new_approve").setValue(true);
        formContext.data.entity.save();
        console.log("forwarding for approval..");
      }
      else{
        console.log("request cancelled..");
      }
    });
}




function Disapprove(){
	alert("this is disapprove button");
}

function Assign_To_SP(formContext){
  debugger;
  var confirmStrings = {text: "Do you wish to continue?", title: "Confirmation Dialog"};
  var confirmOptions = {height:200,width:450};
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function(success){
      if (success.confirmed) {
        formContext.getAttribute("new_assigntosp").setValue(true);
        formContext.data.entity.save();

      }
    });
}





/* doing the same operation via c#

function Assign_To_SP(formContext){
	debugger;
  var confirmStrings = {text: "Do you wish to continue?", title: "Confirmation Dialog"};
  var confirmOptions = {height:200,width:450};
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function(success){
      if(success.confirmed)
      {
        formContext.getAttribute("new_assigntosp").setValue(true);
        formContext.data.entity.save();
        Xrm.WebApi.retrieveRecord("entitlement", id, "?$select=new_serviceprovider").then(
        {
          function success(result){
            var serviceprovider = result.new_serviceprovider
          }
        }

          );

        console.log("forwarding for approval..");
      }
      else{
        console.log("request cancelled..");
      }
    }
    );

  }
*/
/*
function record_retrieve(formContext){
  debugger;
  Xrm.WebApi.retrieveRecord("entitlement", id, "?$select=new_serviceprovider").then(
  {
    function success(result){
      var serviceprovider = result.new_serviceprovider
    }
});
}*/










function Send_For_Special_Approval(formContext){
	debugger;
  var confirmStrings = {text : "Do you really wish to continue?", title: "Confirmation Dialog"};
  var confirmOptions = {height:200, width:450};
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function(success){
      if(success.confirmed){
        console.log("forwarding for approval");

      }
      else{
        console.log("request cancelled");
      }
    }

    );
}
  /*
   var confirmStrings = { text : "Do you really wish to send this for Special Approval.?", title:"Confirmation Dialog"};
   var confirmOptions = { height : 200, width:450};
   Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
   	function(success){
   		if (success.confirmed) {
   	formContext.getAttribute("statuscode").setValue(100000000);
	formContext.data.entity.save();
	formContext.getAttribute("new_sentforrmapproval").setValue(true);
	formContext.data.entity.save();
   		}
   		else{
   			alert("Request Cancelled.")

   		}
   	});
    */
    /*var lookup = new Object();
            var lookupValue = new Array();
            lookup.id = Result.new_TerritoryId.Id;
            lookup.entityType = "new_territory";
            lookup.name = Result.new_TerritoryId.Name;
            lookupValue[0] = lookup;
            Xrm.Page.getAttribute("new_territorycode").setValue(lookupValue);
*/
/*
var lookup = new Object();
var lookupValue = new Array();
lookup.id = "8841974b-6042-ea11-9114-00155d0a0438";
lookup.entityType= "new_pendingat";
lookup.name = "Devashish Tuteja"
lookupValue[0] = lookup;
Xrm.Page.getAttribute("new_pendingat").setValue(lookupValue);
*/



function send_for_approval(formContext){
	
alert("this is send for approval");
}


function Send_For_Feedback(formContext){
  var confirmStrings = {text : "Do you wish to send this for Feedback?", title: "Confirmation Dialog"};
  var confirmOptions = {height:200, width:450};
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function(success){
      if(success.confirmed){
        formContext.getAttribute("new_sentforfeedback").setValue(true);
        formContext.data.entity.save();
      }
      else{
        console.log("Request Cancelled..");

      }
    });
	
}


function Send_For_SpareParts_Approval(formContext){
  debugger;
  var confirmStrings = { text : "Do you really wish to send this for Spare Parts Approval?", title:"Confirmation Dialog"};
  var confirmOptions = { height : 200, width :450};
  Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function(success){
      if (success.confirmed){
        formContext.getAttribute("statuscode").setValue(100000001);
        formContext.getAttribute("new_sentforsparepartsapproval").setValue(true);
        formContext.data.entity.save();
      }
      else{
        console.log("request Cancelled");
      }


    });
}

function special_approval_status(formContext){
  debugger;
  var stat = formContext.getAttribute("statuscode").getValue();
  if (stat  == 100000000){
    return false
  }
  else{
    return true
  }

}
function spare_parts_approval_fieldvisible(formContext){
  debugger;
  var stat =formContext.getAttribute("statuscode").getValue();
  if(stat == 100000001 ){
    return false;

  }
  else{
    return true;

  }
}


//this is the dialog box.
/*
function approve_special_confirmationbox(formContext){

var confirmStrings = { text:"Do you really want to continue?", title:"Confirmation Dialog" };
var confirmOptions = { height: 200, width: 450 };
Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
function (success) {    
    if (success.confirmed)
        console.log("Dialog closed using OK button.");
    else
        console.log("Dialog closed using Cancel button or X.");
});
}
*/
