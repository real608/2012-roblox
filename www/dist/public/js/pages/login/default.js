function CheckDate() {
    $('#lblError').attr('style', 'display: none');
    var year = parseInt($('#lstYears option:selected').val());
    var month = parseInt($('#lstMonths option:selected').val());
    var day = parseInt($('#lstDays option:selected').val());

    if (year <= 0 || month <= 0 || day <= 0 || day > new Date(year, month, 0).getDate()) {
        $('#lblError').attr('style', 'color: Red;');
    }
    else {
        $('#ChooseBirthdate').slideToggle();
        $('#ChooseGender').slideToggle();
    }
}
$(document).on('click', '#btnContinue', CheckDate);
function CheckGender() {
    var year = parseInt($('#lstYears option:selected').val());
    var month = parseInt($('#lstMonths option:selected').val());
    var day = parseInt($('#lstDays option:selected').val());
    var gender = $('#MaleBtn:checked').length != 0 ? 'male' : 'female';
    if ($('#MaleBtn:checked').length == 0 && $('#FemaleBtn:checked').length == 0) {
        $('#genderError').show();
        return false;
    } else {
        $('#genderError').hide();
        window.location.href = '/Login/NewNameAndPassword.aspx?gender=' + gender + '&month=' + month + '&day=' + day + '&year=' + year
    }
}
$(document).on('click', '#ctl00_cphRoblox_btnSignup2', CheckGender);


$(document).on('click', '#robloxSignInWithCookie', function (e) {
    e.preventDefault();
    let err = msg => {
        return $('#cookie-login-error').show().text(msg);
    }
    let ok = () => {
        $('#cookie-login-error').empty().hide();
    }
    var cookie = $('#roblox_cookie').val();
    if (!cookie) {
        return err('Please paste in a valid cookie.');
    }
    web.post('/auth/login/cookie', {
        cookie,
    }).then(function (ok) {
        window.location.reload();
    }).catch(err => {
        alert('An error has ocurred. Please try again.');
    })

    ok();
});