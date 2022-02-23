const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const sideBarBtn = $('.sidebar__menu')
const sideBar = $('.sidebar')
const mainBody = $('.main-body')
const navbar = $('.navbar')
const navbarRegister = $('.navbar__register')
const app = $('.app')
const containerWrapper = $('.container__wrapper')
const topSongs = $('.top-songs')
const mvSection = $('.MV-section')
const musicPlayerBar = $('.PC-music-player')

sideBarBtn.onclick = (e) => {
    const lastSideBarWidth = sideBar.offsetWidth
    sideBar.classList.toggle('sidebar--active')
    const newSideBar = $('.sidebar')  
    if (sideBar.classList.contains('sidebar--active')) {
        mainBody.style.paddingLeft = newSideBar.offsetWidth + 'px'
        // mainBody.style.paddingLeft = 16 + 'px'  
        const newNavbarPadding = Math.abs(lastSideBarWidth - newSideBar.offsetWidth) + 10
        const newMusicPlayerBar = newNavbarPadding + 38
        navbar.style.paddingLeft =  newNavbarPadding + 'px'
        containerWrapper.style.paddingRight = 16 + 'px'
        mvSection.style.paddingRight = 16 + 'px'
        musicPlayerBar.style.paddingLeft = newMusicPlayerBar + 'px'
    } else {
        mainBody.style.paddingLeft = newSideBar.offsetWidth +'px'
        // mainBody.style.paddingRight = 0
        newNavbarPadding = 10
        newMusicPlayerBar = 48
        navbar.style.paddingLeft =  newNavbarPadding + 'px'
        containerWrapper.style.paddingRight = 0
        mvSection.style.paddingRight = 0
        musicPlayerBar.style.paddingLeft = newMusicPlayerBar + 'px'
    }
    
    // Array.from(discoverySongImgs).forEach(discoverySongImg => {
    //     if (sideBar.classList.contains('sidebar--active')) {
    //         discoverySongImg.style.width = 124 + 'px'
    //         discoverySongImg.style.height = 124 + 'px'
    //         topSongs.style.paddingRight = 16 +'px'
    //     } else {
    //         discoverySongImg.style.width = 152 + 'px'
    //         discoverySongImg.style.height = 152 + 'px'
    //         topSongs.style.paddingRight = 0
    //     }
    // })

}

// xử lí nút nhấn options
{
    const optionsBtn = $('#sidebar-options')
    const optionsMenu = $('.options-menu')
    optionsBtn.onclick = function (e) {
        e.preventDefault()
        optionsMenu.classList.toggle('options-menu--hidden')
    }

    document.addEventListener('click', (e) => {
        if(e.target.closest('#sidebar-options')) {return}
        optionsMenu.classList.add('options-menu--hidden')
    })  

    optionsMenu.onclick = function (e) {
        e.stopPropagation()
    }
}

// Xử lí notification for

const notiNumbers = $('.register__notification-info-header span')
const notiItems = $$('.notification__item')
notiNumbers.innerHTML = notiItems.length

// Xử lí nút nhấn top songs
const topSongsBtns = $$('.top-songs__region-btn')
topSongsBtns.forEach(function (topSongsBtn) {
    topSongsBtn.onclick = function() {
        $('.top-songs__region-btn.top-songs__region-btn--active').classList.remove('top-songs__region-btn--active')
        this.classList.add('top-songs__region-btn--active')
    }
})

// Xử lí nút nhấn music list
{
    const  btnSongsMenu = $('.btn-songs-menu')
    const songsMenu = $('.songs-menu')
    btnSongsMenu.onclick = (e) => {
        btnSongsMenu.classList.toggle('btn-songs-menu--active')
        if (btnSongsMenu.classList.contains('btn-songs-menu--active')) {
            window.addEventListener('click', function (e) {
                if (e.target.closest('.btn-songs-menu')||e.target.closest('.PC-music-player__navigation')) {return}
                btnSongsMenu.classList.remove('btn-songs-menu--active')
            })
        }
    }

    songsMenu.onclick = function(e) {
        e.stopPropagation()
    }

    songsMenu.onmouseover = (e) => {
        e.stopPropagation()
    }

    btnSongsMenu.onmouseover = function(e) {
        this.style.color = 'var(--secondary-color)'
    }

    btnSongsMenu.onmouseout = function(e) {
        this.style.color = 'var(--white-color)'
    }
}

// Responsive JS
function TabletmainBodyRes (object) {
    if (object.matches) {
        mainBody.style.paddingLeft = 0 
    }
    //  else {
    //     mainBody.style.paddingLeft = 60 + 'px'
    // }
}

function MobilemainBodyRes (object) {
    if (object.matches) {
        mainBody.style.paddingLeft = 0 
    }

    window.addEventListener("orientationchange", function(e) {
        e.preventDefault()
      }, false);
    // } else {
    //     mainBody.style.paddingLeft = 60 + 'px'
    // }
}

const tabletRes = window.matchMedia("(min-width: 740px) and (max-width: 1023px)")

TabletmainBodyRes(tabletRes)

tabletRes.addListener(TabletmainBodyRes)

const mobileRes = window.matchMedia("(max-width: 739px)")

// mobileRes.onchange = function(e) {
//     if (e.matches) {
//         /* the viewport is 600 pixels wide or less */
//         mainBody.style.paddingLeft = 0
//       } else {
//         /* the viewport is more than than 600 pixels wide */
//         console.log('123')
//         mainBody.style.paddingLeft = 0
//       }
// }

MobilemainBodyRes(mobileRes)
mobileRes.addListener(MobilemainBodyRes)

// mainBodyRes.addListener(mainBodyRes)
