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
    var modalProperties = { overlayClose: true, opacity: 80, overlayCss: { backgroundColor: "#000" } };

    if (typeof closeClass !== "undefined" && closeClass !== "") {
        $.modal.close("." + closeClass);
    }

    $("#ProcessingView").modal(modalProperties);
}



// Code for Modal Popups

var modalProperties = { overlayClose: true, escClose: true, opacity: 80, overlayCss: { backgroundColor: "#000" } };

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


$(document).on('click', '#ctl00_cphRoblox_PurchaseWithRobuxButton', function (e) {
    e.preventDefault();
    ModalOpen('#PurchaseWithRobuxVerificationView');
});

$(document).ready(function () {
    let itemMetaData = $('#ItemMetaData');
    let sellerId = parseInt(itemMetaData.attr('data-creator-id'), 10);
    let productId = parseInt($('#ItemMetaData').attr('data-product-id'), 10)
    let price = parseInt(itemMetaData.attr('data-price'), 10);

    let exceptionToView = {
        'InsufficientFunds': '#InsufficientRobuxView',
        'AlreadyOwned': '#RedundantPurchaseView',
    }

    $(document).on('click', '#ctl00_cphRoblox_ProceedWithRobuxPurchaseButton', function (e) {
        e.preventDefault();
        ProcessPurchaseRobuxViewOpen()
        console.log('purchase item');
        web.post('/economy/purchase/' + productId, {
            expectedSellerId: sellerId,
            expectedPrice: price,
        }).then(d => {
            console.log('success', d);
            ModalClose('ProcessPurchaseRobuxView');
            ModalOpen('#PurchaseWithRobuxConfirmationView');
        }).catch(err => {
            ModalClose('ProcessPurchaseRobuxView');
            let code = err.responseJSON.error.code;
            console.error(err);
            let view = exceptionToView[code];
            if (view) {
                ModalOpen(view);
            } else {
                ModalOpen('#GenericExceptionView');
            }
        })
    });

    let privatePrice;
    let uaid;
    let seller;
    let sellerName = '';
    $(document).on('click', '.puchase-private-seller-item', function (e) {
        e.preventDefault();
        console.log('purchase private item');
        $('#PurchaseUserAssetWithRobuxConfirmationView').find('.success-message').text(`You have successfully purchased this item.`);
        privatePrice = parseInt($(this).attr('data-price'), 10);
        uaid = parseInt($(this).attr('data-uaid'), 10);
        seller = parseInt($(this).attr('data-sellerId'), 10);
        sellerName = $(this).attr('data-sellerName');

        let currentBalance = parseInt($('#PurchaseUserAssetWithRobuxVerificationView').find('.balance-after').attr('data-balance'), 10);
        let newBalance = currentBalance - privatePrice;
        if (newBalance < 0) {
            ModalOpen(exceptionToView.InsufficientFunds);
            return
        }
        $('#PurchaseUserAssetWithRobuxVerificationView').find('.purchase-confirmation').text(` Would you like to
        purchase
        "${itemMetaData.attr('data-name')}" from
        ${sellerName}
        for ${privatePrice > 0 ? 'R$ ' + privatePrice : 'Free'}?`);
        $('#PurchaseUserAssetWithRobuxVerificationView').find('.balance-after').text(`Your balance after this transaction will be R${newBalance}.`);
        ModalOpen('#PurchaseUserAssetWithRobuxVerificationView');
    });
    $(document).on('click', '#ctl100_roblox_PurchaseUserAsset', function (e) {
        e.preventDefault();
        console.log('buy asset');
        ProcessPurchaseRobuxViewOpen()
        console.log('purchase item');
        web.post('/economy/purchase/' + productId, {
            expectedSellerId: seller,
            expectedPrice: privatePrice,
            userAssetId: uaid,
        }).then(d => {
            console.log('success', d);
            ModalClose('ProcessPurchaseRobuxView');
            ModalOpen('#PurchaseUserAssetWithRobuxConfirmationView');
        }).catch(err => {
            ModalClose('ProcessPurchaseRobuxView');
            let code = err.responseJSON.error.code;
            console.error(err);
            let view = exceptionToView[code];
            if (view) {
                ModalOpen(view);
            } else {
                ModalOpen('#GenericExceptionView');
            }
        })
    })
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