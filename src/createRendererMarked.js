var marked = require('marked');

export function getRenderer(){
  var renderer = new marked.Renderer();
  renderer.paragraph = function (text) {
    var parsedText = replaceLinkSample(text).html();
    return '<p>'+parsedText+'</p>';
  }
  renderer.listitem = function(text) {
    var parsedText = replaceLinkSample(text).html();
    return '<li>'+parsedText+'</li>';
  }
  renderer.link = function(href, title, text) {
    if (href.includes('#')) {
      return text; // DON'T render link in case of 'http://'-prefixed OCCI kind URLs within JSON samples
      // else SyntaxError: JSON.parse: expected ',' or '}' after property value in object at line 1 column 116 of the JSON data
      // NB. HACK, not yet found a better way to detect OCCI kinds (would require to hack a visit state in marked ?)
      // NB. old erocci infra samples had schemes and kinds that started by www. rather than http://
      // ex. www.schemas.ogf.org/occi/infrastructure#storagelink rather than http://schemas.ogf.org/occi/infrastructure#storagelink
    }
    var link = '<a href="' + href + "'";
    if (title) {
      link += ' title="' + title + '"';
    }
    link += '>' + text + '</a>';
    return link;
  }
  return renderer;
}

function replaceLinkSample(content){
  content = content.replace(/&quot;/g, '"');
  var cache = replaceLinkSampleParagraph(content);
  var parsedText = cache.element;

  //we keep formating until there is no %{}% in the current text
  while(cache.finish !== true){
    parsedText = cache.element;
    cache = replaceLinkSampleParagraph(parsedText.html());
  }
  return parsedText;
}

//replace the first ocurence of %{}% in a paragraph
function replaceLinkSampleParagraph(fullText){
  var beforeString = '';
  var afterString = '';

  var fillBefore = true;
  var fillAfter = false;

  var indexBeginContent = 0;

  var content = '';

  for(var i=0; i<fullText.length; i++){
    if(i !== fullText.length-1){
      if(fullText[i] === '%' && (fullText[i+1] === '{' || fullText[i+1] === '[')){
        indexBeginContent = i;
        fillBefore = false;
      }
      if((fullText[i] === '}' || fullText[i] === ']') && fullText[i+1] === '%'){
        content = fullText.slice(indexBeginContent,i+2);
        fillAfter = true;
      }
    }

    if(fillBefore){
      beforeString += fullText[i];
    }
    if(fillAfter){
      afterString += fullText[i];
    }
  }

  //if there is no content, there is no %{}% and only a beforeString
  if(content !== ''){
    afterString = afterString.slice(2);
    
    try {
      content = JSON.parse(content.slice(1, -1));
    } catch (syntaxError) {
      console.log('error', syntaxError, 'while parsing', content.slice(1, -1));
      throw syntaxError;
    }
    

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    content.uuid = uuid;

    //we expose this data into the global context, so that we can recover it when clicking
    if(!window.sampleDatas){
      window.sampleDatas = [content];
    }
    else{
      window.sampleDatas.push(content);
    }

    //we replace with a green link + icon
    var link = $('<a class="sampleLink" href="'+content.uuid+'">'+content.text+'</a>');
    var p = $('<p></p>');

    // var before = $('<span>'+ beforeString +' </span>');
    // var after = $('<span> '+ afterString +'</span>');

    //we convert our string to a jquery object
    p.append($.parseHTML(beforeString));
    p.append(link);
    p.append(' <i class="upload icon"></i>');
    p.append($.parseHTML(afterString));

    return {element: p, finish: false};
  }
  else{
    var p = $('<p></p>');
    p.append($.parseHTML(beforeString));
    return {element: p, finish: true};
  }
}
