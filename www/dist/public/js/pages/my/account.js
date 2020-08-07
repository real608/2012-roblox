let currentState = {};

web.get('/account-information/current-account').then(d => {
    $('#birth-year').find('option[value=' + d.birthDate.birthYear + ']').attr('selected', 'selected');
    $('#birth-month').find('option[value=' + d.birthDate.birthMonth + ']').attr('selected', 'selected');
    $('#birth-day').find('option[value=' + d.birthDate.birthDay + ']').attr('selected', 'selected');
    $('.birth-selects').removeAttr('disabled');

    if (d.gender === 2) {
        $('#male').prop('checked', true);
    } else if (d.gender === 3) {
        $('#female').prop('checked', true);
    }

    $('#blurb').text(d.description).removeAttr('disabled');
    currentState = d;
});

$(document).on('click', '#update-settings-submit', function (e) {
    e.preventDefault();
    let newState = {};
    let newDesc = $('#blurb').val();
    if (newDesc !== currentState.description) {
        newState['description'] = newDesc;
    }

    let gender = $('#male').is(':checked') === true ? 2 : $('#female').is(':checked') === true ? 3 : 1;
    if (gender !== currentState.gender) {
        newState['gender'] = gender;
    }

    console.log('update', newState);
    if (Object.getOwnPropertyNames(newState).length === 0) {

        return;
    }
    $("#processing").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
        },
        open: function (event, ui) {
            $('div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle').hide();
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
    });

    // update settings
    // ...
    window.location.reload();
});

web.get('/builders-club/membership').then(d => {
    if (d.type === 'NBC') {
        $('#membership-status').text('You do not have a Builders Club membership.');
    } else {
        let expiresAt = moment(d.renewal).fromNow(true);
        if (d.isLifetime) {
            $('#membership-status').text('Your builders club membership is lifetime, and will never expire.');
        } else {
            $('#membership-status').html(`Your builders club membership expires in <span style="color:red;">${expiresAt}</span>.`);
        }
    }
})