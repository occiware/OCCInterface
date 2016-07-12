export function callAPI(operation, relativeUrl, currentSuccess, currentError, additionalHeaders, data){
  var headers = {
    // 'If-None-Match': -1,
    'Accept' : 'application/json'
  };
  headers = $.extend(headers, additionalHeaders);

  $.ajax({
    url: relativeUrl,
    type: currentOperation,
    headers: headers,
    data: data,
    success: currentSuccess,
    error: currentError
  });
}
