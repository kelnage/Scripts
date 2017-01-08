function FixedElements() {
    var Container, FeaturedContainer, Footer, Header, Page, Sidebar, SidebarAd, SidebarTop;
    Page = document.getElementsByClassName(SG ? "page__outer-wrap" : "page_outer_wrap")[0];
    if (rhSGST.Features.FE.H.Enabled) {
        Header = document.getElementsByTagName("header")[0];
        Header.style.height = "auto";
        Header.style.position = "fixed";
        Header.style.width = "100%";
        Header.style.zIndex = "999";
        if (SG) {
            FeaturedContainer = document.getElementsByClassName("featured__container")[0];
            if (FeaturedContainer) FeaturedContainer.style.paddingTop = Header.offsetHeight + "px";
            else Page.style.paddingTop = (Header.offsetHeight + 25) + "px";
        } else Page.style.paddingTop = Header.offsetHeight + "px";
    }
    if (SG && rhSGST.Features.FE.S.Enabled) {
        Sidebar = document.getElementsByClassName("sidebar")[0];
        if (Sidebar) {
            SidebarAd = Sidebar.getElementsByClassName("sidebar__mpu")[0];
            Container = Sidebar.nextElementSibling;
            if (window.scrollY + 64 >= Sidebar.offsetTop) fixSidebar();
            else document.addEventListener("scroll", fixSidebar);
        }
    }
    if (rhSGST.Features.FE.F.Enabled) {
        Footer = SG ? document.getElementsByClassName("footer__outer-wrap")[0] : document.getElementsByTagName("footer")[0];
        Footer.style.backgroundColor = "rgb(149, 164, 192)";
        Footer.style.bottom = "0";
        Footer.style.padding = "0";
        Footer.style.position = "fixed";
        Footer.style.width = "100%";
        Footer.style.zIndex = "999";
        Footer.firstElementChild.style.padding = "15px 25px";
        Page.style.paddingBottom = SG ? (Footer.offsetHeight + 25) + "px" : Footer.offsetHeight + "px";
    }
    function fixSidebar() {
        SidebarTop = Sidebar.offsetTop;
        if (window.scrollY + 64 >= Sidebar.offsetTop) {
            document.removeEventListener("scroll", fixSidebar);
            Sidebar.style.position = "fixed";
            Sidebar.style.top = (Header.offsetHeight + 25) + "px";
            Container.style.marginLeft = (Sidebar.offsetWidth + 25) + "px";
            if (SidebarAd) SidebarAd.style.display = "none";
            document.addEventListener("scroll", unfixSidebar);
        }
        function unfixSidebar() {
            if (window.scrollY + 64 < SidebarTop) {
                document.removeEventListener("scroll", unfixSidebar);
                Sidebar.style.position = "static";
                Container.style.marginLeft = "25px";
                if (SidebarAd) SidebarAd.style.display = "block";
                document.addEventListener("scroll", fixSidebar);
            }
        }
    }
}
