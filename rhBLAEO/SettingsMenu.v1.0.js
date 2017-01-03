function SettingsMenu() {
    var Navigation, Item;
    Navigation = document.getElementsByClassName("nav-pills")[0];
    Navigation.insertAdjacentHTML(
        "beforeend",
        "<li><a href=\"#rhBLAEO\">rhBLAEO</a></li>"
    );
    Item = Navigation.lastElementChild;
    Item.addEventListener("click", function() {
        window.location.hash = "#rhBLAEO";
        loadMenu();
    });
    if (window.location.href.match("#rhBLAEO")) {
        loadMenu();
    }

    function loadMenu() {
        var Container, APIKey, Save;
        Navigation.getElementsByClassName("active")[0].classList.remove("active");
        Item.classList.add("active");
        Container = document.getElementsByClassName("col-sm-9")[0];
        Container.innerHTML =
            "<div class=\"form-group\">" +
            "    <label class=\"control-label\">API Key</label>" +
            "    <input class=\"form-control\" type=\"text\">" +
            "</div>" +
            "<div>" +
            "    <button class=\"btn btn-primary\" type=\"submit\">Save</button>" +
            "</div>";
        APIKey = Container.firstElementChild.lastElementChild;
        if (rhBLAEO.Storage.APIKey) {
            APIKey.value = rhBLAEO.Storage.APIKey;
        }
        Save = Container.lastElementChild.firstElementChild;
        Save.addEventListener("click", function() {
            rhBLAEO.Storage.APIKey = APIKey.value;
            GM_setValue("rhBLAEO", rhBLAEO);
            window.location.reload();
        });
    }
}
