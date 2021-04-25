function main(){
  if(window.location.href.toString().search("v=") >= 0){
    let searchParams = new URLSearchParams(window.location.search);
    // send a message to a background script, so we aren't limited to https only.
    chrome.runtime.sendMessage({
      method: 'GET',
      action: 'xhr',
      videoURL: window.location.href.toString(),
      videoId: searchParams.get("v"),
      data: ''
    }, function(newSource) {
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
