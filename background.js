/**
 * Possible parameters for request:
 *  action: "xhr" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhr") {
        var xhr = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhr.onload = function() {
            callback(xhr.responseText);
        };
        xhr.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhr.open("GET","http://videomultidownload.com/?act=inforvideo&link=" + request.videoUrl,true);
        //xhr.setRequestHeader("Cookie"," PHPSESSID=67okcflrmr2e0fe5lctad1etb6; _ga=GA1.2.605565052.1496941977; _gid=GA1.2.1597293982.1496941977; _gat=1");
        //xhr.setRequestHeader("Origin"," http://videomultidownload.com");
        //xhr.setRequestHeader("Accept-Encoding"," gzip, deflate");
        xhr.setRequestHeader("Accept-Language"," en-US,en;q=0.8,ja;q=0.6,zh-CN;q=0.4,zh;q=0.2,fr-CA;q=0.2,fr;q=0.2");
        //xhr.setRequestHeader("User-Agent"," Mozilla/5.0 (X11; CrOS x86_64 9202.64.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.146 Safari/537.36");
        xhr.setRequestHeader("Content-Type"," application/x-www-form-urlencoded; charset=UTF-8");
        xhr.setRequestHeader("Accept"," *\/*");
        //xhr.setRequestHeader("Referer"," http://videomultidownload.com/");
        xhr.setRequestHeader("X-Requested-With"," XMLHttpRequest");
        //xhr.setRequestHeader("Connection"," keep-alive");
        if (method == 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});