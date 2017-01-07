var PUTUsernames, PUTBox, PUTHeading, PUTTags, PUTSave, PUTSaving;
function PermanentUserTags() {
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
                PUTSaving.classList.toggle("is-hidden");
                PUTSave.classList.toggle("is-hidden");
                closePUTBox();
            });
        }
    });
    PUTSaving.nextElementSibling.lastElementChild.addEventListener("click", function() { closePUTBox(); });
    document.addEventListener("click", function(Event) { if (Event.target == PUTBox) closePUTBox(); });
}

function closePUTBox() {
    if (MTMerge) {
        MTMerge.parentNode.parentNode.parentNode.remove();
        MTMerge = null;
    } else PUTUsernames = [];
    PUTTags.value = "";
    PUTTags.setAttribute("data-value", "");
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
            rhSGST.Storage.Users[J].Tags = MTMerge && MTMerge.checked ? rhSGST.Storage.Users[J].Tags + "," + PUTTags.value : PUTTags.value;
            setPUTDisplay(PUTUsernames[I], rhSGST.Storage.Users[J].Tags);
            editPUTTags(Callback, I + 1);
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: "/user/" + PUTUsernames[I],
                onload: function(Response) {
                    rhSGST.Storage.Users.push({ Username: PUTUsernames[I], SteamID: (new DOMParser()).parseFromString(Response.responseText, "text/html").getElementsByClassName("sidebar__shortcut-inner-wrap")[0].lastElementChild.href.split("/profiles/")[1], Notes: "", Tags: PUTTags.value });
                    setPUTDisplay(PUTUsernames[I], PUTTags.value);
                    editPUTTags(Callback, I + 1);
                },
            });
        } else editPUTTags(Callback, I + 1);
    } else Callback();
}

function setPUTDisplay(Username, Tags) {
    var I, TagsHTML, PUTDisplay;
    TagsHTML = Tags ? "<span>" + Tags.replace(/,/g, "</span><span>") + "</span>" : "";
    I = Users[Username].length - 1;
    while (I >= 0) {
        PUTDisplay = Users[Username][I--].nextElementSibling.lastElementChild;
        PUTDisplay.innerHTML = TagsHTML;
        PUTDisplay.setAttribute("data-value", Tags);
    }
}
