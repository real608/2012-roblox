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

Roblox.InstallationInstructions = (function () {

    function show() {
        loadImages();
        // Presize modal, if we are showing an image, to fix a bug where some browsers size the modal before loading an image.
        // This bug would show the modal with part of the image cut off.
        // Upon reload, the image is cached, and the modal auto-sizes, "fixing" the bug while the image is cached.
        // But we want to show it right the first time!
        var modal_width = 0;
        var install_instructions_image = $('.InstallInstructionsImage');
        if (install_instructions_image && typeof $(install_instructions_image).attr("modalwidth") != "undefined") {
            modal_width = $('.InstallInstructionsImage').attr('modalwidth');
        }
        if (modal_width > 0) {
            var left_percent = ($(window).width() - (modal_width - 10)) / 2;
            $('#InstallationInstructions').modal({ escClose: true,
                //onClose: function() { Roblox.Client._onCancel(); },
                opacity: 50,
                minWidth: modal_width,
                maxWidth: modal_width,
                overlayCss: { backgroundColor: "#000" },
                position: [20, left_percent]
            });
        } else {
            $('#InstallationInstructions').modal({ escClose: true,
                //onClose: function() { Roblox.Client._onCancel(); },
                opacity: 50,
                maxWidth: ($(window).width() / 2),
                minWidth: ($(window).width() / 2),
                overlayCss: { backgroundColor: "#000" },
                position: [20, "25%"]
            });
        }
    }

    function hide() {
        $.modal.close();
    }

    function loadImages() {
        var install_instructions_image = $('.InstallInstructionsImage');
        if (navigator.userAgent.match(/Mac OS X 10[_|\.]5/)) {
            if (install_instructions_image && typeof $(install_instructions_image).attr("oldmacdelaysrc") != "undefined") {
                $('.InstallInstructionsImage').attr('src', $('.InstallInstructionsImage').attr('oldmacdelaysrc'));
            }
        }
        else {
            if (install_instructions_image && typeof $(install_instructions_image).attr("delaysrc") != "undefined") {
                $('.InstallInstructionsImage').attr('src', $('.InstallInstructionsImage').attr('delaysrc'));
            }
        }
    }

    var my = {
        show: show,
        hide: hide
    };

    return my;
})();

}
/*
     FILE ARCHIVED ON 20:45:23 Apr 13, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:49:46 Jul 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.33
  esindex: 0.013
  PetaboxLoader3.resolve: 39.335
  captures_list: 93.802
  CDXLines.iter: 26.009 (3)
  RedisCDXSource: 0.657
  PetaboxLoader3.datanode: 62.798 (4)
  LoadShardBlock: 64.094 (3)
  exclusion.robots.policy: 0.316
  load_resource: 69.225
*/