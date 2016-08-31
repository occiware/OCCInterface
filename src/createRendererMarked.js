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

    content = JSON.parse(content.slice(1, -1));

    //we expose this data into the global context, so that we can recover it when clicking
    if(!window.sampleDatas){
      window.sampleDatas = [content];
    }
    else{
      window.sampleDatas.push(content);
    }

    //we replace with a green link + icon
    var link = $('<a class="sampleLink" href="'+content.label+'">'+content.text+'</a>');
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
