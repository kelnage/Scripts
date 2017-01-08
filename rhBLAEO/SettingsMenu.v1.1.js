function SettingsMenu() {
    var Navigation, SMButton;
    Navigation = document.getElementsByClassName("nav-pills")[0];
    Navigation.insertAdjacentHTML("beforeend", "<li id=\"SMButton\"><a href=\"#rhBLAEO\">rhBLAEO</a></li>");
    SMButton = document.getElementById("SMButton");
    SMButton.addEventListener("click", function() {
        window.location.hash = "#rhBLAEO";
        loadMenu();
    });
    if (window.location.href.match("#rhBLAEO")) loadMenu();
    function loadMenu() {
        var SMSteamAPIKey, SMSave, SMLastSync, SMSync;
        Navigation.getElementsByClassName("active")[0].classList.remove("active");
        SMButton.classList.add("active");
        document.getElementsByClassName("col-sm-9")[0].innerHTML =
            "<div class=\"form-group\">" +
            "    <label class=\"control-label\">Steam API Key</label>" +
            "    <input class=\"form-control\" id=\"SMSteamAPIKey\" type=\"text\" value=\"" + rhBLAEO.Storage.SteamAPIKey + "\" style=\"margin: 0 0 10px;\">" +
            "    <div>" +
            "        <button class=\"btn btn-primary\" id=\"SMSave\" type=\"submit\">Save</button>" +
            "    </div>" +
            "</div>" +
            "<div class=\"form-group\">" +
            "    <label class=\"control=label\">Sync</label>" +
            "    <p>Your current username is <b id=\"SMUsername\">" + rhBLAEO.Storage.Username + "</b> and you have <b id=\"SMOwnedGames\">" + rhBLAEO.Storage.OwnedGames.length + "</b> games in your library, right?</p>" +
            "    <p>" +
            "        <i>Last synced <span id=\"SMLastSync\"></span>.</i>" +
            "    </p>" +
            "    <div>" +
            "        <button class=\"btn btn-primary\" id=\"SMSync\" type=\"submit\">Sync</button>" +
            "    </div>" +
            "</div>";
        SMSteamAPIKey = document.getElementById("SMSteamAPIKey");
        SMSave = document.getElementById("SMSave");
        SMSave.addEventListener("click", function() {
            rhBLAEO.Storage.SteamAPIKey = SMSteamAPIKey.value;
            save(sync);
        });
        SMLastSync = document.getElementById("SMLastSync");
        SMLastSync.textContent = rhBLAEO.Storage.LastSync ? (new Date(rhBLAEO.Storage.LastSync)).toLocaleString() : "never";
        SMSync = document.getElementById("SMSync");
        SMSync.addEventListener("click", sync);
        function save(Callback) {
            SMSave.textContent = "Saving...";
            if (rhBLAEO.Storage.Username == "?") rhBLAEO.Storage.Username = document.getElementsByClassName("navbar-btn")[0].href.split("/users/")[1];
            if (!rhBLAEO.Storage.SteamID) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "/users/" + rhBLAEO.Storage.Username,
                    onload: function(Response) {
                        rhBLAEO.Storage.SteamID = (new DOMParser()).parseFromString(Response.responseText, "text/html").getElementsByClassName("btn-profile")[0].href.split("/profiles/")[1];
                        SMSave.textContent = "Save";
                        Callback();
                    }
                });
            } else {
                SMSave.textContent = "Save";
                Callback();
            }
        }
        function sync() {
            SMSync.textContent = "Syncing...";
            syncStorage(function() {
                document.getElementById("SMUsername").textContent = rhBLAEO.Storage.Username;
                document.getElementById("SMOwnedGames").textContent = rhBLAEO.Storage.OwnedGames.length;
                SMLastSync.textContent = (new Date(rhBLAEO.Storage.LastSync)).toLocaleString();
                SMSync.textContent = "Sync";
            });
        }
    }
}

function syncStorage(Callback) {
    rhBLAEO.Storage.Username = document.getElementsByClassName("navbar-btn")[0].href.split("/users/")[1];
    rhBLAEO.Storage.OwnedGames = [];
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + rhBLAEO.Storage.SteamAPIKey + "&steamid=" + rhBLAEO.Storage.SteamID + "&format=json",
        onload: function(Response) {
            var I, OwnedGames;
            OwnedGames = JSON.parse(Response.responseText).response.games;
            I = OwnedGames.length - 1;
            while (I >= 0) rhBLAEO.Storage.OwnedGames.push(OwnedGames[I--].appid);
            rhBLAEO.Storage.LastSync = (new Date()).getTime();
            GM_setValue("rhBLAEO", rhBLAEO);
            Callback();
        }
    });
}
