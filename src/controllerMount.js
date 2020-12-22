/**
 * 定义controller的行为
 */

const constants = require("./constants");
require('./roomMount');

module.exports = function(){
    _.assign(StructureController.prototype, extentions);
}

const extentions = {
    work : function(){
        //每隔20tick进行一次检查
        if(Game.time % 20) return;
        
        //当等级发生变化时
        if(this.stateChanged()) this.onLevelChange();
    },

    stateChanged : function () {
        if(this.room.memory.controllerLevel != this.level){
            this.room.memory.controllerLevel = this.level;
            return true;
        }
        return false;
    },

    onLevelChange : function() {
        switch(this.level){
            case 1 : 
                this.room.releaseCreep(constants.HARVESTER);
                this.room.releaseCreep(constants.BUILDER);
        }
    }
}