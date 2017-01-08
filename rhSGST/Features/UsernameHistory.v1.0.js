function UsernameHistory(Context, Username, SteamID) {
    var UHButton, UHBox;
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://script.google.com/macros/s/AKfycbwYyn2dwycQeajv2bQ921oNqtfm2iaXtmi7dsXubz5vZTGfDoHa/exec?Username=" + Username + "&SteamID=" + SteamID,
        onload: function(Response) {
            Context.insertAdjacentHTML(
                "afterend",
                "<div id=\"UHContainer\">" +
                "    <i class=\"fa fa-caret-down\" id=\"UHButton\" style=\"cursor: pointer;\"></i>" +
                "    <div class=\"is-hidden\" id=\"UHBox\" style=\"background-color: rgba(60, 66, 77, 0.85); border: 1px solid rgb(60, 66, 77); margin: 5px 0 0 0; padding: 10px; position: absolute; text-align: center;\">" +
                "        <div style=\"color: rgba(255, 255, 255, 0.6); font-weight: bold; margin: 0 0 10px 0;\">Username History</div>" +
                "        <ul style=\"color: rgba(255, 255, 255, 0.4);\">" +
                "            <li>" + JSON.parse(Response.responseText).Usernames.replace(/\s/g, "</li><li>") + "</li>" +
                "        </ul>" +
                "    </div>" +
                "</div>"
            );
            UHButton = document.getElementById("UHButton");
            UHBox = document.getElementById("UHBox");
            UHButton.addEventListener("click", function() {
                UHBox.classList.toggle("is-hidden");
            });
            document.addEventListener("click", function(Event) {
                if (!UHBox.classList.contains("is-hidden") && !document.getElementById("UHContainer").contains(Event.target)) {
                    UHBox.classList.add("is-hidden");
                }
            });
        },
    });
}
