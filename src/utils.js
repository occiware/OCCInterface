import React from 'react';
import ArrayJSON from './components/reactifyJSON/ArrayJSON.js';
import ObjectJSON from './components/reactifyJSON/ObjectJSON.js';
import KeyValueJSON from './components/reactifyJSON/KeyValueJSON.js';
import ValueJSON from './components/reactifyJSON/ValueJSON.js';


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


function isNumber(obj) { return !isNaN(parseFloat(obj)) }

//iterate through a JS object to access all the right parts, and apply transformation
function iterateRec(json, depth){
  //we push infos into this array
  var jsonElements = [];

  for(var i in json){
    if (json[i].constructor === Object){
      var object = iterateRec(json[i], depth+1);
      jsonElements.push(object);
    }
    else if(json[i].constructor === Array){
      var array = iterateRec(json[i], depth+1);
      jsonElements.push(array);
    }
    else{
      if(isNumber(i)){
        //on cree une value car on est dans un tableau
        var value = <ValueJSON value={json[i]} depth={depth+1}/>
        jsonElements.push(value);
      }
      else{
        //on cree une keyvalue car on est dans un objet
        var value = <ValueJSON value={json[i]}/>
        var keyValue = <KeyValueJSON value={value} myKey={i} depth={depth+1}/>
        jsonElements.push(keyValue);
      }
    }
  }

  //now we take what is in the array to transfer props to the json element,
  //depending on its type
  var jsonReact;
  if (json.constructor === Object){
    jsonReact = <ObjectJSON elements={jsonElements} depth={depth}/>
  }
  else if(json.constructor === Array){
    jsonReact = <ArrayJSON elements={jsonElements} depth={depth}/>
  }

  return jsonReact;
}

export function toolify(json) {
  //toolify the URLS

  //the function to apply to all elements on the json
  // var linksClickable = function(element){
  //   // var regexRoot = new RegExp(window.rootURL);
  //   var regexRoot = new RegExp(window.backendURL);
  //
  //   //we make the link when finding a link of the playground
  //   if (regexRoot.test(element)){
  //     return '<a href=\''+element+'\' onClick={this.linkClicked}>'+ element +'</a>';
  //   }
  //
  //   //syntax highlighting
  //   if(element === false || element === true){
  //     return '<span class=\'boolean\'>'+ element +'</span>';
  //   }
  //   else if(isNumber(element)){
  //     return '<span class=\'number\'>'+ element +'</span>';
  //   }
  //   else{
  //     return '<span class=\'string\'>'+ element +'</span>';
  //   }
  // }

  // json = JSON.stringify(iterateRec(json),null,2);

  json = iterateRec(json, 0);

  // json = syntaxHighlight(json);

  return json;

}
