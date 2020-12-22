module.exports = function(grunt) {
    // 加载任务依赖
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 定义任务
    grunt.initConfig({
        // screeps 代码上传任务
        screeps: {
            options: {
                email: 'hu.wenhao@qq.com',
                password: 'YBJ_gds777',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['src/*.{js,wasm}'],
            }
        },
        // 代码变更监听任务
        watch: {
            files: "src/*.*",
            tasks: [ "screeps" ]
        }
    });
    // 注册默认任务
    grunt.registerTask("default", ["watch"])
}