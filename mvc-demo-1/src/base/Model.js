class Model {
    constructor(options) {
        //更好的写法
        ['data', 'update', 'create', 'delete', 'get'].forEach((key)=>{
            if(key in options) {
                this[key] = options[key]
            }
        })
        // this.data = options.data //data在对象身上，this就是当前对象本身身上
        // this.update = options.update
        // this.create = options.create
        // this.delete = options.delete
        // this.get = options.get
    }
    //以下四个函数在原型上
    create() {
        console && console.error && console.error('你还没有实现 create')
    }
    delete() {
        console && console.error && console.error('你还没有实现 delete')
    }
    update() {
        console && console.error && console.error('你还没有实现 update')
    }
    get() {
        console && console.error && console.error('你还没有实现 get')
    }
}

export default Model