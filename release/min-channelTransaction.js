(function(){var n={},t=function(){var t=function(){!function(n){n.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},n.isArray=function(n){return n instanceof Array},n.isFunction=function(n){return"[object Function]"==Object.prototype.toString.call(n)},n.isObject=function(n){return n===Object(n)}}(this),function(n){var t;n.hasOwnProperty("__factoryClass")||(n.__factoryClass=[]),n.__factoryClass.push(function(n){return t||(t={}),t[n]?t[n]:void(t[n]=this)}),n.execute=function(n){var t={id:n.id,from:n.from,result:!1,rollBack:!1,failed:[]};if(!n.id)return t;if(this._done[n.id])return t;this._done[n.id]=!0;try{var i=this._channel.getJournalLine();if(n.from!=i){t.invalidStart=!0,t.result=!1,t.correctStart=n.from,t.correctLines=[];for(var r=n.from;i>r;r++)t.correctLines.push(this._channel._journal[r]);return t}for(var a=0,r=0;r<n.commands.length;r++){var e=n.commands[r];if(!this._channel.execCmd(e))return n.fail_tolastok?(t.rollBack=!0,t.validCnt=a,t.rollBackTo=a+t.from):(t.rollBack=!0,t.validCnt=0,t.rollBackTo=t.from,this._channel.undo(a)),t;a++}return 0==t.failed.length&&(t.result=!0),t.validCnt=a,t}catch(o){return t.result=!1,t}},n.__traitInit&&!n.hasOwnProperty("__traitInit")&&(n.__traitInit=n.__traitInit.slice()),n.__traitInit||(n.__traitInit=[]),n.__traitInit.push(function(n,t){this._channelId=n,this._channel=t,this._done={}}),n.rollBack=function(n,t){n&&t&&t.rollBack&&n.reverseToLine(t.rollBackTo)}}(this)},i=function(n,t,r,a,e,o,c,l){var f,s=this;if(!(s instanceof i))return new i(n,t,r,a,e,o,c,l);var u=[n,t,r,a,e,o,c,l];if(s.__factoryClass)if(s.__factoryClass.forEach(function(n){f=n.apply(s,u)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(n,t,r,a,e,o,c,l)}else if(f)return f;s.__traitInit?s.__traitInit.forEach(function(n){n.apply(s,u)}):"function"==typeof s.init&&s.init.apply(s,u)};i._classInfo={name:"_channelTransaction"},i.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(n._channelTransaction=i,this._channelTransaction=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._channelTransaction=i:this._channelTransaction=i}.call(new Function("return this")()),function(n){n.__traitInit&&!n.hasOwnProperty("__traitInit")&&(n.__traitInit=n.__traitInit.slice()),n.__traitInit||(n.__traitInit=[]),n.__traitInit.push(function(){})}(this)},i=function(n,t,r,a,e,o,c,l){var f,s=this;if(!(s instanceof i))return new i(n,t,r,a,e,o,c,l);var u=[n,t,r,a,e,o,c,l];if(s.__factoryClass)if(s.__factoryClass.forEach(function(n){f=n.apply(s,u)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(n,t,r,a,e,o,c,l)}else if(f)return f;s.__traitInit?s.__traitInit.forEach(function(n){n.apply(s,u)}):"function"==typeof s.init&&s.init.apply(s,u)};i._classInfo={name:"channelTransactionModule"},i.prototype=new t,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(n)}).call(new Function("return this")());