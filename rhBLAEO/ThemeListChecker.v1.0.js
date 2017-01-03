function ThemeListChecker() {
    if (!rhBLAEO.Storage.UserID) {
        rhBLAEO.Storage.UserID = document.getElementsByClassName("navbar-btn")[0].href.split("/users/")[1];
        GM_setValue("rhBLAEO", rhBLAEO);
    }
    if (!rhBLAEO.Storage.SteamID) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "/users/" + rhBLAEO.Storage.UserID,
            onload: function(Response)
            {
                rhBLAEO.Storage.SteamID = (new DOMParser()).parseFromString(Response.responseText, "text/html").getElementsByClassName("btn-profile")[0].href.split("/profiles/")[1];
                GM_setValue("rhBLAEO", rhBLAEO);
                if (!rhBLAEO.Storage.OwnedGames) {
                    getOwnedGames(function() {
                        if (!rhBLAEO.Storage.TLCList) {
                            getTLCList(function() {
                                if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                                    checkTLCList();
                                }
                            });
                        } else if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                            checkTLCList();
                        }
                    });
                } else if (!rhBLAEO.Storage.TLCList) {
                    getTLCList(function() {
                        if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                            checkTLCList();
                        }
                    });
                } else if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                    checkTLCList();
                }
            },
        });
    } else if (!rhBLAEO.Storage.OwnedGames) {
        getOwnedGames(function() {
            if (!rhBLAEO.Storage.TLCList) {
                getTLCList(function() {
                    if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                        checkTLCList();
                    }
                });
            } else if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                checkTLCList();
            }
        });
    } else if (!rhBLAEO.Storage.TLCList) {
        getTLCList(function() {
            if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
                checkTLCList();
            }
        });
    } else if (window.location.href.match(rhBLAEO.Storage.TLCList)) {
        checkTLCList();
    }
}

function getOwnedGames(Callback) {
    var I, N, OwnedGames;
    rhBLAEO.Storage.OwnedGames = [];
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + rhBLAEO.Storage.APIKey + "&steamid=" + rhBLAEO.Storage.SteamID + "&format=json",
        onload: function(Response) {
            OwnedGames = JSON.parse(Response.responseText).response.games;
            for (I = 0, N = OwnedGames.length; I < N; ++I) {
                rhBLAEO.Storage.OwnedGames.push(OwnedGames[I].appid);
            }
            GM_setValue("rhBLAEO", rhBLAEO);
            Callback();
        },
    });
}

function getTLCList(Callback) {
    var CurrentDate, List;
    CurrentDate = new Date();
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://backlog-deepness.rhcloud.com/themes/2017-06" /*+ CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1)*/,
        onload: function(Response) {
            List = (new DOMParser()).parseFromString(Response.responseText, "text/html").querySelector("[id*='theme-list']");
            if (List) {
                rhBLAEO.Storage.TLCList = List.href.split("/posts/")[1];
            }
            GM_setValue("rhBLAEO", rhBLAEO);
            Callback();
        },
    });
}

function checkTLCList() {
    var I, N, Items, Item, AppID;
    Items = document.getElementsByClassName("panel-default")[0].getElementsByTagName("ul")[0].children;
    for (I = 0, N = Items.length; I < N; ++I) {
        Item = Items[I];
        AppID = parseInt(Item.firstElementChild.href.match(/\d+/)[0]);
        if (rhBLAEO.Storage.TLCGames.indexOf(AppID) < 0) {
            rhBLAEO.Storage.TLCGames.push(AppID);
            tagNew(Item);
            if (rhBLAEO.Storage.OwnedGames.indexOf(AppID) >= 0) {
                tagOwned(Item);
            }
        } else if (rhBLAEO.Storage.OwnedGames.indexOf(AppID) >= 0) {
            tagOwned(Item);
        }
    }
    tagStatus(Items, "Beaten", "#5cb85c", function() {
        tagStatus(Items, "Completed", "#5bc0de", function() {
            document.querySelector("[id*='counter']").innerHTML = "<font size=\"4\"><b>" + N + " Games</b></font>";
            GM_setValue("rhBLAEO", rhBLAEO);
        });
    });
}

function tagOwned(Item) {
    Item.insertAdjacentHTML(
        "beforeend",
        "<b style=\"color: #d9534f;\"> [Owned]</b>"
    );
}

function tagNew(Item) {
    Item.insertAdjacentHTML(
        "beforeend",
        "<b style=\"color: #555555;\"> [New]</b>"
    );
}

function tagStatus(Items, Status, Color, Callback) {
    var I, N, Item, AppID;
    GM_xmlhttpRequest({
        method: "GET",
        url: "/users/" + rhBLAEO.Storage.UserID + "/games/" + Status.toLowerCase(),
        onload: function(Response) {
            for (I = 0, N = Items.length; I < N; ++I) {
                Item = Items[I];
                AppID = Item.firstElementChild.href.match(/\d+/)[0];
                if ((new RegExp("/app/" + AppID)).exec(Response.responseText)) {
                    Item.insertAdjacentHTML(
                        "beforeend",
                        "<b style=\"color: " + Color + ";\"> [" + Status + "]</b>"
                    );
                }
            }
            Callback();
        },
    });
}
