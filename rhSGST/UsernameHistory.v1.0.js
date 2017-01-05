function UsernameHistory(Context, Username, SteamID) {
    var UHContainer, UHButton, UHBox;
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://script.google.com/macros/s/AKfycbwYyn2dwycQeajv2bQ921oNqtfm2iaXtmi7dsXubz5vZTGfDoHa/exec?Username=" + Username + "&SteamID=" + SteamID,
        onload: function(Response) {
            Context.insertAdjacentHTML(
                "afterend",
                "<div>" +
                "    <a>" +
                "        <i class=\"fa fa-caret-down\"></i>" +
                "    </a>" +
                "    <div style=\"background-color: rgba(60, 66, 77, 0.85); border: 1px solid rgb(60, 66, 77); display: none; margin-top: 5px; padding: 10px; position: absolute; text-align: center;\">" +
                "        <p style=\"color: rgba(255, 255, 255, 0.6); font-weight: bold;\">Username History</p>" +
                "        <br>" +
                "        <ul style=\"color: rgba(255, 255, 255, 0.4);\">" +
                "            <li>" + JSON.parse(Response.responseText).Usernames.replace(/\s/g, "</li><li>") + "</li>" +
                "        </ul>" +
                "    </div>" +
                "</div>"
            );
            UHContainer = Context.nextElementSibling;
            UHButton = UHContainer.firstElementChild;
            UHBox = UHButton.nextElementSibling;
            UHButton.addEventListener("click", function() {
                if (UHBox.style.display == "none") {
                    UHBox.style.display = "block";
                } else {
                    UHBox.style.display = "none";
                }
            });
            document.addEventListener("click", function(Event) {
                if (UHBox.style.display == "block" && !UHContainer.contains(Event.target)) {
                    UHBox.style.display = "none";
                }
            });
        },
    });
}
