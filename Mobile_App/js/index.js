/*array that will contain all methods that will be used from HTML side*/
window.fn = {};

/*array containing the information about the sources array that will display the available sources*/
window.sources = {
    sites: [],
    total: 0,
    canAddNew: true
}

/*method responsible for opening the sidemenu*/
window.fn.open = function () {
    hideSubmenus();
    var menu = document.getElementById('menu');
    window.fn.repeatSources();
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

/*method responsible for hiding all submenus that are available in the app*/
function hideSubmenus() {
    var submenu = document.getElementById('settingsSubmenu');
    submenu.style.display = 'none';
    var newSourceDiv = document.getElementById('newSourceDiv');
    newSourceDiv.style.display = 'none';
    var newSourceInput = document.getElementById('newSourceInput');
    newSourceInput.value = '';

}

/*method responsible for repeating all available sources as a list for the user to choose from*/
window.fn.repeatSources = function () {
    var sourcesList = document.getElementById('sourcesList');

    sourcesList.delegate = {
        createItemContent: function (i) {
            return ons._util.createElement(
                '<ons-list-item class=\'menuStyle\'>' +
                '<ons-button onclick="fn.removeSource(' + i + ')">' +
                '<ons-icon icon="fa-times" tappable></ons-icon></ons-button>' +
                window.sources.sites[i] + '</ons-list-item>'
            );
        },
        countItems: function () {
            return window.sources.total;
        }
    };

    sourcesList.refresh();
}

/*method responsible for displaying an input for the user to type in the new source that they want to add*/
window.fn.addSource = function () {
    var newSourceDiv = document.getElementById('newSourceDiv');
    if (window.sources.canAddNew) {
        newSourceDiv.style.display = 'block';
        window.sources.canAddNew = false;
    } else {
        newSourceDiv.style.display = 'none';
        window.sources.canAddNew = true;
    }
}

/*method responsible for adding the source typed by the user into the list of the user's selected sources*/
window.fn.addSourceToList = function () {
    var newSourceInput = document.getElementById('newSourceInput');
    if (newSourceInput.value.length > 0) {
        window.sources.sites.push(newSourceInput.value);
        window.sources.total++;
        window.sources.canAddNew = true;
        newSourceInput.value = '';
        window.fn.repeatSources();
    }
}

/*method prompting for a confirmation if the user wants to delete the selected source*/
window.fn.removeSource = function (index) {
    window.fn.confirmSourceDelete(index);
}

/*method responsible for displaying said deletion prompt and then deleting the source if the user confirmed the prompt*/
window.fn.confirmSourceDelete = function (material, index) {
    ons.notification.confirm({
        message: 'Are you sure you want to delete this source?',
        callback: function (idx) {
            switch (idx) {
                case 0:
                    break;
                case 1:
                    window.sources.total--;
                    window.sources.sites.pop(index);
                    window.fn.repeatSources();
                    break;
            }
        }
    });
};

/*method responsible for displaying a popover on font size change button*/
window.fn.showPopover = function (target) {
    document.getElementById('fontSizePopover').show(target);
};

/*method responsible for hiding the popover on font size change button*/
window.fn.hidePopover = function () {
    document.getElementById('fontSizePopover').hide();
};

/*method responsible for toggling the night mode modifier on and off the elements*/
window.fn.nightMode = function (check) {
    var el = document.getElementById('app_page');
    if (check.checked)
        ons.modifier.add(el, 'night_mode_bg');
    else
        ons.modifier.remove(el, 'night_mode_bg');
};