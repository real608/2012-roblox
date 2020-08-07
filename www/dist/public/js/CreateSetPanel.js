var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function chkSelect(ele, maxAllowed)
{
    var aSelected = new Array();
    for (var i = 0; i < ele.options.length; i++)
    {
        if (ele.options[i].selected)
            aSelected.push(ele.options[i].value);
    }
    if (aSelected.length > maxAllowed)
    {
        alert("You may select a maximum of " + maxAllowed + " elements from this list!");
        for (var m = 0; m < ele.length; m++)
        {
            var found = false;
            // Why doesn't index of work?
            for (var k = 0; k < prevSelected.length; k++)
            {
                if (prevSelected[k] == ele[m].value)
                {
                    ele.options[m].selected = true;
                    found = true;
                    break;
                }
            }
            if (!found)
            {
                ele.options[m].selected = false;
            }
        }
    }
    else
    {
        prevSelected = aSelected;
    }
}
function updateSuperSafeNameDisplay()
{
    // Iterate through selections and generate name
    var nameString = "";
    var isFirst = true;

    var adjectiveList = document.getElementById(superSafeAdjectiveListClientId); //$('#' + superSafeAdjectiveListClientId);
    for (var i = 0; i < adjectiveList.options.length; i++)
    {
        if (adjectiveList.options[i].selected)
        {
            if (!isFirst)
            {
                nameString += " ";
            }
            isFirst = false;
            nameString += adjectiveList.options[i].value;
        }
    }
    var categoryList = document.getElementById(superSafeCategoryListClientId);
    for (var i = 0; i < categoryList.options.length; i++)
    {
        if (categoryList.options[i].selected)
        {
            if (!isFirst)
            {
                nameString += " ";
            }
            isFirst = false;
            nameString += categoryList.options[i].value;
        }
    }
    var nameList = document.getElementById(superSafeNameListClientId);
    for (var i = 0; i < nameList.options.length; i++)
    {
        if (nameList.options[i].selected)
        {
            if (!isFirst)
            {
                nameString += " ";
                isFirst = false;
            }
            isFirst = false;
            nameString += nameList.options[i].value;
        }
    }
    $('#NameDisplay').html(userName + "'s " + nameString);
}
function updateRegularNameDisplay(ele)
{
    $('#NameDisplay').html(userName + "'s " + ele.value);
}
function enableButton()
{
    if (!$('#' + nameClientID).val() && 
        ($('#' + superSafeAdjectiveListClientId + ' option:selected').length == 0) &&
        ($('#' + superSafeCategoryListClientId + ' option:selected').length == 0) &&
        ($('#' + superSafeNameListClientId + ' option:selected').length == 0))
    {
            return;
    }
    else if (fileUploadIsReady)
    {
        $('#' + createSetClientID).attr('disabled', false);
    }
}

function ismaxlength(obj)
{
    var mlength = obj.getAttribute ? parseInt(obj.getAttribute("maxlength")) : ""
    if (obj.getAttribute && obj.value.length > mlength)
        obj.value = obj.value.substring(0, mlength)
}

}
/*
     FILE ARCHIVED ON 07:38:15 May 07, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:48:13 Jul 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 84.725 (3)
  RedisCDXSource: 26.625
  captures_list: 137.081
  PetaboxLoader3.datanode: 241.607 (4)
  load_resource: 1563.707
  esindex: 0.032
  PetaboxLoader3.resolve: 852.804
  CDXLines.iter: 17.193 (3)
  exclusion.robots: 0.342
  exclusion.robots.policy: 0.323
*/