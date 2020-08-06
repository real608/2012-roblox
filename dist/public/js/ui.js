Roblox = Roblox || {}
if (!Roblox.UI) {
    Roblox.UI = {};
    Roblox.UI.Loading = () => {
        $('body').prepend(`<div id="ProcessUiChange" class="modalPopup blueAndWhite" style="width: 300px;
        min-height: 50px; position: absolute;z-index:9999;left:25px;top:25px;">
        <div style="margin: 15px auto; text-align: center;
                    vertical-align: middle;">
        <img id="ctl00_cphRoblox_Image22" src="/img/ProgressIndicator2.gif" alt="Processing..." align="middle"
            style="border-width:0px;" />&nbsp;&nbsp; Processing. Please wait...
        ...
        </div>
        </div>`);
        $('#ProcessUIChange').modal({ overlayClose: true, opacity: 80, overlayCss: { backgroundColor: "#000" } });
    }
}
