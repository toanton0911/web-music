// Các bước thực hiện
//  * 1.Render songs --> OK
//  * 2.Get Current Song --> OK
//  * 3.Play / pause / seek  --> OK
//  * 4.Next / prev --> OK
//  * 4.5 .Song timer --> OK
//  * 5.Random --> OK
//  * 6.Next / Repeat when ended --> OK
//  * 7.Active song 
//  * 8.Scroll active song into view 
//  * 9.Play song when click 

const userKey = 'USER_KEY'

const musicPlayer = $('.PC-music-player')
const songsMenuContainer = $('.songs-menu__container')
const musicTitle = $('.PC-music-player__song-title')
const tabletMusicTitle = $('#tablet-song-title')
const playBtn = $('.btn-toggle-play')
const audio = $('#audio')
const musicProgress = $('.PC-music-player__progress')
const prevSong = $('.btn-prev')
const nextSong = $('.btn-next')
const songTimeCurrent = $('.PC-music-player__song-time-current')
const songTimeTotal =  $('.PC-music-player__song-time-total')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.songs-menu__container')

const musicApp = {
    currentIndex: 0,
    isPlaying: false,
    isRandom : false,
    isRepeat : false,
    config: JSON.parse(localStorage.getItem(userKey)) || {},
    setConfig : function(key, value) {
        this.config[key] = value
        localStorage.setItem(userKey, JSON.stringify(this.config))
    },
    loadConfig : function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    songs : [
        {
            name: 'No Love',
            singer: 'Kellie',
            path: './assets/music/Kellie-NoLove.mp3',
            image: './assets/img/kellie.png'
        },
        {
            name: 'Đường tôi chở em về',
            singer: 'buitruonglinh',
            path: './assets/music/buitruonglinh-duongtoichoemve.mp3',
            image: './assets/img/buitruonglinh.png'
        },
        {
            name: 'Step Back',
            singer: 'GOT',
            path: './assets/music/GOT-StepBack.mp3',
            image: './assets/img/GOT.png'
        },
        {
            name: 'Strawberry Moon',
            singer: 'IU',
            path: './assets/music/IU-Strawberry.mp3',
            image: './assets/img/IU.png'
        },
        {
            name: 'Ở nhà quê mới lên',
            singer: 'Lăng LD',
            path: './assets/music/LangLD-O-nha-que-moi-len.mp3',
            image: './assets/img/LăngLD.png'
        },
        {
            name: 'Happy for you',
            singer: 'Lukas Graham x Vũ',
            path: './assets/music/LuKas-HappyForYou.mp3',
            image: './assets/img/Lukas.png'
        },
        {
            name: 'Một Năm Mới Bình An',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/SontungMtp-MotNamMoiBinhAn.mp3',
            image: './assets/img/sontungmtp.png'
        },
    ],

    render: function() {
        const songListHtmls = this.songs.map( (song,index) => {
            return `
                <li class="songs-menu__item ${index === this.currentIndex ? 'songs-menu__item--active' : ''}" data-set="${index}">
                    <a href="#" class="songs-menu__item-link">
                        <div class="song-thumb" style="background-image: url(${song.image})"></div>
                        <div class="songs-menu__item-body">
                            <span class="songs-menu__item-title">${song.name}</span>
                            <span class="songs-menu__item-singer">${song.singer}</span>
                        </div>
                        <div class="songs-menu__item-options">
                            <div class="btn songs-menu__item-options-btn">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    </a>
                </li>
            ` 
        }) 
        songsMenuContainer.innerHTML = songListHtmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this,'currentSong',{
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function () {
        const _this = this
        // when play/pause song
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function () {
            _this.isPlaying = true
            musicPlayer.classList.add('PC-music-player--playing')
        }

        audio.onpause = function () {
            _this.isPlaying = false
            musicPlayer.classList.remove('PC-music-player--playing')
        }

        // seek Slidebar progress
        audio.ontimeupdate = function (e) {
            // progress bar
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                musicProgress.value = progressPercent
            }
        }

        // Timer: total time
        audio.addEventListener("timeupdate", function() {
            if (audio.duration) {
                const songTimeTotalMinute = Math.floor(audio.duration / 60)
                const songTimeTotalSecond = Math.floor(audio.duration - (songTimeTotalMinute * 60))
                if (songTimeTotalSecond < 10) {
                    songTimeTotal.innerHTML = songTimeTotalMinute + ':0' + songTimeTotalSecond;
                }
                else {
                    songTimeTotal.innerHTML = songTimeTotalMinute + ':' + songTimeTotalSecond;
                }
                return
            }
            songTimeTotal.textContent = '0' + ':' + '00'
        })
        
        // Timer: duration time
        audio.addEventListener("timeupdate", function() {
            const s = parseInt(audio.currentTime % 60);
            const m = parseInt((audio.currentTime / 60) % 60);
            if (s < 10) {
                songTimeCurrent.innerHTML = m + ':0' + s;
            }
            else {
                songTimeCurrent.innerHTML = m + ':' + s;
            }
        })

        // progress Bar
        musicProgress.oninput = function (e) {
            const seekTime = (audio.duration /100 * musicProgress.value)
            audio.currentTime = seekTime
        }

        // when click next/ prev song
        nextSong.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            }else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollIntoActive()
        }

        prevSong.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            }else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollIntoActive()
        }

        // when click random button
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            this.classList.toggle('btn-random--active', _this.isRandom)
        }

        // when click repeat button 
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            this.classList.toggle('btn-repeat--active', _this.isRepeat)
        }

        // Next/ repeat when song ended
        audio.onended = function () {
            if (_this.isRepeat) {
                _this.repeatSong()
                audio.play()
            } else {
                nextSong.click()
            }
        }

        // Active Song
        playList.onclick = function (e) {
            const songNode = e.target.closest('.songs-menu__item:not(.songs-menu__item--active)')
            if (songNode || e.target.closest('.songs-menu__item-options-btn')) {
                // when clicking on non-active song 
                if (songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-set'))
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // when clicking on option Menu 
                if (e.target.closest('.songs-menu__item-options-btn')) {

                }
            }
        }
    },

    scrollIntoActive: function() {
        setTimeout(function() {
            $('.songs-menu__item.songs-menu__item--active').scrollIntoView({
                behavior : 'smooth',
                block : 'start'
            },200);
        })
    },

    loadCurrentSong : function () {
        musicTitle.textContent =  `Now Playing : ${this.currentSong.name} - ${this.currentSong.singer}`
        tabletMusicTitle.textContent =  `Now Playing : ${this.currentSong.name} - ${this.currentSong.singer}`
        audio.src = this.currentSong.path
    },

    nextSong : function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong : function () {
        this.currentIndex--
        if (this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    randomSong : function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    repeatSong : function () {
        this.currentIndex = this.currentIndex
        this.loadCurrentSong()
    },

    start : function() {

        this.loadConfig()

        this.defineProperties()

        this.loadCurrentSong()

        this.handleEvent()

        this.render()

        randomBtn.classList.toggle('btn-random--active', this.isRandom)

        repeatBtn.classList.toggle('btn-repeat--active', this.isRepeat)
    }
}

musicApp.start()