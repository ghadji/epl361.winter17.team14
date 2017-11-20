document.addEventListener('init', function (event) {
	var page = event.target;
	getWhatArticlesToShow();

	if (page.matches('#ArticlesPage')){
		if ((!window.data.articlesToShow) || (window.data.articlesToShow && window.data.articlesToShow.length == 0)){
			window.fn.load('NoArticlesPage.html');
		}
	}
	
	if (page.matches('#NoArticlesPage')){
		if (window.data.articlesToShow && window.data.articlesToShow.length > 0){
			window.fn.load('ArticlesPage.html');
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
	if (page.matches('#ArticlesPage') && window.data.articlesToShow && window.data.articlesToShow.length > 0){

		getWhatArticlesToShow();
		
		if (window.data.articlesToShow.length > 0){
			var articlesList = document.getElementById('articlesListRepeat');


			articlesList.delegate = {
				createItemContent: function(i) {
					return ons.createElement('<ons-list-item tappable style="padding-left:1%; padding-right:1%;" onclick="fn.openArticle('+i+')">' + 
												'<ons-col width="30%">'+
													'<img height="70%" width="100%" src="'+ window.data.articlesToShow[i].PictureSrc +'">'+
												'</ons-col>'+
												'<ons-col>'+
													'<div class="articleStyle" style="padding-left:5%;">' + 
													'<fontChangeTag>' + window.data.articlesToShow[i].Title +'</fontChangeTag>' + 
													'</div>' +
													'<div style="color:#90A4AE; padding-left:5%; font-size:80%" >' +
													window.data.articlesToShow[i].SourceWebsite + 
													'</div>'+
												'</ons-col>'+ 
											'</ons-list-item>'
				);
				},
				countItems: function() {
					return window.data.articlesToShow.length;
				}
			};
			articlesList.refresh();
		}
	}
	if(page.matches("#addSources")){
		setSourcesNightMode();
		var checkedSources = JSON.parse(localStorage.getItem('checkedSources'));
		var sourcesList = document.getElementById('sourcesListRepeat');
		
				sourcesList.delegate = {
					createItemContent: function(i) {
						return ons.createElement('<ons-list-item tappable style="padding-left:1%; padding-right:1%;">' + 
													'<label class="right">' +
														'<ons-checkbox id="source'+ i +'" input-id="'+window.data.sources[i].URL+'"></ons-checkbox>' +
													'</label>' + 
													'<label for="'+window.data.sources[i].URL+'" class="center menuStyle">' +
														'<fontChangeTag>'+ window.data.sources[i].Category + ' - ' + window.data.sources[i].Title +'</fontChangeTag>' +
													'</label>' +
												 '</ons-list-item>'
					  );
					},
					countItems: function() {
						return window.data.sources.length;
					}
				};
		sourcesList.refresh();
		//displays checkmark in checked sources
		if (checkedSources)
			for (var i =0; i<window.data.sources.length; i++){
				document.getElementById('source' + i).checked = checkedSources[i];
			}
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
	if (page.matches('#addSources')){
		var checkedSources = [];
		for (var i =0; i<window.data.sources.length; i++){
			checkedSources.push(document.getElementById('source' + i).checked);
		}
		localStorage.setItem("checkedSources", JSON.stringify(checkedSources));
	}	
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

document.addEventListener('preshow', function(event){
	var modal = event.modal;

	var checkbox = document.getElementById('rememberme');
	if (event.modal){
		if (window.localStorage.getItem('remember_account') == 'true')
			checkbox.checked = true;
		
		else
			checkbox.checked = false;
		var username = document.getElementById('username');
		var password = document.getElementById('password');
		if (checkbox.checked){
			username.value = window.localStorage.getItem('username');
			password.value = window.localStorage.getItem('password');
		}else{
			username.value = '';
			password.value = '';
		}
	}
});

document.addEventListener('prehide', function(event){
	var modal = event.modal;
	if (event.modal){
		var checkbox = document.getElementById('rememberme');
		window.localStorage.setItem('remember_account', checkbox.checked);
	}
});