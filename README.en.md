# websdk

#### Description
websdk

#### Instructions
    class Demo1 extends websdk.Dispatch {
        constructor() {
            super();
        }
        hello1 () {
            this.emit(Demo1.HELLO1, { val: 112 })
            console.info('Demo1 hello1')
            return 112
        }
        hello2 () {
            console.info('Demo1 hello2')
        }

        static get HELLO1() { return 'hello1'; }
    }

    class Demo2 extends websdk.Dispatch {
        constructor() {
            super();
        }
        hello1 () {
            console.info('Demo2 hello1')
        }
        hello2 () {
            console.info('Demo2 hello2')
        }
    }

    const sdk = {
        demo1: new Demo1()
    }

    websdk.WebSdk.impl.init({ sdk })

    websdk.WebSdk.impl.install({
        demo2: new Demo2()
    })

    const onHello1Event = function (res) {
        console.info(`demo1/${Demo1.HELLO1} =======onHello1Event========================`, res)
    }

    const onHello2Event = function (res) {
        console.info(`demo1/${Demo1.HELLO1} =======onHello2Event========================`, res)
    }

    websdk.WebSdk.impl.on('demo1', Demo1.HELLO1, onHello1Event)

    websdk.WebSdk.impl.do('demo1/hello1').then((res) => {
        console.info('demo1/hello1 then===================', res)
    }).catch((err) => {
        console.info('demo1/hello1 catch===================', err)
    })
    websdk.WebSdk.impl.do('demo1/hello2')
    websdk.WebSdk.impl.do('demo2/hello1')
    
    websdk.WebSdk.impl.off('demo1', Demo1.HELLO1, onHello1Event)
    websdk.WebSdk.impl.do('demo1/hello1')

    console.info('WebSdk on demo1===================')
    websdk.WebSdk.impl.on('demo1', Demo1.HELLO1, onHello1Event)
    websdk.WebSdk.impl.on('demo1', Demo1.HELLO1, onHello2Event)
    websdk.WebSdk.impl.do('demo1/hello1')
    // websdk.WebSdk.impl.off('demo1', Demo1.HELLO1, onHello2Event)
    websdk.WebSdk.impl.do('demo1/hello1')