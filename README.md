
# channelFrame - channel data transactions

The transaction manager has following responsibilities:

1. To ensure the same change is not run twice on a system
2. To make sure all the commands inside a change are run propery
3. Construct a response object about the success or failure of the change
4. Return in the response object which commands failed
5. Possibly construct automatically merged version of the change to the client

# Create transaction manager

To create transaction manager, the channel ID must be provided. 

```javascript

var transaction = _channelTransaction("channel/id");

```
















   

 


   
#### Class channelTransactionModule





   
    
    


   
      
            
#### Class _channelTransaction


- [_classFactory](README.md#_channelTransaction__classFactory)
- [execute](README.md#_channelTransaction_execute)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    





   
# Class channelTransactionModule


The class has following internal singleton variables:
        
        
### channelTransactionModule::constructor( t )

```javascript

```
        


   
    
    


   
      
            
# Class _channelTransaction


The class has following internal singleton variables:
        
* _instanceCache
        
        
### <a name="_channelTransaction__classFactory"></a>_channelTransaction::_classFactory(t)


```javascript

if(!_instanceCache) _instanceCache = {};

if(_instanceCache[id]) return _instanceCache[id];

_instanceCache[id] = this;
```

### <a name="_channelTransaction_execute"></a>_channelTransaction::execute(changeFrame)


```javascript
/*
{
    id   : "transaction ID", 
    from : 10,
    to   : 20,
    commands : [
    ]
}
*/
```

### _channelTransaction::constructor( t )

```javascript

```
        


   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return t instanceof Array;
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    




