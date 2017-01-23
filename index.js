class Observer {
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
		if(typeof fn!=='function')return
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
		if(typeof fn!=='function')return
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
		if(typeof fn!=='function')return
		let o = this._repository
		if(arguments.length===1){
			delete o[eventName]
			return
		}
		let evs = o[eventName]
		if(!evs)return
		let index = -1
		if( (index=evs.indexOf(fn)) !== -1 ){
			evs.splice(index, 1)
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
					evs.splice(index, 1)
				}
			})
		}
	}

}
Observer.prototype.subscribe = Observer.prototype.on
Observer.prototype.subscribeOnce = Observer.prototype.once
Observer.prototype.unsubscribe = Observer.prototype.off
Observer.prototype.publish = Observer.prototype.trigger
