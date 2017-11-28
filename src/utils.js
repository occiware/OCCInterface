import React from 'react';
import ArrayJSON from './components/reactifyJSON/ArrayJSON.js';
import ObjectJSON from './components/reactifyJSON/ObjectJSON.js';
import KeyValueJSON from './components/reactifyJSON/KeyValueJSON.js';
import ValueJSON from './components/reactifyJSON/ValueJSON.js';

function occiProxyRewrite(resources) {
  for (var rInd in resources) {
    var resource = resources[rInd];
    if (resource['location']) { // resource
      var location = resource['location'];
      if (!location.includes('://')) {
        if (!location.startsWith('/')) { // Mart ex. 6df690d2-3158-40c4-88fb-d1c41584d6e5 or compute/6df690d2-3158-40c4-88fb-d1c41584d6e5
          location = '/' + location;
        }
        resource['location'] = window.backendURL + location;
      }
    } else if (resource[0]) { // list
      occiProxyRewrite(resource);
    }
  }
}

export function toRelativeUrl(relativeUrl) {
  var absoluteUrlMadeRelative = relativeUrl.replace(/.+:\/\/.+\/+/g, "/"); // in case is still absolute ex. resource location
  console.log('absoluteUrlMadeRelative',absoluteUrlMadeRelative);
  if (absoluteUrlMadeRelative !== relativeUrl) { // erocci ex. http://localhost:8080/compute/6df690d2-3158-40c4-88fb-d1c41584d6e5
    relativeUrl = absoluteUrlMadeRelative;
  } else if (!relativeUrl.startsWith('/')) { // Mart ex. compute/6df690d2-3158-40c4-88fb-d1c41584d6e5
    relativeUrl = '/' + relativeUrl;
  }
  return relativeUrl;
}

export function callAPI(operation, relativeUrl, currentSuccess, currentError, additionalHeaders, data, asynchronous, timeout){
  relativeUrl = toRelativeUrl(relativeUrl);
  
  //window.alert("additionalHeaders: "+additionalHeaders);

  if(window.integratedVersion){
    var url = 'http://localhost:8080'+relativeUrl;
  }
  else{
    var url = window.proxyURL+relativeUrl;
  }

  var headers = {
    // 'If-None-Match': -1,
    'Accept' : 'application/json' // NB. 'application/occi+json' also works
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
    success: (data, textStatus, jqXHR) => {
      if (data['resources']) {
        data = data['resources']; // erocci list result
      }
      occiProxyRewrite(data[0] ? data : [data]);
      return currentSuccess(data, textStatus, jqXHR);
    },
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

// functions for handling #10 prefixed by /categories/ in case of erocci only :
export function kindToCategoriesUrl(kind) {
  return window.backendCategoriesPrefix + kind;
}
export function addressToCategoriesUrl(address) {
  var addressPathElements = address.split('/').filter(function(elt) {return elt.length != 0});
  return addressPathElements.length == 1 && !address.includes('-') ? // then assumed to be a category
    window.backendCategoriesPrefix + addressPathElements[0] : address;
}
export function isErocciBackendCategoriesPrefix(kind) {
  return window.backendCategoriesPrefix === window.conf.backendCategoriesPrefix_erocci;
}

// visits QI in order to fill
// - supported OCCI schemes containing kinds and mixins
// - a map that also contain actions, allowing to put them back in kinds and mixins later
// NB. recursive because erocci and MART do not have the same QI top level structure,
// see https://github.com/cgourdin/MartServer/issues/44
export function visitMetamodel(json, kindAndMixinSchemes, uriToCategoryMap) {
  for (var key in json){
    var definition = json[key];
    if (typeof definition !== 'object') { // even arrays
      continue;
    }
    if ('scheme' in definition){
      uriToCategoryMap[definition.scheme + definition.term] = definition;
      if (!definition.scheme.endsWith('/action#')) {
        if (definition.scheme in kindAndMixinSchemes){
          kindAndMixinSchemes[definition.scheme].push(definition); // {title: definition.title, term: definition.term}
        }
        else{
          kindAndMixinSchemes[definition.scheme] = [definition]; // {title: definition.title, term: definition.term}
        }
      }
    } else {
      visitMetamodel(definition, kindAndMixinSchemes, uriToCategoryMap);
    }
  }
}
