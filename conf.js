//the list of servers we can access
const serverPaths = [
  'http://malmo.lizenn.net:8080',
  'http://localhost:8080'
]

//the adress used internally in the application to proxy
const proxyURL = '/proxiedOCCIServer';

//the adress of the initial backend Server
const backendURL = serverPaths[0];

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


module.exports = {initialState, proxyURL, backendURL, serverPaths};
