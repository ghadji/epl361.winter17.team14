window.fn = {};

window.sources = {
    sites: [],
    total: 0,
    canAddNew: true
}

window.fn.open = function () {
    hideSubmenus();
    var menu = document.getElementById('menu');
    window.fn.repeatSources();
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
    var newSourceDiv = document.getElementById('newSourceDiv');
    newSourceDiv.style.display = 'none';
    var newSourceInput = document.getElementById('newSourceInput');
    newSourceInput.value = '';

}

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

window.fn.removeSource = function (index) {
    window.fn.confirmSourceDelete(index);
}

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

window.fn.showPopover = function (target) {
    document.getElementById('fontSizePopover').show(target);
};

window.fn.hidePopover = function () {
    document.getElementById('fontSizePopover').hide();
};

window.fn.nightMode = function (check) {
	var el = document.getElementById('app_page');
	if (check.checked)
		ons.modifier.add(el, 'night_mode_bg');
	else
		ons.modifier.remove(el, 'night_mode_bg');
};