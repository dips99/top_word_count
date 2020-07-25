var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var getText = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://norvig.com/big.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                // console.log(request.responseText);
                var data = request.responseText;
                var words_arr = splitWord(data);
                var words_map = buildWordMap(words_arr);
                var final_array = sortWordCount(words_map);
                
                for (var i = 0; i < 10; i++) {
                    console.log(final_array[i].name + " occurs " +
                        final_array[i].occurance + " times");

                }
            }
        }
    }
}

var splitWord = function(word) {
    var words_arr = word.split(/\s+/);
    return words_arr;
}

var buildWordMap = function(words_arr) {
    var words_map = {};
    words_arr.forEach(function (key) {
        if (words_map.hasOwnProperty(key)) {
            words_map[key]++;
        } else {
            words_map[key] = 1;
        }
    });
    return words_map;
}

var sortWordCount = function(words_map) {
    var final_array = [];
    final_array = Object.keys(words_map).map(function (key) {
        return {
            name: key,
            occurance: words_map[key]
        };
    });
    final_array.sort(function (a, b) {
        return b.occurance - a.occurance;
    });
    return final_array;
}
getText();