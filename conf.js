
//the adress used internally in the application to proxy
const proxyURL = '/proxiedOCCIServer';

//the adress of the initial backend Server
const backendURL = 'http://malmo.lizenn.net:8080';

const initialState =  {
  currentPath: '/-/',
  currentJson: {},
  errorMessage: {
    simple: '',
    detailed: ''
  },
  okMessage: '',
  currentURLServer: backendURL,
  // lecture (toolifié), ou ecriture (edit)
  codeRights: 'read'
};



module.exports = {initialState, proxyURL, backendURL};
