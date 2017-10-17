window.fn = {};

window.sources = {
    sites: [],
    total: 0,
    canAddNew: true
}

window.fn.open = function () {
    hideSubmenus();
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function (page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
        .then(menu.close.bind(menu));
};

window.fn.toggleSettings = function () {
    var submenu = document.getElementById('settingsSubmenu');
    if (submenu.style.display == 'none')
        submenu.style.display = 'block';
    else
        submenu.style.display = 'none';
}

function hideSubmenus() {
    var submenu = document.getElementById('settingsSubmenu');
    submenu.style.display = 'none';

}

window.fn.showPopover = function (target) {
    document.getElementById('fontSizePopover').show(target);
};

window.fn.hidePopover = function () {
    document.getElementById('fontSizePopover').hide();
};

window.fn.nightMode = function () {
    var value = document.getElementById('NightModeToggle').checked;
    var el = document.getElementsByTagName('ons-page');
    for (var i = 0; i < el.length; i++) {
        if (value)
            ons.modifier.add(el[i], 'night_mode_bg');
        else
            ons.modifier.remove(el[i], 'night_mode_bg');
    }
};