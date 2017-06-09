function main(){
  if(window.location.href.toString().search("v=") >= 0){
    // send a message to a background script, so we aren't limited to https only.
    chrome.runtime.sendMessage({
      method: 'GET',
      action: 'xhr',
      videoUrl: window.location.href.toString(),
      data: ''
    }, function(responseText) {
      // parse the text to find the link
      var parser = new DOMParser();
      var doc = parser.parseFromString(responseText,"text/html");
      var resolutions = doc.getElementsByClassName("panel-body")[0].children;
      var newSource = null;
      var highestRes = 0;
      /*
      for(i=0;i<resolutions.length;i++){
        res = Number(resolutions[i].text.replace(/\D+/g, ''));
        if(res > highestRes){
          highestRes=res;
          newSource=resolutions[i].href;
        }
      }
      */
      newSource=resolutions[1].href
      if(newSource === null){
        alert("ERROR FINDING SOURCE TO VIDEO.")
      } else{
        // now, we change the source of the youtube video to our custom source.
        var video = document.getElementsByTagName("video")[0];
        video.src = newSource
      }
    });
  }
}
main();