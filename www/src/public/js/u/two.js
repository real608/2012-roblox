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

Type.registerNamespace('Roblox.Client');

function tryToDownload() {

    oIFrm = document.getElementById('downloadInstallerIFrame');
    oIFrm.src = "/install/setup.ashx";
}

function logStatistics(reqType) {
    $.get("/install/VisitButtonHandler.ashx?reqtype=" + reqType, function (data) { });
}

Roblox.Client._installHost = null;
Roblox.Client._installSuccess = null;
Roblox.Client._CLSID = null;
Roblox.Client._continuation = null;
Roblox.Client._skip = null;
Roblox.Client._isIDE = null;
Roblox.Client._isRobloxBrowser = null;
Roblox.Client._isPlaceLaunch = false;
Roblox.Client._silentModeEnabled = false;
Roblox.Client._bringAppToFrontEnabled = false;
Roblox.Client._numLocks = 0;
Roblox.Client._logTiming = false;
Roblox.Client._logStartTime = null;
Roblox.Client._logEndTime = null;
Roblox.Client._hiddenModeEnabled = false;
Roblox.Client._runInstallABTest = function () { };  // will be set if there is an AB test in play

Roblox.Client.ReleaseLauncher = function (o, removeLock, overrideLocks) {
    if (removeLock)
        Roblox.Client._numLocks--;
    if (overrideLocks || Roblox.Client._numLocks <= 0) {
        if (o != null) {
            document.getElementById('pluginObjDiv').innerHTML = '';
            o = null;
        }
        Roblox.Client._numLocks = 0;
    }
    if (Roblox.Client._logTiming) {
        Roblox.Client._logEndTime = new Date();
        var ms = Roblox.Client._logEndTime.getTime() - Roblox.Client._logStartTime.getTime();
        if (console && console.log) {
            console.log("Roblox.Client: " + ms + "ms from Create to Release.");
        }
    }
};

Roblox.Client.GetInstallHost = function (o) {
    if (window.ActiveXObject) // IE
    {
        return o.InstallHost;
    }
    else // Firefox
    {
        // GROSS DISGUSTING HACK:  Firefox plugin for some reason is tacking on an extra character to the end of the install host.
        var val = o.Get_InstallHost();
        if (val.match(/roblox.com$/))
            return val;
        else
            return val.substring(0, val.length - 1);
    }
};

Roblox.Client.CreateLauncher = function (addLock) {
    if (Roblox.Client._logTiming) {
        Roblox.Client._logStartTime = new Date();
    }
    if (addLock)
        Roblox.Client._numLocks++;

    if (Roblox.Client._installHost == null || Roblox.Client._CLSID == null)  // Need to init these properties
    {
        if (typeof initClientProps == 'function') {
            initClientProps();
        }
    }

    var pluginObj = document.getElementById('robloxpluginobj');
    var pluginDiv = $('#pluginObjDiv');

    // Check to see if it's already installed
    // If it isn't installed, add it
    if (!pluginObj) {
        Roblox.Client._hiddenModeEnabled = false;
        var pluginString;
        if (window.ActiveXObject) {
            // browser supports ActiveX
            // Create object element with
            // download URL for IE OCX

            pluginString = "<object classid=\"clsid:" + Roblox.Client._CLSID + "\"";
            pluginString += " id=\"robloxpluginobj\" type=\"application/x-vnd-roblox-launcher\"";
            pluginString += " codebase=\"" + Roblox.Client._installHost + "\">Failed to INIT Plugin</object>";

            $(pluginDiv).append(pluginString);
        }
        else {
            // browser supports Netscape Plugin API
            pluginString = "<object id=\"robloxpluginobj\" type=\"application/x-vnd-roblox-launcher\">";
            pluginString += "<p>You need Our Plugin for this.  Get the latest version from";
            pluginString += "<a href=\"" + Roblox.Client._installHost + "\">here</a>.</p></object>";

            $(pluginDiv).append(pluginString);
        }

        pluginObj = document.getElementById('robloxpluginobj');
    }

    try {
        if (!pluginObj) {
            if (typeof console.log === "undefined")
                alert("Plugin installation failed!");
            else
                console.log("Plugin installation failed!");
        }
        pluginObj.Hello(); // fails if object isn't fully loaded


        // Get the install host info for this plugin (different for IE vs Mozilla)
        var host = Roblox.Client.GetInstallHost(pluginObj);

        if (!host || host != Roblox.Client._installHost)
            throw "wrong InstallHost: (plugins):  " + host + "  (servers):  " + Roblox.Client._installHost;
        return pluginObj;
    }
    catch (ex) {
        Roblox.Client.ReleaseLauncher(pluginObj, addLock, false);
        return null;
    }
};

Roblox.Client.isIDE = function () {
    if (Roblox.Client._isIDE == null) {
        Roblox.Client._isIDE = false;
        Roblox.Client._isRobloxBrowser = false;

        if (window.external) {
            try {
                if (window.external.IsRobloxAppIDE !== undefined) {
                    Roblox.Client._isIDE = window.external.IsRobloxAppIDE;
                    Roblox.Client._isRobloxBrowser = true;
                }
            }
            catch (ex) {
            }
        }
    }
    return Roblox.Client._isIDE;
};

Roblox.Client.isRobloxBrowser = function () {
    Roblox.Client.isIDE();
    return Roblox.Client._isRobloxBrowser;
};

Roblox.Client.robloxBrowserInstallHost = function () {
    if (window.external) {
        try {
            return window.external.InstallHost;
        }
        catch (ex) {

        }
    }
    return "";
};

Roblox.Client.IsRobloxProxyInstalled = function () {
    var o = Roblox.Client.CreateLauncher(false);
    var isInstalled = false;
    if (o != null)
    { isInstalled = true; }
    Roblox.Client.ReleaseLauncher(o, false, false);

    if (isInstalled || Roblox.Client.isRobloxBrowser())
        return true;
    return false;
};

Roblox.Client.IsRobloxInstalled = function () {
    try {
        var o = Roblox.Client.CreateLauncher(false);

        var host = Roblox.Client.GetInstallHost(o);
        Roblox.Client.ReleaseLauncher(o, false, false);
        // TODO: Check version, etc.

        return host == Roblox.Client._installHost;
    }
    catch (e) {
        if (Roblox.Client.isRobloxBrowser()) {
            host = Roblox.Client.robloxBrowserInstallHost();
            return host == Roblox.Client._installHost;
        }

        return false;
    }
};

Roblox.Client.SetStartInHiddenMode = function (value) {
    try {
        var o = Roblox.Client.CreateLauncher(false);

        if (o !== null) {
            //if (o.SetStartInHiddenMode) {
            o.SetStartInHiddenMode(value);
            Roblox.Client._hiddenModeEnabled = value;
            return true;  // if we can bit flip it, it's enabled.
            //}
        }
    }
    catch (e) {
        // swallow errors
    }
    // if o is null, o.SetStartInHiddenMode doesn't exist or o.SetStartInHiddenMode cannot be run
    return false;
};

Roblox.Client.UnhideApp = function () {
    try {
        if (Roblox.Client._hiddenModeEnabled) {
            var o = Roblox.Client.CreateLauncher(false);
            //if (o.UnhideApp) {
            o.UnhideApp();
            //}
        }
    }
    catch (exp) {
        // swallow errors
    }
};

Roblox.Client.Update = function () {
    try {
        var o = Roblox.Client.CreateLauncher(false);
        o.Update();
        Roblox.Client.ReleaseLauncher(o, false, false);
    }
    catch (e) {
        alert('Error updating: ' + e);
    }
};

Roblox.Client.WaitForRoblox = function (continuation) {
    if (Roblox.Client._skip) {
        window.location = Roblox.Client._skip;
        return false;
    }
    Roblox.Client._continuation = continuation;
    Roblox.Client._cancelled = false;

    if (!Roblox.Client.IsRobloxProxyInstalled() && Roblox.Client.ImplementsProxy) {
        Roblox.InstallationInstructions.show();

        Roblox.Client._runInstallABTest();

        //Tracking
        var OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1)
            OSName = "Mac";

        if (typeof (_gaq) != typeof (undefined)) {
            _gaq.push(['_trackEvent', 'Install Begin', OSName]);
            _gaq.push(['b._trackEvent', 'Install Begin', OSName]);
        }

        RobloxEventManager.triggerEvent('rbx_evt_install_begin', { os: OSName });

        // Chrome restarts all processes when a plugin is installed so save our state so we can resume later
        if (window.chrome) {
            window.location.hash = '#chromeInstall';
            $.cookie('chromeInstall', continuation.toString().replace(/play_placeId/, play_placeId.toString()));
        }

        // Set a timer to continue launching the game 
        window.setTimeout(function () { Roblox.Client._ontimer(); }, 1000);

        tryToDownload();
        return true;
    }
    else {
        Roblox.Client._continuation();
        return false;
    }
};
Roblox.Client.ResumeTimer = function (continuation) {
    Roblox.Client._continuation = continuation;
    Roblox.Client._cancelled = false;
    window.setTimeout(function () { Roblox.Client._ontimer(); }, 0);
};

Roblox.Client.Refresh = function () {
    try {
        navigator.plugins.refresh(false);
    }
    catch (ex) {
    }
};

Roblox.Client._onCancel = function () {
    Roblox.InstallationInstructions.hide();
    Roblox.Client._cancelled = true;
    return false;
};

Roblox.Client._ontimer = function () {
    if (Roblox.Client._cancelled)
        return;

    Roblox.Client.Refresh();

    if (Roblox.Client.IsRobloxProxyInstalled()) {
        Roblox.InstallationInstructions.hide();
        window.setTimeout(function () {
            if (window.chrome && window.location.hash == '#chromeInstall') {
                // Chrome installed, but did not restart the tab.  Remove the hash tag and cookie.
                window.location.hash = '';
                $.cookie('chromeInstall', null);
            }
        }, 5000);
        Roblox.Client._continuation();
        if (Roblox.Client._installSuccess)
            Roblox.Client._installSuccess();
    }
    else {
        window.setTimeout(function () { Roblox.Client._ontimer(); }, 1000);
    }
};


}
/*
     FILE ARCHIVED ON 20:45:22 Apr 13, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:44:33 Jul 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  RedisCDXSource: 12.543
  LoadShardBlock: 413.994 (3)
  PetaboxLoader3.datanode: 270.26 (4)
  exclusion.robots.policy: 1.231
  exclusion.robots: 1.25
  PetaboxLoader3.resolve: 1609.601
  load_resource: 1832.974
  esindex: 0.019
  captures_list: 472.319
  CDXLines.iter: 40.326 (3)
*/