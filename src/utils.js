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
function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
function isObject(what) {
    return Object.prototype.toString.call(what) === '[object Object]';
}
//iterate through a JS object to access all the right parts, and apply transformation
function iterateRec(json, depth, sharedProps){
  //we push infos into this array
  var jsonElements = [];
  var currentType = 'none';

  if (json.constructor === Object){
    currentType = 'object';
  }
  else if(json.constructor === Array){
    currentType = 'array';
  }

  for(var i in json){
    if (isObject(json[i])){
      var object = iterateRec(json[i], depth+1, sharedProps);
      if(currentType === 'object'){
        object = <KeyValueJSON value={object} myKey={i} depth={depth+1} firstElement={true} tools={sharedProps}/>
      }
      jsonElements.push(object);
    }
    else if(isArray(json[i])){
      var array = iterateRec(json[i], depth+1, sharedProps);
      if(currentType === 'object'){
        array = <KeyValueJSON value={array} myKey={i} depth={depth+1} firstElement={true} tools={sharedProps}/>
      }
      jsonElements.push(array);
    }
    else{
      if(isNumber(i)){
        //on cree une value car on est dans un tableau
        var value = <ValueJSON value={json[i]} depth={depth+1} tools={sharedProps}/>
        jsonElements.push(value);
      }
      else{
        //on cree une keyvalue car on est dans un objet
        var value = <ValueJSON value={json[i]} tools={sharedProps}/>
        var keyValue = <KeyValueJSON value={value} myKey={i} depth={depth+1} tools={sharedProps}/>
        jsonElements.push(keyValue);
      }
    }
  }

  //now we take what is in the array to transfer props to the json element,
  //depending on its type
  var jsonReact;

  //we add a prop lastElement to the last Element so that we don't put a comma after it

  if (jsonElements.length > 0){
    var lastElement = jsonElements[jsonElements.length-1];
    jsonElements.pop();
    jsonElements.push(React.cloneElement(lastElement, {lastElement: true}));
  }


  if (currentType === 'object'){
    jsonReact = <ObjectJSON elements={jsonElements} depth={depth}/>
  }
  else if(currentType === 'array'){
    jsonReact = <ArrayJSON elements={jsonElements} depth={depth}/>
  }

  return jsonReact;
}

export function toolify(json, sharedProps) {
  //toolify the URLS

  json = iterateRec(json, 0, sharedProps);

  // json = syntaxHighlight(json);

  return json;

}
