//how to setup a lookup field.
var lookup = new Object();
            var lookupValue = new Array();
            lookup.id = Result.new_TerritoryId.Id;
            lookup.entityType = "new_territory";
            lookup.name = Result.new_TerritoryId.Name;
            lookupValue[0] = lookup;
            Xrm.Page.getAttribute("new_territorycode").setValue(lookupValue);
