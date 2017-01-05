function PermanentUserNotes(Context, Username, SteamID) {
    var I, N, Notes, PUNButton, PUNBox, PUNNotes, PUNSave, PUNSaving;
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
    Notes = "";
    for (I = 0, N = rhSGST.Storage.Users.length; I < N && SteamID != rhSGST.Storage.Users[I].SteamID; ++I);
    if (I < N) {
        Notes = rhSGST.Storage.Users[I].Notes;
    }
    PUNButton.addEventListener("click", function() {
        PUNBox.style.display = "block";
        PUNNotes.focus();
        PUNNotes.value = Notes;
    });
    PUNSave = PUNNotes.nextElementSibling;
    PUNSaving = PUNSave.nextElementSibling;
    PUNSave.addEventListener("click", function() {
        PUNNotes.value = PUNNotes.value.trim();
        if (PUNNotes.value != Notes) {
            PUNSave.classList.toggle("is-hidden");
            PUNSaving.classList.toggle("is-hidden");
            for (I = 0, N = rhSGST.Storage.Users.length; I < N && SteamID != rhSGST.Storage.Users[I].SteamID; ++I);
            if (I < N) {
                if (PUNNotes.value) {
                    rhSGST.Storage.Users[I].Notes = PUNNotes.value;
                } else if (!rhSGST.Storage.Users[I].Tags && !rhSGST.Storage.Users[I].Whitelisted && !rhSGST.Storage.Users[I].Blacklisted) {
                    rhSGST.Storage.Users.splice(I, 1);
                }
            } else if (PUNNotes.value) {
                rhSGST.Storage.Users.push({
                    Username: Username,
                    SteamID: SteamID,
                    Notes: PUNNotes.value,
                });
            }
            Notes = PUNNotes.value;
            GM_setValue("rhSGST", rhSGST);
            PUNSave.classList.toggle("is-hidden");
            PUNSaving.classList.toggle("is-hidden");
            PUNBox.style.display = "none";
        }
    });
    PUNSaving.nextElementSibling.lastElementChild.addEventListener("click", function() {
        PUNBox.style.display = "none";
    });
    document.addEventListener("click", function(Event) {
        if (Event.target == PUNBox) {
            PUNBox.style.display = "none";
        }
    });
}
