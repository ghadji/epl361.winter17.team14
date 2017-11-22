ons.platform.select("android");

/*array that will contain all methods that will be used from HTML side*/
window.fn = {};

window.data = {};

function init() {
    window.fn.requestArticle();
    window.fn.getSources();
}

/* function responsible to handle login*/
window.fn.login = function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var accountArr = JSON.parse(window.localStorage.getItem("account_array"));
    var found = false;
    if (username && password && accountArr && accountArr.length > 0) {
        for (var i = 0; i < accountArr.length; i++) {
            if (accountArr[i]["UserName"] == username && accountArr[i]["Password"] == password) {
                found = true;
                window.fn.goToMainView();
                window.fn.hideModal();
                ons.notification.toast({ message: "Welcome back " + username + " !", timeout: 3000 });
            }
        }
    }
    if (!found)
        ons.notification.alert("Incorrect username or password. Please try again.");
};

/* function responsible to handle register*/
window.fn.register = function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var found = false;
    var accountArr = JSON.parse(window.localStorage.getItem("account_array"))
    //console.log(accountArr);
    if (!username && !password) {
        ons.notification.alert("Invalid username or password. Please try again.");
    }
    if (accountArr != null && accountArr.length > 0) {
        for (var i = 0; i < accountArr.length; i++) {
            if (accountArr[i]["UserName"] == username) {
                found = true;
                break;
            }
        }
        if (found) {
            ons.notification.alert("Username is taken. Please try again.");
            return;
        }
    } else if (accountArr == null) {
        window.localStorage.removeItem("isNightMode");
        window.localStorage.removeItem("isCachingNews");
        window.localStorage.removeItem("isMarkupToxic");
        window.localStorage.removeItem("isHideToxic");
        window.localStorage.removeItem("toxicToleranceValue");
        window.localStorage.removeItem("checkedSources");
        accountArr = [];
    }
    accountArr.push({ UserName: username, Password: password });
    window.localStorage.setItem("account_array", JSON.stringify(accountArr));
    window.fn.hideModal();
    window.fn.goToMainView();
    ons.notification.toast({
        message: "Welcome " + username + " !",
        timeout: 3000
    });
};

/*sponsible for opening the sidemenu*/
window.fn.open = function() {
    var menu = document.getElementById("menu");
    menu.open();
};

/*method responsible from loading the given page to viewport*/
window.fn.load = function(page) {
    var content = document.getElementById("content");
    var menu = document.getElementById("menu");
    content.load(page).then(menu.close.bind(menu));
};

/* toggles cache news setting*/
window.fn.cacheNews = function(el) {
    var value = el.checked;
    window.localStorage.setItem("isCachingNews", value);
};

/*toggles markup toxic content setting*/
window.fn.markupToxic = function(el) {
    var value = el.checked;
    window.localStorage.setItem("isMarkupToxic", value);
};

/*toggles hide toxic content setting*/
window.fn.hideToxic = function(el) {
    var value = el.checked;
    window.localStorage.setItem("isHideToxic", value);
};

/*goes from welcome page to home page*/
window.fn.goToMainView = function() {
    //var main_page = document.getElementById('main_page');
    //nav.pushPage('home.html', { animation: 'slide' });
    //window.location = './index.html';
    document
        .querySelector("#myNavigator")
        .pushPage("mainView.html", { data: { title: "Home" } });
};

window.fn.showModal = function() {
    var modal = document.querySelector("ons-modal");
    modal.show();
};

window.fn.hideModal = function() {
    var modal = document.querySelector("ons-modal");
    modal.hide();
};

window.fn.changeFontSize = function(index) {
    var el = document.getElementsByTagName("fontChangeTag");
    for (var i = 0; i < el.length; i++) {
        switch (index) {
            case 0:
                el[i].style.fontSize = "100%";
                break;
            case 1:
                el[i].style.fontSize = "110%";
                break;
            case 2:
                el[i].style.fontSize = "120%";
                break;
            case 3:
                el[i].style.fontSize = "130%";
                break;
        }
    }
    if ((el = document.getElementById("fontSizeText")))
        el.innerHTML = index * 2 + 20 + "px";
    window.localStorage.setItem("fontSizeIndex", index);
};

function setFontSize() {
    var value = JSON.parse(window.localStorage.getItem("fontSizeIndex"));
    if (value)
        window.fn.changeFontSize(value);
}

window.fn.requestArticle = function() {
    window.data.articles = getNewArticles();
};

window.fn.getSources = function() {
    window.data.sources = getSources();
};

window.fn.openArticle = function(i) {
    var articleOptions = {
        Title: window.data.articles[i].Title,
        Img: window.data.articles[i].PictureSrc,
        Content: window.data.articles[i].Content,
        Date: window.data.articles[i].Date,
        Source: window.data.articles[i].SourceWebsite
    };
    articlesNavi.pushPage("articleView.html", { data: articleOptions });
};

function getWhatArticlesToShow() {
    //finds index of selected sources in sources list
    var checkedSources = JSON.parse(localStorage.getItem("checkedSources"));
    var sourcesIndexes = [];
    if (checkedSources && checkedSources.length > 0) {
        for (var j = 0; j < checkedSources.length; j++) {
            if (checkedSources[j]) {
                sourcesIndexes.push(j);
            }

        }
    }
    //finds which articles to show according to selected sources
    window.data.articlesToShow = [];
    for (var i = 0; i < window.data.articles.length; i++) {
        for (var j = 0; j < sourcesIndexes.length; j++) {
            if (
                window.data.articles[i].SourceWebsite ==
                window.data.sources[sourcesIndexes[j]].URL
            ) {
                window.data.articlesToShow.push(window.data.articles[i]);
            }
        }
    }
}

var lastUpdatedDate = null;

function getSources() {
    var arrayOfSources = [];
    var i;
    for (i = 0; i < templateSources.length; i++) {
        arrayOfSources.push(templateSources[i]);
    }
    return arrayOfSources;
}

var countRetrievedArticles = 0;

function getNewArticles(websiteSources) {
    if (lastUpdatedDate == null) {
        lastUpdatedDate = new Date();
    }

    // HTTP Request to the BackEnd API
    // with the lastUpdatedDate and desired websiteSources
    // as arguments
    // The response will be a JSON Array of Articles

    // For the demostration:
    var arrayOfArticles = [];
    var i;
    for (i = countRetrievedArticles; i < countRetrievedArticles + 10; i++) {
        arrayOfArticles.push(templateArticles[i % templateArticles.length]);
    }
    countRetrievedArticles = countRetrievedArticles + 10;
    lastUpdatedDate = new Date();

    return arrayOfArticles;
}

function getArticle(index) {
    return window.fn.articles[i];
}

init();