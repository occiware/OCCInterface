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
function iterateRec(json, depth){
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
      var object = iterateRec(json[i], depth+1);
      if(currentType === 'object'){
        object = <KeyValueJSON value={object} myKey={i} depth={depth+1}/>
      }
      jsonElements.push(object);
    }
    else if(isArray(json[i])){
      var array = iterateRec(json[i], depth+1);
      if(currentType === 'object'){
        array = <KeyValueJSON value={array} myKey={i} depth={depth+1}/>
      }
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
  if (currentType === 'object'){
    jsonReact = <ObjectJSON elements={jsonElements} depth={depth}/>
  }
  else if(currentType === 'array'){
    jsonReact = <ArrayJSON elements={jsonElements} depth={depth}/>
  }

  return jsonReact;
}

export function toolify(json) {
  //toolify the URLS

  // json = JSON.stringify(iterateRec(json),null,2);

  json = iterateRec(json, 0);

  // json = syntaxHighlight(json);

  return json;

}
