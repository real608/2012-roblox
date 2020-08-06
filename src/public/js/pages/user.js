const userId = parseInt($('#profile-info').attr('data-user-id'), 10);
/**
 * @type {"OBC" | "TBC" | "BC" | "NBC"}
 */
const bcLevel = $('#profile-info').attr('data-bc-level');
// load user games
const loadGames = () => {
    web.get('/games/users/' + userId + '/public').then(d => {
        const div = $('#user-places-accordion').empty();
        if (d.length === 0) {
            $('#ctl00_cphRoblox_rbxUserPlacesPane_ShowcaseFooter').append(`<div class="NoResults">

            <span class="NoResults">This user does not have any active places.</span>

        </div>`);
            return
        }
        for (let _game of d) {
            /**
             * @type {{id: number, name: string, rootPlace: {id: number}, created: string, updated: string, description: string}}
             */
            let game = _game;
            div.append(`            

<h3 class="AccordionHeader" style="display:block;">${game.name}</h3>
<div>
    <div class="Place">
        <div class="PlayStatus">
            <span class="PlaceAccessIndicator"></span>
        </div>
        <br>
        <div class="PlayOptions" style="display:block">
            <div class="VisitButtonsLeftCentered">
                <div class="VisitButton VisitButtonPlay" placeid="${game.rootPlaceId}">
                    <a class="ImageButton MultiplayerVisit"></a>
                </div>
            </div>
            <div class="VisitButtonsRight">
            
            
            
            </div>


            <script type="text/javascript">
                var play_placeId = ${game.rootPlaceId};
                function redirectPlaceLauncherToLogin() {
                    location.href = "/login/default.aspx?ReturnUrl=" + encodeURIComponent("/User.aspx?ID=${game.creator.id}");
                }
                function redirectPlaceLauncherToRegister() {
                    location.href = "/login/NewAge.aspx?ReturnUrl=" + encodeURIComponent("/User.aspx?ID=${game.creator.id}");
                }
                function fireEventAction(action) {
                    RobloxEventManager.triggerEvent('rbx_evt_popup_action', { action: action });
                }
                $(function() {
                    if (Roblox.Client.isIDE()) {
                        $('.VisitButtonEdit').show();
                    }
                });
            </script>


            <div style="width:470px;padding:10px;background:white;display:none;*position:absolute;*top:-150px">
                <div class="simplemodal-close">
                    <a class="ImageButton closeBtnCircle_35h" style="cursor: pointer;position:absolute; top:-15px; right:-15px"></a>
                </div>
                <div>
                    <div style="margin-bottom:15px;font-size:16px">
                        <div style="float:left;width:150px">
                            <img src="/img/bc-only.png"/>
                        </div>
                        <div style="float:left;width:295px;margin-left:5px">
                            <div style="font-size: 18px; font-weight: bold; padding:30px 0 10px;">
                                You need Builders Club for this!
                            </div>
                            <div>
                                Builders Club membership is required to play in this place.
                            </div>
                        </div>
                        <div style="clear:both; text-align:center;">
                            <a class="GreenButton" href="http://www.roblox.com/Upgrades/BuildersClubMemberships.aspx"><span>Upgrade Now</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Statistics">
            <span>Visited ${game.visits} times</span></div>
            <div class="Thumbnail" style="width:414px;overflow:hidden;position: relative">
                <a disabled="disabled" title="Sword Fights on the Heights IV" href="http://www.roblox.com/Game.aspx?ID=${game.rootPlaceId}" style="display:inline-block;height:230px;width:420px;"><img src="https://www.roblox.com/thumbs/asset.ashx?width=420&height=230&assetid=${game.rootPlaceId}" height="230" width="420" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="${game.name}"/></a>
                
            </div>
            <div>
                
                <div class="Description">
                    <span>${game.description || ''}</span>
                </div>
            </div>
        </div>
    </div>
        
            
            
            
            
            `);
        }
        $(document).ready(function () {
            div.accordion();
        });
    })
}
loadGames();

const nameToAssetType = {
    'Heads': 17,
    'Faces': 18,
    'Gear': 19,
    'Hats': 8,
    'T-Shirts': 2,
    'Shirts': 11,
    'Pants': 12,
    'Decals': 13,
    'Models': 10,
    'Places': 9,
    'Badges': 21,
    'Left Arms': 29,
    'Right Arms': 28,
    'Left Legs': 30,
    'Right Legs': 31,
    'Torsos': 27,
    'Packages': 32,
}



let assetTypeId = nameToAssetType.Hats;
let areAssetsLoading = false;
let userAssetsDiv = $('#ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList').empty();
let cursor = {
    next: '',
    previous: '',
}
let currentPage = 1;
let nextDiv = $('#inventory-next-page');
let previousDiv = $('#inventory-previous-page');

let isSimLoading = false;
const loadSimilarItems = () => {
    if (isSimLoading) {
        return;
    }
    isSimLoading = true;
    let simTable = $('#ctl00_cphRoblox_rbxUserAssetsPane_AssetRec_dlAssets').empty();
    web.get('/catalog/similar/' + assetTypeId).then(d => {
        let h = ``;
        for (const row of d) {
            h += '<tr>';
            for (const item of row) {
                h += `<td>
                <div class="PortraitDiv" style="width: 140px; height: 190px; overflow: hidden;"
                    visible="True">
                    <div class="AssetThumbnail">
                        <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetRec_dlAssets_ctl00_AssetThumbnailHyperLink"
                            title="Cadet Cap"
                            href="/Item.aspx?ID=${item.item.assetId}"
                            style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img
                                src="https://www.roblox.com/thumbs/asset.ashx?width=110&height=110&assetid=${item.item.assetId}"
                                height="110" width="110" border="0"
                                onerror="return Roblox.Controls.Image.OnError(this)"
                                alt="Cadet Cap" /></a>
                    </div>
                    <div class="AssetDetails">
                        <div class="AssetName">
                            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetRec_dlAssets_ctl00_AssetNameHyperLinkPortrait"
                                href="/Item.aspx?ID=${item.item.assetId}">${item.item.name}</a>
                        </div>
                        <div class="AssetCreator">
                            <span class="Label">Creator:</span> <span class="Detail"><a
                                    id="ctl00_cphRoblox_rbxUserAssetsPane_AssetRec_dlAssets_ctl00_CreatorHyperLinkPortrait"
                                    href="/${item.creator.creatorType === 'User' ? 'User' : 'Groups/Group'}.aspx?ID=${item.creator.creatorId}">${item.creator.name}</a></span>
                        </div>
                    </div>
                </div>
            </td>`;
            }
            h += '</tr>';
        }
        simTable.append(h);
    }).finally(() => {
        isSimLoading = false;
    })
}

const loadAssets = (cursorToUseForQuery = '') => {
    if (areAssetsLoading) {
        return;
    }
    areAssetsLoading = true;
    web.get('/inventory/users/' + userId + '/' + assetTypeId + '?mode=profile&cursor=' + cursorToUseForQuery).then(d => {
        loadSimilarItems();
        for (const row of d.data) {
            let t = userAssetsDiv.append('<tr></tr>');
            for (const item of row) {
                let bottomRow = '';
                if (item.serialNumber) {
                    // bottomRow = `<div class="AssetCreator"><span class="Label"></span> <span class="Detail">#${item.serialNumber}</span></div>`;
                }
                let limBadge = ``;
                if (item.itemRestrictions && item.itemRestrictions.includes('Limited')) {
                    limBadge = `<div style="position:relative;left:-22px;top:-13px;"><img src="/img/overlay_limited_big.png" style="width: 66px; height: 13px;"></div>`;
                } else if (item.itemRestrictions && item.itemRestrictions.includes('LimitedUnique')) {
                    // lim u badge
                    limBadge = `<div style="position:relative;left:-13px;top:-13px;"><img src="/img/overlay_limitedUnique_big.png" style="width: 84px; height: 13px;"></div>`;
                }
                let createdBy = ``;
                if (item.creatorName) {
                    createdBy = `
                    <div class="AssetCreator">
                        <span class="Label">Creator:</span> 
                        <span class="Detail">
                            <a href="/${item.creatorType === 'User' ? 'User' : 'Groups/Group'}.aspx?ID=${item.creatorTargetId}">${item.creatorName}</a>
                        </span>
                    </div>`;
                }
                t.append(`<td class="Asset" valign="top">
                <div style="padding: 5px">
                    <!-- Because of the nature of UpdatePanels, we can't use the control here.  Alternatively, we could
                         try to do something nifty with register startup scripts. -->


                    <div class="AssetThumbnail">
                        <a
                            title="${item.assetName}"
                            href="/Item.aspx?ID=${item.assetId}"
                            style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img
                                src="https://www.roblox.com/thumbs/asset.ashx?width=110&height=110&assetid=${item.assetId}"
                                height="110" width="110" border="0"
                                onerror="return Roblox.Controls.Image.OnError(this)"
                                alt="${item.assetName}" />
                            </a>
                            ${limBadge}
                    </div>
                    <div class="AssetDetails">
                        <div class="AssetName">
                            <a href="/Item.aspx?ID=${item.assetId}">${item.assetName}</a></div>
                        ${createdBy}
                        ${bottomRow}

                    </div>
                </div>
            </td>`);
            }
        }
        cursor.next = d.nextPageCursor;
        cursor.previous = d.previousPageCursor;

        if (cursor.next) {
            nextDiv.show();
        } else {
            nextDiv.hide();
        }

        if (cursor.previous) {
            previousDiv.show();
        } else {
            previousDiv.hide();
        }
        $('#ctl00_cphRoblox_rbxUserAssetsPane_FooterPagerLabel').text('Page ' + currentPage);
    }).catch(err => {
        console.log(err);

        // if 403 or 401
        $('#UserAssetsPane').hide();
    }).finally(() => {
        areAssetsLoading = false;
    });
}
loadAssets();

nextDiv.on('click', function (e) {
    e.preventDefault();
    currentPage++;
    userAssetsDiv.empty();
    loadAssets(cursor.next);
});
previousDiv.on('click', function (e) {
    e.preventDefault();
    currentPage--;
    userAssetsDiv.empty();
    loadAssets(cursor.previous);
});

$(document).on('click', '.AssetsMenuItem', function (e) {
    e.preventDefault();
    if (areAssetsLoading) {
        return;
    }
    userAssetsDiv.empty();
    let type = $(this).find('.AssetsMenuButton').text();
    $(this).parent().find('.AssetsMenuItem_Selected').removeClass('AssetsMenuItem_Selected');
    $(this).addClass('AssetsMenuItem_Selected');
    cursor.next = '';
    cursor.previous = '';
    currentPage = 1;
    assetTypeId = nameToAssetType[type];
    loadAssets('');
    console.log(type);
});

const loadMiscProfileInfo = () => {
    web.get(`/users/${userId}/profile-info`).then(data => {
        if (bcLevel !== 'NBC') {
            let arr = data.robloxBadges.filter(val => {
                return val.length < 4;
            });
            if (!arr || !arr[0]) {
                arr = [];
                data.robloxBadges.push(arr);
            } else {
                arr = arr[0];
            }
            if (bcLevel === 'OBC') {
                arr.push('Outrageous Builders Club')
            } else if (bcLevel === 'TBC') {
                arr.push('Turbo Builders Club');
            } else if (bcLevel === 'BC') {
                arr.push('Builders Club');
            }
        }
        $('#ctl00_cphRoblox_rbxUserStatisticsPane_lPlaceVisitsStatistics').text(data.placeVisits || 0);
        let t = $('#ctl00_cphRoblox_rbxUserBadgesPane_dlBadges').empty();
        if (data.robloxBadges.length === 0) {
            t.parent().empty().append(`This user does not have any ROBLOX badges.`);
            return;
        }
        let badgeHtml = ``;
        for (const badgeRow of data.robloxBadges) {
            badgeHtml += `<tr>`;
            for (const badge of badgeRow) {
                badgeHtml += `<td><div class="Badge">
                <div class="BadgeImage"><a id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges_ctl00_hlHeader"
                        href="Badges.aspx"><img id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges_ctl00_iBadge"
                            src="/img/Badges/${badge.replace(/ /g, '')}.png?v=2"
                            alt="Test 1234"
                            style="height:75px;border-width:0px;" /></a></div>
                <div class="BadgeLabel"><a id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges_ctl00_HyperLink1"
                        href="Badges.aspx">${badge}</a></div>
            </div></td>`;
            }
            badgeHtml += '</tr>';
        }
        t.append(badgeHtml);
    })
}
loadMiscProfileInfo();

const loadPresenceInfo = () => {
    let userPresenceDiv = $('#user-presence');
    let offlineContent = `<span  class="UserOfflineMessage">[ Offline ]</span>`;
    let onlineContent = `<span class="UserOnlineMessage">[ Online ]</span>`;
    let playingContent = `<span class="UserOnlineMessage" style="color:green;">[ Playing ]</span>`;

    let presenceIdsArr = [];
    presenceIdsArr.push(userId);
    $('.OnlineStatus').each(function (i, item) {
        presenceIdsArr.push(parseInt($(item).attr('data-user-id')));
    });
    web.post('/presence/users/multi-get', {
        userIds: presenceIdsArr,
    }).then(d => {
        console.log(d);
        for (const pres of d) {
            if (pres.userId === userId) {
                console.log('found current user');
                if (pres.userPresenceType === 0) {
                    userPresenceDiv.append(offlineContent);
                } else {
                    userPresenceDiv.append(onlineContent);
                }
            } else {
                let friend = $('.OnlineStatus[data-user-id="' + pres.userId + '"]');
                if (pres.userPresenceType !== 0) {
                    friend.append(`<img
                    src="/img/online.png"
                    alt="This user is online."
                    style="border-width:0px;" />`);
                } else {
                    friend.append(`<img
                    src="/img/offline.png"
                    alt="This user is offline (last seen at ${moment(pres.lastOnline).fromNow()})."
                    style="border-width:0px;" />`);
                }
            }
        }
    })
}

$(document).ready(function () {
    loadPresenceInfo();
})

