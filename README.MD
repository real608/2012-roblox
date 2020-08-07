# 2012-roblox
This is an attempt to recreate the mid 2012 Roblox Website using Roblox's existing API, and HTML/JS/CSS/IMG files from archive.org

Currently, I consider this project to be in an early alpha. Practically 0% of the features I want this project to have are added, and breaking changes will occur daily.

# Goals
The goal of this project is to completely recreate the 2012 Roblox website with Roblox's APIs (and our own for services that no longer exist, such as the Forums and comments).

- Make the project easy to self host (such as through an executable), so that users don't have to visit unreliable and/or dangerous websites in order to use this service
- Recreate all known pages
- Auth
    - ✅ Allow signing up
    - Allow signing in with a username and password
    - ✅ Allow signing in through a cookie
    - ✅ Username reminder email form
    - ✅ Password reset email form
- Economy
    - ✅ Item page
    - ✅ Item purchase system (for collectibles and normal items)
    - Item selling system (for collectibles)
    - Item trading system/page
- Builders Club
    - ✅ Rename Premium450 to BC, Premium1000 to TBC, and Premium2200 to OBC
    - Allow purchasing of BC, TBC, and OBC
- Forum System
    - Allow project to use a custom base URL for the forums service, so that all projects hosted independantly can connect to one centralized forum
- Item comment and game comment system
    - Same base URL idea as forum system (above)
- Games
    - ✅ Games.aspx (sort, discovery, search, etc)
    - Game.aspx (info for games)
    - Join games without visiting roblox.com
        - This might be impossible (without a browser extension) - i have to investigate more
- Misc
    - ✅ OBC theme
    - Force avatars renders to be R6 (and prevent rthro) through new try on endpoints (or through ThreeJS)

# Non-goals
These are features that some people would love this project to have, however, they are either impossible, too time consuming, or just not something I want to implement:
- Tix (This would be impossible)
- Builders club hats (Again, sadly this is impossible)
- People page (Not really impossible but it would be difficult to add)
- Gifts/Contests
- Clans
- Guests
- Player points
- Custom game client (not impossible I suppose, especially with the help of an exploit program, but this isn't something I want to make)
- Parent accounts (Although likely not impossible, I don't want to bother with this)

## Get Started
1. Install node, install redis, clone this repo, cd into "www" and run `npm install`.

2. Next, create a file called "cookies.txt" in the root directory of the repo with at least one ".ROBLOSECURITY" cookie (with each cookie seperated by `\n` or `\r\n`).

3. Create a file called `config.json`in the "www" folder. Read `src/helpers/Config.ts` IWebsiteConfiguration for more information, but here's the gist of it:

```json
    {
        "cookiesKey": "Replace me with a secret key",
        "csrfKey": "Replace me with a DIFFERENT secret key",
        "redis": {
            "host": "127.0.0.1",
            "port": 6379,
            "keyPrefix": "prefixHere",
            "enableOfflineQueue": true
        }
    }

```

4. Run `npm run start:dev`

## Discord Server
I use the discord server to get suggestions from people, learn about bugs, share (and recieve) old videos/screenshots of the Roblox website in order to allow me to recreate pages more easily, and to chat.

Join the discord server here: discord.gg/S9apqS2

## ❌ Warning ❌
If you try to host this publicly, you will probably get smacked with a DMCA take-down notice or have your site taken down due to it being reported for phishing. Although I can't stop you from hosting it, it is recommended that you just keep this for personal use. 

Likewise, if you find someone hosting this project, I don't recommend providing your cookie or logging in since doing so can allow them to steal your account.

  

### License

---

This project is licensed under GNU GPLv3. See the "LICENSE" file for more information.

  

CERTAIN FILES COPYRIGHT INTERNET ARCHIVE. OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C. SECTION 108(a)(3)).
