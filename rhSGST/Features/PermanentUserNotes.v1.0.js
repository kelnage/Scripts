function PermanentUserNotes_SG(Context, Username, SteamID) {
    var I, PUNButton, PUNBox, PUNNotes, PUNSave, PUNSaving;
    Context.insertAdjacentHTML(
        "beforeend",
        "<div>" +
        "    <i class=\"fa fa-sticky-note\" id=\"PUNButton\" style=\"cursor: pointer;\"></i>" +
        "    <div class=\"is-hidden\" id=\"PUNBox\" style=\"background-color: rgba(60, 66, 77, 0.85); height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "        <div class=\"popup\" style=\"display: block; left: 0; margin: 64px auto 0; position: fixed; right: 0; width: 300px;\">" +
        "            <i class=\"popup__icon fa fa-sticky-note\" style=\"height: 48px; width: 48px;\"></i>" +
        "            <p class=\"popup__heading\">" +
        "                Edit user notes for <span class=\"popup__heading__bold\">" + Username + "</span>:" +
        "            </p>" +
        "            <textarea data-value=\"\" id=\"PUNNotes\" style=\"display: block; margin: 0 0 15px 0; max-height: 200px; min-height: 200px;\"></textarea>" +
        "            <div class=\"form__submit-button\" id=\"PUNSave\">" +
        "                <i class=\"fa fa-check-circle\"></i> Save Notes" +
        "            </div>" +
        "            <div class=\"form__saving-button is-disabled is-hidden\" id=\"PUNSaving\">" +
        "                <i class=\"fa fa-refresh fa-spin\"></i> Please wait..." +
        "            </div>" +
        "            <p class=\"popup__actions\">" +
        "                <a href=\"/account#rhSGST\">Manage</a>" +
        "                <span id=\"PUNClose\">Close</span>" +
        "            </p>" +
        "        </div>" +
        "    </div>" +
        "</div>"
    );
    PUNButton = document.getElementById("PUNButton");
    PUNBox = document.getElementById("PUNBox");
    PUNNotes = document.getElementById("PUNNotes");
    PUNSave = document.getElementById("PUNSave");
    PUNSaving = document.getElementById("PUNSaving");
    I = rhSGST.Storage.Users.length - 1;
    while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) {
        --I;
    }
    if (I >= 0) {
        PUNNotes.setAttribute("data-value", rhSGST.Storage.Users[I].Notes);
    }
    PUNButton.addEventListener("click", function() {
        PUNBox.classList.remove("is-hidden");
        PUNNotes.focus();
        PUNNotes.value = PUNNotes.getAttribute("data-value");
    });
    PUNSave.addEventListener("click", function() {
        PUNNotes.value = PUNNotes.value.trim();
        if (PUNNotes.value != PUNNotes.getAttribute("data-value")) {
            PUNSave.classList.add("is-hidden");
            PUNSaving.classList.remove("is-hidden");
            I = rhSGST.Storage.Users.length - 1;
            while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) {
                --I;
            }
            if (I >= 0) {
                rhSGST.Storage.Users[I].Notes = PUNNotes.value;
            } else {
                rhSGST.Storage.Users.push({
                    Username: Username,
                    SteamID: SteamID,
                    Notes: PUNNotes.value,
                    Tags: "",
                });
            }
            PUNNotes.setAttribute("data-value", PUNNotes.value);
            GM_setValue("rhSGST", rhSGST);
            PUNSaving.classList.add("is-hidden");
            PUNSave.classList.remove("is-hidden");
            PUNBox.classList.add("is-hidden");
        }
    });
    document.getElementById("PUNClose").addEventListener("click", function() {
        PUNBox.classList.add("is-hidden");
    });
    document.addEventListener("click", function(Event) {
        if (Event.target == PUNBox) {
            PUNBox.classList.add("is-hidden");
        }
    });
}

function PermanentUserNotes_ST(Context, SteamID) {
    var I, PUNButton, PUNBox, PUNNotes, PUNSave, PUNSaving;
    Context.insertAdjacentHTML(
        "afterbegin",
        "<div>" +
        "    <i class=\"fa fa-sticky-note\" id=\"PUNButton\" style=\"cursor: pointer; margin: 10px;\"></i>" +
        "    <div class=\"is_hidden\" id=\"PUNBox\" style=\"background-color: rgba(60, 66, 77, 0.85); height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "        <div class=\"popup\" style=\"display: block; left: 0; margin: 113px auto 0; position: fixed; right: 0; width: 300px;\">" +
        "            <div class=\"popup_summary\">" +
        "                <div class=\"popup_icon\">" +
        "                    <i class=\"fa fa-sticky-note\"></i>" +
        "                </div>" +
        "                <div class=\"popup_heading\">" +
        "                    <div class=\"popup_heading_h2\">" +
        "                        Edit user notes for <span class=\"popup_heading_h1\">" + SteamID + "</span>:" +
        "                    </div>" +
        "                </div>" +
        "            </div>" +
        "            <textarea data-value=\"\" id=\"PUNNotes\" style=\"display: block; margin: 0 0 15px 0; max-height: 200px; min-height: 200px;\"></textarea>" +
        "            <div style=\"display: flex; justify-content: center; margin: 0 0 15px 0;\">" +
        "                <div class=\"btn_action green\" id=\"PUNSave\" style=\"padding: 7px 49px;\">" +
        "                    <i class=\"fa fa-check\"></i>" +
        "                    <span>Save Notes</span>" +
        "                </div>" +
        "                <div class=\"btn_action grey is_saving is_hidden\" id=\"PUNSaving\" style=\"padding: 7px 49px;\">" +
        "                    <i class=\"fa fa-circle-o-notch fa-spin\"></i>" +
        "                    <span>Saving...</span>" +
        "                </div>" +
        "            </div>" +
        "            <p class=\"popup_actions\">" +
        "                <a href=\"https://www.steamgifts.com/account#rhSGST\">Manage</a>" +
        "                <span id=\"PUNClose\">Close</span>" +
        "            </p>" +
        "        </div>" +
        "    </div>" +
        "</div>"
    );
    PUNButton = document.getElementById("PUNButton");
    PUNBox = document.getElementById("PUNBox");
    PUNNotes = document.getElementById("PUNNotes");
    PUNSave = document.getElementById("PUNSave");
    PUNSaving = document.getElementById("PUNSaving");
    I = rhSGST.Storage.Users.length - 1;
    while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) {
        --I;
    }
    if (I >= 0) {
        PUNNotes.setAttribute("data-value", rhSGST.Storage.Users[I].Notes);
    }
    PUNButton.addEventListener("click", function() {
        PUNBox.classList.remove("is_hidden");
        PUNNotes.focus();
        PUNNotes.value = PUNNotes.getAttribute("data-value");
    });
    PUNSave.addEventListener("click", function() {
        PUNNotes.value = PUNNotes.value.trim();
        if (PUNNotes.value != PUNNotes.getAttribute("data-value")) {
            PUNSave.classList.add("is_hidden");
            PUNSaving.classList.remove("is_hidden");
            I = rhSGST.Storage.Users.length - 1;
            while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) {
                --I;
            }
            if (I >= 0) {
                rhSGST.Storage.Users[I].Notes = PUNNotes.value;
                PUNNotes.setAttribute("data-value", PUNNotes.value);
                GM_setValue("rhSGST", rhSGST);
                PUNSave.classList.remove("is_hidden");
                PUNSaving.classList.add("is_hidden");
                PUNBox.classList.add("is_hidden");
            } else {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://www.steamgifts.com/go/user/" + SteamID,
                    onload: function(Response) {
                        rhSGST.Storage.Users.push({
                            Username: Response.finalUrl.split("/user/")[1],
                            SteamID: SteamID,
                            Notes: PUNNotes.value,
                            Tags: "",
                        });
                        PUNNotes.setAttribute("data-value", PUNNotes.value);
                        GM_setValue("rhSGST", rhSGST);
                        PUNSave.classList.remove("is_hidden");
                        PUNSaving.classList.add("is_hidden");
                        PUNBox.classList.add("is_hidden");
                    }
                });
            }
        }
    });
    document.getElementById("PUNClose").addEventListener("click", function() {
        PUNBox.classList.add("is_hidden");
    });
    document.addEventListener("click", function(Event) {
        if (Event.target == PUNBox) {
            PUNBox.classList.add("is_hidden");
        }
    });
}
