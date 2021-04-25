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
        let res = fetch('https://yt1s.com/api/ajaxSearch/index', {
            method: 'POST',
            headers: {
                'authority': 'yt1s.com',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                'accept': '*\/*',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'origin': 'https://yt1s.com',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://yt1s.com/en5',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'cookie': '__cfduid=dae3087fc6b5a660de9323c890235e84c1619289707; _ga=GA1.2.1357389085.1619289710; _gid=GA1.2.691330434.1619289710; _gat_gtag_UA_173445049_1=1'
            },
            body: 'q=' + encodeURI(request.videoURL)
        }).then(res => res.json())
          .then(data => {
            // id
            let downloads = data.links.mp4;
            let authKey;
            if (downloads.hasOwnProperty("22")) {
                authKey = downloads["22"].k;
            } else {
                authKey = downloads[Object.keys(downloads)[0]].k;
            }

            fetch('https://yt1s.com/api/ajaxConvert/convert', {
                method: 'POST',
                headers: {
                    'authority': 'yt1s.com',
                    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                    'accept': '*/*',
                    'x-requested-with': 'XMLHttpRequest',
                    'sec-ch-ua-mobile': '?0',
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'origin': 'https://yt1s.com',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://yt1s.com/en5',
                    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                    'cookie': '__cfduid=dae3087fc6b5a660de9323c890235e84c1619289707; _ga=GA1.2.1357389085.1619289710; _gid=GA1.2.691330434.1619289710; __atssc=google%3B1; __atuvc=2%7C16; __atuvs=608478a21dad09e9000'
                },
                body: 'vid=' + request.videoId + '&k=' + authKey
            }).then(response => response.json())
              .then(_data => callback(_data.dlink));
          })

        return true; // prevents the callback from being called too early on return
    }
});
