var MTCheckbox, MTSelect, MTButton, MTCounter, MTMerge;

function MultiTag_SG(Context) {
    var I, MTUserCheckboxes;
    Context.insertAdjacentHTML(
        "afterend",
        "<div style=\"line-height: normal;\">" +
        "    <label class=\"switch\">" +
        "        <input type=\"checkbox\">" +
        "        <div class=\"slider round\"></div>" +
        "    </label>" +
        "    <div class=\"form__submit-button is-hidden\" style=\"line-height: normal; margin-left: 5px; padding: 0 5px;\">All</div>" +
        "    <a style=\"margin-left: 5px; opacity: 0.5;\">" +
        "        <i class=\"fa fa-tags\"></i>" +
        "        <div class=\"nav__notification is-hidden\" style=\"display: inline-block; font-family: Arial, sans-serif; font-weight: bold; line-height: normal; margin: 0; position: relative; text-shadow: none;\"></div>" +
        "    </a>" +
        "</div>"
    );
    MTCheckbox = Context.nextElementSibling.firstElementChild.firstElementChild;
    MTSelect = MTCheckbox.parentNode.nextElementSibling;
    MTSelect.addEventListener("click", function() {
        if (MTSelect.textContent == "All") selectMTTags(true);
        else selectMTTags(false);
    });
    MTButton = MTSelect.nextElementSibling;
    MTCounter = MTButton.lastElementChild;
    MTCheckbox.addEventListener("change", function() {
        if (!MTCheckbox.checked) selectMTTags(false);
        MTUserCheckboxes = document.getElementsByClassName("MTUserCheckbox");
        I = MTUserCheckboxes.length - 1;
        while (I >= 0) MTUserCheckboxes[I--].parentNode.classList.toggle("is-hidden");
        MTSelect.classList.toggle("is-hidden");
        MTCounter.textContent = 0;
        MTCounter.setAttribute("data-value", 0);
        MTCounter.classList.toggle("is-hidden");
    });
}

function MultiTag_ST(Context) {
    var I, MTUserCheckboxes;
    Context.insertAdjacentHTML(
        "afterend",
        "<div class=\"page_heading_btn\" style=\"padding: 5px 10px;\">" +
        "    <label class=\"switch\" style=\"margin: 0;\">" +
        "        <input type=\"checkbox\">" +
        "        <div class=\"slider round\"></div>" +
        "    </label>" +
        "    <div class=\"btn_action green is_hidden\" style=\"line-height: normal; margin: 0; margin-left: 5px; padding: 0 5px;\">All</div>" +
        "    <a style=\"margin-left: 5px; opacity: 0.5;\">" +
        "        <i class=\"fa fa-tags\" style=\"margin: 0;\"></i>" +
        "        <div class=\"message_count is_hidden\" style=\"display: inline-block; font-size: 11px; line-height: normal;\"></div>" +
        "    </a>" +
        "</div>"
    );
    MTCheckbox = Context.nextElementSibling.firstElementChild.firstElementChild;
    MTSelect = MTCheckbox.parentNode.nextElementSibling;
    MTSelect.addEventListener("click", function() {
        if (MTSelect.textContent == "All") selectMTTags(true);
        else selectMTTags(false);
    });
    MTButton = MTSelect.nextElementSibling;
    MTCounter = MTButton.lastElementChild;
    MTCheckbox.addEventListener("change", function() {
        if (!MTCheckbox.checked) selectMTTags(false);
        MTUserCheckboxes = document.getElementsByClassName("MTUserCheckbox");
        I = MTUserCheckboxes.length - 1;
        while (I >= 0) MTUserCheckboxes[I--].parentNode.classList.toggle("is_hidden");
        MTSelect.classList.toggle("is_hidden");
        MTCounter.textContent = 0;
        MTCounter.setAttribute("data-value", 0);
        MTCounter.classList.toggle("is_hidden");
    });
}

function addMTUserCheckbox(Context, Username) {
    Context.insertAdjacentHTML(
        "beforebegin",
        "<div class=\"" + (HostName == "www.steamgifts.com" ? "is-hidden" : "is_hidden") + "\" style=\"display: inline-block; margin-right: 5px;\">" +
        "    <input class=\"MTUserCheckbox\" type=\"checkbox\" data-value=\"" + Username + "\" style=\"vertical-align: middle; width: auto;\">" +
        "</div>"
    );
    Context.previousElementSibling.firstElementChild.addEventListener("change", function(Event) { checkMTUserCheckbox(Event.currentTarget); });
}

function checkMTUserCheckbox(MTUserCheckbox) {
    var I, J, Username;
    Username = MTUserCheckbox.getAttribute("data-value");
    I = MTCounter.getAttribute("data-value");
    J = PUTUsers.indexOf(Username);
    if (MTUserCheckbox.checked && J < 0) {
        PUTUsers.push(Username);
        ++I;
    } else if (!MTUserCheckbox.checked && J >= 0) {
        PUTUsers.splice(J, 1);
        --I;
    }
    MTCounter.textContent = I;
    MTCounter.setAttribute("data-value", I);
    if (I > 1 && !MTButton.getAttribute("data-value")) {
        MTButton.style.cursor = "pointer";
        MTButton.style.opacity = 1;
        MTButton.setAttribute("data-value", 1);
        MTButton.addEventListener("click", editMTTags);
    } else if (I <= 1 && MTButton.getAttribute("data-value")) {
        MTButton.style.cursor = "default";
        MTButton.style.opacity = 0.5;
        MTButton.removeAttribute("data-value");
        MTButton.removeEventListener("click", editMTTags);
    }
}

function selectMTTags(Select) {
    var I, MTUserCheckboxes, MTUserCheckbox;
    MTUserCheckboxes = document.getElementsByClassName("MTUserCheckbox");
    I = MTUserCheckboxes.length - 1;
    while (I >= 0) {
        MTUserCheckbox = MTUserCheckboxes[I--];
        if (MTUserCheckbox.checked != Select) {
            MTUserCheckbox.checked = Select;
            checkMTUserCheckbox(MTUserCheckbox);
        }
    }
    MTSelect.textContent = Select ? "None" : "All";
}

function editMTTags() {
    var Context;
    Context = PUTTags.nextElementSibling;
    Context.insertAdjacentHTML(
        "afterend",
        "<div style=\"margin-bottom: 15px; text-align: left;\">" +
        "    <div>" +
        "        <label class=\"switch\">" +
        "            <input type=\"checkbox\">" +
        "            <div class=\"slider round\"></div>" +
        "        </label>" +
        "        <span class=\"popup__description\" style=\"vertical-align: middle;\"> Merge</span>" +
        "    </div>" +
        "    <div class=\"form__input-description\" style=\"margin-top: 5px;\">Check this box if you want each user's individual tags to be merged with the new tags.</div>" +
        "</div>"
    );
    MTMerge = Context.nextElementSibling.firstElementChild.firstElementChild.firstElementChild;
    if (HostName == "www.steamgifts.com") PUTHeading.textContent = PUTUsers.length - 10 > 0 ? PUTUsers.slice(0, 10).join(", ") + ", and " + (PUTUsers.length - 10) + " more" : PUTUsers.slice(0, 10).join(", ");
    else PUTHeading.textContent = PUTUsers.length - 5 > 0 ? PUTUsers.slice(0, 5).join(", ") + ", and " + (PUTUsers.length - 5) + " more" : PUTUsers.slice(0, 5).join(", ");
    PUTBox.style.display = "block";
    PUTTags.focus();
}
