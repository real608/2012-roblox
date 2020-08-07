const gameTemplate = `<div style="float:left;" title="Catalog Heaven | 3M Visits" class="GameItemContainer">
<div class="GameItem">
    <div class="AlwaysShown"> 
        <a href="/Game.aspx?id=26838733" style="text-decoration: none"><img src="https://www.roblox.com/thumbs/asset.ashx?width=160&height=100&assetid=26838733"></a>
        <div class="GameName" style="font-weight:bold;font-size:12px;overflow: hidden;white-space: nowrap;">
            <a href="/web/20120512235315mp_/https://www.roblox.com/Catalog-Heaven-3M-Visits-place?id=26838733">Catalog Heaven | 3M Visits</a>
        </div>
        <div class="PlayerCount" style="color:Red;float:left;">
            1,126 players online
        </div>
        <div class="GenreIcons" style="float:right;">
            <img class="GenreIcon" alt="Tutorial" src="/img/GenreIcons/Tutorial.gif">
            <img class="GearIcon" alt="No gear allowed" src="/img/NoSuitcase16x16.png">
        </div>
        <div class="CreatorName" style="clear: both; display: none;">
            by <a href="/User.aspx?ID=5600283">Seranok</a>
        </div>
    </div>
    <div class="HoverShown" style="display: none;/*! display: block; */">
        <div class="StatsPlayed">
            Played 3,362,200 times
        </div>
        <div class="StatsFavorited">
            Favorited 101,663 times
        </div>
        <div class="StatsUpdated">
            Updated 4 hours ago
        </div>
    </div>
</div>
</div>`;
let isGenreSearchEnabled = false;
const gameData = {
    maxRows: 16,
    isKeywordSuggestionEnabled: false,
    genreFilter: 'All',
    startRows: 0,
    keyword: '',
};
let gContent = $('#games-inner-content').empty();
let areGamesLoading = false;
const loadGames = () => {
    if (areGamesLoading) {
        return
    }
    areGamesLoading = true;
    web.post('/games/search', gameData).then(d => {
        console.log('games', d);
        if (d.games.length < gameData.maxRows) {
            $('#GamesContentNextNavButton').hide();
            if (d.games.length === 0) {
                gContent.append(`<p>Your query returned 0 results.</p>`);
                // ew
                return;
            }
        } else {
            $('#GamesContentNextNavButton').show();
        }
        for (const game of d.games) {
            if (game.isSponsored) {
                continue;
            }
            let genreIcon = '';
            if (game.genre) {
                genreIcon = `<img class="GenreIcon" alt="${game.genre}" src="/img/GenreIcons/${game.genre.replace(/ /g, '').replace(/\-/g, '')}.png">`;
            }
            gContent.append(`<div style="float:left;" title="${game.name}" class="GameItemContainer">
            <div class="GameItem">
                <div class="AlwaysShown"> 
                    <a href="/Game.aspx?id=${game.placeId}" style="text-decoration: none"><img src="https://www.roblox.com/thumbs/asset.ashx?width=160&height=100&assetid=${game.placeId}"></a>
                    <div class="GameName" style="font-weight:bold;font-size:12px;overflow: hidden;white-space: nowrap;">
                        <a href="/Game.aspx?id=${game.placeId}">${game.name}</a>
                    </div>
                    <div class="PlayerCount" style="color:Red;float:left;">
                        ${numberFormat(game.playerCount)} players online
                    </div>
                    <div class="GenreIcons" style="float:right;">
                        ${genreIcon}
                        <img class="GearIcon" alt="No gear allowed" src="/img/NoSuitcase16x16.png">
                    </div>
                    <div class="CreatorName" style="clear: both; display: none;">
                        by <a href="/${game.creatorType === 'Group' ? '/Group/Group' : '/User'}.aspx?ID=${game.creatorId}">${game.creatorName}</a>
                    </div>
                </div>
                <div class="HoverShown" style="display: none;/*! display: block; */">
                    <div class="StatsPlayed">
                        Played ${numberFormat(game.visits)} times
                    </div>
                    <!--
                    <div class="StatsFavorited">
                        Favorited 101,663 times
                    </div>
                    -->
                    <div class="StatsUpdated">
                        Updated ${moment(game.updated).fromNow()}
                    </div>
                </div>
            </div>
            </div>`);
        }
    }).finally(() => {
        areGamesLoading = false;
        $('#searchbox').removeAttr('disabled');
    })
}

$(document).ready(function () {
    loadGames();
});

$(document).on('click', '#GamesContentNextNavButton', function (e) {
    e.preventDefault();
    if (areGamesLoading) {
        return;
    }
    gContent.empty();
    gameData.startRows += (gameData.maxRows + 1);
    loadGames();
    let currentPage = Math.floor(gameData.startRows / gameData.maxRows) + 1;
    console.log('currently on page', currentPage);
    $('#GamesContentCurrPageNum').text('Page ' + currentPage);
    $('#GamesContentPrevNavButton').show();
});

$('#GamesContentPrevNavButton').hide();
$(document).on('click', '#GamesContentPrevNavButton', function (e) {
    e.preventDefault();
    if (areGamesLoading) {
        return;
    }
    gContent.empty();
    gameData.startRows -= (gameData.maxRows + 1);
    loadGames();
    let currentPage = Math.floor(gameData.startRows / gameData.maxRows) + 1;
    console.log('currently on page', currentPage);
    $('#GamesContentCurrPageNum').text('Page ' + currentPage);
    if (currentPage === 1) {
        $('#GamesContentPrevNavButton').hide();
    }
});

function resetSearchContraints() {
    gContent.empty();
    gameData.startRows = 0;
    $('#GamesContentPrevNavButton').hide();
    $('#GamesContentCurrPageNum').text('Page 1');
    $('#searchbox').attr('disabled', 'disabled');
}
let genreSearchText = '';
let currentTimeout;
$('#searchbox').on('keydown', function (e) {
    console.log('key down');
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
        let searchText = $('#searchbox').val();
        if (isGenreSearchEnabled) {
            searchText = genreSearchText + ' ' + searchText;
        }
        if (!searchText && gameData['keyword'] === searchText) {
            return;
        }
        gameData['keyword'] = searchText;
        resetSearchContraints();

        loadGames();
        gContent.empty();
    }, 1000)
});

$(document).on('click', '.GamesGenre', function (e) {
    e.preventDefault();
    if (areGamesLoading) {
        return;
    }
    $('.SelectedGenre').removeClass('SelectedGenre');
    $(this).addClass('SelectedGenre');
    $('#GenreDescriptionPanelGenresInfoText').text($(this).attr('genresinfotext'));
    let searchGenre = $(this).attr('genre').replace(/-/g, ' ');
    console.log('searching', searchGenre);
    if (searchGenre === 'all') {
        isGenreSearchEnabled = false;
        gameData['keyword'] = '';
        resetSearchContraints();
        loadGames();
        return;
    }
    genreSearchText = searchGenre;
    let searchBoxVal = $('#searchbox').val();
    if (!searchBoxVal) {
        gameData['keyword'] = genreSearchText;
    } else {
        console.log('search box val exixts');
        gameData['keyword'] = genreSearchText + ' ' + searchBoxVal;
    }
    isGenreSearchEnabled = true;
    resetSearchContraints();
    loadGames();
});