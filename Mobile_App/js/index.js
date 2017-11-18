ons.platform.select('android');

/*array that will contain all methods that will be used from HTML side*/
window.fn = {};

window.data = {};

function init(){
	window.fn.requestArticle();
};

window.fn.login = function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    if (username === window.localStorage.getItem('username') && password === window.localStorage.getItem('password')) {
        window.fn.goToMainView();
        window.fn.hideModal();
        ons.notification.toast({message: 'Welcome back ' + username + ' !', timeout: 3000});
    }else {
      ons.notification.alert('Incorrect username or password. Please try again.');
    }
};

window.fn.register = function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password){
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        window.fn.hideModal();
        window.fn.goToMainView();
        ons.notification.toast({message: 'Welcome ' + username + ' !', timeout: 3000});
    }else {
      ons.notification.alert('Invalid username or password. Please try again.');
    }
    
};

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

window.fn.showModal = function() {
    var modal = document.querySelector('ons-modal');
    modal.show();
}

window.fn.hideModal = function(){
    var modal = document.querySelector('ons-modal');
    modal.hide();
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
        arrayOfArticles.push(templateArticles[i%templateArticles.length]);
    }
	lastUpdatedDate= new Date ();

    return arrayOfArticles;
}

function getArticle(index){
	return window.fn.articles[i];
}

init();