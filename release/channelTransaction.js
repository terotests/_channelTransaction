// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var channelTransactionModule_prototype = function channelTransactionModule_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var _channelTransaction_prototype = function _channelTransaction_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {
          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return t instanceof Array;
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instanceCache;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id) {

          if (!_instanceCache) _instanceCache = {};

          if (_instanceCache[id]) return _instanceCache[id];

          _instanceCache[id] = this;
        });

        /**
         * @param Object changeFrame
         */
        _myTrait_.execute = function (changeFrame) {
          // The result of the transaction
          var res = {
            id: changeFrame.id,
            from: changeFrame.from,
            result: false,
            rollBack: false,
            failed: []
          };

          if (!changeFrame.id) return res;

          if (this._done[changeFrame.id]) return res;

          this._done[changeFrame.id] = true;

          try {

            var line = this._channel.getJournalLine();
            if (changeFrame.from != line) {
              res.invalidStart = true;
            }

            var okCnt = 0,
                failCnt = 0;
            // the list of commands
            for (var i = 0; i < changeFrame.commands.length; i++) {
              var c = changeFrame.commands[i];
              if (this._channel.execCmd(c)) {
                // the command was OK
                okCnt++;
              } else {
                // if command fails, ask the client to roll back
                if (changeFrame.fail_tolastok) {
                  res.rollBack = true;
                  res.rollBackTo = okCnt + res.from;
                } else {
                  res.rollBack = true;
                  res.rollBackTo = res.from;
                  this._channel.undo(okCnt); // UNDO all the commands
                }
                return res;
              }
            }
            if (res.failed.length == 0) res.result = true;
            return res;
          } catch (e) {
            res.result = false;
            return res;
          }
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (channelId, channelData) {

          this._channelId = channelId;
          this._channel = channelData;

          this._done = {};
        });

        /**
         * a convenience / example method to help clients to roll the response back
         * @param Object channelData  - a _channelData -object to roll back
         * @param Object res  - The response from transaction
         */
        _myTrait_.rollBack = function (channelData, res) {
          if (channelData && res && res.rollBack) {
            // res.rollBackTo has the index to roll back to
            channelData.reverseToLine(res.rollBackTo);
          }
        };
      })(this);
    };

    var _channelTransaction = function _channelTransaction(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _channelTransaction) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _channelTransaction._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _channelTransaction(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _channelTransaction._classInfo = {
      name: '_channelTransaction'
    };
    _channelTransaction.prototype = new _channelTransaction_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['_channelTransaction'] = _channelTransaction;
        this._channelTransaction = _channelTransaction;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['_channelTransaction'] = _channelTransaction;
      } else {
        this._channelTransaction = _channelTransaction;
      }
    }).call(new Function('return this')());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (t) {});
    })(this);
  };

  var channelTransactionModule = function channelTransactionModule(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof channelTransactionModule) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != channelTransactionModule._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new channelTransactionModule(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  channelTransactionModule._classInfo = {
    name: 'channelTransactionModule'
  };
  channelTransactionModule.prototype = new channelTransactionModule_prototype();

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());