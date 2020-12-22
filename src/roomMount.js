const constants = require('./constants');

module.exports = function(){
    _.assign(Room.prototype, extensions);
}

const extensions = {

    run : function(){

        this.controller.work();

    },

    releaseCreep : function(role){
        //获取能量矿信息
        if(!this.memory.sources) this.getSources();
        //初始化生产队列
        if(!this.memory.spawnList) this.memory.spawnList = [];
        //初始化角色组
        if(!this.memory.roles) this.memory.roles = [];
        if(!this.memory.creeps) this.memory.creeps = {};
        switch(role){
            case constants.HARVESTER:
                for(let sourceid of this.memory.sourcesid){
                    //初始harvester的信息
                    let name = 'harvester' + sourceid;
                    let body = this.getBody(role);
                    let memory = {working : false, sourceid : sourceid, container : null, role : constants.HARVESTER, roomName : this.name}
                    //发布角色
                    this.memory.roles.push(constants.HARVESTER);
                    //将harvester信息发布到memory中
                    this.memory.creeps[name] = memory;
                    
                    //同时将harvester加入生产队列
                    this.memory.spawnList.push(name, role);
                }
                break;
            case constants.BUILDER:
                //builder的信息
                let name = 'builder' + Game.time;
                let body = this.getBody(role);
                let memory = {working : false, sourceid : null, targetid : this.memory.buildQueue.shift(), role : constants.BUILDER, roomName : this.name};
                //发布角色
                if(!this.memory.roles.includes(constants.BUILDER)) this.memory.roles.push(constants.BUILDER);
                //将builder信息发布到memory中
                this.memory.creeps[name] = memory;

                //同时将其加入生产队列
                this.memory.spawnList.push(name, role);
                break;
        }
    },

    //获取能量矿
    getSources : function(){
        this.memory.sources = [];
        const sources = this.find(FIND_SOURCES);
        for(const source of sources)
            this.memory.sources.push(source.id);
    },

    getBody : function(role){
        switch(role){
            case constants.HARVESTER:
                if(this.energyCapacityAvailable <= 300) return [WORK, WORK, MOVE, CARRY];
                if(this.energyCapacityAvailable <= 550) return [WORK, WORK, WORK, WORK, MOVE, CARRY];
                return [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY];
            case constants.BUILDER:
                if(this.energyCapacityAvailable<=300) return [WORK, MOVE, CARRY];
                return [WORK, WORK, MOVE, MOVE, CARRY, CARRY];
        }
    }
}