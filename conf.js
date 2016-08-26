//the list of servers we can access
const serverPaths = [
  'http://malmo.lizenn.net:8080',
  'http://localhost:8080',
  'http://malmo.lizenn.net:8082',
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
  // readings (toolified), or write (edit)
  codeRights: 'read',
  schemes: {schemeName: [{title: '', term: ''}]}
};

//this const will be changed when deploying on standalone. Must be true by default
const integratedVersion = false;

module.exports = {initialState: initialState, proxyURL: proxyURL, backendURL: backendURL, serverPaths: serverPaths, integratedVersion: integratedVersion};
