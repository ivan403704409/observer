# Observer

Dependency free publish/subscribe for JavaScript

## Examples

### Basic example

```javascript
// api:
// subscribe(name, [callback])
// subscribeOnce(name, [callback])
// unscribe(name, [function])
// publish(name)

// use in global
window.observer = new Observer()
window.observer.subscribe('fetchData', data => console.log(data))
window.observer.subscribeOnce('fetchData', data => console.log('trigger once',data))
window.observer.publish('fetchData', { name: 'xxx', age: '20' })
window.observer.publish('fetchData', { name: 'xxx', age: '30' })

// use in local:
let localObserver = new Observer()
localObserver.subscribe('fetchData', data => console.log(data))
localObserver.subscribeOnce('fetchData', data => console.log('trigger once',data))
localObserver.publish('fetchData', { name: 'xxx', age: '20' })
localObserver.publish('fetchData', { name: 'xxx', age: '30' })
```

### Alias
```javascript
let observer = new Observer()
observer.subscribe === observer.on
observer.subscribeOnce === observer.once
observer.unsubscribe === observer.off
observer.publish === observer.trigger
```javascript