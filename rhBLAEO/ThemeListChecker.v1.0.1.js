function ThemeListChecker() {
    if (!rhBLAEO.Storage.TLCList) getTLCList();
    if (window.location.href.match(rhBLAEO.Storage.TLCList)) checkTLCList();
}

function getTLCList() {
    var CurrentDate, List;
    CurrentDate = new Date();
    CurrentDate = CurrentDate.getMonth() + 1 < 10 ? CurrentDate.getFullYear() + "-0" + (CurrentDate.getMonth() + 1) : CurrentDate.getFullYear() + "-" + (CurrentDate.getMonth() + 1);
    GM_xmlhttpRequest({
        method: "GET",
        url: "/themes/" + CurrentDate,
        onload: function(Response) {
            List = (new DOMParser()).parseFromString(Response.responseText, "text/html").querySelector("[id*='theme-list']");
            if (List) {
                rhBLAEO.Storage.TLCList = List.href.split("/posts/")[1];
                GM_setValue("rhBLAEO", rhBLAEO);
            }
        }
    });
}

function checkTLCList() {
    var I, Items, AppID;
    Items = document.getElementsByClassName("panel-default")[0].getElementsByTagName("ul")[0].children;
    I = Items.length - 1;
    while (I >= 0) {
        AppID = parseInt(Items[I].firstElementChild.href.match(/\d+/)[0]);
        if (rhBLAEO.Storage.TLCGames.indexOf(AppID) < 0) {
            rhBLAEO.Storage.TLCGames.push(AppID);
            tagNew(Items[I]);
            if (rhBLAEO.Storage.OwnedGames.indexOf(AppID) >= 0) tagOwned(Items[I]);
        } else if (rhBLAEO.Storage.OwnedGames.indexOf(AppID) >= 0) tagOwned(Items[I]);
        --I;
    }
    tagStatus(Items, "Beaten", "rgb(92 ,184, 92)", function() {
        tagStatus(Items, "Completed", "rgb(91, 192, 222)", function() {
            document.querySelector("[id*='counter']").innerHTML = "<font size=\"4\"><b>" + Items.length + " Games</b></font>";
            GM_setValue("rhBLAEO", rhBLAEO);
        });
    });
}

function tagOwned(Item) { Item.insertAdjacentHTML("beforeend", "<b style=\"color: rgb(217, 83, 79);\"> [Owned]</b>"); }
function tagNew(Item) { Item.insertAdjacentHTML("beforeend", "<b style=\"color: rgb(85, 85, 85);\"> [New]</b>"); }
function tagStatus(Items, Status, Color, Callback) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "/users/" + rhBLAEO.Storage.Username + "/games/" + Status.toLowerCase(),
        onload: function(Response) {
            var I, AppID;
            I = Items.length - 1;
            while (I >= 0) {
                AppID = Items[I].firstElementChild.href.match(/\d+/)[0];
                if ((new RegExp("/app/" + AppID)).exec(Response.responseText)) Items[I].insertAdjacentHTML("beforeend", "<b style=\"color: " + Color + ";\"> [" + Status + "]</b>");
                --I;
            }
            Callback();
        }
    });
}
