import React from 'react';
import ArrayJSON from './components/reactifyJSON/ArrayJSON.js';
import ObjectJSON from './components/reactifyJSON/ObjectJSON.js';
import KeyValueJSON from './components/reactifyJSON/KeyValueJSON.js';
import ValueJSON from './components/reactifyJSON/ValueJSON.js';


export function callAPI(operation, relativeUrl, currentSuccess, currentError, additionalHeaders, data, asynchronous, timeout){
  if(window.integratedVersion){
    var url = 'http://localhost:8080'+relativeUrl;
  }
  else{
    var url = window.proxyURL+relativeUrl;
  }

  var headers = {
    // 'If-None-Match': -1,
    'Accept' : 'application/json'
  };
  headers = $.extend(headers, additionalHeaders);

  if(asynchronous === 'undefined' || asynchronous === null){
    var asynchronous = true;
  }

  return $.ajax({
    url: url,
    type: operation,
    headers: headers,
    data: data,
    success: currentSuccess,
    error: currentError,
    async: asynchronous
  });
}


function isNumber(obj) { return !isNaN(parseFloat(obj)) }
function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
function isObject(what) {
    return Object.prototype.toString.call(what) === '[object Object]';
}

//iterate through a JS object to reactify it.
//In JSON, you can have an array, an object, a key value, or a value
function iterateRec(json, depth, sharedProps){
  //we push JSON elements reactified into jsonElements
  var jsonElements = [];
  var currentType = 'none';

  if (json.constructor === Object){
    currentType = 'object';
  }
  else if(json.constructor === Array){
    currentType = 'array';
  }

  //we iterate through  the current object, and take a React representation of each constituting element
  for(var i in json){
    if (isObject(json[i])){
      //we clone the element to add a new props : the key
      var object = React.cloneElement(iterateRec(json[i], depth+1, sharedProps), {key: i});
      if(currentType === 'object'){
        object = <KeyValueJSON value={object} myKey={i} depth={depth+1} firstElement={true} tools={sharedProps} key={i}/>
      }
      jsonElements.push(object);
    }
    else if(isArray(json[i])){
      var array = React.cloneElement(iterateRec(json[i], depth+1, sharedProps), {key: i});

      if(currentType === 'object'){
        array = <KeyValueJSON value={array} myKey={i} depth={depth+1} firstElement={true} tools={sharedProps} key={i}/>
      }
      jsonElements.push(array);
    }
    else{
      if(isNumber(i)){
        //on cree une value car on est dans un tableau
        var value = <ValueJSON value={json[i]} depth={depth+1} tools={sharedProps} key={i}/>
        jsonElements.push(value);
      }
      else{
        //on cree une keyvalue car on est dans un objet
        var value = <ValueJSON value={json[i]} tools={sharedProps}/>
        var keyValue = <KeyValueJSON value={value} myKey={i} depth={depth+1} tools={sharedProps} key={i}/>
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
    if(depth === 0){
      return <ObjectJSON elements={jsonElements} depth={depth} lastElement={true}/>
    }
    return <ObjectJSON elements={jsonElements} depth={depth}/>
  }
  else if(currentType === 'array'){
    if(depth === 0){
      return <ArrayJSON elements={jsonElements} depth={depth} lastElement={true}/>
    }
    return <ArrayJSON elements={jsonElements} depth={depth}/>
  }

}

export function toolify(json, sharedProps) {
  //toolify the URLS
  json = iterateRec(json, 0, sharedProps);

  return json;
}

export function sanitizeSampleLinks(content){
  var sampleLink = '';
  var textBefore = '';
  var finalContent = '';

  var copyTextBefore = true;
  var copySampleLink = false;

  for(var i=0; i<content.length; i++){
    //specific case. Last iteration, we didn't copy the %
    if(!copyTextBefore && !copySampleLink){
      copyTextBefore = true;
    }
    if(i !== content.lenght-1 && content[i] === '%' && content[i+1] === '{'){
      copyTextBefore = false;
      copySampleLink = true;
    }
    else if(i > 0 && content[i-1] === '}' && content[i] === '%'){
      copySampleLink = false;
      copyTextBefore = false;

      sampleLink += '%';
      
      //we replace new lines into the content part
      sampleLink = sampleLink.replace(/(\r\n|\n|\r)/gm, ' ');

      finalContent += textBefore+sampleLink;

      //re init
      textBefore = '';
      sampleLink = '';
    }

    if(copySampleLink){
      sampleLink += content[i];
    }
    if(copyTextBefore){
      textBefore += content[i]
    }
  }

  finalContent += textBefore+sampleLink;

  return finalContent;

}
