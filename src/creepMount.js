const constants = require("./constants");

module.exports = function(){
    _.assign(Creep.prototype, extensions);
}

const extensions = {
    harvesterWork : function(){
        if(!Game.rooms[this.memory.roomName].memory.roles.includes(constants.BUILDER)){
            this.say('harvester已死，collector当立')
            return;
        }

        if(this.spawning)
            return;

        //如果快死时还有工作
        if(this.hits <= 3){

        }

        //快死时
        if(this.hits == 1){
            if(this.room.memory.roles.includes[this.role])
                this.room.memory.spawnList.push(this.name,role);
        }

        //container位置还没定
        if(!this.memory.container){
            this.say('我站哪儿呀？')
            const sourcePos = Game.getObjectById(this.memory.sourceid).pos;
            const terrian = new Room.Terrain(this.memory.roomName);
            //遍历source周围，查找空地
            for(let x = pos.x - 1; x <= pos.x + 1; ++x){
                if(this.memory.container != null) break;
                for(let y = pos.y - 1; y <= pos.y; ++y){
                    if(terrian.get(x, y) == 0){
                        //设置container工地
                        let createState = this.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
                        if(createState == OK){
                            this.memory.container = new RoomPosition(x, y, this.room.name);
                        }   
                    }
                }
            }
        }

        //container还没建完
        const site = this.room.lookForAt(LOOK_CONSTRUCTION_SITES, this.room.container);
        if(this.room.lookForAt(LOOK_CONSTRUCTION_SITES, this.room.container).length > 0){
            const source = Game.getObjectById(this.memory.sourceid);
            this.moveTo(source);
            if(this.store[RESOURCE_ENERGY] > 0){
                let code = this.build(site[0]);
                this.say('building container, code: ' + code);
            }
            else{
                let code = this.harvest(source);
                this.say('harvesting, code: ' + code);
            }
        }
        else{//container已建造完毕
            if(this.pos.x != this.memory.container.x || this.pos.y != this.memory.container.y){
                this.moveTo(this.memory.container);
            }
            else{
                this.harvest(Game.getObjectById(this.memory.sourceid));
            }
        }

    },

    builderWork : function(){
        if(!this.room.memory.roles.includes[constants.BUILDER]){
            this.memory.role = constants.UPGRADER;
            this.say('建造结束，开始升级');
        }

        if(this.room.memory.buildQueue.length <= 0){
            this.room.memory.roles.slice()
        }
    }
}