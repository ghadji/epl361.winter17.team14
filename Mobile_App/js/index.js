ons.platform.select('android');

/*array that will contain all methods that will be used from HTML side*/
window.fn = {};

window.data = {};

function init(){
	window.fn.requestArticle();
}

window.fn.openLogin = function () {
    var login = document.getElementById('login');
    login.classList.toggle('test');
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

/*method responsible for toggling the night mode modifier on and off the elements*/
window.fn.nightMode = function (el) {
    var value = el.checked; document.documentElement.classList.add('night');
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
    var isNightMode = JSON.parse(window.localStorage.getItem('isNightMode'));
    var pages = document.getElementsByTagName('ons-page');
    var lists = document.getElementsByTagName('ons-list');
    var sidemenuList = document.getElementById('sidemenuList');
	var thermometerIcons = document.getElementsByTagName('ons-icon');
	var fontChangeTag = document.getElementsByTagName('fontChangeTag');
	var range = document.getElementById('ToxicToleranceSlider');
	var markupToxicDiv = document.getElementById('markupToxicDiv');
	var hideToxicDiv = document.getElementById('hideToxicDiv');

	if (markupToxicDiv)
		if (isNightMode)
			markupToxicDiv.classList.replace('mainStyle_normal_mode', 'mainStyle_night_mode');
		else
			markupToxicDiv.classList.replace('mainStyle_night_mode', 'mainStyle_normal_mode');
			
	if (hideToxicDiv)
		if (isNightMode)
			hideToxicDiv.classList.replace('mainStyle_normal_mode', 'mainStyle_night_mode');
		else
			hideToxicDiv.classList.replace('mainStyle_night_mode', 'mainStyle_normal_mode');

	if (thermometerIcons){
		for (var i=0; i<thermometerIcons.length; i++){
			if (isNightMode && thermometerIcons[i].id == 'thermometerIcon'){
				thermometerIcons[i].style.color = 'white';
			}else if (!isNightMode && thermometerIcons[i].id == 'thermometerIcon'){
				thermometerIcons[i].style.color = 'black';
			}
		}
	}

	if (fontChangeTag){
		for (var i=0; i< fontChangeTag.length; i++){
			if (isNightMode && (fontChangeTag[i].id !='noChangeColor' && fontChangeTag[i].id !='articleSource' && fontChangeTag[i].id !='articleDate' && fontChangeTag[i].id != 'fontSizeText')){
				fontChangeTag[i].style.color = 'white';
			}else if (!isNightMode && (fontChangeTag[i].id != 'noChangeColor' && fontChangeTag[i].id !='articleSource' && fontChangeTag[i].id !='articleDate' && fontChangeTag[i].id != 'fontSizeText') ){
				fontChangeTag[i].style.color = 'black';
			}else{
				continue;
			}
		}
	}
	if (pages){
		for (var i = 0; i < pages.length; i++) {
			if (isNightMode) {
				ons.modifier.add(pages[i], 'night_mode_bg');
				ons.modifier.remove(pages[i], 'normal_mode_bg');
			} else {
				ons.modifier.add(pages[i], 'normal_mode_bg');
				ons.modifier.remove(pages[i], 'night_mode_bg');
			}
		}
    }
	if (lists){
		for (var i = 0; i < lists.length; i++) {
			if (isNightMode) {
				ons.modifier.add(lists[i], 'night_mode_bg');
				ons.modifier.remove(lists[i], 'normal_mode_bg');
			} else {
				ons.modifier.add(lists[i], 'normal_mode_bg');
				ons.modifier.remove(lists[i], 'night_mode_bg');
			}
		}
	}
    if (sidemenuList)
        isNightMode ? ons.modifier.add(sidemenuList, 'night_mode_bg') : ons.modifier.remove(sidemenuList, 'night_mode_bg');
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
            case 0: el[i].style.fontSize = '100%';
                break;
            case 1: el[i].style.fontSize = '110%';
                break;
            case 2: el[i].style.fontSize = '120%';
                break;
            case 3: el[i].style.fontSize = '130%';
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
	window.data.articles = getNewArticles();;
}

/*EVENT LISTENERS*/
document.addEventListener('init', function (event) {
    var page = event.target;

	if (page.matches('#SourcesPage')){
		if ((!window.data.articles) || (window.data.articles && window.data.articles.length == 0)){
			window.fn.load('NoSourcesPage.html');
		}
	}
	
	if (page.matches('#NoSourcesPage')){
		if (window.data.articles && window.data.articles.length > 0){
			window.fn.load('SourcesPage.html');
		}
	}

    if (page.matches('#settings')) {
        document.getElementById('NightModeToggle').checked =
                            JSON.parse(window.localStorage.getItem('isNightMode'));
        document.getElementById('CacheNewsToggle').checked =
                            JSON.parse(window.localStorage.getItem('isCachingNews'));
		document.getElementById('fontSizeText').innerHTML = 
							(JSON.parse(window.localStorage.getItem('fontSizeIndex'))*2 + 20) + 'px';
        document.getElementById('MarkupToxicToggle').checked =
                            JSON.parse(window.localStorage.getItem('isMarkupToxic'));
        document.getElementById('HideToxicToggle').checked =
                            JSON.parse(window.localStorage.getItem('isHideToxic'));
        document.getElementById('ToxicToleranceSlider').value =
                            JSON.parse(window.localStorage.getItem('toxicToleranceValue'));
		//display/hide font size options action sheet
		ons.ready(function () {
			ons.createElement('fontSizeOptions.html', { append: true })
				.then(function (sheet) {
					window.fn.showFontSizeOptions = sheet.show.bind(sheet);
					window.fn.hideFontSizeOptions = sheet.hide.bind(sheet);
				}
			);

			var pullHook = document.getElementById('pull-hook');

			if (pullHook){
				pullHook.addEventListener('changestate', function(event) {
					var message = '';

					switch (event.state) {
					  case 'initial':
						message = 'Pull to refresh';
						break;
					  case 'preaction':
						message = 'Release';
						break;
					  case 'action':
						message = 'Loading...';
						break;
					}

					pullHook.innerHTML = message;
				});

				pullHook.onAction = function(done) {
					window.data.articles = getNewArticles();
				};
			}
		});
        
    }
    if (page.matches('#addSources'))
        setSourcesNightMode();
	if (page.matches('#SourcesPage') && window.data.articles && window.data.articles.length > 0){
		var articlesList = document.getElementById('articlesListRepeat');

		articlesList.delegate = {
			createItemContent: function(i) {
			    return ons.createElement('<ons-list-item tappable style="padding-left:1%; padding-right:1%;" onclick="fn.openArticle('+i+')">' + 
											'<ons-col width="30%">'+
												'<img height="70%" width="100%" src="'+ window.data.articles[i].PictureSrc +'">'+
											'</ons-col>'+
                                            '<ons-col>'+
                                                '<div class="articleStyle" style="padding-left:5%;">' + 
                                                   '<fontChangeTag>' + window.data.articles[i].Title +'</fontChangeTag>' + 
                                                '</div>' +
                                                '<div style="color:#90A4AE; padding-left:5%; font-size:80%" >' +
                                                    window.data.articles[i].SourceWebsite + 
                                                '</div>'+
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
        document.getElementById('articleSource').innerHTML = page.data.Source;
        document.getElementById('articleDate').innerHTML = page.data.Date;
	}
	if (!page.matches('#welcomeView')) {
        setNightMode();
        setFontSize();
	}
});

document.addEventListener('hide', function (event) {
    var page = event.target;
    if (page.matches('#settings'))
        window.localStorage.setItem('toxicToleranceValue', document.getElementById('ToxicToleranceSlider').value);
});

document.addEventListener('change', function (event){
	var page = event.target;
    var markup = document.getElementById('MarkupToxicToggle');
    var hide = document.getElementById('HideToxicToggle');
	if (markup && hide)
		if (markup.checked)
			hide.disabled = true;
		else if (hide.checked)
			markup.disabled = true;
		else if (!markup.checked && hide.disabled)
			hide.disabled = false;
		else if (!hide.checked && markup.disabled)
			markup.disabled = false;
});
/*EVENT LISTENERS*/

window.fn.openArticle = function(i){
	var articleOptions = {
		Title: window.data.articles[i].Title,
		Img: window.data.articles[i].PictureSrc,
		Content: window.data.articles[i].Content,
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