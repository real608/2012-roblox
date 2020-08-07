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

MadStatus = {
    // Usage:
    //MadStatus.init('MadStatusField','MadStatusBackBuffer', 2000, [1000]);
    //MadStatus.start();

    running: false,
    init: function (field, backBuffer, updateInterval, fadeInterval) {
        if (MadStatus.running) {
            MadStatus.stop();
        }
        MadStatus.updateInterval = updateInterval ? updateInterval : 2000;
        MadStatus.fadeInterval = fadeInterval ? fadeInterval : 1000;
        MadStatus.timeout = null;
        MadStatus.running = true;
        MadStatus.field = field;
        MadStatus.backBuffer = backBuffer;

        MadStatus.field.show();
        MadStatus.backBuffer.hide();
    },
    participle: [
					"Accelerating",
					"Aggregating",
					"Allocating",
                    "Acquiring",
					"Automating",
					"Backtracing",
					"Bloxxing",
					"Bootstrapping",
					"Calibrating",
					"Correlating",
					"De-noobing",
					"De-ionizing",
					"Deriving",
                    "Energizing",
					"Filtering",
					"Generating",
					"Indexing",
					"Loading",
					"Noobing",
					"Optimizing",
					"Oxidizing",
					"Queueing",
					"Parsing",
					"Processing",
					"Rasterizing",
					"Reading",
					"Registering",
					"Re-routing",
					"Resolving",
					"Sampling",
					"Updating",
					"Writing"
				],
    modifier: [
					"Blox",
					"Count Zero",
					"Cylon",
					"Data",
					"Ectoplasm",
					"Encryption",
					"Event",
					"Farnsworth",
					"Bebop",
					"Flux Capacitor",
					"Fusion",
					"Game",
					"Gibson",
					"Host",
					"Mainframe",
					"Metaverse",
					"Nerf Herder",
					"Neutron",
					"Noob",
					"Photon",
					"Profile",
					"Script",
					"Skynet",
					"TARDIS",
					"Virtual"
				],
    subject: [
					"Analogs",
					"Blocks",
					"Cannon",
					"Channels",
					"Core",
					"Database",
					"Dimensions",
					"Directives",
					"Engine",
					"Files",
					"Gear",
					"Index",
					"Layer",
					"Matrix",
					"Paradox",
					"Parameters",
					"Parsecs",
					"Pipeline",
					"Players",
					"Ports",
					"Protocols",
					"Reactors",
					"Sphere",
					"Spooler",
					"Stream",
					"Switches",
					"Table",
					"Targets",
					"Throttle",
					"Tokens",
					"Torpedoes",
					"Tubes"
			],
    newLib: function () {
        return libString = this.participle[Math.floor(Math.random() * (this.participle.length))] + " " +
					this.modifier[Math.floor(Math.random() * (this.modifier.length))] + " " +
					this.subject[Math.floor(Math.random() * (this.subject.length))] + "...";
    },
    start: function () {
        if (MadStatus.timeout == null) {
            MadStatus.timeout = setInterval("MadStatus.update()", MadStatus.updateInterval);
            //console.log("timeout set: " + MadStatus.timeout + ", at " + (new Error()).stack);
            MadStatus.running = true;
        }
    },
    stop: function (msg) {
        //if (MadStatus.running) {
        clearInterval(MadStatus.timeout);
        //console.log("timeout cleared: " + MadStatus.timeout + ", at " + (new Error()).stack);
        MadStatus.timeout = null;
        if (typeof (msg) != typeof (undefined)) {
            MadStatus.field[0].innerHTML = msg;
        }
        else {
            MadStatus.field[0].innerHTML = "";
        }
        MadStatus.running = false;
        //}
    },
    manualUpdate: function (staticMsg, resumeAfterUpdate, animate) {
        if (MadStatus.timeout)
            MadStatus.stop();

        this.update(staticMsg, animate);

        if (resumeAfterUpdate)
            setTimeout("MadStatus.start()", 1000);
    },
    update: function (staticMsg, animate) {
        if (typeof (staticMsg) != typeof (undefined))
            MadStatus.backBuffer[0].innerHTML = staticMsg;
        else
            MadStatus.backBuffer[0].innerHTML = this.newLib();

        if (typeof (noAnim) != typeof (undefined) && animate == false)
            return;

        this.field.hide();
        this.backBuffer.fadeIn(this.fadeInterval + 2, function () {
            MadStatus.field[0].innerHTML = MadStatus.backBuffer[0].innerHTML;
            MadStatus.field.show();
            MadStatus.backBuffer.hide();
        });
    }
};

//$.ajaxSetup({ cache: false });
var RBX = new Object();


var RobloxLaunchStates = {
    StartingServer: "StartingServer",
    StartingClient: "StartingClient",
    Upgrading: "Upgrading",
    None: "None"
};

var RobloxLaunch = {
    launchGamePage: '/install/download.aspx',
	timer: null,
	clientMetricType: null,
	launcher: null,
    googleAnalyticsCallback: function () {
        // Seemed safer to do than renaming all locations in code of RobloxLaunch._GoogleAnalyticsCallback
        // And why not make the place launcher even more confusing?
        if (RobloxLaunch._GoogleAnalyticsCallback) {
            RobloxLaunch._GoogleAnalyticsCallback();
        }
    },
    state: RobloxLaunchStates.None
};
var RobloxPlaceLauncherService = {
	LogJoinClick: function (){
		$.get("/Game/Placelauncher.ashx",
            { request: "LogJoinClick" }
        );
	},
	RequestGame: function (placeId, isPartyLeader, gender, onGameSuccess, onGameError, context){
		gender = (gender !== null && gender !== undefined) ? gender : "";
		$.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestGame", placeId: placeId, isPartyLeader: isPartyLeader, gender: gender },
            function(data){
				if(data.Error){
					onGameError(data.Error, context);
				}
				else{
					onGameSuccess(data, context);
				}
			}
        );
	},
	RequestPlayWithParty: function (placeId, partyGuid, gameId, onGameSuccess, onGameError, context){
		$.getJSON("/Game/PlaceLauncher.ashx",
			{ request: "RequestPlayWithParty", placeId: placeId, partyGuid: partyGuid, gameId: gameId },
			function (data){
				if(data.Error){
					onGameError(data.Error, context);
				}
				else{
					onGameSuccess(data, context);
				}
			}
		);
	},
	RequestGroupBuildGame: function (placeId, onGameSuccess, onGameError, context){
		$.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestGroupBuildGame", placeId: placeId },
            function (data){
				if(data.Error){
					onGameError(data.Error, context);
				}
				else{
					onGameSuccess(data, context);
				}
			}
		);
	},
	RequestFollowUser: function (userId, onGameSuccess, onGameError, context){
		$.getJSON("/Game/PlaceLauncher.ashx", {
				request: "RequestFollowUser", userId: userId
			},
            function (data){
				if(data.Error){
					onGameError(data.Error, context);
				}
				else{
					onGameSuccess(data, context);
				}
			}
		);
	},
	RequestGameJob: function (placeId, gameId, gameJobId, onGameSuccess, onGameError, context){
		$.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestGameJob", placeId: placeId, gameId: gameId, gameJobId: gameJobId },
            function (data){
            	if(data.Error){
					onGameError(data.Error, context);
				}
				else{
					onGameSuccess(data, context);
				}
			}
		);
	},
	CheckGameJobStatus: function (jobId, onSuccess, onError, context){
		$.getJSON("/Game/PlaceLauncher.ashx",
            { request: "CheckGameJobStatus", jobId: jobId },
            function (data){
				if(data.Error){
					onError(data.Error, context);
				}
				else{
					onSuccess(data, context);
				}
			}
		);
	}
};

RobloxLaunch.RequestPlayWithParty = function (behaviorID, placeId, partyGuid, gameId) {
    RobloxPlaceLauncherService.LogJoinClick();
    RobloxLaunch.timer = new Date();
    RobloxLaunch.state = RobloxLaunchStates.None;
    RobloxLaunch.clientMetricType = "WebPlay";
    if (checkRobloxInstall()) {
        if (RobloxLaunch.launcher === null) {
            RobloxLaunch.launcher = new RBX.PlaceLauncher(behaviorID);
        }
        RobloxLaunch.launcher.RequestPlayWithParty(placeId, partyGuid, gameId);
    }
};

RobloxLaunch.RequestGame = function (behaviorID, placeID, gender) {
	RobloxPlaceLauncherService.LogJoinClick();
	RobloxLaunch.timer = new Date();
	RobloxLaunch.state = RobloxLaunchStates.None;
	RobloxLaunch.clientMetricType = "WebPlay";
	if (checkRobloxInstall()) {
		if (RobloxLaunch.launcher === null) {
			RobloxLaunch.launcher = new RBX.PlaceLauncher(behaviorID);
		}

		RobloxLaunch.launcher.RequestGame(placeID, gender);
	}
};

RobloxLaunch.RequestGroupBuildGame = function (behaviorID, placeID) {
	RobloxPlaceLauncherService.LogJoinClick();
	RobloxLaunch.timer = new Date();
	RobloxLaunch.state = RobloxLaunchStates.None;
	RobloxLaunch.clientMetricType = "WebPlay";

	if (checkRobloxInstall()) {
		if (RobloxLaunch.launcher === null) {
			RobloxLaunch.launcher = new RBX.PlaceLauncher(behaviorID);
		}
		RobloxLaunch.launcher.RequestGroupBuildGame(placeID);
	}
};

RobloxLaunch.RequestGameJob = function (behaviorID, placeId, gameId, gameJobId) {
	RobloxPlaceLauncherService.LogJoinClick();
	RobloxLaunch.timer = new Date();
	RobloxLaunch.state = RobloxLaunchStates.None;
	RobloxLaunch.clientMetricType = "WebJoin";
	if (checkRobloxInstall()) {
		if (RobloxLaunch.launcher === null) {
			RobloxLaunch.launcher = new RBX.PlaceLauncher(behaviorID);
		}
		RobloxLaunch.launcher.RequestGameJob(placeId, gameId, gameJobId);
	}
};

RobloxLaunch.RequestFollowUser = function (behaviorID, userId) {
	RobloxPlaceLauncherService.LogJoinClick();
	RobloxLaunch.timer = new Date();
	RobloxLaunch.state = RobloxLaunchStates.None;
	RobloxLaunch.clientMetricType = "WebFollow";
	if (checkRobloxInstall()) {
		if (RobloxLaunch.launcher === null) {
			RobloxLaunch.launcher = new RBX.PlaceLauncher(behaviorID);
		}
		RobloxLaunch.launcher.RequestFollowUser(userId);
	}
};

RobloxLaunch.StartGame = function (visitUrl, type, authenticationUrl, authenticationTicket, isEdit) {
    var handler = function (newTicket) {
        RobloxLaunch.StartGameWork(visitUrl, type, authenticationUrl, newTicket, isEdit);
    };

    // todo: remove this javascript parameter, always fetch it
    if (authenticationTicket == "FETCH") {
        $.get("/Game/GetAuthTicket", handler);
    }
    else {
        handler(authenticationTicket);
    }
};

RobloxLaunch.StartGameWork = function (visitUrl, type, authenticationUrl, authenticationTicket, isEdit) {

	//Fix for the HttpSendRequest,err=0x2F7E
	authenticationUrl = authenticationUrl.replace("http://", "https://");

	if (typeof RobloxLaunch.SeleniumTestMode === 'undefined') {
		visitUrl = visitUrl + "&testmode=false";
	}
	else {
		visitUrl = visitUrl + "&testmode=true";
	}

	if (typeof urchinTracker !== 'undefined') {
		urchinTracker("Visit/Try/" + type);
	}
	RobloxLaunch.state = RobloxLaunchStates.StartingClient;

	// Fire off to Google Analytics
	if (RobloxLaunch.googleAnalyticsCallback !== null)
		RobloxLaunch.googleAnalyticsCallback();

	var prefix = null;
	try {
		if (typeof window.external !== 'undefined' && window.external.IsRoblox2App && (visitUrl.indexOf("visit") != -1 || isEdit)) {
			//QT studio 2.0 - Call Window.External.StartGame for Build and Edit.
			window.external.StartGame(authenticationTicket, authenticationUrl, visitUrl);
		} else {
			prefix = "RobloxProxy/";
			var launcher = Roblox.Client.CreateLauncher(true);

			if (!launcher) {
				// Check to see if we're in Roblox Player (Property only defined in Roblox Player)
				try {
					parent.playFromUrl(visitUrl);
					return;
					// window.external.IsFullscreen;

				}
				catch (ex) {

				}

				if (Roblox.Client.isRobloxBrowser()) {
					try {
						// Must be in the roblox app
						window.external.StartGame(authenticationTicket, authenticationUrl, visitUrl);
					}

					catch (ex) {
						throw "window.external fallback failed, Roblox must not be installed or IE cannot access ActiveX";
					}
				}

				else {
					throw "launcher is null or undefined and external is missing";
				}
				//console.log("modal closed because we are in roblox player/ide");
				RobloxLaunch.state = RobloxLaunchStates.None;
				$.modal.close();
			}
			else {
				//launcher is non-null
				prefix = "RobloxProxy/StartGame/";
				try {
					try {
						if (window.ActiveXObject) { // IE
							launcher.AuthenticationTicket = authenticationTicket;
						} else {
							launcher.Put_AuthenticationTicket(authenticationTicket);
						}
						if (isEdit) {
							launcher.SetEditMode();
						}
					} catch(err) {
						// This is an older version of the Launcher. Ignore the error
					}
					try {
						if (Roblox.Client._silentModeEnabled) {
							launcher.SetSilentModeEnabled(true);
							if (Roblox.VideoPreRoll.videoInitialized && Roblox.VideoPreRoll.isPlaying()) {
								Roblox.Client.SetStartInHiddenMode(true); // if possible...
							}
							//console.log("videoInitialized: " + Roblox.VideoPreRoll.videoInitialized + ", videoCompleted: " + Roblox.VideoPreRoll.videoCompleted);
							launcher.StartGame(authenticationUrl, visitUrl);
							RobloxLaunch.CheckGameStarted(launcher);
						} else {
							throw "silent mode is disabled, fall back";
						}
					} catch(err) {
						// Silent bootstrapper not supported, fall back
						launcher.StartGame(authenticationUrl, visitUrl);
						if (Roblox.Client._bringAppToFrontEnabled) {
							try {
								launcher.BringAppToFront();
							} catch(e) {
							}
						}
						Roblox.Client.ReleaseLauncher(launcher, true, false);
						//console.log("modal closed because there was an error with launcher");
						$.modal.close();
					}
				} catch(err) {
					Roblox.Client.ReleaseLauncher(launcher, true, false);
					throw err;
				}
				//Roblox.Client.ReleaseLauncher(launcher, true, false);
			}
		}
	}
	catch (err) {
		var message = err.message;

		if ((message === "User cancelled") && (typeof urchinTracker !== 'undefined')) {
			urchinTracker("Visit/UserCancelled/" + type);
			return false;
		}
		try {
			var y = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (err3) {
			message = "FailedXMLHTTP/" + message;
		}

		if (!Roblox.Client.isRobloxBrowser()) {
			if (typeof urchinTracker !== 'undefined') {
				urchinTracker("Visit/Redirect/" + prefix + encodeURIComponent(message));
			}
			window.location = RobloxLaunch.launchGamePage;
		}
		else if (typeof urchinTracker !== 'undefined') {
			urchinTracker("Visit/Fail/" + prefix + encodeURIComponent(message));
		}

		return false;
	}
	if (typeof urchinTracker !== 'undefined') {
		urchinTracker("Visit/Success/" + type);
	}
	return true;
};

RobloxLaunch.CheckGameStarted = function (launcher) {
    var rbxLauncher = RobloxLaunch.launcher;
    if (rbxLauncher === null) {
        rbxLauncher = new RBX.PlaceLauncher("PlaceLauncherStatusPanel");  // this should probably not be hard-coded
        rbxLauncher._showDialog();
        rbxLauncher._updateStatus(0);  // maybe not the best function reuse, but it will do
    }

    var started = false;

    function doCheck() {
        var gotNewLauncher = false;
        try {
            // note, IsGameStarted/Get_GameStarted only returns true for the first run after a game starts
            // so once it returns true, don't check anymore.
            if (!started) {
                if (window.ActiveXObject) {
                    started = launcher.IsGameStarted;
                } else {
                    started = launcher.Get_GameStarted();
                }
            }
            

            // If started and either there is no video preroll or the video is complete 
            if (started && !Roblox.VideoPreRoll.isPlaying()) {
                //console.log("Closing modal. " + Roblox.VideoPreRoll.videoInitialized ? "videoInitialized" : "" + " " + Roblox.VideoPreRoll.videoCompleted ? "videoCompleted" : "");
                MadStatus.stop("Connecting to Players...");
                RobloxLaunch.state = RobloxLaunchStates.None;
                $.modal.close();
                rbxLauncher._cancelled = true;   // cancel outstanding game requests
                if (Roblox.Client._hiddenModeEnabled) {
                    Roblox.Client.UnhideApp();
                }
                if (Roblox.Client._bringAppToFrontEnabled) {
                    try {
                        launcher.BringAppToFront();
                    }
                    catch (e) { } 
                }
                Roblox.Client.ReleaseLauncher(launcher, true, false);
            } else {
                if (!rbxLauncher._cancelled) {
                    setTimeout(doCheck, 1000);
                }
            }
        }
        catch (ex) {
            if (!rbxLauncher._cancelled) {
                setTimeout(doCheck, 1000);
            }
        }
    }
    doCheck();
};

RobloxLaunch.CheckRobloxInstall = function (installPath) {
	if (!Roblox.Client.IsRobloxInstalled()) {
		window.location = installPath;
	}
	else {
		Roblox.Client.Update();
		return true;
	}
};

RBX.PlaceLauncher = function (modalDialogueID) {
    this._cancelled = false;
    this._popupID = modalDialogueID;
    this._popup = $('#' + modalDialogueID);
};

RBX.PlaceLauncher.prototype =
{
    _showDialog: function () {
        this._cancelled = false;
        _popupOptions = {
            escClose: true,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" }
        };
        if (this._popupID == "PlaceLauncherStatusPanel") {
            if (Roblox.VideoPreRoll && Roblox.VideoPreRoll.showVideoPreRoll && !Roblox.VideoPreRoll.isExcluded()) {
                this._popup = $("#videoPrerollPanel");
                _popupOptions.onShow = function (dialog) {
                    Roblox.VideoPreRoll.correctIEModalPosition(dialog);
                    Roblox.VideoPreRoll.start();
                };
                _popupOptions.onClose = function (dialog) { Roblox.VideoPreRoll.close(); };
                _popupOptions.closeHTML = '<a href="#" class="ImageButton closeBtnCircle_35h ABCloseCircle VprCloseButton"></a>';
            }
            else {
                this._popup = $("#" + this._popupID);
                // we want to log cases where VPR should have shown but didn't 
                _popupOptions.onClose = function (dialog) { Roblox.VideoPreRoll.logVideoPreRoll(); $.modal.close(); };
            }
        }
        // http://www.ericmmartin.com/projects/simplemodal/
        this._popup.modal(_popupOptions);

        // bind our cancel button
        var RBXPlaceLauncher = this;
        $('.CancelPlaceLauncherButton').click(function () { RBXPlaceLauncher.CancelLaunch(); });
        $('.CancelPlaceLauncherButton').show();
    },
    _reportDuration: function (duration, result) {
        $.ajax({
            type: "GET",
            async: true,
            cache: false,
            timeout: 50000,
            url: "/Game/JoinRate.ashx?c=" + RobloxLaunch.clientMetricType + "&r=" + result + "&d=" + duration,
            success: function (data) {
            }
        });
    },
    _onGameStatus: function (result) {
        if (this._cancelled) {
            //report length of time between click of join and canceling joining a game.
            var c_duration = new Date().getTime() - RobloxLaunch.timer.getTime();
            this._reportDuration(c_duration, "Cancel");
            return;
        }

        this._updateStatus(result.status);

        if (result.status === 2) {
            RobloxLaunch.StartGame(result.joinScriptUrl, "Join", result.authenticationUrl, result.authenticationTicket);
            //$.modal.close();

            //report length of time between click of join and successfully joining a game.
            var s_duration = new Date().getTime() - RobloxLaunch.timer.getTime();
            this._reportDuration(s_duration, "Success");

        }
        else if (result.status < 2 || result.status === 6) {
            // Try again
            var onSuccess = function (result, context) { context._onGameStatus(result); };
            var onError = function (result, context) { context._onGameError(result); };
            var self = this;
            var call = function () {
                RobloxPlaceLauncherService.CheckGameJobStatus(result.jobId, onSuccess, onError, self);
            };
            window.setTimeout(call, 2000);
        } else if (result.status === 4) { //error 
            //report length of time between click of join and failed joining a game.
            var f_duration = new Date().getTime() - RobloxLaunch.timer.getTime();
            this._reportDuration(f_duration, "Failure");

        }
    },
    _updateStatus: function (status) {
        // Madlib status
        if (!MadStatus.running) {
            MadStatus.init($(this._popup).find('.MadStatusField'), $(this._popup).find('.MadStatusBackBuffer'), 2000, 800);
            MadStatus.start();
        }
        switch (status) {
            case 0:
                break;
            case 1:
                MadStatus.manualUpdate("A server is loading the game...", true);
                break;
            case 2:
                MadStatus.manualUpdate("The server is ready. Joining the game...", true);
                break;
            case 3:
                MadStatus.manualUpdate("Joining games is temporarily disabled while we upgrade. Please try again soon.", false);
                break;
            case 4:
                MadStatus.manualUpdate("An error occurred. Please try again later.", false);
                break;
            case 5:
                MadStatus.manualUpdate("The game you requested has ended.", false);
                break;
            case 6:
                MadStatus.manualUpdate("The game you requested is currently full. Waiting for an opening...", true, false);
                break;
            case 7:
                MadStatus.manualUpdate("Roblox is updating. Please wait...", true);
                break;
            case 8:
                MadStatus.manualUpdate("Requesting a server", true);
                break;
            default:
                MadStatus.stop("Connecting to Players...");
        }

        $(this._popup).find('.MadStatusStarting').css("display", 'none');
        $(this._popup).find('.MadStatusSpinner').css("visibility", ((status === 3 || status === 4 || status === 5) ? 'hidden' : 'visible'));
        //$(this._popup).find('#WaitingContainer').css("display", (status === 0 ? 'inline' : 'none'));
        //$(this._popup).find('#Waiting').css("display", (status === 0 ? 'inline' : 'none'));
        //$(this._popup).find('#Loading').css("display", (status === 1 ? 'inline' : 'none'));
        // $(this._popup).find('#Joining').css("display", (status === 2 ? 'inline' : 'none'));
        //$(this._popup).find('#Expired').css("display", (status === 3 ? 'inline' : 'none'));
        //$(this._popup).find('#Error').css("display", (status === 4 ? 'inline' : 'none'));
        //$(this._popup).find('#GameEnded').css("display", (status === 5 ? 'inline' : 'none'));
        //$(this._popup).find('#GameFull').css("display", (status === 6 ? 'inline' : 'none'));
        //$(this._popup).find('#Updating').css("display", (status === 7 ? 'inline' : 'none'));
        //$(this._popup).find('#Updated').css("display", (status === 8 ? 'inline' : 'none'));
    },
    _onGameError: function (result) {
        this._updateStatus(4);
    },
    _startUpdatePolling: function (joinGameDelegate) {
        try {
            RobloxLaunch.state = RobloxLaunchStates.Upgrading;
            var launcher = Roblox.Client.CreateLauncher(true);

            if (window.ActiveXObject)
                var result = launcher.IsUpToDate;
            else
                result = launcher.Get_IsUpToDate();

            if (result || result === undefined) {
                try {
                    launcher.PreStartGame();
                }
                catch (e)
                { }

                Roblox.Client.ReleaseLauncher(launcher, true, false);
                RobloxLaunch.state = RobloxLaunchStates.StartingServer;
                joinGameDelegate();
                return;
            }

            //Now we need to poll until it is finished
            var onSuccess = function (result, launcher, context) { context._onUpdateStatus(result, launcher, joinGameDelegate); };
            var onError = function (result, context) { context._onUpdateError(result); };
            var self = this;

            this.CheckUpdateStatus(onSuccess, onError, launcher, joinGameDelegate, self);
        }
        catch (e) {
            //alert("Missing IsUpToDate, falling back");
            Roblox.Client.ReleaseLauncher(launcher, true, false);
            //Something went wrong, fall back to the old method of Update + Join in parallel
            joinGameDelegate();
        }
    },
    _onUpdateStatus: function (result, launcher, joinGameDelegate) {
        if (this._cancelled)
            return;

        this._updateStatus(result);

        if (result === 8) {
            Roblox.Client.ReleaseLauncher(launcher, true, true);
            Roblox.Client.Refresh();
            RobloxLaunch.state = RobloxLaunchStates.StartingServer;
            joinGameDelegate();
        }
        else if (result === 7) {
            // Try again
            var onSuccess = function (result, launcher, context) { context._onUpdateStatus(result, launcher, joinGameDelegate); };
            var onError = function (result, context) { context._onUpdateError(result); };
            var self = this;
            var call = function () { self.CheckUpdateStatus(onSuccess, onError, launcher, joinGameDelegate, self); };
            window.setTimeout(call, 2000);
        }
        else {
            alert("Unknown status from CheckUpdateStatus");
        }
    },
    _onUpdateError: function (result) {
        this._updateStatus(2);
    },

    CheckUpdateStatus: function (onSuccess, onError, launcher, joinGameDelegate, self) {
        try {
            launcher.PreStartGame();

            if (window.ActiveXObject)
                var result = launcher.IsUpToDate;
            else
                result = launcher.Get_IsUpToDate();

            if (result || result === undefined) {
                onSuccess(8, launcher, self);
            }
            else {
                onSuccess(7, launcher, self);
            }
        }
        catch (e) {
            //We have the old DLL loaded, so just pretend it was succesful like in the olden days
            onSuccess(8, launcher, self);
        }
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestGame: function (placeId, gender) {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function (result, context) { context._onGameStatus(result); };
        var onGameError = function (result, context) { context._onGameError(result); };
        var self = this;
        var isPartyLeader = false;

        if (typeof Party !== 'undefined' && typeof Party.AmILeader === 'function') {
            isPartyLeader = Party.AmILeader();
        }

        var gameDelegate = function () { RobloxPlaceLauncherService.RequestGame(placeId, isPartyLeader, gender, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestPlayWithParty: function (placeId, partyGuid, gameId) {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function (result, context) { context._onGameStatus(result); };
        var onGameError = function (result, context) { context._onGameError(result); };
        var self = this;

        var gameDelegate = function () { RobloxPlaceLauncherService.RequestPlayWithParty(placeId, partyGuid, gameId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestGroupBuildGame: function (placeId) {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function (result, context) { context._onGameStatus(result, true); };
        var onGameError = function (result, context) { context._onGameError(result); };
        var self = this;
        var gameDelegate = function () { RobloxPlaceLauncherService.RequestGroupBuildGame(placeId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestFollowUser: function (userId) {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function (result, context) { context._onGameStatus(result); };
        var onGameError = function (result, context) { context._onError(result); };
        var self = this;
        var gameDelegate = function () { RobloxPlaceLauncherService.RequestFollowUser(userId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestGameJob: function (placeId, gameId, gameJobId) {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function (result, context) { context._onGameStatus(result); };
        var onGameError = function (result, context) { context._onGameError(result); };
        var self = this;
        var gameDelegate = function () { RobloxPlaceLauncherService.RequestGameJob(placeId, gameId, gameJobId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    CancelLaunch: function () {
        this._cancelled = true;
        $.modal.close();
        //console.log("modal closed because launch was cancelled");
        return false;
    },

    dispose: function () {
        RBX.PlaceLauncher.callBaseMethod(this, 'dispose');
    }
};


}
/*
     FILE ARCHIVED ON 20:45:22 Apr 13, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:45:00 Jul 24, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.348
  captures_list: 211.731
  RedisCDXSource: 6.697
  exclusion.robots.policy: 0.331
  LoadShardBlock: 174.386 (3)
  PetaboxLoader3.resolve: 118.255 (3)
  PetaboxLoader3.datanode: 76.402 (4)
  load_resource: 49.547
  CDXLines.iter: 26.656 (3)
  esindex: 0.014
*/