function WhitelistBlacklistHighlighter(Context, User) {
    var I;
    I = Context.length - 1;
    if (User.Whitelisted) while (I >= 0) Context[I--].insertAdjacentHTML("beforebegin", "<i class=\"fa fa-fw fa-heart\" style=\"display: inline; margin: 0; margin-right: 5px;\"></i>");
    else if (User.Blacklisted) while (I >= 0) Context[I--].insertAdjacentHTML("beforebegin", "<i class=\"fa fa-fw fa-ban\" style=\"display: inline; margin: 0; margin-right: 5px;\"></i>");
}

function clearWBHList() {
    var I;
    I = rhSGST.Storage.Users.length - 1;
    while (I >= 0) {
        delete rhSGST.Storage.Users[I].Whitelisted;
        delete rhSGST.Storage.Users[I].Blacklisted;
        --I;
    }
}

function scanWBHList() {
    getWBHList("Whitelist", function() {
        getWBHList("Blacklist", function () {
            GM_setValue("rhSGST", rhSGST);
        });
    });
}

function getWBHList(ListName, Callback, I) {
    var ResponseText, Pagination;
    if (!I) I = 1;
    GM_xmlhttpRequest({
        method: "GET",
        url: "/account/manage/" + ListName.toLowerCase() + "/search?page=" + I,
        onload: function(Response) {
            ResponseText = (new DOMParser()).parseFromString(Response.responseText, "text/html");
            getWBHUser(ListName, ResponseText.getElementsByClassName("table__column__heading"), function() {
                Pagination = ResponseText.getElementsByClassName("pagination__navigation")[0];
                if (Pagination && !Pagination.lastElementChild.classList.contains("is-selected")) getWBHList(ListName, Callback, I + 1);
                else Callback();
            });
        }
    });
}

function getWBHUser(ListName, List, Callback, I) {
    var J, Username;
    if (typeof I == "undefined") I = List.length - 1;
    if (I >= 0) {
        Username = List[I].textContent;
        J = rhSGST.Storage.Users.length - 1;
        while (J >= 0 && Username != rhSGST.Storage.Users[J].Username) --J;
        if (J >= 0) {
            rhSGST.Storage.Users[J][ListName + "ed"] = true;
            getWBHUser(ListName, List, Callback, I - 1);
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: "/user/" + Username,
                onload: function(Response) {
                    rhSGST.Storage.Users.push({ Username: Username, SteamID: (new DOMParser()).parseFromString(Response.responseText, "text/html").getElementsByClassName("sidebar__shortcut-inner-wrap")[0].lastElementChild.href.split("/profiles/")[1], Notes: "", Tags: "" });
                    rhSGST.Storage.Users[rhSGST.Storage.Users.length - 1][ListName + "ed"] = true;
                    getWBHUser(ListName, List, Callback, I - 1);
                }
            });
        }
    } else Callback();
}
