
# _channelTransaction

The transaction manager has following responsibilities:

1. To ensure the same change is not run twice on a system
2. To make sure all the commands inside a change are run propery
3. Construct a response object about the success or failure of the change
4. Return in the response object which commands failed
5. Possibly construct automatically merged version of the change to the client

# Create transaction manager

To create transaction manager, the channel ID must be provided. 

```javascript
var transaction = _channelTransaction("channel/id", channelDataObject);
```

The channelDataObject is instance of [_channelData](https://github.com/terotests/_channelObjects)


# Format of transaction 

Transaction object has following properties

1. `id` unique id UUID of the transaction
2. `version` indicates the main file version (currently not used)
3. `from` the line where the transaction starts, if lines are not matching, the transaction could still proceed, but for now it does not.
3. `fail_all` if set to true, all commands must succeed in order to transaction to complete
4. `fail_tolastok` if set to true, all successfull commands will be saved until first error
5. `commands` is array of [Channel Object commands](https://github.com/terotests/_channelObjects)

The `fail_all` is "all or nothing" -mode where all commands either fail or succeed.

The `fail_tolastok` is "go until failure" -mode where commands are processed until first error and client is asked to roll back to that situation.

```javascript
{
    id   : "transaction ID",        // unique ID for transaction
    version : 1,                    // channel version
    from : 10,                      // journal line to start the change
    to   : 20,                      // the last line ( optionsl, I guess )
    fail_all : false,               // fail all commands if failure
    fail_tolastok : true,           // fail until last ok command
    commands : [
                                    // list of channel commands to run
    ]
}
```

# Return values from transaction

## Success

The success object has

1. `result` is se to `true`
2. `validCnt` number of valid commands in the request frame


```javascript
{ "id":"transaction ID",
  "from":0,
  "result":true,        // <-- indicates the transaction was OK.
  "rollBack":false   
}
```

## Failure

The failure object has

1. `result` is se to `false`
2. `rollBack` can be true / false
3. `rollBackTo` indicates the journal line the client should rollback to
4. `validCnt` number of valid commands in the request frame


```javascript
{   "id":"transaction ID",
    "validCnt" : 2,         // number of valid commands
    "from":3,
    "result":false,
    "rollBack":true,
    "failed":[],
    "rollBackTo":3          // <- line the client should roll back to
}
```
















   

 


   
#### Class channelTransactionModule





   
    
    


   
      
            
#### Class _channelTransaction


- [_classFactory](README.md#_channelTransaction__classFactory)
- [execute](README.md#_channelTransaction_execute)
- [rollBack](README.md#_channelTransaction_rollBack)



   
    
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
        
        
### <a name="_channelTransaction__classFactory"></a>_channelTransaction::_classFactory(id)


```javascript

if(!_instanceCache) _instanceCache = {};

if(_instanceCache[id]) return _instanceCache[id];

_instanceCache[id] = this;
```

### <a name="_channelTransaction_execute"></a>_channelTransaction::execute(changeFrame)


```javascript
// The result of the transaction
var res = {
    id : changeFrame.id,
    from : changeFrame.from,
    result : false, 
    rollBack : false,
    failed : []
};

if(!changeFrame.id) return res;

if(this._done[changeFrame.id]) return res;

this._done[changeFrame.id] = true;

try {

    var line = this._channel.getJournalLine();
    if(changeFrame.from != line) {
        res.invalidStart = true;
        res.result = false;
        res.correctStart = changeFrame.from;
        res.correctLines = [];
        for(var i=changeFrame.from; i<line; i++ ) {
            res.correctLines.push( this._channel._journal[i] );
        }
        return res;
    }
    
    var okCnt = 0, failCnt = 0;
    // the list of commands
    for(var i=0; i<changeFrame.commands.length; i++) {
        var c = changeFrame.commands[i];
        if(this._channel.execCmd(c)) {
            // the command was OK
            okCnt++;
        } else {
            // if command fails, ask the client to roll back 
            if(changeFrame.fail_tolastok) {
                //res.rollBack   = true;
                res.validCnt   = okCnt;
                //res.rollBackTo = okCnt + res.from;
                
                var line = this._channel.getJournalLine();
                res.correctStart = changeFrame.from;
                res.correctLines = [];
                for(var i=changeFrame.from; i<line; i++ ) {
                    res.correctLines.push( this._channel._journal[i] );
                }                
                
            } else {            
                //res.rollBack   = true;
                res.validCnt   = 0;
                //res.rollBackTo =  res.from;
                this._channel.undo( okCnt ); // UNDO all the commands
                
                var line = this._channel.getJournalLine();
                res.correctStart = changeFrame.from;
                res.correctLines = [];
                for(var i=changeFrame.from; i<line; i++ ) {
                    res.correctLines.push( this._channel._journal[i] );
                }                 
                
            }           
            return res;
        }
    }
    if( res.failed.length == 0 ) res.result = true;

    var line = this._channel.getJournalLine();
    res.correctStart = changeFrame.from;
    res.correctLines = [];
    for(var i=changeFrame.from; i<line; i++ ) {
        res.correctLines.push( this._channel._journal[i] );
    }      
    
    res.validCnt = okCnt;
    return res;
} catch(e) {
    res.result = false;
    return res;
}
```

### _channelTransaction::constructor( channelId, channelData )

```javascript

this._channelId = channelId;
this._channel = channelData;

this._done = {};

```
        
### <a name="_channelTransaction_rollBack"></a>_channelTransaction::rollBack(channelData, res)
`channelData` a _channelData -object to roll back
 
`res` The response from transaction
 

a convenience / example method to help clients to roll the response back
```javascript
if( channelData && res && res.rollBack ) {
    // res.rollBackTo has the index to roll back to
    channelData.reverseToLine( res.rollBackTo  );
}

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
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


    
    


   
      
    



      
    




