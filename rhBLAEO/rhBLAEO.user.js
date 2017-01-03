// ==UserScript==
// @name rhBLAEO
// @namespace revilheart
// @author revilheart
// @description Adds some cool features to BLAEO.
// @version 1.0
// @match http://backlog-deepness.rhcloud.com/*
// @match https://backlog-deepness.rhcloud.com/*
// @grant GM_xmlhttpRequest
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @require https://github.com/revilheart/Scripts/raw/master/rhBLAEO/SettingsMenu.v1.0.js
// @require https://github.com/revilheart/Scripts/raw/master/rhBLAEO/ThemeListChecker.v1.0.js
// @run-at document-idle
// ==/UserScript==

var rhBLAEO;
rhBLAEO = {
    Features: {
        TLC: {
            Name: "Theme List Checker",
            Enabled: true,
        },
    },
    Storage: {
        TLCList: null,
        TLCGames: [],
        UserID: null,
        SteamID: null,
        APIKey: null,
        OwnedGames: null,
    },
};
if (GM_getValue("rhBLAEO")) {
    rhBLAEO = GM_getValue("rhBLAEO");
} else {
    GM_setValue("rhBLAEO", rhBLAEO);
}
if (window.location.href.match("/settings/")) {
    SettingsMenu();
}
if (rhBLAEO.Storage.APIKey) {
    ThemeListChecker();
}
document.addEventListener("turbolinks:load", function() {
    if (window.location.href.match("/settings/")) {
        SettingsMenu();
    }
    if (rhBLAEO.Storage.APIKey) {
        ThemeListChecker();
    }
});
