/**
 * 自定义事件（订阅/广播）
 * demo: 
 * use in global:
  	window.observer = new Observer()
  	window.observer.on('fetchData', data => console.log(data))
  	window.observer.once('fetchData', data => console.log('只触发一次',data))
  	window.observer.trigger('fetchData', { name: 'xxx', age: '20' })
 
 * use in local:
  	localObserver = new Observer()
	localObserver.on('fetchData', data => console.log(data))
	localObserver.once('fetchData', data => console.log('只触发一次',data))
	localObserver.trigger('fetchData', { name: 'xxx', age: '20' })

 * alais: 
	observer.subscribe === observer.on
	observer.subscribeOnce === observer.once
	observer.unsubscribe === observer.off
	observer.publish === observer.trigger
 */
export default class Observer {
	constructor() {
		this._repository = {}
	}

	/**
	 * 事件监听(订阅)
	 * @param  {String}   eventName [事件名]
	 * @param  {Function} fn        [回调]
	 * @return {[type]}             [description]
	 */
	on(eventName, fn){
		let o = this._repository
		if( !o[eventName] )o[eventName] = []
		o[eventName].push(fn)
	}

	/**
	 * 事件监听(订阅)，只监听一次，执行一次后会被移除出监听队列
	 * @param  {[String]}   eventName [description]
	 * @param  {Function} fn        [description]
	 * @return {[type]}             [description]
	 */
	once(eventName, fn){
		fn.__isOnce = true
		this.on(eventName, fn)
	}

	/**
	 * 取消监听(订阅)
	 * @param  {[String]}   eventName [事件名]
	 * @param  {Function} fn        [回调函数]
	 * @return {[type]}             [description]
	 */
	off(eventName, fn){
		let o = this._repository
		if(arguments.length===1){
			delete o[eventName]
			return
		}
		let index = -1
		if( (index=o[eventName].indexOf(fn)) !== -1 ){
			o.splice(index, 1)
		}
	}

	/**
	 * 触发事件(广播)
	 * @return {[type]} [description]
	 */
	trigger(){
		let o = this._repository
		let [eventName, ...args] = arguments
		let evs = o[eventName]
		if(evs){
			evs.forEach(function(fn){
				fn(...args)
				if(fn.__isOnce){
					let index = evs.indexOf(fn)
					evs.splice(index)
				}
			})
		}
	}

}
Observer.prototype.subscribe = Observer.prototype.on
Observer.prototype.subscribeOnce = Observer.prototype.once
Observer.prototype.unsubscribe = Observer.prototype.off
Observer.prototype.publish = Observer.prototype.trigger