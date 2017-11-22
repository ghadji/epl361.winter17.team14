function getSuspectedItems() {

  var list = [];

  var redditItems = document.getElementsByClassName("md");
  for (i = 0; i < redditItems.length; i++) {
    list.push(redditItems[i]);
  }

  var fbPostItems = document.getElementsByClassName("userContent");
  for (i = 0; i < fbPostItems.length; i++) {
    list.push(fbPostItems[i]);
  }

  var fbCommentItems = document.getElementsByClassName("UFICommentBody");
  for (i = 0; i < fbCommentItems.length; i++) {
    list.push(fbCommentItems[i]);
  }

  return list;

}


function MandolaFilter() {
  suspectedItems = getSuspectedItems();

  var i;
  for (i = 0; i < suspectedItems.length; i++) {
    //suspectedItems[i].innerHTML = "<mark>" + suspectedItems[i].innerHTML + "</mark>";
    var text = suspectedItems[i].innerHTML;
    var data = JSON.stringify({
      "text": text
    });

    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;
    // Clone i
    xhr.index = JSON.parse(JSON.stringify(i));
    xhr.inputData = JSON.parse(JSON.stringify(data));

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var percentage = parseInt(this.responseText);
        if (percentage > controlPanel.Hate_Torelance) {
          // console.log(this.inputData);
          // console.log(this.responseText);
          // console.log(this.index);
          if (controlPanel.MarkUp == true) {
            suspectedItems[this.index].style.backgroundColor = "yellow";
          }
          if (controlPanel.Hide == true) {
            suspectedItems[this.index].style.display = "none";
          }
        }
      }
    });

    xhr.open("POST", "https://mandola.grid.ucy.ac.cy:8080/api/analyze-text");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "494a4afb-6779-0b5d-d18e-50b2cce382d3");

    xhr.send(data);
  }
}