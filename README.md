### My Screeps AI
##### 思路参考HoPGoldy大佬https://github.com/HoPGoldy/my-screeps-ai
#### 进度：
##### 所有用到的memory结构:

```js
creep.memory : {
	role
	sourceId  //creep收集资源的地方
	targetId  //creep消耗资源的目标
	//harvester 比较特殊， source阶段是维护container，target阶段是采矿
}

room.memory.containers : 一个存放房间内creep采矿时用到的所有container id的数组，在harvester的source阶段被初始化及赋值

Memory.stats : //暂时只有rooms
Memory.stats.rooms : {
	roomName : {
					controllerRatio //controller升级进度
					controllerLevel //当前controller等级
	}
}

room.memory.spawnList : 房间的生产队列

Memory.creepConfigs : {
	name : {} // 键名为creep.name;值为creep的初始memory，一般包括role和roomName两个属性
}

room.memory.sources : 存放房间所有的source Id以及它们对应的link 的id

```

##### role.base.js

实现了：

- harvester、builder、upgrader、filler的工作逻辑

需要：

- [x] `Position.prototype.setConstructionSite(type)`
- [x] `room.memory.containers`
- [x] `room.releaseCreep的实现`
- [x] `creep.prototype.getEnergyFrom(source)的实现`
- [x] `creep.prototype.upgrade()的实现`
- [x] `position.prototype.inRangeto(pos)的实现`
- [x] `creep.prototype.getTask(role)的实现`
- [x] `creep.prototype.fill(id)`
- [x] `creep.prototype.buildStructure(siteid)`





##### structure.controller.js

实现了:

- `work() //工作逻辑`
- `onLevelChange() //当检测到controller等级变化时执行相应的房间规划`
- `stateScanner() //用以检测房间等级变化 return false | true`

需要 :

- [x] `Memory.stats`
- [x] `Memory.stats.rooms`








##### structure.spawn.js

实现了:

- `work() //工作逻辑`
- `mySpawnCreep(configName) //生成creep的函数`
- `getBody(role) //根据角色和基地状况获取creep的身体部件`
- `hangTask() //挂起任务`

需要：

- [x] `room.addTranferTask()`
- [x] `room.memory.spawnList`
- [x] `Memory.creepConfigs`
- [x] `setting.bodyConfigs`







##### mount.creep.js

实现了：

- `work() //所有creep的工作入口`
- `getTask(role) //根据role获取任务`
- `buildStructure(targetId) //建造指定的site`
- `upgrade() //creep升级操作`
- `fill(targetId) //填充指定建筑`


需要：

`role.base.js`








##### mount.room.js

实现了：

- `work() //房间内建筑的工作入口`
- `releaseCreep(role) //提供creep发布函数给房间所属的creep或者建筑使用`
- `addSpawnTask(name) //将creep加入生产队列`
- `hasSpawnTask(name) //检测生产任务是否已经存在`
- `addTransferTask() //寻找基地内未添加的建筑任务`

需要：

- [x] `releaseCreep(role, room) //creep发布函数`






##### mount.position.js

实现了：

- `inRangeto(target, range) //检测当前位置距离target是否小于或等于range`
- `setConstructionSite //设立一个建筑工地，并添加到任务队列中`


需要：

- [x] `room.addBuildTask(siteId) //添加指定的工地`






##### controller.creep.js

实现了：

- `creepNumberListener() //负责处理已死亡的creep;需要的creep重新孵化，不需要的将其配置和Memory.creep[name]删除`
- `creepApi //为处理creep提供方法，目前只有add`
- `add(creepName, creepData) //将creep发布到Memory中`

需要：

- `addSpawnTask(name) //将creep加入生产队列`





##### plan.creep.js

实现了：

- `releasePlans // 各个role依据基地情况的发布计划`
- `planChains //计划发布链，依次执行发布计划，直至成功`
- `roleToRelease //根据不同的角色执行不同的发布计划`
- `releaseCreep(room) //向外提供的creep发布函数`

需要：

- [x] `room.memory.sources`







