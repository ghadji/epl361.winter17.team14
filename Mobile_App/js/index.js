ons.platform.select('android');

/*array that will contain all methods that will be used from HTML side*/
window.fn = {};

window.data = {};

function init(){
	window.fn.requestArticle();
}

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
window.fn.goToMainView = function () {
    //var main_page = document.getElementById('main_page');
    //nav.pushPage('home.html', { animation: 'slide' });
    //window.location = './index.html';
    document.querySelector('#myNavigator').pushPage('mainView.html', {data: {title: 'Home'}});
}

/*enables/disables night mode*/
function setNightMode() {
    var value = JSON.parse(window.localStorage.getItem('isNightMode'));
    var pages = document.getElementsByTagName('ons-page');
    var sidemenuList = document.getElementById('sidemenuList');
    var paragraphs = document.getElementsByTagName('TextTag');
    for (var i = 0; i < pages.length; i++) {
        if (value) {
            ons.modifier.remove(pages[i], 'normal_mode_bg');
            ons.modifier.add(pages[i], 'night_mode_bg');
        } else {
            ons.modifier.remove(pages[i], 'night_mode_bg');
            ons.modifier.add(pages[i], 'normal_mode_bg');
        }
    }
	if (sidemenuList)
		value ? ons.modifier.add(sidemenuList, 'night_mode_bg') : ons.modifier.remove(sidemenuList, 'night_mode_bg');
    for (var i = 0; i < paragraphs.length; i++) {
        if (value)
            paragraphs[i].classList.add('night_mode_text');
            //ons.modifier.add(paragraphs[i], 'night_mode_text');
        else
            paragraphs[i].classList.remove('night_mode_text');
        //ons.modifier.remove(paragraphs[i], 'night_mode_text');
    }
};

function setSourcesNightMode() {
    var value = JSON.parse(window.localStorage.getItem('isNightMode'));
    var sourcesList = document.getElementById('sourcesList');
    value ? ons.modifier.add(sourcesList, 'night_mode_bg') : ons.modifier.remove(sourcesList, 'night_mode_bg');
}


window.fn.changeFontSize = function (index) {
    var el = document.getElementsByTagName("fontChangeTag");
    for (var i = 0; i < el.length; i++) {
        switch (index) {
            case 0: el[i].style.fontSize = '125%';
                break;
            case 1: el[i].style.fontSize = '137.5%';
                break;
            case 2: el[i].style.fontSize = '150%';
                break;
            case 3: el[i].style.fontSize = '167.5%';
                break;
        }
    }
	if(el = document.getElementById('fontSizeText')) el.innerHTML = (index*2 + 20) + 'px';
    window.localStorage.setItem('fontSizeIndex', index);
}

function setFontSize() {
    var value = JSON.parse(window.localStorage.getItem('fontSizeIndex'));
    window.fn.changeFontSize(value);
}

window.fn.requestArticle = function (){
	window.data.articles = getNewArticles();
}

/*EVENT LISTENERS*/
document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.matches('#displaySettingsPage')) {
        document.getElementById('NightModeToggle').checked =
                            JSON.parse(window.localStorage.getItem('isNightMode'));
        document.getElementById('CacheNewsToggle').checked =
                            JSON.parse(window.localStorage.getItem('isCachingNews'));
		document.getElementById('fontSizeText').innerHTML = 
							(JSON.parse(window.localStorage.getItem('fontSizeIndex'))*2 + 20) + 'px';
		//display/hide font size options action sheet
		ons.ready(function () {
			ons.createElement('fontSizeOptions.html', { append: true })
				.then(function (sheet) {
					window.fn.showFontSizeOptions = sheet.show.bind(sheet);
					window.fn.hideFontSizeOptions = sheet.hide.bind(sheet);
				}
			);
		});
    }
    if (page.matches('#sideMenu')) {
        document.getElementById('settingsSubmenu').style.display = 'none';
    }
    if (page.matches('#filteringSettingsPage')) {
        document.getElementById('MarkupToxicToggle').checked =
                            JSON.parse(window.localStorage.getItem('isMarkupToxic'));
        document.getElementById('HideToxicToggle').checked =
                            JSON.parse(window.localStorage.getItem('isHideToxic'));
        document.getElementById('ToxicToleranceSlider').value =
                            JSON.parse(window.localStorage.getItem('toxicToleranceValue'));
    }
    if (page.matches('#addSources'))
        setSourcesNightMode();
	if (page.matches('#NoSourcePage')){
		var articlesList = document.getElementById('articlesListRepeat');

		articlesList.delegate = {
			createItemContent: function(i) {
			    return ons.createElement('<ons-list-item tappable style="padding-left:2px" onclick="fn.openArticle('+i+')">' + 
											'<ons-col width="30%">'+
												'<img height="70%" width="100%" src="'+ window.data.articles[i].PictureSrc +'">'+
											'</ons-col>'+
											'<ons-col>'+ 
												window.data.articles[i].Title + '</br>' + window.data.articles[i].SourceWebsite + ' - ' + window.data.articles[i].Author + 
											'</ons-col>'+ 
									     '</ons-list-item>'
			  );
			},
			countItems: function() {
				return window.data.articles.length;
			}
		};
		articlesList.refresh();
	}
	if(page.matches("#articleView")){
		var page = articlesNavi.topPage;
		document.getElementById('articleTitle').innerHTML = page.data.Title;
		document.getElementById('articleImg').src = page.data.Img;
		document.getElementById('articleContent').innerHTML = page.data.Content;
	}
    setNightMode();
    setFontSize();
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
});
/*EVENT LISTENERS*/

window.fn.openArticle = function(i){
	var articleOptions = {
		Title: window.data.articles[i].Title,
		Img: window.data.articles[i].PictureSrc,
		Content: window.data.articles[i].Content,
		Author: window.data.articles[i].Author,
		Date: window.data.articles[i].Date,
		Source: window.data.articles[i].SourceWebsite
	}
	articlesNavi.pushPage('articleView.html', { data : articleOptions } );
}

var lastUpdatedDate= null;

function getNewArticles (websiteSources) {
    if (lastUpdatedDate == null) {
        lastUpdatedDate= new Date ();
    }

    // HTTP Request to the BackEnd API
    // with the lastUpdatedDate and desired websiteSources
    // as arguments
    // The response will be a JSON Array of Articles

    // For the demostration:
    var arrayOfArticles= [];
    var i;
    for (i= 0; i< 10; i++) {
        arrayOfArticles.push(templateArticle);
    }
	lastUpdatedDate= new Date ();

    return arrayOfArticles;
}

function getArticle(index){
	return window.fn.articles[i];
}


init();