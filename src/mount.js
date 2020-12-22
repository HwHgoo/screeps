const creepMount = require('./creepMount');
const controllerMount = require('./controllerMount');
const roomMount = require('./roomMount');

module.exports = function(){
    creepMount();
    controllerMount();
    roomMount();
}