/*method responsible for toggling the night mode modifier on and off the elements*/
window.fn.nightMode = function (el) {
    var value = el.checked; document.documentElement.classList.add('night');
    window.localStorage.setItem('isNightMode', value);
    setNightMode();
};


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
