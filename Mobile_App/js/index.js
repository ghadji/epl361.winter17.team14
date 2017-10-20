/*array that will contain all methods that will be used from HTML side*/
window.fn = {};

/*method responsible for opening the sidemenu*/
window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

/*method responsible from loading the given page to viewport*/
window.fn.load = function (page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
        .then(menu.close.bind(menu));
};

/*method responsible for toggling the settings dropdown menu in the sidemenu*/
window.fn.toggleSettings = function () {
    var submenu = document.getElementById('settingsSubmenu');
    if (submenu.style.display == 'none')
        submenu.style.display = 'block';
    else
        submenu.style.display = 'none';
}

/*method responsible for toggling the night mode modifier on and off the elements*/
window.fn.nightMode = function (el) {
    var value = el.checked;
    window.localStorage.setItem('isNightMode', value);
    setNightMode();
};

/* toggles cache news setting*/
window.fn.cacheNews = function (el) {
    var value = el.checked;
    window.localStorage.setItem('isCachingNews', value);
}

/*toggles markup toxic content setting*/
window.fn.markupToxic = function (el) {
    var value = el.checked;
    window.localStorage.setItem('isMarkupToxic', value);
}

/*toggles hide toxic content setting*/
window.fn.hideToxic = function (el) {
    var value = el.checked;
    window.localStorage.setItem('isHideToxic', value);
}

/*goes from welcome page to home page*/
window.fn.goToHome = function () {
    var nav = document.getElementById('welcomeScreenNavigator');
    nav.pushPage('home.html', { animation: 'slide' });
}

/*enables/disables night mode*/
function setNightMode() {
    var value = JSON.parse(window.localStorage.getItem('isNightMode'));
    var pages = document.getElementsByTagName('ons-page');
    var list = document.getElementById('sidemenuList');
    var paragraphs = document.getElementsByTagName('TextTag');
    for (var i = 0; i < pages.length; i++) {
        if (value)
            ons.modifier.add(pages[i], 'night_mode_bg');
        else
            ons.modifier.remove(pages[i], 'night_mode_bg');
    }
    for (var i = 0; i < paragraphs.length; i++) {
        if (value)
            paragraphs[i].classList.add('night_mode_text');
            //ons.modifier.add(paragraphs[i], 'night_mode_text');
        else
            paragraphs[i].classList.remove('night_mode_text');
        //ons.modifier.remove(paragraphs[i], 'night_mode_text');
    }
    if (value)
        ons.modifier.add(list, 'night_mode_bg');
    else 

        ons.modifier.remove(list, 'night_mode_bg');
};

/*EVENT LISTENERS*/
document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.matches('#displaySettingsPage')) {
        document.getElementById('NightModeToggle').checked =
                            JSON.parse(window.localStorage.getItem('isNightMode'));
        document.getElementById('CacheNewsToggle').checked =
                            JSON.parse(window.localStorage.getItem('isCachingNews'));
    } else if (page.matches('#sideMenu')) {
        document.getElementById('settingsSubmenu').style.display = 'none';
    } else if (page.matches('#filteringSettingsPage')) {
        document.getElementById('MarkupToxicToggle').checked =
                            JSON.parse(window.localStorage.getItem('isMarkupToxic'));
        document.getElementById('HideToxicToggle').checked =
                            JSON.parse(window.localStorage.getItem('isHideToxic'));
        document.getElementById('ToxicToleranceSlider').value =
                            JSON.parse(window.localStorage.getItem('toxicToleranceValue'));
    }
    setNightMode();
});

document.addEventListener('postclose', function (event) {
    var page = event.target;
    if (page.matches('#menu'))
        document.getElementById('settingsSubmenu').style.display = 'none';
});

document.addEventListener('hide', function (event) {
    var page = event.target;
    if (page.matches('#filteringSettingsPage'))
        window.localStorage.setItem('toxicToleranceValue', document.getElementById('ToxicToleranceSlider').value);
})
/*EVENT LISTENERS*/
