export function callAPI(operation, relativeUrl, currentSuccess, currentError, additionalHeaders, data){
  var url = 'http://localhost:8080'+relativeUrl;

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
