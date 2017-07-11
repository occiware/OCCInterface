//the list of servers we can access
const serverPaths = [
  'http://malmo.lizenn.net:8080',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://malmo.lizenn.net:8082',
  'http://martserver-linkeddata-1:8081'
]

//the adress used internally in the application to proxy
const proxyURL = '/proxiedOCCIServer';

//the adress of the initial backend Server
const backendURL = serverPaths[0];

//the prefix to append to categories queries
const backendCategoriesPrefix_erocci = '/categories/';
const backendCategoriesPrefix_mart = '/';

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

//this const will be changed when deploying on standalone. Must be false by default
const integratedVersion = false;

module.exports = {initialState: initialState, proxyURL: proxyURL, backendURL: backendURL, serverPaths: serverPaths, integratedVersion: integratedVersion, backendCategoriesPrefix_erocci: backendCategoriesPrefix_erocci, backendCategoriesPrefix_mart: backendCategoriesPrefix_mart};
