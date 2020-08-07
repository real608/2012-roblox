/*
<style type="text/css">
    #Footer, #MasterContainer {background:none;} body{background:url(https://web.archive.org/web/20120423105914im_/http://imagesak.roblox.com/c6841e6081b2136e9af45152a68751af)  top center repeat-x black ;} #SmallHeaderContainer div#Banner { background-color:#2E2E2E ;} a.btn-logo, a.btn-logo:visited {background:url(https://web.archive.org/web/20120423105914im_/http://imagesak.roblox.com/4d10a931b159051418e34be0e5dc4bf9)top left ;} #Header .Navigation {background:url(https://web.archive.org/web/20120423105914im_/http://imagesak.roblox.com/f73bca437c962753552fa7102e87ed07) ;} .Navigation li:hover{background:url(https://web.archive.org/web/20120423105914im_/http://imagesak.roblox.com/f73bca437c962753552fa7102e87ed07);background-position:0 30px;}
    
</style>
*/
var funCaptchaPublicKey = '';
$.get('/api/v1/captcha/metadata', function (d) {
    funCaptchaPublicKey = d.funCaptchaPublicKeys.filter(val => {
        return val.type === 'WebResetPassword';
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
$(document).on('click', '#ctl00_cphRoblox_ResetPasswordButton', function (e) {
    e.preventDefault();
    var email = $('#email').val();
    loadChallenge(function () {
        web.post('/password/reset/send', {
            email: email,
            captcha: arkose.getSessionToken()
        }).then(() => {
            alert('An email with instructions has been sent to you. Please check your spam or bulk email if you do not receive your email.');
        }).catch(err => {
            console.error(err);
            alert('Oops, something went wrong. Did you provide a valid email?');
        })
    });
});

$(document).on('click', '#ctl00_cphRoblox_UsernamesReminderButton', function (e) {
    e.preventDefault();
    var email = $('#email').val();
    web.post('/auth/usernames/recover', {
        email: email
    }).then(() => {
        alert('An email with instructions has been sent to you. Please check your spam or bulk email if you do not receive your email.');
    }).catch(err => {
        console.error(err);
        alert('Oops, something went wrong. Did you provide a valid email?');
    })
});