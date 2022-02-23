


const mobileTabletSideBarBtn = $('.Mobile-tablet-sidebar__btn')
const mobileTabletSideBar = $('.Mobile-tablet-menu-container')
const mobileTabletSideBarExit = $('.Mobile-tablet-menu__exit-btn')
const mobileTabletSideBarOverlay = $('.Mobile-tablet-menu-overlay')

mobileTabletSideBarBtn.onclick = function() {
    mobileTabletSideBar.classList.add('Mobile-tablet-menu-container--active')
    musicPlayer.style.display = 'none'
}

mobileTabletSideBarExit.onclick = function() {
    mobileTabletSideBar.classList.remove('Mobile-tablet-menu-container--active')
    musicPlayer.style.display = 'flex'
}

mobileTabletSideBarOverlay.onclick =function () {
    mobileTabletSideBarExit.click()
}