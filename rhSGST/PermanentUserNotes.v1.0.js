function PermanentUserNotes_SG(Context, Username, SteamID) {
    var I, PUNButton, PUNBox, PUNNotes, PUNSave, PUNSaving;
    Context.insertAdjacentHTML(
        "beforeend",
        "<div>" +
        "    <a>" +
        "        <i class=\"fa fa-sticky-note\"></i>" +
        "    </a>" +
        "    <div style=\"background-color: rgba(60, 66, 77, 0.85); display: none; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "        <div class=\"popup\" style=\"display: block; left: 0; margin: 64px auto; position: fixed; right: 0; width: 300px;\">" +
        "            <i class=\"popup__icon fa fa-sticky-note\" style=\"height: 48px; width: 48px;\"></i>" +
        "            <p class=\"popup__heading\">" +
        "                Edit user notes for <span class=\"popup__heading__bold\">" + Username + "</span>:" +
        "            </p>" +
        "            <textarea style=\"display: block; height: 200px; margin-bottom: 15px; max-height: 200px;\"></textarea>" +
        "            <div class=\"form__submit-button\">" +
        "                <i class=\"fa fa-check-circle\"></i> Save Notes" +
        "            </div>" +
        "            <div class=\"form__saving-button is-disabled is-hidden\">" +
        "                <i class=\"fa fa-refresh fa-spin\"></i> Please wait..." +
        "            </div>" +
        "            <p class=\"popup__actions\">" +
        "                <a href=\"/account#rhSGST\">Manage</a>" +
        "                <span>Close</span>" +
        "            </p>" +
        "        </div>" +
        "    </div>" +
        "</div>"
    );
    PUNButton = Context.lastElementChild.firstElementChild;
    PUNBox = PUNButton.nextElementSibling;
    PUNNotes = PUNBox.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling;
    I = rhSGST.Storage.Users.length - 1;
    while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) --I;
    PUNNotes.setAttribute("data-value", I >= 0 ? rhSGST.Storage.Users[I].Notes : "");
    PUNButton.addEventListener("click", function() {
        PUNBox.style.display = "block";
        PUNNotes.focus();
        PUNNotes.value = PUNNotes.getAttribute("data-value");
    });
    PUNSave = PUNNotes.nextElementSibling;
    PUNSaving = PUNSave.nextElementSibling;
    PUNSave.addEventListener("click", function() {
        PUNNotes.value = PUNNotes.value.trim();
        if (PUNNotes.value != PUNNotes.getAttribute("data-value")) {
            PUNSave.classList.toggle("is-hidden");
            PUNSaving.classList.toggle("is-hidden");
            I = rhSGST.Storage.Users.length - 1;
            while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) --I;
            if (I >= 0) rhSGST.Storage.Users[I].Notes = PUNNotes.value;
            else rhSGST.Storage.Users.push({ Username: Username, SteamID: SteamID, Notes: PUNNotes.value, Tags: "" });
            PUNNotes.setAttribute("data-value", PUNNotes.value);
            GM_setValue("rhSGST", rhSGST);
            PUNSaving.classList.toggle("is-hidden");
            PUNSave.classList.toggle("is-hidden");
            PUNBox.style.display = "none";
        }
    });
    PUNSaving.nextElementSibling.lastElementChild.addEventListener("click", function() { PUNBox.style.display = "none"; });
    document.addEventListener("click", function(Event) { if (Event.target == PUNBox) PUNBox.style.display = "none"; });
}

function PermanentUserNotes_ST(Context, SteamID) {
    var I, Username, PUNButton, PUNBox, PUNNotes, PUNSave, PUNSaveIcon, PUNSaveText;
    Context.insertAdjacentHTML(
        "afterbegin",
        "<div>" +
        "    <i class=\"fa fa-sticky-note\" style=\"cursor: pointer; margin: 10px;\"></i>" +
        "    <div style=\"background-color: rgba(60, 66, 77, 0.85); display: none; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "        <div class=\"popup\" style=\"display: block; left: 0; margin: 113px auto; position: fixed; right: 0; width: 300px;\">" +
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
        "            <div class=\"popup_description\" style=\"text-align: center;\">" +
        "                <textarea style=\"display: block; margin-bottom: 15px; max-height: 200px; min-height: 200px;\"></textarea>" +
        "                <div class=\"btn_action green\" style=\"display: inline-block; margin-bottom: 15px; min-width: 200px;\">" +
        "                    <i class=\"fa fa-check\"></i>" +
        "                    <span>Save Notes</span>" +
        "                </div>" +
        "            </div>" +
        "            <p class=\"popup_actions\">" +
        "                <a href=\"https://www.steamgifts.com/account#rhSGST\">Manage</a>" +
        "                <span>Close</span>" +
        "            </p>" +
        "        </div>" +
        "    </div>" +
        "</div>"
    );
    PUNButton = Context.firstElementChild.firstElementChild;
    PUNBox = PUNButton.nextElementSibling;
    PUNNotes = PUNBox.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
    I = rhSGST.Storage.Users.length - 1;
    while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) --I;
    PUNNotes.setAttribute("data-value", I >= 0 ? rhSGST.Storage.Users[I].Notes : "");
    PUNButton.addEventListener("click", function() {
        PUNBox.style.display = "block";
        PUNNotes.focus();
        PUNNotes.value = PUNNotes.getAttribute("data-value");
    });
    PUNSave = PUNNotes.nextElementSibling;
    PUNSaveIcon = PUNSave.firstElementChild;
    PUNSaveText = PUNSaveIcon.nextElementSibling;
    PUNSave.addEventListener("click", function() {
        PUNNotes.value = PUNNotes.value.trim();
        if (PUNNotes.value != PUNNotes.getAttribute("data-value")) {
            PUNSave.className = "btn_action grey is_saving";
            PUNSaveIcon.className = "fa fa-spin fa-circle-o-notch";
            PUNSaveText.textContent = "Saving...";
            I = rhSGST.Storage.Users.length - 1;
            while (I >= 0 && SteamID != rhSGST.Storage.Users[I].SteamID) --I;
            if (I >= 0) {
                rhSGST.Storage.Users[I].Notes = PUNNotes.value;
                closePUNBox_ST();
            }
            else {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://www.steamgifts.com/go/user/" + SteamID,
                    onload: function(Response) {
                        Username = Response.finalUrl.split("/user/");
                        rhSGST.Storage.Users.push({ Username: Username[1] ? Username[1] : "", SteamID: SteamID, Notes: PUNNotes.value, Tags: "" });
                        closePUNBox_ST();
                    }
                });
            }
        }
    });
    PUNSave.parentNode.nextElementSibling.lastElementChild.addEventListener("click", function() { PUNBox.style.display = "none"; });
    document.addEventListener("click", function(Event) { if (Event.target == PUNBox) PUNBox.style.display = "none"; });

    function closePUNBox_ST() {
        PUNNotes.setAttribute("data-value", PUNNotes.value);
        GM_setValue("rhSGST", rhSGST);
        PUNSave.className = "btn_action green";
        PUNSaveIcon.className = "fa fa-check";
        PUNSaveText.textContent = "Save Notes";
        PUNBox.style.display = "none";
    }
}
