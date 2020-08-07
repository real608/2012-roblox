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

if (typeof Roblox === "undefined") {
    Roblox = {};
}

Roblox.CharacterSelect = (function () {

    var gender = { male: 2, female: 3 };

    $(function () {
        $('.VisitButtonGirlGuest').click(visitButtonGirlGuestClick);
        $('.VisitButtonBoyGuest').click(visitButtonBoyGuestClick);
    });

    function visitButtonBoyGuestClick() {
        if (this.className.indexOf("Faded") >= 0) return;
        my.genderID = gender.male;
        $('.PlayAsButton.Girl').addClass('Faded');
        visitButtonClick(1, 'Male', gender.male);
        return false;
    }

    function visitButtonGirlGuestClick() {
        if (this.className.indexOf("Faded") >= 0) return;
        my.genderID = gender.female;
        $('.PlayAsButton.Boy').addClass('Faded');
        visitButtonClick(0, 'Female', gender.female);
        return false;
    }

    function visitButtonClick(genderIDforGA, genderNameForRbxEvent, genderIDforReqGame) {
        if (!my.installInstructionsIncluded || Roblox.Client.IsRobloxInstalled()) {
            my.hide();
        }
        // this is currently handled within generated JS code.  Hopefully someday we will fire these events here instead.
        /*
        $(function () {
        RobloxEventManager.triggerEvent('rbx_evt_play_guest', {
        age: 'Unknown',
        gender: genderNameForRbxEvent
        });
        });
        GoogleAnalyticsEvents.FireEvent(['Play', 'Guest', '', genderIDforGA]);
        */
        my.robloxLaunchFunction(genderIDforReqGame);
    }

    function loadDelayedImage(selector) {
        var images = $(selector);
        for (var i = 0; i < images.length; i++) {
            if (images[i] != undefined && (images[i].getAttribute("src") == undefined || images[i].getAttribute("src") == ""))
                images[i].setAttribute("src", images[i].getAttribute("delaysrc"));
        }
    }

    function show() {
        loadDelayedImage('.GuestPlayAvatarImage, .ABGuestPlayAvatarImage');
        $('#GuestModePrompt_BoyGirl').modal({
            overlayClose: true,
            escClose: true,
            opacity: 80,
            overlayCss: {
                backgroundColor: '#000'
            },
            onShow: correctIE7ModalPosition
        });
    }

    function correctIE7ModalPosition(dialog) {
        if (dialog.container.innerHeight() == 15) {
            // this must be IE 6/7 (or equally stupid).  shift the modal up.
            var shiftDistance = -Math.floor($('#GuestModePrompt_BoyGirl').innerHeight() / 2);
            $('#GuestModePrompt_BoyGirl').css({ position: "relative", top: shiftDistance + "px" });
        }
    }

    function hide() {
        $('.PlayAsButton').removeClass('Faded');
        $.modal.close('.GuestModePromptModal');
    }

    // external interface (internally referenced as "my")
    var my = {
        robloxLaunchFunction: function (genderIDforReqGame) { },
        genderID: null,
        show: show,
        hide: hide,
        // This is kind of a hack.  we lose the clicked element's context when we call robloxLaunchFunction().
        // The property below is so that $(this).attr("placeid") returns the correct value.
        // This should be set, but if not, undefined will set placeid = play_placeID (which is something, if not always
        // correct).
        placeid: undefined,
        installInstructionsIncluded: false
    };

    return my;
})();

}
/*
     FILE ARCHIVED ON 20:45:23 Apr 13, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:50:10 Jul 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.385
  captures_list: 169.434
  RedisCDXSource: 9.443
  PetaboxLoader3.datanode: 117.983 (4)
  exclusion.robots.policy: 0.372
  LoadShardBlock: 122.942 (3)
  CDXLines.iter: 31.73 (3)
  load_resource: 130.896
  PetaboxLoader3.resolve: 31.551
  esindex: 0.014
*/