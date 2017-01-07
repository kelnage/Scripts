var PUTUsers, PUTBox, PUTHeading, PUTTags, PUTSave, PUTSaveIcon, PUTSaveText, PUTSaving;
GM_addStyle(
    ".PUTDisplay {" +
    "    color: inherit;" +
    "    font-size: 10px;" +
    "    font-weight: bold;" +
    "}" +
    ".PUTDisplay * {" +
    "    background-color: rgba(255, 255, 255, 0.5);" +
    "    border: 1px solid rgba(60, 66, 77, 0.5);" +
    "    border-radius: 5px;" +
    "    display: inline-block;" +
    "    padding: 1px 2px;" +
    "}" +
    ".PUTDisplay *:not(:first-child) {" +
    "    margin-left: 5px;" +
    "}"
);

function PermanentUserTags_SG() {    
    document.body.insertAdjacentHTML(
        "beforeend",
        "<div style=\"background-color: rgba(60, 66, 77, 0.85); display: none; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "    <div class=\"popup\" style=\"display: block; left: 0; margin: 64px auto; position: fixed; right: 0; width: 300px;\">" +
        "        <i class=\"popup__icon fa fa-tag\" style=\"height: 48px; width: 48px;\"></i>" +
        "        <p class=\"popup__heading\">" +
        "            Edit user tags for <span class=\"popup__heading__bold\"></span>:" +
        "        </p>" +
        "        <input type=\"text\" style=\"display: block;\">" +
        "        <div class=\"form__input-description\" style=\"margin-bottom: 15px; margin-top: 5px; text-align: left; \">Use commas to separate tags, for example: Tag1,Tag2,...</div>" +
        "        <div class=\"form__submit-button\">" +
        "            <i class=\"fa fa-check-circle\"></i> Save Tags" +
        "        </div>" +
        "        <div class=\"form__saving-button is-disabled is-hidden\">" +
        "            <i class=\"fa fa-refresh fa-spin\"></i> Please wait..." +
        "        </div>" +
        "        <p class=\"popup__actions\">" +
        "            <a href=\"/account#rhSGST\">Manage</a>" +
        "            <span>Close</span>" +
        "        </p>" +
        "    </div>" +
        "</div>"
    );
    PUTUsers = [];
    PUTBox = document.body.lastElementChild;
    PUTHeading = PUTBox.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
    PUTTags = PUTHeading.parentNode.nextElementSibling;
    PUTSave = PUTTags.nextElementSibling.nextElementSibling;
    PUTSaving = PUTSave.nextElementSibling;
    PUTSave.addEventListener("click", function() {
        PUTTags.value = PUTTags.value.replace(/[,\s]+,[,\s]+|[,\s]+,|,[,\s]+/g, ",").replace(/^,|,$/g, "").trim();
        if (PUTTags.value != PUTTags.getAttribute("data-value")) {
            PUTSave.classList.toggle("is-hidden");
            PUTSaving.classList.toggle("is-hidden");
            editPUTTags_SG(function() {
                GM_setValue("rhSGST", rhSGST);
                PUTSaving.classList.toggle("is-hidden");
                PUTSave.classList.toggle("is-hidden");
                closePUTBox();
            });
        }
    });
    PUTSaving.nextElementSibling.lastElementChild.addEventListener("click", function() { closePUTBox(); });
    document.addEventListener("click", function(Event) { if (Event.target == PUTBox) closePUTBox(); });
}

function PermanentUserTags_ST() {
    var Context;
    Context = document.getElementsByClassName("page_outer_wrap")[0];
    Context.insertAdjacentHTML(
        "beforeend",
        "<div style=\"background-color: rgba(60, 66, 77, 0.85); display: none; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "    <div class=\"popup\" style=\"display: block; left: 0; margin: 113px auto; position: fixed; right: 0; width: 300px;\">" +
        "        <div class=\"popup_summary\">" +
        "            <div class=\"popup_icon\">" +
        "                <i class=\"fa fa-tag\"></i>" +
        "            </div>" +
        "            <div class=\"popup_heading\">" +
        "                <div class=\"popup_heading_h2\">" +
        "                    Edit user tags for <span class=\"popup_heading_h1\"></span>:" +
        "                </div>" +
        "            </div>" +
        "        </div>" +
        "        <div class=\"popup_description\" style=\"text-align: center;\">" +
        "            <input type=\"text\" style=\"display: block;\">" +
        "            <div style=\"font-size: 11px; font-style: italic; margin-bottom: 15px; margin-top: 5px; text-align: left; \">Use commas to separate tags, for example: Tag1,Tag2,...</div>" +
        "            <div class=\"btn_action green\" style=\"display: inline-block; margin-bottom: 15px; min-width: 200px;\">" +
        "                <i class=\"fa fa-check\"></i>" +
        "                <span>Save Tags</span>" +
        "            </div>" +
        "        </div>" +
        "        <p class=\"popup_actions\">" +
        "            <a href=\"https://www.steamgifts.com/account#rhSGST\">Manage</a>" +
        "            <span>Close</span>" +
        "        </p>" +
        "    </div>" +
        "</div>"
    );
    PUTUsers = [];
    PUTBox = Context.lastElementChild;
    PUTHeading = PUTBox.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild;
    PUTTags = PUTHeading.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild;
    PUTSave = PUTTags.nextElementSibling.nextElementSibling;
    PUTSaveIcon = PUTSave.firstElementChild;
    PUTSaveText = PUTSaveIcon.nextElementSibling;
    PUTSave.addEventListener("click", function() {
        PUTTags.value = PUTTags.value.replace(/[,\s]+,[,\s]+|[,\s]+,|,[,\s]+/g, ",").replace(/^,|,$/g, "").trim();
        if (PUTTags.value != PUTTags.getAttribute("data-value")) {
            PUTSave.className = "btn_action grey is_saving";
            PUTSaveIcon.className = "fa fa-spin fa-circle-o-notch";
            PUTSaveText.textContent = "Saving...";
            editPUTTags_ST(function() {
                GM_setValue("rhSGST", rhSGST);
                PUTSave.className = "btn_action green";
                PUTSaveIcon.className = "fa fa-check";
                PUTSaveText.textContent = "Save Tags";
                closePUTBox();
            });
        }
    });
    PUTSave.parentNode.nextElementSibling.lastElementChild.addEventListener("click", function() { closePUTBox(); });
    document.addEventListener("click", function(Event) { if (Event.target == PUTBox) closePUTBox(); });
}

function closePUTBox() {
    if (MTMerge) {
        MTMerge.parentNode.parentNode.parentNode.remove();
        MTMerge = null;
    } else PUTUsers = [];
    PUTTags.value = "";
    PUTTags.setAttribute("data-value", "");
    PUTBox.style.display = "none";
}

function addPUTTags(Context, User) {
    var PUTButton, PUTDisplay;
    Context.insertAdjacentHTML(
        "afterend",
        "<a style=\"border: 0; display: inline-block; cursor: pointer; line-height: normal; " + (HostName == "www.steamgifts.com" || PathName == "/" ? "margin-left: 5px;" : "margin-right: 5px;") + " text-decoration: none;\">" +
        "    <i class=\"fa fa-tag\" style=\"margin: 0;\"></i>" +
        "    <span class=\"PUTDisplay\"></span>" +
        "</a>"
    );
    PUTButton = Context.nextElementSibling;
    PUTDisplay = PUTButton.lastElementChild;
    PUTButton.addEventListener("click", function() {
        if (MTCheckbox && MTCheckbox.checked) selectMTTags(false);
        PUTUsers.push(User);
        PUTHeading.textContent = User;
        PUTBox.style.display = "block";
        PUTTags.focus();
        PUTTags.value = PUTDisplay.getAttribute("data-value");
        PUTTags.setAttribute("data-value", PUTTags.value);
    });
}

function editPUTTags_SG(Callback, I) {
    var J;
    if (!I) I = 0;
    if (PUTUsers[I]) {
        J = rhSGST.Storage.Users.length - 1;
        while (J >= 0 && PUTUsers[I] != rhSGST.Storage.Users[J].Username) --J;
        if (J >= 0) {
            rhSGST.Storage.Users[J].Tags = MTMerge && MTMerge.checked ? rhSGST.Storage.Users[J].Tags + "," + PUTTags.value : PUTTags.value;
            setPUTDisplay(PUTUsers[I], rhSGST.Storage.Users[J].Tags);
            editPUTTags_SG(Callback, I + 1);
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: "/user/" + PUTUsers[I],
                onload: function(Response) {
                    rhSGST.Storage.Users.push({ Username: PUTUsers[I], SteamID: (new DOMParser()).parseFromString(Response.responseText, "text/html").getElementsByClassName("sidebar__shortcut-inner-wrap")[0].lastElementChild.href.split("/profiles/")[1], Notes: "", Tags: PUTTags.value });
                    setPUTDisplay(PUTUsers[I], PUTTags.value);
                    editPUTTags_SG(Callback, I + 1);
                },
            });
        }
    } else Callback();
}

function editPUTTags_ST(Callback, I) {
    var J;
    if (!I) I = 0;
    if (PUTUsers[I]) {
        J = rhSGST.Storage.Users.length - 1;
        while (J >= 0 && PUTUsers[I] != rhSGST.Storage.Users[J].SteamID) --J;
        if (J >= 0) {
            rhSGST.Storage.Users[J].Tags = MTMerge && MTMerge.checked ? rhSGST.Storage.Users[J].Tags + "," + PUTTags.value : PUTTags.value;
            setPUTDisplay(PUTUsers[I], rhSGST.Storage.Users[J].Tags);
            editPUTTags_ST(Callback, I + 1);
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://www.steamgifts.com/go/user/" + PUTUsers[I],
                onload: function(Response) {
                    var Username;
                    Username = Response.finalUrl.split("/user/");
                    rhSGST.Storage.Users.push({ Username: Username[1] ? Username[1] : "", SteamID: PUTUsers[I], Notes: "", Tags: PUTTags.value });
                    setPUTDisplay(PUTUsers[I], PUTTags.value);
                    editPUTTags_ST(Callback, I + 1);
                },
            });
        }
    } else Callback();
}

function setPUTDisplay(User, Tags) {
    var I, TagsHTML, PUTDisplay;
    TagsHTML = Tags ? "<span>" + Tags.replace(/,/g, "</span><span>") + "</span>" : "";
    I = Users[User].length - 1;
    while (I >= 0) {
        PUTDisplay = Users[User][I--].nextElementSibling.lastElementChild;
        PUTDisplay.innerHTML = TagsHTML;
        PUTDisplay.setAttribute("data-value", Tags);
    }
}
