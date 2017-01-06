var PUTUsernames, PUTBox, PUTHeading, PUTTags, PUTSave, PUTSaving;
function PermanentUserTags() {
    GM_addStyle(
        ".PUTDisplay {" +
        "    color: inherit;" +
        "    font-size: 10px;" +
        "    font-weight: bold;" +
        "    line-height: normal;" +
        "    vertical-align: middle;" +
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
    document.body.insertAdjacentHTML(
        "beforeend",
        "<div style=\"background-color: rgba(60, 66, 77, 0.85); display: none; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 999;\">" +
        "    <div class=\"popup\" style=\"display: block; font: 12px Arial, sans-serif; left: 0; margin: 64px auto; position: fixed; right: 0; width: 300px;\">" +
        "        <i class=\"popup__icon fa fa-tag\" style=\"color: rgb(50, 72, 98); font-size: 48px; height: 48px; line-height: normal; margin-bottom: 20px; width: 48px;\"></i>" +
        "        <p class=\"popup__heading\">" +
        "            Edit user tags for <span class=\"popup__heading__bold\"></span>:" +
        "        </p>" +
        "        <input type=\"text\" style=\"display: block; font-size: 12px;\">" +
        "        <div class=\"form__input-description\" style=\"margin-bottom: 15px; margin-top: 5px; text-align: left; \">Use commas to separate tags, for example: Tag1,Tag2,...</div>" +
        "        <div class=\"form__submit-button\">" +
        "            <i class=\"fa fa-check-circle\" style=\"color: inherit; margin: 0;\"></i> Save Tags" +
        "        </div>" +
        "        <div class=\"form__saving-button is-disabled is-hidden\">" +
        "            <i class=\"fa fa-refresh fa-spin\" style=\"color: inherit; margin: 0;\"></i> Please wait..." +
        "        </div>" +
        "        <p class=\"popup__actions\" style=\"line-height: normal;\">" +
        "            <a href=\"/account#rhSGST\" style=\"color: inherit;\">Manage</a>" +
        "            <span>Close</span>" +
        "        </p>" +
        "    </div>" +
        "</div>"
    );
    PUTUsernames = [];
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
            editPUTTags(function() {
                GM_setValue("rhSGST", rhSGST);
                PUTSave.classList.toggle("is-hidden");
                PUTSaving.classList.toggle("is-hidden");
                closePUTBox();
            });
        }
    });
    PUTSaving.nextElementSibling.lastElementChild.addEventListener("click", function() { closePUTBox(); });
    document.addEventListener("click", function(Event) { if (Event.target == PUTBox) closePUTBox(); });
}

function closePUTBox() {
    PUTTags.value = "";
    PUTTags.removeAttribute("data-value");
    if (MTMerge) {
        MTMerge.parentNode.parentNode.parentNode.remove();
        MTMerge = null;
    } else PUTUsernames = [];
    PUTBox.style.display = "none";
}

function addPUTTags(Context, Username) {
    var PUTButton, PUTDisplay;
    Context.insertAdjacentHTML(
        "afterend",
        "<a style=\"border: 0; display: inline-block; cursor: pointer; line-height: normal; margin-left: 5px; text-decoration: none;\">" +
        "    <i class=\"fa fa-tag\" style=\"margin: 0;\"></i>" +
        "    <span class=\"PUTDisplay\"></span>" +
        "</a>"
    );
    PUTButton = Context.nextElementSibling;
    PUTDisplay = PUTButton.lastElementChild;
    PUTButton.addEventListener("click", function() {
        if (MTCheckbox && MTCheckbox.checked) selectMTTags(false);
        PUTUsernames.push(Username);
        PUTHeading.textContent = Username;
        PUTBox.style.display = "block";
        PUTTags.focus();
        PUTTags.value = PUTDisplay.getAttribute("data-value");
        PUTTags.setAttribute("data-value", PUTTags.value);
    });
}

function editPUTTags(Callback, I) {
    var J;
    if (!I) I = 0;
    if (PUTUsernames[I]) {
        J = rhSGST.Storage.Users.length - 1;
        while (J >= 0 && PUTUsernames[I] != rhSGST.Storage.Users[J].Username) --J;
        if (J >= 0) {
            if (PUTTags.value) {
                rhSGST.Storage.Users[J].Tags = MTMerge && MTMerge.checked ? rhSGST.Storage.Users[J].Tags + "," + PUTTags.value : PUTTags.value;
                setPUTDisplay(PUTUsernames[I], rhSGST.Storage.Users[J].Tags);
            } else {
                delete rhSGST.Storage.Users[J].Tags;
                if (!rhSGST.Storage.Users[J].Notes && !rhSGST.Storage.Users[J].Whitelisted && !rhSGST.Storage.Users[J].Blacklisted) rhSGST.Storage.Users.splice(J, 1);
                setPUTDisplay(PUTUsernames[I], "");
            }
            editPUTTags(Callback, I + 1);
        } else if (PUTTags.value) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "/user/" + PUTUsernames[I],
                onload: function(Response) {
                    rhSGST.Storage.Users.push({ Username: PUTUsernames[I], SteamID: (new DOMParser()).parseFromString(Response.responseText, "text/html").getElementsByClassName("sidebar__shortcut-inner-wrap")[0].lastElementChild.href.split("profiles/")[1], Tags: PUTTags.value });
                    setPUTDisplay(PUTUsernames[I], PUTTags.value);
                    editPUTTags(Callback, I + 1);
                },
            });
        } else editPUTTags(Callback, I + 1);
    } else Callback();
}

function setPUTDisplay(Username, Tags) {
    var I, PUTDisplay;
    I = Users[Username].length - 1;
    while (I >= 0) {
        PUTDisplay = Users[Username][I--].nextElementSibling.lastElementChild;
        if (Tags) {
            PUTDisplay.innerHTML = "<span>" + Tags.replace(/,/g, "</span><span>") + "</span>";
            PUTDisplay.setAttribute("data-value", Tags);
        } else {
            PUTDisplay.innerHTML = "";
            PUTDisplay.removeAttribute("data-value");
        }
    }
}
