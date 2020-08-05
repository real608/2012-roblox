const { months } = require("moment");

const err = msg => {
    $('#signupError').empty().text(msg).show();
}
const unErr = () => {
    $('#signupError').hide();
}
var funCaptchaPublicKey = '';
$.get('/api/v1/captcha/metadata', function (d) {
    funCaptchaPublicKey = d.funCaptchaPublicKeys.filter(val => {
        return val.type === 'WebSignup';
    })[0].value
});
var arkose;
function loadChallenge(cb) {
    console.log('load challenge called');
    if (!funCaptchaPublicKey) {
        throw new Error('Public key not available');
    }
    arkose = new ArkoseEnforcement({
        public_key: funCaptchaPublicKey,
        target_html: "CAPTCHA",
        callback: cb
    });
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).on('click', '#signUpButtonNew', function (e) {
    e.preventDefault();
    if (!funCaptchaPublicKey) {
        return err('Please wait a moment and try again.');
    }
    // check stuff then reload page
    var pass = $('#password').val();
    var confPass = $('#confirm-password').val();
    var username = $('#username').val();

    var birthDay = getParameterByName('day');
    var birthMonth = getParameterByName('month');
    var birthYear = getParameterByName('year');
    var gender = getParameterByName('gender') === 'male' ? 2 : 3

    if (!username || username.length < 3) {
        return err('Your username is too short - it must be at least 3 characters.');
    }
    if (username.length >= 22) {
        return err('Your username is too long - it can be at most 20 characters.')
    }

    if (pass !== confPass) {
        return err('Password does not match!')
    }
    console.log('load challenge starting');
    // ok
    unErr();
    $('#captcha-box').show();
    loadChallenge(function () {
        var token = arkose.getSessionToken();
        if (token) {
            web.post('/auth/signup', {
                username,
                pass,
                gender,
                birthday: birthYear + '-' + birthMonth + '-' + birthDay,
                captcha: token,
            }).then(function (data) {
                window.location.href = '/';
            });
        }
    });


});

$(document).on('input', '#confirm-password', function (e) {
    e.preventDefault();

    if ($(this).val() !== $('#password').val()) {
        err('Password does not match!')
    } else {
        unErr();
    }
});

$(document).on('input', '#password', function (e) {
    e.preventDefault();
    let conf = $('#confirm-password').val();
    if (!conf) {
        return;
    }
    if ($(this).val() !== conf) {
        err('Password does not match!')
    } else {
        unErr();
    }
});