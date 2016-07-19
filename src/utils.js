export function callAPI(operation, relativeUrl, currentSuccess, currentError, additionalHeaders, data){
  var url = window.rootURL+relativeUrl;

  var headers = {
    // 'If-None-Match': -1,
    'Accept' : 'application/json'
  };
  headers = $.extend(headers, additionalHeaders);

  $.ajax({
    url: url,
    type: operation,
    headers: headers,
    data: data,
    success: currentSuccess,
    error: currentError
  });
}

export function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        var regexRoot = new RegExp(window.rootURL);
        if(regexRoot.test(match)){
          return match;
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

//iterate through a JS object to access all the right parts, and apply transformation
function iterateRec(json, transformation){
  for(var i in json){
    if (json[i].constructor === Object || json[i].constructor === Array){
      json[i] = iterateRec(json[i], transformation);
    }
    else{
      json[i] = transformation(json[i]);
    }
    //we colorate the keys of the JSON
    if(isNumber(i) === false){
      json['<span class=\'key\'>'+i+'</span>'] = json[i];
      delete json[i];
    }
  }
  return json;
}

export function toolify(json) {
  //toolify the URLS

  //the function to apply to all elements on the json
  var linksClickable = function(element){
    // var regexRoot = new RegExp(window.rootURL);
    var regexRoot = new RegExp(window.rootURL);

    //we make the link when finding a link of the playground
    if (regexRoot.test(element)){
      return '<a href=\''+element+'\'>'+ element +'</a>';
    }
    //syntax highlighting
    if(element === false || element === true){
      return '<span class=\'boolean\'>'+ element +'</span>';
    }
    else if(isNumber(element)){
      return '<span class=\'number\'>'+ element +'</span>';
    }
    else{
      return '<span class=\'string\'>'+ element +'</span>';
    }
  }

  json = JSON.stringify(iterateRec(json , linksClickable),null,2);

  // json = syntaxHighlight(json);

  return json;
}
