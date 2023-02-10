const fs = require('fs');
const { adminSrcPath, containerFolder } = require('./constants');
const { METHOD } = require('../constants');

const rootExeDir = process.env.PWD + '/';
const arrayContainers = fs.readdirSync(adminSrcPath + containerFolder);

module.exports = {
  description: 'Scaffold boilerplate code for the data flow of a typical API call',
  prompts: [
    {
      type: 'list',
      name: 'targetedContainer',
      message: 'Which container is the location for the API call?',
      choices: arrayContainers,
    },
    {
      type: 'input',
      name: 'requestName',
      message: `What is the based name of the actions you want to dispatch to saga and redux?\nFor E.g: \'getClientInfo, updatePost\'`
    },
    {
      type: 'input',
      name: 'APIPath',
      message: 'What is the path of the API? E.g: /post/123'
    },
    {
      type: 'list',
      name: 'sagaEffect',
      message: 'Which saga/effect do you want to use for this case?',
      choices: ['takeEvery', 'takeLatest', 'debounce', 'throttle'],
    },
    {
      type: 'list',
      name: 'requestMethod',
      choices: [...Object.values(METHOD)],
      message: 'What is the method of the request ?',
    },
  ],
  actions: function(data) {
    const { targetedContainer, requestName} = data;
    const actions = [{
      type: 'console',
    }];
    if (targetedContainer && requestName) {
      const pathToReducer = rootExeDir + adminSrcPath + containerFolder + targetedContainer + '/reducer.ts';
      const pathToSaga = rootExeDir + adminSrcPath + containerFolder + targetedContainer + '/saga.ts';
      /* Populate the content to the reducer file */
      actions.push({
        type: 'append',
        path: pathToReducer,
        template: 'import { REQUEST_STATUS } from \'../../constants/common\';',
        pattern: /(?<=import.*)(?=\n{2})/,
      });
      actions.push({
        type: 'append',
        path: pathToReducer,
        template: '    {{ requestName }}Status: REQUEST_STATUS.IDLE,',
        pattern: /(?<=initialState: \{)/,
      })
      actions.push({
        type: 'append',
        path: pathToReducer,
        templateFile: rootExeDir + 'generators/templates/generatorAPIcall/reducerAPIcreation.hbs',
        pattern: /(?=\},\n\})/,
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: pathToReducer,
        templateFile: rootExeDir + 'generators/templates/generatorAPIcall/reducerAPIexport.hbs',
        pattern: /(?<=,)(?=\n\} = slice.actions)/,
        abortOnFail: true,
      });
      /* Populate the content to the saga file */
      actions.push({
        type: 'append',
        path: pathToSaga,
        template: '  yield {{ sagaEffect }}({{ camelCase requestName }}Request, {{ camelCase requestName }}Flow); ',
        pattern: /\wWatcher.*\{/,
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: pathToSaga,
        templateFile: rootExeDir + 'generators/templates/generatorAPIcall/sagaFlow.hbs',
        pattern: /(?=\nfunction.*Watcher)/,
        abortOnFail: true,
      });
      actions.push({
        type: 'append',
        path: pathToSaga,
        templateFile: rootExeDir + 'generators/templates/generatorAPIcall/sagaImportDependencies.hbs',
        pattern: /(?<=import.*)(?=\n{2})/,
        abortOnFail: true,
      });
    }
    return actions;
  }
}