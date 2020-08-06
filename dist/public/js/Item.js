$(document).ready(function () {
    $('.SetAddButton').click(function () {
        var assetId = $(this).parent().parent().attr('id').replace('setList_', '');
        var setId = $(this).children('.setId')[0].value;
        var setDivId = 'set_' + setId + '_' + assetId;
        var imgId = "waiting" + setDivId;
        $(setDivId).append("<img src='/images/spinners/spinner16x16.gif' id='" + imgId + "'");
        $.ajax({
            type: "GET",
            async: true,
            cache: false,
            timeout: 50000,
            url: "/Sets/SetHandler.ashx?rqtype=addtoset&assetId=" + assetId + "&setId=" + setId,
            success: function (data) {
                if (data !== null) {
                    // Remove that set from the list of available sets
                    $('#' + setDivId).removeClass('SetAddButton');
                    $('#' + setDivId).addClass('SetAddButtonAlreadyContainsItem');
                    $('#' + setDivId).unbind('click');
                    // Remove the spinner
                    $('#' + imgId).remove();
                }
            },
            failure: function (data) {
                if (data !== null) {
                    //alert("failure");
                }
            }
        });
    });
});

// Code for processing modal
function showProcessingModal(closeClass) {
    var modalProperties = { overlayClose: true, opacity: 80, overlayCss: { backgroundColor: "#000"} };

    if (typeof closeClass !== "undefined" && closeClass !== "") {
        $.modal.close("." + closeClass);
    }
    
    $("#ProcessingView").modal(modalProperties);
}



// Code for Modal Popups

var modalProperties = { overlayClose: true, escClose: true, opacity: 80, overlayCss: { backgroundColor: "#000"} };

ProcessPurchaseFreeViewOpen = function () {
    $("#ProcessPurchaseFreeView").modal(modalProperties);
    getItem("PurchaseFree");
};

var ProcessPurchaseRobuxViewOpen = function () {
    $.modal.close(".PurchaseWithRobuxVerificationView");
    $("#ProcessPurchaseRobuxView").modal(modalProperties);
    getItem("PurchaseRobux");
};

var ProcessUAPurchaseRobuxViewOpen = function () {
    $.modal.close(".PurchaseUserAssetWithRobuxVerificationView");
    $("#ProcessUAPurchaseRobuxView").modal(modalProperties);
    getItem("UAPurchaseRobux");
};

var ProcessPurchaseTicketsViewOpen = function () {
    $.modal.close(".PurchaseWithTicketsVerificationView");
    $("#ProcessPurchaseTicketsView").modal(modalProperties);
    getItem("PurchaseTickets");
};

var ProcessRenewFreeViewOpen = function () {
    $.modal.close(".RenewForFreeVerificationView");
    $("#ProcessRenewFreeView").modal(modalProperties);
};

var ProcessRenewRobuxViewOpen = function () {
    $.modal.close(".RenewWithRobuxVerificationView");
    $("#ProcessRenewRobuxView").modal(modalProperties);
};

var ProcessRenewTicketsViewOpen = function () {
    $.modal.close(".RenewWithTicketsVerificationView");
    $("#ProcessRenewTicketsView").modal(modalProperties);
};

var ProcessROBLOXPurchaseOpen = function () {
    $.modal.close(".SalePriceConfirmPopupPanel");
    $("#ProcessROBLOXPurchase").modal(modalProperties);
};


$(document).on('click', '#ctl00_cphRoblox_PurchaseWithRobuxButton', function(e) {
    e.preventDefault();
    ModalOpen('#PurchaseWithRobuxVerificationView');
});

$(document).on('click', '#ctl00_cphRoblox_ProceedWithRobuxPurchaseButton', function(e) {
    e.preventDefault();
    ProcessPurchaseRobuxViewOpen()
    console.log('purchase item');
    setTimeout(() => {
        ModalClose('ProcessPurchaseRobuxView');
        ModalOpen('#PurchaseWithRobuxConfirmationView');
    }, 100);
});

/*
     FILE ARCHIVED ON 06:06:54 May 10, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:47:09 Jul 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  CDXLines.iter: 21.403 (3)
  PetaboxLoader3.resolve: 707.065
  exclusion.robots: 0.315
  PetaboxLoader3.datanode: 371.909 (4)
  esindex: 0.012
  LoadShardBlock: 1340.694 (3)
  captures_list: 1676.877
  load_resource: 770.348
  RedisCDXSource: 284.56
  exclusion.robots.policy: 0.302
*/