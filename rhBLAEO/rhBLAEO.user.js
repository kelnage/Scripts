// ==UserScript==
// @name rhBLAEO
// @namespace revilheart
// @author revilheart
// @description Adds some cool features to BLAEO.
// @version 1.1
// @match http://backlog-deepness.rhcloud.com/*
// @match https://backlog-deepness.rhcloud.com/*
// @grant GM_xmlhttpRequest
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @connect api.steampowered.com
// @require https://github.com/revilheart/Scripts/raw/master/rhBLAEO/SettingsMenu.v1.1.js
// @require https://github.com/revilheart/Scripts/raw/master/rhBLAEO/ThemeListChecker.v1.0.1.js
// @run-at document-idle
// ==/UserScript==

var rhBLAEO;
rhBLAEO = { Features: { TLC: { Name: "Theme List Checker", Enabled: true } }, Storage: { SteamAPIKey: "", SteamID: "", Username: "?", OwnedGames: [], LastSync: "", TLCList: "", TLCGames: [] } };
if (GM_getValue("rhBLAEO")) rhBLAEO = GM_getValue("rhBLAEO");
else GM_setValue("rhBLAEO", rhBLAEO);
if (rhBLAEO.Storage.APIKey) {
    rhBLAEO.Storage.SteamAPIKey = rhBLAEO.Storage.APIKey;
    delete rhBLAEO.Storage.APIKey;
}
if (rhBLAEO.Storage.UserID) {
    rhBLAEO.Storage.Username = rhBLAEO.Storage.UserID;
    delete rhBLAEO.Storage.UserID;
}
if (window.location.href.match("/settings/")) SettingsMenu();
if (rhBLAEO.Storage.SteamAPIKey) ThemeListChecker();
document.addEventListener("turbolinks:load", function() {
    if (window.location.href.match("/settings/")) SettingsMenu();
    if (rhBLAEO.Storage.SteamAPIKey) ThemeListChecker();
});
