const userId = parseInt($('#profile-info').attr('data-user-id'), 10);
// load user games
const loadGames = () => {
    web.get('/games/users/' + userId + '/public').then(d => {
        const div = $('#user-places-accordion').empty();
        let _i = 0;
        for (let _game of d.data) {
            _i++;
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
                <div class="VisitButton VisitButtonPlay" placeid="${game.rootPlace.id}">
                    <a class="ImageButton MultiplayerVisit"></a>
                </div>
            </div>
            <div class="VisitButtonsRight">
            
            
            
            </div>


            <script type="text/javascript">
                var play_placeId = ${game.rootPlace.id};
                function redirectPlaceLauncherToLogin() {
                    location.href = "/login/default.aspx?ReturnUrl=" + encodeURIComponent("/User.aspx?ID=261");
                }
                function redirectPlaceLauncherToRegister() {
                    location.href = "/login/NewAge.aspx?ReturnUrl=" + encodeURIComponent("/User.aspx?ID=261");
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
            <span>Visited 5,073,753 times (36,157 last week)</span></div>
            <div class="Thumbnail" style="width:414px;overflow:hidden;position: relative">
                <a disabled="disabled" title="Sword Fights on the Heights IV" href="http://www.roblox.com/Game.aspx?ID=${game.rootPlace.id}" style="display:inline-block;height:230px;width:420px;"><img src="https://www.roblox.com/thumbs/asset.ashx?width=420&height=230&assetid=${game.rootPlace.id}" height="230" width="420" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="${game.name}"/></a>
                
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
const loadAssets = (cursorToUseForQuery = '') => {
    if (areAssetsLoading) {
        return;
    }
    areAssetsLoading = true;
    web.get('/inventory/users/' + userId + '/' + assetTypeId + '?mode=profile&cursor=' + cursorToUseForQuery).then(d => {
        console.log(d);
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