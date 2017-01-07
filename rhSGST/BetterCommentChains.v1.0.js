function BetterCommentChains(Context) {
    var I, Chains;
    Chains = Context.getElementsByClassName(SG ? "comment__children" : "comment_children");
    I = Chains.length - 1;
    while (I >= 0) addBCCLink(Chains[I].children, SG ? Chains[I--].parentNode.firstElementChild : Chains[I--].parentNode);
}

function addBCCLink(Chain, Parent) {
    var I, Username, ID, Chained;
    I = Chain.length;
    if (I > 0) {
        if (SG) Username = Parent.firstElementChild.getAttribute("href") ? Parent.firstElementChild.getAttribute("href").split("/user/")[1] : "Deleted";
        else {
            Username = Parent.firstElementChild.className == "comment_inner" ? Parent.firstElementChild : Parent.firstElementChild.nextElementSibling;
            Username = Username.getAttribute("data-username") ? Username.getAttribute("data-username") : "Deleted";
        }
        ID = SG ? Parent.firstElementChild.nextElementSibling.id : Parent.id;
        while (I > 0) {
            if (SG) Chained = Chain[--I].firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
            else Chained = Chain[--I].firstElementChild.className == "comment_inner" ? Chain[I].firstElementChild.firstElementChild : Chain[I].firstElementChild.nextElementSibling.firstElementChild;
            Chained.insertAdjacentHTML(
                "beforeend",
                "<a href=\"#" + ID + "\" style=\"color: rgb(107, 122, 140); margin-left: 5px;\">@" + Username + "</a>"
            );
        }
    }
}
