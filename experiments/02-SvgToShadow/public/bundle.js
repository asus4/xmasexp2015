/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	/* global THREE */
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(/*! babel-core/polyfill */ 1);
	
	var _statsJs = __webpack_require__(/*! stats.js */ 204);
	
	var _statsJs2 = _interopRequireDefault(_statsJs);
	
	var _datGui = __webpack_require__(/*! dat-gui */ 196);
	
	var _datGui2 = _interopRequireDefault(_datGui);
	
	__webpack_require__(/*! OrbitControls */ 199);
	
	__webpack_require__(/*! ./main.styl */ 192);
	
	var _particlesMesh = __webpack_require__(/*! ./particles-mesh */ 200);
	
	var _particlesMesh2 = _interopRequireDefault(_particlesMesh);
	
	document.body.innerHTML = __webpack_require__(/*! ./body.jade */ 201)();
	var gui = new _datGui2['default'].gui.GUI();
	console.log(gui);
	
	var App = (function () {
	  function App() {
	    _classCallCheck(this, App);
	
	    this.animate = this.animate.bind(this);
	    this.initScene();
	    this.initObjects();
	    this.initDebug();
	    this.animate();
	  }
	
	  _createClass(App, [{
	    key: 'initScene',
	    value: function initScene() {
	      var FAR = 800;
	
	      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, FAR);
	      this.camera.position.set(0, 150, 30);
	
	      // SCENE
	      this.scene = new THREE.Scene();
	      this.scene.fog = new THREE.Fog(0xebf5ff, 100, FAR);
	
	      // LIGHTS
	      var ambient = new THREE.AmbientLight(0x444444);
	      this.scene.add(ambient);
	
	      var light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI * 0.4, 1);
	      light.position.set(0, 40, 80);
	      light.target.position.set(0, 0, 0);
	
	      light.castShadow = true;
	      light.shadowCameraNear = 1;
	      light.shadowCameraFar = 250;
	      light.shadowCameraFov = 50;
	
	      light.shadowBias = 0.0001;
	      light.shadowMapWidth = 2048;
	      light.shadowMapHeight = 2048;
	      this.scene.add(light);
	      this.light = light;
	
	      // RENDERER
	      this.renderer = new THREE.WebGLRenderer({
	        antialias: true
	      });
	      this.renderer.setClearColor(this.scene.fog.color);
	      this.renderer.setPixelRatio(window.devicePixelRatio);
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	      this.renderer.autoClear = false;
	
	      //
	      this.renderer.shadowMap.enabled = true;
	      this.renderer.shadowMap.type = THREE.PCFShadowMap;
	
	      //
	      document.body.appendChild(this.renderer.domElement);
	
	      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	      window.addEventListener('resize', this.onResize.bind(this));
	    }
	  }, {
	    key: 'initObjects',
	    value: function initObjects() {
	      // GROUND
	      var geometry = new THREE.PlaneBufferGeometry(100, 100);
	      var planeMaterial = new THREE.MeshPhongMaterial({
	        color: 0xfff5f5
	      });
	      var ground = new THREE.Mesh(geometry, planeMaterial);
	      ground.position.set(0, 0, 0);
	      ground.rotation.x = -Math.PI / 2;
	      ground.scale.set(10, 10, 10);
	      ground.castShadow = false;
	      ground.receiveShadow = true;
	      this.scene.add(ground);
	
	      var mesh = new _particlesMesh2['default']();
	      mesh.position.set(0, 15, 30);
	      mesh.castShadow = true;
	      mesh.receiveShadow = true;
	      this.scene.add(mesh);
	    }
	  }, {
	    key: 'initDebug',
	    value: function initDebug() {
	      this.scene.add(new THREE.CameraHelper(this.light.shadow.camera));
	
	      this.stats = new _statsJs2['default']();
	      this.stats.domElement.style.position = 'absolute';
	      this.stats.domElement.style.top = '0px';
	      document.body.appendChild(this.stats.domElement);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(t) {
	      requestAnimationFrame(this.animate);
	      this.controls.update(t);
	      this.renderer.clear();
	      this.renderer.render(this.scene, this.camera);
	
	      this.stats.update();
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      this.camera.aspect = window.innerWidth / window.innerHeight;
	      this.camera.updateProjectionMatrix();
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	    }
	  }]);
	
	  return App;
	})();
	
	new App();

/***/ },
/* 1 */
/*!**********************************!*\
  !*** ./~/babel-core/polyfill.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./lib/polyfill */ 2);


/***/ },
/* 2 */
/*!**************************************!*\
  !*** ./~/babel-core/lib/polyfill.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(/*! core-js/shim */ 3);
	
	__webpack_require__(/*! regenerator/runtime */ 190);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/*!****************************************!*\
  !*** ./~/babel-core/~/core-js/shim.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./modules/es5 */ 4);
	__webpack_require__(/*! ./modules/es6.symbol */ 37);
	__webpack_require__(/*! ./modules/es6.object.assign */ 43);
	__webpack_require__(/*! ./modules/es6.object.is */ 45);
	__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 47);
	__webpack_require__(/*! ./modules/es6.object.to-string */ 49);
	__webpack_require__(/*! ./modules/es6.object.freeze */ 51);
	__webpack_require__(/*! ./modules/es6.object.seal */ 53);
	__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 54);
	__webpack_require__(/*! ./modules/es6.object.is-frozen */ 55);
	__webpack_require__(/*! ./modules/es6.object.is-sealed */ 56);
	__webpack_require__(/*! ./modules/es6.object.is-extensible */ 57);
	__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 58);
	__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 59);
	__webpack_require__(/*! ./modules/es6.object.keys */ 60);
	__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 61);
	__webpack_require__(/*! ./modules/es6.function.name */ 62);
	__webpack_require__(/*! ./modules/es6.function.has-instance */ 63);
	__webpack_require__(/*! ./modules/es6.number.constructor */ 64);
	__webpack_require__(/*! ./modules/es6.number.epsilon */ 67);
	__webpack_require__(/*! ./modules/es6.number.is-finite */ 68);
	__webpack_require__(/*! ./modules/es6.number.is-integer */ 69);
	__webpack_require__(/*! ./modules/es6.number.is-nan */ 71);
	__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 72);
	__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 73);
	__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 74);
	__webpack_require__(/*! ./modules/es6.number.parse-float */ 75);
	__webpack_require__(/*! ./modules/es6.number.parse-int */ 76);
	__webpack_require__(/*! ./modules/es6.math.acosh */ 77);
	__webpack_require__(/*! ./modules/es6.math.asinh */ 79);
	__webpack_require__(/*! ./modules/es6.math.atanh */ 80);
	__webpack_require__(/*! ./modules/es6.math.cbrt */ 81);
	__webpack_require__(/*! ./modules/es6.math.clz32 */ 83);
	__webpack_require__(/*! ./modules/es6.math.cosh */ 84);
	__webpack_require__(/*! ./modules/es6.math.expm1 */ 85);
	__webpack_require__(/*! ./modules/es6.math.fround */ 87);
	__webpack_require__(/*! ./modules/es6.math.hypot */ 88);
	__webpack_require__(/*! ./modules/es6.math.imul */ 89);
	__webpack_require__(/*! ./modules/es6.math.log10 */ 90);
	__webpack_require__(/*! ./modules/es6.math.log1p */ 91);
	__webpack_require__(/*! ./modules/es6.math.log2 */ 92);
	__webpack_require__(/*! ./modules/es6.math.sign */ 93);
	__webpack_require__(/*! ./modules/es6.math.sinh */ 94);
	__webpack_require__(/*! ./modules/es6.math.tanh */ 95);
	__webpack_require__(/*! ./modules/es6.math.trunc */ 96);
	__webpack_require__(/*! ./modules/es6.string.from-code-point */ 97);
	__webpack_require__(/*! ./modules/es6.string.raw */ 98);
	__webpack_require__(/*! ./modules/es6.string.trim */ 99);
	__webpack_require__(/*! ./modules/es6.string.iterator */ 100);
	__webpack_require__(/*! ./modules/es6.string.code-point-at */ 105);
	__webpack_require__(/*! ./modules/es6.string.ends-with */ 106);
	__webpack_require__(/*! ./modules/es6.string.includes */ 110);
	__webpack_require__(/*! ./modules/es6.string.repeat */ 111);
	__webpack_require__(/*! ./modules/es6.string.starts-with */ 113);
	__webpack_require__(/*! ./modules/es6.array.from */ 114);
	__webpack_require__(/*! ./modules/es6.array.of */ 119);
	__webpack_require__(/*! ./modules/es6.array.iterator */ 120);
	__webpack_require__(/*! ./modules/es6.array.species */ 123);
	__webpack_require__(/*! ./modules/es6.array.copy-within */ 125);
	__webpack_require__(/*! ./modules/es6.array.fill */ 127);
	__webpack_require__(/*! ./modules/es6.array.find */ 129);
	__webpack_require__(/*! ./modules/es6.array.find-index */ 130);
	__webpack_require__(/*! ./modules/es6.regexp.constructor */ 131);
	__webpack_require__(/*! ./modules/es6.regexp.flags */ 133);
	__webpack_require__(/*! ./modules/es6.regexp.match */ 134);
	__webpack_require__(/*! ./modules/es6.regexp.replace */ 136);
	__webpack_require__(/*! ./modules/es6.regexp.search */ 137);
	__webpack_require__(/*! ./modules/es6.regexp.split */ 138);
	__webpack_require__(/*! ./modules/es6.promise */ 139);
	__webpack_require__(/*! ./modules/es6.map */ 146);
	__webpack_require__(/*! ./modules/es6.set */ 149);
	__webpack_require__(/*! ./modules/es6.weak-map */ 150);
	__webpack_require__(/*! ./modules/es6.weak-set */ 152);
	__webpack_require__(/*! ./modules/es6.reflect.apply */ 153);
	__webpack_require__(/*! ./modules/es6.reflect.construct */ 154);
	__webpack_require__(/*! ./modules/es6.reflect.define-property */ 155);
	__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 156);
	__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 157);
	__webpack_require__(/*! ./modules/es6.reflect.get */ 158);
	__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 159);
	__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 160);
	__webpack_require__(/*! ./modules/es6.reflect.has */ 161);
	__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 162);
	__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 163);
	__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 165);
	__webpack_require__(/*! ./modules/es6.reflect.set */ 166);
	__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 167);
	__webpack_require__(/*! ./modules/es7.array.includes */ 168);
	__webpack_require__(/*! ./modules/es7.string.at */ 169);
	__webpack_require__(/*! ./modules/es7.string.pad-left */ 170);
	__webpack_require__(/*! ./modules/es7.string.pad-right */ 172);
	__webpack_require__(/*! ./modules/es7.string.trim-left */ 173);
	__webpack_require__(/*! ./modules/es7.string.trim-right */ 174);
	__webpack_require__(/*! ./modules/es7.regexp.escape */ 175);
	__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 177);
	__webpack_require__(/*! ./modules/es7.object.values */ 178);
	__webpack_require__(/*! ./modules/es7.object.entries */ 180);
	__webpack_require__(/*! ./modules/es7.map.to-json */ 181);
	__webpack_require__(/*! ./modules/es7.set.to-json */ 183);
	__webpack_require__(/*! ./modules/js.array.statics */ 184);
	__webpack_require__(/*! ./modules/web.timers */ 185);
	__webpack_require__(/*! ./modules/web.immediate */ 188);
	__webpack_require__(/*! ./modules/web.dom.iterable */ 189);
	module.exports = __webpack_require__(/*! ./modules/$.core */ 8);

/***/ },
/* 4 */
/*!***********************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es5.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(/*! ./$ */ 5)
	  , $export           = __webpack_require__(/*! ./$.export */ 6)
	  , DESCRIPTORS       = __webpack_require__(/*! ./$.descriptors */ 11)
	  , createDesc        = __webpack_require__(/*! ./$.property-desc */ 10)
	  , html              = __webpack_require__(/*! ./$.html */ 17)
	  , cel               = __webpack_require__(/*! ./$.dom-create */ 18)
	  , has               = __webpack_require__(/*! ./$.has */ 20)
	  , cof               = __webpack_require__(/*! ./$.cof */ 21)
	  , invoke            = __webpack_require__(/*! ./$.invoke */ 22)
	  , fails             = __webpack_require__(/*! ./$.fails */ 12)
	  , anObject          = __webpack_require__(/*! ./$.an-object */ 23)
	  , aFunction         = __webpack_require__(/*! ./$.a-function */ 16)
	  , isObject          = __webpack_require__(/*! ./$.is-object */ 19)
	  , toObject          = __webpack_require__(/*! ./$.to-object */ 24)
	  , toIObject         = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , toInteger         = __webpack_require__(/*! ./$.to-integer */ 28)
	  , toIndex           = __webpack_require__(/*! ./$.to-index */ 29)
	  , toLength          = __webpack_require__(/*! ./$.to-length */ 30)
	  , IObject           = __webpack_require__(/*! ./$.iobject */ 27)
	  , IE_PROTO          = __webpack_require__(/*! ./$.uid */ 14)('__proto__')
	  , createArrayMethod = __webpack_require__(/*! ./$.array-methods */ 31)
	  , arrayIndexOf      = __webpack_require__(/*! ./$.array-includes */ 36)(false)
	  , ObjectProto       = Object.prototype
	  , ArrayProto        = Array.prototype
	  , arraySlice        = ArrayProto.slice
	  , arrayJoin         = ArrayProto.join
	  , defineProperty    = $.setDesc
	  , getOwnDescriptor  = $.getDesc
	  , defineProperties  = $.setDescs
	  , factories         = {}
	  , IE8_DOM_DEFINE;
	
	if(!DESCRIPTORS){
	  IE8_DOM_DEFINE = !fails(function(){
	    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
	  });
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)anObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    anObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});
	
	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;
	
	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	var createGetKeys = function(names, length){
	  return function(object){
	    var O      = toIObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	};
	var Empty = function(){};
	$export($export.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = toObject(O);
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(typeof O.constructor == 'function' && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = anObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
	});
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }
	  return factories[len](F, args);
	};
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$export($export.P, 'Function', {
	  bind: function bind(that /*, args... */){
	    var fn       = aFunction(this)
	      , partArgs = arraySlice.call(arguments, 1);
	    var bound = function(/* args... */){
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if(isObject(fn.prototype))bound.prototype = fn.prototype;
	    return bound;
	  }
	});
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * fails(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	$export($export.P + $export.F * (IObject != Object), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
	  }
	});
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$export($export.S, 'Array', {isArray: __webpack_require__(/*! ./$.is-array */ 33)});
	
	var createArrayReduce = function(isRight){
	  return function(callbackfn, memo){
	    aFunction(callbackfn);
	    var O      = IObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if(isRight ? index < 0 : length <= index){
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	};
	
	var methodize = function($fn){
	  return function(arg1/*, arg2 = undefined */){
	    return $fn(this, arg1, arguments[1]);
	  };
	};
	
	$export($export.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || methodize(createArrayMethod(0)),
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: methodize(createArrayMethod(1)),
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: methodize(createArrayMethod(2)),
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: methodize(createArrayMethod(3)),
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: methodize(createArrayMethod(4)),
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: methodize(arrayIndexOf),
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	$export($export.S, 'Date', {now: function(){ return +new Date; }});
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 5 */
/*!*********************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.js ***!
  \*********************************************/
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 6 */
/*!****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.export.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./$.global */ 7)
	  , core      = __webpack_require__(/*! ./$.core */ 8)
	  , hide      = __webpack_require__(/*! ./$.hide */ 9)
	  , redefine  = __webpack_require__(/*! ./$.redefine */ 13)
	  , ctx       = __webpack_require__(/*! ./$.ctx */ 15)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 7 */
/*!****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.global.js ***!
  \****************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/*!**************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.core.js ***!
  \**************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/*!**************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.hide.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(/*! ./$ */ 5)
	  , createDesc = __webpack_require__(/*! ./$.property-desc */ 10);
	module.exports = __webpack_require__(/*! ./$.descriptors */ 11) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.property-desc.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 11 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.descriptors.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./$.fails */ 12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/*!***************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.fails.js ***!
  \***************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.redefine.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(/*! ./$.global */ 7)
	  , hide      = __webpack_require__(/*! ./$.hide */ 9)
	  , SRC       = __webpack_require__(/*! ./$.uid */ 14)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(/*! ./$.core */ 8).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 14 */
/*!*************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.uid.js ***!
  \*************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 15 */
/*!*************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.ctx.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./$.a-function */ 16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.a-function.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/*!**************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.html.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./$.global */ 7).document && document.documentElement;

/***/ },
/* 18 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.dom-create.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./$.is-object */ 19)
	  , document = __webpack_require__(/*! ./$.global */ 7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.is-object.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 20 */
/*!*************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.has.js ***!
  \*************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 21 */
/*!*************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.cof.js ***!
  \*************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 22 */
/*!****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.invoke.js ***!
  \****************************************************/
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 23 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.an-object.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.to-object.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./$.defined */ 25);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 25 */
/*!*****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.defined.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 26 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.to-iobject.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./$.iobject */ 27)
	  , defined = __webpack_require__(/*! ./$.defined */ 25);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/*!*****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iobject.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./$.cof */ 21);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.to-integer.js ***!
  \********************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 29 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.to-index.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./$.to-integer */ 28)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 30 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.to-length.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./$.to-integer */ 28)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 31 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.array-methods.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(/*! ./$.ctx */ 15)
	  , IObject  = __webpack_require__(/*! ./$.iobject */ 27)
	  , toObject = __webpack_require__(/*! ./$.to-object */ 24)
	  , toLength = __webpack_require__(/*! ./$.to-length */ 30)
	  , asc      = __webpack_require__(/*! ./$.array-species-create */ 32);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 32 */
/*!******************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.array-species-create.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19)
	  , isArray  = __webpack_require__(/*! ./$.is-array */ 33)
	  , SPECIES  = __webpack_require__(/*! ./$.wks */ 34)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 33 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.is-array.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./$.cof */ 21);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 34 */
/*!*************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.wks.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(/*! ./$.shared */ 35)('wks')
	  , uid    = __webpack_require__(/*! ./$.uid */ 14)
	  , Symbol = __webpack_require__(/*! ./$.global */ 7).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 35 */
/*!****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.shared.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./$.global */ 7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.array-includes.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , toLength  = __webpack_require__(/*! ./$.to-length */ 30)
	  , toIndex   = __webpack_require__(/*! ./$.to-index */ 29);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.symbol.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(/*! ./$ */ 5)
	  , global         = __webpack_require__(/*! ./$.global */ 7)
	  , has            = __webpack_require__(/*! ./$.has */ 20)
	  , DESCRIPTORS    = __webpack_require__(/*! ./$.descriptors */ 11)
	  , $export        = __webpack_require__(/*! ./$.export */ 6)
	  , redefine       = __webpack_require__(/*! ./$.redefine */ 13)
	  , $fails         = __webpack_require__(/*! ./$.fails */ 12)
	  , shared         = __webpack_require__(/*! ./$.shared */ 35)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 38)
	  , uid            = __webpack_require__(/*! ./$.uid */ 14)
	  , wks            = __webpack_require__(/*! ./$.wks */ 34)
	  , keyOf          = __webpack_require__(/*! ./$.keyof */ 39)
	  , $names         = __webpack_require__(/*! ./$.get-names */ 40)
	  , enumKeys       = __webpack_require__(/*! ./$.enum-keys */ 41)
	  , isArray        = __webpack_require__(/*! ./$.is-array */ 33)
	  , anObject       = __webpack_require__(/*! ./$.an-object */ 23)
	  , toIObject      = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , createDesc     = __webpack_require__(/*! ./$.property-desc */ 10)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./$.library */ 42)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 38 */
/*!***************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.set-to-string-tag.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./$ */ 5).setDesc
	  , has = __webpack_require__(/*! ./$.has */ 20)
	  , TAG = __webpack_require__(/*! ./$.wks */ 34)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 39 */
/*!***************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.keyof.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(/*! ./$ */ 5)
	  , toIObject = __webpack_require__(/*! ./$.to-iobject */ 26);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 40 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.get-names.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , getNames  = __webpack_require__(/*! ./$ */ 5).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 41 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.enum-keys.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(/*! ./$ */ 5);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 42 */
/*!*****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.library.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 43 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.assign.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./$.object-assign */ 44)});

/***/ },
/* 44 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.object-assign.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(/*! ./$ */ 5)
	  , toObject = __webpack_require__(/*! ./$.to-object */ 24)
	  , IObject  = __webpack_require__(/*! ./$.iobject */ 27);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(/*! ./$.fails */ 12)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 45 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.is.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	$export($export.S, 'Object', {is: __webpack_require__(/*! ./$.same-value */ 46)});

/***/ },
/* 46 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.same-value.js ***!
  \********************************************************/
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 47 */
/*!***********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.set-prototype-of.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./$.set-proto */ 48).set});

/***/ },
/* 48 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.set-proto.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(/*! ./$ */ 5).getDesc
	  , isObject = __webpack_require__(/*! ./$.is-object */ 19)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./$.ctx */ 15)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 49 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.to-string.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(/*! ./$.classof */ 50)
	  , test    = {};
	test[__webpack_require__(/*! ./$.wks */ 34)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(/*! ./$.redefine */ 13)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 50 */
/*!*****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.classof.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./$.cof */ 21)
	  , TAG = __webpack_require__(/*! ./$.wks */ 34)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 51 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.freeze.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 52 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.object-sap.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , core    = __webpack_require__(/*! ./$.core */ 8)
	  , fails   = __webpack_require__(/*! ./$.fails */ 12);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 53 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.seal.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ },
/* 54 */
/*!*************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.prevent-extensions.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
	  };
	});

/***/ },
/* 55 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.is-frozen.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 56 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.is-sealed.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 57 */
/*!********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.is-extensible.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 58 */
/*!**********************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(/*! ./$.to-iobject */ 26);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 59 */
/*!***********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.get-prototype-of.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(/*! ./$.to-object */ 24);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 60 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.keys.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./$.to-object */ 24);
	
	__webpack_require__(/*! ./$.object-sap */ 52)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 61 */
/*!*****************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.object.get-own-property-names.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(/*! ./$.object-sap */ 52)('getOwnPropertyNames', function(){
	  return __webpack_require__(/*! ./$.get-names */ 40).get;
	});

/***/ },
/* 62 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.function.name.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var setDesc    = __webpack_require__(/*! ./$ */ 5).setDesc
	  , createDesc = __webpack_require__(/*! ./$.property-desc */ 10)
	  , has        = __webpack_require__(/*! ./$.has */ 20)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(/*! ./$.descriptors */ 11) && setDesc(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 63 */
/*!*********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.function.has-instance.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $             = __webpack_require__(/*! ./$ */ 5)
	  , isObject      = __webpack_require__(/*! ./$.is-object */ 19)
	  , HAS_INSTANCE  = __webpack_require__(/*! ./$.wks */ 34)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 64 */
/*!******************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.constructor.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $           = __webpack_require__(/*! ./$ */ 5)
	  , global      = __webpack_require__(/*! ./$.global */ 7)
	  , has         = __webpack_require__(/*! ./$.has */ 20)
	  , cof         = __webpack_require__(/*! ./$.cof */ 21)
	  , toPrimitive = __webpack_require__(/*! ./$.to-primitive */ 65)
	  , fails       = __webpack_require__(/*! ./$.fails */ 12)
	  , $trim       = __webpack_require__(/*! ./$.string-trim */ 66).trim
	  , NUMBER      = 'Number'
	  , $Number     = global[NUMBER]
	  , Base        = $Number
	  , proto       = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF  = cof($.create(proto)) == NUMBER
	  , TRIM        = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call(__webpack_require__(/*! ./$.descriptors */ 11) ? $.getNames(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), function(key){
	    if(has(Base, key) && !has($Number, key)){
	      $.setDesc($Number, key, $.getDesc(Base, key));
	    }
	  });
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(/*! ./$.redefine */ 13)(global, NUMBER, $Number);
	}

/***/ },
/* 65 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.to-primitive.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./$.is-object */ 19);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 66 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.string-trim.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , defined = __webpack_require__(/*! ./$.defined */ 25)
	  , fails   = __webpack_require__(/*! ./$.fails */ 12)
	  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec){
	  var exp  = {};
	  exp[KEY] = exec(trim);
	  $export($export.P + $export.F * fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  }), 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 67 */
/*!**************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.epsilon.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 68 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.is-finite.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(/*! ./$.export */ 6)
	  , _isFinite = __webpack_require__(/*! ./$.global */ 7).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 69 */
/*!*****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.is-integer.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(/*! ./$.is-integer */ 70)});

/***/ },
/* 70 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.is-integer.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 71 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.is-nan.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 72 */
/*!**********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.is-safe-integer.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(/*! ./$.export */ 6)
	  , isInteger = __webpack_require__(/*! ./$.is-integer */ 70)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 73 */
/*!***********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.max-safe-integer.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 74 */
/*!***********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.min-safe-integer.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 75 */
/*!******************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.parse-float.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.12 Number.parseFloat(string)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 76 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.number.parse-int.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.13 Number.parseInt(string, radix)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Number', {parseInt: parseInt});

/***/ },
/* 77 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.acosh.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , log1p   = __webpack_require__(/*! ./$.math-log1p */ 78)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
	$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 78 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.math-log1p.js ***!
  \********************************************************/
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 79 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.asinh.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	$export($export.S, 'Math', {asinh: asinh});

/***/ },
/* 80 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.atanh.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 81 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.cbrt.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , sign    = __webpack_require__(/*! ./$.math-sign */ 82);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 82 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.math-sign.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 83 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.clz32.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 84 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.cosh.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 85 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.expm1.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {expm1: __webpack_require__(/*! ./$.math-expm1 */ 86)});

/***/ },
/* 86 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.math-expm1.js ***!
  \********************************************************/
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 87 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.fround.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(/*! ./$.export */ 6)
	  , sign      = __webpack_require__(/*! ./$.math-sign */ 82)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 88 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.hypot.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum   = 0
	      , i     = 0
	      , $$    = arguments
	      , $$len = $$.length
	      , larg  = 0
	      , arg, div;
	    while(i < $$len){
	      arg = abs($$[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 89 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.imul.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(/*! ./$.fails */ 12)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 90 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.log10.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 91 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.log1p.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(/*! ./$.math-log1p */ 78)});

/***/ },
/* 92 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.log2.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 93 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.sign.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {sign: __webpack_require__(/*! ./$.math-sign */ 82)});

/***/ },
/* 94 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.sinh.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , expm1   = __webpack_require__(/*! ./$.math-expm1 */ 86)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(/*! ./$.fails */ 12)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 95 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.tanh.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , expm1   = __webpack_require__(/*! ./$.math-expm1 */ 86)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 96 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.math.trunc.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 97 */
/*!**********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.from-code-point.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(/*! ./$.export */ 6)
	  , toIndex        = __webpack_require__(/*! ./$.to-index */ 29)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res   = []
	      , $$    = arguments
	      , $$len = $$.length
	      , i     = 0
	      , code;
	    while($$len > i){
	      code = +$$[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 98 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.raw.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(/*! ./$.export */ 6)
	  , toIObject = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , toLength  = __webpack_require__(/*! ./$.to-length */ 30);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl   = toIObject(callSite.raw)
	      , len   = toLength(tpl.length)
	      , $$    = arguments
	      , $$len = $$.length
	      , res   = []
	      , i     = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < $$len)res.push(String($$[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 99 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.trim.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(/*! ./$.string-trim */ 66)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 100 */
/*!***************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.iterator.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./$.string-at */ 101)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./$.iter-define */ 102)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 101 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.string-at.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./$.to-integer */ 28)
	  , defined   = __webpack_require__(/*! ./$.defined */ 25);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 102 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iter-define.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./$.library */ 42)
	  , $export        = __webpack_require__(/*! ./$.export */ 6)
	  , redefine       = __webpack_require__(/*! ./$.redefine */ 13)
	  , hide           = __webpack_require__(/*! ./$.hide */ 9)
	  , has            = __webpack_require__(/*! ./$.has */ 20)
	  , Iterators      = __webpack_require__(/*! ./$.iterators */ 103)
	  , $iterCreate    = __webpack_require__(/*! ./$.iter-create */ 104)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 38)
	  , getProto       = __webpack_require__(/*! ./$ */ 5).getProto
	  , ITERATOR       = __webpack_require__(/*! ./$.wks */ 34)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 103 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iterators.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 104 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iter-create.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(/*! ./$ */ 5)
	  , descriptor     = __webpack_require__(/*! ./$.property-desc */ 10)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 38)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./$.hide */ 9)(IteratorPrototype, __webpack_require__(/*! ./$.wks */ 34)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 105 */
/*!********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.code-point-at.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $at     = __webpack_require__(/*! ./$.string-at */ 101)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 106 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.ends-with.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(/*! ./$.export */ 6)
	  , toLength  = __webpack_require__(/*! ./$.to-length */ 30)
	  , context   = __webpack_require__(/*! ./$.string-context */ 107)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(/*! ./$.fails-is-regexp */ 109)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , $$   = arguments
	      , endPosition = $$.length > 1 ? $$[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 107 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.string-context.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(/*! ./$.is-regexp */ 108)
	  , defined  = __webpack_require__(/*! ./$.defined */ 25);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 108 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.is-regexp.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(/*! ./$.is-object */ 19)
	  , cof      = __webpack_require__(/*! ./$.cof */ 21)
	  , MATCH    = __webpack_require__(/*! ./$.wks */ 34)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 109 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.fails-is-regexp.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(/*! ./$.wks */ 34)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 110 */
/*!***************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.includes.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(/*! ./$.export */ 6)
	  , context  = __webpack_require__(/*! ./$.string-context */ 107)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(/*! ./$.fails-is-regexp */ 109)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 111 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.repeat.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(/*! ./$.string-repeat */ 112)
	});

/***/ },
/* 112 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.string-repeat.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(/*! ./$.to-integer */ 28)
	  , defined   = __webpack_require__(/*! ./$.defined */ 25);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 113 */
/*!******************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.string.starts-with.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(/*! ./$.export */ 6)
	  , toLength    = __webpack_require__(/*! ./$.to-length */ 30)
	  , context     = __webpack_require__(/*! ./$.string-context */ 107)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(/*! ./$.fails-is-regexp */ 109)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , $$     = arguments
	      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 114 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.from.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(/*! ./$.ctx */ 15)
	  , $export     = __webpack_require__(/*! ./$.export */ 6)
	  , toObject    = __webpack_require__(/*! ./$.to-object */ 24)
	  , call        = __webpack_require__(/*! ./$.iter-call */ 115)
	  , isArrayIter = __webpack_require__(/*! ./$.is-array-iter */ 116)
	  , toLength    = __webpack_require__(/*! ./$.to-length */ 30)
	  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 117);
	$export($export.S + $export.F * !__webpack_require__(/*! ./$.iter-detect */ 118)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 115 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iter-call.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(/*! ./$.an-object */ 23);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 116 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.is-array-iter.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(/*! ./$.iterators */ 103)
	  , ITERATOR   = __webpack_require__(/*! ./$.wks */ 34)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 117 */
/*!********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/core.get-iterator-method.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./$.classof */ 50)
	  , ITERATOR  = __webpack_require__(/*! ./$.wks */ 34)('iterator')
	  , Iterators = __webpack_require__(/*! ./$.iterators */ 103);
	module.exports = __webpack_require__(/*! ./$.core */ 8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 118 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iter-detect.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(/*! ./$.wks */ 34)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 119 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.of.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(/*! ./$.fails */ 12)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , $$     = arguments
	      , $$len  = $$.length
	      , result = new (typeof this == 'function' ? this : Array)($$len);
	    while($$len > index)result[index] = $$[index++];
	    result.length = $$len;
	    return result;
	  }
	});

/***/ },
/* 120 */
/*!**************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.iterator.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./$.add-to-unscopables */ 121)
	  , step             = __webpack_require__(/*! ./$.iter-step */ 122)
	  , Iterators        = __webpack_require__(/*! ./$.iterators */ 103)
	  , toIObject        = __webpack_require__(/*! ./$.to-iobject */ 26);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./$.iter-define */ 102)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 121 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.add-to-unscopables.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(/*! ./$.wks */ 34)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(/*! ./$.hide */ 9)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 122 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.iter-step.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 123 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.species.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./$.set-species */ 124)('Array');

/***/ },
/* 124 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.set-species.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(/*! ./$.global */ 7)
	  , $           = __webpack_require__(/*! ./$ */ 5)
	  , DESCRIPTORS = __webpack_require__(/*! ./$.descriptors */ 11)
	  , SPECIES     = __webpack_require__(/*! ./$.wks */ 34)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 125 */
/*!*****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.copy-within.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(/*! ./$.array-copy-within */ 126)});
	
	__webpack_require__(/*! ./$.add-to-unscopables */ 121)('copyWithin');

/***/ },
/* 126 */
/*!***************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.array-copy-within.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(/*! ./$.to-object */ 24)
	  , toIndex  = __webpack_require__(/*! ./$.to-index */ 29)
	  , toLength = __webpack_require__(/*! ./$.to-length */ 30);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , $$    = arguments
	    , end   = $$.length > 2 ? $$[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 127 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.fill.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.P, 'Array', {fill: __webpack_require__(/*! ./$.array-fill */ 128)});
	
	__webpack_require__(/*! ./$.add-to-unscopables */ 121)('fill');

/***/ },
/* 128 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.array-fill.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(/*! ./$.to-object */ 24)
	  , toIndex  = __webpack_require__(/*! ./$.to-index */ 29)
	  , toLength = __webpack_require__(/*! ./$.to-length */ 30);
	module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , $$     = arguments
	    , $$len  = $$.length
	    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
	    , end    = $$len > 2 ? $$[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 129 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.find.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $find   = __webpack_require__(/*! ./$.array-methods */ 31)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(/*! ./$.add-to-unscopables */ 121)(KEY);

/***/ },
/* 130 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.array.find-index.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $find   = __webpack_require__(/*! ./$.array-methods */ 31)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(/*! ./$.add-to-unscopables */ 121)(KEY);

/***/ },
/* 131 */
/*!******************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.regexp.constructor.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(/*! ./$ */ 5)
	  , global   = __webpack_require__(/*! ./$.global */ 7)
	  , isRegExp = __webpack_require__(/*! ./$.is-regexp */ 108)
	  , $flags   = __webpack_require__(/*! ./$.flags */ 132)
	  , $RegExp  = global.RegExp
	  , Base     = $RegExp
	  , proto    = $RegExp.prototype
	  , re1      = /a/g
	  , re2      = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(/*! ./$.descriptors */ 11) && (!CORRECT_NEW || __webpack_require__(/*! ./$.fails */ 12)(function(){
	  re2[__webpack_require__(/*! ./$.wks */ 34)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
	      : CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
	  };
	  $.each.call($.getNames(Base), function(key){
	    key in $RegExp || $.setDesc($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  });
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(/*! ./$.redefine */ 13)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(/*! ./$.set-species */ 124)('RegExp');

/***/ },
/* 132 */
/*!***************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.flags.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(/*! ./$.an-object */ 23);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 133 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.regexp.flags.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	var $ = __webpack_require__(/*! ./$ */ 5);
	if(__webpack_require__(/*! ./$.descriptors */ 11) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(/*! ./$.flags */ 132)
	});

/***/ },
/* 134 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.regexp.match.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(/*! ./$.fix-re-wks */ 135)('match', 1, function(defined, MATCH){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  };
	});

/***/ },
/* 135 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.fix-re-wks.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(/*! ./$.hide */ 9)
	  , redefine = __webpack_require__(/*! ./$.redefine */ 13)
	  , fails    = __webpack_require__(/*! ./$.fails */ 12)
	  , defined  = __webpack_require__(/*! ./$.defined */ 25)
	  , wks      = __webpack_require__(/*! ./$.wks */ 34);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , original = ''[KEY];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return original.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return original.call(string, this); }
	    );
	  }
	};

/***/ },
/* 136 */
/*!**************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.regexp.replace.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(/*! ./$.fix-re-wks */ 135)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  };
	});

/***/ },
/* 137 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.regexp.search.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(/*! ./$.fix-re-wks */ 135)('search', 1, function(defined, SEARCH){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  };
	});

/***/ },
/* 138 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.regexp.split.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(/*! ./$.fix-re-wks */ 135)('split', 2, function(defined, SPLIT, $split){
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return function split(separator, limit){
	    'use strict';
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined
	      ? fn.call(separator, O, limit)
	      : $split.call(String(O), separator, limit);
	  };
	});

/***/ },
/* 139 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.promise.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(/*! ./$ */ 5)
	  , LIBRARY    = __webpack_require__(/*! ./$.library */ 42)
	  , global     = __webpack_require__(/*! ./$.global */ 7)
	  , ctx        = __webpack_require__(/*! ./$.ctx */ 15)
	  , classof    = __webpack_require__(/*! ./$.classof */ 50)
	  , $export    = __webpack_require__(/*! ./$.export */ 6)
	  , isObject   = __webpack_require__(/*! ./$.is-object */ 19)
	  , anObject   = __webpack_require__(/*! ./$.an-object */ 23)
	  , aFunction  = __webpack_require__(/*! ./$.a-function */ 16)
	  , strictNew  = __webpack_require__(/*! ./$.strict-new */ 140)
	  , forOf      = __webpack_require__(/*! ./$.for-of */ 141)
	  , setProto   = __webpack_require__(/*! ./$.set-proto */ 48).set
	  , same       = __webpack_require__(/*! ./$.same-value */ 46)
	  , SPECIES    = __webpack_require__(/*! ./$.wks */ 34)('species')
	  , speciesConstructor = __webpack_require__(/*! ./$.species-constructor */ 142)
	  , asap       = __webpack_require__(/*! ./$.microtask */ 143)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(/*! ./$.descriptors */ 11)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(/*! ./$.redefine-all */ 145)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(/*! ./$.set-to-string-tag */ 38)(P, PROMISE);
	__webpack_require__(/*! ./$.set-species */ 124)(PROMISE);
	Wrapper = __webpack_require__(/*! ./$.core */ 8)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./$.iter-detect */ 118)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 140 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.strict-new.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 141 */
/*!****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.for-of.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(/*! ./$.ctx */ 15)
	  , call        = __webpack_require__(/*! ./$.iter-call */ 115)
	  , isArrayIter = __webpack_require__(/*! ./$.is-array-iter */ 116)
	  , anObject    = __webpack_require__(/*! ./$.an-object */ 23)
	  , toLength    = __webpack_require__(/*! ./$.to-length */ 30)
	  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 117);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 142 */
/*!*****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.species-constructor.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(/*! ./$.an-object */ 23)
	  , aFunction = __webpack_require__(/*! ./$.a-function */ 16)
	  , SPECIES   = __webpack_require__(/*! ./$.wks */ 34)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 143 */
/*!*******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.microtask.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./$.global */ 7)
	  , macrotask = __webpack_require__(/*! ./$.task */ 144).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(/*! ./$.cof */ 21)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 144 */
/*!**************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.task.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(/*! ./$.ctx */ 15)
	  , invoke             = __webpack_require__(/*! ./$.invoke */ 22)
	  , html               = __webpack_require__(/*! ./$.html */ 17)
	  , cel                = __webpack_require__(/*! ./$.dom-create */ 18)
	  , global             = __webpack_require__(/*! ./$.global */ 7)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(/*! ./$.cof */ 21)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 145 */
/*!**********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.redefine-all.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(/*! ./$.redefine */ 13);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 146 */
/*!***************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.map.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(/*! ./$.collection-strong */ 147);
	
	// 23.1 Map Objects
	__webpack_require__(/*! ./$.collection */ 148)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 147 */
/*!***************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.collection-strong.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(/*! ./$ */ 5)
	  , hide         = __webpack_require__(/*! ./$.hide */ 9)
	  , redefineAll  = __webpack_require__(/*! ./$.redefine-all */ 145)
	  , ctx          = __webpack_require__(/*! ./$.ctx */ 15)
	  , strictNew    = __webpack_require__(/*! ./$.strict-new */ 140)
	  , defined      = __webpack_require__(/*! ./$.defined */ 25)
	  , forOf        = __webpack_require__(/*! ./$.for-of */ 141)
	  , $iterDefine  = __webpack_require__(/*! ./$.iter-define */ 102)
	  , step         = __webpack_require__(/*! ./$.iter-step */ 122)
	  , ID           = __webpack_require__(/*! ./$.uid */ 14)('id')
	  , $has         = __webpack_require__(/*! ./$.has */ 20)
	  , isObject     = __webpack_require__(/*! ./$.is-object */ 19)
	  , setSpecies   = __webpack_require__(/*! ./$.set-species */ 124)
	  , DESCRIPTORS  = __webpack_require__(/*! ./$.descriptors */ 11)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;
	
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 148 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.collection.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(/*! ./$.global */ 7)
	  , $export        = __webpack_require__(/*! ./$.export */ 6)
	  , redefine       = __webpack_require__(/*! ./$.redefine */ 13)
	  , redefineAll    = __webpack_require__(/*! ./$.redefine-all */ 145)
	  , forOf          = __webpack_require__(/*! ./$.for-of */ 141)
	  , strictNew      = __webpack_require__(/*! ./$.strict-new */ 140)
	  , isObject       = __webpack_require__(/*! ./$.is-object */ 19)
	  , fails          = __webpack_require__(/*! ./$.fails */ 12)
	  , $iterDetect    = __webpack_require__(/*! ./$.iter-detect */ 118)
	  , setToStringTag = __webpack_require__(/*! ./$.set-to-string-tag */ 38);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO;
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || instance.forEach(function(val, key){
	      BUGGY_ZERO = 1 / key === -Infinity;
	    });
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 149 */
/*!***************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.set.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(/*! ./$.collection-strong */ 147);
	
	// 23.2 Set Objects
	__webpack_require__(/*! ./$.collection */ 148)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 150 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.weak-map.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(/*! ./$ */ 5)
	  , redefine     = __webpack_require__(/*! ./$.redefine */ 13)
	  , weak         = __webpack_require__(/*! ./$.collection-weak */ 151)
	  , isObject     = __webpack_require__(/*! ./$.is-object */ 19)
	  , has          = __webpack_require__(/*! ./$.has */ 20)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};
	
	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(/*! ./$.collection */ 148)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 151 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.collection-weak.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(/*! ./$.hide */ 9)
	  , redefineAll       = __webpack_require__(/*! ./$.redefine-all */ 145)
	  , anObject          = __webpack_require__(/*! ./$.an-object */ 23)
	  , isObject          = __webpack_require__(/*! ./$.is-object */ 19)
	  , strictNew         = __webpack_require__(/*! ./$.strict-new */ 140)
	  , forOf             = __webpack_require__(/*! ./$.for-of */ 141)
	  , createArrayMethod = __webpack_require__(/*! ./$.array-methods */ 31)
	  , $has              = __webpack_require__(/*! ./$.has */ 20)
	  , WEAK              = __webpack_require__(/*! ./$.uid */ 14)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 152 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.weak-set.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(/*! ./$.collection-weak */ 151);
	
	// 23.4 WeakSet Objects
	__webpack_require__(/*! ./$.collection */ 148)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 153 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.apply.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , _apply  = Function.apply;
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 154 */
/*!*****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.construct.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $         = __webpack_require__(/*! ./$ */ 5)
	  , $export   = __webpack_require__(/*! ./$.export */ 6)
	  , aFunction = __webpack_require__(/*! ./$.a-function */ 16)
	  , anObject  = __webpack_require__(/*! ./$.an-object */ 23)
	  , isObject  = __webpack_require__(/*! ./$.is-object */ 19)
	  , bind      = Function.bind || __webpack_require__(/*! ./$.core */ 8).Function.prototype.bind;
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(/*! ./$.fails */ 12)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 155 */
/*!***********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.define-property.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var $        = __webpack_require__(/*! ./$ */ 5)
	  , $export  = __webpack_require__(/*! ./$.export */ 6)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(/*! ./$.fails */ 12)(function(){
	  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 156 */
/*!***********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.delete-property.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(/*! ./$.export */ 6)
	  , getDesc  = __webpack_require__(/*! ./$ */ 5).getDesc
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = getDesc(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 157 */
/*!*****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.enumerate.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(/*! ./$.export */ 6)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(/*! ./$.iter-create */ 104)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 158 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.get.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var $        = __webpack_require__(/*! ./$ */ 5)
	  , has      = __webpack_require__(/*! ./$.has */ 20)
	  , $export  = __webpack_require__(/*! ./$.export */ 6)
	  , isObject = __webpack_require__(/*! ./$.is-object */ 19)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 159 */
/*!***********************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var $        = __webpack_require__(/*! ./$ */ 5)
	  , $export  = __webpack_require__(/*! ./$.export */ 6)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 160 */
/*!************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(/*! ./$.export */ 6)
	  , getProto = __webpack_require__(/*! ./$ */ 5).getProto
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 161 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.has.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 162 */
/*!*********************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.is-extensible.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(/*! ./$.export */ 6)
	  , anObject      = __webpack_require__(/*! ./$.an-object */ 23)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 163 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.own-keys.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(/*! ./$.own-keys */ 164)});

/***/ },
/* 164 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.own-keys.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(/*! ./$ */ 5)
	  , anObject = __webpack_require__(/*! ./$.an-object */ 23)
	  , Reflect  = __webpack_require__(/*! ./$.global */ 7).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 165 */
/*!**************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(/*! ./$.export */ 6)
	  , anObject           = __webpack_require__(/*! ./$.an-object */ 23)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 166 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.set.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var $          = __webpack_require__(/*! ./$ */ 5)
	  , has        = __webpack_require__(/*! ./$.has */ 20)
	  , $export    = __webpack_require__(/*! ./$.export */ 6)
	  , createDesc = __webpack_require__(/*! ./$.property-desc */ 10)
	  , anObject   = __webpack_require__(/*! ./$.an-object */ 23)
	  , isObject   = __webpack_require__(/*! ./$.is-object */ 19);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = $.getDesc(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = $.getProto(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    $.setDesc(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 167 */
/*!************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(/*! ./$.export */ 6)
	  , setProto = __webpack_require__(/*! ./$.set-proto */ 48);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 168 */
/*!**************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.array.includes.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(/*! ./$.export */ 6)
	  , $includes = __webpack_require__(/*! ./$.array-includes */ 36)(true);
	
	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(/*! ./$.add-to-unscopables */ 121)('includes');

/***/ },
/* 169 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.string.at.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $at     = __webpack_require__(/*! ./$.string-at */ 101)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 170 */
/*!***************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.string.pad-left.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $pad    = __webpack_require__(/*! ./$.string-pad */ 171);
	
	$export($export.P, 'String', {
	  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 171 */
/*!********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.string-pad.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-string-pad-left-right
	var toLength = __webpack_require__(/*! ./$.to-length */ 30)
	  , repeat   = __webpack_require__(/*! ./$.string-repeat */ 112)
	  , defined  = __webpack_require__(/*! ./$.defined */ 25);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 172 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.string.pad-right.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $pad    = __webpack_require__(/*! ./$.string-pad */ 171);
	
	$export($export.P, 'String', {
	  padRight: function padRight(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 173 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.string.trim-left.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(/*! ./$.string-trim */ 66)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	});

/***/ },
/* 174 */
/*!*****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.string.trim-right.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(/*! ./$.string-trim */ 66)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	});

/***/ },
/* 175 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.regexp.escape.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $re     = __webpack_require__(/*! ./$.replacer */ 176)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 176 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.replacer.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 177 */
/*!***********************************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(/*! ./$ */ 5)
	  , $export    = __webpack_require__(/*! ./$.export */ 6)
	  , ownKeys    = __webpack_require__(/*! ./$.own-keys */ 164)
	  , toIObject  = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , createDesc = __webpack_require__(/*! ./$.property-desc */ 10);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 178 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.object.values.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $values = __webpack_require__(/*! ./$.object-to-array */ 179)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 179 */
/*!*************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.object-to-array.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(/*! ./$ */ 5)
	  , toIObject = __webpack_require__(/*! ./$.to-iobject */ 26)
	  , isEnum    = $.isEnum;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 180 */
/*!**************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.object.entries.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(/*! ./$.export */ 6)
	  , $entries = __webpack_require__(/*! ./$.object-to-array */ 179)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 181 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.map.to-json.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.P, 'Map', {toJSON: __webpack_require__(/*! ./$.collection-to-json */ 182)('Map')});

/***/ },
/* 182 */
/*!****************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.collection-to-json.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(/*! ./$.for-of */ 141)
	  , classof = __webpack_require__(/*! ./$.classof */ 50);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 183 */
/*!***********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/es7.set.to-json.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(/*! ./$.export */ 6);
	
	$export($export.P, 'Set', {toJSON: __webpack_require__(/*! ./$.collection-to-json */ 182)('Set')});

/***/ },
/* 184 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/js.array.statics.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(/*! ./$ */ 5)
	  , $export = __webpack_require__(/*! ./$.export */ 6)
	  , $ctx    = __webpack_require__(/*! ./$.ctx */ 15)
	  , $Array  = __webpack_require__(/*! ./$.core */ 8).Array || Array
	  , statics = {};
	var setStatics = function(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
	  });
	};
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill');
	$export($export.S, 'Array', statics);

/***/ },
/* 185 */
/*!******************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/web.timers.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(/*! ./$.global */ 7)
	  , $export    = __webpack_require__(/*! ./$.export */ 6)
	  , invoke     = __webpack_require__(/*! ./$.invoke */ 22)
	  , partial    = __webpack_require__(/*! ./$.partial */ 186)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 186 */
/*!*****************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.partial.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(/*! ./$.path */ 187)
	  , invoke    = __webpack_require__(/*! ./$.invoke */ 22)
	  , aFunction = __webpack_require__(/*! ./$.a-function */ 16);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that  = this
	      , $$    = arguments
	      , $$len = $$.length
	      , j = 0, k = 0, args;
	    if(!holder && !$$len)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
	    while($$len > k)args.push($$[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 187 */
/*!**************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/$.path.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./$.global */ 7);

/***/ },
/* 188 */
/*!*********************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/web.immediate.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./$.export */ 6)
	  , $task   = __webpack_require__(/*! ./$.task */ 144);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 189 */
/*!************************************************************!*\
  !*** ./~/babel-core/~/core-js/modules/web.dom.iterable.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 120);
	var global      = __webpack_require__(/*! ./$.global */ 7)
	  , hide        = __webpack_require__(/*! ./$.hide */ 9)
	  , Iterators   = __webpack_require__(/*! ./$.iterators */ 103)
	  , ITERATOR    = __webpack_require__(/*! ./$.wks */ 34)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
	if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 190 */
/*!***********************************************!*\
  !*** ./~/babel-core/~/regenerator/runtime.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 191)))

/***/ },
/* 191 */
/*!**********************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/process/browser.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 192 */
/*!***********************!*\
  !*** ./src/main.styl ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/autoprefixer-loader!./../~/stylus-loader!./main.styl */ 193);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 195)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/stylus-loader/index.js!./main.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/stylus-loader/index.js!./main.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 193 */
/*!********************************************************************************!*\
  !*** ./~/css-loader!./~/autoprefixer-loader!./~/stylus-loader!./src/main.styl ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 194)();
	// imports
	
	
	// module
	exports.push([module.id, "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n}\n", ""]);
	
	// exports


/***/ },
/* 194 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 195 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 196 */
/*!****************************!*\
  !*** ./~/dat-gui/index.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./vendor/dat.gui */ 197)
	module.exports.color = __webpack_require__(/*! ./vendor/dat.color */ 198)

/***/ },
/* 197 */
/*!*************************************!*\
  !*** ./~/dat-gui/vendor/dat.gui.js ***!
  \*************************************/
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/** @namespace */
	var dat = module.exports = dat || {};
	
	/** @namespace */
	dat.gui = dat.gui || {};
	
	/** @namespace */
	dat.utils = dat.utils || {};
	
	/** @namespace */
	dat.controllers = dat.controllers || {};
	
	/** @namespace */
	dat.dom = dat.dom || {};
	
	/** @namespace */
	dat.color = dat.color || {};
	
	dat.utils.css = (function () {
	  return {
	    load: function (url, doc) {
	      doc = doc || document;
	      var link = doc.createElement('link');
	      link.type = 'text/css';
	      link.rel = 'stylesheet';
	      link.href = url;
	      doc.getElementsByTagName('head')[0].appendChild(link);
	    },
	    inject: function(css, doc) {
	      doc = doc || document;
	      var injected = document.createElement('style');
	      injected.type = 'text/css';
	      injected.innerHTML = css;
	      doc.getElementsByTagName('head')[0].appendChild(injected);
	    }
	  }
	})();
	
	
	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;
	
	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */
	
	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {
	
	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {
	
	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },
	
	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();
	
	
	dat.controllers.Controller = (function (common) {
	
	  /**
	   * @class An "abstract" class that represents a given property of an object.
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var Controller = function(object, property) {
	
	    this.initialValue = object[property];
	
	    /**
	     * Those who extend this class will put their DOM elements in here.
	     * @type {DOMElement}
	     */
	    this.domElement = document.createElement('div');
	
	    /**
	     * The object to manipulate
	     * @type {Object}
	     */
	    this.object = object;
	
	    /**
	     * The name of the property to manipulate
	     * @type {String}
	     */
	    this.property = property;
	
	    /**
	     * The function to be called on change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onChange = undefined;
	
	    /**
	     * The function to be called on finishing change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onFinishChange = undefined;
	
	  };
	
	  common.extend(
	
	      Controller.prototype,
	
	      /** @lends dat.controllers.Controller.prototype */
	      {
	
	        /**
	         * Specify that a function fire every time someone changes the value with
	         * this Controller.
	         *
	         * @param {Function} fnc This function will be called whenever the value
	         * is modified via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onChange: function(fnc) {
	          this.__onChange = fnc;
	          return this;
	        },
	
	        /**
	         * Specify that a function fire every time someone "finishes" changing
	         * the value wih this Controller. Useful for values that change
	         * incrementally like numbers or strings.
	         *
	         * @param {Function} fnc This function will be called whenever
	         * someone "finishes" changing the value via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onFinishChange: function(fnc) {
	          this.__onFinishChange = fnc;
	          return this;
	        },
	
	        /**
	         * Change the value of <code>object[property]</code>
	         *
	         * @param {Object} newValue The new value of <code>object[property]</code>
	         */
	        setValue: function(newValue) {
	          this.object[this.property] = newValue;
	          if (this.__onChange) {
	            this.__onChange.call(this, newValue);
	          }
	          this.updateDisplay();
	          return this;
	        },
	
	        /**
	         * Gets the value of <code>object[property]</code>
	         *
	         * @returns {Object} The current value of <code>object[property]</code>
	         */
	        getValue: function() {
	          return this.object[this.property];
	        },
	
	        /**
	         * Refreshes the visual display of a Controller in order to keep sync
	         * with the object's current value.
	         * @returns {dat.controllers.Controller} this
	         */
	        updateDisplay: function() {
	          return this;
	        },
	
	        /**
	         * @returns {Boolean} true if the value has deviated from initialValue
	         */
	        isModified: function() {
	          return this.initialValue !== this.getValue()
	        }
	
	      }
	
	  );
	
	  return Controller;
	
	
	})(dat.utils.common);
	
	
	dat.dom.dom = (function (common) {
	
	  var EVENT_MAP = {
	    'HTMLEvents': ['change'],
	    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
	    'KeyboardEvents': ['keydown']
	  };
	
	  var EVENT_MAP_INV = {};
	  common.each(EVENT_MAP, function(v, k) {
	    common.each(v, function(e) {
	      EVENT_MAP_INV[e] = k;
	    });
	  });
	
	  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
	
	  function cssValueToPixels(val) {
	
	    if (val === '0' || common.isUndefined(val)) return 0;
	
	    var match = val.match(CSS_VALUE_PIXELS);
	
	    if (!common.isNull(match)) {
	      return parseFloat(match[1]);
	    }
	
	    // TODO ...ems? %?
	
	    return 0;
	
	  }
	
	  /**
	   * @namespace
	   * @member dat.dom
	   */
	  var dom = {
	
	    /**
	     * 
	     * @param elem
	     * @param selectable
	     */
	    makeSelectable: function(elem, selectable) {
	
	      if (elem === undefined || elem.style === undefined) return;
	
	      elem.onselectstart = selectable ? function() {
	        return false;
	      } : function() {
	      };
	
	      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
	      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
	      elem.unselectable = selectable ? 'on' : 'off';
	
	    },
	
	    /**
	     *
	     * @param elem
	     * @param horizontal
	     * @param vertical
	     */
	    makeFullscreen: function(elem, horizontal, vertical) {
	
	      if (common.isUndefined(horizontal)) horizontal = true;
	      if (common.isUndefined(vertical)) vertical = true;
	
	      elem.style.position = 'absolute';
	
	      if (horizontal) {
	        elem.style.left = 0;
	        elem.style.right = 0;
	      }
	      if (vertical) {
	        elem.style.top = 0;
	        elem.style.bottom = 0;
	      }
	
	    },
	
	    /**
	     *
	     * @param elem
	     * @param eventType
	     * @param params
	     */
	    fakeEvent: function(elem, eventType, params, aux) {
	      params = params || {};
	      var className = EVENT_MAP_INV[eventType];
	      if (!className) {
	        throw new Error('Event type ' + eventType + ' not supported.');
	      }
	      var evt = document.createEvent(className);
	      switch (className) {
	        case 'MouseEvents':
	          var clientX = params.x || params.clientX || 0;
	          var clientY = params.y || params.clientY || 0;
	          evt.initMouseEvent(eventType, params.bubbles || false,
	              params.cancelable || true, window, params.clickCount || 1,
	              0, //screen X
	              0, //screen Y
	              clientX, //client X
	              clientY, //client Y
	              false, false, false, false, 0, null);
	          break;
	        case 'KeyboardEvents':
	          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
	          common.defaults(params, {
	            cancelable: true,
	            ctrlKey: false,
	            altKey: false,
	            shiftKey: false,
	            metaKey: false,
	            keyCode: undefined,
	            charCode: undefined
	          });
	          init(eventType, params.bubbles || false,
	              params.cancelable, window,
	              params.ctrlKey, params.altKey,
	              params.shiftKey, params.metaKey,
	              params.keyCode, params.charCode);
	          break;
	        default:
	          evt.initEvent(eventType, params.bubbles || false,
	              params.cancelable || true);
	          break;
	      }
	      common.defaults(evt, aux);
	      elem.dispatchEvent(evt);
	    },
	
	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    bind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.addEventListener)
	        elem.addEventListener(event, func, bool);
	      else if (elem.attachEvent)
	        elem.attachEvent('on' + event, func);
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    unbind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.removeEventListener)
	        elem.removeEventListener(event, func, bool);
	      else if (elem.detachEvent)
	        elem.detachEvent('on' + event, func);
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    addClass: function(elem, className) {
	      if (elem.className === undefined) {
	        elem.className = className;
	      } else if (elem.className !== className) {
	        var classes = elem.className.split(/ +/);
	        if (classes.indexOf(className) == -1) {
	          classes.push(className);
	          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
	        }
	      }
	      return dom;
	    },
	
	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    removeClass: function(elem, className) {
	      if (className) {
	        if (elem.className === undefined) {
	          // elem.className = className;
	        } else if (elem.className === className) {
	          elem.removeAttribute('class');
	        } else {
	          var classes = elem.className.split(/ +/);
	          var index = classes.indexOf(className);
	          if (index != -1) {
	            classes.splice(index, 1);
	            elem.className = classes.join(' ');
	          }
	        }
	      } else {
	        elem.className = undefined;
	      }
	      return dom;
	    },
	
	    hasClass: function(elem, className) {
	      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getWidth: function(elem) {
	
	      var style = getComputedStyle(elem);
	
	      return cssValueToPixels(style['border-left-width']) +
	          cssValueToPixels(style['border-right-width']) +
	          cssValueToPixels(style['padding-left']) +
	          cssValueToPixels(style['padding-right']) +
	          cssValueToPixels(style['width']);
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getHeight: function(elem) {
	
	      var style = getComputedStyle(elem);
	
	      return cssValueToPixels(style['border-top-width']) +
	          cssValueToPixels(style['border-bottom-width']) +
	          cssValueToPixels(style['padding-top']) +
	          cssValueToPixels(style['padding-bottom']) +
	          cssValueToPixels(style['height']);
	    },
	
	    /**
	     *
	     * @param elem
	     */
	    getOffset: function(elem) {
	      var offset = {left: 0, top:0};
	      if (elem.offsetParent) {
	        do {
	          offset.left += elem.offsetLeft;
	          offset.top += elem.offsetTop;
	        } while (elem = elem.offsetParent);
	      }
	      return offset;
	    },
	
	    // http://stackoverflow.com/posts/2684561/revisions
	    /**
	     * 
	     * @param elem
	     */
	    isActive: function(elem) {
	      return elem === document.activeElement && ( elem.type || elem.href );
	    }
	
	  };
	
	  return dom;
	
	})(dat.utils.common);
	
	
	dat.controllers.OptionController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a select input to alter the property of an object, using a
	   * list of accepted values.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object|string[]} options A map of labels to acceptable values, or
	   * a list of acceptable string values.
	   *
	   * @member dat.controllers
	   */
	  var OptionController = function(object, property, options) {
	
	    OptionController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    /**
	     * The drop down menu
	     * @ignore
	     */
	    this.__select = document.createElement('select');
	
	    if (common.isArray(options)) {
	      var map = {};
	      common.each(options, function(element) {
	        map[element] = element;
	      });
	      options = map;
	    }
	
	    common.each(options, function(value, key) {
	
	      var opt = document.createElement('option');
	      opt.innerHTML = key;
	      opt.setAttribute('value', value);
	      _this.__select.appendChild(opt);
	
	    });
	
	    // Acknowledge original value
	    this.updateDisplay();
	
	    dom.bind(this.__select, 'change', function() {
	      var desiredValue = this.options[this.selectedIndex].value;
	      _this.setValue(desiredValue);
	    });
	
	    this.domElement.appendChild(this.__select);
	
	  };
	
	  OptionController.superclass = Controller;
	
	  common.extend(
	
	      OptionController.prototype,
	      Controller.prototype,
	
	      {
	
	        setValue: function(v) {
	          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          return toReturn;
	        },
	
	        updateDisplay: function() {
	          this.__select.value = this.getValue();
	          return OptionController.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  return OptionController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.NumberController = (function (Controller, common) {
	
	  /**
	   * @class Represents a given property of an object that is a number.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberController = function(object, property, params) {
	
	    NumberController.superclass.call(this, object, property);
	
	    params = params || {};
	
	    this.__min = params.min;
	    this.__max = params.max;
	    this.__step = params.step;
	
	    if (common.isUndefined(this.__step)) {
	
	      if (this.initialValue == 0) {
	        this.__impliedStep = 1; // What are we, psychics?
	      } else {
	        // Hey Doug, check this out.
	        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
	      }
	
	    } else {
	
	      this.__impliedStep = this.__step;
	
	    }
	
	    this.__precision = numDecimals(this.__impliedStep);
	
	
	  };
	
	  NumberController.superclass = Controller;
	
	  common.extend(
	
	      NumberController.prototype,
	      Controller.prototype,
	
	      /** @lends dat.controllers.NumberController.prototype */
	      {
	
	        setValue: function(v) {
	
	          if (this.__min !== undefined && v < this.__min) {
	            v = this.__min;
	          } else if (this.__max !== undefined && v > this.__max) {
	            v = this.__max;
	          }
	
	          if (this.__step !== undefined && v % this.__step != 0) {
	            v = Math.round(v / this.__step) * this.__step;
	          }
	
	          return NumberController.superclass.prototype.setValue.call(this, v);
	
	        },
	
	        /**
	         * Specify a minimum value for <code>object[property]</code>.
	         *
	         * @param {Number} minValue The minimum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        min: function(v) {
	          this.__min = v;
	          return this;
	        },
	
	        /**
	         * Specify a maximum value for <code>object[property]</code>.
	         *
	         * @param {Number} maxValue The maximum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        max: function(v) {
	          this.__max = v;
	          return this;
	        },
	
	        /**
	         * Specify a step value that dat.controllers.NumberController
	         * increments by.
	         *
	         * @param {Number} stepValue The step value for
	         * dat.controllers.NumberController
	         * @default if minimum and maximum specified increment is 1% of the
	         * difference otherwise stepValue is 1
	         * @returns {dat.controllers.NumberController} this
	         */
	        step: function(v) {
	          this.__step = v;
	          return this;
	        }
	
	      }
	
	  );
	
	  function numDecimals(x) {
	    x = x.toString();
	    if (x.indexOf('.') > -1) {
	      return x.length - x.indexOf('.') - 1;
	    } else {
	      return 0;
	    }
	  }
	
	  return NumberController;
	
	})(dat.controllers.Controller,
	dat.utils.common);
	
	
	dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {
	
	  /**
	   * @class Represents a given property of an object that is a number and
	   * provides an input element with which to manipulate it.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerBox = function(object, property, params) {
	
	    this.__truncationSuspended = false;
	
	    NumberControllerBox.superclass.call(this, object, property, params);
	
	    var _this = this;
	
	    /**
	     * {Number} Previous mouse y position
	     * @ignore
	     */
	    var prev_y;
	
	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');
	
	    // Makes it so manually specified values are not truncated.
	
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'mousedown', onMouseDown);
	    dom.bind(this.__input, 'keydown', function(e) {
	
	      // When pressing entire, you can be as precise as you want.
	      if (e.keyCode === 13) {
	        _this.__truncationSuspended = true;
	        this.blur();
	        _this.__truncationSuspended = false;
	      }
	
	    });
	
	    function onChange() {
	      var attempted = parseFloat(_this.__input.value);
	      if (!common.isNaN(attempted)) _this.setValue(attempted);
	    }
	
	    function onBlur() {
	      onChange();
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    function onMouseDown(e) {
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	      prev_y = e.clientY;
	    }
	
	    function onMouseDrag(e) {
	
	      var diff = prev_y - e.clientY;
	      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
	
	      prev_y = e.clientY;
	
	    }
	
	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	    }
	
	    this.updateDisplay();
	
	    this.domElement.appendChild(this.__input);
	
	  };
	
	  NumberControllerBox.superclass = NumberController;
	
	  common.extend(
	
	      NumberControllerBox.prototype,
	      NumberController.prototype,
	
	      {
	
	        updateDisplay: function() {
	
	          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
	          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  function roundToDecimal(value, decimals) {
	    var tenTo = Math.pow(10, decimals);
	    return Math.round(value * tenTo) / tenTo;
	  }
	
	  return NumberControllerBox;
	
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {
	
	  /**
	   * @class Represents a given property of an object that is a number, contains
	   * a minimum and maximum, and provides a slider element with which to
	   * manipulate it. It should be noted that the slider element is made up of
	   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
	   * <code>&lt;slider&gt;</code> element.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   * 
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Number} minValue Minimum allowed value
	   * @param {Number} maxValue Maximum allowed value
	   * @param {Number} stepValue Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerSlider = function(object, property, min, max, step) {
	
	    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });
	
	    var _this = this;
	
	    this.__background = document.createElement('div');
	    this.__foreground = document.createElement('div');
	    
	
	
	    dom.bind(this.__background, 'mousedown', onMouseDown);
	    
	    dom.addClass(this.__background, 'slider');
	    dom.addClass(this.__foreground, 'slider-fg');
	
	    function onMouseDown(e) {
	
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	
	      onMouseDrag(e);
	    }
	
	    function onMouseDrag(e) {
	
	      e.preventDefault();
	
	      var offset = dom.getOffset(_this.__background);
	      var width = dom.getWidth(_this.__background);
	      
	      _this.setValue(
	        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
	      );
	
	      return false;
	
	    }
	
	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    this.updateDisplay();
	
	    this.__background.appendChild(this.__foreground);
	    this.domElement.appendChild(this.__background);
	
	  };
	
	  NumberControllerSlider.superclass = NumberController;
	
	  /**
	   * Injects default stylesheet for slider elements.
	   */
	  NumberControllerSlider.useDefaultStyles = function() {
	    css.inject(styleSheet);
	  };
	
	  common.extend(
	
	      NumberControllerSlider.prototype,
	      NumberController.prototype,
	
	      {
	
	        updateDisplay: function() {
	          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
	          this.__foreground.style.width = pct*100+'%';
	          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	
	
	  );
	
	  function map(v, i1, i2, o1, o2) {
	    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	  }
	
	  return NumberControllerSlider;
	  
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.css,
	dat.utils.common,
	".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
	
	
	dat.controllers.FunctionController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a GUI interface to fire a specified method, a property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var FunctionController = function(object, property, text) {
	
	    FunctionController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    this.__button = document.createElement('div');
	    this.__button.innerHTML = text === undefined ? 'Fire' : text;
	    dom.bind(this.__button, 'click', function(e) {
	      e.preventDefault();
	      _this.fire();
	      return false;
	    });
	
	    dom.addClass(this.__button, 'button');
	
	    this.domElement.appendChild(this.__button);
	
	
	  };
	
	  FunctionController.superclass = Controller;
	
	  common.extend(
	
	      FunctionController.prototype,
	      Controller.prototype,
	      {
	        
	        fire: function() {
	          if (this.__onChange) {
	            this.__onChange.call(this);
	          }
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.getValue().call(this.object);
	        }
	      }
	
	  );
	
	  return FunctionController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.controllers.BooleanController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a checkbox input to alter the boolean property of an object.
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var BooleanController = function(object, property) {
	
	    BooleanController.superclass.call(this, object, property);
	
	    var _this = this;
	    this.__prev = this.getValue();
	
	    this.__checkbox = document.createElement('input');
	    this.__checkbox.setAttribute('type', 'checkbox');
	
	
	    dom.bind(this.__checkbox, 'change', onChange, false);
	
	    this.domElement.appendChild(this.__checkbox);
	
	    // Match original value
	    this.updateDisplay();
	
	    function onChange() {
	      _this.setValue(!_this.__prev);
	    }
	
	  };
	
	  BooleanController.superclass = Controller;
	
	  common.extend(
	
	      BooleanController.prototype,
	      Controller.prototype,
	
	      {
	
	        setValue: function(v) {
	          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.__prev = this.getValue();
	          return toReturn;
	        },
	
	        updateDisplay: function() {
	          
	          if (this.getValue() === true) {
	            this.__checkbox.setAttribute('checked', 'checked');
	            this.__checkbox.checked = true;    
	          } else {
	              this.__checkbox.checked = false;
	          }
	
	          return BooleanController.superclass.prototype.updateDisplay.call(this);
	
	        }
	
	
	      }
	
	  );
	
	  return BooleanController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);
	
	
	dat.color.toString = (function (common) {
	
	  return function(color) {
	
	    if (color.a == 1 || common.isUndefined(color.a)) {
	
	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }
	
	      return '#' + s;
	
	    } else {
	
	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
	
	    }
	
	  }
	
	})(dat.utils.common);
	
	
	dat.color.interpret = (function (toString, common) {
	
	  var result, toReturn;
	
	  var interpret = function() {
	
	    toReturn = false;
	
	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
	
	    common.each(INTERPRETATIONS, function(family) {
	
	      if (family.litmus(original)) {
	
	        common.each(family.conversions, function(conversion, conversionName) {
	
	          result = conversion.read(original);
	
	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;
	
	          }
	
	        });
	
	        return common.BREAK;
	
	      }
	
	    });
	
	    return toReturn;
	
	  };
	
	  var INTERPRETATIONS = [
	
	    // Strings
	    {
	
	      litmus: common.isString,
	
	      conversions: {
	
	        THREE_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        SIX_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGB: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGBA: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };
	
	          },
	
	          write: toString
	
	        }
	
	      }
	
	    },
	
	    // Numbers
	    {
	
	      litmus: common.isNumber,
	
	      conversions: {
	
	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },
	
	          write: function(color) {
	            return color.hex;
	          }
	        }
	
	      }
	
	    },
	
	    // Arrays
	    {
	
	      litmus: common.isArray,
	
	      conversions: {
	
	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }
	
	        },
	
	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }
	
	        }
	
	      }
	
	    },
	
	    // Objects
	    {
	
	      litmus: common.isObject,
	
	      conversions: {
	
	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },
	
	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },
	
	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },
	
	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	
	  ];
	
	  return interpret;
	
	
	})(dat.color.toString,
	dat.utils.common);
	
	
	dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {
	
	  css.inject(styleSheet);
	
	  /** Outer-most className for GUI's */
	  var CSS_NAMESPACE = 'dg';
	
	  var HIDE_KEY_CODE = 72;
	
	  /** The only value shared between the JS and SCSS. Use caution. */
	  var CLOSE_BUTTON_HEIGHT = 20;
	
	  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
	
	  var SUPPORTS_LOCAL_STORAGE = (function() {
	    try {
	      return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	      return false;
	    }
	  })();
	
	  var SAVE_DIALOGUE;
	
	  /** Have we yet to create an autoPlace GUI? */
	  var auto_place_virgin = true;
	
	  /** Fixed position div that auto place GUI's go inside */
	  var auto_place_container;
	
	  /** Are we hiding the GUI's ? */
	  var hide = false;
	
	  /** GUI's which should be hidden */
	  var hideable_guis = [];
	
	  /**
	   * A lightweight controller library for JavaScript. It allows you to easily
	   * manipulate variables and fire functions on the fly.
	   * @class
	   *
	   * @member dat.gui
	   *
	   * @param {Object} [params]
	   * @param {String} [params.name] The name of this GUI.
	   * @param {Object} [params.load] JSON object representing the saved state of
	   * this GUI.
	   * @param {Boolean} [params.auto=true]
	   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
	   * @param {Boolean} [params.closed] If true, starts closed
	   */
	  var GUI = function(params) {
	
	    var _this = this;
	
	    /**
	     * Outermost DOM Element
	     * @type DOMElement
	     */
	    this.domElement = document.createElement('div');
	    this.__ul = document.createElement('ul');
	    this.domElement.appendChild(this.__ul);
	
	    dom.addClass(this.domElement, CSS_NAMESPACE);
	
	    /**
	     * Nested GUI's by name
	     * @ignore
	     */
	    this.__folders = {};
	
	    this.__controllers = [];
	
	    /**
	     * List of objects I'm remembering for save, only used in top level GUI
	     * @ignore
	     */
	    this.__rememberedObjects = [];
	
	    /**
	     * Maps the index of remembered objects to a map of controllers, only used
	     * in top level GUI.
	     *
	     * @private
	     * @ignore
	     *
	     * @example
	     * [
	     *  {
	     *    propertyName: Controller,
	     *    anotherPropertyName: Controller
	     *  },
	     *  {
	     *    propertyName: Controller
	     *  }
	     * ]
	     */
	    this.__rememberedObjectIndecesToControllers = [];
	
	    this.__listening = [];
	
	    params = params || {};
	
	    // Default parameters
	    params = common.defaults(params, {
	      autoPlace: true,
	      width: GUI.DEFAULT_WIDTH
	    });
	
	    params = common.defaults(params, {
	      resizable: params.autoPlace,
	      hideable: params.autoPlace
	    });
	
	
	    if (!common.isUndefined(params.load)) {
	
	      // Explicit preset
	      if (params.preset) params.load.preset = params.preset;
	
	    } else {
	
	      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
	
	    }
	
	    if (common.isUndefined(params.parent) && params.hideable) {
	      hideable_guis.push(this);
	    }
	
	    // Only root level GUI's are resizable.
	    params.resizable = common.isUndefined(params.parent) && params.resizable;
	
	
	    if (params.autoPlace && common.isUndefined(params.scrollable)) {
	      params.scrollable = true;
	    }
	//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;
	
	    // Not part of params because I don't want people passing this in via
	    // constructor. Should be a 'remembered' value.
	    var use_local_storage =
	        SUPPORTS_LOCAL_STORAGE &&
	            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
	
	    Object.defineProperties(this,
	
	        /** @lends dat.gui.GUI.prototype */
	        {
	
	          /**
	           * The parent <code>GUI</code>
	           * @type dat.gui.GUI
	           */
	          parent: {
	            get: function() {
	              return params.parent;
	            }
	          },
	
	          scrollable: {
	            get: function() {
	              return params.scrollable;
	            }
	          },
	
	          /**
	           * Handles <code>GUI</code>'s element placement for you
	           * @type Boolean
	           */
	          autoPlace: {
	            get: function() {
	              return params.autoPlace;
	            }
	          },
	
	          /**
	           * The identifier for a set of saved values
	           * @type String
	           */
	          preset: {
	
	            get: function() {
	              if (_this.parent) {
	                return _this.getRoot().preset;
	              } else {
	                return params.load.preset;
	              }
	            },
	
	            set: function(v) {
	              if (_this.parent) {
	                _this.getRoot().preset = v;
	              } else {
	                params.load.preset = v;
	              }
	              setPresetSelectIndex(this);
	              _this.revert();
	            }
	
	          },
	
	          /**
	           * The width of <code>GUI</code> element
	           * @type Number
	           */
	          width: {
	            get: function() {
	              return params.width;
	            },
	            set: function(v) {
	              params.width = v;
	              setWidth(_this, v);
	            }
	          },
	
	          /**
	           * The name of <code>GUI</code>. Used for folders. i.e
	           * a folder's name
	           * @type String
	           */
	          name: {
	            get: function() {
	              return params.name;
	            },
	            set: function(v) {
	              // TODO Check for collisions among sibling folders
	              params.name = v;
	              if (title_row_name) {
	                title_row_name.innerHTML = params.name;
	              }
	            }
	          },
	
	          /**
	           * Whether the <code>GUI</code> is collapsed or not
	           * @type Boolean
	           */
	          closed: {
	            get: function() {
	              return params.closed;
	            },
	            set: function(v) {
	              params.closed = v;
	              if (params.closed) {
	                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
	              } else {
	                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
	              }
	              // For browsers that aren't going to respect the CSS transition,
	              // Lets just check our height against the window height right off
	              // the bat.
	              this.onResize();
	
	              if (_this.__closeButton) {
	                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
	              }
	            }
	          },
	
	          /**
	           * Contains all presets
	           * @type Object
	           */
	          load: {
	            get: function() {
	              return params.load;
	            }
	          },
	
	          /**
	           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
	           * <code>remember</code>ing
	           * @type Boolean
	           */
	          useLocalStorage: {
	
	            get: function() {
	              return use_local_storage;
	            },
	            set: function(bool) {
	              if (SUPPORTS_LOCAL_STORAGE) {
	                use_local_storage = bool;
	                if (bool) {
	                  dom.bind(window, 'unload', saveToLocalStorage);
	                } else {
	                  dom.unbind(window, 'unload', saveToLocalStorage);
	                }
	                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
	              }
	            }
	
	          }
	
	        });
	
	    // Are we a root level GUI?
	    if (common.isUndefined(params.parent)) {
	
	      params.closed = false;
	
	      dom.addClass(this.domElement, GUI.CLASS_MAIN);
	      dom.makeSelectable(this.domElement, false);
	
	      // Are we supposed to be loading locally?
	      if (SUPPORTS_LOCAL_STORAGE) {
	
	        if (use_local_storage) {
	
	          _this.useLocalStorage = true;
	
	          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
	
	          if (saved_gui) {
	            params.load = JSON.parse(saved_gui);
	          }
	
	        }
	
	      }
	
	      this.__closeButton = document.createElement('div');
	      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
	      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
	      this.domElement.appendChild(this.__closeButton);
	
	      dom.bind(this.__closeButton, 'click', function() {
	
	        _this.closed = !_this.closed;
	
	
	      });
	
	
	      // Oh, you're a nested GUI!
	    } else {
	
	      if (params.closed === undefined) {
	        params.closed = true;
	      }
	
	      var title_row_name = document.createTextNode(params.name);
	      dom.addClass(title_row_name, 'controller-name');
	
	      var title_row = addRow(_this, title_row_name);
	
	      var on_click_title = function(e) {
	        e.preventDefault();
	        _this.closed = !_this.closed;
	        return false;
	      };
	
	      dom.addClass(this.__ul, GUI.CLASS_CLOSED);
	
	      dom.addClass(title_row, 'title');
	      dom.bind(title_row, 'click', on_click_title);
	
	      if (!params.closed) {
	        this.closed = false;
	      }
	
	    }
	
	    if (params.autoPlace) {
	
	      if (common.isUndefined(params.parent)) {
	
	        if (auto_place_virgin) {
	          auto_place_container = document.createElement('div');
	          dom.addClass(auto_place_container, CSS_NAMESPACE);
	          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
	          document.body.appendChild(auto_place_container);
	          auto_place_virgin = false;
	        }
	
	        // Put it in the dom for you.
	        auto_place_container.appendChild(this.domElement);
	
	        // Apply the auto styles
	        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
	
	      }
	
	
	      // Make it not elastic.
	      if (!this.parent) setWidth(_this, params.width);
	
	    }
	
	    dom.bind(window, 'resize', function() { _this.onResize() });
	    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
	    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
	    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
	    this.onResize();
	
	
	    if (params.resizable) {
	      addResizeHandle(this);
	    }
	
	    function saveToLocalStorage() {
	      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
	    }
	
	    var root = _this.getRoot();
	    function resetWidth() {
	        var root = _this.getRoot();
	        root.width += 1;
	        common.defer(function() {
	          root.width -= 1;
	        });
	      }
	
	      if (!params.parent) {
	        resetWidth();
	      }
	
	  };
	
	  GUI.toggleHide = function() {
	
	    hide = !hide;
	    common.each(hideable_guis, function(gui) {
	      gui.domElement.style.zIndex = hide ? -999 : 999;
	      gui.domElement.style.opacity = hide ? 0 : 1;
	    });
	  };
	
	  GUI.CLASS_AUTO_PLACE = 'a';
	  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
	  GUI.CLASS_MAIN = 'main';
	  GUI.CLASS_CONTROLLER_ROW = 'cr';
	  GUI.CLASS_TOO_TALL = 'taller-than-window';
	  GUI.CLASS_CLOSED = 'closed';
	  GUI.CLASS_CLOSE_BUTTON = 'close-button';
	  GUI.CLASS_DRAG = 'drag';
	
	  GUI.DEFAULT_WIDTH = 245;
	  GUI.TEXT_CLOSED = 'Close Controls';
	  GUI.TEXT_OPEN = 'Open Controls';
	
	  dom.bind(window, 'keydown', function(e) {
	
	    if (document.activeElement.type !== 'text' &&
	        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
	      GUI.toggleHide();
	    }
	
	  }, false);
	
	  common.extend(
	
	      GUI.prototype,
	
	      /** @lends dat.gui.GUI */
	      {
	
	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.Controller} The new controller that was added.
	         * @instance
	         */
	        add: function(object, property) {
	
	          return add(
	              this,
	              object,
	              property,
	              {
	                factoryArgs: Array.prototype.slice.call(arguments, 2)
	              }
	          );
	
	        },
	
	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.ColorController} The new controller that was added.
	         * @instance
	         */
	        addColor: function(object, property) {
	
	          return add(
	              this,
	              object,
	              property,
	              {
	                color: true
	              }
	          );
	
	        },
	
	        /**
	         * @param controller
	         * @instance
	         */
	        remove: function(controller) {
	
	          // TODO listening?
	          this.__ul.removeChild(controller.__li);
	          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
	          var _this = this;
	          common.defer(function() {
	            _this.onResize();
	          });
	
	        },
	
	        destroy: function() {
	
	          if (this.autoPlace) {
	            auto_place_container.removeChild(this.domElement);
	          }
	
	        },
	
	        /**
	         * @param name
	         * @returns {dat.gui.GUI} The new folder.
	         * @throws {Error} if this GUI already has a folder by the specified
	         * name
	         * @instance
	         */
	        addFolder: function(name) {
	
	          // We have to prevent collisions on names in order to have a key
	          // by which to remember saved values
	          if (this.__folders[name] !== undefined) {
	            throw new Error('You already have a folder in this GUI by the' +
	                ' name "' + name + '"');
	          }
	
	          var new_gui_params = { name: name, parent: this };
	
	          // We need to pass down the autoPlace trait so that we can
	          // attach event listeners to open/close folder actions to
	          // ensure that a scrollbar appears if the window is too short.
	          new_gui_params.autoPlace = this.autoPlace;
	
	          // Do we have saved appearance data for this folder?
	
	          if (this.load && // Anything loaded?
	              this.load.folders && // Was my parent a dead-end?
	              this.load.folders[name]) { // Did daddy remember me?
	
	            // Start me closed if I was closed
	            new_gui_params.closed = this.load.folders[name].closed;
	
	            // Pass down the loaded data
	            new_gui_params.load = this.load.folders[name];
	
	          }
	
	          var gui = new GUI(new_gui_params);
	          this.__folders[name] = gui;
	
	          var li = addRow(this, gui.domElement);
	          dom.addClass(li, 'folder');
	          return gui;
	
	        },
	
	        open: function() {
	          this.closed = false;
	        },
	
	        close: function() {
	          this.closed = true;
	        },
	
	        onResize: function() {
	
	          var root = this.getRoot();
	
	          if (root.scrollable) {
	
	            var top = dom.getOffset(root.__ul).top;
	            var h = 0;
	
	            common.each(root.__ul.childNodes, function(node) {
	              if (! (root.autoPlace && node === root.__save_row))
	                h += dom.getHeight(node);
	            });
	
	            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
	              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
	            } else {
	              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = 'auto';
	            }
	
	          }
	
	          if (root.__resize_handle) {
	            common.defer(function() {
	              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
	            });
	          }
	
	          if (root.__closeButton) {
	            root.__closeButton.style.width = root.width + 'px';
	          }
	
	        },
	
	        /**
	         * Mark objects for saving. The order of these objects cannot change as
	         * the GUI grows. When remembering new objects, append them to the end
	         * of the list.
	         *
	         * @param {Object...} objects
	         * @throws {Error} if not called on a top level GUI.
	         * @instance
	         */
	        remember: function() {
	
	          if (common.isUndefined(SAVE_DIALOGUE)) {
	            SAVE_DIALOGUE = new CenteredDiv();
	            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
	          }
	
	          if (this.parent) {
	            throw new Error("You can only call remember on a top level GUI.");
	          }
	
	          var _this = this;
	
	          common.each(Array.prototype.slice.call(arguments), function(object) {
	            if (_this.__rememberedObjects.length == 0) {
	              addSaveMenu(_this);
	            }
	            if (_this.__rememberedObjects.indexOf(object) == -1) {
	              _this.__rememberedObjects.push(object);
	            }
	          });
	
	          if (this.autoPlace) {
	            // Set save row width
	            setWidth(this, this.width);
	          }
	
	        },
	
	        /**
	         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
	         * @instance
	         */
	        getRoot: function() {
	          var gui = this;
	          while (gui.parent) {
	            gui = gui.parent;
	          }
	          return gui;
	        },
	
	        /**
	         * @returns {Object} a JSON object representing the current state of
	         * this GUI as well as its remembered properties.
	         * @instance
	         */
	        getSaveObject: function() {
	
	          var toReturn = this.load;
	
	          toReturn.closed = this.closed;
	
	          // Am I remembering any values?
	          if (this.__rememberedObjects.length > 0) {
	
	            toReturn.preset = this.preset;
	
	            if (!toReturn.remembered) {
	              toReturn.remembered = {};
	            }
	
	            toReturn.remembered[this.preset] = getCurrentPreset(this);
	
	          }
	
	          toReturn.folders = {};
	          common.each(this.__folders, function(element, key) {
	            toReturn.folders[key] = element.getSaveObject();
	          });
	
	          return toReturn;
	
	        },
	
	        save: function() {
	
	          if (!this.load.remembered) {
	            this.load.remembered = {};
	          }
	
	          this.load.remembered[this.preset] = getCurrentPreset(this);
	          markPresetModified(this, false);
	
	        },
	
	        saveAs: function(presetName) {
	
	          if (!this.load.remembered) {
	
	            // Retain default values upon first save
	            this.load.remembered = {};
	            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
	
	          }
	
	          this.load.remembered[presetName] = getCurrentPreset(this);
	          this.preset = presetName;
	          addPresetOption(this, presetName, true);
	
	        },
	
	        revert: function(gui) {
	
	          common.each(this.__controllers, function(controller) {
	            // Make revert work on Default.
	            if (!this.getRoot().load.remembered) {
	              controller.setValue(controller.initialValue);
	            } else {
	              recallSavedValue(gui || this.getRoot(), controller);
	            }
	          }, this);
	
	          common.each(this.__folders, function(folder) {
	            folder.revert(folder);
	          });
	
	          if (!gui) {
	            markPresetModified(this.getRoot(), false);
	          }
	
	
	        },
	
	        listen: function(controller) {
	
	          var init = this.__listening.length == 0;
	          this.__listening.push(controller);
	          if (init) updateDisplays(this.__listening);
	
	        }
	
	      }
	
	  );
	
	  function add(gui, object, property, params) {
	
	    if (object[property] === undefined) {
	      throw new Error("Object " + object + " has no property \"" + property + "\"");
	    }
	
	    var controller;
	
	    if (params.color) {
	
	      controller = new ColorController(object, property);
	
	    } else {
	
	      var factoryArgs = [object,property].concat(params.factoryArgs);
	      controller = controllerFactory.apply(gui, factoryArgs);
	
	    }
	
	    if (params.before instanceof Controller) {
	      params.before = params.before.__li;
	    }
	
	    recallSavedValue(gui, controller);
	
	    dom.addClass(controller.domElement, 'c');
	
	    var name = document.createElement('span');
	    dom.addClass(name, 'property-name');
	    name.innerHTML = controller.property;
	
	    var container = document.createElement('div');
	    container.appendChild(name);
	    container.appendChild(controller.domElement);
	
	    var li = addRow(gui, container, params.before);
	
	    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
	    dom.addClass(li, typeof controller.getValue());
	
	    augmentController(gui, li, controller);
	
	    gui.__controllers.push(controller);
	
	    return controller;
	
	  }
	
	  /**
	   * Add a row to the end of the GUI or before another row.
	   *
	   * @param gui
	   * @param [dom] If specified, inserts the dom content in the new row
	   * @param [liBefore] If specified, places the new row before another row
	   */
	  function addRow(gui, dom, liBefore) {
	    var li = document.createElement('li');
	    if (dom) li.appendChild(dom);
	    if (liBefore) {
	      gui.__ul.insertBefore(li, params.before);
	    } else {
	      gui.__ul.appendChild(li);
	    }
	    gui.onResize();
	    return li;
	  }
	
	  function augmentController(gui, li, controller) {
	
	    controller.__li = li;
	    controller.__gui = gui;
	
	    common.extend(controller, {
	
	      options: function(options) {
	
	        if (arguments.length > 1) {
	          controller.remove();
	
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [common.toArray(arguments)]
	              }
	          );
	
	        }
	
	        if (common.isArray(options) || common.isObject(options)) {
	          controller.remove();
	
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [options]
	              }
	          );
	
	        }
	
	      },
	
	      name: function(v) {
	        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
	        return controller;
	      },
	
	      listen: function() {
	        controller.__gui.listen(controller);
	        return controller;
	      },
	
	      remove: function() {
	        controller.__gui.remove(controller);
	        return controller;
	      }
	
	    });
	
	    // All sliders should be accompanied by a box.
	    if (controller instanceof NumberControllerSlider) {
	
	      var box = new NumberControllerBox(controller.object, controller.property,
	          { min: controller.__min, max: controller.__max, step: controller.__step });
	
	      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
	        var pc = controller[method];
	        var pb = box[method];
	        controller[method] = box[method] = function() {
	          var args = Array.prototype.slice.call(arguments);
	          pc.apply(controller, args);
	          return pb.apply(box, args);
	        }
	      });
	
	      dom.addClass(li, 'has-slider');
	      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
	
	    }
	    else if (controller instanceof NumberControllerBox) {
	
	      var r = function(returned) {
	
	        // Have we defined both boundaries?
	        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {
	
	          // Well, then lets just replace this with a slider.
	          controller.remove();
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [controller.__min, controller.__max, controller.__step]
	              });
	
	        }
	
	        return returned;
	
	      };
	
	      controller.min = common.compose(r, controller.min);
	      controller.max = common.compose(r, controller.max);
	
	    }
	    else if (controller instanceof BooleanController) {
	
	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__checkbox, 'click');
	      });
	
	      dom.bind(controller.__checkbox, 'click', function(e) {
	        e.stopPropagation(); // Prevents double-toggle
	      })
	
	    }
	    else if (controller instanceof FunctionController) {
	
	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__button, 'click');
	      });
	
	      dom.bind(li, 'mouseover', function() {
	        dom.addClass(controller.__button, 'hover');
	      });
	
	      dom.bind(li, 'mouseout', function() {
	        dom.removeClass(controller.__button, 'hover');
	      });
	
	    }
	    else if (controller instanceof ColorController) {
	
	      dom.addClass(li, 'color');
	      controller.updateDisplay = common.compose(function(r) {
	        li.style.borderLeftColor = controller.__color.toString();
	        return r;
	      }, controller.updateDisplay);
	
	      controller.updateDisplay();
	
	    }
	
	    controller.setValue = common.compose(function(r) {
	      if (gui.getRoot().__preset_select && controller.isModified()) {
	        markPresetModified(gui.getRoot(), true);
	      }
	      return r;
	    }, controller.setValue);
	
	  }
	
	  function recallSavedValue(gui, controller) {
	
	    // Find the topmost GUI, that's where remembered objects live.
	    var root = gui.getRoot();
	
	    // Does the object we're controlling match anything we've been told to
	    // remember?
	    var matched_index = root.__rememberedObjects.indexOf(controller.object);
	
	    // Why yes, it does!
	    if (matched_index != -1) {
	
	      // Let me fetch a map of controllers for thcommon.isObject.
	      var controller_map =
	          root.__rememberedObjectIndecesToControllers[matched_index];
	
	      // Ohp, I believe this is the first controller we've created for this
	      // object. Lets make the map fresh.
	      if (controller_map === undefined) {
	        controller_map = {};
	        root.__rememberedObjectIndecesToControllers[matched_index] =
	            controller_map;
	      }
	
	      // Keep track of this controller
	      controller_map[controller.property] = controller;
	
	      // Okay, now have we saved any values for this controller?
	      if (root.load && root.load.remembered) {
	
	        var preset_map = root.load.remembered;
	
	        // Which preset are we trying to load?
	        var preset;
	
	        if (preset_map[gui.preset]) {
	
	          preset = preset_map[gui.preset];
	
	        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {
	
	          // Uhh, you can have the default instead?
	          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];
	
	        } else {
	
	          // Nada.
	
	          return;
	
	        }
	
	
	        // Did the loaded object remember thcommon.isObject?
	        if (preset[matched_index] &&
	
	          // Did we remember this particular property?
	            preset[matched_index][controller.property] !== undefined) {
	
	          // We did remember something for this guy ...
	          var value = preset[matched_index][controller.property];
	
	          // And that's what it is.
	          controller.initialValue = value;
	          controller.setValue(value);
	
	        }
	
	      }
	
	    }
	
	  }
	
	  function getLocalStorageHash(gui, key) {
	    // TODO how does this deal with multiple GUI's?
	    return document.location.href + '.' + key;
	
	  }
	
	  function addSaveMenu(gui) {
	
	    var div = gui.__save_row = document.createElement('li');
	
	    dom.addClass(gui.domElement, 'has-save');
	
	    gui.__ul.insertBefore(div, gui.__ul.firstChild);
	
	    dom.addClass(div, 'save-row');
	
	    var gears = document.createElement('span');
	    gears.innerHTML = '&nbsp;';
	    dom.addClass(gears, 'button gears');
	
	    // TODO replace with FunctionController
	    var button = document.createElement('span');
	    button.innerHTML = 'Save';
	    dom.addClass(button, 'button');
	    dom.addClass(button, 'save');
	
	    var button2 = document.createElement('span');
	    button2.innerHTML = 'New';
	    dom.addClass(button2, 'button');
	    dom.addClass(button2, 'save-as');
	
	    var button3 = document.createElement('span');
	    button3.innerHTML = 'Revert';
	    dom.addClass(button3, 'button');
	    dom.addClass(button3, 'revert');
	
	    var select = gui.__preset_select = document.createElement('select');
	
	    if (gui.load && gui.load.remembered) {
	
	      common.each(gui.load.remembered, function(value, key) {
	        addPresetOption(gui, key, key == gui.preset);
	      });
	
	    } else {
	      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
	    }
	
	    dom.bind(select, 'change', function() {
	
	
	      for (var index = 0; index < gui.__preset_select.length; index++) {
	        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
	      }
	
	      gui.preset = this.value;
	
	    });
	
	    div.appendChild(select);
	    div.appendChild(gears);
	    div.appendChild(button);
	    div.appendChild(button2);
	    div.appendChild(button3);
	
	    if (SUPPORTS_LOCAL_STORAGE) {
	
	      var saveLocally = document.getElementById('dg-save-locally');
	      var explain = document.getElementById('dg-local-explain');
	
	      saveLocally.style.display = 'block';
	
	      var localStorageCheckBox = document.getElementById('dg-local-storage');
	
	      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
	        localStorageCheckBox.setAttribute('checked', 'checked');
	      }
	
	      function showHideExplain() {
	        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
	      }
	
	      showHideExplain();
	
	      // TODO: Use a boolean controller, fool!
	      dom.bind(localStorageCheckBox, 'change', function() {
	        gui.useLocalStorage = !gui.useLocalStorage;
	        showHideExplain();
	      });
	
	    }
	
	    var newConstructorTextArea = document.getElementById('dg-new-constructor');
	
	    dom.bind(newConstructorTextArea, 'keydown', function(e) {
	      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
	        SAVE_DIALOGUE.hide();
	      }
	    });
	
	    dom.bind(gears, 'click', function() {
	      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
	      SAVE_DIALOGUE.show();
	      newConstructorTextArea.focus();
	      newConstructorTextArea.select();
	    });
	
	    dom.bind(button, 'click', function() {
	      gui.save();
	    });
	
	    dom.bind(button2, 'click', function() {
	      var presetName = prompt('Enter a new preset name.');
	      if (presetName) gui.saveAs(presetName);
	    });
	
	    dom.bind(button3, 'click', function() {
	      gui.revert();
	    });
	
	//    div.appendChild(button2);
	
	  }
	
	  function addResizeHandle(gui) {
	
	    gui.__resize_handle = document.createElement('div');
	
	    common.extend(gui.__resize_handle.style, {
	
	      width: '6px',
	      marginLeft: '-3px',
	      height: '200px',
	      cursor: 'ew-resize',
	      position: 'absolute'
	//      border: '1px solid blue'
	
	    });
	
	    var pmouseX;
	
	    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
	    dom.bind(gui.__closeButton, 'mousedown', dragStart);
	
	    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
	
	    function dragStart(e) {
	
	      e.preventDefault();
	
	      pmouseX = e.clientX;
	
	      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.bind(window, 'mousemove', drag);
	      dom.bind(window, 'mouseup', dragStop);
	
	      return false;
	
	    }
	
	    function drag(e) {
	
	      e.preventDefault();
	
	      gui.width += pmouseX - e.clientX;
	      gui.onResize();
	      pmouseX = e.clientX;
	
	      return false;
	
	    }
	
	    function dragStop() {
	
	      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.unbind(window, 'mousemove', drag);
	      dom.unbind(window, 'mouseup', dragStop);
	
	    }
	
	  }
	
	  function setWidth(gui, w) {
	    gui.domElement.style.width = w + 'px';
	    // Auto placed save-rows are position fixed, so we have to
	    // set the width manually if we want it to bleed to the edge
	    if (gui.__save_row && gui.autoPlace) {
	      gui.__save_row.style.width = w + 'px';
	    }if (gui.__closeButton) {
	      gui.__closeButton.style.width = w + 'px';
	    }
	  }
	
	  function getCurrentPreset(gui, useInitialValues) {
	
	    var toReturn = {};
	
	    // For each object I'm remembering
	    common.each(gui.__rememberedObjects, function(val, index) {
	
	      var saved_values = {};
	
	      // The controllers I've made for thcommon.isObject by property
	      var controller_map =
	          gui.__rememberedObjectIndecesToControllers[index];
	
	      // Remember each value for each property
	      common.each(controller_map, function(controller, property) {
	        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
	      });
	
	      // Save the values for thcommon.isObject
	      toReturn[index] = saved_values;
	
	    });
	
	    return toReturn;
	
	  }
	
	  function addPresetOption(gui, name, setSelected) {
	    var opt = document.createElement('option');
	    opt.innerHTML = name;
	    opt.value = name;
	    gui.__preset_select.appendChild(opt);
	    if (setSelected) {
	      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
	    }
	  }
	
	  function setPresetSelectIndex(gui) {
	    for (var index = 0; index < gui.__preset_select.length; index++) {
	      if (gui.__preset_select[index].value == gui.preset) {
	        gui.__preset_select.selectedIndex = index;
	      }
	    }
	  }
	
	  function markPresetModified(gui, modified) {
	    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
	//    console.log('mark', modified, opt);
	    if (modified) {
	      opt.innerHTML = opt.value + "*";
	    } else {
	      opt.innerHTML = opt.value;
	    }
	  }
	
	  function updateDisplays(controllerArray) {
	
	
	    if (controllerArray.length != 0) {
	
	      requestAnimationFrame(function() {
	        updateDisplays(controllerArray);
	      });
	
	    }
	
	    common.each(controllerArray, function(c) {
	      c.updateDisplay();
	    });
	
	  }
	
	  return GUI;
	
	})(dat.utils.css,
	"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
	".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
	dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {
	
	      return function(object, property) {
	
	        var initialValue = object[property];
	
	        // Providing options?
	        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
	          return new OptionController(object, property, arguments[2]);
	        }
	
	        // Providing a map?
	
	        if (common.isNumber(initialValue)) {
	
	          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {
	
	            // Has min and max.
	            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
	
	          } else {
	
	            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
	
	          }
	
	        }
	
	        if (common.isString(initialValue)) {
	          return new StringController(object, property);
	        }
	
	        if (common.isFunction(initialValue)) {
	          return new FunctionController(object, property, '');
	        }
	
	        if (common.isBoolean(initialValue)) {
	          return new BooleanController(object, property);
	        }
	
	      }
	
	    })(dat.controllers.OptionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.StringController = (function (Controller, dom, common) {
	
	  /**
	   * @class Provides a text input to alter the string property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var StringController = function(object, property) {
	
	    StringController.superclass.call(this, object, property);
	
	    var _this = this;
	
	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');
	
	    dom.bind(this.__input, 'keyup', onChange);
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) {
	        this.blur();
	      }
	    });
	    
	
	    function onChange() {
	      _this.setValue(_this.__input.value);
	    }
	
	    function onBlur() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }
	
	    this.updateDisplay();
	
	    this.domElement.appendChild(this.__input);
	
	  };
	
	  StringController.superclass = Controller;
	
	  common.extend(
	
	      StringController.prototype,
	      Controller.prototype,
	
	      {
	
	        updateDisplay: function() {
	          // Stops the caret from moving on account of:
	          // keyup -> setValue -> updateDisplay
	          if (!dom.isActive(this.__input)) {
	            this.__input.value = this.getValue();
	          }
	          return StringController.superclass.prototype.updateDisplay.call(this);
	        }
	
	      }
	
	  );
	
	  return StringController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common),
	dat.controllers.FunctionController,
	dat.controllers.BooleanController,
	dat.utils.common),
	dat.controllers.Controller,
	dat.controllers.BooleanController,
	dat.controllers.FunctionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.OptionController,
	dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {
	
	  var ColorController = function(object, property) {
	
	    ColorController.superclass.call(this, object, property);
	
	    this.__color = new Color(this.getValue());
	    this.__temp = new Color(0);
	
	    var _this = this;
	
	    this.domElement = document.createElement('div');
	
	    dom.makeSelectable(this.domElement, false);
	
	    this.__selector = document.createElement('div');
	    this.__selector.className = 'selector';
	
	    this.__saturation_field = document.createElement('div');
	    this.__saturation_field.className = 'saturation-field';
	
	    this.__field_knob = document.createElement('div');
	    this.__field_knob.className = 'field-knob';
	    this.__field_knob_border = '2px solid ';
	
	    this.__hue_knob = document.createElement('div');
	    this.__hue_knob.className = 'hue-knob';
	
	    this.__hue_field = document.createElement('div');
	    this.__hue_field.className = 'hue-field';
	
	    this.__input = document.createElement('input');
	    this.__input.type = 'text';
	    this.__input_textShadow = '0 1px 1px ';
	
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) { // on enter
	        onBlur.call(this);
	      }
	    });
	
	    dom.bind(this.__input, 'blur', onBlur);
	
	    dom.bind(this.__selector, 'mousedown', function(e) {
	
	      dom
	        .addClass(this, 'drag')
	        .bind(window, 'mouseup', function(e) {
	          dom.removeClass(_this.__selector, 'drag');
	        });
	
	    });
	
	    var value_field = document.createElement('div');
	
	    common.extend(this.__selector.style, {
	      width: '122px',
	      height: '102px',
	      padding: '3px',
	      backgroundColor: '#222',
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
	    });
	
	    common.extend(this.__field_knob.style, {
	      position: 'absolute',
	      width: '12px',
	      height: '12px',
	      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
	      borderRadius: '12px',
	      zIndex: 1
	    });
	    
	    common.extend(this.__hue_knob.style, {
	      position: 'absolute',
	      width: '15px',
	      height: '2px',
	      borderRight: '4px solid #fff',
	      zIndex: 1
	    });
	
	    common.extend(this.__saturation_field.style, {
	      width: '100px',
	      height: '100px',
	      border: '1px solid #555',
	      marginRight: '3px',
	      display: 'inline-block',
	      cursor: 'pointer'
	    });
	
	    common.extend(value_field.style, {
	      width: '100%',
	      height: '100%',
	      background: 'none'
	    });
	    
	    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');
	
	    common.extend(this.__hue_field.style, {
	      width: '15px',
	      height: '100px',
	      display: 'inline-block',
	      border: '1px solid #555',
	      cursor: 'ns-resize'
	    });
	
	    hueGradient(this.__hue_field);
	
	    common.extend(this.__input.style, {
	      outline: 'none',
	//      width: '120px',
	      textAlign: 'center',
	//      padding: '4px',
	//      marginBottom: '6px',
	      color: '#fff',
	      border: 0,
	      fontWeight: 'bold',
	      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
	    });
	
	    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
	    dom.bind(this.__field_knob, 'mousedown', fieldDown);
	
	    dom.bind(this.__hue_field, 'mousedown', function(e) {
	      setH(e);
	      dom.bind(window, 'mousemove', setH);
	      dom.bind(window, 'mouseup', unbindH);
	    });
	
	    function fieldDown(e) {
	      setSV(e);
	      // document.body.style.cursor = 'none';
	      dom.bind(window, 'mousemove', setSV);
	      dom.bind(window, 'mouseup', unbindSV);
	    }
	
	    function unbindSV() {
	      dom.unbind(window, 'mousemove', setSV);
	      dom.unbind(window, 'mouseup', unbindSV);
	      // document.body.style.cursor = 'default';
	    }
	
	    function onBlur() {
	      var i = interpret(this.value);
	      if (i !== false) {
	        _this.__color.__state = i;
	        _this.setValue(_this.__color.toOriginal());
	      } else {
	        this.value = _this.__color.toString();
	      }
	    }
	
	    function unbindH() {
	      dom.unbind(window, 'mousemove', setH);
	      dom.unbind(window, 'mouseup', unbindH);
	    }
	
	    this.__saturation_field.appendChild(value_field);
	    this.__selector.appendChild(this.__field_knob);
	    this.__selector.appendChild(this.__saturation_field);
	    this.__selector.appendChild(this.__hue_field);
	    this.__hue_field.appendChild(this.__hue_knob);
	
	    this.domElement.appendChild(this.__input);
	    this.domElement.appendChild(this.__selector);
	
	    this.updateDisplay();
	
	    function setSV(e) {
	
	      e.preventDefault();
	
	      var w = dom.getWidth(_this.__saturation_field);
	      var o = dom.getOffset(_this.__saturation_field);
	      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
	      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;
	
	      if (v > 1) v = 1;
	      else if (v < 0) v = 0;
	
	      if (s > 1) s = 1;
	      else if (s < 0) s = 0;
	
	      _this.__color.v = v;
	      _this.__color.s = s;
	
	      _this.setValue(_this.__color.toOriginal());
	
	
	      return false;
	
	    }
	
	    function setH(e) {
	
	      e.preventDefault();
	
	      var s = dom.getHeight(_this.__hue_field);
	      var o = dom.getOffset(_this.__hue_field);
	      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;
	
	      if (h > 1) h = 1;
	      else if (h < 0) h = 0;
	
	      _this.__color.h = h * 360;
	
	      _this.setValue(_this.__color.toOriginal());
	
	      return false;
	
	    }
	
	  };
	
	  ColorController.superclass = Controller;
	
	  common.extend(
	
	      ColorController.prototype,
	      Controller.prototype,
	
	      {
	
	        updateDisplay: function() {
	
	          var i = interpret(this.getValue());
	
	          if (i !== false) {
	
	            var mismatch = false;
	
	            // Check for mismatch on the interpreted value.
	
	            common.each(Color.COMPONENTS, function(component) {
	              if (!common.isUndefined(i[component]) &&
	                  !common.isUndefined(this.__color.__state[component]) &&
	                  i[component] !== this.__color.__state[component]) {
	                mismatch = true;
	                return {}; // break
	              }
	            }, this);
	
	            // If nothing diverges, we keep our previous values
	            // for statefulness, otherwise we recalculate fresh
	            if (mismatch) {
	              common.extend(this.__color.__state, i);
	            }
	
	          }
	
	          common.extend(this.__temp.__state, this.__color.__state);
	
	          this.__temp.a = 1;
	
	          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
	          var _flip = 255 - flip;
	
	          common.extend(this.__field_knob.style, {
	            marginLeft: 100 * this.__color.s - 7 + 'px',
	            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
	            backgroundColor: this.__temp.toString(),
	            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
	          });
	
	          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'
	
	          this.__temp.s = 1;
	          this.__temp.v = 1;
	
	          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());
	
	          common.extend(this.__input.style, {
	            backgroundColor: this.__input.value = this.__color.toString(),
	            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
	            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
	          });
	
	        }
	
	      }
	
	  );
	  
	  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
	  
	  function linearGradient(elem, x, a, b) {
	    elem.style.background = '';
	    common.each(vendors, function(vendor) {
	      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
	    });
	  }
	  
	  function hueGradient(elem) {
	    elem.style.background = '';
	    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
	    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	  }
	
	
	  return ColorController;
	
	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.color.Color = (function (interpret, math, toString, common) {
	
	  var Color = function() {
	
	    this.__state = interpret.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }
	
	    this.__state.a = this.__state.a || 1;
	
	
	  };
	
	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];
	
	  common.extend(Color.prototype, {
	
	    toString: function() {
	      return toString(this);
	    },
	
	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }
	
	  });
	
	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);
	
	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');
	
	  Object.defineProperty(Color.prototype, 'a', {
	
	    get: function() {
	      return this.__state.a;
	    },
	
	    set: function(v) {
	      this.__state.a = v;
	    }
	
	  });
	
	  Object.defineProperty(Color.prototype, 'hex', {
	
	    get: function() {
	
	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }
	
	      return this.__state.hex;
	
	    },
	
	    set: function(v) {
	
	      this.__state.space = 'HEX';
	      this.__state.hex = v;
	
	    }
	
	  });
	
	  function defineRGBComponent(target, component, componentHexIndex) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }
	
	        recalculateRGB(this, component, componentHexIndex);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function defineHSVComponent(target, component) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'HSV')
	          return this.__state[component];
	
	        recalculateHSV(this);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function recalculateRGB(color, component, componentHexIndex) {
	
	    if (color.__state.space === 'HEX') {
	
	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
	
	    } else if (color.__state.space === 'HSV') {
	
	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	
	    } else {
	
	      throw 'Corrupted color state';
	
	    }
	
	  }
	
	  function recalculateHSV(color) {
	
	    var result = math.rgb_to_hsv(color.r, color.g, color.b);
	
	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );
	
	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }
	
	  }
	
	  return Color;
	
	})(dat.color.interpret,
	dat.color.math = (function () {
	
	  var tmpComponent;
	
	  return {
	
	    hsv_to_rgb: function(h, s, v) {
	
	      var hi = Math.floor(h / 60) % 6;
	
	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];
	
	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };
	
	    },
	
	    rgb_to_hsv: function(r, g, b) {
	
	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;
	
	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }
	
	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }
	
	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },
	
	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },
	
	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },
	
	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }
	
	  }
	
	})(),
	dat.color.toString,
	dat.utils.common),
	dat.color.interpret,
	dat.utils.common),
	dat.utils.requestAnimationFrame = (function () {
	
	  /**
	   * requirejs version of Paul Irish's RequestAnimationFrame
	   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	   */
	
	  return window.webkitRequestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.oRequestAnimationFrame ||
	      window.msRequestAnimationFrame ||
	      function(callback, element) {
	
	        window.setTimeout(callback, 1000 / 60);
	
	      };
	})(),
	dat.dom.CenteredDiv = (function (dom, common) {
	
	
	  var CenteredDiv = function() {
	
	    this.backgroundElement = document.createElement('div');
	    common.extend(this.backgroundElement.style, {
	      backgroundColor: 'rgba(0,0,0,0.8)',
	      top: 0,
	      left: 0,
	      display: 'none',
	      zIndex: '1000',
	      opacity: 0,
	      WebkitTransition: 'opacity 0.2s linear'
	    });
	
	    dom.makeFullscreen(this.backgroundElement);
	    this.backgroundElement.style.position = 'fixed';
	
	    this.domElement = document.createElement('div');
	    common.extend(this.domElement.style, {
	      position: 'fixed',
	      display: 'none',
	      zIndex: '1001',
	      opacity: 0,
	      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
	    });
	
	
	    document.body.appendChild(this.backgroundElement);
	    document.body.appendChild(this.domElement);
	
	    var _this = this;
	    dom.bind(this.backgroundElement, 'click', function() {
	      _this.hide();
	    });
	
	
	  };
	
	  CenteredDiv.prototype.show = function() {
	
	    var _this = this;
	    
	
	
	    this.backgroundElement.style.display = 'block';
	
	    this.domElement.style.display = 'block';
	    this.domElement.style.opacity = 0;
	//    this.domElement.style.top = '52%';
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	    this.layout();
	
	    common.defer(function() {
	      _this.backgroundElement.style.opacity = 1;
	      _this.domElement.style.opacity = 1;
	      _this.domElement.style.webkitTransform = 'scale(1)';
	    });
	
	  };
	
	  CenteredDiv.prototype.hide = function() {
	
	    var _this = this;
	
	    var hide = function() {
	
	      _this.domElement.style.display = 'none';
	      _this.backgroundElement.style.display = 'none';
	
	      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
	      dom.unbind(_this.domElement, 'transitionend', hide);
	      dom.unbind(_this.domElement, 'oTransitionEnd', hide);
	
	    };
	
	    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
	    dom.bind(this.domElement, 'transitionend', hide);
	    dom.bind(this.domElement, 'oTransitionEnd', hide);
	
	    this.backgroundElement.style.opacity = 0;
	//    this.domElement.style.top = '48%';
	    this.domElement.style.opacity = 0;
	    this.domElement.style.webkitTransform = 'scale(1.1)';
	
	  };
	
	  CenteredDiv.prototype.layout = function() {
	    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
	    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
	  };
	  
	  function lockScroll(e) {
	    console.log(e);
	  }
	
	  return CenteredDiv;
	
	})(dat.dom.dom,
	dat.utils.common),
	dat.dom.dom,
	dat.utils.common);

/***/ },
/* 198 */
/*!***************************************!*\
  !*** ./~/dat-gui/vendor/dat.color.js ***!
  \***************************************/
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	
	/** @namespace */
	var dat = module.exports = dat || {};
	
	/** @namespace */
	dat.color = dat.color || {};
	
	/** @namespace */
	dat.utils = dat.utils || {};
	
	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;
	
	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */
	
	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {
	
	      
	      if (ARR_EACH && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {
	
	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },
	
	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();
	
	
	dat.color.toString = (function (common) {
	
	  return function(color) {
	
	    if (color.a == 1 || common.isUndefined(color.a)) {
	
	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }
	
	      return '#' + s;
	
	    } else {
	
	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';
	
	    }
	
	  }
	
	})(dat.utils.common);
	
	
	dat.Color = dat.color.Color = (function (interpret, math, toString, common) {
	
	  var Color = function() {
	
	    this.__state = interpret.apply(this, arguments);
	
	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }
	
	    this.__state.a = this.__state.a || 1;
	
	
	  };
	
	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];
	
	  common.extend(Color.prototype, {
	
	    toString: function() {
	      return toString(this);
	    },
	
	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }
	
	  });
	
	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);
	
	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');
	
	  Object.defineProperty(Color.prototype, 'a', {
	
	    get: function() {
	      return this.__state.a;
	    },
	
	    set: function(v) {
	      this.__state.a = v;
	    }
	
	  });
	
	  Object.defineProperty(Color.prototype, 'hex', {
	
	    get: function() {
	
	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }
	
	      return this.__state.hex;
	
	    },
	
	    set: function(v) {
	
	      this.__state.space = 'HEX';
	      this.__state.hex = v;
	
	    }
	
	  });
	
	  function defineRGBComponent(target, component, componentHexIndex) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }
	
	        recalculateRGB(this, component, componentHexIndex);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function defineHSVComponent(target, component) {
	
	    Object.defineProperty(target, component, {
	
	      get: function() {
	
	        if (this.__state.space === 'HSV')
	          return this.__state[component];
	
	        recalculateHSV(this);
	
	        return this.__state[component];
	
	      },
	
	      set: function(v) {
	
	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }
	
	        this.__state[component] = v;
	
	      }
	
	    });
	
	  }
	
	  function recalculateRGB(color, component, componentHexIndex) {
	
	    if (color.__state.space === 'HEX') {
	
	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);
	
	    } else if (color.__state.space === 'HSV') {
	
	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
	
	    } else {
	
	      throw 'Corrupted color state';
	
	    }
	
	  }
	
	  function recalculateHSV(color) {
	
	    var result = math.rgb_to_hsv(color.r, color.g, color.b);
	
	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );
	
	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }
	
	  }
	
	  return Color;
	
	})(dat.color.interpret = (function (toString, common) {
	
	  var result, toReturn;
	
	  var interpret = function() {
	
	    toReturn = false;
	
	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];
	
	    common.each(INTERPRETATIONS, function(family) {
	
	      if (family.litmus(original)) {
	
	        common.each(family.conversions, function(conversion, conversionName) {
	
	          result = conversion.read(original);
	
	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;
	
	          }
	
	        });
	
	        return common.BREAK;
	
	      }
	
	    });
	
	    return toReturn;
	
	  };
	
	  var INTERPRETATIONS = [
	
	    // Strings
	    {
	
	      litmus: common.isString,
	
	      conversions: {
	
	        THREE_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        SIX_CHAR_HEX: {
	
	          read: function(original) {
	
	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;
	
	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGB: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };
	
	          },
	
	          write: toString
	
	        },
	
	        CSS_RGBA: {
	
	          read: function(original) {
	
	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;
	
	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };
	
	          },
	
	          write: toString
	
	        }
	
	      }
	
	    },
	
	    // Numbers
	    {
	
	      litmus: common.isNumber,
	
	      conversions: {
	
	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },
	
	          write: function(color) {
	            return color.hex;
	          }
	        }
	
	      }
	
	    },
	
	    // Arrays
	    {
	
	      litmus: common.isArray,
	
	      conversions: {
	
	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }
	
	        },
	
	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },
	
	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }
	
	        }
	
	      }
	
	    },
	
	    // Objects
	    {
	
	      litmus: common.isObject,
	
	      conversions: {
	
	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },
	
	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },
	
	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },
	
	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },
	
	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }
	
	        }
	
	      }
	
	    }
	
	
	  ];
	
	  return interpret;
	
	
	})(dat.color.toString,
	dat.utils.common),
	dat.color.math = (function () {
	
	  var tmpComponent;
	
	  return {
	
	    hsv_to_rgb: function(h, s, v) {
	
	      var hi = Math.floor(h / 60) % 6;
	
	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];
	
	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };
	
	    },
	
	    rgb_to_hsv: function(r, g, b) {
	
	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;
	
	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }
	
	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }
	
	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },
	
	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },
	
	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },
	
	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }
	
	  }
	
	})(),
	dat.color.toString,
	dat.utils.common);

/***/ },
/* 199 */
/*!**************************************!*\
  !*** ./web_modules/OrbitControls.js ***!
  \**************************************/
/***/ function(module, exports) {

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	/*global THREE, console */
	
	( function () {
	
		function OrbitConstraint ( object ) {
	
			this.object = object;
	
			// "target" sets the location of focus, where the object orbits around
			// and where it pans with respect to.
			this.target = new THREE.Vector3();
	
			// Limits to how far you can dolly in and out ( PerspectiveCamera only )
			this.minDistance = 0;
			this.maxDistance = Infinity;
	
			// Limits to how far you can zoom in and out ( OrthographicCamera only )
			this.minZoom = 0;
			this.maxZoom = Infinity;
	
			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			this.minPolarAngle = 0; // radians
			this.maxPolarAngle = Math.PI; // radians
	
			// How far you can orbit horizontally, upper and lower limits.
			// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
			this.minAzimuthAngle = - Infinity; // radians
			this.maxAzimuthAngle = Infinity; // radians
	
			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			this.enableDamping = false;
			this.dampingFactor = 0.25;
	
			////////////
			// internals
	
			var scope = this;
	
			var EPS = 0.000001;
	
			// Current position in spherical coordinate system.
			var theta;
			var phi;
	
			// Pending changes
			var phiDelta = 0;
			var thetaDelta = 0;
			var scale = 1;
			var panOffset = new THREE.Vector3();
			var zoomChanged = false;
	
			// API
	
			this.getPolarAngle = function () {
	
				return phi;
	
			};
	
			this.getAzimuthalAngle = function () {
	
				return theta;
	
			};
	
			this.rotateLeft = function ( angle ) {
	
				thetaDelta -= angle;
	
			};
	
			this.rotateUp = function ( angle ) {
	
				phiDelta -= angle;
	
			};
	
			// pass in distance in world space to move left
			this.panLeft = function() {
	
				var v = new THREE.Vector3();
	
				return function panLeft ( distance ) {
	
					var te = this.object.matrix.elements;
	
					// get X column of matrix
					v.set( te[ 0 ], te[ 1 ], te[ 2 ] );
					v.multiplyScalar( - distance );
	
					panOffset.add( v );
	
				};
	
			}();
	
			// pass in distance in world space to move up
			this.panUp = function() {
	
				var v = new THREE.Vector3();
	
				return function panUp ( distance ) {
	
					var te = this.object.matrix.elements;
	
					// get Y column of matrix
					v.set( te[ 4 ], te[ 5 ], te[ 6 ] );
					v.multiplyScalar( distance );
	
					panOffset.add( v );
	
				};
	
			}();
	
			// pass in x,y of change desired in pixel space,
			// right and down are positive
			this.pan = function ( deltaX, deltaY, screenWidth, screenHeight ) {
	
				if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					// perspective
					var position = scope.object.position;
					var offset = position.clone().sub( scope.target );
					var targetDistance = offset.length();
	
					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );
	
					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					scope.panLeft( 2 * deltaX * targetDistance / screenHeight );
					scope.panUp( 2 * deltaY * targetDistance / screenHeight );
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					// orthographic
					scope.panLeft( deltaX * ( scope.object.right - scope.object.left ) / screenWidth );
					scope.panUp( deltaY * ( scope.object.top - scope.object.bottom ) / screenHeight );
	
				} else {
	
					// camera neither orthographic or perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
	
				}
	
			};
	
			this.dollyIn = function ( dollyScale ) {
	
				if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					scale /= dollyScale;
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;
	
				} else {
	
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	
				}
	
			};
	
			this.dollyOut = function ( dollyScale ) {
	
				if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					scale *= dollyScale;
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;
	
				} else {
	
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	
				}
	
			};
	
			this.update = function() {
	
				var offset = new THREE.Vector3();
	
				// so camera.up is the orbit axis
				var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
				var quatInverse = quat.clone().inverse();
	
				var lastPosition = new THREE.Vector3();
				var lastQuaternion = new THREE.Quaternion();
	
				return function () {
	
					var position = this.object.position;
	
					offset.copy( position ).sub( this.target );
	
					// rotate offset to "y-axis-is-up" space
					offset.applyQuaternion( quat );
	
					// angle from z-axis around y-axis
	
					theta = Math.atan2( offset.x, offset.z );
	
					// angle from y-axis
	
					phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );
	
					theta += thetaDelta;
					phi += phiDelta;
	
					// restrict theta to be between desired limits
					theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );
	
					// restrict phi to be between desired limits
					phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );
	
					// restrict phi to be betwee EPS and PI-EPS
					phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );
	
					var radius = offset.length() * scale;
	
					// restrict radius to be between desired limits
					radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );
	
					// move target to panned location
					this.target.add( panOffset );
	
					offset.x = radius * Math.sin( phi ) * Math.sin( theta );
					offset.y = radius * Math.cos( phi );
					offset.z = radius * Math.sin( phi ) * Math.cos( theta );
	
					// rotate offset back to "camera-up-vector-is-up" space
					offset.applyQuaternion( quatInverse );
	
					position.copy( this.target ).add( offset );
	
					this.object.lookAt( this.target );
	
					if ( this.enableDamping === true ) {
	
						thetaDelta *= ( 1 - this.dampingFactor );
						phiDelta *= ( 1 - this.dampingFactor );
	
					} else {
	
						thetaDelta = 0;
						phiDelta = 0;
	
					}
	
					scale = 1;
					panOffset.set( 0, 0, 0 );
	
					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8
	
					if ( zoomChanged ||
						 lastPosition.distanceToSquared( this.object.position ) > EPS ||
					    8 * ( 1 - lastQuaternion.dot( this.object.quaternion ) ) > EPS ) {
	
						lastPosition.copy( this.object.position );
						lastQuaternion.copy( this.object.quaternion );
						zoomChanged = false;
	
						return true;
	
					}
	
					return false;
	
				};
	
			}();
	
		};
	
	
		// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
		// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
		// supported.
		//
		//    Orbit - left mouse / touch: one finger move
		//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
		//    Pan - right mouse, or arrow keys / touch: three finter swipe
	
		THREE.OrbitControls = function ( object, domElement ) {
	
			var constraint = new OrbitConstraint( object );
	
			this.domElement = ( domElement !== undefined ) ? domElement : document;
	
			// API
	
			Object.defineProperty( this, 'constraint', {
	
				get: function() {
	
					return constraint;
	
				}
	
			} );
	
			this.getPolarAngle = function () {
	
				return constraint.getPolarAngle();
	
			};
	
			this.getAzimuthalAngle = function () {
	
				return constraint.getAzimuthalAngle();
	
			};
	
			// Set to false to disable this control
			this.enabled = true;
	
			// center is old, deprecated; use "target" instead
			this.center = this.target;
	
			// This option actually enables dollying in and out; left as "zoom" for
			// backwards compatibility.
			// Set to false to disable zooming
			this.enableZoom = true;
			this.zoomSpeed = 1.0;
	
			// Set to false to disable rotating
			this.enableRotate = true;
			this.rotateSpeed = 1.0;
	
			// Set to false to disable panning
			this.enablePan = true;
			this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
	
			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
	
			// Set to false to disable use of the keys
			this.enableKeys = true;
	
			// The four arrow keys
			this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	
			// Mouse buttons
			this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
	
			////////////
			// internals
	
			var scope = this;
	
			var rotateStart = new THREE.Vector2();
			var rotateEnd = new THREE.Vector2();
			var rotateDelta = new THREE.Vector2();
	
			var panStart = new THREE.Vector2();
			var panEnd = new THREE.Vector2();
			var panDelta = new THREE.Vector2();
	
			var dollyStart = new THREE.Vector2();
			var dollyEnd = new THREE.Vector2();
			var dollyDelta = new THREE.Vector2();
	
			var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };
	
			var state = STATE.NONE;
	
			// for reset
	
			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom;
	
			// events
	
			var changeEvent = { type: 'change' };
			var startEvent = { type: 'start' };
			var endEvent = { type: 'end' };
	
			// pass in x,y of change desired in pixel space,
			// right and down are positive
			function pan( deltaX, deltaY ) {
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				constraint.pan( deltaX, deltaY, element.clientWidth, element.clientHeight );
	
			}
	
			this.update = function () {
	
				if ( this.autoRotate && state === STATE.NONE ) {
	
					constraint.rotateLeft( getAutoRotationAngle() );
	
				}
	
				if ( constraint.update() === true ) {
	
					this.dispatchEvent( changeEvent );
	
				}
	
			};
	
			this.reset = function () {
	
				state = STATE.NONE;
	
				this.target.copy( this.target0 );
				this.object.position.copy( this.position0 );
				this.object.zoom = this.zoom0;
	
				this.object.updateProjectionMatrix();
				this.dispatchEvent( changeEvent );
	
				this.update();
	
			};
	
			function getAutoRotationAngle() {
	
				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	
			}
	
			function getZoomScale() {
	
				return Math.pow( 0.95, scope.zoomSpeed );
	
			}
	
			function onMouseDown( event ) {
	
				if ( scope.enabled === false ) return;
	
				event.preventDefault();
	
				if ( event.button === scope.mouseButtons.ORBIT ) {
	
					if ( scope.enableRotate === false ) return;
	
					state = STATE.ROTATE;
	
					rotateStart.set( event.clientX, event.clientY );
	
				} else if ( event.button === scope.mouseButtons.ZOOM ) {
	
					if ( scope.enableZoom === false ) return;
	
					state = STATE.DOLLY;
	
					dollyStart.set( event.clientX, event.clientY );
	
				} else if ( event.button === scope.mouseButtons.PAN ) {
	
					if ( scope.enablePan === false ) return;
	
					state = STATE.PAN;
	
					panStart.set( event.clientX, event.clientY );
	
				}
	
				if ( state !== STATE.NONE ) {
	
					document.addEventListener( 'mousemove', onMouseMove, false );
					document.addEventListener( 'mouseup', onMouseUp, false );
					scope.dispatchEvent( startEvent );
	
				}
	
			}
	
			function onMouseMove( event ) {
	
				if ( scope.enabled === false ) return;
	
				event.preventDefault();
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				if ( state === STATE.ROTATE ) {
	
					if ( scope.enableRotate === false ) return;
	
					rotateEnd.set( event.clientX, event.clientY );
					rotateDelta.subVectors( rotateEnd, rotateStart );
	
					// rotating across whole screen goes 360 degrees around
					constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
	
					// rotating up and down along whole screen attempts to go 360, but limited to 180
					constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
					rotateStart.copy( rotateEnd );
	
				} else if ( state === STATE.DOLLY ) {
	
					if ( scope.enableZoom === false ) return;
	
					dollyEnd.set( event.clientX, event.clientY );
					dollyDelta.subVectors( dollyEnd, dollyStart );
	
					if ( dollyDelta.y > 0 ) {
	
						constraint.dollyIn( getZoomScale() );
	
					} else if ( dollyDelta.y < 0 ) {
	
						constraint.dollyOut( getZoomScale() );
	
					}
	
					dollyStart.copy( dollyEnd );
	
				} else if ( state === STATE.PAN ) {
	
					if ( scope.enablePan === false ) return;
	
					panEnd.set( event.clientX, event.clientY );
					panDelta.subVectors( panEnd, panStart );
	
					pan( panDelta.x, panDelta.y );
	
					panStart.copy( panEnd );
	
				}
	
				if ( state !== STATE.NONE ) scope.update();
	
			}
	
			function onMouseUp( /* event */ ) {
	
				if ( scope.enabled === false ) return;
	
				document.removeEventListener( 'mousemove', onMouseMove, false );
				document.removeEventListener( 'mouseup', onMouseUp, false );
				scope.dispatchEvent( endEvent );
				state = STATE.NONE;
	
			}
	
			function onMouseWheel( event ) {
	
				if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;
	
				event.preventDefault();
				event.stopPropagation();
	
				var delta = 0;
	
				if ( event.wheelDelta !== undefined ) {
	
					// WebKit / Opera / Explorer 9
	
					delta = event.wheelDelta;
	
				} else if ( event.detail !== undefined ) {
	
					// Firefox
	
					delta = - event.detail;
	
				}
	
				if ( delta > 0 ) {
	
					constraint.dollyOut( getZoomScale() );
	
				} else if ( delta < 0 ) {
	
					constraint.dollyIn( getZoomScale() );
	
				}
	
				scope.update();
				scope.dispatchEvent( startEvent );
				scope.dispatchEvent( endEvent );
	
			}
	
			function onKeyDown( event ) {
	
				if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;
	
				switch ( event.keyCode ) {
	
					case scope.keys.UP:
						pan( 0, scope.keyPanSpeed );
						scope.update();
						break;
	
					case scope.keys.BOTTOM:
						pan( 0, - scope.keyPanSpeed );
						scope.update();
						break;
	
					case scope.keys.LEFT:
						pan( scope.keyPanSpeed, 0 );
						scope.update();
						break;
	
					case scope.keys.RIGHT:
						pan( - scope.keyPanSpeed, 0 );
						scope.update();
						break;
	
				}
	
			}
	
			function touchstart( event ) {
	
				if ( scope.enabled === false ) return;
	
				switch ( event.touches.length ) {
	
					case 1:	// one-fingered touch: rotate
	
						if ( scope.enableRotate === false ) return;
	
						state = STATE.TOUCH_ROTATE;
	
						rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						break;
	
					case 2:	// two-fingered touch: dolly
	
						if ( scope.enableZoom === false ) return;
	
						state = STATE.TOUCH_DOLLY;
	
						var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						var distance = Math.sqrt( dx * dx + dy * dy );
						dollyStart.set( 0, distance );
						break;
	
					case 3: // three-fingered touch: pan
	
						if ( scope.enablePan === false ) return;
	
						state = STATE.TOUCH_PAN;
	
						panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						break;
	
					default:
	
						state = STATE.NONE;
	
				}
	
				if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );
	
			}
	
			function touchmove( event ) {
	
				if ( scope.enabled === false ) return;
	
				event.preventDefault();
				event.stopPropagation();
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				switch ( event.touches.length ) {
	
					case 1: // one-fingered touch: rotate
	
						if ( scope.enableRotate === false ) return;
						if ( state !== STATE.TOUCH_ROTATE ) return;
	
						rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						rotateDelta.subVectors( rotateEnd, rotateStart );
	
						// rotating across whole screen goes 360 degrees around
						constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
						// rotating up and down along whole screen attempts to go 360, but limited to 180
						constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
						rotateStart.copy( rotateEnd );
	
						scope.update();
						break;
	
					case 2: // two-fingered touch: dolly
	
						if ( scope.enableZoom === false ) return;
						if ( state !== STATE.TOUCH_DOLLY ) return;
	
						var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						var distance = Math.sqrt( dx * dx + dy * dy );
	
						dollyEnd.set( 0, distance );
						dollyDelta.subVectors( dollyEnd, dollyStart );
	
						if ( dollyDelta.y > 0 ) {
	
							constraint.dollyOut( getZoomScale() );
	
						} else if ( dollyDelta.y < 0 ) {
	
							constraint.dollyIn( getZoomScale() );
	
						}
	
						dollyStart.copy( dollyEnd );
	
						scope.update();
						break;
	
					case 3: // three-fingered touch: pan
	
						if ( scope.enablePan === false ) return;
						if ( state !== STATE.TOUCH_PAN ) return;
	
						panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						panDelta.subVectors( panEnd, panStart );
	
						pan( panDelta.x, panDelta.y );
	
						panStart.copy( panEnd );
	
						scope.update();
						break;
	
					default:
	
						state = STATE.NONE;
	
				}
	
			}
	
			function touchend( /* event */ ) {
	
				if ( scope.enabled === false ) return;
	
				scope.dispatchEvent( endEvent );
				state = STATE.NONE;
	
			}
	
			function contextmenu( event ) {
	
				event.preventDefault();
	
			}
	
			this.dispose = function() {
	
				this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
				this.domElement.removeEventListener( 'mousedown', onMouseDown, false );
				this.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
				this.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox
	
				this.domElement.removeEventListener( 'touchstart', touchstart, false );
				this.domElement.removeEventListener( 'touchend', touchend, false );
				this.domElement.removeEventListener( 'touchmove', touchmove, false );
	
				document.removeEventListener( 'mousemove', onMouseMove, false );
				document.removeEventListener( 'mouseup', onMouseUp, false );
	
				window.removeEventListener( 'keydown', onKeyDown, false );
	
			}
	
			this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	
			this.domElement.addEventListener( 'mousedown', onMouseDown, false );
			this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
			this.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox
	
			this.domElement.addEventListener( 'touchstart', touchstart, false );
			this.domElement.addEventListener( 'touchend', touchend, false );
			this.domElement.addEventListener( 'touchmove', touchmove, false );
	
			window.addEventListener( 'keydown', onKeyDown, false );
	
			// force an update at start
			this.update();
	
		};
	
		THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
		THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
	
		Object.defineProperties( THREE.OrbitControls.prototype, {
	
			object: {
	
				get: function () {
	
					return this.constraint.object;
	
				}
	
			},
	
			target: {
	
				get: function () {
	
					return this.constraint.target;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: target is now immutable. Use target.set() instead.' );
					this.constraint.target.copy( value );
	
				}
	
			},
	
			minDistance : {
	
				get: function () {
	
					return this.constraint.minDistance;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minDistance = value;
	
				}
	
			},
	
			maxDistance : {
	
				get: function () {
	
					return this.constraint.maxDistance;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxDistance = value;
	
				}
	
			},
	
			minZoom : {
	
				get: function () {
	
					return this.constraint.minZoom;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minZoom = value;
	
				}
	
			},
	
			maxZoom : {
	
				get: function () {
	
					return this.constraint.maxZoom;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxZoom = value;
	
				}
	
			},
	
			minPolarAngle : {
	
				get: function () {
	
					return this.constraint.minPolarAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minPolarAngle = value;
	
				}
	
			},
	
			maxPolarAngle : {
	
				get: function () {
	
					return this.constraint.maxPolarAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxPolarAngle = value;
	
				}
	
			},
	
			minAzimuthAngle : {
	
				get: function () {
	
					return this.constraint.minAzimuthAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minAzimuthAngle = value;
	
				}
	
			},
	
			maxAzimuthAngle : {
	
				get: function () {
	
					return this.constraint.maxAzimuthAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxAzimuthAngle = value;
	
				}
	
			},
	
			enableDamping : {
	
				get: function () {
	
					return this.constraint.enableDamping;
	
				},
	
				set: function ( value ) {
	
					this.constraint.enableDamping = value;
	
				}
	
			},
	
			dampingFactor : {
	
				get: function () {
	
					return this.constraint.dampingFactor;
	
				},
	
				set: function ( value ) {
	
					this.constraint.dampingFactor = value;
	
				}
	
			},
	
			// backward compatibility
	
			noZoom: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					return ! this.enableZoom;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					this.enableZoom = ! value;
	
				}
	
			},
	
			noRotate: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					return ! this.enableRotate;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					this.enableRotate = ! value;
	
				}
	
			},
	
			noPan: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					return ! this.enablePan;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					this.enablePan = ! value;
	
				}
	
			},
	
			noKeys: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					return ! this.enableKeys;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					this.enableKeys = ! value;
	
				}
	
			},
	
			staticMoving : {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					return ! this.constraint.enableDamping;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					this.constraint.enableDamping = ! value;
	
				}
	
			},
	
			dynamicDampingFactor : {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					return this.constraint.dampingFactor;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					this.constraint.dampingFactor = value;
	
				}
	
			}
	
		} );
	
	}() );


/***/ },
/* 200 */
/*!*******************************!*\
  !*** ./src/particles-mesh.js ***!
  \*******************************/
/***/ function(module, exports) {

	/* global THREE */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ParticlesMesh = (function (_THREE$Mesh) {
	  _inherits(ParticlesMesh, _THREE$Mesh);
	
	  function ParticlesMesh() {
	    _classCallCheck(this, ParticlesMesh);
	
	    var geometry = new THREE.Geometry();
	    var cube = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
	    var sphere = new THREE.SphereGeometry(0.5);
	
	    var random3d = function random3d(s) {
	      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	      return new THREE.Vector3(s * Math.random() + offset, s * Math.random() + offset, s * Math.random() + offset);
	    };
	    var randomRot3d = function randomRot3d(s) {
	      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	      return new THREE.Euler(s * Math.random() + offset, s * Math.random() + offset, s * Math.random() + offset);
	    };
	
	    var mat = new THREE.Matrix4();
	    var quaternion = new THREE.Quaternion();
	
	    for (var i = 0; i < 50; i++) {
	      var pos = random3d(20, -10);
	      var rot = randomRot3d(2 * Math.PI);
	      var scale = random3d(2.0, 1.0);
	      quaternion.setFromEuler(rot, false);
	      geometry.merge(cube, mat.compose(pos, quaternion, scale));
	
	      pos = random3d(20, -10);
	      rot = randomRot3d(2 * Math.PI);
	      scale = random3d(2.0, 1.0);
	      quaternion.setFromEuler(rot, false);
	      geometry.merge(sphere, mat.compose(pos, quaternion, scale));
	    }
	    _get(Object.getPrototypeOf(ParticlesMesh.prototype), "constructor", this).call(this, geometry, new THREE.MeshPhongMaterial({
	      color: 0xfff5f5
	    }));
	  }
	
	  return ParticlesMesh;
	})(THREE.Mesh);
	
	exports["default"] = ParticlesMesh;
	module.exports = exports["default"];

/***/ },
/* 201 */
/*!***********************!*\
  !*** ./src/body.jade ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(/*! ./~/jade/lib/runtime.js */ 202);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/Users/ibu/Projects/XmasEx2015/experiments/02-SvgToShadow/src/body.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	var self = locals || {};
	jade_debug.unshift(new jade.DebugItem( 0, "/Users/ibu/Projects/XmasEx2015/experiments/02-SvgToShadow/src/body.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/Users/ibu/Projects/XmasEx2015/experiments/02-SvgToShadow/src/body.jade" ));
	buf.push("<div class=\"container\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/Users/ibu/Projects/XmasEx2015/experiments/02-SvgToShadow/src/body.jade" ));
	buf.push("<div id=\"map_canvas\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".container\n  #map_canvas\n");
	}
	}

/***/ },
/* 202 */
/*!*******************************!*\
  !*** ./~/jade/lib/runtime.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(/*! fs */ 203).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 203 */
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 204 */
/*!*********************************!*\
  !*** ./~/stats.js/src/Stats.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	
	var Stats = function () {
	
		var startTime = Date.now(), prevTime = startTime;
		var ms = 0, msMin = Infinity, msMax = 0;
		var fps = 0, fpsMin = Infinity, fpsMax = 0;
		var frames = 0, mode = 0;
	
		var container = document.createElement( 'div' );
		container.id = 'stats';
		container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
		container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';
	
		var fpsDiv = document.createElement( 'div' );
		fpsDiv.id = 'fps';
		fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
		container.appendChild( fpsDiv );
	
		var fpsText = document.createElement( 'div' );
		fpsText.id = 'fpsText';
		fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		fpsText.innerHTML = 'FPS';
		fpsDiv.appendChild( fpsText );
	
		var fpsGraph = document.createElement( 'div' );
		fpsGraph.id = 'fpsGraph';
		fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
		fpsDiv.appendChild( fpsGraph );
	
		while ( fpsGraph.children.length < 74 ) {
	
			var bar = document.createElement( 'span' );
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
			fpsGraph.appendChild( bar );
	
		}
	
		var msDiv = document.createElement( 'div' );
		msDiv.id = 'ms';
		msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
		container.appendChild( msDiv );
	
		var msText = document.createElement( 'div' );
		msText.id = 'msText';
		msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		msText.innerHTML = 'MS';
		msDiv.appendChild( msText );
	
		var msGraph = document.createElement( 'div' );
		msGraph.id = 'msGraph';
		msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
		msDiv.appendChild( msGraph );
	
		while ( msGraph.children.length < 74 ) {
	
			var bar = document.createElement( 'span' );
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
			msGraph.appendChild( bar );
	
		}
	
		var setMode = function ( value ) {
	
			mode = value;
	
			switch ( mode ) {
	
				case 0:
					fpsDiv.style.display = 'block';
					msDiv.style.display = 'none';
					break;
				case 1:
					fpsDiv.style.display = 'none';
					msDiv.style.display = 'block';
					break;
			}
	
		};
	
		var updateGraph = function ( dom, value ) {
	
			var child = dom.appendChild( dom.firstChild );
			child.style.height = value + 'px';
	
		};
	
		return {
	
			REVISION: 12,
	
			domElement: container,
	
			setMode: setMode,
	
			begin: function () {
	
				startTime = Date.now();
	
			},
	
			end: function () {
	
				var time = Date.now();
	
				ms = time - startTime;
				msMin = Math.min( msMin, ms );
				msMax = Math.max( msMax, ms );
	
				msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
				updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );
	
				frames ++;
	
				if ( time > prevTime + 1000 ) {
	
					fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
					fpsMin = Math.min( fpsMin, fps );
					fpsMax = Math.max( fpsMax, fps );
	
					fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
					updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );
	
					prevTime = time;
					frames = 0;
	
				}
	
				return time;
	
			},
	
			update: function () {
	
				startTime = this.end();
	
			}
	
		}
	
	};
	
	if ( true ) {
	
		module.exports = Stats;
	
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBhMDU0NjhlZTAwMDQyMTc5NDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL3BvbHlmaWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9saWIvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9zaGltLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZXhwb3J0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb3JlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmhpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC51aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY3R4LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmEtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmRlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8taW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmFycmF5LW1ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQud2tzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5rZXlvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5nZXQtbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZW51bS1rZXlzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm9iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc2FtZS12YWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNldC1wcm90by5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQub2JqZWN0LXNhcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZWFsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtc2VhbGVkLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLWV4dGVuc2libGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmhhcy1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC50by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXRyaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtaW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pcy1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLW5hbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1zYWZlLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5taW4tc2FmZS1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWZsb2F0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYWNvc2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQubWF0aC1sb2cxcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXNpbmguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmF0YW5oLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jYnJ0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm1hdGgtc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmNvc2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmV4cG0xLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm1hdGgtZXhwbTEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmZyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguaHlwb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmltdWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzEwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cxcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguc2luaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudGFuaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudHJ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZnJvbS1jb2RlLXBvaW50LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJhdy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy50cmltLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnN0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXMtcmVnZXhwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmZhaWxzLWlzLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXJlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5jb3B5LXdpdGhpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1jb3B5LXdpdGhpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmZsYWdzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmZpeC1yZS13a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAucmVwbGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc3BsaXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnN0cmljdC1uZXcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZm9yLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQubWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnRhc2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQucmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWFwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXdlYWsuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLXNldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmNvbnN0cnVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmVudW1lcmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0Lmhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQub3duLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWxlZnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLXBhZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtcmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1sZWZ0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tcmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5yZWdleHAuZXNjYXBlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnJlcGxhY2VyLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm9iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi10by1qc29uLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2pzLmFycmF5LnN0YXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL3dlYi50aW1lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQucGFydGlhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5wYXRoLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtY29yZS9+L3JlZ2VuZXJhdG9yL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnN0eWw/MGYyMyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5zdHlsIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vZGF0LWd1aS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2RhdC1ndWkvdmVuZG9yL2RhdC5ndWkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViX21vZHVsZXMvT3JiaXRDb250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFydGljbGVzLW1lc2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHkuamFkZSIsIndlYnBhY2s6Ly8vLi9+L2phZGUvbGliL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vLi9+L3N0YXRzLmpzL3NyYy9TdGF0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDcENPLDRCQUFxQjs7b0NBQ1YsbUJBQVU7Ozs7bUNBQ1osa0JBQVM7Ozs7cUJBQ2xCLHdCQUFlOztxQkFFZixzQkFBYTs7MENBQ00sMkJBQWtCOzs7O0FBRzVDLFNBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFPLENBQUMsc0JBQWEsQ0FBQyxFQUFFO0FBQ2xELEtBQU0sR0FBRyxHQUFHLElBQUksb0JBQUksR0FBRyxDQUFDLEdBQUcsRUFBRTtBQUM3QixRQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7S0FFVixHQUFHO0FBQ0ksWUFEUCxHQUFHLEdBQ087MkJBRFYsR0FBRzs7QUFFTCxTQUFJLENBQUMsT0FBTyxHQUFH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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFOzs7Ozs7Ozs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTRDLGdCQUFnQixVQUFVLEdBQUc7QUFDekUsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQUssVUFBVTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSyxVQUFVO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0EsMkJBQTBCLFNBQVM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTLFVBQVU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0EsOEJBQTZCLHFEQUFpQzs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTLHNDQUFzQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNKQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBd0IsbUVBQW1FO0FBQzNGLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsZ0I7Ozs7Ozs7OztBQ2hCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckIsMkJBQTBCO0FBQzFCO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCw0Q0FBMkM7QUFDM0M7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNyRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTRCLG1FQUFtRTtBQUMvRixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLHFCOzs7Ozs7Ozs7QUNYRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7OztBQ1JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDO0FBQ3pDLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7Ozs7QUNyQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQyxNQUFNLFNBQVMsT0FBTyxTQUFTO0FBQ3BFLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDbEJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7OztBQ1ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0IsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQztBQUN0QyxJQUFHO0FBQ0gsV0FBVTtBQUNWLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7OztBQ3pCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsU0FBUyxFOzs7Ozs7Ozs7QUNuQnhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7Ozs7QUNURDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDVEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDUEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDVkQ7QUFDQTs7QUFFQSxnQ0FBK0Isc0RBQWlDLEU7Ozs7Ozs7OztBQ0hoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDZkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLFNBQVMsRTs7Ozs7Ozs7O0FDNUJ4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDZEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVELG9FOzs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDVEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7Ozs7QUNSRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7Ozs7QUNORDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7OztBQ05EO0FBQ0E7QUFDQSw4RUFBd0Q7O0FBRXhELCtCQUE4Qiw0QkFBNEIsZ0JBQWdCLEdBQUc7Ozs7Ozs7Ozs7QUNKN0U7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDdEJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxHOzs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7OztBQ1JEO0FBQ0E7O0FBRUEsNEJBQTJCLHNFQUFpRCxFOzs7Ozs7Ozs7QUNINUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7Ozs7QUNWQTtBQUNBOztBQUVBLDRCQUEyQixzRUFBaUQsRTs7Ozs7Ozs7O0FDSDVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7Ozs7O0FDbkJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7O0FDdkJBLDJEOzs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7Ozs7QUNMRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEU7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZCxNQUFLO0FBQ0wsZUFBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyxXQUFXO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsYUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLCtDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2UEE7QUFDQSwwRTs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7O0FBR0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFc7O0FBRUEsY0FBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPOztBQUVQOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7OztBQUdBLGtEOztBQUVBOztBQUVBLFFBQU8sMENBQTBDOztBQUVqRCwwQ0FBeUMsU0FBUztBQUNsRDtBQUNBOztBQUVBLFFBQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBQzs7O0FBR0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFNBQVM7QUFDNUI7QUFDQSxzQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFNBQVM7QUFDNUI7QUFDQSxzQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsT0FBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBLHNCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQSxFQUFDOzs7QUFHRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUM7OztBQUdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUM7QUFDRDtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9CLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQjtBQUNBLHNCQUFxQixpQ0FBaUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCO0FBQ0Esc0JBQXFCLGlDQUFpQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsaUNBQWlDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7QUFDRDs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBQztBQUNEO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxRUFBb0UsaUNBQWlDOztBQUVyRzs7QUFFQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxXQUFVLGlEQUFpRCxnQkFBZ0IsdUJBQXVCLDJCQUEyQixxQkFBcUIscUJBQXFCLEdBQUcsZ0JBQWdCLHlCQUF5QiwyQkFBMkIsZ0JBQWdCLHdCQUF3Qix5QkFBeUIsK0JBQStCLEdBQUcsc0JBQXNCLDBCQUEwQix1QkFBdUIsMkJBQTJCLDRCQUE0QixnQkFBZ0IsaUJBQWlCLHVCQUF1QixxQkFBcUIsa0JBQWtCLGlCQUFpQixHQUFHOzs7QUFHbGtCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBLDRDO0FBQ0EsWUFBVztBQUNYO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOztBQUVBLEVBQUM7QUFDRDtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBLEVBQUM7OztBQUdEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQSxvREFBbUQsRUFBRTtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFXOztBQUVYOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBVzs7QUFFWDs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBVzs7QUFFWDs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTs7QUFFQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUdBLEVBQUM7QUFDRDs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEI7QUFDQSxjQUFhLFFBQVE7QUFDckIsY0FBYSxZQUFZO0FBQ3pCLGNBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDs7QUFFQTtBQUNBOztBQUVBLE1BQUs7O0FBRUwsc0JBQXFCOztBQUVyQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0EsUUFBTzs7O0FBR1A7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBLDRDQUEyQyxtQkFBbUI7QUFDOUQsNERBQTJELGtCQUFrQixFQUFFO0FBQy9FLHNEQUFxRCxtQkFBbUI7QUFDeEUsdURBQXNELG1CQUFtQjtBQUN6RTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWCxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxzQkFBcUIsWUFBWTtBQUNqQyxxQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXdDOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixVQUFVO0FBQzdCLHFCQUFvQixNQUFNO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQSxzQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBLHNCQUFxQixPQUFPO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7OztBQUdBLFVBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLFlBQVcsd0VBQXdFOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTs7QUFFZjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQSw2QkFBNEI7QUFDNUIsUUFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsOEJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVAsTUFBSztBQUNMO0FBQ0E7O0FBRUE7OztBQUdBLDBCQUF5QixvQ0FBb0M7QUFDN0Q7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXVCLG9DQUFvQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQSxFQUFDO0FBQ0Q7QUFDQSxTQUFRLGdCQUFnQixTQUFTLFVBQVUsV0FBVyxXQUFXLE9BQU8sZUFBZSxNQUFNLE9BQU8sUUFBUSxTQUFTLFVBQVUsbUJBQW1CLGdCQUFnQixTQUFTLHVDQUF1QyxrQ0FB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QUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQTZCO0FBQzdCO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUdBQXdHO0FBQ3hHLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsOEpBQTZKO0FBQzdKLDJKQUEwSjtBQUMxSixzSkFBcUo7QUFDckosdUpBQXNKO0FBQ3RKLG1KQUFrSjtBQUNsSjs7O0FBR0E7O0FBRUEsRUFBQztBQUNEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBQztBQUNEOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7OztBQUdMOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBQztBQUNEO0FBQ0E7QUFDQSxtQjs7Ozs7Ozs7O0FDM2tIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFc7O0FBRUEsY0FBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTzs7QUFFUDs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPOztBQUVQOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7OztBQUdBLGtEOztBQUVBOztBQUVBLFFBQU8sMENBQTBDOztBQUVqRCwwQ0FBeUMsU0FBUztBQUNsRDtBQUNBOztBQUVBLFFBQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBQzs7O0FBR0Q7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFDOzs7QUFHRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxRQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxRQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQSxNQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFXOztBQUVYOztBQUVBLFVBQVM7O0FBRVQ7O0FBRUE7O0FBRUEsb0RBQW1ELEVBQUU7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBVzs7QUFFWDs7QUFFQSxVQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUEsVUFBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7O0FBRVg7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBOzs7QUFHQSxFQUFDO0FBQ0Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7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OztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUk7O0FBRUo7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsT0FBTTs7QUFFTjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0ZBQXFGOztBQUVyRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0ZBQWlGOztBQUVqRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEtBQUk7O0FBRUo7O0FBRUE7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEtBQUk7O0FBRUo7O0FBRUE7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLEtBQUk7O0FBRUo7O0FBRUE7O0FBRUE7O0FB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QUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjMGEwNTQ2OGVlMDAwNDIxNzk0OFxuICoqLyIsIi8qIGdsb2JhbCBUSFJFRSAqL1xuXG5pbXBvcnQgJ2JhYmVsLWNvcmUvcG9seWZpbGwnXG5pbXBvcnQgU3RhdHMgZnJvbSAnc3RhdHMuanMnXG5pbXBvcnQgZGF0IGZyb20gJ2RhdC1ndWknXG5pbXBvcnQgJ09yYml0Q29udHJvbHMnXG5cbmltcG9ydCAnLi9tYWluLnN0eWwnXG5pbXBvcnQgUGFydGljbGVzTWVzaCBmcm9tICcuL3BhcnRpY2xlcy1tZXNoJ1xuXG5cbmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gcmVxdWlyZSgnLi9ib2R5LmphZGUnKSgpXG5jb25zdCBndWkgPSBuZXcgZGF0Lmd1aS5HVUkoKVxuY29uc29sZS5sb2coZ3VpKVxuXG5jbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFuaW1hdGUgPSB0aGlzLmFuaW1hdGUuYmluZCh0aGlzKVxuICAgIHRoaXMuaW5pdFNjZW5lKClcbiAgICB0aGlzLmluaXRPYmplY3RzKClcbiAgICB0aGlzLmluaXREZWJ1ZygpXG4gICAgdGhpcy5hbmltYXRlKClcbiAgfVxuXG4gIGluaXRTY2VuZSgpIHtcbiAgICBjb25zdCBGQVIgPSA4MDBcblxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgRkFSKVxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAxNTAsIDMwKVxuXG4gICAgLy8gU0NFTkVcbiAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICB0aGlzLnNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coMHhlYmY1ZmYsIDEwMCwgRkFSKVxuXG4gICAgLy8gTElHSFRTXG4gICAgbGV0IGFtYmllbnQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDQ0NDQ0KVxuICAgIHRoaXMuc2NlbmUuYWRkKGFtYmllbnQpXG5cbiAgICBsZXQgbGlnaHQgPSBuZXcgVEhSRUUuU3BvdExpZ2h0KDB4ZmZmZmZmLCAxLCAwLCBNYXRoLlBJICogMC40LCAxKVxuICAgIGxpZ2h0LnBvc2l0aW9uLnNldCgwLCA0MCwgODApXG4gICAgbGlnaHQudGFyZ2V0LnBvc2l0aW9uLnNldCgwLCAwLCAwKVxuXG4gICAgbGlnaHQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICBsaWdodC5zaGFkb3dDYW1lcmFOZWFyID0gMVxuICAgIGxpZ2h0LnNoYWRvd0NhbWVyYUZhciA9IDI1MFxuICAgIGxpZ2h0LnNoYWRvd0NhbWVyYUZvdiA9IDUwXG5cbiAgICBsaWdodC5zaGFkb3dCaWFzID0gMC4wMDAxXG4gICAgbGlnaHQuc2hhZG93TWFwV2lkdGggPSAyMDQ4XG4gICAgbGlnaHQuc2hhZG93TWFwSGVpZ2h0ID0gMjA0OFxuICAgIHRoaXMuc2NlbmUuYWRkKGxpZ2h0KVxuICAgIHRoaXMubGlnaHQgPSBsaWdodFxuXG4gICAgLy8gUkVOREVSRVJcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgfSlcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IodGhpcy5zY2VuZS5mb2cuY29sb3IpXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIHRoaXMucmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2VcblxuICAgIC8vXG4gICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU2hhZG93TWFwXG5cbiAgICAvL1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGluaXRPYmplY3RzKCkge1xuICAgIC8vIEdST1VORFxuICAgIGxldCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEwMCwgMTAwKVxuICAgIGxldCBwbGFuZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZjVmNVxuICAgIH0pXG4gICAgbGV0IGdyb3VuZCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBwbGFuZU1hdGVyaWFsKVxuICAgIGdyb3VuZC5wb3NpdGlvbi5zZXQoMCwgMCwgMClcbiAgICBncm91bmQucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMlxuICAgIGdyb3VuZC5zY2FsZS5zZXQoMTAsIDEwLCAxMClcbiAgICBncm91bmQuY2FzdFNoYWRvdyA9IGZhbHNlXG4gICAgZ3JvdW5kLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgdGhpcy5zY2VuZS5hZGQoZ3JvdW5kKVxuXG4gICAgbGV0IG1lc2ggPSBuZXcgUGFydGljbGVzTWVzaCgpXG4gICAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgMTUsIDMwKVxuICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgdGhpcy5zY2VuZS5hZGQobWVzaClcbiAgfVxuXG4gIGluaXREZWJ1ZygpIHtcbiAgICB0aGlzLnNjZW5lLmFkZChuZXcgVEhSRUUuQ2FtZXJhSGVscGVyKHRoaXMubGlnaHQuc2hhZG93LmNhbWVyYSkpXG5cbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKClcbiAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzLmRvbUVsZW1lbnQpXG5cbiAgfVxuXG4gIGFuaW1hdGUodCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUpXG4gICAgdGhpcy5jb250cm9scy51cGRhdGUodClcbiAgICB0aGlzLnJlbmRlcmVyLmNsZWFyKClcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSlcblxuICAgIHRoaXMuc3RhdHMudXBkYXRlKClcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cblxuXG59XG5cbm5ldyBBcHAoKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFpbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL3BvbHlmaWxsXCIpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9wb2x5ZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5yZXF1aXJlKFwiY29yZS1qcy9zaGltXCIpO1xuXG5yZXF1aXJlKFwicmVnZW5lcmF0b3IvcnVudGltZVwiKTtcblxuaWYgKGdsb2JhbC5fYmFiZWxQb2x5ZmlsbCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IG9uZSBpbnN0YW5jZSBvZiBiYWJlbC9wb2x5ZmlsbCBpcyBhbGxvd2VkXCIpO1xufVxuZ2xvYmFsLl9iYWJlbFBvbHlmaWxsID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL2xpYi9wb2x5ZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vbW9kdWxlcy9lczUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3Quc2VhbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QucHJldmVudC1leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzLXNlYWxlZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZXh0ZW5zaWJsZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3RvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIubWluLXNhZmUtaW50ZWdlcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmFjb3NoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguYXNpbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5hdGFuaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmNicnQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5jbHozMicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmNvc2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5leHBtMScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmZyb3VuZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmh5cG90Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguaW11bCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzEwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgubG9nMXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC5sb2cyJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGguc2lnbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXRoLnNpbmgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWF0aC50YW5oJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgudHJ1bmMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmZyb20tY29kZS1wb2ludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmF3Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy50cmltJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lm9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmlsbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQtaW5kZXgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLmNvbnN0cnVjdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZ2V4cC5mbGFncycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2gnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwLnNlYXJjaCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWdleHAuc3BsaXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstbWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LndlYWstc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuYXBwbHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHknKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuaGFzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QuaXMtZXh0ZW5zaWJsZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0Lm93bi1rZXlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3QucHJldmVudC1leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcuYXQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1sZWZ0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtcmlnaHQnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1yaWdodCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWdleHAuZXNjYXBlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczcuc2V0LnRvLWpzb24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9qcy5hcnJheS5zdGF0aWNzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLnRpbWVycycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi5pbW1lZGlhdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbW9kdWxlcy8kLmNvcmUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9zaGltLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIERFU0NSSVBUT1JTICAgICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCBjcmVhdGVEZXNjICAgICAgICA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBodG1sICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kb20tY3JlYXRlJylcbiAgLCBoYXMgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIGNvZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgaW52b2tlICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBmYWlscyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgYW5PYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBpc09iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIHRvT2JqZWN0ICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgdG9JbnRlZ2VyICAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgdG9JbmRleCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgSU9iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ19fcHJvdG9fXycpXG4gICwgY3JlYXRlQXJyYXlNZXRob2QgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXG4gICwgYXJyYXlJbmRleE9mICAgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBPYmplY3RQcm90byAgICAgICA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBBcnJheVByb3RvICAgICAgICA9IEFycmF5LnByb3RvdHlwZVxuICAsIGFycmF5U2xpY2UgICAgICAgID0gQXJyYXlQcm90by5zbGljZVxuICAsIGFycmF5Sm9pbiAgICAgICAgID0gQXJyYXlQcm90by5qb2luXG4gICwgZGVmaW5lUHJvcGVydHkgICAgPSAkLnNldERlc2NcbiAgLCBnZXRPd25EZXNjcmlwdG9yICA9ICQuZ2V0RGVzY1xuICAsIGRlZmluZVByb3BlcnRpZXMgID0gJC5zZXREZXNjc1xuICAsIGZhY3RvcmllcyAgICAgICAgID0ge31cbiAgLCBJRThfRE9NX0RFRklORTtcblxuaWYoIURFU0NSSVBUT1JTKXtcbiAgSUU4X0RPTV9ERUZJTkUgPSAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoY2VsKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbiAgfSk7XG4gICQuc2V0RGVzYyA9IGZ1bmN0aW9uKE8sIFAsIEF0dHJpYnV0ZXMpe1xuICAgIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gICAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICAgIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICAgIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylhbk9iamVjdChPKVtQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gICAgcmV0dXJuIE87XG4gIH07XG4gICQuZ2V0RGVzYyA9IGZ1bmN0aW9uKE8sIFApe1xuICAgIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgICByZXR1cm4gZ2V0T3duRGVzY3JpcHRvcihPLCBQKTtcbiAgICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFPYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKE8sIFApLCBPW1BdKTtcbiAgfTtcbiAgJC5zZXREZXNjcyA9IGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbihPLCBQcm9wZXJ0aWVzKXtcbiAgICBhbk9iamVjdChPKTtcbiAgICB2YXIga2V5cyAgID0gJC5nZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgPSAwXG4gICAgICAsIFA7XG4gICAgd2hpbGUobGVuZ3RoID4gaSkkLnNldERlc2MoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gICAgcmV0dXJuIE87XG4gIH07XG59XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFERVNDUklQVE9SUywgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjYgLyAxNS4yLjMuMyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJC5nZXREZXNjLFxuICAvLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJC5zZXREZXNjLFxuICAvLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXNcbn0pO1xuXG4gIC8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbnZhciBrZXlzMSA9ICgnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSwnICtcbiAgICAgICAgICAgICd0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJykuc3BsaXQoJywnKVxuICAvLyBBZGRpdGlvbmFsIGtleXMgZm9yIGdldE93blByb3BlcnR5TmFtZXNcbiAgLCBrZXlzMiA9IGtleXMxLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpXG4gICwga2V5c0xlbjEgPSBrZXlzMS5sZW5ndGg7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBjZWwoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBrZXlzTGVuMVxuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3QucHJvdG90eXBlW2tleXMxW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG52YXIgY3JlYXRlR2V0S2V5cyA9IGZ1bmN0aW9uKG5hbWVzLCBsZW5ndGgpe1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAgIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uKCl7fTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxuICBnZXRQcm90b3R5cGVPZjogJC5nZXRQcm90byA9ICQuZ2V0UHJvdG8gfHwgZnVuY3Rpb24oTyl7XG4gICAgTyA9IHRvT2JqZWN0KE8pO1xuICAgIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICAgIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG4gIH0sXG4gIC8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJC5nZXROYW1lcyA9ICQuZ2V0TmFtZXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMiwga2V5czIubGVuZ3RoLCB0cnVlKSxcbiAgLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJC5jcmVhdGUgPSAkLmNyZWF0ZSB8fCBmdW5jdGlvbihPLCAvKj8qL1Byb3BlcnRpZXMpe1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYoTyAhPT0gbnVsbCl7XG4gICAgICBFbXB0eS5wcm90b3R5cGUgPSBhbk9iamVjdChPKTtcbiAgICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2Ygc2hpbVxuICAgICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gICAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xuICB9LFxuICAvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbiAga2V5czogJC5nZXRLZXlzID0gJC5nZXRLZXlzIHx8IGNyZWF0ZUdldEtleXMoa2V5czEsIGtleXNMZW4xLCBmYWxzZSlcbn0pO1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24oRiwgbGVuLCBhcmdzKXtcbiAgaWYoIShsZW4gaW4gZmFjdG9yaWVzKSl7XG4gICAgZm9yKHZhciBuID0gW10sIGkgPSAwOyBpIDwgbGVuOyBpKyspbltpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIGZhY3Rvcmllc1tsZW5dID0gRnVuY3Rpb24oJ0YsYScsICdyZXR1cm4gbmV3IEYoJyArIG4uam9pbignLCcpICsgJyknKTtcbiAgfVxuICByZXR1cm4gZmFjdG9yaWVzW2xlbl0oRiwgYXJncyk7XG59O1xuXG4vLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0Z1bmN0aW9uJywge1xuICBiaW5kOiBmdW5jdGlvbiBiaW5kKHRoYXQgLyosIGFyZ3MuLi4gKi8pe1xuICAgIHZhciBmbiAgICAgICA9IGFGdW5jdGlvbih0aGlzKVxuICAgICAgLCBwYXJ0QXJncyA9IGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKC8qIGFyZ3MuLi4gKi8pe1xuICAgICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBib3VuZCA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgICB9O1xuICAgIGlmKGlzT2JqZWN0KGZuLnByb3RvdHlwZSkpYm91bmQucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICAgIHJldHVybiBib3VuZDtcbiAgfVxufSk7XG5cbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXtcbiAgaWYoaHRtbClhcnJheVNsaWNlLmNhbGwoaHRtbCk7XG59KSwgJ0FycmF5Jywge1xuICBzbGljZTogZnVuY3Rpb24oYmVnaW4sIGVuZCl7XG4gICAgdmFyIGxlbiAgID0gdG9MZW5ndGgodGhpcy5sZW5ndGgpXG4gICAgICAsIGtsYXNzID0gY29mKHRoaXMpO1xuICAgIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogZW5kO1xuICAgIGlmKGtsYXNzID09ICdBcnJheScpcmV0dXJuIGFycmF5U2xpY2UuY2FsbCh0aGlzLCBiZWdpbiwgZW5kKTtcbiAgICB2YXIgc3RhcnQgID0gdG9JbmRleChiZWdpbiwgbGVuKVxuICAgICAgLCB1cFRvICAgPSB0b0luZGV4KGVuZCwgbGVuKVxuICAgICAgLCBzaXplICAgPSB0b0xlbmd0aCh1cFRvIC0gc3RhcnQpXG4gICAgICAsIGNsb25lZCA9IEFycmF5KHNpemUpXG4gICAgICAsIGkgICAgICA9IDA7XG4gICAgZm9yKDsgaSA8IHNpemU7IGkrKyljbG9uZWRbaV0gPSBrbGFzcyA9PSAnU3RyaW5nJ1xuICAgICAgPyB0aGlzLmNoYXJBdChzdGFydCArIGkpXG4gICAgICA6IHRoaXNbc3RhcnQgKyBpXTtcbiAgICByZXR1cm4gY2xvbmVkO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKElPYmplY3QgIT0gT2JqZWN0KSwgJ0FycmF5Jywge1xuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcil7XG4gICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKElPYmplY3QodGhpcyksIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkID8gJywnIDogc2VwYXJhdG9yKTtcbiAgfVxufSk7XG5cbi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXG4kZXhwb3J0KCRleHBvcnQuUywgJ0FycmF5Jywge2lzQXJyYXk6IHJlcXVpcmUoJy4vJC5pcy1hcnJheScpfSk7XG5cbnZhciBjcmVhdGVBcnJheVJlZHVjZSA9IGZ1bmN0aW9uKGlzUmlnaHQpe1xuICByZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tmbiwgbWVtbyl7XG4gICAgYUZ1bmN0aW9uKGNhbGxiYWNrZm4pO1xuICAgIHZhciBPICAgICAgPSBJT2JqZWN0KHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSBpc1JpZ2h0ID8gbGVuZ3RoIC0gMSA6IDBcbiAgICAgICwgaSAgICAgID0gaXNSaWdodCA/IC0xIDogMTtcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoIDwgMilmb3IoOzspe1xuICAgICAgaWYoaW5kZXggaW4gTyl7XG4gICAgICAgIG1lbW8gPSBPW2luZGV4XTtcbiAgICAgICAgaW5kZXggKz0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpbmRleCArPSBpO1xuICAgICAgaWYoaXNSaWdodCA/IGluZGV4IDwgMCA6IGxlbmd0aCA8PSBpbmRleCl7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IoO2lzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpaWYoaW5kZXggaW4gTyl7XG4gICAgICBtZW1vID0gY2FsbGJhY2tmbihtZW1vLCBPW2luZGV4XSwgaW5kZXgsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn07XG5cbnZhciBtZXRob2RpemUgPSBmdW5jdGlvbigkZm4pe1xuICByZXR1cm4gZnVuY3Rpb24oYXJnMS8qLCBhcmcyID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZuKHRoaXMsIGFyZzEsIGFyZ3VtZW50c1sxXSk7XG4gIH07XG59O1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTAgLyAxNS40LjQuMTggQXJyYXkucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZm9yRWFjaDogJC5lYWNoID0gJC5lYWNoIHx8IG1ldGhvZGl6ZShjcmVhdGVBcnJheU1ldGhvZCgwKSksXG4gIC8vIDIyLjEuMy4xNSAvIDE1LjQuNC4xOSBBcnJheS5wcm90b3R5cGUubWFwKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIG1hcDogbWV0aG9kaXplKGNyZWF0ZUFycmF5TWV0aG9kKDEpKSxcbiAgLy8gMjIuMS4zLjcgLyAxNS40LjQuMjAgQXJyYXkucHJvdG90eXBlLmZpbHRlcihjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBmaWx0ZXI6IG1ldGhvZGl6ZShjcmVhdGVBcnJheU1ldGhvZCgyKSksXG4gIC8vIDIyLjEuMy4yMyAvIDE1LjQuNC4xNyBBcnJheS5wcm90b3R5cGUuc29tZShjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBzb21lOiBtZXRob2RpemUoY3JlYXRlQXJyYXlNZXRob2QoMykpLFxuICAvLyAyMi4xLjMuNSAvIDE1LjQuNC4xNiBBcnJheS5wcm90b3R5cGUuZXZlcnkoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZXZlcnk6IG1ldGhvZGl6ZShjcmVhdGVBcnJheU1ldGhvZCg0KSksXG4gIC8vIDIyLjEuMy4xOCAvIDE1LjQuNC4yMSBBcnJheS5wcm90b3R5cGUucmVkdWNlKGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlOiBjcmVhdGVBcnJheVJlZHVjZShmYWxzZSksXG4gIC8vIDIyLjEuMy4xOSAvIDE1LjQuNC4yMiBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHQoY2FsbGJhY2tmbiBbLCBpbml0aWFsVmFsdWVdKVxuICByZWR1Y2VSaWdodDogY3JlYXRlQXJyYXlSZWR1Y2UodHJ1ZSksXG4gIC8vIDIyLjEuMy4xMSAvIDE1LjQuNC4xNCBBcnJheS5wcm90b3R5cGUuaW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXG4gIGluZGV4T2Y6IG1ldGhvZGl6ZShhcnJheUluZGV4T2YpLFxuICAvLyAyMi4xLjMuMTQgLyAxNS40LjQuMTUgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uKGVsLCBmcm9tSW5kZXggLyogPSBAWyotMV0gKi8pe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QodGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IGxlbmd0aCAtIDE7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpaW5kZXggPSBNYXRoLm1pbihpbmRleCwgdG9JbnRlZ2VyKGZyb21JbmRleCkpO1xuICAgIGlmKGluZGV4IDwgMClpbmRleCA9IHRvTGVuZ3RoKGxlbmd0aCArIGluZGV4KTtcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIGluZGV4O1xuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG5cbi8vIDIwLjMuMy4xIC8gMTUuOS40LjQgRGF0ZS5ub3coKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdEYXRlJywge25vdzogZnVuY3Rpb24oKXsgcmV0dXJuICtuZXcgRGF0ZTsgfX0pO1xuXG52YXIgbHogPSBmdW5jdGlvbihudW0pe1xuICByZXR1cm4gbnVtID4gOSA/IG51bSA6ICcwJyArIG51bTtcbn07XG5cbi8vIDIwLjMuNC4zNiAvIDE1LjkuNS40MyBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZygpXG4vLyBQaGFudG9tSlMgLyBvbGQgV2ViS2l0IGhhcyBhIGJyb2tlbiBpbXBsZW1lbnRhdGlvbnNcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBuZXcgRGF0ZSgtNWUxMyAtIDEpLnRvSVNPU3RyaW5nKCkgIT0gJzAzODUtMDctMjVUMDc6MDY6MzkuOTk5Wic7XG59KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgbmV3IERhdGUoTmFOKS50b0lTT1N0cmluZygpO1xufSkpLCAnRGF0ZScsIHtcbiAgdG9JU09TdHJpbmc6IGZ1bmN0aW9uIHRvSVNPU3RyaW5nKCl7XG4gICAgaWYoIWlzRmluaXRlKHRoaXMpKXRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgdGltZSB2YWx1ZScpO1xuICAgIHZhciBkID0gdGhpc1xuICAgICAgLCB5ID0gZC5nZXRVVENGdWxsWWVhcigpXG4gICAgICAsIG0gPSBkLmdldFVUQ01pbGxpc2Vjb25kcygpXG4gICAgICAsIHMgPSB5IDwgMCA/ICctJyA6IHkgPiA5OTk5ID8gJysnIDogJyc7XG4gICAgcmV0dXJuIHMgKyAoJzAwMDAwJyArIE1hdGguYWJzKHkpKS5zbGljZShzID8gLTYgOiAtNCkgK1xuICAgICAgJy0nICsgbHooZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgKyBseihkLmdldFVUQ0RhdGUoKSkgK1xuICAgICAgJ1QnICsgbHooZC5nZXRVVENIb3VycygpKSArICc6JyArIGx6KGQuZ2V0VVRDTWludXRlcygpKSArXG4gICAgICAnOicgKyBseihkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAobSA+IDk5ID8gbSA6ICcwJyArIGx6KG0pKSArICdaJztcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczUuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KVxuICAgICwga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmKHRhcmdldCAmJiAhb3duKXJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5leHBvcnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmdsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzEuMi42J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmhpZGUuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5kZXNjcmlwdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZmFpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmdcbi8vIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxudmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBTUkMgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vJC5jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgaWYodHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKXtcbiAgICB2YWwuaGFzT3duUHJvcGVydHkoU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gICAgdmFsLmhhc093blByb3BlcnR5KCduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgfVxuICBpZihPID09PSBnbG9iYWwpe1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBpZighc2FmZSlkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnJlZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC51aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmN0eC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmh0bWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmRvbS1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pcy1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pbnZva2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hbi1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZGVmaW5lZC5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnRvLWlvYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8taW50ZWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQudG8taW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC50by1sZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi8kLmFycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRZUEUpe1xuICB2YXIgSVNfTUFQICAgICAgICA9IFRZUEUgPT0gMVxuICAgICwgSVNfRklMVEVSICAgICA9IFRZUEUgPT0gMlxuICAgICwgSVNfU09NRSAgICAgICA9IFRZUEUgPT0gM1xuICAgICwgSVNfRVZFUlkgICAgICA9IFRZUEUgPT0gNFxuICAgICwgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNlxuICAgICwgTk9fSE9MRVMgICAgICA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQpe1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCgkdGhpcylcbiAgICAgICwgc2VsZiAgID0gSU9iamVjdChPKVxuICAgICAgLCBmICAgICAgPSBjdHgoY2FsbGJhY2tmbiwgdGhhdCwgMylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IDBcbiAgICAgICwgcmVzdWx0ID0gSVNfTUFQID8gYXNjKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gYXNjKCR0aGlzLCAwKSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1tZXRob2RzLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGlzQXJyYXkgID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5JylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCwgbGVuZ3RoKXtcbiAgdmFyIEM7XG4gIGlmKGlzQXJyYXkob3JpZ2luYWwpKXtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZih0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpQyA9IHVuZGVmaW5lZDtcbiAgICBpZihpc09iamVjdChDKSl7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmKEMgPT09IG51bGwpQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGgpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktc3BlY2llcy1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pcy1hcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vJC51aWQnKVxuICAsIFN5bWJvbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5TeW1ib2w7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBTeW1ib2wgJiYgU3ltYm9sW25hbWVdIHx8IChTeW1ib2wgfHwgdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC53a3MuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuLyQudG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1pbmNsdWRlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQud2tzJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5rZXlvZicpXG4gICwgJG5hbWVzICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIGdldERlc2MgICAgICAgID0gJC5nZXREZXNjXG4gICwgc2V0RGVzYyAgICAgICAgPSAkLnNldERlc2NcbiAgLCBfY3JlYXRlICAgICAgICA9ICQuY3JlYXRlXG4gICwgZ2V0TmFtZXMgICAgICAgPSAkbmFtZXMuZ2V0XG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgc2V0dGVyICAgICAgICAgPSBmYWxzZVxuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBpc0VudW0gICAgICAgICA9ICQuaXNFbnVtXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIHVzZU5hdGl2ZSAgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShzZXREZXNjKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBzZXREZXNjKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgc2V0RGVzYyhpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogc2V0RGVzYztcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSk7XG4gIHN5bS5fayA9IHRhZztcbiAgREVTQ1JJUFRPUlMgJiYgc2V0dGVyICYmIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKXNldERlc2MoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIHNldERlc2MoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSk7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV1cbiAgICA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICB2YXIgRCA9IGdldERlc2MoaXQgPSB0b0lPYmplY3QoaXQpLCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4pcmVzdWx0LnB1c2goa2V5KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICB2YXIgYXJncyA9IFtpdF1cbiAgICAsIGkgICAgPSAxXG4gICAgLCAkJCAgID0gYXJndW1lbnRzXG4gICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICB3aGlsZSgkJC5sZW5ndGggPiBpKWFyZ3MucHVzaCgkJFtpKytdKTtcbiAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICB9O1xuICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbn07XG52YXIgYnVnZ3lKU09OID0gJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pO1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCF1c2VOYXRpdmUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYoaXNTeW1ib2wodGhpcykpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICByZXR1cm4gd3JhcCh1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gIGlzU3ltYm9sID0gZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG4gIH07XG5cbiAgJC5jcmVhdGUgICAgID0gJGNyZWF0ZTtcbiAgJC5pc0VudW0gICAgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICAkLmdldERlc2MgICAgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkLnNldERlc2MgICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gICQuc2V0RGVzY3MgICA9ICRkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gICQuZ2V0U3ltYm9scyA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vJC5saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG59XG5cbnZhciBzeW1ib2xTdGF0aWNzID0ge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIHJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59O1xuLy8gMTkuNC4yLjIgU3ltYm9sLmhhc0luc3RhbmNlXG4vLyAxOS40LjIuMyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlXG4vLyAxOS40LjIuNCBTeW1ib2wuaXRlcmF0b3Jcbi8vIDE5LjQuMi42IFN5bWJvbC5tYXRjaFxuLy8gMTkuNC4yLjggU3ltYm9sLnJlcGxhY2Vcbi8vIDE5LjQuMi45IFN5bWJvbC5zZWFyY2hcbi8vIDE5LjQuMi4xMCBTeW1ib2wuc3BlY2llc1xuLy8gMTkuNC4yLjExIFN5bWJvbC5zcGxpdFxuLy8gMTkuNC4yLjEyIFN5bWJvbC50b1ByaW1pdGl2ZVxuLy8gMTkuNC4yLjEzIFN5bWJvbC50b1N0cmluZ1RhZ1xuLy8gMTkuNC4yLjE0IFN5bWJvbC51bnNjb3BhYmxlc1xuJC5lYWNoLmNhbGwoKFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLCcgK1xuICAnc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgZnVuY3Rpb24oaXQpe1xuICB2YXIgc3ltID0gd2tzKGl0KTtcbiAgc3ltYm9sU3RhdGljc1tpdF0gPSB1c2VOYXRpdmUgPyBzeW0gOiB3cmFwKHN5bSk7XG59KTtcblxuc2V0dGVyID0gdHJ1ZTtcblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTeW1ib2wnLCBzeW1ib2xTdGF0aWNzKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhdXNlTmF0aXZlLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghdXNlTmF0aXZlIHx8IGJ1Z2d5SlNPTiksICdKU09OJywge3N0cmluZ2lmeTogJHN0cmluZ2lmeX0pO1xuXG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi8kJykuc2V0RGVzY1xuICAsIGhhcyA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc2V0LXRvLXN0cmluZy10YWcuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gJC5nZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQua2V5b2YuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCBnZXROYW1lcyAgPSByZXF1aXJlKCcuLyQnKS5nZXROYW1lc1xuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdldE5hbWVzKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XG4gIHJldHVybiBnZXROYW1lcyh0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmdldC1uYW1lcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHM7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9ICQuaXNFbnVtXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpa2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5lbnVtLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQubGlicmFyeS5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi8kLm9iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKTtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBhID0gT2JqZWN0LmFzc2lnblxuICAgICwgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiBhKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKGEoe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsICQkICAgID0gYXJndW1lbnRzXG4gICAgLCAkJGxlbiA9ICQkLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRLZXlzICAgID0gJC5nZXRLZXlzXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzXG4gICAgLCBpc0VudW0gICAgID0gJC5pc0VudW07XG4gIHdoaWxlKCQkbGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KCQkW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH1cbiAgcmV0dXJuIFQ7XG59IDogT2JqZWN0LmFzc2lnbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQub2JqZWN0LWFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjMuMTAgT2JqZWN0LmlzKHZhbHVlMSwgdmFsdWUyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtpczogcmVxdWlyZSgnLi8kLnNhbWUtdmFsdWUnKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjIuOSBTYW1lVmFsdWUoeCwgeSlcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnNhbWUtdmFsdWUuanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXR9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zZXQtcHJvdG8uanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCB0ZXN0ICAgID0ge307XG50ZXN0W3JlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKV0gPSAneic7XG5pZih0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKXtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jbGFzc29mLmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24oJGZyZWV6ZSl7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUoaXQpIDogaXQ7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplLmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm9iamVjdC1zYXAuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjE3IE9iamVjdC5zZWFsKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ3NlYWwnLCBmdW5jdGlvbigkc2VhbCl7XG4gIHJldHVybiBmdW5jdGlvbiBzZWFsKGl0KXtcbiAgICByZXR1cm4gJHNlYWwgJiYgaXNPYmplY3QoaXQpID8gJHNlYWwoaXQpIDogaXQ7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2VhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuMTUgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ3ByZXZlbnRFeHRlbnNpb25zJywgZnVuY3Rpb24oJHByZXZlbnRFeHRlbnNpb25zKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zICYmIGlzT2JqZWN0KGl0KSA/ICRwcmV2ZW50RXh0ZW5zaW9ucyhpdCkgOiBpdDtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5wcmV2ZW50LWV4dGVuc2lvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjEyIE9iamVjdC5pc0Zyb3plbihPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdpc0Zyb3plbicsIGZ1bmN0aW9uKCRpc0Zyb3plbil7XG4gIHJldHVybiBmdW5jdGlvbiBpc0Zyb3plbihpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc0Zyb3plbiA/ICRpc0Zyb3plbihpdCkgOiBmYWxzZSA6IHRydWU7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtZnJvemVuLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMi4xMyBPYmplY3QuaXNTZWFsZWQoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnaXNTZWFsZWQnLCBmdW5jdGlvbigkaXNTZWFsZWQpe1xuICByZXR1cm4gZnVuY3Rpb24gaXNTZWFsZWQoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNTZWFsZWQgPyAkaXNTZWFsZWQoaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLXNlYWxlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuMTEgT2JqZWN0LmlzRXh0ZW5zaWJsZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdpc0V4dGVuc2libGUnLCBmdW5jdGlvbigkaXNFeHRlbnNpYmxlKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc0V4dGVuc2libGUgPyAkaXNFeHRlbnNpYmxlKGl0KSA6IHRydWUgOiBmYWxzZTtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1leHRlbnNpYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbigkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigkZ2V0UHJvdG90eXBlT2Ype1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oJGtleXMpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlOYW1lcycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJykuZ2V0O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNldERlc2MgICAgPSByZXF1aXJlKCcuLyQnKS5zZXREZXNjXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBoYXMgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgRlByb3RvICAgICA9IEZ1bmN0aW9uLnByb3RvdHlwZVxuICAsIG5hbWVSRSAgICAgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS9cbiAgLCBOQU1FICAgICAgID0gJ25hbWUnO1xuLy8gMTkuMi40LjIgbmFtZVxuTkFNRSBpbiBGUHJvdG8gfHwgcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykgJiYgc2V0RGVzYyhGUHJvdG8sIE5BTUUsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIG1hdGNoID0gKCcnICsgdGhpcykubWF0Y2gobmFtZVJFKVxuICAgICAgLCBuYW1lICA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcbiAgICBoYXModGhpcywgTkFNRSkgfHwgc2V0RGVzYyh0aGlzLCBOQU1FLCBjcmVhdGVEZXNjKDUsIG5hbWUpKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgaXNPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIEhBU19JTlNUQU5DRSAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2hhc0luc3RhbmNlJylcbiAgLCBGdW5jdGlvblByb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gMTkuMi4zLjYgRnVuY3Rpb24ucHJvdG90eXBlW0BAaGFzSW5zdGFuY2VdKFYpXG5pZighKEhBU19JTlNUQU5DRSBpbiBGdW5jdGlvblByb3RvKSkkLnNldERlc2MoRnVuY3Rpb25Qcm90bywgSEFTX0lOU1RBTkNFLCB7dmFsdWU6IGZ1bmN0aW9uKE8pe1xuICBpZih0eXBlb2YgdGhpcyAhPSAnZnVuY3Rpb24nIHx8ICFpc09iamVjdChPKSlyZXR1cm4gZmFsc2U7XG4gIGlmKCFpc09iamVjdCh0aGlzLnByb3RvdHlwZSkpcmV0dXJuIE8gaW5zdGFuY2VvZiB0aGlzO1xuICAvLyBmb3IgZW52aXJvbm1lbnQgdy9vIG5hdGl2ZSBgQEBoYXNJbnN0YW5jZWAgbG9naWMgZW5vdWdoIGBpbnN0YW5jZW9mYCwgYnV0IGFkZCB0aGlzOlxuICB3aGlsZShPID0gJC5nZXRQcm90byhPKSlpZih0aGlzLnByb3RvdHlwZSA9PT0gTylyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmhhcy1pbnN0YW5jZS5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGFzICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBjb2YgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi8kLnRvLXByaW1pdGl2ZScpXG4gICwgZmFpbHMgICAgICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKVxuICAsICR0cmltICAgICAgID0gcmVxdWlyZSgnLi8kLnN0cmluZy10cmltJykudHJpbVxuICAsIE5VTUJFUiAgICAgID0gJ051bWJlcidcbiAgLCAkTnVtYmVyICAgICA9IGdsb2JhbFtOVU1CRVJdXG4gICwgQmFzZSAgICAgICAgPSAkTnVtYmVyXG4gICwgcHJvdG8gICAgICAgPSAkTnVtYmVyLnByb3RvdHlwZVxuICAvLyBPcGVyYSB+MTIgaGFzIGJyb2tlbiBPYmplY3QjdG9TdHJpbmdcbiAgLCBCUk9LRU5fQ09GICA9IGNvZigkLmNyZWF0ZShwcm90bykpID09IE5VTUJFUlxuICAsIFRSSU0gICAgICAgID0gJ3RyaW0nIGluIFN0cmluZy5wcm90b3R5cGU7XG5cbi8vIDcuMS4zIFRvTnVtYmVyKGFyZ3VtZW50KVxudmFyIHRvTnVtYmVyID0gZnVuY3Rpb24oYXJndW1lbnQpe1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICBpZih0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgaXQubGVuZ3RoID4gMil7XG4gICAgaXQgPSBUUklNID8gaXQudHJpbSgpIDogJHRyaW0oaXQsIDMpO1xuICAgIHZhciBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMClcbiAgICAgICwgdGhpcmQsIHJhZGl4LCBtYXhDb2RlO1xuICAgIGlmKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpe1xuICAgICAgdGhpcmQgPSBpdC5jaGFyQ29kZUF0KDIpO1xuICAgICAgaWYodGhpcmQgPT09IDg4IHx8IHRoaXJkID09PSAxMjApcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZihmaXJzdCA9PT0gNDgpe1xuICAgICAgc3dpdGNoKGl0LmNoYXJDb2RlQXQoMSkpe1xuICAgICAgICBjYXNlIDY2IDogY2FzZSA5OCAgOiByYWRpeCA9IDI7IG1heENvZGUgPSA0OTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgL14wYlswMV0rJC9pXG4gICAgICAgIGNhc2UgNzkgOiBjYXNlIDExMSA6IHJhZGl4ID0gODsgbWF4Q29kZSA9IDU1OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBvWzAtN10rJC9pXG4gICAgICAgIGRlZmF1bHQgOiByZXR1cm4gK2l0O1xuICAgICAgfVxuICAgICAgZm9yKHZhciBkaWdpdHMgPSBpdC5zbGljZSgyKSwgaSA9IDAsIGwgPSBkaWdpdHMubGVuZ3RoLCBjb2RlOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgY29kZSA9IGRpZ2l0cy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYoY29kZSA8IDQ4IHx8IGNvZGUgPiBtYXhDb2RlKXJldHVybiBOYU47XG4gICAgICB9IHJldHVybiBwYXJzZUludChkaWdpdHMsIHJhZGl4KTtcbiAgICB9XG4gIH0gcmV0dXJuICtpdDtcbn07XG5cbmlmKCEkTnVtYmVyKCcgMG8xJykgfHwgISROdW1iZXIoJzBiMScpIHx8ICROdW1iZXIoJysweDEnKSl7XG4gICROdW1iZXIgPSBmdW5jdGlvbiBOdW1iZXIodmFsdWUpe1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlXG4gICAgICAsIHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiB0aGF0IGluc3RhbmNlb2YgJE51bWJlclxuICAgICAgLy8gY2hlY2sgb24gMS4uY29uc3RydWN0b3IoZm9vKSBjYXNlXG4gICAgICAmJiAoQlJPS0VOX0NPRiA/IGZhaWxzKGZ1bmN0aW9uKCl7IHByb3RvLnZhbHVlT2YuY2FsbCh0aGF0KTsgfSkgOiBjb2YodGhhdCkgIT0gTlVNQkVSKVxuICAgICAgICA/IG5ldyBCYXNlKHRvTnVtYmVyKGl0KSkgOiB0b051bWJlcihpdCk7XG4gIH07XG4gICQuZWFjaC5jYWxsKHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpID8gJC5nZXROYW1lcyhCYXNlKSA6IChcbiAgICAvLyBFUzM6XG4gICAgJ01BWF9WQUxVRSxNSU5fVkFMVUUsTmFOLE5FR0FUSVZFX0lORklOSVRZLFBPU0lUSVZFX0lORklOSVRZLCcgK1xuICAgIC8vIEVTNiAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTNiBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICdFUFNJTE9OLGlzRmluaXRlLGlzSW50ZWdlcixpc05hTixpc1NhZmVJbnRlZ2VyLE1BWF9TQUZFX0lOVEVHRVIsJyArXG4gICAgJ01JTl9TQUZFX0lOVEVHRVIscGFyc2VGbG9hdCxwYXJzZUludCxpc0ludGVnZXInXG4gICkuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICBpZihoYXMoQmFzZSwga2V5KSAmJiAhaGFzKCROdW1iZXIsIGtleSkpe1xuICAgICAgJC5zZXREZXNjKCROdW1iZXIsIGtleSwgJC5nZXREZXNjKEJhc2UsIGtleSkpO1xuICAgIH1cbiAgfSk7XG4gICROdW1iZXIucHJvdG90eXBlID0gcHJvdG87XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJE51bWJlcjtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmaW5lJykoZ2xvYmFsLCBOVU1CRVIsICROdW1iZXIpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcclxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xyXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxyXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcclxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcclxuICB2YXIgZm4sIHZhbDtcclxuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XHJcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xyXG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XHJcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC50by1wcmltaXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKVxuICAsIHNwYWNlcyAgPSAnXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDMnICtcbiAgICAgICdcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJ1xuICAsIHNwYWNlICAgPSAnWycgKyBzcGFjZXMgKyAnXSdcbiAgLCBub24gICAgID0gJ1xcdTIwMGJcXHUwMDg1J1xuICAsIGx0cmltICAgPSBSZWdFeHAoJ14nICsgc3BhY2UgKyBzcGFjZSArICcqJylcbiAgLCBydHJpbSAgID0gUmVnRXhwKHNwYWNlICsgc3BhY2UgKyAnKiQnKTtcblxudmFyIGV4cG9ydGVyID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGV4cCAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKHRyaW0pO1xuICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICEhc3BhY2VzW0tFWV0oKSB8fCBub25bS0VZXSgpICE9IG5vbjtcbiAgfSksICdTdHJpbmcnLCBleHApO1xufTtcblxuLy8gMSAtPiBTdHJpbmcjdHJpbUxlZnRcbi8vIDIgLT4gU3RyaW5nI3RyaW1SaWdodFxuLy8gMyAtPiBTdHJpbmcjdHJpbVxudmFyIHRyaW0gPSBleHBvcnRlci50cmltID0gZnVuY3Rpb24oc3RyaW5nLCBUWVBFKXtcbiAgc3RyaW5nID0gU3RyaW5nKGRlZmluZWQoc3RyaW5nKSk7XG4gIGlmKFRZUEUgJiAxKXN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gIGlmKFRZUEUgJiAyKXN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gIHJldHVybiBzdHJpbmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctdHJpbS5qc1xuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4xLjIuMSBOdW1iZXIuRVBTSUxPTlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge0VQU0lMT046IE1hdGgucG93KDIsIC01Mil9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4xLjIuMiBOdW1iZXIuaXNGaW5pdGUobnVtYmVyKVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIF9pc0Zpbml0ZSA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5pc0Zpbml0ZTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzRmluaXRlOiBmdW5jdGlvbiBpc0Zpbml0ZShpdCl7XG4gICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnbnVtYmVyJyAmJiBfaXNGaW5pdGUoaXQpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtZmluaXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge2lzSW50ZWdlcjogcmVxdWlyZSgnLi8kLmlzLWludGVnZXInKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgZmxvb3IgICAgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0ludGVnZXIoaXQpe1xuICByZXR1cm4gIWlzT2JqZWN0KGl0KSAmJiBpc0Zpbml0ZShpdCkgJiYgZmxvb3IoaXQpID09PSBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmlzLWludGVnZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMS4yLjQgTnVtYmVyLmlzTmFOKG51bWJlcilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcil7XG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanNcbiAqKiBtb2R1bGUgaWQgPSA3MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMS4yLjUgTnVtYmVyLmlzU2FmZUludGVnZXIobnVtYmVyKVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGlzSW50ZWdlciA9IHJlcXVpcmUoJy4vJC5pcy1pbnRlZ2VyJylcbiAgLCBhYnMgICAgICAgPSBNYXRoLmFicztcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzU2FmZUludGVnZXI6IGZ1bmN0aW9uIGlzU2FmZUludGVnZXIobnVtYmVyKXtcbiAgICByZXR1cm4gaXNJbnRlZ2VyKG51bWJlcikgJiYgYWJzKG51bWJlcikgPD0gMHgxZmZmZmZmZmZmZmZmZjtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDcyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4xLjIuNiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge01BWF9TQUZFX0lOVEVHRVI6IDB4MWZmZmZmZmZmZmZmZmZ9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIubWF4LXNhZmUtaW50ZWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDczXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4xLjIuMTAgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtNSU5fU0FGRV9JTlRFR0VSOiAtMHgxZmZmZmZmZmZmZmZmZn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5taW4tc2FmZS1pbnRlZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIwLjEuMi4xMiBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7cGFyc2VGbG9hdDogcGFyc2VGbG9hdH0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5wYXJzZS1mbG9hdC5qc1xuICoqIG1vZHVsZSBpZCA9IDc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4xLjIuMTMgTnVtYmVyLnBhcnNlSW50KHN0cmluZywgcmFkaXgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7cGFyc2VJbnQ6IHBhcnNlSW50fSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnBhcnNlLWludC5qc1xuICoqIG1vZHVsZSBpZCA9IDc2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMyBNYXRoLmFjb3NoKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGxvZzFwICAgPSByZXF1aXJlKCcuLyQubWF0aC1sb2cxcCcpXG4gICwgc3FydCAgICA9IE1hdGguc3FydFxuICAsICRhY29zaCAgPSBNYXRoLmFjb3NoO1xuXG4vLyBWOCBidWcgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM1MDlcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYWNvc2ggJiYgTWF0aC5mbG9vcigkYWNvc2goTnVtYmVyLk1BWF9WQUxVRSkpID09IDcxMCksICdNYXRoJywge1xuICBhY29zaDogZnVuY3Rpb24gYWNvc2goeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpIDwgMSA/IE5hTiA6IHggPiA5NDkwNjI2NS42MjQyNTE1NlxuICAgICAgPyBNYXRoLmxvZyh4KSArIE1hdGguTE4yXG4gICAgICA6IGxvZzFwKHggLSAxICsgc3FydCh4IC0gMSkgKiBzcXJ0KHggKyAxKSk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYWNvc2guanNcbiAqKiBtb2R1bGUgaWQgPSA3N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5sb2cxcCB8fCBmdW5jdGlvbiBsb2cxcCh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID4gLTFlLTggJiYgeCA8IDFlLTggPyB4IC0geCAqIHggLyAyIDogTWF0aC5sb2coMSArIHgpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQubWF0aC1sb2cxcC5qc1xuICoqIG1vZHVsZSBpZCA9IDc4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuZnVuY3Rpb24gYXNpbmgoeCl7XG4gIHJldHVybiAhaXNGaW5pdGUoeCA9ICt4KSB8fCB4ID09IDAgPyB4IDogeCA8IDAgPyAtYXNpbmgoLXgpIDogTWF0aC5sb2coeCArIE1hdGguc3FydCh4ICogeCArIDEpKTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge2FzaW5oOiBhc2luaH0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXNpbmguanNcbiAqKiBtb2R1bGUgaWQgPSA3OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjcgTWF0aC5hdGFuaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgYXRhbmg6IGZ1bmN0aW9uIGF0YW5oKHgpe1xuICAgIHJldHVybiAoeCA9ICt4KSA9PSAwID8geCA6IE1hdGgubG9nKCgxICsgeCkgLyAoMSAtIHgpKSAvIDI7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYXRhbmguanNcbiAqKiBtb2R1bGUgaWQgPSA4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjkgTWF0aC5jYnJ0KHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHNpZ24gICAgPSByZXF1aXJlKCcuLyQubWF0aC1zaWduJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2JydDogZnVuY3Rpb24gY2JydCh4KXtcbiAgICByZXR1cm4gc2lnbih4ID0gK3gpICogTWF0aC5wb3coTWF0aC5hYnMoeCksIDEgLyAzKTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jYnJ0LmpzXG4gKiogbW9kdWxlIGlkID0gODFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5zaWduIHx8IGZ1bmN0aW9uIHNpZ24oeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwIHx8IHggIT0geCA/IHggOiB4IDwgMCA/IC0xIDogMTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm1hdGgtc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDgyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMTEgTWF0aC5jbHozMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2x6MzI6IGZ1bmN0aW9uIGNsejMyKHgpe1xuICAgIHJldHVybiAoeCA+Pj49IDApID8gMzEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHggKyAwLjUpICogTWF0aC5MT0cyRSkgOiAzMjtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5jbHozMi5qc1xuICoqIG1vZHVsZSBpZCA9IDgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMTIgTWF0aC5jb3NoKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY29zaC5qc1xuICoqIG1vZHVsZSBpZCA9IDg0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtleHBtMTogcmVxdWlyZSgnLi8kLm1hdGgtZXhwbTEnKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguZXhwbTEuanNcbiAqKiBtb2R1bGUgaWQgPSA4NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjE0IE1hdGguZXhwbTEoeClcbm1vZHVsZS5leHBvcnRzID0gTWF0aC5leHBtMSB8fCBmdW5jdGlvbiBleHBtMSh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogeCA+IC0xZS02ICYmIHggPCAxZS02ID8geCArIHggKiB4IC8gMiA6IE1hdGguZXhwKHgpIC0gMTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm1hdGgtZXhwbTEuanNcbiAqKiBtb2R1bGUgaWQgPSA4NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjE2IE1hdGguZnJvdW5kKHgpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgc2lnbiAgICAgID0gcmVxdWlyZSgnLi8kLm1hdGgtc2lnbicpXG4gICwgcG93ICAgICAgID0gTWF0aC5wb3dcbiAgLCBFUFNJTE9OICAgPSBwb3coMiwgLTUyKVxuICAsIEVQU0lMT04zMiA9IHBvdygyLCAtMjMpXG4gICwgTUFYMzIgICAgID0gcG93KDIsIDEyNykgKiAoMiAtIEVQU0lMT04zMilcbiAgLCBNSU4zMiAgICAgPSBwb3coMiwgLTEyNik7XG5cbnZhciByb3VuZFRpZXNUb0V2ZW4gPSBmdW5jdGlvbihuKXtcbiAgcmV0dXJuIG4gKyAxIC8gRVBTSUxPTiAtIDEgLyBFUFNJTE9OO1xufTtcblxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGZyb3VuZDogZnVuY3Rpb24gZnJvdW5kKHgpe1xuICAgIHZhciAkYWJzICA9IE1hdGguYWJzKHgpXG4gICAgICAsICRzaWduID0gc2lnbih4KVxuICAgICAgLCBhLCByZXN1bHQ7XG4gICAgaWYoJGFicyA8IE1JTjMyKXJldHVybiAkc2lnbiAqIHJvdW5kVGllc1RvRXZlbigkYWJzIC8gTUlOMzIgLyBFUFNJTE9OMzIpICogTUlOMzIgKiBFUFNJTE9OMzI7XG4gICAgYSA9ICgxICsgRVBTSUxPTjMyIC8gRVBTSUxPTikgKiAkYWJzO1xuICAgIHJlc3VsdCA9IGEgLSAoYSAtICRhYnMpO1xuICAgIGlmKHJlc3VsdCA+IE1BWDMyIHx8IHJlc3VsdCAhPSByZXN1bHQpcmV0dXJuICRzaWduICogSW5maW5pdHk7XG4gICAgcmV0dXJuICRzaWduICogcmVzdWx0O1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmZyb3VuZC5qc1xuICoqIG1vZHVsZSBpZCA9IDg3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMTcgTWF0aC5oeXBvdChbdmFsdWUxWywgdmFsdWUyWywg4oCmIF1dXSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgYWJzICAgICA9IE1hdGguYWJzO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGh5cG90OiBmdW5jdGlvbiBoeXBvdCh2YWx1ZTEsIHZhbHVlMil7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgc3VtICAgPSAwXG4gICAgICAsIGkgICAgID0gMFxuICAgICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICAgLCAkJGxlbiA9ICQkLmxlbmd0aFxuICAgICAgLCBsYXJnICA9IDBcbiAgICAgICwgYXJnLCBkaXY7XG4gICAgd2hpbGUoaSA8ICQkbGVuKXtcbiAgICAgIGFyZyA9IGFicygkJFtpKytdKTtcbiAgICAgIGlmKGxhcmcgPCBhcmcpe1xuICAgICAgICBkaXYgID0gbGFyZyAvIGFyZztcbiAgICAgICAgc3VtICA9IHN1bSAqIGRpdiAqIGRpdiArIDE7XG4gICAgICAgIGxhcmcgPSBhcmc7XG4gICAgICB9IGVsc2UgaWYoYXJnID4gMCl7XG4gICAgICAgIGRpdiAgPSBhcmcgLyBsYXJnO1xuICAgICAgICBzdW0gKz0gZGl2ICogZGl2O1xuICAgICAgfSBlbHNlIHN1bSArPSBhcmc7XG4gICAgfVxuICAgIHJldHVybiBsYXJnID09PSBJbmZpbml0eSA/IEluZmluaXR5IDogbGFyZyAqIE1hdGguc3FydChzdW0pO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmh5cG90LmpzXG4gKiogbW9kdWxlIGlkID0gODhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIwLjIuMi4xOCBNYXRoLmltdWwoeCwgeSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgJGltdWwgICA9IE1hdGguaW11bDtcblxuLy8gc29tZSBXZWJLaXQgdmVyc2lvbnMgZmFpbHMgd2l0aCBiaWcgbnVtYmVycywgc29tZSBoYXMgd3JvbmcgYXJpdHlcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICRpbXVsKDB4ZmZmZmZmZmYsIDUpICE9IC01IHx8ICRpbXVsLmxlbmd0aCAhPSAyO1xufSksICdNYXRoJywge1xuICBpbXVsOiBmdW5jdGlvbiBpbXVsKHgsIHkpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgeG4gPSAreFxuICAgICAgLCB5biA9ICt5XG4gICAgICAsIHhsID0gVUlOVDE2ICYgeG5cbiAgICAgICwgeWwgPSBVSU5UMTYgJiB5bjtcbiAgICByZXR1cm4gMCB8IHhsICogeWwgKyAoKFVJTlQxNiAmIHhuID4+PiAxNikgKiB5bCArIHhsICogKFVJTlQxNiAmIHluID4+PiAxNikgPDwgMTYgPj4+IDApO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmltdWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzEwOiBmdW5jdGlvbiBsb2cxMCh4KXtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMTA7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMTAuanNcbiAqKiBtb2R1bGUgaWQgPSA5MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7bG9nMXA6IHJlcXVpcmUoJy4vJC5tYXRoLWxvZzFwJyl9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwLmpzXG4gKiogbW9kdWxlIGlkID0gOTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIwLjIuMi4yMiBNYXRoLmxvZzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCl7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjI7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qc1xuICoqIG1vZHVsZSBpZCA9IDkyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge3NpZ246IHJlcXVpcmUoJy4vJC5tYXRoLXNpZ24nKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDkzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGV4cG0xICAgPSByZXF1aXJlKCcuLyQubWF0aC1leHBtMScpXG4gICwgZXhwICAgICA9IE1hdGguZXhwO1xuXG4vLyBWOCBuZWFyIENocm9taXVtIDM4IGhhcyBhIHByb2JsZW0gd2l0aCB2ZXJ5IHNtYWxsIG51bWJlcnNcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICFNYXRoLnNpbmgoLTJlLTE3KSAhPSAtMmUtMTc7XG59KSwgJ01hdGgnLCB7XG4gIHNpbmg6IGZ1bmN0aW9uIHNpbmgoeCl7XG4gICAgcmV0dXJuIE1hdGguYWJzKHggPSAreCkgPCAxXG4gICAgICA/IChleHBtMSh4KSAtIGV4cG0xKC14KSkgLyAyXG4gICAgICA6IChleHAoeCAtIDEpIC0gZXhwKC14IC0gMSkpICogKE1hdGguRSAvIDIpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLnNpbmguanNcbiAqKiBtb2R1bGUgaWQgPSA5NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjAuMi4yLjMzIE1hdGgudGFuaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBleHBtMSAgID0gcmVxdWlyZSgnLi8kLm1hdGgtZXhwbTEnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICB0YW5oOiBmdW5jdGlvbiB0YW5oKHgpe1xuICAgIHZhciBhID0gZXhwbTEoeCA9ICt4KVxuICAgICAgLCBiID0gZXhwbTEoLXgpO1xuICAgIHJldHVybiBhID09IEluZmluaXR5ID8gMSA6IGIgPT0gSW5maW5pdHkgPyAtMSA6IChhIC0gYikgLyAoZXhwKHgpICsgZXhwKC14KSk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgudGFuaC5qc1xuICoqIG1vZHVsZSBpZCA9IDk1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMC4yLjIuMzQgTWF0aC50cnVuYyh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KXtcbiAgICByZXR1cm4gKGl0ID4gMCA/IE1hdGguZmxvb3IgOiBNYXRoLmNlaWwpKGl0KTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC50cnVuYy5qc1xuICoqIG1vZHVsZSBpZCA9IDk2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCB0b0luZGV4ICAgICAgICA9IHJlcXVpcmUoJy4vJC50by1pbmRleCcpXG4gICwgZnJvbUNoYXJDb2RlICAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICwgJGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcblxuLy8gbGVuZ3RoIHNob3VsZCBiZSAxLCBvbGQgRkYgcHJvYmxlbVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoISEkZnJvbUNvZGVQb2ludCAmJiAkZnJvbUNvZGVQb2ludC5sZW5ndGggIT0gMSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi4yIFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHMpXG4gIGZyb21Db2RlUG9pbnQ6IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoeCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgcmVzICAgPSBbXVxuICAgICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICAgLCAkJGxlbiA9ICQkLmxlbmd0aFxuICAgICAgLCBpICAgICA9IDBcbiAgICAgICwgY29kZTtcbiAgICB3aGlsZSgkJGxlbiA+IGkpe1xuICAgICAgY29kZSA9ICskJFtpKytdO1xuICAgICAgaWYodG9JbmRleChjb2RlLCAweDEwZmZmZikgIT09IGNvZGUpdGhyb3cgUmFuZ2VFcnJvcihjb2RlICsgJyBpcyBub3QgYSB2YWxpZCBjb2RlIHBvaW50Jyk7XG4gICAgICByZXMucHVzaChjb2RlIDwgMHgxMDAwMFxuICAgICAgICA/IGZyb21DaGFyQ29kZShjb2RlKVxuICAgICAgICA6IGZyb21DaGFyQ29kZSgoKGNvZGUgLT0gMHgxMDAwMCkgPj4gMTApICsgMHhkODAwLCBjb2RlICUgMHg0MDAgKyAweGRjMDApXG4gICAgICApO1xuICAgIH0gcmV0dXJuIHJlcy5qb2luKCcnKTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZyb20tY29kZS1wb2ludC5qc1xuICoqIG1vZHVsZSBpZCA9IDk3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi40IFN0cmluZy5yYXcoY2FsbFNpdGUsIC4uLnN1YnN0aXR1dGlvbnMpXG4gIHJhdzogZnVuY3Rpb24gcmF3KGNhbGxTaXRlKXtcbiAgICB2YXIgdHBsICAgPSB0b0lPYmplY3QoY2FsbFNpdGUucmF3KVxuICAgICAgLCBsZW4gICA9IHRvTGVuZ3RoKHRwbC5sZW5ndGgpXG4gICAgICAsICQkICAgID0gYXJndW1lbnRzXG4gICAgICAsICQkbGVuID0gJCQubGVuZ3RoXG4gICAgICAsIHJlcyAgID0gW11cbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHdoaWxlKGxlbiA+IGkpe1xuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XG4gICAgICBpZihpIDwgJCRsZW4pcmVzLnB1c2goU3RyaW5nKCQkW2ldKSk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzXG4gKiogbW9kdWxlIGlkID0gOThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIxLjEuMy4yNSBTdHJpbmcucHJvdG90eXBlLnRyaW0oKVxucmVxdWlyZSgnLi8kLnN0cmluZy10cmltJykoJ3RyaW0nLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltKCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDMpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnRyaW0uanNcbiAqKiBtb2R1bGUgaWQgPSA5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gMTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG8gICAgICAgPSByZXF1aXJlKCcuLyQnKS5nZXRQcm90b1xuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRuYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvKCRkZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgICB9XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXRlcmF0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMTAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi8kLnNldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWNyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCAkYXQgICAgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKGZhbHNlKTtcbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMyBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0KHBvcylcbiAgY29kZVBvaW50QXQ6IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGNvbnRleHQgICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctY29udGV4dCcpXG4gICwgRU5EU19XSVRIID0gJ2VuZHNXaXRoJ1xuICAsICRlbmRzV2l0aCA9ICcnW0VORFNfV0lUSF07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi8kLmZhaWxzLWlzLXJlZ2V4cCcpKEVORFNfV0lUSCksICdTdHJpbmcnLCB7XG4gIGVuZHNXaXRoOiBmdW5jdGlvbiBlbmRzV2l0aChzZWFyY2hTdHJpbmcgLyosIGVuZFBvc2l0aW9uID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIHRoYXQgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgRU5EU19XSVRIKVxuICAgICAgLCAkJCAgID0gYXJndW1lbnRzXG4gICAgICAsIGVuZFBvc2l0aW9uID0gJCQubGVuZ3RoID4gMSA/ICQkWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIGxlbiAgICA9IHRvTGVuZ3RoKHRoYXQubGVuZ3RoKVxuICAgICAgLCBlbmQgICAgPSBlbmRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gbGVuIDogTWF0aC5taW4odG9MZW5ndGgoZW5kUG9zaXRpb24pLCBsZW4pXG4gICAgICAsIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hTdHJpbmcpO1xuICAgIHJldHVybiAkZW5kc1dpdGhcbiAgICAgID8gJGVuZHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBlbmQpXG4gICAgICA6IHRoYXQuc2xpY2UoZW5kIC0gc2VhcmNoLmxlbmd0aCwgZW5kKSA9PT0gc2VhcmNoO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoLmpzXG4gKiogbW9kdWxlIGlkID0gMTA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBoZWxwZXIgZm9yIFN0cmluZyN7c3RhcnRzV2l0aCwgZW5kc1dpdGgsIGluY2x1ZGVzfVxudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi8kLmlzLXJlZ2V4cCcpXG4gICwgZGVmaW5lZCAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIHNlYXJjaFN0cmluZywgTkFNRSl7XG4gIGlmKGlzUmVnRXhwKHNlYXJjaFN0cmluZykpdGhyb3cgVHlwZUVycm9yKCdTdHJpbmcjJyArIE5BTUUgKyBcIiBkb2Vzbid0IGFjY2VwdCByZWdleCFcIik7XG4gIHJldHVybiBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctY29udGV4dC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjggSXNSZWdFeHAoYXJndW1lbnQpXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBjb2YgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIE1BVENIICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXMtcmVnZXhwLmpzXG4gKiogbW9kdWxlIGlkID0gMTA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTUFUQ0ggPSByZXF1aXJlKCcuLyQud2tzJykoJ21hdGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciByZSA9IC8uLztcbiAgdHJ5IHtcbiAgICAnLy4vJ1tLRVldKHJlKTtcbiAgfSBjYXRjaChlKXtcbiAgICB0cnkge1xuICAgICAgcmVbTUFUQ0hdID0gZmFsc2U7XG4gICAgICByZXR1cm4gIScvLi8nW0tFWV0ocmUpO1xuICAgIH0gY2F0Y2goZil7IC8qIGVtcHR5ICovIH1cbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmZhaWxzLWlzLXJlZ2V4cC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjEuMS4zLjcgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcsIHBvc2l0aW9uID0gMClcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGNvbnRleHQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1jb250ZXh0JylcbiAgLCBJTkNMVURFUyA9ICdpbmNsdWRlcyc7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi8kLmZhaWxzLWlzLXJlZ2V4cCcpKElOQ0xVREVTKSwgJ1N0cmluZycsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaFN0cmluZyAvKiwgcG9zaXRpb24gPSAwICovKXtcbiAgICByZXR1cm4gISF+Y29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIElOQ0xVREVTKVxuICAgICAgLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDExMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMTMgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQoY291bnQpXG4gIHJlcGVhdDogcmVxdWlyZSgnLi8kLnN0cmluZy1yZXBlYXQnKVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdC5qc1xuICoqIG1vZHVsZSBpZCA9IDExMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCl7XG4gIHZhciBzdHIgPSBTdHJpbmcoZGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSB0b0ludGVnZXIoY291bnQpO1xuICBpZihuIDwgMCB8fCBuID09IEluZmluaXR5KXRocm93IFJhbmdlRXJyb3IoXCJDb3VudCBjYW4ndCBiZSBuZWdhdGl2ZVwiKTtcbiAgZm9yKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpaWYobiAmIDEpcmVzICs9IHN0cjtcbiAgcmV0dXJuIHJlcztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnN0cmluZy1yZXBlYXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGNvbnRleHQgICAgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1jb250ZXh0JylcbiAgLCBTVEFSVFNfV0lUSCA9ICdzdGFydHNXaXRoJ1xuICAsICRzdGFydHNXaXRoID0gJydbU1RBUlRTX1dJVEhdO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vJC5mYWlscy1pcy1yZWdleHAnKShTVEFSVFNfV0lUSCksICdTdHJpbmcnLCB7XG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIHZhciB0aGF0ICAgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgU1RBUlRTX1dJVEgpXG4gICAgICAsICQkICAgICA9IGFyZ3VtZW50c1xuICAgICAgLCBpbmRleCAgPSB0b0xlbmd0aChNYXRoLm1pbigkJC5sZW5ndGggPiAxID8gJCRbMV0gOiB1bmRlZmluZWQsIHRoYXQubGVuZ3RoKSlcbiAgICAgICwgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuICRzdGFydHNXaXRoXG4gICAgICA/ICRzdGFydHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBpbmRleClcbiAgICAgIDogdGhhdC5zbGljZShpbmRleCwgaW5kZXggKyBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RhcnRzLXdpdGguanNcbiAqKiBtb2R1bGUgaWQgPSAxMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsICQkICAgICAgPSBhcmd1bWVudHNcbiAgICAgICwgJCRsZW4gICA9ICQkLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gJCRsZW4gPiAxID8gJCRbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgJCRsZW4gPiAyID8gJCRbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDExNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDExNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4gKiogbW9kdWxlIGlkID0gMTE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyBzYWZlID0gdHJ1ZTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4vLyBXZWJLaXQgQXJyYXkub2YgaXNuJ3QgZ2VuZXJpY1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBGKCl7fVxuICByZXR1cm4gIShBcnJheS5vZi5jYWxsKEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXG4gIG9mOiBmdW5jdGlvbiBvZigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCAkJCAgICAgPSBhcmd1bWVudHNcbiAgICAgICwgJCRsZW4gID0gJCQubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkoJCRsZW4pO1xuICAgIHdoaWxlKCQkbGVuID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9ICQkW2luZGV4KytdO1xuICAgIHJlc3VsdC5sZW5ndGggPSAkJGxlbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDExOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuLyQud2tzJykoJ3Vuc2NvcGFibGVzJylcbiAgLCBBcnJheVByb3RvICA9IEFycmF5LnByb3RvdHlwZTtcbmlmKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZClyZXF1aXJlKCcuLyQuaGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLXN0ZXAuanNcbiAqKiBtb2R1bGUgaWQgPSAxMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vJC5zZXQtc3BlY2llcycpKCdBcnJheScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsICQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zZXQtc3BlY2llcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjIuMS4zLjMgQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCwgZW5kID0gdGhpcy5sZW5ndGgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtjb3B5V2l0aGluOiByZXF1aXJlKCcuLyQuYXJyYXktY29weS13aXRoaW4nKX0pO1xuXG5yZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJykoJ2NvcHlXaXRoaW4nKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5jb3B5LXdpdGhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDEyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjIuMS4zLjMgQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCB0b0luZGV4ICA9IHJlcXVpcmUoJy4vJC50by1pbmRleCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW10uY29weVdpdGhpbiB8fCBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qPSAwKi8sIHN0YXJ0Lyo9IDAsIGVuZCA9IEBsZW5ndGgqLyl7XG4gIHZhciBPICAgICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgLCBsZW4gICA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgdG8gICAgPSB0b0luZGV4KHRhcmdldCwgbGVuKVxuICAgICwgZnJvbSAgPSB0b0luZGV4KHN0YXJ0LCBsZW4pXG4gICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICwgZW5kICAgPSAkJC5sZW5ndGggPiAyID8gJCRbMl0gOiB1bmRlZmluZWRcbiAgICAsIGNvdW50ID0gTWF0aC5taW4oKGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogdG9JbmRleChlbmQsIGxlbikpIC0gZnJvbSwgbGVuIC0gdG8pXG4gICAgLCBpbmMgICA9IDE7XG4gIGlmKGZyb20gPCB0byAmJiB0byA8IGZyb20gKyBjb3VudCl7XG4gICAgaW5jICA9IC0xO1xuICAgIGZyb20gKz0gY291bnQgLSAxO1xuICAgIHRvICAgKz0gY291bnQgLSAxO1xuICB9XG4gIHdoaWxlKGNvdW50LS0gPiAwKXtcbiAgICBpZihmcm9tIGluIE8pT1t0b10gPSBPW2Zyb21dO1xuICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgIHRvICAgKz0gaW5jO1xuICAgIGZyb20gKz0gaW5jO1xuICB9IHJldHVybiBPO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktY29weS13aXRoaW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDIyLjEuMy42IEFycmF5LnByb3RvdHlwZS5maWxsKHZhbHVlLCBzdGFydCA9IDAsIGVuZCA9IHRoaXMubGVuZ3RoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7ZmlsbDogcmVxdWlyZSgnLi8kLmFycmF5LWZpbGwnKX0pO1xuXG5yZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJykoJ2ZpbGwnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maWxsLmpzXG4gKiogbW9kdWxlIGlkID0gMTI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyMi4xLjMuNiBBcnJheS5wcm90b3R5cGUuZmlsbCh2YWx1ZSwgc3RhcnQgPSAwLCBlbmQgPSB0aGlzLmxlbmd0aClcbid1c2Ugc3RyaWN0JztcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi8kLnRvLWluZGV4JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKTtcbm1vZHVsZS5leHBvcnRzID0gW10uZmlsbCB8fCBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCA9IDAsIGVuZCA9IEBsZW5ndGggKi8pe1xuICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhpcylcbiAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgJCQgICAgID0gYXJndW1lbnRzXG4gICAgLCAkJGxlbiAgPSAkJC5sZW5ndGhcbiAgICAsIGluZGV4ICA9IHRvSW5kZXgoJCRsZW4gPiAxID8gJCRbMV0gOiB1bmRlZmluZWQsIGxlbmd0aClcbiAgICAsIGVuZCAgICA9ICQkbGVuID4gMiA/ICQkWzJdIDogdW5kZWZpbmVkXG4gICAgLCBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvSW5kZXgoZW5kLCBsZW5ndGgpO1xuICB3aGlsZShlbmRQb3MgPiBpbmRleClPW2luZGV4KytdID0gdmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktZmlsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjggQXJyYXkucHJvdG90eXBlLmZpbmQocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCAkZmluZCAgID0gcmVxdWlyZSgnLi8kLmFycmF5LW1ldGhvZHMnKSg1KVxuICAsIEtFWSAgICAgPSAnZmluZCdcbiAgLCBmb3JjZWQgID0gdHJ1ZTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kOiBmdW5jdGlvbiBmaW5kKGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJykoS0VZKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzXG4gKiogbW9kdWxlIGlkID0gMTI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOSBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KHByZWRpY2F0ZSwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgJGZpbmQgICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJykoNilcbiAgLCBLRVkgICAgID0gJ2ZpbmRJbmRleCdcbiAgLCBmb3JjZWQgID0gdHJ1ZTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xucmVxdWlyZSgnLi8kLmFkZC10by11bnNjb3BhYmxlcycpKEtFWSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBnbG9iYWwgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGlzUmVnRXhwID0gcmVxdWlyZSgnLi8kLmlzLXJlZ2V4cCcpXG4gICwgJGZsYWdzICAgPSByZXF1aXJlKCcuLyQuZmxhZ3MnKVxuICAsICRSZWdFeHAgID0gZ2xvYmFsLlJlZ0V4cFxuICAsIEJhc2UgICAgID0gJFJlZ0V4cFxuICAsIHByb3RvICAgID0gJFJlZ0V4cC5wcm90b3R5cGVcbiAgLCByZTEgICAgICA9IC9hL2dcbiAgLCByZTIgICAgICA9IC9hL2dcbiAgLy8gXCJuZXdcIiBjcmVhdGVzIGEgbmV3IG9iamVjdCwgb2xkIHdlYmtpdCBidWdneSBoZXJlXG4gICwgQ09SUkVDVF9ORVcgPSBuZXcgJFJlZ0V4cChyZTEpICE9PSByZTE7XG5cbmlmKHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpICYmICghQ09SUkVDVF9ORVcgfHwgcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmUyW3JlcXVpcmUoJy4vJC53a3MnKSgnbWF0Y2gnKV0gPSBmYWxzZTtcbiAgLy8gUmVnRXhwIGNvbnN0cnVjdG9yIGNhbiBhbHRlciBmbGFncyBhbmQgSXNSZWdFeHAgd29ya3MgY29ycmVjdCB3aXRoIEBAbWF0Y2hcbiAgcmV0dXJuICRSZWdFeHAocmUxKSAhPSByZTEgfHwgJFJlZ0V4cChyZTIpID09IHJlMiB8fCAkUmVnRXhwKHJlMSwgJ2knKSAhPSAnL2EvaSc7XG59KSkpe1xuICAkUmVnRXhwID0gZnVuY3Rpb24gUmVnRXhwKHAsIGYpe1xuICAgIHZhciBwaVJFID0gaXNSZWdFeHAocClcbiAgICAgICwgZmlVICA9IGYgPT09IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gISh0aGlzIGluc3RhbmNlb2YgJFJlZ0V4cCkgJiYgcGlSRSAmJiBwLmNvbnN0cnVjdG9yID09PSAkUmVnRXhwICYmIGZpVSA/IHBcbiAgICAgIDogQ09SUkVDVF9ORVdcbiAgICAgICAgPyBuZXcgQmFzZShwaVJFICYmICFmaVUgPyBwLnNvdXJjZSA6IHAsIGYpXG4gICAgICAgIDogQmFzZSgocGlSRSA9IHAgaW5zdGFuY2VvZiAkUmVnRXhwKSA/IHAuc291cmNlIDogcCwgcGlSRSAmJiBmaVUgPyAkZmxhZ3MuY2FsbChwKSA6IGYpO1xuICB9O1xuICAkLmVhY2guY2FsbCgkLmdldE5hbWVzKEJhc2UpLCBmdW5jdGlvbihrZXkpe1xuICAgIGtleSBpbiAkUmVnRXhwIHx8ICQuc2V0RGVzYygkUmVnRXhwLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIEJhc2Vba2V5XTsgfSxcbiAgICAgIHNldDogZnVuY3Rpb24oaXQpeyBCYXNlW2tleV0gPSBpdDsgfVxuICAgIH0pO1xuICB9KTtcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkUmVnRXhwO1xuICAkUmVnRXhwLnByb3RvdHlwZSA9IHByb3RvO1xuICByZXF1aXJlKCcuLyQucmVkZWZpbmUnKShnbG9iYWwsICdSZWdFeHAnLCAkUmVnRXhwKTtcbn1cblxucmVxdWlyZSgnLi8kLnNldC1zcGVjaWVzJykoJ1JlZ0V4cCcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDEzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgICA9IGFuT2JqZWN0KHRoaXMpXG4gICAgLCByZXN1bHQgPSAnJztcbiAgaWYodGhhdC5nbG9iYWwpICAgICByZXN1bHQgKz0gJ2cnO1xuICBpZih0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmKHRoYXQubXVsdGlsaW5lKSAgcmVzdWx0ICs9ICdtJztcbiAgaWYodGhhdC51bmljb2RlKSAgICByZXN1bHQgKz0gJ3UnO1xuICBpZih0aGF0LnN0aWNreSkgICAgIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5mbGFncy5qc1xuICoqIG1vZHVsZSBpZCA9IDEzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3MoKVxudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbmlmKHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpICYmIC8uL2cuZmxhZ3MgIT0gJ2cnKSQuc2V0RGVzYyhSZWdFeHAucHJvdG90eXBlLCAnZmxhZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiByZXF1aXJlKCcuLyQuZmxhZ3MnKVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmZsYWdzLmpzXG4gKiogbW9kdWxlIGlkID0gMTMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBAQG1hdGNoIGxvZ2ljXG5yZXF1aXJlKCcuLyQuZml4LXJlLXdrcycpKCdtYXRjaCcsIDEsIGZ1bmN0aW9uKGRlZmluZWQsIE1BVENIKXtcbiAgLy8gMjEuMS4zLjExIFN0cmluZy5wcm90b3R5cGUubWF0Y2gocmVnZXhwKVxuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2gocmVnZXhwKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW01BVENIXShTdHJpbmcoTykpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzXG4gKiogbW9kdWxlIGlkID0gMTM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgaGlkZSAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgcmVkZWZpbmUgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKVxuICAsIGZhaWxzICAgID0gcmVxdWlyZSgnLi8kLmZhaWxzJylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJylcbiAgLCB3a3MgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGxlbmd0aCwgZXhlYyl7XG4gIHZhciBTWU1CT0wgICA9IHdrcyhLRVkpXG4gICAgLCBvcmlnaW5hbCA9ICcnW0tFWV07XG4gIGlmKGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbigpeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KSl7XG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBleGVjKGRlZmluZWQsIFNZTUJPTCwgb3JpZ2luYWwpKTtcbiAgICBoaWRlKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uKHN0cmluZywgYXJnKXsgcmV0dXJuIG9yaWdpbmFsLmNhbGwoc3RyaW5nLCB0aGlzLCBhcmcpOyB9XG4gICAgICAvLyAyMS4yLjUuNiBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdKHN0cmluZylcbiAgICAgIC8vIDIxLjIuNS45IFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdKHN0cmluZylcbiAgICAgIDogZnVuY3Rpb24oc3RyaW5nKXsgcmV0dXJuIG9yaWdpbmFsLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmZpeC1yZS13a3MuanNcbiAqKiBtb2R1bGUgaWQgPSAxMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi8kLmZpeC1yZS13a3MnKSgncmVwbGFjZScsIDIsIGZ1bmN0aW9uKGRlZmluZWQsIFJFUExBQ0UsICRyZXBsYWNlKXtcbiAgLy8gMjEuMS4zLjE0IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKVxuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGZuLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIEBAc2VhcmNoIGxvZ2ljXG5yZXF1aXJlKCcuLyQuZml4LXJlLXdrcycpKCdzZWFyY2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBTRUFSQ0gpe1xuICAvLyAyMS4xLjMuMTUgU3RyaW5nLnByb3RvdHlwZS5zZWFyY2gocmVnZXhwKVxuICByZXR1cm4gZnVuY3Rpb24gc2VhcmNoKHJlZ2V4cCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW1NFQVJDSF07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbU0VBUkNIXShTdHJpbmcoTykpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnNlYXJjaC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gQEBzcGxpdCBsb2dpY1xucmVxdWlyZSgnLi8kLmZpeC1yZS13a3MnKSgnc3BsaXQnLCAyLCBmdW5jdGlvbihkZWZpbmVkLCBTUExJVCwgJHNwbGl0KXtcbiAgLy8gMjEuMS4zLjE3IFN0cmluZy5wcm90b3R5cGUuc3BsaXQoc2VwYXJhdG9yLCBsaW1pdClcbiAgcmV0dXJuIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gc2VwYXJhdG9yID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlcGFyYXRvcltTUExJVF07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWRcbiAgICAgID8gZm4uY2FsbChzZXBhcmF0b3IsIE8sIGxpbWl0KVxuICAgICAgOiAkc3BsaXQuY2FsbChTdHJpbmcoTyksIHNlcGFyYXRvciwgbGltaXQpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnNwbGl0LmpzXG4gKiogbW9kdWxlIGlkID0gMTM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgTElCUkFSWSAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY3R4ICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNsYXNzb2YgICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBzdHJpY3ROZXcgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byAgID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxuICAsIHNhbWUgICAgICAgPSByZXF1aXJlKCcuLyQuc2FtZS12YWx1ZScpXG4gICwgU1BFQ0lFUyAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi8kLnNwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIGFzYXAgICAgICAgPSByZXF1aXJlKCcuLyQubWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgID0gJ1Byb21pc2UnXG4gICwgcHJvY2VzcyAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgUCAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIFdyYXBwZXI7XG5cbnZhciB0ZXN0UmVzb2x2ZSA9IGZ1bmN0aW9uKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KTtcbiAgaWYoc3ViKXRlc3QuY29uc3RydWN0b3IgPSBPYmplY3Q7XG4gIHJldHVybiBQLnJlc29sdmUodGVzdCkgPT09IHRlc3Q7XG59O1xuXG52YXIgVVNFX05BVElWRSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IFAgJiYgUC5yZXNvbHZlICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn07XG52YXIgZ2V0Q29uc3RydWN0b3IgPSBmdW5jdGlvbihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSksXG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpXG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocmVjb3JkLCBpc1JlamVjdCl7XG4gIGlmKHJlY29yZC5uKXJldHVybjtcbiAgcmVjb3JkLm4gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSByZWNvcmQuYztcbiAgYXNhcChmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIgPT09IHRydWUgPyB2YWx1ZSA6IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgdmFyIHByb21pc2UgPSByZWNvcmQucFxuICAgICAgICAsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgfSwgMSk7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB2YXIgcmVjb3JkID0gcHJvbWlzZS5fZFxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHJlY29yZC5wID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICB2YXIgcmVjb3JkID0gdGhpcy5fZCA9IHtcbiAgICAgIHA6IHN0cmljdE5ldyh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgICBuOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCByZWNvcmQsIDEpLCBjdHgoJHJlamVjdCwgcmVjb3JkLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcbiAgICB9XG4gIH07XG4gIHJlcXVpcmUoJy4vJC5yZWRlZmluZS1hbGwnKShQLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIFApKVxuICAgICAgICAsIHByb21pc2UgID0gcmVhY3Rpb24ucHJvbWlzZVxuICAgICAgICAsIHJlY29yZCAgID0gdGhpcy5fZDtcbiAgICAgIHJlYWN0aW9uLm9rICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWNvcmQuYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYocmVjb3JkLnMpbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKShQLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vJC5zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vJC5jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgUCAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdFxuICAgICAgLCB2YWx1ZXMgICAgID0gW107XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zdHJpY3QtbmV3LmpzXG4gKiogbW9kdWxlIGlkID0gMTQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuZm9yLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gMTQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgU1BFQ0lFUyAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi8kLnRhc2snKS5zZXRcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICAsIHByb2Nlc3MgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgUHJvbWlzZSAgID0gZ2xvYmFsLlByb21pc2VcbiAgLCBpc05vZGUgICAgPSByZXF1aXJlKCcuLyQuY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG52YXIgZmx1c2ggPSBmdW5jdGlvbigpe1xuICB2YXIgcGFyZW50LCBkb21haW4sIGZuO1xuICBpZihpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSl7XG4gICAgcHJvY2Vzcy5kb21haW4gPSBudWxsO1xuICAgIHBhcmVudC5leGl0KCk7XG4gIH1cbiAgd2hpbGUoaGVhZCl7XG4gICAgZG9tYWluID0gaGVhZC5kb21haW47XG4gICAgZm4gICAgID0gaGVhZC5mbjtcbiAgICBpZihkb21haW4pZG9tYWluLmVudGVyKCk7XG4gICAgZm4oKTsgLy8gPC0gY3VycmVudGx5IHdlIHVzZSBpdCBvbmx5IGZvciBQcm9taXNlIC0gdHJ5IC8gY2F0Y2ggbm90IHJlcXVpcmVkXG4gICAgaWYoZG9tYWluKWRvbWFpbi5leGl0KCk7XG4gICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICBpZihwYXJlbnQpcGFyZW50LmVudGVyKCk7XG59O1xuXG4vLyBOb2RlLmpzXG5pZihpc05vZGUpe1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xuLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG59IGVsc2UgaWYoT2JzZXJ2ZXIpe1xuICB2YXIgdG9nZ2xlID0gMVxuICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAtdG9nZ2xlO1xuICB9O1xuLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2Vcbn0gZWxzZSBpZihQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSl7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmbHVzaCk7XG4gIH07XG4vLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuLy8gLSBzZXRJbW1lZGlhdGVcbi8vIC0gTWVzc2FnZUNoYW5uZWxcbi8vIC0gd2luZG93LnBvc3RNZXNzYWdcbi8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4vLyAtIHNldFRpbWVvdXRcbn0gZWxzZSB7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzYXAoZm4pe1xuICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCwgZG9tYWluOiBpc05vZGUgJiYgcHJvY2Vzcy5kb21haW59O1xuICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XG4gIGlmKCFoZWFkKXtcbiAgICBoZWFkID0gdGFzaztcbiAgICBub3RpZnkoKTtcbiAgfSBsYXN0ID0gdGFzaztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm1pY3JvdGFzay5qc1xuICoqIG1vZHVsZSBpZCA9IDE0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0bmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdG5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzXG4gKiogbW9kdWxlIGlkID0gMTQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLnJlZGVmaW5lLWFsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4xIE1hcCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanNcbiAqKiBtb2R1bGUgaWQgPSAxNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGhpZGUgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBzdHJpY3ROZXcgICAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZGVmaW5lZCAgICAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKVxuICAsIGZvck9mICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsICRpdGVyRGVmaW5lICA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSUQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdpZCcpXG4gICwgJGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0U3BlY2llcyAgID0gcmVxdWlyZSgnLi8kLnNldC1zcGVjaWVzJylcbiAgLCBERVNDUklQVE9SUyAgPSByZXF1aXJlKCcuLyQuZGVzY3JpcHRvcnMnKVxuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCBTSVpFICAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSdcbiAgLCBpZCAgICAgICAgICAgPSAwO1xuXG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoISRoYXMoaXQsIElEKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IGlkIHRvIGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG9iamVjdCBpZFxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcbiAgLy8gcmV0dXJuIG9iamVjdCBpZCB3aXRoIHByZWZpeFxuICB9IHJldHVybiAnTycgKyBpdFtJRF07XG59O1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIHN0cmljdE5ldyh0aGF0LCBDLCBOQU1FKTtcbiAgICAgIHRoYXQuX2kgPSAkLmNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpXG4gICAgICAgICAgLCBlbnRyeTtcbiAgICAgICAgd2hpbGUoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKERFU0NSSVBUT1JTKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLXN0cm9uZy5qc1xuICoqIG1vZHVsZSBpZCA9IDE0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBmb3JPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHN0cmljdE5ldyAgICAgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKVxuICAsICRpdGVyRGV0ZWN0ICAgID0gcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIHdyYXBwZXIsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKXtcbiAgdmFyIEJhc2UgID0gZ2xvYmFsW05BTUVdXG4gICAgLCBDICAgICA9IEJhc2VcbiAgICAsIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJ1xuICAgICwgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlXG4gICAgLCBPICAgICA9IHt9O1xuICB2YXIgZml4TWV0aG9kID0gZnVuY3Rpb24oS0VZKXtcbiAgICB2YXIgZm4gPSBwcm90b1tLRVldO1xuICAgIHJlZGVmaW5lKHByb3RvLCBLRVksXG4gICAgICBLRVkgPT0gJ2RlbGV0ZScgPyBmdW5jdGlvbihhKXtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpID8gZmFsc2UgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdoYXMnID8gZnVuY3Rpb24gaGFzKGEpe1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoYSl7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IHVuZGVmaW5lZCA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQoYSl7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgOiBmdW5jdGlvbiBzZXQoYSwgYil7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhLCBiKTsgcmV0dXJuIHRoaXM7IH1cbiAgICApO1xuICB9O1xuICBpZih0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnN0YW5jZSAgICAgICAgICAgICA9IG5ldyBDXG4gICAgICAvLyBlYXJseSBpbXBsZW1lbnRhdGlvbnMgbm90IHN1cHBvcnRzIGNoYWluaW5nXG4gICAgICAsIEhBU05UX0NIQUlOSU5HICAgICAgID0gaW5zdGFuY2VbQURERVJdKElTX1dFQUsgPyB7fSA6IC0wLCAxKSAhPSBpbnN0YW5jZVxuICAgICAgLy8gVjggfiAgQ2hyb21pdW0gNDAtIHdlYWstY29sbGVjdGlvbnMgdGhyb3dzIG9uIHByaW1pdGl2ZXMsIGJ1dCBzaG91bGQgcmV0dXJuIGZhbHNlXG4gICAgICAsIFRIUk9XU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24oKXsgaW5zdGFuY2UuaGFzKDEpOyB9KVxuICAgICAgLy8gbW9zdCBlYXJseSBpbXBsZW1lbnRhdGlvbnMgZG9lc24ndCBzdXBwb3J0cyBpdGVyYWJsZXMsIG1vc3QgbW9kZXJuIC0gbm90IGNsb3NlIGl0IGNvcnJlY3RseVxuICAgICAgLCBBQ0NFUFRfSVRFUkFCTEVTICAgICA9ICRpdGVyRGV0ZWN0KGZ1bmN0aW9uKGl0ZXIpeyBuZXcgQyhpdGVyKTsgfSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAgIC8vIGZvciBlYXJseSBpbXBsZW1lbnRhdGlvbnMgLTAgYW5kICswIG5vdCB0aGUgc2FtZVxuICAgICAgLCBCVUdHWV9aRVJPO1xuICAgIGlmKCFBQ0NFUFRfSVRFUkFCTEVTKXsgXG4gICAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgICAgc3RyaWN0TmV3KHRhcmdldCwgQywgTkFNRSk7XG4gICAgICAgIHZhciB0aGF0ID0gbmV3IEJhc2U7XG4gICAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfSk7XG4gICAgICBDLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgcHJvdG8uY29uc3RydWN0b3IgPSBDO1xuICAgIH1cbiAgICBJU19XRUFLIHx8IGluc3RhbmNlLmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXkpe1xuICAgICAgQlVHR1lfWkVSTyA9IDEgLyBrZXkgPT09IC1JbmZpbml0eTtcbiAgICB9KTtcbiAgICBpZihUSFJPV1NfT05fUFJJTUlUSVZFUyB8fCBCVUdHWV9aRVJPKXtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuICAgIGlmKEJVR0dZX1pFUk8gfHwgSEFTTlRfQ0hBSU5JTkcpZml4TWV0aG9kKEFEREVSKTtcbiAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIHNob3VsZCBub3QgY29udGFpbnMgLmNsZWFyIG1ldGhvZFxuICAgIGlmKElTX1dFQUsgJiYgcHJvdG8uY2xlYXIpZGVsZXRlIHByb3RvLmNsZWFyO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKEMgIT0gQmFzZSksIE8pO1xuXG4gIGlmKCFJU19XRUFLKWNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xucmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24nKSgnU2V0JywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFNldCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYuc2V0LmpzXG4gKiogbW9kdWxlIGlkID0gMTQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCByZWRlZmluZSAgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKVxuICAsIHdlYWsgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXdlYWsnKVxuICAsIGlzT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIGZyb3plblN0b3JlICA9IHdlYWsuZnJvemVuU3RvcmVcbiAgLCBXRUFLICAgICAgICAgPSB3ZWFrLldFQUtcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgdG1wICAgICAgICAgID0ge307XG5cbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXG52YXIgJFdlYWtNYXAgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdXZWFrTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjMuMy4zIFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgaWYoaXNPYmplY3Qoa2V5KSl7XG4gICAgICBpZighaXNFeHRlbnNpYmxlKGtleSkpcmV0dXJuIGZyb3plblN0b3JlKHRoaXMpLmdldChrZXkpO1xuICAgICAgaWYoaGFzKGtleSwgV0VBSykpcmV0dXJuIGtleVtXRUFLXVt0aGlzLl9pXTtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgJC5lYWNoLmNhbGwoWydkZWxldGUnLCAnaGFzJywgJ2dldCcsICdzZXQnXSwgZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgcHJvdG8gID0gJFdlYWtNYXAucHJvdG90eXBlXG4gICAgICAsIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVkZWZpbmUocHJvdG8sIGtleSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAvLyBzdG9yZSBmcm96ZW4gb2JqZWN0cyBvbiBsZWFreSBtYXBcbiAgICAgIGlmKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gZnJvemVuU3RvcmUodGhpcylba2V5XShhLCBiKTtcbiAgICAgICAgcmV0dXJuIGtleSA9PSAnc2V0JyA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICAvLyBzdG9yZSBhbGwgdGhlIHJlc3Qgb24gbmF0aXZlIHdlYWttYXBcbiAgICAgIH0gcmV0dXJuIG1ldGhvZC5jYWxsKHRoaXMsIGEsIGIpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGhpZGUgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIHJlZGVmaW5lQWxsICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lLWFsbCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIHN0cmljdE5ldyAgICAgICAgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgY3JlYXRlQXJyYXlNZXRob2QgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXG4gICwgJGhhcyAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBXRUFLICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgnd2VhaycpXG4gICwgaXNFeHRlbnNpYmxlICAgICAgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgYXJyYXlGaW5kICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg1KVxuICAsIGFycmF5RmluZEluZGV4ICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNilcbiAgLCBpZCAgICAgICAgICAgICAgICA9IDA7XG5cbi8vIGZhbGxiYWNrIGZvciBmcm96ZW4ga2V5c1xudmFyIGZyb3plblN0b3JlID0gZnVuY3Rpb24odGhhdCl7XG4gIHJldHVybiB0aGF0Ll9sIHx8ICh0aGF0Ll9sID0gbmV3IEZyb3plblN0b3JlKTtcbn07XG52YXIgRnJvemVuU3RvcmUgPSBmdW5jdGlvbigpe1xuICB0aGlzLmEgPSBbXTtcbn07XG52YXIgZmluZEZyb3plbiA9IGZ1bmN0aW9uKHN0b3JlLCBrZXkpe1xuICByZXR1cm4gYXJyYXlGaW5kKHN0b3JlLmEsIGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgfSk7XG59O1xuRnJvemVuU3RvcmUucHJvdG90eXBlID0ge1xuICBnZXQ6IGZ1bmN0aW9uKGtleSl7XG4gICAgdmFyIGVudHJ5ID0gZmluZEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmKGVudHJ5KXJldHVybiBlbnRyeVsxXTtcbiAgfSxcbiAgaGFzOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiAhIWZpbmRGcm96ZW4odGhpcywga2V5KTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBmaW5kRnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYoZW50cnkpZW50cnlbMV0gPSB2YWx1ZTtcbiAgICBlbHNlIHRoaXMuYS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0sXG4gICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBpbmRleCA9IGFycmF5RmluZEluZGV4KHRoaXMuYSwgZnVuY3Rpb24oaXQpe1xuICAgICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gICAgfSk7XG4gICAgaWYofmluZGV4KXRoaXMuYS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiAhIX5pbmRleDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgc3RyaWN0TmV3KHRoYXQsIEMsIE5BTUUpO1xuICAgICAgdGhhdC5faSA9IGlkKys7ICAgICAgLy8gY29sbGVjdGlvbiBpZFxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgLy8gbGVhayBzdG9yZSBmb3IgZnJvemVuIG9iamVjdHNcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjMuMy4yIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy40LjMuMyBXZWFrU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNFeHRlbnNpYmxlKGtleSkpcmV0dXJuIGZyb3plblN0b3JlKHRoaXMpWydkZWxldGUnXShrZXkpO1xuICAgICAgICByZXR1cm4gJGhhcyhrZXksIFdFQUspICYmICRoYXMoa2V5W1dFQUtdLCB0aGlzLl9pKSAmJiBkZWxldGUga2V5W1dFQUtdW3RoaXMuX2ldO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjMuMy40IFdlYWtNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy40LjMuNCBXZWFrU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICBpZighaXNPYmplY3Qoa2V5KSlyZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFpc0V4dGVuc2libGUoa2V5KSlyZXR1cm4gZnJvemVuU3RvcmUodGhpcykuaGFzKGtleSk7XG4gICAgICAgIHJldHVybiAkaGFzKGtleSwgV0VBSykgJiYgJGhhcyhrZXlbV0VBS10sIHRoaXMuX2kpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFpc0V4dGVuc2libGUoYW5PYmplY3Qoa2V5KSkpe1xuICAgICAgZnJvemVuU3RvcmUodGhhdCkuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkaGFzKGtleSwgV0VBSykgfHwgaGlkZShrZXksIFdFQUssIHt9KTtcbiAgICAgIGtleVtXRUFLXVt0aGF0Ll9pXSA9IHZhbHVlO1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGZyb3plblN0b3JlOiBmcm96ZW5TdG9yZSxcbiAgV0VBSzogV0VBS1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi13ZWFrLmpzXG4gKiogbW9kdWxlIGlkID0gMTUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgd2VhayA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXdlYWsnKTtcblxuLy8gMjMuNCBXZWFrU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ1dlYWtTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gV2Vha1NldCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuNC4zLjEgV2Vha1NldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHdlYWsuZGVmKHRoaXMsIHZhbHVlLCB0cnVlKTtcbiAgfVxufSwgd2VhaywgZmFsc2UsIHRydWUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LndlYWstc2V0LmpzXG4gKiogbW9kdWxlIGlkID0gMTUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyNi4xLjEgUmVmbGVjdC5hcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgX2FwcGx5ICA9IEZ1bmN0aW9uLmFwcGx5O1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGFwcGx5OiBmdW5jdGlvbiBhcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCl7XG4gICAgcmV0dXJuIF9hcHBseS5jYWxsKHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5hcHBseS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjYuMS4yIFJlZmxlY3QuY29uc3RydWN0KHRhcmdldCwgYXJndW1lbnRzTGlzdCBbLCBuZXdUYXJnZXRdKVxudmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKVxuICAsIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGlzT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGJpbmQgICAgICA9IEZ1bmN0aW9uLmJpbmQgfHwgcmVxdWlyZSgnLi8kLmNvcmUnKS5GdW5jdGlvbi5wcm90b3R5cGUuYmluZDtcblxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIEYoKXt9XG4gIHJldHVybiAhKFJlZmxlY3QuY29uc3RydWN0KGZ1bmN0aW9uKCl7fSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmKFRhcmdldCA9PSBuZXdUYXJnZXQpe1xuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBvcHRpbWl6YXRpb24gZm9yIDAtNCBhcmd1bWVudHNcbiAgICAgIGlmKGFyZ3MgIT0gdW5kZWZpbmVkKXN3aXRjaChhbk9iamVjdChhcmdzKS5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0O1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0pO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICBjYXNlIDQ6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgICAgfVxuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBsb3Qgb2YgYXJndW1lbnRzIGNhc2VcbiAgICAgIHZhciAkYXJncyA9IFtudWxsXTtcbiAgICAgICRhcmdzLnB1c2guYXBwbHkoJGFyZ3MsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG5ldyAoYmluZC5hcHBseShUYXJnZXQsICRhcmdzKSk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byAgICA9IG5ld1RhcmdldC5wcm90b3R5cGVcbiAgICAgICwgaW5zdGFuY2UgPSAkLmNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAsIHJlc3VsdCAgID0gRnVuY3Rpb24uYXBwbHkuY2FsbChUYXJnZXQsIGluc3RhbmNlLCBhcmdzKTtcbiAgICByZXR1cm4gaXNPYmplY3QocmVzdWx0KSA/IHJlc3VsdCA6IGluc3RhbmNlO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmNvbnN0cnVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjYuMS4zIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcylcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGV4cG9ydCAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcblxuLy8gTVMgRWRnZSBoYXMgYnJva2VuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkgLSB0aHJvd2luZyBpbnN0ZWFkIG9mIHJldHVybmluZyBmYWxzZVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICBSZWZsZWN0LmRlZmluZVByb3BlcnR5KCQuc2V0RGVzYyh7fSwgMSwge3ZhbHVlOiAxfSksIDEsIHt2YWx1ZTogMn0pO1xufSksICdSZWZsZWN0Jywge1xuICBkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgJC5zZXREZXNjKHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gMTU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyNi4xLjQgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHZhciBkZXNjID0gZ2V0RGVzYyhhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gICAgcmV0dXJuIGRlc2MgJiYgIWRlc2MuY29uZmlndXJhYmxlID8gZmFsc2UgOiBkZWxldGUgdGFyZ2V0W3Byb3BlcnR5S2V5XTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5kZWxldGUtcHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSAxNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDI2LjEuNSBSZWZsZWN0LmVudW1lcmF0ZSh0YXJnZXQpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBFbnVtZXJhdGUgPSBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBhbk9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHZhciBrZXlzID0gdGhpcy5fayA9IFtdICAgICAgIC8vIGtleXNcbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBpdGVyYXRlZClrZXlzLnB1c2goa2V5KTtcbn07XG5yZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKShFbnVtZXJhdGUsICdPYmplY3QnLCBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCA9IHRoaXNcbiAgICAsIGtleXMgPSB0aGF0Ll9rXG4gICAgLCBrZXk7XG4gIGRvIHtcbiAgICBpZih0aGF0Ll9pID49IGtleXMubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1t0aGF0Ll9pKytdKSBpbiB0aGF0Ll90KSk7XG4gIHJldHVybiB7dmFsdWU6IGtleSwgZG9uZTogZmFsc2V9O1xufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KXtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZSh0YXJnZXQpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmVudW1lcmF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjYuMS42IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkgWywgcmVjZWl2ZXJdKVxudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsICRleHBvcnQgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcblxuZnVuY3Rpb24gZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkvKiwgcmVjZWl2ZXIqLyl7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdXG4gICAgLCBkZXNjLCBwcm90bztcbiAgaWYoYW5PYmplY3QodGFyZ2V0KSA9PT0gcmVjZWl2ZXIpcmV0dXJuIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIGlmKGRlc2MgPSAkLmdldERlc2ModGFyZ2V0LCBwcm9wZXJ0eUtleSkpcmV0dXJuIGhhcyhkZXNjLCAndmFsdWUnKVxuICAgID8gZGVzYy52YWx1ZVxuICAgIDogZGVzYy5nZXQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmKGlzT2JqZWN0KHByb3RvID0gJC5nZXRQcm90byh0YXJnZXQpKSlyZXR1cm4gZ2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgcmVjZWl2ZXIpO1xufVxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7Z2V0OiBnZXR9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjYuMS43IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRleHBvcnQgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuICQuZ2V0RGVzYyhhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyNi4xLjggUmVmbGVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBnZXRQcm90byA9IHJlcXVpcmUoJy4vJCcpLmdldFByb3RvXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZ2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKHRhcmdldCl7XG4gICAgcmV0dXJuIGdldFByb3RvKGFuT2JqZWN0KHRhcmdldCkpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSAxNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDI2LjEuOSBSZWZsZWN0Lmhhcyh0YXJnZXQsIHByb3BlcnR5S2V5KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgaGFzOiBmdW5jdGlvbiBoYXModGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuIHByb3BlcnR5S2V5IGluIHRhcmdldDtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5oYXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxudmFyICRleHBvcnQgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBhbk9iamVjdCAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgaXNFeHRlbnNpYmxlOiBmdW5jdGlvbiBpc0V4dGVuc2libGUodGFyZ2V0KXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHJldHVybiAkaXNFeHRlbnNpYmxlID8gJGlzRXh0ZW5zaWJsZSh0YXJnZXQpIDogdHJ1ZTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5pcy1leHRlbnNpYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyNi4xLjExIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge293bktleXM6IHJlcXVpcmUoJy4vJC5vd24ta2V5cycpfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5vd24ta2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDE2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIFJlZmxlY3QgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLlJlZmxlY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IFJlZmxlY3QgJiYgUmVmbGVjdC5vd25LZXlzIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpe1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0TmFtZXMoYW5PYmplY3QoaXQpKVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgcmV0dXJuIGdldFN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQub3duLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDI2LjEuMTIgUmVmbGVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpXG52YXIgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgJHByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpe1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmKCRwcmV2ZW50RXh0ZW5zaW9ucykkcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDE2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMjYuMS4xMyBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3BlcnR5S2V5LCBWIFssIHJlY2VpdmVyXSlcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBoYXMgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgYW5PYmplY3QgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIHNldCh0YXJnZXQsIHByb3BlcnR5S2V5LCBWLyosIHJlY2VpdmVyKi8pe1xuICB2YXIgcmVjZWl2ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDwgNCA/IHRhcmdldCA6IGFyZ3VtZW50c1szXVxuICAgICwgb3duRGVzYyAgPSAkLmdldERlc2MoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpXG4gICAgLCBleGlzdGluZ0Rlc2NyaXB0b3IsIHByb3RvO1xuICBpZighb3duRGVzYyl7XG4gICAgaWYoaXNPYmplY3QocHJvdG8gPSAkLmdldFByb3RvKHRhcmdldCkpKXtcbiAgICAgIHJldHVybiBzZXQocHJvdG8sIHByb3BlcnR5S2V5LCBWLCByZWNlaXZlcik7XG4gICAgfVxuICAgIG93bkRlc2MgPSBjcmVhdGVEZXNjKDApO1xuICB9XG4gIGlmKGhhcyhvd25EZXNjLCAndmFsdWUnKSl7XG4gICAgaWYob3duRGVzYy53cml0YWJsZSA9PT0gZmFsc2UgfHwgIWlzT2JqZWN0KHJlY2VpdmVyKSlyZXR1cm4gZmFsc2U7XG4gICAgZXhpc3RpbmdEZXNjcmlwdG9yID0gJC5nZXREZXNjKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSkgfHwgY3JlYXRlRGVzYygwKTtcbiAgICBleGlzdGluZ0Rlc2NyaXB0b3IudmFsdWUgPSBWO1xuICAgICQuc2V0RGVzYyhyZWNlaXZlciwgcHJvcGVydHlLZXksIGV4aXN0aW5nRGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG93bkRlc2Muc2V0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IChvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLCBWKSwgdHJ1ZSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtzZXQ6IHNldH0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LmpzXG4gKiogbW9kdWxlIGlkID0gMTY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAyNi4xLjE0IFJlZmxlY3Quc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90bylcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHNldFByb3RvID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpO1xuXG5pZihzZXRQcm90bykkZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIHNldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgICBzZXRQcm90by5jaGVjayh0YXJnZXQsIHByb3RvKTtcbiAgICB0cnkge1xuICAgICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZG9tZW5pYy9BcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJykoJ2luY2x1ZGVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgJGF0ICAgICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIGF0OiBmdW5jdGlvbiBhdChwb3Mpe1xuICAgIHJldHVybiAkYXQodGhpcywgcG9zKTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmF0LmpzXG4gKiogbW9kdWxlIGlkID0gMTY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsICRwYWQgICAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgcGFkTGVmdDogZnVuY3Rpb24gcGFkTGVmdChtYXhMZW5ndGggLyosIGZpbGxTdHJpbmcgPSAnICcgKi8pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIHRydWUpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLWxlZnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvcHJvcG9zYWwtc3RyaW5nLXBhZC1sZWZ0LXJpZ2h0XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCByZXBlYXQgICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctcmVwZWF0JylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgbWF4TGVuZ3RoLCBmaWxsU3RyaW5nLCBsZWZ0KXtcbiAgdmFyIFMgICAgICAgICAgICA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICwgc3RyaW5nTGVuZ3RoID0gUy5sZW5ndGhcbiAgICAsIGZpbGxTdHIgICAgICA9IGZpbGxTdHJpbmcgPT09IHVuZGVmaW5lZCA/ICcgJyA6IFN0cmluZyhmaWxsU3RyaW5nKVxuICAgICwgaW50TWF4TGVuZ3RoID0gdG9MZW5ndGgobWF4TGVuZ3RoKTtcbiAgaWYoaW50TWF4TGVuZ3RoIDw9IHN0cmluZ0xlbmd0aClyZXR1cm4gUztcbiAgaWYoZmlsbFN0ciA9PSAnJylmaWxsU3RyID0gJyAnO1xuICB2YXIgZmlsbExlbiA9IGludE1heExlbmd0aCAtIHN0cmluZ0xlbmd0aFxuICAgICwgc3RyaW5nRmlsbGVyID0gcmVwZWF0LmNhbGwoZmlsbFN0ciwgTWF0aC5jZWlsKGZpbGxMZW4gLyBmaWxsU3RyLmxlbmd0aCkpO1xuICBpZihzdHJpbmdGaWxsZXIubGVuZ3RoID4gZmlsbExlbilzdHJpbmdGaWxsZXIgPSBzdHJpbmdGaWxsZXIuc2xpY2UoMCwgZmlsbExlbik7XG4gIHJldHVybiBsZWZ0ID8gc3RyaW5nRmlsbGVyICsgUyA6IFMgKyBzdHJpbmdGaWxsZXI7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcGFkLmpzXG4gKiogbW9kdWxlIGlkID0gMTcxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsICRwYWQgICAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgcGFkUmlnaHQ6IGZ1bmN0aW9uIHBhZFJpZ2h0KG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgZmFsc2UpO1xuICB9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcucGFkLXJpZ2h0LmpzXG4gKiogbW9kdWxlIGlkID0gMTcyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2VibWFya2JhZ2UvZWNtYXNjcmlwdC1zdHJpbmctbGVmdC1yaWdodC10cmltXG5yZXF1aXJlKCcuLyQuc3RyaW5nLXRyaW0nKSgndHJpbUxlZnQnLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltTGVmdCgpe1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAxKTtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy50cmltLWxlZnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWJtYXJrYmFnZS9lY21hc2NyaXB0LXN0cmluZy1sZWZ0LXJpZ2h0LXRyaW1cbnJlcXVpcmUoJy4vJC5zdHJpbmctdHJpbScpKCd0cmltUmlnaHQnLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltUmlnaHQoKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMik7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcudHJpbS1yaWdodC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JlbmphbWluZ3IvUmV4RXhwLmVzY2FwZVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCAkcmUgICAgID0gcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL1tcXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVnRXhwJywge2VzY2FwZTogZnVuY3Rpb24gZXNjYXBlKGl0KXsgcmV0dXJuICRyZShpdCk7IH19KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZ2V4cC5lc2NhcGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmVnRXhwLCByZXBsYWNlKXtcbiAgdmFyIHJlcGxhY2VyID0gcmVwbGFjZSA9PT0gT2JqZWN0KHJlcGxhY2UpID8gZnVuY3Rpb24ocGFydCl7XG4gICAgcmV0dXJuIHJlcGxhY2VbcGFydF07XG4gIH0gOiByZXBsYWNlO1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBTdHJpbmcoaXQpLnJlcGxhY2UocmVnRXhwLCByZXBsYWNlcik7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5yZXBsYWNlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE3NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi85MzUzNzgxXG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIG93bktleXMgICAgPSByZXF1aXJlKCcuLyQub3duLWtleXMnKVxuICAsIHRvSU9iamVjdCAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iamVjdCl7XG4gICAgdmFyIE8gICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICAgLCBzZXREZXNjID0gJC5zZXREZXNjXG4gICAgICAsIGdldERlc2MgPSAkLmdldERlc2NcbiAgICAgICwga2V5cyAgICA9IG93bktleXMoTylcbiAgICAgICwgcmVzdWx0ICA9IHt9XG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleSwgRDtcbiAgICB3aGlsZShrZXlzLmxlbmd0aCA+IGkpe1xuICAgICAgRCA9IGdldERlc2MoTywga2V5ID0ga2V5c1tpKytdKTtcbiAgICAgIGlmKGtleSBpbiByZXN1bHQpc2V0RGVzYyhyZXN1bHQsIGtleSwgY3JlYXRlRGVzYygwLCBEKSk7XG4gICAgICBlbHNlIHJlc3VsdFtrZXldID0gRDtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMTc3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwOi8vZ29vLmdsL1hrQnJqRFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCAkdmFsdWVzID0gcmVxdWlyZSgnLi8kLm9iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KXtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCBpc0VudW0gICAgPSAkLmlzRW51bTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KGl0KVxuICAgICAgLCBrZXlzICAgPSAkLmdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKXtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy8kLm9iamVjdC10by1hcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL2dvby5nbC9Ya0JyakRcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsICRlbnRyaWVzID0gcmVxdWlyZSgnLi8kLm9iamVjdC10by1hcnJheScpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhpdCl7XG4gICAgcmV0dXJuICRlbnRyaWVzKGl0KTtcbiAgfVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxODBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdNYXAnLCB7dG9KU09OOiByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxODFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBmb3JPZiAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgY2xhc3NvZiA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGZvck9mKHRoaXMsIGZhbHNlLCBhcnIucHVzaCwgYXJyKTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi10by1qc29uLmpzXG4gKiogbW9kdWxlIGlkID0gMTgyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU2V0Jywge3RvSlNPTjogcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzXG4gKiogbW9kdWxlIGlkID0gMTgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBKYXZhU2NyaXB0IDEuNiAvIFN0cmF3bWFuIGFycmF5IHN0YXRpY3Mgc2hpbVxudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCAkY3R4ICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJEFycmF5ICA9IHJlcXVpcmUoJy4vJC5jb3JlJykuQXJyYXkgfHwgQXJyYXlcbiAgLCBzdGF0aWNzID0ge307XG52YXIgc2V0U3RhdGljcyA9IGZ1bmN0aW9uKGtleXMsIGxlbmd0aCl7XG4gICQuZWFjaC5jYWxsKGtleXMuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICBpZihsZW5ndGggPT0gdW5kZWZpbmVkICYmIGtleSBpbiAkQXJyYXkpc3RhdGljc1trZXldID0gJEFycmF5W2tleV07XG4gICAgZWxzZSBpZihrZXkgaW4gW10pc3RhdGljc1trZXldID0gJGN0eChGdW5jdGlvbi5jYWxsLCBbXVtrZXldLCBsZW5ndGgpO1xuICB9KTtcbn07XG5zZXRTdGF0aWNzKCdwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzJywgMSk7XG5zZXRTdGF0aWNzKCdpbmRleE9mLGV2ZXJ5LHNvbWUsZm9yRWFjaCxtYXAsZmlsdGVyLGZpbmQsZmluZEluZGV4LGluY2x1ZGVzJywgMyk7XG5zZXRTdGF0aWNzKCdqb2luLHNsaWNlLGNvbmNhdCxwdXNoLHNwbGljZSx1bnNoaWZ0LHNvcnQsbGFzdEluZGV4T2YsJyArXG4gICAgICAgICAgICdyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsJyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ0FycmF5Jywgc3RhdGljcyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy9qcy5hcnJheS5zdGF0aWNzLmpzXG4gKiogbW9kdWxlIGlkID0gMTg0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBpZTktIHNldFRpbWVvdXQgJiBzZXRJbnRlcnZhbCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZml4XG52YXIgZ2xvYmFsICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsICRleHBvcnQgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBpbnZva2UgICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgcGFydGlhbCAgICA9IHJlcXVpcmUoJy4vJC5wYXJ0aWFsJylcbiAgLCBuYXZpZ2F0b3IgID0gZ2xvYmFsLm5hdmlnYXRvclxuICAsIE1TSUUgICAgICAgPSAhIW5hdmlnYXRvciAmJiAvTVNJRSAuXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpOyAvLyA8LSBkaXJ0eSBpZTktIGNoZWNrXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHNldCl7XG4gIHJldHVybiBNU0lFID8gZnVuY3Rpb24oZm4sIHRpbWUgLyosIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBzZXQoaW52b2tlKFxuICAgICAgcGFydGlhbCxcbiAgICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgIHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbilcbiAgICApLCB0aW1lKTtcbiAgfSA6IHNldDtcbn07XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiArICRleHBvcnQuRiAqIE1TSUUsIHtcbiAgc2V0VGltZW91dDogIHdyYXAoZ2xvYmFsLnNldFRpbWVvdXQpLFxuICBzZXRJbnRlcnZhbDogd3JhcChnbG9iYWwuc2V0SW50ZXJ2YWwpXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL3dlYi50aW1lcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxODVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXRoICAgICAgPSByZXF1aXJlKCcuLyQucGF0aCcpXG4gICwgaW52b2tlICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oLyogLi4ucGFyZ3MgKi8pe1xuICB2YXIgZm4gICAgID0gYUZ1bmN0aW9uKHRoaXMpXG4gICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBwYXJncyAgPSBBcnJheShsZW5ndGgpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBfICAgICAgPSBwYXRoLl9cbiAgICAsIGhvbGRlciA9IGZhbHNlO1xuICB3aGlsZShsZW5ndGggPiBpKWlmKChwYXJnc1tpXSA9IGFyZ3VtZW50c1tpKytdKSA9PT0gXylob2xkZXIgPSB0cnVlO1xuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICAgLCAkJGxlbiA9ICQkLmxlbmd0aFxuICAgICAgLCBqID0gMCwgayA9IDAsIGFyZ3M7XG4gICAgaWYoIWhvbGRlciAmJiAhJCRsZW4pcmV0dXJuIGludm9rZShmbiwgcGFyZ3MsIHRoYXQpO1xuICAgIGFyZ3MgPSBwYXJncy5zbGljZSgpO1xuICAgIGlmKGhvbGRlcilmb3IoO2xlbmd0aCA+IGo7IGorKylpZihhcmdzW2pdID09PSBfKWFyZ3Nbal0gPSAkJFtrKytdO1xuICAgIHdoaWxlKCQkbGVuID4gaylhcmdzLnB1c2goJCRbaysrXSk7XG4gICAgcmV0dXJuIGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLWNvcmUvfi9jb3JlLWpzL21vZHVsZXMvJC5wYXJ0aWFsLmpzXG4gKiogbW9kdWxlIGlkID0gMTg2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzLyQucGF0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDE4N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCAkdGFzayAgID0gcmVxdWlyZSgnLi8kLnRhc2snKTtcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5CLCB7XG4gIHNldEltbWVkaWF0ZTogICAkdGFzay5zZXQsXG4gIGNsZWFySW1tZWRpYXRlOiAkdGFzay5jbGVhclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMTg4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgSXRlcmF0b3JzICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIE5MICAgICAgICAgID0gZ2xvYmFsLk5vZGVMaXN0XG4gICwgSFRDICAgICAgICAgPSBnbG9iYWwuSFRNTENvbGxlY3Rpb25cbiAgLCBOTFByb3RvICAgICA9IE5MICYmIE5MLnByb3RvdHlwZVxuICAsIEhUQ1Byb3RvICAgID0gSFRDICYmIEhUQy5wcm90b3R5cGVcbiAgLCBBcnJheVZhbHVlcyA9IEl0ZXJhdG9ycy5Ob2RlTGlzdCA9IEl0ZXJhdG9ycy5IVE1MQ29sbGVjdGlvbiA9IEl0ZXJhdG9ycy5BcnJheTtcbmlmKE5MUHJvdG8gJiYgIU5MUHJvdG9bSVRFUkFUT1JdKWhpZGUoTkxQcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbmlmKEhUQ1Byb3RvICYmICFIVENQcm90b1tJVEVSQVRPUl0paGlkZShIVENQcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1jb3JlL34vY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxODlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID1cbiAgICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudGAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuIFNvbWUgbWF5IGNvbnNpZGVyIHRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIHRvb1xuICAvLyBjdXRlc3ksIGJ1dCB0aGV5IGFyZSBjdXJtdWRnZW9ucy5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIC8vIFRoaXMgaW52b2tlIGZ1bmN0aW9uIGlzIHdyaXR0ZW4gaW4gYSBzdHlsZSB0aGF0IGFzc3VtZXMgc29tZVxuICAgIC8vIGNhbGxpbmcgZnVuY3Rpb24gKG9yIFByb21pc2UpIHdpbGwgaGFuZGxlIGV4Y2VwdGlvbnMuXG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW21ldGhvZF0oYXJnKTtcbiAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUodmFsdWUuYXJnKS50aGVuKGludm9rZU5leHQsIGludm9rZVRocm93KVxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIHJlc29sdmUoY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIiB8fFxuICAgICAgICAgICAgICAobWV0aG9kID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSxcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yLFxuICAgICAgICAgICAgYXJnXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTGlrZSByZXR1cm5pbmcgZ2VuZXJhdG9yLnRocm93KHVuY2F1Z2h0KSwgYnV0IHdpdGhvdXQgdGhlXG4gICAgICAgICAgICAvLyBvdmVyaGVhZCBvZiBhbiBleHRyYSBmdW5jdGlvbiBjYWxsLlxuICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGVnYXRlIGdlbmVyYXRvciByYW4gYW5kIGhhbmRsZWQgaXRzIG93biBleGNlcHRpb25zIHNvXG4gICAgICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IHRoZSBtZXRob2Qgd2FzLCB3ZSBjb250aW51ZSBhcyBpZiBpdCBpc1xuICAgICAgICAgIC8vIFwibmV4dFwiIHdpdGggYW4gdW5kZWZpbmVkIGFyZy5cbiAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGVsZWdhdGUgJiYgbWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICB0aGlzLnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAvLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3RcbiAgLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzXG4pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtY29yZS9+L3JlZ2VuZXJhdG9yL3J1bnRpbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE5MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vbWFpbi5zdHlsXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9tYWluLnN0eWxcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEuLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vbWFpbi5zdHlsXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL21haW4uc3R5bFxuICoqIG1vZHVsZSBpZCA9IDE5MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLFxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc3R5bHVzLWxvYWRlciEuL3NyYy9tYWluLnN0eWxcbiAqKiBtb2R1bGUgaWQgPSAxOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuZ3VpJylcbm1vZHVsZS5leHBvcnRzLmNvbG9yID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0LmNvbG9yJylcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kYXQtZ3VpL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTk2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBkYXQgPSBtb2R1bGUuZXhwb3J0cyA9IGRhdCB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5ndWkgPSBkYXQuZ3VpIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LnV0aWxzID0gZGF0LnV0aWxzIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbnRyb2xsZXJzID0gZGF0LmNvbnRyb2xsZXJzIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmRvbSA9IGRhdC5kb20gfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29sb3IgPSBkYXQuY29sb3IgfHwge307XG5cbmRhdC51dGlscy5jc3MgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIGxvYWQ6IGZ1bmN0aW9uICh1cmwsIGRvYykge1xuICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuICAgICAgdmFyIGxpbmsgPSBkb2MuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSxcbiAgICBpbmplY3Q6IGZ1bmN0aW9uKGNzcywgZG9jKSB7XG4gICAgICBkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG4gICAgICB2YXIgaW5qZWN0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgaW5qZWN0ZWQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBpbmplY3RlZC5pbm5lckhUTUwgPSBjc3M7XG4gICAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChpbmplY3RlZCk7XG4gICAgfVxuICB9XG59KSgpO1xuXG5cbmRhdC51dGlscy5jb21tb24gPSAoZnVuY3Rpb24gKCkge1xuICBcbiAgdmFyIEFSUl9FQUNIID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG4gIHZhciBBUlJfU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIEJhbmQtYWlkIG1ldGhvZHMgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBhIGxvdCBlYXNpZXIgaW4gSmF2YVNjcmlwdC5cbiAgICogSW1wbGVtZW50YXRpb24gYW5kIHN0cnVjdHVyZSBpbnNwaXJlZCBieSB1bmRlcnNjb3JlLmpzXG4gICAqIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5jb20vdW5kZXJzY29yZS9cbiAgICovXG5cbiAgcmV0dXJuIHsgXG4gICAgXG4gICAgQlJFQUs6IHt9LFxuICBcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICghdGhpcy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmYXVsdHM6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICh0aGlzLmlzVW5kZWZpbmVkKHRhcmdldFtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIFxuICAgIH0sXG4gICAgXG4gICAgY29tcG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9DYWxsID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdG9DYWxsLmxlbmd0aCAtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gW3RvQ2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBlYWNoOiBmdW5jdGlvbihvYmosIGl0ciwgc2NvcGUpIHtcblxuICAgICAgXG4gICAgICBpZiAoQVJSX0VBQ0ggJiYgb2JqLmZvckVhY2ggPT09IEFSUl9FQUNIKSB7IFxuICAgICAgICBcbiAgICAgICAgb2JqLmZvckVhY2goaXRyLCBzY29wZSk7XG4gICAgICAgIFxuICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSBvYmoubGVuZ3RoICsgMCkgeyAvLyBJcyBudW1iZXIgYnV0IG5vdCBOYU5cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBrZXkgPCBsOyBrZXkrKylcbiAgICAgICAgICBpZiAoa2V5IGluIG9iaiAmJiBpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIFxuICAgICAgICAgIGlmIChpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmZXI6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgc2V0VGltZW91dChmbmMsIDApO1xuICAgIH0sXG4gICAgXG4gICAgdG9BcnJheTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqLnRvQXJyYXkpIHJldHVybiBvYmoudG9BcnJheSgpO1xuICAgICAgcmV0dXJuIEFSUl9TTElDRS5jYWxsKG9iaik7XG4gICAgfSxcblxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVsbDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICAgIH0sXG4gICAgXG4gICAgaXNOYU46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gb2JqO1xuICAgIH0sXG4gICAgXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmouY29uc3RydWN0b3IgPT09IEFycmF5O1xuICAgIH0sXG4gICAgXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcbiAgICBcbiAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorMDtcbiAgICB9LFxuICAgIFxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaisnJztcbiAgICB9LFxuICAgIFxuICAgIGlzQm9vbGVhbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBmYWxzZSB8fCBvYmogPT09IHRydWU7XG4gICAgfSxcbiAgICBcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG4gIFxuICB9O1xuICAgIFxufSkoKTtcblxuXG5kYXQuY29udHJvbGxlcnMuQ29udHJvbGxlciA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBBbiBcImFic3RyYWN0XCIgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICB0aGlzLmluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICAvKipcbiAgICAgKiBUaG9zZSB3aG8gZXh0ZW5kIHRoaXMgY2xhc3Mgd2lsbCBwdXQgdGhlaXIgRE9NIGVsZW1lbnRzIGluIGhlcmUuXG4gICAgICogQHR5cGUge0RPTUVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb2JqZWN0IHRvIG1hbmlwdWxhdGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIG1hbmlwdWxhdGVcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gY2hhbmdlLlxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX29uQ2hhbmdlID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBmaW5pc2hpbmcgY2hhbmdlLlxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gdW5kZWZpbmVkO1xuXG4gIH07XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIucHJvdG90eXBlICovXG4gICAgICB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgdGhhdCBhIGZ1bmN0aW9uIGZpcmUgZXZlcnkgdGltZSBzb21lb25lIGNoYW5nZXMgdGhlIHZhbHVlIHdpdGhcbiAgICAgICAgICogdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgdmFsdWVcbiAgICAgICAgICogaXMgbW9kaWZpZWQgdmlhIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm5jKSB7XG4gICAgICAgICAgdGhpcy5fX29uQ2hhbmdlID0gZm5jO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmdcbiAgICAgICAgICogdGhlIHZhbHVlIHdpaCB0aGlzIENvbnRyb2xsZXIuIFVzZWZ1bCBmb3IgdmFsdWVzIHRoYXQgY2hhbmdlXG4gICAgICAgICAqIGluY3JlbWVudGFsbHkgbGlrZSBudW1iZXJzIG9yIHN0cmluZ3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyXG4gICAgICAgICAqIHNvbWVvbmUgXCJmaW5pc2hlc1wiIGNoYW5naW5nIHRoZSB2YWx1ZSB2aWEgdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG9uRmluaXNoQ2hhbmdlOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSBmbmM7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoYW5nZSB0aGUgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG5ld1ZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICovXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldID0gbmV3VmFsdWU7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcywgbmV3VmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gVGhlIGN1cnJlbnQgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICovXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZnJlc2hlcyB0aGUgdmlzdWFsIGRpc3BsYXkgb2YgYSBDb250cm9sbGVyIGluIG9yZGVyIHRvIGtlZXAgc3luY1xuICAgICAgICAgKiB3aXRoIHRoZSBvYmplY3QncyBjdXJyZW50IHZhbHVlLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgdmFsdWUgaGFzIGRldmlhdGVkIGZyb20gaW5pdGlhbFZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICBpc01vZGlmaWVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsVmFsdWUgIT09IHRoaXMuZ2V0VmFsdWUoKVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBDb250cm9sbGVyO1xuXG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5kb20uZG9tID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICB2YXIgRVZFTlRfTUFQID0ge1xuICAgICdIVE1MRXZlbnRzJzogWydjaGFuZ2UnXSxcbiAgICAnTW91c2VFdmVudHMnOiBbJ2NsaWNrJywnbW91c2Vtb3ZlJywnbW91c2Vkb3duJywnbW91c2V1cCcsICdtb3VzZW92ZXInXSxcbiAgICAnS2V5Ym9hcmRFdmVudHMnOiBbJ2tleWRvd24nXVxuICB9O1xuXG4gIHZhciBFVkVOVF9NQVBfSU5WID0ge307XG4gIGNvbW1vbi5lYWNoKEVWRU5UX01BUCwgZnVuY3Rpb24odiwgaykge1xuICAgIGNvbW1vbi5lYWNoKHYsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIEVWRU5UX01BUF9JTlZbZV0gPSBrO1xuICAgIH0pO1xuICB9KTtcblxuICB2YXIgQ1NTX1ZBTFVFX1BJWEVMUyA9IC8oXFxkKyhcXC5cXGQrKT8pcHgvO1xuXG4gIGZ1bmN0aW9uIGNzc1ZhbHVlVG9QaXhlbHModmFsKSB7XG5cbiAgICBpZiAodmFsID09PSAnMCcgfHwgY29tbW9uLmlzVW5kZWZpbmVkKHZhbCkpIHJldHVybiAwO1xuXG4gICAgdmFyIG1hdGNoID0gdmFsLm1hdGNoKENTU19WQUxVRV9QSVhFTFMpO1xuXG4gICAgaWYgKCFjb21tb24uaXNOdWxsKG1hdGNoKSkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICAgIH1cblxuICAgIC8vIFRPRE8gLi4uZW1zPyAlP1xuXG4gICAgcmV0dXJuIDA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqIEBtZW1iZXIgZGF0LmRvbVxuICAgKi9cbiAgdmFyIGRvbSA9IHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIHNlbGVjdGFibGVcbiAgICAgKi9cbiAgICBtYWtlU2VsZWN0YWJsZTogZnVuY3Rpb24oZWxlbSwgc2VsZWN0YWJsZSkge1xuXG4gICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkIHx8IGVsZW0uc3R5bGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICBlbGVtLm9uc2VsZWN0c3RhcnQgPSBzZWxlY3RhYmxlID8gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gOiBmdW5jdGlvbigpIHtcbiAgICAgIH07XG5cbiAgICAgIGVsZW0uc3R5bGUuTW96VXNlclNlbGVjdCA9IHNlbGVjdGFibGUgPyAnYXV0bycgOiAnbm9uZSc7XG4gICAgICBlbGVtLnN0eWxlLktodG1sVXNlclNlbGVjdCA9IHNlbGVjdGFibGUgPyAnYXV0bycgOiAnbm9uZSc7XG4gICAgICBlbGVtLnVuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUgPyAnb24nIDogJ29mZic7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBob3Jpem9udGFsXG4gICAgICogQHBhcmFtIHZlcnRpY2FsXG4gICAgICovXG4gICAgbWFrZUZ1bGxzY3JlZW46IGZ1bmN0aW9uKGVsZW0sIGhvcml6b250YWwsIHZlcnRpY2FsKSB7XG5cbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQoaG9yaXpvbnRhbCkpIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZCh2ZXJ0aWNhbCkpIHZlcnRpY2FsID0gdHJ1ZTtcblxuICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgIGVsZW0uc3R5bGUubGVmdCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUucmlnaHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICAgIGVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSAwO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqL1xuICAgIGZha2VFdmVudDogZnVuY3Rpb24oZWxlbSwgZXZlbnRUeXBlLCBwYXJhbXMsIGF1eCkge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IEVWRU5UX01BUF9JTlZbZXZlbnRUeXBlXTtcbiAgICAgIGlmICghY2xhc3NOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnQgdHlwZSAnICsgZXZlbnRUeXBlICsgJyBub3Qgc3VwcG9ydGVkLicpO1xuICAgICAgfVxuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KGNsYXNzTmFtZSk7XG4gICAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgICBjYXNlICdNb3VzZUV2ZW50cyc6XG4gICAgICAgICAgdmFyIGNsaWVudFggPSBwYXJhbXMueCB8fCBwYXJhbXMuY2xpZW50WCB8fCAwO1xuICAgICAgICAgIHZhciBjbGllbnRZID0gcGFyYW1zLnkgfHwgcGFyYW1zLmNsaWVudFkgfHwgMDtcbiAgICAgICAgICBldnQuaW5pdE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSwgd2luZG93LCBwYXJhbXMuY2xpY2tDb3VudCB8fCAxLFxuICAgICAgICAgICAgICAwLCAvL3NjcmVlbiBYXG4gICAgICAgICAgICAgIDAsIC8vc2NyZWVuIFlcbiAgICAgICAgICAgICAgY2xpZW50WCwgLy9jbGllbnQgWFxuICAgICAgICAgICAgICBjbGllbnRZLCAvL2NsaWVudCBZXG4gICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnS2V5Ym9hcmRFdmVudHMnOlxuICAgICAgICAgIHZhciBpbml0ID0gZXZ0LmluaXRLZXlib2FyZEV2ZW50IHx8IGV2dC5pbml0S2V5RXZlbnQ7IC8vIHdlYmtpdCB8fCBtb3pcbiAgICAgICAgICBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY3RybEtleTogZmFsc2UsXG4gICAgICAgICAgICBhbHRLZXk6IGZhbHNlLFxuICAgICAgICAgICAgc2hpZnRLZXk6IGZhbHNlLFxuICAgICAgICAgICAgbWV0YUtleTogZmFsc2UsXG4gICAgICAgICAgICBrZXlDb2RlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjaGFyQ29kZTogdW5kZWZpbmVkXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaW5pdChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSwgd2luZG93LFxuICAgICAgICAgICAgICBwYXJhbXMuY3RybEtleSwgcGFyYW1zLmFsdEtleSxcbiAgICAgICAgICAgICAgcGFyYW1zLnNoaWZ0S2V5LCBwYXJhbXMubWV0YUtleSxcbiAgICAgICAgICAgICAgcGFyYW1zLmtleUNvZGUsIHBhcmFtcy5jaGFyQ29kZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbW1vbi5kZWZhdWx0cyhldnQsIGF1eCk7XG4gICAgICBlbGVtLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHBhcmFtIGJvb2xcbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbihlbGVtLCBldmVudCwgZnVuYywgYm9vbCkge1xuICAgICAgYm9vbCA9IGJvb2wgfHwgZmFsc2U7XG4gICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKVxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudClcbiAgICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHBhcmFtIGJvb2xcbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50LCBmdW5jLCBib29sKSB7XG4gICAgICBib29sID0gYm9vbCB8fCBmYWxzZTtcbiAgICAgIGlmIChlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XG4gICAgICBlbHNlIGlmIChlbGVtLmRldGFjaEV2ZW50KVxuICAgICAgICBlbGVtLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgZnVuYyk7XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuICAgIGFkZENsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSAhPT0gY2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgIGlmIChjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSA9PSAtMSkge1xuICAgICAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJykucmVwbGFjZSgvXlxccysvLCAnJykucmVwbGFjZSgvXFxzKyQvLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NOYW1lID09PSBjbGFzc05hbWUpIHtcbiAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICAgIHZhciBpbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/Ol58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHMrfCQpJykudGVzdChlbGVtLmNsYXNzTmFtZSkgfHwgZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRXaWR0aDogZnVuY3Rpb24oZWxlbSkge1xuXG4gICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuXG4gICAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWxlZnQtd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1yaWdodC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1sZWZ0J10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXJpZ2h0J10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWyd3aWR0aCddKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldEhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuXG4gICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuXG4gICAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLXRvcC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWJvdHRvbS13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy10b3AnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctYm90dG9tJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydoZWlnaHQnXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRPZmZzZXQ6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIHZhciBvZmZzZXQgPSB7bGVmdDogMCwgdG9wOjB9O1xuICAgICAgaWYgKGVsZW0ub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBvZmZzZXQubGVmdCArPSBlbGVtLm9mZnNldExlZnQ7XG4gICAgICAgICAgb2Zmc2V0LnRvcCArPSBlbGVtLm9mZnNldFRvcDtcbiAgICAgICAgfSB3aGlsZSAoZWxlbSA9IGVsZW0ub2Zmc2V0UGFyZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfSxcblxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9wb3N0cy8yNjg0NTYxL3JldmlzaW9uc1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgaXNBY3RpdmU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICggZWxlbS50eXBlIHx8IGVsZW0uaHJlZiApO1xuICAgIH1cblxuICB9O1xuXG4gIHJldHVybiBkb207XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBzZWxlY3QgaW5wdXQgdG8gYWx0ZXIgdGhlIHByb3BlcnR5IG9mIGFuIG9iamVjdCwgdXNpbmcgYVxuICAgKiBsaXN0IG9mIGFjY2VwdGVkIHZhbHVlcy5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nW119IG9wdGlvbnMgQSBtYXAgb2YgbGFiZWxzIHRvIGFjY2VwdGFibGUgdmFsdWVzLCBvclxuICAgKiBhIGxpc3Qgb2YgYWNjZXB0YWJsZSBzdHJpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE9wdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBvcHRpb25zKSB7XG5cbiAgICBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJvcCBkb3duIG1lbnVcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuXG4gICAgaWYgKGNvbW1vbi5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICB2YXIgbWFwID0ge307XG4gICAgICBjb21tb24uZWFjaChvcHRpb25zLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIG1hcFtlbGVtZW50XSA9IGVsZW1lbnQ7XG4gICAgICB9KTtcbiAgICAgIG9wdGlvbnMgPSBtYXA7XG4gICAgfVxuXG4gICAgY29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuXG4gICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHQuaW5uZXJIVE1MID0ga2V5O1xuICAgICAgb3B0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICBfdGhpcy5fX3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBBY2tub3dsZWRnZSBvcmlnaW5hbCB2YWx1ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlc2lyZWRWYWx1ZSA9IHRoaXMub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoZGVzaXJlZFZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fc2VsZWN0KTtcblxuICB9O1xuXG4gIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLl9fc2VsZWN0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIHJldHVybiBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gT3B0aW9uQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlci5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWluXSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWF4XSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXG4gICAgdGhpcy5fX21pbiA9IHBhcmFtcy5taW47XG4gICAgdGhpcy5fX21heCA9IHBhcmFtcy5tYXg7XG4gICAgdGhpcy5fX3N0ZXAgPSBwYXJhbXMuc3RlcDtcblxuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQodGhpcy5fX3N0ZXApKSB7XG5cbiAgICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSA9PSAwKSB7XG4gICAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IDE7IC8vIFdoYXQgYXJlIHdlLCBwc3ljaGljcz9cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEhleSBEb3VnLCBjaGVjayB0aGlzIG91dC5cbiAgICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2codGhpcy5pbml0aWFsVmFsdWUpL01hdGguTE4xMCkpLzEwO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gdGhpcy5fX3N0ZXA7XG5cbiAgICB9XG5cbiAgICB0aGlzLl9fcHJlY2lzaW9uID0gbnVtRGVjaW1hbHModGhpcy5fX2ltcGxpZWRTdGVwKTtcblxuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSAqL1xuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5fX21pbiAhPT0gdW5kZWZpbmVkICYmIHYgPCB0aGlzLl9fbWluKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5fX21pbjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19tYXggIT09IHVuZGVmaW5lZCAmJiB2ID4gdGhpcy5fX21heCkge1xuICAgICAgICAgICAgdiA9IHRoaXMuX19tYXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX19zdGVwICE9PSB1bmRlZmluZWQgJiYgdiAlIHRoaXMuX19zdGVwICE9IDApIHtcbiAgICAgICAgICAgIHYgPSBNYXRoLnJvdW5kKHYgLyB0aGlzLl9fc3RlcCkgKiB0aGlzLl9fc3RlcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBtaW5pbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIFRoZSBtaW5pbXVtIHZhbHVlIGZvclxuICAgICAgICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG1pbjogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19taW4gPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgbWF4aW11bSB2YWx1ZSBmb3IgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhWYWx1ZSBUaGUgbWF4aW11bSB2YWx1ZSBmb3JcbiAgICAgICAgICogPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtYXg6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fbWF4ID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIHN0ZXAgdmFsdWUgdGhhdCBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgICAgICAgKiBpbmNyZW1lbnRzIGJ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIFRoZSBzdGVwIHZhbHVlIGZvclxuICAgICAgICAgKiBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgICAgICAgKiBAZGVmYXVsdCBpZiBtaW5pbXVtIGFuZCBtYXhpbXVtIHNwZWNpZmllZCBpbmNyZW1lbnQgaXMgMSUgb2YgdGhlXG4gICAgICAgICAqIGRpZmZlcmVuY2Ugb3RoZXJ3aXNlIHN0ZXBWYWx1ZSBpcyAxXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RlcDogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19zdGVwID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiBudW1EZWNpbWFscyh4KSB7XG4gICAgeCA9IHgudG9TdHJpbmcoKTtcbiAgICBpZiAoeC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHgubGVuZ3RoIC0geC5pbmRleE9mKCcuJykgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCA9IChmdW5jdGlvbiAoTnVtYmVyQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlciBhbmRcbiAgICogcHJvdmlkZXMgYW4gaW5wdXQgZWxlbWVudCB3aXRoIHdoaWNoIHRvIG1hbmlwdWxhdGUgaXQuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyQm94ID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICB0aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuXG4gICAgTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiB7TnVtYmVyfSBQcmV2aW91cyBtb3VzZSB5IHBvc2l0aW9uXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHZhciBwcmV2X3k7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuXG4gICAgLy8gTWFrZXMgaXQgc28gbWFudWFsbHkgc3BlY2lmaWVkIHZhbHVlcyBhcmUgbm90IHRydW5jYXRlZC5cblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgLy8gV2hlbiBwcmVzc2luZyBlbnRpcmUsIHlvdSBjYW4gYmUgYXMgcHJlY2lzZSBhcyB5b3Ugd2FudC5cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICB2YXIgYXR0ZW1wdGVkID0gcGFyc2VGbG9hdChfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICAgIGlmICghY29tbW9uLmlzTmFOKGF0dGVtcHRlZCkpIF90aGlzLnNldFZhbHVlKGF0dGVtcHRlZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgb25DaGFuZ2UoKTtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBwcmV2X3kgPSBlLmNsaWVudFk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuXG4gICAgICB2YXIgZGlmZiA9IHByZXZfeSAtIGUuY2xpZW50WTtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLmdldFZhbHVlKCkgKyBkaWZmICogX3RoaXMuX19pbXBsaWVkU3RlcCk7XG5cbiAgICAgIHByZXZfeSA9IGUuY2xpZW50WTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzID0gTnVtYmVyQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBOdW1iZXJDb250cm9sbGVyQm94LnByb3RvdHlwZSxcbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA/IHRoaXMuZ2V0VmFsdWUoKSA6IHJvdW5kVG9EZWNpbWFsKHRoaXMuZ2V0VmFsdWUoKSwgdGhpcy5fX3ByZWNpc2lvbik7XG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIHJvdW5kVG9EZWNpbWFsKHZhbHVlLCBkZWNpbWFscykge1xuICAgIHZhciB0ZW5UbyA9IE1hdGgucG93KDEwLCBkZWNpbWFscyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiB0ZW5UbykgLyB0ZW5UbztcbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94O1xuXG59KShkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSAoZnVuY3Rpb24gKE51bWJlckNvbnRyb2xsZXIsIGRvbSwgY3NzLCBjb21tb24sIHN0eWxlU2hlZXQpIHtcblxuICAvKipcbiAgICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlciwgY29udGFpbnNcbiAgICogYSBtaW5pbXVtIGFuZCBtYXhpbXVtLCBhbmQgcHJvdmlkZXMgYSBzbGlkZXIgZWxlbWVudCB3aXRoIHdoaWNoIHRvXG4gICAqIG1hbmlwdWxhdGUgaXQuIEl0IHNob3VsZCBiZSBub3RlZCB0aGF0IHRoZSBzbGlkZXIgZWxlbWVudCBpcyBtYWRlIHVwIG9mXG4gICAqIDxjb2RlPiZsdDtkaXYmZ3Q7PC9jb2RlPiB0YWdzLCA8c3Ryb25nPm5vdDwvc3Ryb25nPiB0aGUgaHRtbDVcbiAgICogPGNvZGU+Jmx0O3NsaWRlciZndDs8L2NvZGU+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhWYWx1ZSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIG1pbiwgbWF4LCBzdGVwKSB7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogbWluLCBtYXg6IG1heCwgc3RlcDogc3RlcCB9KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9fYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19mb3JlZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXG5cblxuICAgIGRvbS5iaW5kKHRoaXMuX19iYWNrZ3JvdW5kLCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIFxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fYmFja2dyb3VuZCwgJ3NsaWRlcicpO1xuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fZm9yZWdyb3VuZCwgJ3NsaWRlci1mZycpO1xuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuXG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblxuICAgICAgb25Nb3VzZURyYWcoZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBvZmZzZXQgPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9fYmFja2dyb3VuZCk7XG4gICAgICB2YXIgd2lkdGggPSBkb20uZ2V0V2lkdGgoX3RoaXMuX19iYWNrZ3JvdW5kKTtcbiAgICAgIFxuICAgICAgX3RoaXMuc2V0VmFsdWUoXG4gICAgICAgIG1hcChlLmNsaWVudFgsIG9mZnNldC5sZWZ0LCBvZmZzZXQubGVmdCArIHdpZHRoLCBfdGhpcy5fX21pbiwgX3RoaXMuX19tYXgpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5fX2JhY2tncm91bmQuYXBwZW5kQ2hpbGQodGhpcy5fX2ZvcmVncm91bmQpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fYmFja2dyb3VuZCk7XG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MgPSBOdW1iZXJDb250cm9sbGVyO1xuXG4gIC8qKlxuICAgKiBJbmplY3RzIGRlZmF1bHQgc3R5bGVzaGVldCBmb3Igc2xpZGVyIGVsZW1lbnRzLlxuICAgKi9cbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlci51c2VEZWZhdWx0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgY3NzLmluamVjdChzdHlsZVNoZWV0KTtcbiAgfTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnByb3RvdHlwZSxcbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBjdCA9ICh0aGlzLmdldFZhbHVlKCkgLSB0aGlzLl9fbWluKS8odGhpcy5fX21heCAtIHRoaXMuX19taW4pO1xuICAgICAgICAgIHRoaXMuX19mb3JlZ3JvdW5kLnN0eWxlLndpZHRoID0gcGN0KjEwMCsnJSc7XG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuXG5cbiAgKTtcblxuICBmdW5jdGlvbiBtYXAodiwgaTEsIGkyLCBvMSwgbzIpIHtcbiAgICByZXR1cm4gbzEgKyAobzIgLSBvMSkgKiAoKHYgLSBpMSkgLyAoaTIgLSBpMSkpO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJTbGlkZXI7XG4gIFxufSkoZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jc3MsXG5kYXQudXRpbHMuY29tbW9uLFxuXCIuc2xpZGVyIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMTUpO1xcbiAgaGVpZ2h0OiAxZW07XFxuICBib3JkZXItcmFkaXVzOiAxZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgcGFkZGluZzogMCAwLjVlbTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5zbGlkZXItZmcge1xcbiAgcGFkZGluZzogMXB4IDAgMnB4IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhO1xcbiAgaGVpZ2h0OiAxZW07XFxuICBtYXJnaW4tbGVmdDogLTAuNWVtO1xcbiAgcGFkZGluZy1yaWdodDogMC41ZW07XFxuICBib3JkZXItcmFkaXVzOiAxZW0gMCAwIDFlbTtcXG59XFxuXFxuLnNsaWRlci1mZzphZnRlciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXItcmFkaXVzOiAxZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAgMXB4IHNvbGlkICNhYWE7XFxuICBjb250ZW50OiAnJztcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogLTFlbTtcXG4gIG1hcmdpbi10b3A6IC0xcHg7XFxuICBoZWlnaHQ6IDAuOWVtO1xcbiAgd2lkdGg6IDAuOWVtO1xcbn1cIik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgR1VJIGludGVyZmFjZSB0byBmaXJlIGEgc3BlY2lmaWVkIG1ldGhvZCwgYSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgRnVuY3Rpb25Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgdGV4dCkge1xuXG4gICAgRnVuY3Rpb25Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2J1dHRvbi5pbm5lckhUTUwgPSB0ZXh0ID09PSB1bmRlZmluZWQgPyAnRmlyZScgOiB0ZXh0O1xuICAgIGRvbS5iaW5kKHRoaXMuX19idXR0b24sICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIF90aGlzLmZpcmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fYnV0dG9uLCAnYnV0dG9uJyk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2J1dHRvbik7XG5cblxuICB9O1xuXG4gIEZ1bmN0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBGdW5jdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICB7XG4gICAgICAgIFxuICAgICAgICBmaXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5nZXRWYWx1ZSgpLmNhbGwodGhpcy5vYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gRnVuY3Rpb25Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBjaGVja2JveCBpbnB1dCB0byBhbHRlciB0aGUgYm9vbGVhbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgQm9vbGVhbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuX19wcmV2ID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgdGhpcy5fX2NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG5cblxuICAgIGRvbS5iaW5kKHRoaXMuX19jaGVja2JveCwgJ2NoYW5nZScsIG9uQ2hhbmdlLCBmYWxzZSk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2NoZWNrYm94KTtcblxuICAgIC8vIE1hdGNoIG9yaWdpbmFsIHZhbHVlXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKCFfdGhpcy5fX3ByZXYpO1xuICAgIH1cblxuICB9O1xuXG4gIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX19wcmV2ID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5nZXRWYWx1ZSgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gdHJ1ZTsgICAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gQm9vbGVhbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29sb3IudG9TdHJpbmcgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHJldHVybiBmdW5jdGlvbihjb2xvcikge1xuXG4gICAgaWYgKGNvbG9yLmEgPT0gMSB8fCBjb21tb24uaXNVbmRlZmluZWQoY29sb3IuYSkpIHtcblxuICAgICAgdmFyIHMgPSBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xuICAgICAgd2hpbGUgKHMubGVuZ3RoIDwgNikge1xuICAgICAgICBzID0gJzAnICsgcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcjJyArIHM7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gJ3JnYmEoJyArIE1hdGgucm91bmQoY29sb3IucikgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmcpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5iKSArICcsJyArIGNvbG9yLmEgKyAnKSc7XG5cbiAgICB9XG5cbiAgfVxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29sb3IuaW50ZXJwcmV0ID0gKGZ1bmN0aW9uICh0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIHJlc3VsdCwgdG9SZXR1cm47XG5cbiAgdmFyIGludGVycHJldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdG9SZXR1cm4gPSBmYWxzZTtcblxuICAgIHZhciBvcmlnaW5hbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcblxuICAgIGNvbW1vbi5lYWNoKElOVEVSUFJFVEFUSU9OUywgZnVuY3Rpb24oZmFtaWx5KSB7XG5cbiAgICAgIGlmIChmYW1pbHkubGl0bXVzKG9yaWdpbmFsKSkge1xuXG4gICAgICAgIGNvbW1vbi5lYWNoKGZhbWlseS5jb252ZXJzaW9ucywgZnVuY3Rpb24oY29udmVyc2lvbiwgY29udmVyc2lvbk5hbWUpIHtcblxuICAgICAgICAgIHJlc3VsdCA9IGNvbnZlcnNpb24ucmVhZChvcmlnaW5hbCk7XG5cbiAgICAgICAgICBpZiAodG9SZXR1cm4gPT09IGZhbHNlICYmIHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb25OYW1lID0gY29udmVyc2lvbk5hbWU7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbiA9IGNvbnZlcnNpb247XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gIH07XG5cbiAgdmFyIElOVEVSUFJFVEFUSU9OUyA9IFtcblxuICAgIC8vIFN0cmluZ3NcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzU3RyaW5nLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFRIUkVFX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XSkoW0EtRjAtOV0pKFtBLUYwLTldKSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICAnMHgnICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzFdLnRvU3RyaW5nKCkgKyB0ZXN0WzFdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFszXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIFNJWF9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV17Nn0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0I6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQkE6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JhXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCxcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKSxcbiAgICAgICAgICAgICAgYTogcGFyc2VGbG9hdCh0ZXN0WzRdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBOdW1iZXJzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc051bWJlcixcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBIRVg6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IG9yaWdpbmFsLFxuICAgICAgICAgICAgICBjb252ZXJzaW9uTmFtZTogJ0hFWCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3IuaGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gQXJyYXlzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc0FycmF5LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQl9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQkFfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSA0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl0sXG4gICAgICAgICAgICAgIGE6IG9yaWdpbmFsWzNdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE9iamVjdHNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzT2JqZWN0LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmIsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52LFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gIF07XG5cbiAgcmV0dXJuIGludGVycHJldDtcblxuXG59KShkYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuR1VJID0gZGF0Lmd1aS5HVUkgPSAoZnVuY3Rpb24gKGNzcywgc2F2ZURpYWxvZ3VlQ29udGVudHMsIHN0eWxlU2hlZXQsIGNvbnRyb2xsZXJGYWN0b3J5LCBDb250cm9sbGVyLCBCb29sZWFuQ29udHJvbGxlciwgRnVuY3Rpb25Db250cm9sbGVyLCBOdW1iZXJDb250cm9sbGVyQm94LCBOdW1iZXJDb250cm9sbGVyU2xpZGVyLCBPcHRpb25Db250cm9sbGVyLCBDb2xvckNvbnRyb2xsZXIsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgQ2VudGVyZWREaXYsIGRvbSwgY29tbW9uKSB7XG5cbiAgY3NzLmluamVjdChzdHlsZVNoZWV0KTtcblxuICAvKiogT3V0ZXItbW9zdCBjbGFzc05hbWUgZm9yIEdVSSdzICovXG4gIHZhciBDU1NfTkFNRVNQQUNFID0gJ2RnJztcblxuICB2YXIgSElERV9LRVlfQ09ERSA9IDcyO1xuXG4gIC8qKiBUaGUgb25seSB2YWx1ZSBzaGFyZWQgYmV0d2VlbiB0aGUgSlMgYW5kIFNDU1MuIFVzZSBjYXV0aW9uLiAqL1xuICB2YXIgQ0xPU0VfQlVUVE9OX0hFSUdIVCA9IDIwO1xuXG4gIHZhciBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgPSAnRGVmYXVsdCc7XG5cbiAgdmFyIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cgJiYgd2luZG93Wydsb2NhbFN0b3JhZ2UnXSAhPT0gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KSgpO1xuXG4gIHZhciBTQVZFX0RJQUxPR1VFO1xuXG4gIC8qKiBIYXZlIHdlIHlldCB0byBjcmVhdGUgYW4gYXV0b1BsYWNlIEdVST8gKi9cbiAgdmFyIGF1dG9fcGxhY2VfdmlyZ2luID0gdHJ1ZTtcblxuICAvKiogRml4ZWQgcG9zaXRpb24gZGl2IHRoYXQgYXV0byBwbGFjZSBHVUkncyBnbyBpbnNpZGUgKi9cbiAgdmFyIGF1dG9fcGxhY2VfY29udGFpbmVyO1xuXG4gIC8qKiBBcmUgd2UgaGlkaW5nIHRoZSBHVUkncyA/ICovXG4gIHZhciBoaWRlID0gZmFsc2U7XG5cbiAgLyoqIEdVSSdzIHdoaWNoIHNob3VsZCBiZSBoaWRkZW4gKi9cbiAgdmFyIGhpZGVhYmxlX2d1aXMgPSBbXTtcblxuICAvKipcbiAgICogQSBsaWdodHdlaWdodCBjb250cm9sbGVyIGxpYnJhcnkgZm9yIEphdmFTY3JpcHQuIEl0IGFsbG93cyB5b3UgdG8gZWFzaWx5XG4gICAqIG1hbmlwdWxhdGUgdmFyaWFibGVzIGFuZCBmaXJlIGZ1bmN0aW9ucyBvbiB0aGUgZmx5LlxuICAgKiBAY2xhc3NcbiAgICpcbiAgICogQG1lbWJlciBkYXQuZ3VpXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3BhcmFtcy5uYW1lXSBUaGUgbmFtZSBvZiB0aGlzIEdVSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXMubG9hZF0gSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBzYXZlZCBzdGF0ZSBvZlxuICAgKiB0aGlzIEdVSS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbcGFyYW1zLmF1dG89dHJ1ZV1cbiAgICogQHBhcmFtIHtkYXQuZ3VpLkdVSX0gW3BhcmFtcy5wYXJlbnRdIFRoZSBHVUkgSSdtIG5lc3RlZCBpbi5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbcGFyYW1zLmNsb3NlZF0gSWYgdHJ1ZSwgc3RhcnRzIGNsb3NlZFxuICAgKi9cbiAgdmFyIEdVSSA9IGZ1bmN0aW9uKHBhcmFtcykge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIE91dGVybW9zdCBET00gRWxlbWVudFxuICAgICAqIEB0eXBlIERPTUVsZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fdWwpO1xuXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgQ1NTX05BTUVTUEFDRSk7XG5cbiAgICAvKipcbiAgICAgKiBOZXN0ZWQgR1VJJ3MgYnkgbmFtZVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fZm9sZGVycyA9IHt9O1xuXG4gICAgdGhpcy5fX2NvbnRyb2xsZXJzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIG9iamVjdHMgSSdtIHJlbWVtYmVyaW5nIGZvciBzYXZlLCBvbmx5IHVzZWQgaW4gdG9wIGxldmVsIEdVSVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIE1hcHMgdGhlIGluZGV4IG9mIHJlbWVtYmVyZWQgb2JqZWN0cyB0byBhIG1hcCBvZiBjb250cm9sbGVycywgb25seSB1c2VkXG4gICAgICogaW4gdG9wIGxldmVsIEdVSS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBbXG4gICAgICogIHtcbiAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXIsXG4gICAgICogICAgYW5vdGhlclByb3BlcnR5TmFtZTogQ29udHJvbGxlclxuICAgICAqICB9LFxuICAgICAqICB7XG4gICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyXG4gICAgICogIH1cbiAgICAgKiBdXG4gICAgICovXG4gICAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVycyA9IFtdO1xuXG4gICAgdGhpcy5fX2xpc3RlbmluZyA9IFtdO1xuXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXG4gICAgLy8gRGVmYXVsdCBwYXJhbWV0ZXJzXG4gICAgcGFyYW1zID0gY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgYXV0b1BsYWNlOiB0cnVlLFxuICAgICAgd2lkdGg6IEdVSS5ERUZBVUxUX1dJRFRIXG4gICAgfSk7XG5cbiAgICBwYXJhbXMgPSBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICByZXNpemFibGU6IHBhcmFtcy5hdXRvUGxhY2UsXG4gICAgICBoaWRlYWJsZTogcGFyYW1zLmF1dG9QbGFjZVxuICAgIH0pO1xuXG5cbiAgICBpZiAoIWNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMubG9hZCkpIHtcblxuICAgICAgLy8gRXhwbGljaXQgcHJlc2V0XG4gICAgICBpZiAocGFyYW1zLnByZXNldCkgcGFyYW1zLmxvYWQucHJlc2V0ID0gcGFyYW1zLnByZXNldDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHBhcmFtcy5sb2FkID0geyBwcmVzZXQ6IERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSB9O1xuXG4gICAgfVxuXG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMuaGlkZWFibGUpIHtcbiAgICAgIGhpZGVhYmxlX2d1aXMucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHJvb3QgbGV2ZWwgR1VJJ3MgYXJlIHJlc2l6YWJsZS5cbiAgICBwYXJhbXMucmVzaXphYmxlID0gY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5yZXNpemFibGU7XG5cblxuICAgIGlmIChwYXJhbXMuYXV0b1BsYWNlICYmIGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMuc2Nyb2xsYWJsZSkpIHtcbiAgICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgICB9XG4vLyAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMuc2Nyb2xsYWJsZSA9PT0gdHJ1ZTtcblxuICAgIC8vIE5vdCBwYXJ0IG9mIHBhcmFtcyBiZWNhdXNlIEkgZG9uJ3Qgd2FudCBwZW9wbGUgcGFzc2luZyB0aGlzIGluIHZpYVxuICAgIC8vIGNvbnN0cnVjdG9yLiBTaG91bGQgYmUgYSAncmVtZW1iZXJlZCcgdmFsdWUuXG4gICAgdmFyIHVzZV9sb2NhbF9zdG9yYWdlID1cbiAgICAgICAgU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJlxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyxcblxuICAgICAgICAvKiogQGxlbmRzIGRhdC5ndWkuR1VJLnByb3RvdHlwZSAqL1xuICAgICAgICB7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgcGFyZW50IDxjb2RlPkdVSTwvY29kZT5cbiAgICAgICAgICAgKiBAdHlwZSBkYXQuZ3VpLkdVSVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHBhcmVudDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5wYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNjcm9sbGFibGU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuc2Nyb2xsYWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSGFuZGxlcyA8Y29kZT5HVUk8L2NvZGU+J3MgZWxlbWVudCBwbGFjZW1lbnQgZm9yIHlvdVxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBhdXRvUGxhY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuYXV0b1BsYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgaWRlbnRpZmllciBmb3IgYSBzZXQgb2Ygc2F2ZWQgdmFsdWVzXG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgcHJlc2V0OiB7XG5cbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0Um9vdCgpLnByZXNldDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQucHJlc2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmdldFJvb3QoKS5wcmVzZXQgPSB2O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5sb2FkLnByZXNldCA9IHY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0UHJlc2V0U2VsZWN0SW5kZXgodGhpcyk7XG4gICAgICAgICAgICAgIF90aGlzLnJldmVydCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSB3aWR0aCBvZiA8Y29kZT5HVUk8L2NvZGU+IGVsZW1lbnRcbiAgICAgICAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgICAgICAgKi9cbiAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLndpZHRoID0gdjtcbiAgICAgICAgICAgICAgc2V0V2lkdGgoX3RoaXMsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgbmFtZSBvZiA8Y29kZT5HVUk8L2NvZGU+LiBVc2VkIGZvciBmb2xkZXJzLiBpLmVcbiAgICAgICAgICAgKiBhIGZvbGRlcidzIG5hbWVcbiAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLm5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIGNvbGxpc2lvbnMgYW1vbmcgc2libGluZyBmb2xkZXJzXG4gICAgICAgICAgICAgIHBhcmFtcy5uYW1lID0gdjtcbiAgICAgICAgICAgICAgaWYgKHRpdGxlX3Jvd19uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGl0bGVfcm93X25hbWUuaW5uZXJIVE1MID0gcGFyYW1zLm5hbWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogV2hldGhlciB0aGUgPGNvZGU+R1VJPC9jb2RlPiBpcyBjb2xsYXBzZWQgb3Igbm90XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNsb3NlZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5jbG9zZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIHBhcmFtcy5jbG9zZWQgPSB2O1xuICAgICAgICAgICAgICBpZiAocGFyYW1zLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgYXJlbid0IGdvaW5nIHRvIHJlc3BlY3QgdGhlIENTUyB0cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAvLyBMZXRzIGp1c3QgY2hlY2sgb3VyIGhlaWdodCBhZ2FpbnN0IHRoZSB3aW5kb3cgaGVpZ2h0IHJpZ2h0IG9mZlxuICAgICAgICAgICAgICAvLyB0aGUgYmF0LlxuICAgICAgICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICAgICAgICAgICAgaWYgKF90aGlzLl9fY2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IHYgPyBHVUkuVEVYVF9PUEVOIDogR1VJLlRFWFRfQ0xPU0VEO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIENvbnRhaW5zIGFsbCBwcmVzZXRzXG4gICAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAgICovXG4gICAgICAgICAgbG9hZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRvIHVzZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL1N0b3JhZ2UjbG9jYWxTdG9yYWdlXCI+bG9jYWxTdG9yYWdlPC9hPiBhcyB0aGUgbWVhbnMgZm9yXG4gICAgICAgICAgICogPGNvZGU+cmVtZW1iZXI8L2NvZGU+aW5nXG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIHVzZUxvY2FsU3RvcmFnZToge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdXNlX2xvY2FsX3N0b3JhZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihib29sKSB7XG4gICAgICAgICAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG4gICAgICAgICAgICAgICAgdXNlX2xvY2FsX3N0b3JhZ2UgPSBib29sO1xuICAgICAgICAgICAgICAgIGlmIChib29sKSB7XG4gICAgICAgICAgICAgICAgICBkb20uYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdpc0xvY2FsJyksIGJvb2wpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAvLyBBcmUgd2UgYSByb290IGxldmVsIEdVST9cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG5cbiAgICAgIHBhcmFtcy5jbG9zZWQgPSBmYWxzZTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX01BSU4pO1xuICAgICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuXG4gICAgICAvLyBBcmUgd2Ugc3VwcG9zZWQgdG8gYmUgbG9hZGluZyBsb2NhbGx5P1xuICAgICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcblxuICAgICAgICBpZiAodXNlX2xvY2FsX3N0b3JhZ2UpIHtcblxuICAgICAgICAgIF90aGlzLnVzZUxvY2FsU3RvcmFnZSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc2F2ZWRfZ3VpID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnZ3VpJykpO1xuXG4gICAgICAgICAgaWYgKHNhdmVkX2d1aSkge1xuICAgICAgICAgICAgcGFyYW1zLmxvYWQgPSBKU09OLnBhcnNlKHNhdmVkX2d1aSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9fY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2xvc2VCdXR0b24pO1xuXG4gICAgICBkb20uYmluZCh0aGlzLl9fY2xvc2VCdXR0b24sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIF90aGlzLmNsb3NlZCA9ICFfdGhpcy5jbG9zZWQ7XG5cblxuICAgICAgfSk7XG5cblxuICAgICAgLy8gT2gsIHlvdSdyZSBhIG5lc3RlZCBHVUkhXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKHBhcmFtcy5jbG9zZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpdGxlX3Jvd19uYW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFyYW1zLm5hbWUpO1xuICAgICAgZG9tLmFkZENsYXNzKHRpdGxlX3Jvd19uYW1lLCAnY29udHJvbGxlci1uYW1lJyk7XG5cbiAgICAgIHZhciB0aXRsZV9yb3cgPSBhZGRSb3coX3RoaXMsIHRpdGxlX3Jvd19uYW1lKTtcblxuICAgICAgdmFyIG9uX2NsaWNrX3RpdGxlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIF90aGlzLmNsb3NlZCA9ICFfdGhpcy5jbG9zZWQ7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGl0bGVfcm93LCAndGl0bGUnKTtcbiAgICAgIGRvbS5iaW5kKHRpdGxlX3JvdywgJ2NsaWNrJywgb25fY2xpY2tfdGl0bGUpO1xuXG4gICAgICBpZiAoIXBhcmFtcy5jbG9zZWQpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuYXV0b1BsYWNlKSB7XG5cbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcblxuICAgICAgICBpZiAoYXV0b19wbGFjZV92aXJnaW4pIHtcbiAgICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvX3BsYWNlX2NvbnRhaW5lciwgQ1NTX05BTUVTUEFDRSk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9fcGxhY2VfY29udGFpbmVyLCBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIpO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXV0b19wbGFjZV9jb250YWluZXIpO1xuICAgICAgICAgIGF1dG9fcGxhY2VfdmlyZ2luID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQdXQgaXQgaW4gdGhlIGRvbSBmb3IgeW91LlxuICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEFwcGx5IHRoZSBhdXRvIHN0eWxlc1xuICAgICAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfQVVUT19QTEFDRSk7XG5cbiAgICAgIH1cblxuXG4gICAgICAvLyBNYWtlIGl0IG5vdCBlbGFzdGljLlxuICAgICAgaWYgKCF0aGlzLnBhcmVudCkgc2V0V2lkdGgoX3RoaXMsIHBhcmFtcy53aWR0aCk7XG5cbiAgICB9XG5cbiAgICBkb20uYmluZCh3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCk7IH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICdvVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIHRoaXMub25SZXNpemUoKTtcblxuXG4gICAgaWYgKHBhcmFtcy5yZXNpemFibGUpIHtcbiAgICAgIGFkZFJlc2l6ZUhhbmRsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYXZlVG9Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnZ3VpJyksIEpTT04uc3RyaW5naWZ5KF90aGlzLmdldFNhdmVPYmplY3QoKSkpO1xuICAgIH1cblxuICAgIHZhciByb290ID0gX3RoaXMuZ2V0Um9vdCgpO1xuICAgIGZ1bmN0aW9uIHJlc2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciByb290ID0gX3RoaXMuZ2V0Um9vdCgpO1xuICAgICAgICByb290LndpZHRoICs9IDE7XG4gICAgICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICByb290LndpZHRoIC09IDE7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhcmFtcy5wYXJlbnQpIHtcbiAgICAgICAgcmVzZXRXaWR0aCgpO1xuICAgICAgfVxuXG4gIH07XG5cbiAgR1VJLnRvZ2dsZUhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgIGhpZGUgPSAhaGlkZTtcbiAgICBjb21tb24uZWFjaChoaWRlYWJsZV9ndWlzLCBmdW5jdGlvbihndWkpIHtcbiAgICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLnpJbmRleCA9IGhpZGUgPyAtOTk5IDogOTk5O1xuICAgICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGhpZGUgPyAwIDogMTtcbiAgICB9KTtcbiAgfTtcblxuICBHVUkuQ0xBU1NfQVVUT19QTEFDRSA9ICdhJztcbiAgR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSID0gJ2FjJztcbiAgR1VJLkNMQVNTX01BSU4gPSAnbWFpbic7XG4gIEdVSS5DTEFTU19DT05UUk9MTEVSX1JPVyA9ICdjcic7XG4gIEdVSS5DTEFTU19UT09fVEFMTCA9ICd0YWxsZXItdGhhbi13aW5kb3cnO1xuICBHVUkuQ0xBU1NfQ0xPU0VEID0gJ2Nsb3NlZCc7XG4gIEdVSS5DTEFTU19DTE9TRV9CVVRUT04gPSAnY2xvc2UtYnV0dG9uJztcbiAgR1VJLkNMQVNTX0RSQUcgPSAnZHJhZyc7XG5cbiAgR1VJLkRFRkFVTFRfV0lEVEggPSAyNDU7XG4gIEdVSS5URVhUX0NMT1NFRCA9ICdDbG9zZSBDb250cm9scyc7XG4gIEdVSS5URVhUX09QRU4gPSAnT3BlbiBDb250cm9scyc7XG5cbiAgZG9tLmJpbmQod2luZG93LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LnR5cGUgIT09ICd0ZXh0JyAmJlxuICAgICAgICAoZS53aGljaCA9PT0gSElERV9LRVlfQ09ERSB8fCBlLmtleUNvZGUgPT0gSElERV9LRVlfQ09ERSkpIHtcbiAgICAgIEdVSS50b2dnbGVIaWRlKCk7XG4gICAgfVxuXG4gIH0sIGZhbHNlKTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBHVUkucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5ndWkuR1VJICovXG4gICAgICB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZDogZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29sb3JDb250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQ29sb3I6IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gY29udHJvbGxlclxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oY29udHJvbGxlcikge1xuXG4gICAgICAgICAgLy8gVE9ETyBsaXN0ZW5pbmc/XG4gICAgICAgICAgdGhpcy5fX3VsLnJlbW92ZUNoaWxkKGNvbnRyb2xsZXIuX19saSk7XG4gICAgICAgICAgdGhpcy5fX2NvbnRyb2xsZXJzLnNsaWNlKHRoaXMuX19jb250cm9sbGVycy5pbmRleE9mKGNvbnRyb2xsZXIpLCAxKTtcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLm9uUmVzaXplKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG5hbWVcbiAgICAgICAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSBUaGUgbmV3IGZvbGRlci5cbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IGlmIHRoaXMgR1VJIGFscmVhZHkgaGFzIGEgZm9sZGVyIGJ5IHRoZSBzcGVjaWZpZWRcbiAgICAgICAgICogbmFtZVxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZEZvbGRlcjogZnVuY3Rpb24obmFtZSkge1xuXG4gICAgICAgICAgLy8gV2UgaGF2ZSB0byBwcmV2ZW50IGNvbGxpc2lvbnMgb24gbmFtZXMgaW4gb3JkZXIgdG8gaGF2ZSBhIGtleVxuICAgICAgICAgIC8vIGJ5IHdoaWNoIHRvIHJlbWVtYmVyIHNhdmVkIHZhbHVlc1xuICAgICAgICAgIGlmICh0aGlzLl9fZm9sZGVyc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBhbHJlYWR5IGhhdmUgYSBmb2xkZXIgaW4gdGhpcyBHVUkgYnkgdGhlJyArXG4gICAgICAgICAgICAgICAgJyBuYW1lIFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV3X2d1aV9wYXJhbXMgPSB7IG5hbWU6IG5hbWUsIHBhcmVudDogdGhpcyB9O1xuXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBwYXNzIGRvd24gdGhlIGF1dG9QbGFjZSB0cmFpdCBzbyB0aGF0IHdlIGNhblxuICAgICAgICAgIC8vIGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgdG8gb3Blbi9jbG9zZSBmb2xkZXIgYWN0aW9ucyB0b1xuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGEgc2Nyb2xsYmFyIGFwcGVhcnMgaWYgdGhlIHdpbmRvdyBpcyB0b28gc2hvcnQuXG4gICAgICAgICAgbmV3X2d1aV9wYXJhbXMuYXV0b1BsYWNlID0gdGhpcy5hdXRvUGxhY2U7XG5cbiAgICAgICAgICAvLyBEbyB3ZSBoYXZlIHNhdmVkIGFwcGVhcmFuY2UgZGF0YSBmb3IgdGhpcyBmb2xkZXI/XG5cbiAgICAgICAgICBpZiAodGhpcy5sb2FkICYmIC8vIEFueXRoaW5nIGxvYWRlZD9cbiAgICAgICAgICAgICAgdGhpcy5sb2FkLmZvbGRlcnMgJiYgLy8gV2FzIG15IHBhcmVudCBhIGRlYWQtZW5kP1xuICAgICAgICAgICAgICB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXSkgeyAvLyBEaWQgZGFkZHkgcmVtZW1iZXIgbWU/XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IG1lIGNsb3NlZCBpZiBJIHdhcyBjbG9zZWRcbiAgICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmNsb3NlZCA9IHRoaXMubG9hZC5mb2xkZXJzW25hbWVdLmNsb3NlZDtcblxuICAgICAgICAgICAgLy8gUGFzcyBkb3duIHRoZSBsb2FkZWQgZGF0YVxuICAgICAgICAgICAgbmV3X2d1aV9wYXJhbXMubG9hZCA9IHRoaXMubG9hZC5mb2xkZXJzW25hbWVdO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGd1aSA9IG5ldyBHVUkobmV3X2d1aV9wYXJhbXMpO1xuICAgICAgICAgIHRoaXMuX19mb2xkZXJzW25hbWVdID0gZ3VpO1xuXG4gICAgICAgICAgdmFyIGxpID0gYWRkUm93KHRoaXMsIGd1aS5kb21FbGVtZW50KTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MobGksICdmb2xkZXInKTtcbiAgICAgICAgICByZXR1cm4gZ3VpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVzaXplOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciByb290ID0gdGhpcy5nZXRSb290KCk7XG5cbiAgICAgICAgICBpZiAocm9vdC5zY3JvbGxhYmxlKSB7XG5cbiAgICAgICAgICAgIHZhciB0b3AgPSBkb20uZ2V0T2Zmc2V0KHJvb3QuX191bCkudG9wO1xuICAgICAgICAgICAgdmFyIGggPSAwO1xuXG4gICAgICAgICAgICBjb21tb24uZWFjaChyb290Ll9fdWwuY2hpbGROb2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICBpZiAoISAocm9vdC5hdXRvUGxhY2UgJiYgbm9kZSA9PT0gcm9vdC5fX3NhdmVfcm93KSlcbiAgICAgICAgICAgICAgICBoICs9IGRvbS5nZXRIZWlnaHQobm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgPCBoKSB7XG4gICAgICAgICAgICAgIGRvbS5hZGRDbGFzcyhyb290LmRvbUVsZW1lbnQsIEdVSS5DTEFTU19UT09fVEFMTCk7XG4gICAgICAgICAgICAgIHJvb3QuX191bC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhyb290LmRvbUVsZW1lbnQsIEdVSS5DTEFTU19UT09fVEFMTCk7XG4gICAgICAgICAgICAgIHJvb3QuX191bC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocm9vdC5fX3Jlc2l6ZV9oYW5kbGUpIHtcbiAgICAgICAgICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcm9vdC5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUuaGVpZ2h0ID0gcm9vdC5fX3VsLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocm9vdC5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICByb290Ll9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSByb290LndpZHRoICsgJ3B4JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogTWFyayBvYmplY3RzIGZvciBzYXZpbmcuIFRoZSBvcmRlciBvZiB0aGVzZSBvYmplY3RzIGNhbm5vdCBjaGFuZ2UgYXNcbiAgICAgICAgICogdGhlIEdVSSBncm93cy4gV2hlbiByZW1lbWJlcmluZyBuZXcgb2JqZWN0cywgYXBwZW5kIHRoZW0gdG8gdGhlIGVuZFxuICAgICAgICAgKiBvZiB0aGUgbGlzdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuLi59IG9iamVjdHNcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IGlmIG5vdCBjYWxsZWQgb24gYSB0b3AgbGV2ZWwgR1VJLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHJlbWVtYmVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQoU0FWRV9ESUFMT0dVRSkpIHtcbiAgICAgICAgICAgIFNBVkVfRElBTE9HVUUgPSBuZXcgQ2VudGVyZWREaXYoKTtcbiAgICAgICAgICAgIFNBVkVfRElBTE9HVUUuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBzYXZlRGlhbG9ndWVDb250ZW50cztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4gb25seSBjYWxsIHJlbWVtYmVyIG9uIGEgdG9wIGxldmVsIEdVSS5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgYWRkU2F2ZU1lbnUoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09IC0xKSB7XG4gICAgICAgICAgICAgIF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XG4gICAgICAgICAgICAvLyBTZXQgc2F2ZSByb3cgd2lkdGhcbiAgICAgICAgICAgIHNldFdpZHRoKHRoaXMsIHRoaXMud2lkdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IHRoZSB0b3Btb3N0IHBhcmVudCBHVUkgb2YgYSBuZXN0ZWQgR1VJLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGdldFJvb3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBndWkgPSB0aGlzO1xuICAgICAgICAgIHdoaWxlIChndWkucGFyZW50KSB7XG4gICAgICAgICAgICBndWkgPSBndWkucGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ3VpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBhIEpTT04gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZSBvZlxuICAgICAgICAgKiB0aGlzIEdVSSBhcyB3ZWxsIGFzIGl0cyByZW1lbWJlcmVkIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2F2ZU9iamVjdDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSB0aGlzLmxvYWQ7XG5cbiAgICAgICAgICB0b1JldHVybi5jbG9zZWQgPSB0aGlzLmNsb3NlZDtcblxuICAgICAgICAgIC8vIEFtIEkgcmVtZW1iZXJpbmcgYW55IHZhbHVlcz9cbiAgICAgICAgICBpZiAodGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgdG9SZXR1cm4ucHJlc2V0ID0gdGhpcy5wcmVzZXQ7XG5cbiAgICAgICAgICAgIGlmICghdG9SZXR1cm4ucmVtZW1iZXJlZCkge1xuICAgICAgICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvUmV0dXJuLmZvbGRlcnMgPSB7fTtcbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24oZWxlbWVudCwga2V5KSB7XG4gICAgICAgICAgICB0b1JldHVybi5mb2xkZXJzW2tleV0gPSBlbGVtZW50LmdldFNhdmVPYmplY3QoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuICAgICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzYXZlQXM6IGZ1bmN0aW9uKHByZXNldE5hbWUpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgICAgICAgLy8gUmV0YWluIGRlZmF1bHQgdmFsdWVzIHVwb24gZmlyc3Qgc2F2ZVxuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMsIHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbcHJlc2V0TmFtZV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuICAgICAgICAgIHRoaXMucHJlc2V0ID0gcHJlc2V0TmFtZTtcbiAgICAgICAgICBhZGRQcmVzZXRPcHRpb24odGhpcywgcHJlc2V0TmFtZSwgdHJ1ZSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZXZlcnQ6IGZ1bmN0aW9uKGd1aSkge1xuXG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2NvbnRyb2xsZXJzLCBmdW5jdGlvbihjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAvLyBNYWtlIHJldmVydCB3b3JrIG9uIERlZmF1bHQuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0Um9vdCgpLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlY2FsbFNhdmVkVmFsdWUoZ3VpIHx8IHRoaXMuZ2V0Um9vdCgpLCBjb250cm9sbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbihmb2xkZXIpIHtcbiAgICAgICAgICAgIGZvbGRlci5yZXZlcnQoZm9sZGVyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghZ3VpKSB7XG4gICAgICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcy5nZXRSb290KCksIGZhbHNlKTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICB9LFxuXG4gICAgICAgIGxpc3RlbjogZnVuY3Rpb24oY29udHJvbGxlcikge1xuXG4gICAgICAgICAgdmFyIGluaXQgPSB0aGlzLl9fbGlzdGVuaW5nLmxlbmd0aCA9PSAwO1xuICAgICAgICAgIHRoaXMuX19saXN0ZW5pbmcucHVzaChjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAoaW5pdCkgdXBkYXRlRGlzcGxheXModGhpcy5fX2xpc3RlbmluZyk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiBhZGQoZ3VpLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIGlmIChvYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBcIiArIG9iamVjdCArIFwiIGhhcyBubyBwcm9wZXJ0eSBcXFwiXCIgKyBwcm9wZXJ0eSArIFwiXFxcIlwiKTtcbiAgICB9XG5cbiAgICB2YXIgY29udHJvbGxlcjtcblxuICAgIGlmIChwYXJhbXMuY29sb3IpIHtcblxuICAgICAgY29udHJvbGxlciA9IG5ldyBDb2xvckNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB2YXIgZmFjdG9yeUFyZ3MgPSBbb2JqZWN0LHByb3BlcnR5XS5jb25jYXQocGFyYW1zLmZhY3RvcnlBcmdzKTtcbiAgICAgIGNvbnRyb2xsZXIgPSBjb250cm9sbGVyRmFjdG9yeS5hcHBseShndWksIGZhY3RvcnlBcmdzKTtcblxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuYmVmb3JlIGluc3RhbmNlb2YgQ29udHJvbGxlcikge1xuICAgICAgcGFyYW1zLmJlZm9yZSA9IHBhcmFtcy5iZWZvcmUuX19saTtcbiAgICB9XG5cbiAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcik7XG5cbiAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5kb21FbGVtZW50LCAnYycpO1xuXG4gICAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZG9tLmFkZENsYXNzKG5hbWUsICdwcm9wZXJ0eS1uYW1lJyk7XG4gICAgbmFtZS5pbm5lckhUTUwgPSBjb250cm9sbGVyLnByb3BlcnR5O1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlci5kb21FbGVtZW50KTtcblxuICAgIHZhciBsaSA9IGFkZFJvdyhndWksIGNvbnRhaW5lciwgcGFyYW1zLmJlZm9yZSk7XG5cbiAgICBkb20uYWRkQ2xhc3MobGksIEdVSS5DTEFTU19DT05UUk9MTEVSX1JPVyk7XG4gICAgZG9tLmFkZENsYXNzKGxpLCB0eXBlb2YgY29udHJvbGxlci5nZXRWYWx1ZSgpKTtcblxuICAgIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpO1xuXG4gICAgZ3VpLl9fY29udHJvbGxlcnMucHVzaChjb250cm9sbGVyKTtcblxuICAgIHJldHVybiBjb250cm9sbGVyO1xuXG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgcm93IHRvIHRoZSBlbmQgb2YgdGhlIEdVSSBvciBiZWZvcmUgYW5vdGhlciByb3cuXG4gICAqXG4gICAqIEBwYXJhbSBndWlcbiAgICogQHBhcmFtIFtkb21dIElmIHNwZWNpZmllZCwgaW5zZXJ0cyB0aGUgZG9tIGNvbnRlbnQgaW4gdGhlIG5ldyByb3dcbiAgICogQHBhcmFtIFtsaUJlZm9yZV0gSWYgc3BlY2lmaWVkLCBwbGFjZXMgdGhlIG5ldyByb3cgYmVmb3JlIGFub3RoZXIgcm93XG4gICAqL1xuICBmdW5jdGlvbiBhZGRSb3coZ3VpLCBkb20sIGxpQmVmb3JlKSB7XG4gICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpZiAoZG9tKSBsaS5hcHBlbmRDaGlsZChkb20pO1xuICAgIGlmIChsaUJlZm9yZSkge1xuICAgICAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGxpLCBwYXJhbXMuYmVmb3JlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3VpLl9fdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH1cbiAgICBndWkub25SZXNpemUoKTtcbiAgICByZXR1cm4gbGk7XG4gIH1cblxuICBmdW5jdGlvbiBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKSB7XG5cbiAgICBjb250cm9sbGVyLl9fbGkgPSBsaTtcbiAgICBjb250cm9sbGVyLl9fZ3VpID0gZ3VpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb250cm9sbGVyLCB7XG5cbiAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbW1vbi50b0FycmF5KGFyZ3VtZW50cyldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzQXJyYXkob3B0aW9ucykgfHwgY29tbW9uLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtvcHRpb25zXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgIG5hbWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgY29udHJvbGxlci5fX2xpLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTCA9IHY7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgfSxcblxuICAgICAgbGlzdGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udHJvbGxlci5fX2d1aS5saXN0ZW4oY29udHJvbGxlcik7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udHJvbGxlci5fX2d1aS5yZW1vdmUoY29udHJvbGxlcik7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBBbGwgc2xpZGVycyBzaG91bGQgYmUgYWNjb21wYW5pZWQgYnkgYSBib3guXG4gICAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyU2xpZGVyKSB7XG5cbiAgICAgIHZhciBib3ggPSBuZXcgTnVtYmVyQ29udHJvbGxlckJveChjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICB7IG1pbjogY29udHJvbGxlci5fX21pbiwgbWF4OiBjb250cm9sbGVyLl9fbWF4LCBzdGVwOiBjb250cm9sbGVyLl9fc3RlcCB9KTtcblxuICAgICAgY29tbW9uLmVhY2goWyd1cGRhdGVEaXNwbGF5JywgJ29uQ2hhbmdlJywgJ29uRmluaXNoQ2hhbmdlJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgcGMgPSBjb250cm9sbGVyW21ldGhvZF07XG4gICAgICAgIHZhciBwYiA9IGJveFttZXRob2RdO1xuICAgICAgICBjb250cm9sbGVyW21ldGhvZF0gPSBib3hbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICBwYy5hcHBseShjb250cm9sbGVyLCBhcmdzKTtcbiAgICAgICAgICByZXR1cm4gcGIuYXBwbHkoYm94LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2hhcy1zbGlkZXInKTtcbiAgICAgIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoYm94LmRvbUVsZW1lbnQsIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJCb3gpIHtcblxuICAgICAgdmFyIHIgPSBmdW5jdGlvbihyZXR1cm5lZCkge1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZGVmaW5lZCBib3RoIGJvdW5kYXJpZXM/XG4gICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21pbikgJiYgY29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19tYXgpKSB7XG5cbiAgICAgICAgICAvLyBXZWxsLCB0aGVuIGxldHMganVzdCByZXBsYWNlIHRoaXMgd2l0aCBhIHNsaWRlci5cbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb250cm9sbGVyLl9fbWluLCBjb250cm9sbGVyLl9fbWF4LCBjb250cm9sbGVyLl9fc3RlcF1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5lZDtcblxuICAgICAgfTtcblxuICAgICAgY29udHJvbGxlci5taW4gPSBjb21tb24uY29tcG9zZShyLCBjb250cm9sbGVyLm1pbik7XG4gICAgICBjb250cm9sbGVyLm1heCA9IGNvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWF4KTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQm9vbGVhbkNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnRzIGRvdWJsZS10b2dnbGVcbiAgICAgIH0pXG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEZ1bmN0aW9uQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYmluZChsaSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2J1dHRvbiwgJ2NsaWNrJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQobGksICdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuX19idXR0b24sICdob3ZlcicpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLnJlbW92ZUNsYXNzKGNvbnRyb2xsZXIuX19idXR0b24sICdob3ZlcicpO1xuICAgICAgfSk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIENvbG9yQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYWRkQ2xhc3MobGksICdjb2xvcicpO1xuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5ID0gY29tbW9uLmNvbXBvc2UoZnVuY3Rpb24ocikge1xuICAgICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBjb250cm9sbGVyLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9LCBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkpO1xuXG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUgPSBjb21tb24uY29tcG9zZShmdW5jdGlvbihyKSB7XG4gICAgICBpZiAoZ3VpLmdldFJvb3QoKS5fX3ByZXNldF9zZWxlY3QgJiYgY29udHJvbGxlci5pc01vZGlmaWVkKCkpIHtcbiAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKGd1aS5nZXRSb290KCksIHRydWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfSwgY29udHJvbGxlci5zZXRWYWx1ZSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKSB7XG5cbiAgICAvLyBGaW5kIHRoZSB0b3Btb3N0IEdVSSwgdGhhdCdzIHdoZXJlIHJlbWVtYmVyZWQgb2JqZWN0cyBsaXZlLlxuICAgIHZhciByb290ID0gZ3VpLmdldFJvb3QoKTtcblxuICAgIC8vIERvZXMgdGhlIG9iamVjdCB3ZSdyZSBjb250cm9sbGluZyBtYXRjaCBhbnl0aGluZyB3ZSd2ZSBiZWVuIHRvbGQgdG9cbiAgICAvLyByZW1lbWJlcj9cbiAgICB2YXIgbWF0Y2hlZF9pbmRleCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKGNvbnRyb2xsZXIub2JqZWN0KTtcblxuICAgIC8vIFdoeSB5ZXMsIGl0IGRvZXMhXG4gICAgaWYgKG1hdGNoZWRfaW5kZXggIT0gLTEpIHtcblxuICAgICAgLy8gTGV0IG1lIGZldGNoIGEgbWFwIG9mIGNvbnRyb2xsZXJzIGZvciB0aGNvbW1vbi5pc09iamVjdC5cbiAgICAgIHZhciBjb250cm9sbGVyX21hcCA9XG4gICAgICAgICAgcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkX2luZGV4XTtcblxuICAgICAgLy8gT2hwLCBJIGJlbGlldmUgdGhpcyBpcyB0aGUgZmlyc3QgY29udHJvbGxlciB3ZSd2ZSBjcmVhdGVkIGZvciB0aGlzXG4gICAgICAvLyBvYmplY3QuIExldHMgbWFrZSB0aGUgbWFwIGZyZXNoLlxuICAgICAgaWYgKGNvbnRyb2xsZXJfbWFwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udHJvbGxlcl9tYXAgPSB7fTtcbiAgICAgICAgcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkX2luZGV4XSA9XG4gICAgICAgICAgICBjb250cm9sbGVyX21hcDtcbiAgICAgIH1cblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGlzIGNvbnRyb2xsZXJcbiAgICAgIGNvbnRyb2xsZXJfbWFwW2NvbnRyb2xsZXIucHJvcGVydHldID0gY29udHJvbGxlcjtcblxuICAgICAgLy8gT2theSwgbm93IGhhdmUgd2Ugc2F2ZWQgYW55IHZhbHVlcyBmb3IgdGhpcyBjb250cm9sbGVyP1xuICAgICAgaWYgKHJvb3QubG9hZCAmJiByb290LmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICAgIHZhciBwcmVzZXRfbWFwID0gcm9vdC5sb2FkLnJlbWVtYmVyZWQ7XG5cbiAgICAgICAgLy8gV2hpY2ggcHJlc2V0IGFyZSB3ZSB0cnlpbmcgdG8gbG9hZD9cbiAgICAgICAgdmFyIHByZXNldDtcblxuICAgICAgICBpZiAocHJlc2V0X21hcFtndWkucHJlc2V0XSkge1xuXG4gICAgICAgICAgcHJlc2V0ID0gcHJlc2V0X21hcFtndWkucHJlc2V0XTtcblxuICAgICAgICB9IGVsc2UgaWYgKHByZXNldF9tYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSkge1xuXG4gICAgICAgICAgLy8gVWhoLCB5b3UgY2FuIGhhdmUgdGhlIGRlZmF1bHQgaW5zdGVhZD9cbiAgICAgICAgICBwcmVzZXQgPSBwcmVzZXRfbWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIC8vIE5hZGEuXG5cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRGlkIHRoZSBsb2FkZWQgb2JqZWN0IHJlbWVtYmVyIHRoY29tbW9uLmlzT2JqZWN0P1xuICAgICAgICBpZiAocHJlc2V0W21hdGNoZWRfaW5kZXhdICYmXG5cbiAgICAgICAgICAvLyBEaWQgd2UgcmVtZW1iZXIgdGhpcyBwYXJ0aWN1bGFyIHByb3BlcnR5P1xuICAgICAgICAgICAgcHJlc2V0W21hdGNoZWRfaW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgIC8vIFdlIGRpZCByZW1lbWJlciBzb21ldGhpbmcgZm9yIHRoaXMgZ3V5IC4uLlxuICAgICAgICAgIHZhciB2YWx1ZSA9IHByZXNldFttYXRjaGVkX2luZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XTtcblxuICAgICAgICAgIC8vIEFuZCB0aGF0J3Mgd2hhdCBpdCBpcy5cbiAgICAgICAgICBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwga2V5KSB7XG4gICAgLy8gVE9ETyBob3cgZG9lcyB0aGlzIGRlYWwgd2l0aCBtdWx0aXBsZSBHVUkncz9cbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiArICcuJyArIGtleTtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkU2F2ZU1lbnUoZ3VpKSB7XG5cbiAgICB2YXIgZGl2ID0gZ3VpLl9fc2F2ZV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgZG9tLmFkZENsYXNzKGd1aS5kb21FbGVtZW50LCAnaGFzLXNhdmUnKTtcblxuICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShkaXYsIGd1aS5fX3VsLmZpcnN0Q2hpbGQpO1xuXG4gICAgZG9tLmFkZENsYXNzKGRpdiwgJ3NhdmUtcm93Jyk7XG5cbiAgICB2YXIgZ2VhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZ2VhcnMuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG4gICAgZG9tLmFkZENsYXNzKGdlYXJzLCAnYnV0dG9uIGdlYXJzJyk7XG5cbiAgICAvLyBUT0RPIHJlcGxhY2Ugd2l0aCBGdW5jdGlvbkNvbnRyb2xsZXJcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnU2F2ZSc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24sICdzYXZlJyk7XG5cbiAgICB2YXIgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24yLmlubmVySFRNTCA9ICdOZXcnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24yLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdzYXZlLWFzJyk7XG5cbiAgICB2YXIgYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24zLmlubmVySFRNTCA9ICdSZXZlcnQnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24zLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjMsICdyZXZlcnQnKTtcblxuICAgIHZhciBzZWxlY3QgPSBndWkuX19wcmVzZXRfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG5cbiAgICBpZiAoZ3VpLmxvYWQgJiYgZ3VpLmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICBjb21tb24uZWFjaChndWkubG9hZC5yZW1lbWJlcmVkLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIGFkZFByZXNldE9wdGlvbihndWksIGtleSwga2V5ID09IGd1aS5wcmVzZXQpO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZG9tLmJpbmQoc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLmlubmVySFRNTCA9IGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICBndWkucHJlc2V0ID0gdGhpcy52YWx1ZTtcblxuICAgIH0pO1xuXG4gICAgZGl2LmFwcGVuZENoaWxkKHNlbGVjdCk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGdlYXJzKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjMpO1xuXG4gICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcblxuICAgICAgdmFyIHNhdmVMb2NhbGx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLXNhdmUtbG9jYWxseScpO1xuICAgICAgdmFyIGV4cGxhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtZXhwbGFpbicpO1xuXG4gICAgICBzYXZlTG9jYWxseS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgdmFyIGxvY2FsU3RvcmFnZUNoZWNrQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLXN0b3JhZ2UnKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZUNoZWNrQm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRXhwbGFpbigpIHtcbiAgICAgICAgZXhwbGFpbi5zdHlsZS5kaXNwbGF5ID0gZ3VpLnVzZUxvY2FsU3RvcmFnZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIHNob3dIaWRlRXhwbGFpbigpO1xuXG4gICAgICAvLyBUT0RPOiBVc2UgYSBib29sZWFuIGNvbnRyb2xsZXIsIGZvb2whXG4gICAgICBkb20uYmluZChsb2NhbFN0b3JhZ2VDaGVja0JveCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBndWkudXNlTG9jYWxTdG9yYWdlID0gIWd1aS51c2VMb2NhbFN0b3JhZ2U7XG4gICAgICAgIHNob3dIaWRlRXhwbGFpbigpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB2YXIgbmV3Q29uc3RydWN0b3JUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1uZXctY29uc3RydWN0b3InKTtcblxuICAgIGRvbS5iaW5kKG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUubWV0YUtleSAmJiAoZS53aGljaCA9PT0gNjcgfHwgZS5rZXlDb2RlID09IDY3KSkge1xuICAgICAgICBTQVZFX0RJQUxPR1VFLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGdlYXJzLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkoZ3VpLmdldFNhdmVPYmplY3QoKSwgdW5kZWZpbmVkLCAyKTtcbiAgICAgIFNBVkVfRElBTE9HVUUuc2hvdygpO1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5mb2N1cygpO1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5zZWxlY3QoKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBndWkuc2F2ZSgpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uMiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcHJlc2V0TmFtZSA9IHByb21wdCgnRW50ZXIgYSBuZXcgcHJlc2V0IG5hbWUuJyk7XG4gICAgICBpZiAocHJlc2V0TmFtZSkgZ3VpLnNhdmVBcyhwcmVzZXROYW1lKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbjMsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZ3VpLnJldmVydCgpO1xuICAgIH0pO1xuXG4vLyAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFJlc2l6ZUhhbmRsZShndWkpIHtcblxuICAgIGd1aS5fX3Jlc2l6ZV9oYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbW1vbi5leHRlbmQoZ3VpLl9fcmVzaXplX2hhbmRsZS5zdHlsZSwge1xuXG4gICAgICB3aWR0aDogJzZweCcsXG4gICAgICBtYXJnaW5MZWZ0OiAnLTNweCcsXG4gICAgICBoZWlnaHQ6ICcyMDBweCcsXG4gICAgICBjdXJzb3I6ICdldy1yZXNpemUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbi8vICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsdWUnXG5cbiAgICB9KTtcblxuICAgIHZhciBwbW91c2VYO1xuXG4gICAgZG9tLmJpbmQoZ3VpLl9fcmVzaXplX2hhbmRsZSwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG4gICAgZG9tLmJpbmQoZ3VpLl9fY2xvc2VCdXR0b24sICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuXG4gICAgZ3VpLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsIGd1aS5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcblxuICAgIGZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcblxuICAgICAgZG9tLmFkZENsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWcoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGd1aS53aWR0aCArPSBwbW91c2VYIC0gZS5jbGllbnRYO1xuICAgICAgZ3VpLm9uUmVzaXplKCk7XG4gICAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnU3RvcCgpIHtcblxuICAgICAgZG9tLnJlbW92ZUNsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBzZXRXaWR0aChndWksIHcpIHtcbiAgICBndWkuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIC8vIEF1dG8gcGxhY2VkIHNhdmUtcm93cyBhcmUgcG9zaXRpb24gZml4ZWQsIHNvIHdlIGhhdmUgdG9cbiAgICAvLyBzZXQgdGhlIHdpZHRoIG1hbnVhbGx5IGlmIHdlIHdhbnQgaXQgdG8gYmxlZWQgdG8gdGhlIGVkZ2VcbiAgICBpZiAoZ3VpLl9fc2F2ZV9yb3cgJiYgZ3VpLmF1dG9QbGFjZSkge1xuICAgICAgZ3VpLl9fc2F2ZV9yb3cuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICB9aWYgKGd1aS5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICBndWkuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRQcmVzZXQoZ3VpLCB1c2VJbml0aWFsVmFsdWVzKSB7XG5cbiAgICB2YXIgdG9SZXR1cm4gPSB7fTtcblxuICAgIC8vIEZvciBlYWNoIG9iamVjdCBJJ20gcmVtZW1iZXJpbmdcbiAgICBjb21tb24uZWFjaChndWkuX19yZW1lbWJlcmVkT2JqZWN0cywgZnVuY3Rpb24odmFsLCBpbmRleCkge1xuXG4gICAgICB2YXIgc2F2ZWRfdmFsdWVzID0ge307XG5cbiAgICAgIC8vIFRoZSBjb250cm9sbGVycyBJJ3ZlIG1hZGUgZm9yIHRoY29tbW9uLmlzT2JqZWN0IGJ5IHByb3BlcnR5XG4gICAgICB2YXIgY29udHJvbGxlcl9tYXAgPVxuICAgICAgICAgIGd1aS5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1tpbmRleF07XG5cbiAgICAgIC8vIFJlbWVtYmVyIGVhY2ggdmFsdWUgZm9yIGVhY2ggcHJvcGVydHlcbiAgICAgIGNvbW1vbi5lYWNoKGNvbnRyb2xsZXJfbWFwLCBmdW5jdGlvbihjb250cm9sbGVyLCBwcm9wZXJ0eSkge1xuICAgICAgICBzYXZlZF92YWx1ZXNbcHJvcGVydHldID0gdXNlSW5pdGlhbFZhbHVlcyA/IGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlIDogY29udHJvbGxlci5nZXRWYWx1ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNhdmUgdGhlIHZhbHVlcyBmb3IgdGhjb21tb24uaXNPYmplY3RcbiAgICAgIHRvUmV0dXJuW2luZGV4XSA9IHNhdmVkX3ZhbHVlcztcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcmVzZXRPcHRpb24oZ3VpLCBuYW1lLCBzZXRTZWxlY3RlZCkge1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHQuaW5uZXJIVE1MID0gbmFtZTtcbiAgICBvcHQudmFsdWUgPSBuYW1lO1xuICAgIGd1aS5fX3ByZXNldF9zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICBpZiAoc2V0U2VsZWN0ZWQpIHtcbiAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoIC0gMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRQcmVzZXRTZWxlY3RJbmRleChndWkpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZSA9PSBndWkucHJlc2V0KSB7XG4gICAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtQcmVzZXRNb2RpZmllZChndWksIG1vZGlmaWVkKSB7XG4gICAgdmFyIG9wdCA9IGd1aS5fX3ByZXNldF9zZWxlY3RbZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4XTtcbi8vICAgIGNvbnNvbGUubG9nKCdtYXJrJywgbW9kaWZpZWQsIG9wdCk7XG4gICAgaWYgKG1vZGlmaWVkKSB7XG4gICAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlICsgXCIqXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KSB7XG5cblxuICAgIGlmIChjb250cm9sbGVyQXJyYXkubGVuZ3RoICE9IDApIHtcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBjb21tb24uZWFjaChjb250cm9sbGVyQXJyYXksIGZ1bmN0aW9uKGMpIHtcbiAgICAgIGMudXBkYXRlRGlzcGxheSgpO1xuICAgIH0pO1xuXG4gIH1cblxuICByZXR1cm4gR1VJO1xuXG59KShkYXQudXRpbHMuY3NzLFxuXCI8ZGl2IGlkPVxcXCJkZy1zYXZlXFxcIiBjbGFzcz1cXFwiZGcgZGlhbG9ndWVcXFwiPlxcblxcbiAgSGVyZSdzIHRoZSBuZXcgbG9hZCBwYXJhbWV0ZXIgZm9yIHlvdXIgPGNvZGU+R1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yOlxcblxcbiAgPHRleHRhcmVhIGlkPVxcXCJkZy1uZXctY29uc3RydWN0b3JcXFwiPjwvdGV4dGFyZWE+XFxuXFxuICA8ZGl2IGlkPVxcXCJkZy1zYXZlLWxvY2FsbHlcXFwiPlxcblxcbiAgICA8aW5wdXQgaWQ9XFxcImRnLWxvY2FsLXN0b3JhZ2VcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIi8+IEF1dG9tYXRpY2FsbHkgc2F2ZVxcbiAgICB2YWx1ZXMgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBvbiBleGl0LlxcblxcbiAgICA8ZGl2IGlkPVxcXCJkZy1sb2NhbC1leHBsYWluXFxcIj5UaGUgdmFsdWVzIHNhdmVkIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gd2lsbFxcbiAgICAgIG92ZXJyaWRlIHRob3NlIHBhc3NlZCB0byA8Y29kZT5kYXQuR1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yLiBUaGlzIG1ha2VzIGl0XFxuICAgICAgZWFzaWVyIHRvIHdvcmsgaW5jcmVtZW50YWxseSwgYnV0IDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gaXMgZnJhZ2lsZSxcXG4gICAgICBhbmQgeW91ciBmcmllbmRzIG1heSBub3Qgc2VlIHRoZSBzYW1lIHZhbHVlcyB5b3UgZG8uXFxuICAgICAgXFxuICAgIDwvZGl2PlxcbiAgICBcXG4gIDwvZGl2PlxcblxcbjwvZGl2PlwiLFxuXCIuZGcgdWx7bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2NsZWFyOmJvdGh9LmRnLmFje3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtyaWdodDowO2hlaWdodDowO3otaW5kZXg6MH0uZGc6bm90KC5hYykgLm1haW57b3ZlcmZsb3c6aGlkZGVufS5kZy5tYWluey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXJ9LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93e292ZXJmbG93LXk6YXV0b30uZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3cgLmNsb3NlLWJ1dHRvbntvcGFjaXR5OjE7bWFyZ2luLXRvcDotMXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICMyYzJjMmN9LmRnLm1haW4gdWwuY2xvc2VkIC5jbG9zZS1idXR0b257b3BhY2l0eToxICFpbXBvcnRhbnR9LmRnLm1haW46aG92ZXIgLmNsb3NlLWJ1dHRvbiwuZGcubWFpbiAuY2xvc2UtYnV0dG9uLmRyYWd7b3BhY2l0eToxfS5kZy5tYWluIC5jbG9zZS1idXR0b257LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjtib3JkZXI6MDtwb3NpdGlvbjphYnNvbHV0ZTtsaW5lLWhlaWdodDoxOXB4O2hlaWdodDoyMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6IzAwMH0uZGcubWFpbiAuY2xvc2UtYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzExMX0uZGcuYXtmbG9hdDpyaWdodDttYXJnaW4tcmlnaHQ6MTVweDtvdmVyZmxvdy14OmhpZGRlbn0uZGcuYS5oYXMtc2F2ZSB1bHttYXJnaW4tdG9wOjI3cHh9LmRnLmEuaGFzLXNhdmUgdWwuY2xvc2Vke21hcmdpbi10b3A6MH0uZGcuYSAuc2F2ZS1yb3d7cG9zaXRpb246Zml4ZWQ7dG9wOjA7ei1pbmRleDoxMDAyfS5kZyBsaXstd2Via2l0LXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDstbW96LXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dH0uZGcgbGk6bm90KC5mb2xkZXIpe2N1cnNvcjphdXRvO2hlaWdodDoyN3B4O2xpbmUtaGVpZ2h0OjI3cHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MCA0cHggMCA1cHh9LmRnIGxpLmZvbGRlcntwYWRkaW5nOjA7Ym9yZGVyLWxlZnQ6NHB4IHNvbGlkIHJnYmEoMCwwLDAsMCl9LmRnIGxpLnRpdGxle2N1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0Oi00cHh9LmRnIC5jbG9zZWQgbGk6bm90KC50aXRsZSksLmRnIC5jbG9zZWQgdWwgbGksLmRnIC5jbG9zZWQgdWwgbGkgPiAqe2hlaWdodDowO292ZXJmbG93OmhpZGRlbjtib3JkZXI6MH0uZGcgLmNye2NsZWFyOmJvdGg7cGFkZGluZy1sZWZ0OjNweDtoZWlnaHQ6MjdweH0uZGcgLnByb3BlcnR5LW5hbWV7Y3Vyc29yOmRlZmF1bHQ7ZmxvYXQ6bGVmdDtjbGVhcjpsZWZ0O3dpZHRoOjQwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30uZGcgLmN7ZmxvYXQ6bGVmdDt3aWR0aDo2MCV9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF17Ym9yZGVyOjA7bWFyZ2luLXRvcDo0cHg7cGFkZGluZzozcHg7d2lkdGg6MTAwJTtmbG9hdDpyaWdodH0uZGcgLmhhcy1zbGlkZXIgaW5wdXRbdHlwZT10ZXh0XXt3aWR0aDozMCU7bWFyZ2luLWxlZnQ6MH0uZGcgLnNsaWRlcntmbG9hdDpsZWZ0O3dpZHRoOjY2JTttYXJnaW4tbGVmdDotNXB4O21hcmdpbi1yaWdodDowO2hlaWdodDoxOXB4O21hcmdpbi10b3A6NHB4fS5kZyAuc2xpZGVyLWZne2hlaWdodDoxMDAlfS5kZyAuYyBpbnB1dFt0eXBlPWNoZWNrYm94XXttYXJnaW4tdG9wOjlweH0uZGcgLmMgc2VsZWN0e21hcmdpbi10b3A6NXB4fS5kZyAuY3IuZnVuY3Rpb24sLmRnIC5jci5mdW5jdGlvbiAucHJvcGVydHktbmFtZSwuZGcgLmNyLmZ1bmN0aW9uICosLmRnIC5jci5ib29sZWFuLC5kZyAuY3IuYm9vbGVhbiAqe2N1cnNvcjpwb2ludGVyfS5kZyAuc2VsZWN0b3J7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi1sZWZ0Oi05cHg7bWFyZ2luLXRvcDoyM3B4O3otaW5kZXg6MTB9LmRnIC5jOmhvdmVyIC5zZWxlY3RvciwuZGcgLnNlbGVjdG9yLmRyYWd7ZGlzcGxheTpibG9ja30uZGcgbGkuc2F2ZS1yb3d7cGFkZGluZzowfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MHB4IDZweH0uZGcuZGlhbG9ndWV7YmFja2dyb3VuZC1jb2xvcjojMjIyO3dpZHRoOjQ2MHB4O3BhZGRpbmc6MTVweDtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxNXB4fSNkZy1uZXctY29uc3RydWN0b3J7cGFkZGluZzoxMHB4O2NvbG9yOiMyMjI7Zm9udC1mYW1pbHk6TW9uYWNvLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHg7Ym9yZGVyOjA7cmVzaXplOm5vbmU7Ym94LXNoYWRvdzppbnNldCAxcHggMXB4IDFweCAjODg4O3dvcmQtd3JhcDpicmVhay13b3JkO21hcmdpbjoxMnB4IDA7ZGlzcGxheTpibG9jazt3aWR0aDo0NDBweDtvdmVyZmxvdy15OnNjcm9sbDtoZWlnaHQ6MTAwcHg7cG9zaXRpb246cmVsYXRpdmV9I2RnLWxvY2FsLWV4cGxhaW57ZGlzcGxheTpub25lO2ZvbnQtc2l6ZToxMXB4O2xpbmUtaGVpZ2h0OjE3cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZC1jb2xvcjojMzMzO3BhZGRpbmc6OHB4O21hcmdpbi10b3A6MTBweH0jZGctbG9jYWwtZXhwbGFpbiBjb2Rle2ZvbnQtc2l6ZToxMHB4fSNkYXQtZ3VpLXNhdmUtbG9jYWxseXtkaXNwbGF5Om5vbmV9LmRne2NvbG9yOiNlZWU7Zm9udDoxMXB4ICdMdWNpZGEgR3JhbmRlJywgc2Fucy1zZXJpZjt0ZXh0LXNoYWRvdzowIC0xcHggMCAjMTExfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhcnt3aWR0aDo1cHg7YmFja2dyb3VuZDojMWExYTFhfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXJ7aGVpZ2h0OjA7ZGlzcGxheTpub25lfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhci10aHVtYntib3JkZXItcmFkaXVzOjVweDtiYWNrZ3JvdW5kOiM2NzY3Njd9LmRnIGxpOm5vdCguZm9sZGVyKXtiYWNrZ3JvdW5kOiMxYTFhMWE7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgIzJjMmMyY30uZGcgbGkuc2F2ZS1yb3d7bGluZS1oZWlnaHQ6MjVweDtiYWNrZ3JvdW5kOiNkYWQ1Y2I7Ym9yZGVyOjB9LmRnIGxpLnNhdmUtcm93IHNlbGVjdHttYXJnaW4tbGVmdDo1cHg7d2lkdGg6MTA4cHh9LmRnIGxpLnNhdmUtcm93IC5idXR0b257bWFyZ2luLWxlZnQ6NXB4O21hcmdpbi10b3A6MXB4O2JvcmRlci1yYWRpdXM6MnB4O2ZvbnQtc2l6ZTo5cHg7bGluZS1oZWlnaHQ6N3B4O3BhZGRpbmc6NHB4IDRweCA1cHggNHB4O2JhY2tncm91bmQ6I2M1YmRhZDtjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgMXB4IDAgI2IwYTU4Zjtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGY7Y3Vyc29yOnBvaW50ZXJ9LmRnIGxpLnNhdmUtcm93IC5idXR0b24uZ2VhcnN7YmFja2dyb3VuZDojYzViZGFkIHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFzQUFBQU5DQVlBQUFCLzlaUTdBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQVFKSlJFRlVlTnBpWUtBVS9QLy9Qd0dJQy9BcENBQmlCU0FXK0k4QUNsQWNnS3hRNFQ5aG9NQUVVcnh4MlFTR042K2VnRFgrL3ZXVDRlN044MkFNWW9QQXgvZXZ3V29Zb1NZYkFDWDJzN0t4Q3h6Y3NlekRoM2V2Rm9ERUJZVEVFcXljZ2dXQXpBOUF1VVNRUWdlWVBhOWZQdjYvWVdtL0FjeDVJUGI3dHkvZncrUVpibHc2N3ZEczhSMFlIeVFoZ09ieCt5QUprQnFtRzVkUFBEaDFhUE9HUi9ldWdXMEc0dmxJb1RJZnlGY0ErUWVraGhISmhQZFF4YmlBSWd1TUJUUVpyUEQ3MTA4TTZyb1dZREZRaUlBQXY2QW93LzFiRndYZ2lzK2YyTFVBeW53b0lhTmN6OFhOeDNEbDdNRUpVREdRcHg5Z3RROFlDdWVCK0QyNk9FQ0FBUURhZHQ3ZTQ2RDQyUUFBQUFCSlJVNUVya0pnZ2c9PSkgMnB4IDFweCBuby1yZXBlYXQ7aGVpZ2h0OjdweDt3aWR0aDo4cHh9LmRnIGxpLnNhdmUtcm93IC5idXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojYmFiMTllO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4Zn0uZGcgbGkuZm9sZGVye2JvcmRlci1ib3R0b206MH0uZGcgbGkudGl0bGV7cGFkZGluZy1sZWZ0OjE2cHg7YmFja2dyb3VuZDojMDAwIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEkraEtnRnhvQ2dBT3c9PSkgNnB4IDEwcHggbm8tcmVwZWF0O2N1cnNvcjpwb2ludGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKX0uZGcgLmNsb3NlZCBsaS50aXRsZXtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEdJV3FNQ2JXQUVBT3c9PSl9LmRnIC5jci5ib29sZWFue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjODA2Nzg3fS5kZyAuY3IuZnVuY3Rpb257Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICNlNjFkNWZ9LmRnIC5jci5udW1iZXJ7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMyZmExZDZ9LmRnIC5jci5udW1iZXIgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMmZhMWQ2fS5kZyAuY3Iuc3RyaW5ne2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMWVkMzZmfS5kZyAuY3Iuc3RyaW5nIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzFlZDM2Zn0uZGcgLmNyLmZ1bmN0aW9uOmhvdmVyLC5kZyAuY3IuYm9vbGVhbjpob3ZlcntiYWNrZ3JvdW5kOiMxMTF9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF17YmFja2dyb3VuZDojMzAzMDMwO291dGxpbmU6bm9uZX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06Zm9jdXN7YmFja2dyb3VuZDojNDk0OTQ5O2NvbG9yOiNmZmZ9LmRnIC5jIC5zbGlkZXJ7YmFja2dyb3VuZDojMzAzMDMwO2N1cnNvcjpldy1yZXNpemV9LmRnIC5jIC5zbGlkZXItZmd7YmFja2dyb3VuZDojMmZhMWQ2fS5kZyAuYyAuc2xpZGVyOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgLnNsaWRlcjpob3ZlciAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzQ0YWJkYX1cXG5cIixcbmRhdC5jb250cm9sbGVycy5mYWN0b3J5ID0gKGZ1bmN0aW9uIChPcHRpb25Db250cm9sbGVyLCBOdW1iZXJDb250cm9sbGVyQm94LCBOdW1iZXJDb250cm9sbGVyU2xpZGVyLCBTdHJpbmdDb250cm9sbGVyLCBGdW5jdGlvbkNvbnRyb2xsZXIsIEJvb2xlYW5Db250cm9sbGVyLCBjb21tb24pIHtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICB2YXIgaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgICAgICAvLyBQcm92aWRpbmcgb3B0aW9ucz9cbiAgICAgICAgaWYgKGNvbW1vbi5pc0FycmF5KGFyZ3VtZW50c1syXSkgfHwgY29tbW9uLmlzT2JqZWN0KGFyZ3VtZW50c1syXSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IE9wdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb3ZpZGluZyBhIG1hcD9cblxuICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGluaXRpYWxWYWx1ZSkpIHtcblxuICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoYXJndW1lbnRzWzJdKSAmJiBjb21tb24uaXNOdW1iZXIoYXJndW1lbnRzWzNdKSkge1xuXG4gICAgICAgICAgICAvLyBIYXMgbWluIGFuZCBtYXguXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyQm94KG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBhcmd1bWVudHNbMl0sIG1heDogYXJndW1lbnRzWzNdIH0pO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzU3RyaW5nKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0NvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzRnVuY3Rpb24oaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNCb29sZWFuKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0pKGRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3gsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbmRhdC5jb250cm9sbGVycy5TdHJpbmdDb250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSB0ZXh0IGlucHV0IHRvIGFsdGVyIHRoZSBzdHJpbmcgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIFN0cmluZ0NvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5dXAnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuXG4gIH07XG5cbiAgU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBTdHJpbmdDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gU3RvcHMgdGhlIGNhcmV0IGZyb20gbW92aW5nIG9uIGFjY291bnQgb2Y6XG4gICAgICAgICAgLy8ga2V5dXAgLT4gc2V0VmFsdWUgLT4gdXBkYXRlRGlzcGxheVxuICAgICAgICAgIGlmICghZG9tLmlzQWN0aXZlKHRoaXMuX19pbnB1dCkpIHtcbiAgICAgICAgICAgIHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBTdHJpbmdDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCxcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyLFxuZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQ29sb3JDb250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIENvbG9yLCBpbnRlcnByZXQsIGNvbW1vbikge1xuXG4gIHZhciBDb2xvckNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICBDb2xvckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdGhpcy5fX2NvbG9yID0gbmV3IENvbG9yKHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgdGhpcy5fX3RlbXAgPSBuZXcgQ29sb3IoMCk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG5cbiAgICB0aGlzLl9fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuY2xhc3NOYW1lID0gJ3NlbGVjdG9yJztcblxuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQuY2xhc3NOYW1lID0gJ3NhdHVyYXRpb24tZmllbGQnO1xuXG4gICAgdGhpcy5fX2ZpZWxkX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fZmllbGRfa25vYi5jbGFzc05hbWUgPSAnZmllbGQta25vYic7XG4gICAgdGhpcy5fX2ZpZWxkX2tub2JfYm9yZGVyID0gJzJweCBzb2xpZCAnO1xuXG4gICAgdGhpcy5fX2h1ZV9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2h1ZV9rbm9iLmNsYXNzTmFtZSA9ICdodWUta25vYic7XG5cbiAgICB0aGlzLl9faHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2h1ZV9maWVsZC5jbGFzc05hbWUgPSAnaHVlLWZpZWxkJztcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgPSAnMCAxcHggMXB4ICc7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHsgLy8gb24gZW50ZXJcbiAgICAgICAgb25CbHVyLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zZWxlY3RvciwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgZG9tXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLCAnZHJhZycpXG4gICAgICAgIC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fc2VsZWN0b3IsICdkcmFnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgdmFsdWVfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3NlbGVjdG9yLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEyMnB4JyxcbiAgICAgIGhlaWdodDogJzEwMnB4JyxcbiAgICAgIHBhZGRpbmc6ICczcHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzIyMicsXG4gICAgICBib3hTaGFkb3c6ICcwcHggMXB4IDNweCByZ2JhKDAsMCwwLDAuMyknXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTJweCcsXG4gICAgICBoZWlnaHQ6ICcxMnB4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5fX2ZpZWxkX2tub2JfYm9yZGVyICsgKHRoaXMuX19jb2xvci52IDwgLjUgPyAnI2ZmZicgOiAnIzAwMCcpLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG4gICAgXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faHVlX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxNXB4JyxcbiAgICAgIGhlaWdodDogJzJweCcsXG4gICAgICBib3JkZXJSaWdodDogJzRweCBzb2xpZCAjZmZmJyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDBweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBtYXJnaW5SaWdodDogJzNweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHZhbHVlX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcbiAgICB9KTtcbiAgICBcbiAgICBsaW5lYXJHcmFkaWVudCh2YWx1ZV9maWVsZCwgJ3RvcCcsICdyZ2JhKDAsMCwwLDApJywgJyMwMDAnKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2h1ZV9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxNXB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgY3Vyc29yOiAnbnMtcmVzaXplJ1xuICAgIH0pO1xuXG4gICAgaHVlR3JhZGllbnQodGhpcy5fX2h1ZV9maWVsZCk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgb3V0bGluZTogJ25vbmUnLFxuLy8gICAgICB3aWR0aDogJzEyMHB4JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4vLyAgICAgIHBhZGRpbmc6ICc0cHgnLFxuLy8gICAgICBtYXJnaW5Cb3R0b206ICc2cHgnLFxuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlcjogMCxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoMCwwLDAsMC43KSdcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcbiAgICBkb20uYmluZCh0aGlzLl9fZmllbGRfa25vYiwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faHVlX2ZpZWxkLCAnbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgc2V0SChlKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZEgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZmllbGREb3duKGUpIHtcbiAgICAgIHNldFNWKGUpO1xuICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnbm9uZSc7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kU1YpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuYmluZFNWKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRTVik7XG4gICAgICAvLyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLnZhbHVlKTtcbiAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuICAgICAgICBfdGhpcy5fX2NvbG9yLl9fc3RhdGUgPSBpO1xuICAgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlID0gX3RoaXMuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuYmluZEgoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kSCk7XG4gICAgfVxuXG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQuYXBwZW5kQ2hpbGQodmFsdWVfZmllbGQpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9fZmllbGRfa25vYik7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgdGhpcy5fX2h1ZV9maWVsZC5hcHBlbmRDaGlsZCh0aGlzLl9faHVlX2tub2IpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19zZWxlY3Rvcik7XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGZ1bmN0aW9uIHNldFNWKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdyA9IGRvbS5nZXRXaWR0aChfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgICAgdmFyIG8gPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgICB2YXIgcyA9IChlLmNsaWVudFggLSBvLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQpIC8gdztcbiAgICAgIHZhciB2ID0gMSAtIChlLmNsaWVudFkgLSBvLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAvIHc7XG5cbiAgICAgIGlmICh2ID4gMSkgdiA9IDE7XG4gICAgICBlbHNlIGlmICh2IDwgMCkgdiA9IDA7XG5cbiAgICAgIGlmIChzID4gMSkgcyA9IDE7XG4gICAgICBlbHNlIGlmIChzIDwgMCkgcyA9IDA7XG5cbiAgICAgIF90aGlzLl9fY29sb3IudiA9IHY7XG4gICAgICBfdGhpcy5fX2NvbG9yLnMgPSBzO1xuXG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG5cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SChlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHMgPSBkb20uZ2V0SGVpZ2h0KF90aGlzLl9faHVlX2ZpZWxkKTtcbiAgICAgIHZhciBvID0gZG9tLmdldE9mZnNldChfdGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgICB2YXIgaCA9IDEgLSAoZS5jbGllbnRZIC0gby50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLyBzO1xuXG4gICAgICBpZiAoaCA+IDEpIGggPSAxO1xuICAgICAgZWxzZSBpZiAoaCA8IDApIGggPSAwO1xuXG4gICAgICBfdGhpcy5fX2NvbG9yLmggPSBoICogMzYwO1xuXG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICB9O1xuXG4gIENvbG9yQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBDb2xvckNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMuZ2V0VmFsdWUoKSk7XG5cbiAgICAgICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgdmFyIG1pc21hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBtaXNtYXRjaCBvbiB0aGUgaW50ZXJwcmV0ZWQgdmFsdWUuXG5cbiAgICAgICAgICAgIGNvbW1vbi5lYWNoKENvbG9yLkNPTVBPTkVOVFMsIGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbW1vbi5pc1VuZGVmaW5lZChpW2NvbXBvbmVudF0pICYmXG4gICAgICAgICAgICAgICAgICAhY29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19jb2xvci5fX3N0YXRlW2NvbXBvbmVudF0pICYmXG4gICAgICAgICAgICAgICAgICBpW2NvbXBvbmVudF0gIT09IHRoaXMuX19jb2xvci5fX3N0YXRlW2NvbXBvbmVudF0pIHtcbiAgICAgICAgICAgICAgICBtaXNtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9OyAvLyBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgLy8gSWYgbm90aGluZyBkaXZlcmdlcywgd2Uga2VlcCBvdXIgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgICAgICAvLyBmb3Igc3RhdGVmdWxuZXNzLCBvdGhlcndpc2Ugd2UgcmVjYWxjdWxhdGUgZnJlc2hcbiAgICAgICAgICAgIGlmIChtaXNtYXRjaCkge1xuICAgICAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19jb2xvci5fX3N0YXRlLCBpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3RlbXAuX19zdGF0ZSwgdGhpcy5fX2NvbG9yLl9fc3RhdGUpO1xuXG4gICAgICAgICAgdGhpcy5fX3RlbXAuYSA9IDE7XG5cbiAgICAgICAgICB2YXIgZmxpcCA9ICh0aGlzLl9fY29sb3IudiA8IC41IHx8IHRoaXMuX19jb2xvci5zID4gLjUpID8gMjU1IDogMDtcbiAgICAgICAgICB2YXIgX2ZsaXAgPSAyNTUgLSBmbGlwO1xuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgICAgICAgbWFyZ2luTGVmdDogMTAwICogdGhpcy5fX2NvbG9yLnMgLSA3ICsgJ3B4JyxcbiAgICAgICAgICAgIG1hcmdpblRvcDogMTAwICogKDEgLSB0aGlzLl9fY29sb3IudikgLSA3ICsgJ3B4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX3RlbXAudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGJvcmRlcjogdGhpcy5fX2ZpZWxkX2tub2JfYm9yZGVyICsgJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsnKSdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuX19odWVfa25vYi5zdHlsZS5tYXJnaW5Ub3AgPSAoMSAtIHRoaXMuX19jb2xvci5oIC8gMzYwKSAqIDEwMCArICdweCdcblxuICAgICAgICAgIHRoaXMuX190ZW1wLnMgPSAxO1xuICAgICAgICAgIHRoaXMuX190ZW1wLnYgPSAxO1xuXG4gICAgICAgICAgbGluZWFyR3JhZGllbnQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQsICdsZWZ0JywgJyNmZmYnLCB0aGlzLl9fdGVtcC50b1N0cmluZygpKTtcblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuX19jb2xvci50b1N0cmluZygpLFxuICAgICAgICAgICAgY29sb3I6ICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArJyknLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsnLC43KSdcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuICBcbiAgdmFyIHZlbmRvcnMgPSBbJy1tb3otJywnLW8tJywnLXdlYmtpdC0nLCctbXMtJywnJ107XG4gIFxuICBmdW5jdGlvbiBsaW5lYXJHcmFkaWVudChlbGVtLCB4LCBhLCBiKSB7XG4gICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgY29tbW9uLmVhY2godmVuZG9ycywgZnVuY3Rpb24odmVuZG9yKSB7XG4gICAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6ICcgKyB2ZW5kb3IgKyAnbGluZWFyLWdyYWRpZW50KCcreCsnLCAnK2ErJyAwJSwgJyArIGIgKyAnIDEwMCUpOyAnO1xuICAgIH0pO1xuICB9XG4gIFxuICBmdW5jdGlvbiBodWVHcmFkaWVudChlbGVtKSB7XG4gICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCAjZmYwMGZmIDE3JSwgIzAwMDBmZiAzNCUsICMwMGZmZmYgNTAlLCAjMDBmZjAwIDY3JSwgI2ZmZmYwMCA4NCUsICNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gIH1cblxuXG4gIHJldHVybiBDb2xvckNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQuY29sb3IuQ29sb3IgPSAoZnVuY3Rpb24gKGludGVycHJldCwgbWF0aCwgdG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciBDb2xvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5fX3N0YXRlID0gaW50ZXJwcmV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpZiAodGhpcy5fX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgJ0ZhaWxlZCB0byBpbnRlcnByZXQgY29sb3IgYXJndW1lbnRzJztcbiAgICB9XG5cbiAgICB0aGlzLl9fc3RhdGUuYSA9IHRoaXMuX19zdGF0ZS5hIHx8IDE7XG5cblxuICB9O1xuXG4gIENvbG9yLkNPTVBPTkVOVFMgPSBbJ3InLCdnJywnYicsJ2gnLCdzJywndicsJ2hleCcsJ2EnXTtcblxuICBjb21tb24uZXh0ZW5kKENvbG9yLnByb3RvdHlwZSwge1xuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nKHRoaXMpO1xuICAgIH0sXG5cbiAgICB0b09yaWdpbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuY29udmVyc2lvbi53cml0ZSh0aGlzKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3InLCAyKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2cnLCAxKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2InLCAwKTtcblxuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnaCcpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncycpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAndicpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdhJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuYTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICB0aGlzLl9fc3RhdGUuYSA9IHY7XG4gICAgfVxuXG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdoZXgnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hFWCcpIHtcbiAgICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IG1hdGgucmdiX3RvX2hleCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5oZXg7XG5cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIRVgnO1xuICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XG5cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVmaW5lUkdCQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ1JHQicpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgICAgIH1cblxuICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdSR0InKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ1JHQic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiBkZWZpbmVIU1ZDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKVxuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIU1YnKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hTVic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZVJHQihjb2xvciwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIRVgnKSB7XG5cbiAgICAgIGNvbG9yLl9fc3RhdGVbY29tcG9uZW50XSA9IG1hdGguY29tcG9uZW50X2Zyb21faGV4KGNvbG9yLl9fc3RhdGUuaGV4LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICB9IGVsc2UgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XG5cbiAgICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSwgbWF0aC5oc3ZfdG9fcmdiKGNvbG9yLl9fc3RhdGUuaCwgY29sb3IuX19zdGF0ZS5zLCBjb2xvci5fX3N0YXRlLnYpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93ICdDb3JydXB0ZWQgY29sb3Igc3RhdGUnO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZUhTVihjb2xvcikge1xuXG4gICAgdmFyIHJlc3VsdCA9IG1hdGgucmdiX3RvX2hzdihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHM6IHJlc3VsdC5zLFxuICAgICAgICAgIHY6IHJlc3VsdC52XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFjb21tb24uaXNOYU4ocmVzdWx0LmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSByZXN1bHQuaDtcbiAgICB9IGVsc2UgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5fX3N0YXRlLmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSAwO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIENvbG9yO1xuXG59KShkYXQuY29sb3IuaW50ZXJwcmV0LFxuZGF0LmNvbG9yLm1hdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0bXBDb21wb25lbnQ7XG5cbiAgcmV0dXJuIHtcblxuICAgIGhzdl90b19yZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcblxuICAgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcblxuICAgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgICB2YXIgcSA9IHYgKiAoMS4wIC0gKGYgKiBzKSk7XG4gICAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKCgxLjAgLSBmKSAqIHMpKTtcbiAgICAgIHZhciBjID0gW1xuICAgICAgICBbdiwgdCwgcF0sXG4gICAgICAgIFtxLCB2LCBwXSxcbiAgICAgICAgW3AsIHYsIHRdLFxuICAgICAgICBbcCwgcSwgdl0sXG4gICAgICAgIFt0LCBwLCB2XSxcbiAgICAgICAgW3YsIHAsIHFdXG4gICAgICBdW2hpXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgICAgYjogY1syXSAqIDI1NVxuICAgICAgfTtcblxuICAgIH0sXG5cbiAgICByZ2JfdG9faHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbixcbiAgICAgICAgICBoLCBzO1xuXG4gICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBOYU4sXG4gICAgICAgICAgczogMCxcbiAgICAgICAgICB2OiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChyID09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIGlmIChnID09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogaCAqIDM2MCxcbiAgICAgICAgczogcyxcbiAgICAgICAgdjogbWF4IC8gMjU1XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZ2JfdG9faGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICAgIHJldHVybiBoZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgICAgcmV0dXJuIChoZXggPj4gKGNvbXBvbmVudEluZGV4ICogOCkpICYgMHhGRjtcbiAgICB9LFxuXG4gICAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgKGhleCAmIH4gKDB4RkYgPDwgdG1wQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gIH1cblxufSkoKSxcbmRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbG9yLmludGVycHJldCxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LnV0aWxzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIHJlcXVpcmVqcyB2ZXJzaW9uIG9mIFBhdWwgSXJpc2gncyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICogaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgICovXG5cbiAgcmV0dXJuIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG5cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG5cbiAgICAgIH07XG59KSgpLFxuZGF0LmRvbS5DZW50ZXJlZERpdiA9IChmdW5jdGlvbiAoZG9tLCBjb21tb24pIHtcblxuXG4gIHZhciBDZW50ZXJlZERpdiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbW1vbi5leHRlbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZSwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjgpJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAwJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcblxuICAgIGRvbS5tYWtlRnVsbHNjcmVlbih0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbW1vbi5leHRlbmQodGhpcy5kb21FbGVtZW50LnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDEnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICctd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2Utb3V0LCBvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgZG9tLmJpbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5oaWRlKCk7XG4gICAgfSk7XG5cblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIFxuXG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbi8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNTIlJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuXG4gICAgdGhpcy5sYXlvdXQoKTtcblxuICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICB9KTtcblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xuICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcblxuICAgIH07XG5cbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuLy8gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICc0OCUnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGgvMiAtIGRvbS5nZXRXaWR0aCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IHdpbmRvdy5pbm5lckhlaWdodC8yIC0gZG9tLmdldEhlaWdodCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XG4gIH07XG4gIFxuICBmdW5jdGlvbiBsb2NrU2Nyb2xsKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxuXG4gIHJldHVybiBDZW50ZXJlZERpdjtcblxufSkoZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZGF0LWd1aS92ZW5kb3IvZGF0Lmd1aS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZGF0ID0gbW9kdWxlLmV4cG9ydHMgPSBkYXQgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29sb3IgPSBkYXQuY29sb3IgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQudXRpbHMgPSBkYXQudXRpbHMgfHwge307XG5cbmRhdC51dGlscy5jb21tb24gPSAoZnVuY3Rpb24gKCkge1xuICBcbiAgdmFyIEFSUl9FQUNIID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG4gIHZhciBBUlJfU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIEJhbmQtYWlkIG1ldGhvZHMgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBhIGxvdCBlYXNpZXIgaW4gSmF2YVNjcmlwdC5cbiAgICogSW1wbGVtZW50YXRpb24gYW5kIHN0cnVjdHVyZSBpbnNwaXJlZCBieSB1bmRlcnNjb3JlLmpzXG4gICAqIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5jb20vdW5kZXJzY29yZS9cbiAgICovXG5cbiAgcmV0dXJuIHsgXG4gICAgXG4gICAgQlJFQUs6IHt9LFxuICBcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICghdGhpcy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmYXVsdHM6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICh0aGlzLmlzVW5kZWZpbmVkKHRhcmdldFtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIFxuICAgIH0sXG4gICAgXG4gICAgY29tcG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9DYWxsID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdG9DYWxsLmxlbmd0aCAtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gW3RvQ2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBlYWNoOiBmdW5jdGlvbihvYmosIGl0ciwgc2NvcGUpIHtcblxuICAgICAgXG4gICAgICBpZiAoQVJSX0VBQ0ggJiYgb2JqLmZvckVhY2ggPT09IEFSUl9FQUNIKSB7IFxuICAgICAgICBcbiAgICAgICAgb2JqLmZvckVhY2goaXRyLCBzY29wZSk7XG4gICAgICAgIFxuICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSBvYmoubGVuZ3RoICsgMCkgeyAvLyBJcyBudW1iZXIgYnV0IG5vdCBOYU5cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBrZXkgPCBsOyBrZXkrKylcbiAgICAgICAgICBpZiAoa2V5IGluIG9iaiAmJiBpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIFxuICAgICAgICAgIGlmIChpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmZXI6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgc2V0VGltZW91dChmbmMsIDApO1xuICAgIH0sXG4gICAgXG4gICAgdG9BcnJheTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqLnRvQXJyYXkpIHJldHVybiBvYmoudG9BcnJheSgpO1xuICAgICAgcmV0dXJuIEFSUl9TTElDRS5jYWxsKG9iaik7XG4gICAgfSxcblxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVsbDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICAgIH0sXG4gICAgXG4gICAgaXNOYU46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gb2JqO1xuICAgIH0sXG4gICAgXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmouY29uc3RydWN0b3IgPT09IEFycmF5O1xuICAgIH0sXG4gICAgXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcbiAgICBcbiAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorMDtcbiAgICB9LFxuICAgIFxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaisnJztcbiAgICB9LFxuICAgIFxuICAgIGlzQm9vbGVhbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBmYWxzZSB8fCBvYmogPT09IHRydWU7XG4gICAgfSxcbiAgICBcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG4gIFxuICB9O1xuICAgIFxufSkoKTtcblxuXG5kYXQuY29sb3IudG9TdHJpbmcgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHJldHVybiBmdW5jdGlvbihjb2xvcikge1xuXG4gICAgaWYgKGNvbG9yLmEgPT0gMSB8fCBjb21tb24uaXNVbmRlZmluZWQoY29sb3IuYSkpIHtcblxuICAgICAgdmFyIHMgPSBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xuICAgICAgd2hpbGUgKHMubGVuZ3RoIDwgNikge1xuICAgICAgICBzID0gJzAnICsgcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcjJyArIHM7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gJ3JnYmEoJyArIE1hdGgucm91bmQoY29sb3IucikgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmcpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5iKSArICcsJyArIGNvbG9yLmEgKyAnKSc7XG5cbiAgICB9XG5cbiAgfVxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuQ29sb3IgPSBkYXQuY29sb3IuQ29sb3IgPSAoZnVuY3Rpb24gKGludGVycHJldCwgbWF0aCwgdG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciBDb2xvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5fX3N0YXRlID0gaW50ZXJwcmV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpZiAodGhpcy5fX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgJ0ZhaWxlZCB0byBpbnRlcnByZXQgY29sb3IgYXJndW1lbnRzJztcbiAgICB9XG5cbiAgICB0aGlzLl9fc3RhdGUuYSA9IHRoaXMuX19zdGF0ZS5hIHx8IDE7XG5cblxuICB9O1xuXG4gIENvbG9yLkNPTVBPTkVOVFMgPSBbJ3InLCdnJywnYicsJ2gnLCdzJywndicsJ2hleCcsJ2EnXTtcblxuICBjb21tb24uZXh0ZW5kKENvbG9yLnByb3RvdHlwZSwge1xuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nKHRoaXMpO1xuICAgIH0sXG5cbiAgICB0b09yaWdpbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuY29udmVyc2lvbi53cml0ZSh0aGlzKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3InLCAyKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2cnLCAxKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2InLCAwKTtcblxuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnaCcpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncycpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAndicpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdhJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuYTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICB0aGlzLl9fc3RhdGUuYSA9IHY7XG4gICAgfVxuXG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdoZXgnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hFWCcpIHtcbiAgICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IG1hdGgucmdiX3RvX2hleCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5oZXg7XG5cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIRVgnO1xuICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XG5cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVmaW5lUkdCQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ1JHQicpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgICAgIH1cblxuICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdSR0InKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ1JHQic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiBkZWZpbmVIU1ZDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKVxuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIU1YnKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hTVic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZVJHQihjb2xvciwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIRVgnKSB7XG5cbiAgICAgIGNvbG9yLl9fc3RhdGVbY29tcG9uZW50XSA9IG1hdGguY29tcG9uZW50X2Zyb21faGV4KGNvbG9yLl9fc3RhdGUuaGV4LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICB9IGVsc2UgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XG5cbiAgICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSwgbWF0aC5oc3ZfdG9fcmdiKGNvbG9yLl9fc3RhdGUuaCwgY29sb3IuX19zdGF0ZS5zLCBjb2xvci5fX3N0YXRlLnYpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93ICdDb3JydXB0ZWQgY29sb3Igc3RhdGUnO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZUhTVihjb2xvcikge1xuXG4gICAgdmFyIHJlc3VsdCA9IG1hdGgucmdiX3RvX2hzdihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHM6IHJlc3VsdC5zLFxuICAgICAgICAgIHY6IHJlc3VsdC52XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFjb21tb24uaXNOYU4ocmVzdWx0LmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSByZXN1bHQuaDtcbiAgICB9IGVsc2UgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5fX3N0YXRlLmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSAwO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIENvbG9yO1xuXG59KShkYXQuY29sb3IuaW50ZXJwcmV0ID0gKGZ1bmN0aW9uICh0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIHJlc3VsdCwgdG9SZXR1cm47XG5cbiAgdmFyIGludGVycHJldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdG9SZXR1cm4gPSBmYWxzZTtcblxuICAgIHZhciBvcmlnaW5hbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcblxuICAgIGNvbW1vbi5lYWNoKElOVEVSUFJFVEFUSU9OUywgZnVuY3Rpb24oZmFtaWx5KSB7XG5cbiAgICAgIGlmIChmYW1pbHkubGl0bXVzKG9yaWdpbmFsKSkge1xuXG4gICAgICAgIGNvbW1vbi5lYWNoKGZhbWlseS5jb252ZXJzaW9ucywgZnVuY3Rpb24oY29udmVyc2lvbiwgY29udmVyc2lvbk5hbWUpIHtcblxuICAgICAgICAgIHJlc3VsdCA9IGNvbnZlcnNpb24ucmVhZChvcmlnaW5hbCk7XG5cbiAgICAgICAgICBpZiAodG9SZXR1cm4gPT09IGZhbHNlICYmIHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb25OYW1lID0gY29udmVyc2lvbk5hbWU7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbiA9IGNvbnZlcnNpb247XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gIH07XG5cbiAgdmFyIElOVEVSUFJFVEFUSU9OUyA9IFtcblxuICAgIC8vIFN0cmluZ3NcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzU3RyaW5nLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFRIUkVFX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XSkoW0EtRjAtOV0pKFtBLUYwLTldKSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICAnMHgnICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzFdLnRvU3RyaW5nKCkgKyB0ZXN0WzFdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFszXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIFNJWF9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV17Nn0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0I6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQkE6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JhXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCxcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKSxcbiAgICAgICAgICAgICAgYTogcGFyc2VGbG9hdCh0ZXN0WzRdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBOdW1iZXJzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc051bWJlcixcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBIRVg6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IG9yaWdpbmFsLFxuICAgICAgICAgICAgICBjb252ZXJzaW9uTmFtZTogJ0hFWCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3IuaGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gQXJyYXlzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc0FycmF5LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQl9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQkFfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSA0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl0sXG4gICAgICAgICAgICAgIGE6IG9yaWdpbmFsWzNdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE9iamVjdHNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzT2JqZWN0LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmIsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52LFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gIF07XG5cbiAgcmV0dXJuIGludGVycHJldDtcblxuXG59KShkYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb2xvci5tYXRoID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG1wQ29tcG9uZW50O1xuXG4gIHJldHVybiB7XG5cbiAgICBoc3ZfdG9fcmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XG5cbiAgICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG5cbiAgICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEuMCAtIChmICogcykpO1xuICAgICAgdmFyIHQgPSB2ICogKDEuMCAtICgoMS4wIC0gZikgKiBzKSk7XG4gICAgICB2YXIgYyA9IFtcbiAgICAgICAgW3YsIHQsIHBdLFxuICAgICAgICBbcSwgdiwgcF0sXG4gICAgICAgIFtwLCB2LCB0XSxcbiAgICAgICAgW3AsIHEsIHZdLFxuICAgICAgICBbdCwgcCwgdl0sXG4gICAgICAgIFt2LCBwLCBxXVxuICAgICAgXVtoaV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgcmdiX3RvX2hzdjogZnVuY3Rpb24ociwgZywgYikge1xuXG4gICAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICAgICAgaCwgcztcblxuICAgICAgaWYgKG1heCAhPSAwKSB7XG4gICAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogTmFOLFxuICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgdjogMFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAociA9PSBtYXgpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSBpZiAoZyA9PSBtYXgpIHtcbiAgICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IGggKiAzNjAsXG4gICAgICAgIHM6IHMsXG4gICAgICAgIHY6IG1heCAvIDI1NVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmdiX3RvX2hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgICByZXR1cm4gaGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICAgIHJldHVybiAoaGV4ID4+IChjb21wb25lbnRJbmRleCAqIDgpKSAmIDB4RkY7XG4gICAgfSxcblxuICAgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IChoZXggJiB+ICgweEZGIDw8IHRtcENvbXBvbmVudCkpO1xuICAgIH1cblxuICB9XG5cbn0pKCksXG5kYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanNcbiAqKiBtb2R1bGUgaWQgPSAxOThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQGF1dGhvciBxaWFvIC8gaHR0cHM6Ly9naXRodWIuY29tL3FpYW9cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb21cbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgZXJpY2g2NjYgLyBodHRwOi8vZXJpY2hhaW5lcy5jb21cbiAqL1xuLypnbG9iYWwgVEhSRUUsIGNvbnNvbGUgKi9cblxuKCBmdW5jdGlvbiAoKSB7XG5cblx0ZnVuY3Rpb24gT3JiaXRDb25zdHJhaW50ICggb2JqZWN0ICkge1xuXG5cdFx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cblx0XHQvLyBcInRhcmdldFwiIHNldHMgdGhlIGxvY2F0aW9uIG9mIGZvY3VzLCB3aGVyZSB0aGUgb2JqZWN0IG9yYml0cyBhcm91bmRcblx0XHQvLyBhbmQgd2hlcmUgaXQgcGFucyB3aXRoIHJlc3BlY3QgdG8uXG5cdFx0dGhpcy50YXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0Ly8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiBkb2xseSBpbiBhbmQgb3V0ICggUGVyc3BlY3RpdmVDYW1lcmEgb25seSApXG5cdFx0dGhpcy5taW5EaXN0YW5jZSA9IDA7XG5cdFx0dGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG5cdFx0Ly8gTGltaXRzIHRvIGhvdyBmYXIgeW91IGNhbiB6b29tIGluIGFuZCBvdXQgKCBPcnRob2dyYXBoaWNDYW1lcmEgb25seSApXG5cdFx0dGhpcy5taW5ab29tID0gMDtcblx0XHR0aGlzLm1heFpvb20gPSBJbmZpbml0eTtcblxuXHRcdC8vIEhvdyBmYXIgeW91IGNhbiBvcmJpdCB2ZXJ0aWNhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuXHRcdC8vIFJhbmdlIGlzIDAgdG8gTWF0aC5QSSByYWRpYW5zLlxuXHRcdHRoaXMubWluUG9sYXJBbmdsZSA9IDA7IC8vIHJhZGlhbnNcblx0XHR0aGlzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJOyAvLyByYWRpYW5zXG5cblx0XHQvLyBIb3cgZmFyIHlvdSBjYW4gb3JiaXQgaG9yaXpvbnRhbGx5LCB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuXHRcdC8vIElmIHNldCwgbXVzdCBiZSBhIHN1Yi1pbnRlcnZhbCBvZiB0aGUgaW50ZXJ2YWwgWyAtIE1hdGguUEksIE1hdGguUEkgXS5cblx0XHR0aGlzLm1pbkF6aW11dGhBbmdsZSA9IC0gSW5maW5pdHk7IC8vIHJhZGlhbnNcblx0XHR0aGlzLm1heEF6aW11dGhBbmdsZSA9IEluZmluaXR5OyAvLyByYWRpYW5zXG5cblx0XHQvLyBTZXQgdG8gdHJ1ZSB0byBlbmFibGUgZGFtcGluZyAoaW5lcnRpYSlcblx0XHQvLyBJZiBkYW1waW5nIGlzIGVuYWJsZWQsIHlvdSBtdXN0IGNhbGwgY29udHJvbHMudXBkYXRlKCkgaW4geW91ciBhbmltYXRpb24gbG9vcFxuXHRcdHRoaXMuZW5hYmxlRGFtcGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuZGFtcGluZ0ZhY3RvciA9IDAuMjU7XG5cblx0XHQvLy8vLy8vLy8vLy9cblx0XHQvLyBpbnRlcm5hbHNcblxuXHRcdHZhciBzY29wZSA9IHRoaXM7XG5cblx0XHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cblx0XHQvLyBDdXJyZW50IHBvc2l0aW9uIGluIHNwaGVyaWNhbCBjb29yZGluYXRlIHN5c3RlbS5cblx0XHR2YXIgdGhldGE7XG5cdFx0dmFyIHBoaTtcblxuXHRcdC8vIFBlbmRpbmcgY2hhbmdlc1xuXHRcdHZhciBwaGlEZWx0YSA9IDA7XG5cdFx0dmFyIHRoZXRhRGVsdGEgPSAwO1xuXHRcdHZhciBzY2FsZSA9IDE7XG5cdFx0dmFyIHBhbk9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cblx0XHQvLyBBUElcblxuXHRcdHRoaXMuZ2V0UG9sYXJBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0cmV0dXJuIHBoaTtcblxuXHRcdH07XG5cblx0XHR0aGlzLmdldEF6aW11dGhhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRyZXR1cm4gdGhldGE7XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5yb3RhdGVMZWZ0ID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdFx0dGhldGFEZWx0YSAtPSBhbmdsZTtcblxuXHRcdH07XG5cblx0XHR0aGlzLnJvdGF0ZVVwID0gZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdFx0cGhpRGVsdGEgLT0gYW5nbGU7XG5cblx0XHR9O1xuXG5cdFx0Ly8gcGFzcyBpbiBkaXN0YW5jZSBpbiB3b3JsZCBzcGFjZSB0byBtb3ZlIGxlZnRcblx0XHR0aGlzLnBhbkxlZnQgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0dmFyIHYgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gcGFuTGVmdCAoIGRpc3RhbmNlICkge1xuXG5cdFx0XHRcdHZhciB0ZSA9IHRoaXMub2JqZWN0Lm1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0XHQvLyBnZXQgWCBjb2x1bW4gb2YgbWF0cml4XG5cdFx0XHRcdHYuc2V0KCB0ZVsgMCBdLCB0ZVsgMSBdLCB0ZVsgMiBdICk7XG5cdFx0XHRcdHYubXVsdGlwbHlTY2FsYXIoIC0gZGlzdGFuY2UgKTtcblxuXHRcdFx0XHRwYW5PZmZzZXQuYWRkKCB2ICk7XG5cblx0XHRcdH07XG5cblx0XHR9KCk7XG5cblx0XHQvLyBwYXNzIGluIGRpc3RhbmNlIGluIHdvcmxkIHNwYWNlIHRvIG1vdmUgdXBcblx0XHR0aGlzLnBhblVwID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciB2ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHBhblVwICggZGlzdGFuY2UgKSB7XG5cblx0XHRcdFx0dmFyIHRlID0gdGhpcy5vYmplY3QubWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRcdC8vIGdldCBZIGNvbHVtbiBvZiBtYXRyaXhcblx0XHRcdFx0di5zZXQoIHRlWyA0IF0sIHRlWyA1IF0sIHRlWyA2IF0gKTtcblx0XHRcdFx0di5tdWx0aXBseVNjYWxhciggZGlzdGFuY2UgKTtcblxuXHRcdFx0XHRwYW5PZmZzZXQuYWRkKCB2ICk7XG5cblx0XHRcdH07XG5cblx0XHR9KCk7XG5cblx0XHQvLyBwYXNzIGluIHgseSBvZiBjaGFuZ2UgZGVzaXJlZCBpbiBwaXhlbCBzcGFjZSxcblx0XHQvLyByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcblx0XHR0aGlzLnBhbiA9IGZ1bmN0aW9uICggZGVsdGFYLCBkZWx0YVksIHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQgKSB7XG5cblx0XHRcdGlmICggc2NvcGUub2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgKSB7XG5cblx0XHRcdFx0Ly8gcGVyc3BlY3RpdmVcblx0XHRcdFx0dmFyIHBvc2l0aW9uID0gc2NvcGUub2JqZWN0LnBvc2l0aW9uO1xuXHRcdFx0XHR2YXIgb2Zmc2V0ID0gcG9zaXRpb24uY2xvbmUoKS5zdWIoIHNjb3BlLnRhcmdldCApO1xuXHRcdFx0XHR2YXIgdGFyZ2V0RGlzdGFuY2UgPSBvZmZzZXQubGVuZ3RoKCk7XG5cblx0XHRcdFx0Ly8gaGFsZiBvZiB0aGUgZm92IGlzIGNlbnRlciB0byB0b3Agb2Ygc2NyZWVuXG5cdFx0XHRcdHRhcmdldERpc3RhbmNlICo9IE1hdGgudGFuKCAoIHNjb3BlLm9iamVjdC5mb3YgLyAyICkgKiBNYXRoLlBJIC8gMTgwLjAgKTtcblxuXHRcdFx0XHQvLyB3ZSBhY3R1YWxseSBkb24ndCB1c2Ugc2NyZWVuV2lkdGgsIHNpbmNlIHBlcnNwZWN0aXZlIGNhbWVyYSBpcyBmaXhlZCB0byBzY3JlZW4gaGVpZ2h0XG5cdFx0XHRcdHNjb3BlLnBhbkxlZnQoIDIgKiBkZWx0YVggKiB0YXJnZXREaXN0YW5jZSAvIHNjcmVlbkhlaWdodCApO1xuXHRcdFx0XHRzY29wZS5wYW5VcCggMiAqIGRlbHRhWSAqIHRhcmdldERpc3RhbmNlIC8gc2NyZWVuSGVpZ2h0ICk7XG5cblx0XHRcdH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuXHRcdFx0XHQvLyBvcnRob2dyYXBoaWNcblx0XHRcdFx0c2NvcGUucGFuTGVmdCggZGVsdGFYICogKCBzY29wZS5vYmplY3QucmlnaHQgLSBzY29wZS5vYmplY3QubGVmdCApIC8gc2NyZWVuV2lkdGggKTtcblx0XHRcdFx0c2NvcGUucGFuVXAoIGRlbHRhWSAqICggc2NvcGUub2JqZWN0LnRvcCAtIHNjb3BlLm9iamVjdC5ib3R0b20gKSAvIHNjcmVlbkhlaWdodCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIGNhbWVyYSBuZWl0aGVyIG9ydGhvZ3JhcGhpYyBvciBwZXJzcGVjdGl2ZVxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBwYW4gZGlzYWJsZWQuJyApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5kb2xseUluID0gZnVuY3Rpb24gKCBkb2xseVNjYWxlICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhICkge1xuXG5cdFx0XHRcdHNjYWxlIC89IGRvbGx5U2NhbGU7XG5cblx0XHRcdH0gZWxzZSBpZiAoIHNjb3BlLm9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSApIHtcblxuXHRcdFx0XHRzY29wZS5vYmplY3Quem9vbSA9IE1hdGgubWF4KCB0aGlzLm1pblpvb20sIE1hdGgubWluKCB0aGlzLm1heFpvb20sIHRoaXMub2JqZWN0Lnpvb20gKiBkb2xseVNjYWxlICkgKTtcblx0XHRcdFx0c2NvcGUub2JqZWN0LnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblx0XHRcdFx0em9vbUNoYW5nZWQgPSB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1dBUk5JTkc6IE9yYml0Q29udHJvbHMuanMgZW5jb3VudGVyZWQgYW4gdW5rbm93biBjYW1lcmEgdHlwZSAtIGRvbGx5L3pvb20gZGlzYWJsZWQuJyApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5kb2xseU91dCA9IGZ1bmN0aW9uICggZG9sbHlTY2FsZSApIHtcblxuXHRcdFx0aWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSApIHtcblxuXHRcdFx0XHRzY2FsZSAqPSBkb2xseVNjYWxlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBzY29wZS5vYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEgKSB7XG5cblx0XHRcdFx0c2NvcGUub2JqZWN0Lnpvb20gPSBNYXRoLm1heCggdGhpcy5taW5ab29tLCBNYXRoLm1pbiggdGhpcy5tYXhab29tLCB0aGlzLm9iamVjdC56b29tIC8gZG9sbHlTY2FsZSApICk7XG5cdFx0XHRcdHNjb3BlLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdFx0XHRcdHpvb21DaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdXQVJOSU5HOiBPcmJpdENvbnRyb2xzLmpzIGVuY291bnRlcmVkIGFuIHVua25vd24gY2FtZXJhIHR5cGUgLSBkb2xseS96b29tIGRpc2FibGVkLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciBvZmZzZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHQvLyBzbyBjYW1lcmEudXAgaXMgdGhlIG9yYml0IGF4aXNcblx0XHRcdHZhciBxdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5zZXRGcm9tVW5pdFZlY3RvcnMoIG9iamVjdC51cCwgbmV3IFRIUkVFLlZlY3RvcjMoIDAsIDEsIDAgKSApO1xuXHRcdFx0dmFyIHF1YXRJbnZlcnNlID0gcXVhdC5jbG9uZSgpLmludmVyc2UoKTtcblxuXHRcdFx0dmFyIGxhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHR2YXIgbGFzdFF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IHRoaXMub2JqZWN0LnBvc2l0aW9uO1xuXG5cdFx0XHRcdG9mZnNldC5jb3B5KCBwb3NpdGlvbiApLnN1YiggdGhpcy50YXJnZXQgKTtcblxuXHRcdFx0XHQvLyByb3RhdGUgb2Zmc2V0IHRvIFwieS1heGlzLWlzLXVwXCIgc3BhY2Vcblx0XHRcdFx0b2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdCApO1xuXG5cdFx0XHRcdC8vIGFuZ2xlIGZyb20gei1heGlzIGFyb3VuZCB5LWF4aXNcblxuXHRcdFx0XHR0aGV0YSA9IE1hdGguYXRhbjIoIG9mZnNldC54LCBvZmZzZXQueiApO1xuXG5cdFx0XHRcdC8vIGFuZ2xlIGZyb20geS1heGlzXG5cblx0XHRcdFx0cGhpID0gTWF0aC5hdGFuMiggTWF0aC5zcXJ0KCBvZmZzZXQueCAqIG9mZnNldC54ICsgb2Zmc2V0LnogKiBvZmZzZXQueiApLCBvZmZzZXQueSApO1xuXG5cdFx0XHRcdHRoZXRhICs9IHRoZXRhRGVsdGE7XG5cdFx0XHRcdHBoaSArPSBwaGlEZWx0YTtcblxuXHRcdFx0XHQvLyByZXN0cmljdCB0aGV0YSB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG5cdFx0XHRcdHRoZXRhID0gTWF0aC5tYXgoIHRoaXMubWluQXppbXV0aEFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhBemltdXRoQW5nbGUsIHRoZXRhICkgKTtcblxuXHRcdFx0XHQvLyByZXN0cmljdCBwaGkgdG8gYmUgYmV0d2VlbiBkZXNpcmVkIGxpbWl0c1xuXHRcdFx0XHRwaGkgPSBNYXRoLm1heCggdGhpcy5taW5Qb2xhckFuZ2xlLCBNYXRoLm1pbiggdGhpcy5tYXhQb2xhckFuZ2xlLCBwaGkgKSApO1xuXG5cdFx0XHRcdC8vIHJlc3RyaWN0IHBoaSB0byBiZSBiZXR3ZWUgRVBTIGFuZCBQSS1FUFNcblx0XHRcdFx0cGhpID0gTWF0aC5tYXgoIEVQUywgTWF0aC5taW4oIE1hdGguUEkgLSBFUFMsIHBoaSApICk7XG5cblx0XHRcdFx0dmFyIHJhZGl1cyA9IG9mZnNldC5sZW5ndGgoKSAqIHNjYWxlO1xuXG5cdFx0XHRcdC8vIHJlc3RyaWN0IHJhZGl1cyB0byBiZSBiZXR3ZWVuIGRlc2lyZWQgbGltaXRzXG5cdFx0XHRcdHJhZGl1cyA9IE1hdGgubWF4KCB0aGlzLm1pbkRpc3RhbmNlLCBNYXRoLm1pbiggdGhpcy5tYXhEaXN0YW5jZSwgcmFkaXVzICkgKTtcblxuXHRcdFx0XHQvLyBtb3ZlIHRhcmdldCB0byBwYW5uZWQgbG9jYXRpb25cblx0XHRcdFx0dGhpcy50YXJnZXQuYWRkKCBwYW5PZmZzZXQgKTtcblxuXHRcdFx0XHRvZmZzZXQueCA9IHJhZGl1cyAqIE1hdGguc2luKCBwaGkgKSAqIE1hdGguc2luKCB0aGV0YSApO1xuXHRcdFx0XHRvZmZzZXQueSA9IHJhZGl1cyAqIE1hdGguY29zKCBwaGkgKTtcblx0XHRcdFx0b2Zmc2V0LnogPSByYWRpdXMgKiBNYXRoLnNpbiggcGhpICkgKiBNYXRoLmNvcyggdGhldGEgKTtcblxuXHRcdFx0XHQvLyByb3RhdGUgb2Zmc2V0IGJhY2sgdG8gXCJjYW1lcmEtdXAtdmVjdG9yLWlzLXVwXCIgc3BhY2Vcblx0XHRcdFx0b2Zmc2V0LmFwcGx5UXVhdGVybmlvbiggcXVhdEludmVyc2UgKTtcblxuXHRcdFx0XHRwb3NpdGlvbi5jb3B5KCB0aGlzLnRhcmdldCApLmFkZCggb2Zmc2V0ICk7XG5cblx0XHRcdFx0dGhpcy5vYmplY3QubG9va0F0KCB0aGlzLnRhcmdldCApO1xuXG5cdFx0XHRcdGlmICggdGhpcy5lbmFibGVEYW1waW5nID09PSB0cnVlICkge1xuXG5cdFx0XHRcdFx0dGhldGFEZWx0YSAqPSAoIDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IgKTtcblx0XHRcdFx0XHRwaGlEZWx0YSAqPSAoIDEgLSB0aGlzLmRhbXBpbmdGYWN0b3IgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0dGhldGFEZWx0YSA9IDA7XG5cdFx0XHRcdFx0cGhpRGVsdGEgPSAwO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzY2FsZSA9IDE7XG5cdFx0XHRcdHBhbk9mZnNldC5zZXQoIDAsIDAsIDAgKTtcblxuXHRcdFx0XHQvLyB1cGRhdGUgY29uZGl0aW9uIGlzOlxuXHRcdFx0XHQvLyBtaW4oY2FtZXJhIGRpc3BsYWNlbWVudCwgY2FtZXJhIHJvdGF0aW9uIGluIHJhZGlhbnMpXjIgPiBFUFNcblx0XHRcdFx0Ly8gdXNpbmcgc21hbGwtYW5nbGUgYXBwcm94aW1hdGlvbiBjb3MoeC8yKSA9IDEgLSB4XjIgLyA4XG5cblx0XHRcdFx0aWYgKCB6b29tQ2hhbmdlZCB8fFxuXHRcdFx0XHRcdCBsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQoIHRoaXMub2JqZWN0LnBvc2l0aW9uICkgPiBFUFMgfHxcblx0XHRcdFx0ICAgIDggKiAoIDEgLSBsYXN0UXVhdGVybmlvbi5kb3QoIHRoaXMub2JqZWN0LnF1YXRlcm5pb24gKSApID4gRVBTICkge1xuXG5cdFx0XHRcdFx0bGFzdFBvc2l0aW9uLmNvcHkoIHRoaXMub2JqZWN0LnBvc2l0aW9uICk7XG5cdFx0XHRcdFx0bGFzdFF1YXRlcm5pb24uY29weSggdGhpcy5vYmplY3QucXVhdGVybmlvbiApO1xuXHRcdFx0XHRcdHpvb21DaGFuZ2VkID0gZmFsc2U7XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSgpO1xuXG5cdH07XG5cblxuXHQvLyBUaGlzIHNldCBvZiBjb250cm9scyBwZXJmb3JtcyBvcmJpdGluZywgZG9sbHlpbmcgKHpvb21pbmcpLCBhbmQgcGFubmluZy4gSXQgbWFpbnRhaW5zXG5cdC8vIHRoZSBcInVwXCIgZGlyZWN0aW9uIGFzICtZLCB1bmxpa2UgdGhlIFRyYWNrYmFsbENvbnRyb2xzLiBUb3VjaCBvbiB0YWJsZXQgYW5kIHBob25lcyBpc1xuXHQvLyBzdXBwb3J0ZWQuXG5cdC8vXG5cdC8vICAgIE9yYml0IC0gbGVmdCBtb3VzZSAvIHRvdWNoOiBvbmUgZmluZ2VyIG1vdmVcblx0Ly8gICAgWm9vbSAtIG1pZGRsZSBtb3VzZSwgb3IgbW91c2V3aGVlbCAvIHRvdWNoOiB0d28gZmluZ2VyIHNwcmVhZCBvciBzcXVpc2hcblx0Ly8gICAgUGFuIC0gcmlnaHQgbW91c2UsIG9yIGFycm93IGtleXMgLyB0b3VjaDogdGhyZWUgZmludGVyIHN3aXBlXG5cblx0VEhSRUUuT3JiaXRDb250cm9scyA9IGZ1bmN0aW9uICggb2JqZWN0LCBkb21FbGVtZW50ICkge1xuXG5cdFx0dmFyIGNvbnN0cmFpbnQgPSBuZXcgT3JiaXRDb25zdHJhaW50KCBvYmplY3QgKTtcblxuXHRcdHRoaXMuZG9tRWxlbWVudCA9ICggZG9tRWxlbWVudCAhPT0gdW5kZWZpbmVkICkgPyBkb21FbGVtZW50IDogZG9jdW1lbnQ7XG5cblx0XHQvLyBBUElcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgJ2NvbnN0cmFpbnQnLCB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmV0dXJuIGNvbnN0cmFpbnQ7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHRcdHRoaXMuZ2V0UG9sYXJBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0cmV0dXJuIGNvbnN0cmFpbnQuZ2V0UG9sYXJBbmdsZSgpO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMuZ2V0QXppbXV0aGFsQW5nbGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHJldHVybiBjb25zdHJhaW50LmdldEF6aW11dGhhbEFuZ2xlKCk7XG5cblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBjb250cm9sXG5cdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdC8vIGNlbnRlciBpcyBvbGQsIGRlcHJlY2F0ZWQ7IHVzZSBcInRhcmdldFwiIGluc3RlYWRcblx0XHR0aGlzLmNlbnRlciA9IHRoaXMudGFyZ2V0O1xuXG5cdFx0Ly8gVGhpcyBvcHRpb24gYWN0dWFsbHkgZW5hYmxlcyBkb2xseWluZyBpbiBhbmQgb3V0OyBsZWZ0IGFzIFwiem9vbVwiIGZvclxuXHRcdC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuXHRcdC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHpvb21pbmdcblx0XHR0aGlzLmVuYWJsZVpvb20gPSB0cnVlO1xuXHRcdHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXG5cdFx0Ly8gU2V0IHRvIGZhbHNlIHRvIGRpc2FibGUgcm90YXRpbmdcblx0XHR0aGlzLmVuYWJsZVJvdGF0ZSA9IHRydWU7XG5cdFx0dGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuXHRcdC8vIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHBhbm5pbmdcblx0XHR0aGlzLmVuYWJsZVBhbiA9IHRydWU7XG5cdFx0dGhpcy5rZXlQYW5TcGVlZCA9IDcuMDtcdC8vIHBpeGVscyBtb3ZlZCBwZXIgYXJyb3cga2V5IHB1c2hcblxuXHRcdC8vIFNldCB0byB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgcm90YXRlIGFyb3VuZCB0aGUgdGFyZ2V0XG5cdFx0Ly8gSWYgYXV0by1yb3RhdGUgaXMgZW5hYmxlZCwgeW91IG11c3QgY2FsbCBjb250cm9scy51cGRhdGUoKSBpbiB5b3VyIGFuaW1hdGlvbiBsb29wXG5cdFx0dGhpcy5hdXRvUm90YXRlID0gZmFsc2U7XG5cdFx0dGhpcy5hdXRvUm90YXRlU3BlZWQgPSAyLjA7IC8vIDMwIHNlY29uZHMgcGVyIHJvdW5kIHdoZW4gZnBzIGlzIDYwXG5cblx0XHQvLyBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB1c2Ugb2YgdGhlIGtleXNcblx0XHR0aGlzLmVuYWJsZUtleXMgPSB0cnVlO1xuXG5cdFx0Ly8gVGhlIGZvdXIgYXJyb3cga2V5c1xuXHRcdHRoaXMua2V5cyA9IHsgTEVGVDogMzcsIFVQOiAzOCwgUklHSFQ6IDM5LCBCT1RUT006IDQwIH07XG5cblx0XHQvLyBNb3VzZSBidXR0b25zXG5cdFx0dGhpcy5tb3VzZUJ1dHRvbnMgPSB7IE9SQklUOiBUSFJFRS5NT1VTRS5MRUZULCBaT09NOiBUSFJFRS5NT1VTRS5NSURETEUsIFBBTjogVEhSRUUuTU9VU0UuUklHSFQgfTtcblxuXHRcdC8vLy8vLy8vLy8vL1xuXHRcdC8vIGludGVybmFsc1xuXG5cdFx0dmFyIHNjb3BlID0gdGhpcztcblxuXHRcdHZhciByb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0dmFyIHJvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0dmFyIHJvdGF0ZURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdHZhciBwYW5TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0dmFyIHBhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0dmFyIHBhbkRlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdHZhciBkb2xseVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHR2YXIgZG9sbHlFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdHZhciBkb2xseURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdHZhciBTVEFURSA9IHsgTk9ORSA6IC0gMSwgUk9UQVRFIDogMCwgRE9MTFkgOiAxLCBQQU4gOiAyLCBUT1VDSF9ST1RBVEUgOiAzLCBUT1VDSF9ET0xMWSA6IDQsIFRPVUNIX1BBTiA6IDUgfTtcblxuXHRcdHZhciBzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHQvLyBmb3IgcmVzZXRcblxuXHRcdHRoaXMudGFyZ2V0MCA9IHRoaXMudGFyZ2V0LmNsb25lKCk7XG5cdFx0dGhpcy5wb3NpdGlvbjAgPSB0aGlzLm9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdHRoaXMuem9vbTAgPSB0aGlzLm9iamVjdC56b29tO1xuXG5cdFx0Ly8gZXZlbnRzXG5cblx0XHR2YXIgY2hhbmdlRXZlbnQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cdFx0dmFyIHN0YXJ0RXZlbnQgPSB7IHR5cGU6ICdzdGFydCcgfTtcblx0XHR2YXIgZW5kRXZlbnQgPSB7IHR5cGU6ICdlbmQnIH07XG5cblx0XHQvLyBwYXNzIGluIHgseSBvZiBjaGFuZ2UgZGVzaXJlZCBpbiBwaXhlbCBzcGFjZSxcblx0XHQvLyByaWdodCBhbmQgZG93biBhcmUgcG9zaXRpdmVcblx0XHRmdW5jdGlvbiBwYW4oIGRlbHRhWCwgZGVsdGFZICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudCA9IHNjb3BlLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50ID8gc2NvcGUuZG9tRWxlbWVudC5ib2R5IDogc2NvcGUuZG9tRWxlbWVudDtcblxuXHRcdFx0Y29uc3RyYWludC5wYW4oIGRlbHRhWCwgZGVsdGFZLCBlbGVtZW50LmNsaWVudFdpZHRoLCBlbGVtZW50LmNsaWVudEhlaWdodCApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmICggdGhpcy5hdXRvUm90YXRlICYmIHN0YXRlID09PSBTVEFURS5OT05FICkge1xuXG5cdFx0XHRcdGNvbnN0cmFpbnQucm90YXRlTGVmdCggZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggY29uc3RyYWludC51cGRhdGUoKSA9PT0gdHJ1ZSApIHtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdHRoaXMudGFyZ2V0LmNvcHkoIHRoaXMudGFyZ2V0MCApO1xuXHRcdFx0dGhpcy5vYmplY3QucG9zaXRpb24uY29weSggdGhpcy5wb3NpdGlvbjAgKTtcblx0XHRcdHRoaXMub2JqZWN0Lnpvb20gPSB0aGlzLnpvb20wO1xuXG5cdFx0XHR0aGlzLm9iamVjdC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIGNoYW5nZUV2ZW50ICk7XG5cblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gZ2V0QXV0b1JvdGF0aW9uQW5nbGUoKSB7XG5cblx0XHRcdHJldHVybiAyICogTWF0aC5QSSAvIDYwIC8gNjAgKiBzY29wZS5hdXRvUm90YXRlU3BlZWQ7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRab29tU2NhbGUoKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnBvdyggMC45NSwgc2NvcGUuem9vbVNwZWVkICk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvbk1vdXNlRG93biggZXZlbnQgKSB7XG5cblx0XHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGlmICggZXZlbnQuYnV0dG9uID09PSBzY29wZS5tb3VzZUJ1dHRvbnMuT1JCSVQgKSB7XG5cblx0XHRcdFx0aWYgKCBzY29wZS5lbmFibGVSb3RhdGUgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRcdHN0YXRlID0gU1RBVEUuUk9UQVRFO1xuXG5cdFx0XHRcdHJvdGF0ZVN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5aT09NICkge1xuXG5cdFx0XHRcdGlmICggc2NvcGUuZW5hYmxlWm9vbSA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRcdFx0c3RhdGUgPSBTVEFURS5ET0xMWTtcblxuXHRcdFx0XHRkb2xseVN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBldmVudC5idXR0b24gPT09IHNjb3BlLm1vdXNlQnV0dG9ucy5QQU4gKSB7XG5cblx0XHRcdFx0aWYgKCBzY29wZS5lbmFibGVQYW4gPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRcdHN0YXRlID0gU1RBVEUuUEFOO1xuXG5cdFx0XHRcdHBhblN0YXJ0LnNldCggZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3RhdGUgIT09IFNUQVRFLk5PTkUgKSB7XG5cblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSApO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcblx0XHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvbk1vdXNlTW92ZSggZXZlbnQgKSB7XG5cblx0XHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBlbGVtZW50ID0gc2NvcGUuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQgPyBzY29wZS5kb21FbGVtZW50LmJvZHkgOiBzY29wZS5kb21FbGVtZW50O1xuXG5cdFx0XHRpZiAoIHN0YXRlID09PSBTVEFURS5ST1RBVEUgKSB7XG5cblx0XHRcdFx0aWYgKCBzY29wZS5lbmFibGVSb3RhdGUgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRcdHJvdGF0ZUVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblx0XHRcdFx0cm90YXRlRGVsdGEuc3ViVmVjdG9ycyggcm90YXRlRW5kLCByb3RhdGVTdGFydCApO1xuXG5cdFx0XHRcdC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcblx0XHRcdFx0Y29uc3RyYWludC5yb3RhdGVMZWZ0KCAyICogTWF0aC5QSSAqIHJvdGF0ZURlbHRhLnggLyBlbGVtZW50LmNsaWVudFdpZHRoICogc2NvcGUucm90YXRlU3BlZWQgKTtcblxuXHRcdFx0XHQvLyByb3RhdGluZyB1cCBhbmQgZG93biBhbG9uZyB3aG9sZSBzY3JlZW4gYXR0ZW1wdHMgdG8gZ28gMzYwLCBidXQgbGltaXRlZCB0byAxODBcblx0XHRcdFx0Y29uc3RyYWludC5yb3RhdGVVcCggMiAqIE1hdGguUEkgKiByb3RhdGVEZWx0YS55IC8gZWxlbWVudC5jbGllbnRIZWlnaHQgKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXG5cdFx0XHRcdHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuRE9MTFkgKSB7XG5cblx0XHRcdFx0aWYgKCBzY29wZS5lbmFibGVab29tID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdFx0XHRkb2xseUVuZC5zZXQoIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkgKTtcblx0XHRcdFx0ZG9sbHlEZWx0YS5zdWJWZWN0b3JzKCBkb2xseUVuZCwgZG9sbHlTdGFydCApO1xuXG5cdFx0XHRcdGlmICggZG9sbHlEZWx0YS55ID4gMCApIHtcblxuXHRcdFx0XHRcdGNvbnN0cmFpbnQuZG9sbHlJbiggZ2V0Wm9vbVNjYWxlKCkgKTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkb2xseURlbHRhLnkgPCAwICkge1xuXG5cdFx0XHRcdFx0Y29uc3RyYWludC5kb2xseU91dCggZ2V0Wm9vbVNjYWxlKCkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZG9sbHlTdGFydC5jb3B5KCBkb2xseUVuZCApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBzdGF0ZSA9PT0gU1RBVEUuUEFOICkge1xuXG5cdFx0XHRcdGlmICggc2NvcGUuZW5hYmxlUGFuID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdFx0XHRwYW5FbmQuc2V0KCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZICk7XG5cdFx0XHRcdHBhbkRlbHRhLnN1YlZlY3RvcnMoIHBhbkVuZCwgcGFuU3RhcnQgKTtcblxuXHRcdFx0XHRwYW4oIHBhbkRlbHRhLngsIHBhbkRlbHRhLnkgKTtcblxuXHRcdFx0XHRwYW5TdGFydC5jb3B5KCBwYW5FbmQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHN0YXRlICE9PSBTVEFURS5OT05FICkgc2NvcGUudXBkYXRlKCk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvbk1vdXNlVXAoIC8qIGV2ZW50ICovICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlICk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG5cdFx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvbk1vdXNlV2hlZWwoIGV2ZW50ICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLmVuYWJsZVpvb20gPT09IGZhbHNlIHx8IHN0YXRlICE9PSBTVEFURS5OT05FICkgcmV0dXJuO1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHZhciBkZWx0YSA9IDA7XG5cblx0XHRcdGlmICggZXZlbnQud2hlZWxEZWx0YSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXG5cdFx0XHRcdGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YTtcblxuXHRcdFx0fSBlbHNlIGlmICggZXZlbnQuZGV0YWlsICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0Ly8gRmlyZWZveFxuXG5cdFx0XHRcdGRlbHRhID0gLSBldmVudC5kZXRhaWw7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBkZWx0YSA+IDAgKSB7XG5cblx0XHRcdFx0Y29uc3RyYWludC5kb2xseU91dCggZ2V0Wm9vbVNjYWxlKCkgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggZGVsdGEgPCAwICkge1xuXG5cdFx0XHRcdGNvbnN0cmFpbnQuZG9sbHlJbiggZ2V0Wm9vbVNjYWxlKCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRzY29wZS51cGRhdGUoKTtcblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHN0YXJ0RXZlbnQgKTtcblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIGVuZEV2ZW50ICk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBvbktleURvd24oIGV2ZW50ICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlIHx8IHNjb3BlLmVuYWJsZUtleXMgPT09IGZhbHNlIHx8IHNjb3BlLmVuYWJsZVBhbiA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRcdHN3aXRjaCAoIGV2ZW50LmtleUNvZGUgKSB7XG5cblx0XHRcdFx0Y2FzZSBzY29wZS5rZXlzLlVQOlxuXHRcdFx0XHRcdHBhbiggMCwgc2NvcGUua2V5UGFuU3BlZWQgKTtcblx0XHRcdFx0XHRzY29wZS51cGRhdGUoKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIHNjb3BlLmtleXMuQk9UVE9NOlxuXHRcdFx0XHRcdHBhbiggMCwgLSBzY29wZS5rZXlQYW5TcGVlZCApO1xuXHRcdFx0XHRcdHNjb3BlLnVwZGF0ZSgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2Ugc2NvcGUua2V5cy5MRUZUOlxuXHRcdFx0XHRcdHBhbiggc2NvcGUua2V5UGFuU3BlZWQsIDAgKTtcblx0XHRcdFx0XHRzY29wZS51cGRhdGUoKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIHNjb3BlLmtleXMuUklHSFQ6XG5cdFx0XHRcdFx0cGFuKCAtIHNjb3BlLmtleVBhblNwZWVkLCAwICk7XG5cdFx0XHRcdFx0c2NvcGUudXBkYXRlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvdWNoc3RhcnQoIGV2ZW50ICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRzd2l0Y2ggKCBldmVudC50b3VjaGVzLmxlbmd0aCApIHtcblxuXHRcdFx0XHRjYXNlIDE6XHQvLyBvbmUtZmluZ2VyZWQgdG91Y2g6IHJvdGF0ZVxuXG5cdFx0XHRcdFx0aWYgKCBzY29wZS5lbmFibGVSb3RhdGUgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0c3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cblx0XHRcdFx0XHRyb3RhdGVTdGFydC5zZXQoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAyOlx0Ly8gdHdvLWZpbmdlcmVkIHRvdWNoOiBkb2xseVxuXG5cdFx0XHRcdFx0aWYgKCBzY29wZS5lbmFibGVab29tID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdFx0XHRcdHN0YXRlID0gU1RBVEUuVE9VQ0hfRE9MTFk7XG5cblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHRcdHZhciBkaXN0YW5jZSA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcblx0XHRcdFx0XHRkb2xseVN0YXJ0LnNldCggMCwgZGlzdGFuY2UgKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM6IC8vIHRocmVlLWZpbmdlcmVkIHRvdWNoOiBwYW5cblxuXHRcdFx0XHRcdGlmICggc2NvcGUuZW5hYmxlUGFuID09PSBmYWxzZSApIHJldHVybjtcblxuXHRcdFx0XHRcdHN0YXRlID0gU1RBVEUuVE9VQ0hfUEFOO1xuXG5cdFx0XHRcdFx0cGFuU3RhcnQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0XHRzdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzdGF0ZSAhPT0gU1RBVEUuTk9ORSApIHNjb3BlLmRpc3BhdGNoRXZlbnQoIHN0YXJ0RXZlbnQgKTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvdWNobW92ZSggZXZlbnQgKSB7XG5cblx0XHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dmFyIGVsZW1lbnQgPSBzY29wZS5kb21FbGVtZW50ID09PSBkb2N1bWVudCA/IHNjb3BlLmRvbUVsZW1lbnQuYm9keSA6IHNjb3BlLmRvbUVsZW1lbnQ7XG5cblx0XHRcdHN3aXRjaCAoIGV2ZW50LnRvdWNoZXMubGVuZ3RoICkge1xuXG5cdFx0XHRcdGNhc2UgMTogLy8gb25lLWZpbmdlcmVkIHRvdWNoOiByb3RhdGVcblxuXHRcdFx0XHRcdGlmICggc2NvcGUuZW5hYmxlUm90YXRlID09PSBmYWxzZSApIHJldHVybjtcblx0XHRcdFx0XHRpZiAoIHN0YXRlICE9PSBTVEFURS5UT1VDSF9ST1RBVEUgKSByZXR1cm47XG5cblx0XHRcdFx0XHRyb3RhdGVFbmQuc2V0KCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSApO1xuXHRcdFx0XHRcdHJvdGF0ZURlbHRhLnN1YlZlY3RvcnMoIHJvdGF0ZUVuZCwgcm90YXRlU3RhcnQgKTtcblxuXHRcdFx0XHRcdC8vIHJvdGF0aW5nIGFjcm9zcyB3aG9sZSBzY3JlZW4gZ29lcyAzNjAgZGVncmVlcyBhcm91bmRcblx0XHRcdFx0XHRjb25zdHJhaW50LnJvdGF0ZUxlZnQoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueCAvIGVsZW1lbnQuY2xpZW50V2lkdGggKiBzY29wZS5yb3RhdGVTcGVlZCApO1xuXHRcdFx0XHRcdC8vIHJvdGF0aW5nIHVwIGFuZCBkb3duIGFsb25nIHdob2xlIHNjcmVlbiBhdHRlbXB0cyB0byBnbyAzNjAsIGJ1dCBsaW1pdGVkIHRvIDE4MFxuXHRcdFx0XHRcdGNvbnN0cmFpbnQucm90YXRlVXAoIDIgKiBNYXRoLlBJICogcm90YXRlRGVsdGEueSAvIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICogc2NvcGUucm90YXRlU3BlZWQgKTtcblxuXHRcdFx0XHRcdHJvdGF0ZVN0YXJ0LmNvcHkoIHJvdGF0ZUVuZCApO1xuXG5cdFx0XHRcdFx0c2NvcGUudXBkYXRlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAyOiAvLyB0d28tZmluZ2VyZWQgdG91Y2g6IGRvbGx5XG5cblx0XHRcdFx0XHRpZiAoIHNjb3BlLmVuYWJsZVpvb20gPT09IGZhbHNlICkgcmV0dXJuO1xuXHRcdFx0XHRcdGlmICggc3RhdGUgIT09IFNUQVRFLlRPVUNIX0RPTExZICkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcblx0XHRcdFx0XHR2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG5cblx0XHRcdFx0XHRkb2xseUVuZC5zZXQoIDAsIGRpc3RhbmNlICk7XG5cdFx0XHRcdFx0ZG9sbHlEZWx0YS5zdWJWZWN0b3JzKCBkb2xseUVuZCwgZG9sbHlTdGFydCApO1xuXG5cdFx0XHRcdFx0aWYgKCBkb2xseURlbHRhLnkgPiAwICkge1xuXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50LmRvbGx5T3V0KCBnZXRab29tU2NhbGUoKSApO1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmICggZG9sbHlEZWx0YS55IDwgMCApIHtcblxuXHRcdFx0XHRcdFx0Y29uc3RyYWludC5kb2xseUluKCBnZXRab29tU2NhbGUoKSApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZG9sbHlTdGFydC5jb3B5KCBkb2xseUVuZCApO1xuXG5cdFx0XHRcdFx0c2NvcGUudXBkYXRlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzOiAvLyB0aHJlZS1maW5nZXJlZCB0b3VjaDogcGFuXG5cblx0XHRcdFx0XHRpZiAoIHNjb3BlLmVuYWJsZVBhbiA9PT0gZmFsc2UgKSByZXR1cm47XG5cdFx0XHRcdFx0aWYgKCBzdGF0ZSAhPT0gU1RBVEUuVE9VQ0hfUEFOICkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0cGFuRW5kLnNldCggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKTtcblx0XHRcdFx0XHRwYW5EZWx0YS5zdWJWZWN0b3JzKCBwYW5FbmQsIHBhblN0YXJ0ICk7XG5cblx0XHRcdFx0XHRwYW4oIHBhbkRlbHRhLngsIHBhbkRlbHRhLnkgKTtcblxuXHRcdFx0XHRcdHBhblN0YXJ0LmNvcHkoIHBhbkVuZCApO1xuXG5cdFx0XHRcdFx0c2NvcGUudXBkYXRlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHN0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG91Y2hlbmQoIC8qIGV2ZW50ICovICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCBlbmRFdmVudCApO1xuXHRcdFx0c3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udGV4dG1lbnUoIGV2ZW50ICkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCBjb250ZXh0bWVudSwgZmFsc2UgKTtcblx0XHRcdHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlICk7XG5cdFx0XHR0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlICk7XG5cdFx0XHR0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ01vek1vdXNlUGl4ZWxTY3JvbGwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlICk7IC8vIGZpcmVmb3hcblxuXHRcdFx0dGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydCwgZmFsc2UgKTtcblx0XHRcdHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0b3VjaGVuZCwgZmFsc2UgKTtcblx0XHRcdHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgdG91Y2htb3ZlLCBmYWxzZSApO1xuXG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUsIGZhbHNlICk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UgKTtcblxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIGNvbnRleHRtZW51LCBmYWxzZSApO1xuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UgKTtcblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNld2hlZWwnLCBvbk1vdXNlV2hlZWwsIGZhbHNlICk7XG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdNb3pNb3VzZVBpeGVsU2Nyb2xsJywgb25Nb3VzZVdoZWVsLCBmYWxzZSApOyAvLyBmaXJlZm94XG5cblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0LCBmYWxzZSApO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0b3VjaGVuZCwgZmFsc2UgKTtcblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIHRvdWNobW92ZSwgZmFsc2UgKTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UgKTtcblxuXHRcdC8vIGZvcmNlIGFuIHVwZGF0ZSBhdCBzdGFydFxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fTtcblxuXHRUSFJFRS5PcmJpdENvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUgKTtcblx0VEhSRUUuT3JiaXRDb250cm9scy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUSFJFRS5PcmJpdENvbnRyb2xzO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBUSFJFRS5PcmJpdENvbnRyb2xzLnByb3RvdHlwZSwge1xuXG5cdFx0b2JqZWN0OiB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cmFpbnQub2JqZWN0O1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0dGFyZ2V0OiB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cmFpbnQudGFyZ2V0O1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuT3JiaXRDb250cm9sczogdGFyZ2V0IGlzIG5vdyBpbW11dGFibGUuIFVzZSB0YXJnZXQuc2V0KCkgaW5zdGVhZC4nICk7XG5cdFx0XHRcdHRoaXMuY29uc3RyYWludC50YXJnZXQuY29weSggdmFsdWUgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdG1pbkRpc3RhbmNlIDoge1xuXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb25zdHJhaW50Lm1pbkRpc3RhbmNlO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0dGhpcy5jb25zdHJhaW50Lm1pbkRpc3RhbmNlID0gdmFsdWU7XG5cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRtYXhEaXN0YW5jZSA6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RyYWludC5tYXhEaXN0YW5jZTtcblxuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRcdHRoaXMuY29uc3RyYWludC5tYXhEaXN0YW5jZSA9IHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0bWluWm9vbSA6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RyYWludC5taW5ab29tO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0dGhpcy5jb25zdHJhaW50Lm1pblpvb20gPSB2YWx1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdG1heFpvb20gOiB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cmFpbnQubWF4Wm9vbTtcblxuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRcdHRoaXMuY29uc3RyYWludC5tYXhab29tID0gdmFsdWU7XG5cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRtaW5Qb2xhckFuZ2xlIDoge1xuXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb25zdHJhaW50Lm1pblBvbGFyQW5nbGU7XG5cblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0XHR0aGlzLmNvbnN0cmFpbnQubWluUG9sYXJBbmdsZSA9IHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0bWF4UG9sYXJBbmdsZSA6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RyYWludC5tYXhQb2xhckFuZ2xlO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0dGhpcy5jb25zdHJhaW50Lm1heFBvbGFyQW5nbGUgPSB2YWx1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdG1pbkF6aW11dGhBbmdsZSA6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RyYWludC5taW5BemltdXRoQW5nbGU7XG5cblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0XHR0aGlzLmNvbnN0cmFpbnQubWluQXppbXV0aEFuZ2xlID0gdmFsdWU7XG5cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRtYXhBemltdXRoQW5nbGUgOiB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cmFpbnQubWF4QXppbXV0aEFuZ2xlO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0dGhpcy5jb25zdHJhaW50Lm1heEF6aW11dGhBbmdsZSA9IHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0ZW5hYmxlRGFtcGluZyA6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RyYWludC5lbmFibGVEYW1waW5nO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0dGhpcy5jb25zdHJhaW50LmVuYWJsZURhbXBpbmcgPSB2YWx1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdGRhbXBpbmdGYWN0b3IgOiB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cmFpbnQuZGFtcGluZ0ZhY3RvcjtcblxuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRcdHRoaXMuY29uc3RyYWludC5kYW1waW5nRmFjdG9yID0gdmFsdWU7XG5cblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHQvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cblx0XHRub1pvb206IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuT3JiaXRDb250cm9sczogLm5vWm9vbSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVpvb20gaW5zdGVhZC4nICk7XG5cdFx0XHRcdHJldHVybiAhIHRoaXMuZW5hYmxlWm9vbTtcblxuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk9yYml0Q29udHJvbHM6IC5ub1pvb20gaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVab29tIGluc3RlYWQuJyApO1xuXHRcdFx0XHR0aGlzLmVuYWJsZVpvb20gPSAhIHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0bm9Sb3RhdGU6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuT3JiaXRDb250cm9sczogLm5vUm90YXRlIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUm90YXRlIGluc3RlYWQuJyApO1xuXHRcdFx0XHRyZXR1cm4gISB0aGlzLmVuYWJsZVJvdGF0ZTtcblxuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk9yYml0Q29udHJvbHM6IC5ub1JvdGF0ZSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVJvdGF0ZSBpbnN0ZWFkLicgKTtcblx0XHRcdFx0dGhpcy5lbmFibGVSb3RhdGUgPSAhIHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0bm9QYW46IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuT3JiaXRDb250cm9sczogLm5vUGFuIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlUGFuIGluc3RlYWQuJyApO1xuXHRcdFx0XHRyZXR1cm4gISB0aGlzLmVuYWJsZVBhbjtcblxuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk9yYml0Q29udHJvbHM6IC5ub1BhbiBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZVBhbiBpbnN0ZWFkLicgKTtcblx0XHRcdFx0dGhpcy5lbmFibGVQYW4gPSAhIHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0bm9LZXlzOiB7XG5cblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk9yYml0Q29udHJvbHM6IC5ub0tleXMgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIC5lbmFibGVLZXlzIGluc3RlYWQuJyApO1xuXHRcdFx0XHRyZXR1cm4gISB0aGlzLmVuYWJsZUtleXM7XG5cblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5PcmJpdENvbnRyb2xzOiAubm9LZXlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSAuZW5hYmxlS2V5cyBpbnN0ZWFkLicgKTtcblx0XHRcdFx0dGhpcy5lbmFibGVLZXlzID0gISB2YWx1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdHN0YXRpY01vdmluZyA6IHtcblxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nICk7XG5cdFx0XHRcdHJldHVybiAhIHRoaXMuY29uc3RyYWludC5lbmFibGVEYW1waW5nO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuT3JiaXRDb250cm9sczogLnN0YXRpY01vdmluZyBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgLmVuYWJsZURhbXBpbmcgaW5zdGVhZC4nICk7XG5cdFx0XHRcdHRoaXMuY29uc3RyYWludC5lbmFibGVEYW1waW5nID0gISB2YWx1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdGR5bmFtaWNEYW1waW5nRmFjdG9yIDoge1xuXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5PcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb25zdHJhaW50LmRhbXBpbmdGYWN0b3I7XG5cblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5PcmJpdENvbnRyb2xzOiAuZHluYW1pY0RhbXBpbmdGYWN0b3IgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIC5kYW1waW5nRmFjdG9yIGluc3RlYWQuJyApO1xuXHRcdFx0XHR0aGlzLmNvbnN0cmFpbnQuZGFtcGluZ0ZhY3RvciA9IHZhbHVlO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fSApO1xuXG59KCkgKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93ZWJfbW9kdWxlcy9PcmJpdENvbnRyb2xzLmpzXG4gKiogbW9kdWxlIGlkID0gMTk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBnbG9iYWwgVEhSRUUgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGVzTWVzaCBleHRlbmRzIFRIUkVFLk1lc2gge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKVxuICAgIGxldCBjdWJlID0gbmV3IFRIUkVFLkN1YmVHZW9tZXRyeSgxLCAxLCAxLCAxLCAxLCAxKVxuICAgIGxldCBzcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC41KVxuXG4gICAgbGV0IHJhbmRvbTNkID0gKHMsIG9mZnNldCA9IDApID0+IHtcbiAgICAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgcyAqIE1hdGgucmFuZG9tKCkgKyBvZmZzZXQsXG4gICAgICAgIHMgKiBNYXRoLnJhbmRvbSgpICsgb2Zmc2V0LFxuICAgICAgICBzICogTWF0aC5yYW5kb20oKSArIG9mZnNldClcbiAgICB9XG4gICAgbGV0IHJhbmRvbVJvdDNkID0gKHMsIG9mZnNldCA9IDApID0+IHtcbiAgICAgIHJldHVybiBuZXcgVEhSRUUuRXVsZXIoXG4gICAgICAgIHMgKiBNYXRoLnJhbmRvbSgpICsgb2Zmc2V0LFxuICAgICAgICBzICogTWF0aC5yYW5kb20oKSArIG9mZnNldCxcbiAgICAgICAgcyAqIE1hdGgucmFuZG9tKCkgKyBvZmZzZXQpXG4gICAgfVxuXG4gICAgbGV0IG1hdCA9IG5ldyBUSFJFRS5NYXRyaXg0KClcbiAgICBsZXQgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTA7IGkrKykge1xuICAgICAgbGV0IHBvcyA9IHJhbmRvbTNkKDIwLCAtMTApXG4gICAgICBsZXQgcm90ID0gcmFuZG9tUm90M2QoMiAqIE1hdGguUEkpXG4gICAgICBsZXQgc2NhbGUgPSByYW5kb20zZCgyLjAsIDEuMClcbiAgICAgIHF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKHJvdCwgZmFsc2UpXG4gICAgICBnZW9tZXRyeS5tZXJnZShjdWJlLCBtYXQuY29tcG9zZShwb3MsIHF1YXRlcm5pb24sIHNjYWxlKSlcblxuICAgICAgcG9zID0gcmFuZG9tM2QoMjAsIC0xMClcbiAgICAgIHJvdCA9IHJhbmRvbVJvdDNkKDIgKiBNYXRoLlBJKVxuICAgICAgc2NhbGUgPSByYW5kb20zZCgyLjAsIDEuMClcbiAgICAgIHF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKHJvdCwgZmFsc2UpXG4gICAgICBnZW9tZXRyeS5tZXJnZShzcGhlcmUsIG1hdC5jb21wb3NlKHBvcywgcXVhdGVybmlvbiwgc2NhbGUpKVxuICAgIH1cbiAgICBzdXBlcihcbiAgICAgIGdlb21ldHJ5LFxuICAgICAgbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmZmNWY1XG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGFydGljbGVzLW1lc2guanNcbiAqKi8iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvVXNlcnMvaWJ1L1Byb2plY3RzL1htYXNFeDIwMTUvZXhwZXJpbWVudHMvMDItU3ZnVG9TaGFkb3cvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgamFkZV9kZWJ1ZyA9IFsgbmV3IGphZGUuRGVidWdJdGVtKCAxLCBcIi9Vc2Vycy9pYnUvUHJvamVjdHMvWG1hc0V4MjAxNS9leHBlcmltZW50cy8wMi1TdmdUb1NoYWRvdy9zcmMvYm9keS5qYWRlXCIgKSBdO1xudHJ5IHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xudmFyIHNlbGYgPSBsb2NhbHMgfHwge307XG5qYWRlX2RlYnVnLnVuc2hpZnQobmV3IGphZGUuRGVidWdJdGVtKCAwLCBcIi9Vc2Vycy9pYnUvUHJvamVjdHMvWG1hc0V4MjAxNS9leHBlcmltZW50cy8wMi1TdmdUb1NoYWRvdy9zcmMvYm9keS5qYWRlXCIgKSk7XG5qYWRlX2RlYnVnLnVuc2hpZnQobmV3IGphZGUuRGVidWdJdGVtKCAxLCBcIi9Vc2Vycy9pYnUvUHJvamVjdHMvWG1hc0V4MjAxNS9leHBlcmltZW50cy8wMi1TdmdUb1NoYWRvdy9zcmMvYm9keS5qYWRlXCIgKSk7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XCIpO1xuamFkZV9kZWJ1Zy51bnNoaWZ0KG5ldyBqYWRlLkRlYnVnSXRlbSggdW5kZWZpbmVkLCBqYWRlX2RlYnVnWzBdLmZpbGVuYW1lICkpO1xuamFkZV9kZWJ1Zy51bnNoaWZ0KG5ldyBqYWRlLkRlYnVnSXRlbSggMiwgXCIvVXNlcnMvaWJ1L1Byb2plY3RzL1htYXNFeDIwMTUvZXhwZXJpbWVudHMvMDItU3ZnVG9TaGFkb3cvc3JjL2JvZHkuamFkZVwiICkpO1xuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJtYXBfY2FudmFzXFxcIj5cIik7XG5qYWRlX2RlYnVnLnVuc2hpZnQobmV3IGphZGUuRGVidWdJdGVtKCB1bmRlZmluZWQsIGphZGVfZGVidWdbMF0uZmlsZW5hbWUgKSk7XG5qYWRlX2RlYnVnLnNoaWZ0KCk7XG5idWYucHVzaChcIjwvZGl2PlwiKTtcbmphZGVfZGVidWcuc2hpZnQoKTtcbmphZGVfZGVidWcuc2hpZnQoKTtcbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO1xuamFkZV9kZWJ1Zy5zaGlmdCgpO1xuamFkZV9kZWJ1Zy5zaGlmdCgpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59IGNhdGNoIChlcnIpIHtcbiAgamFkZS5yZXRocm93KGVyciwgamFkZV9kZWJ1Z1swXS5maWxlbmFtZSwgamFkZV9kZWJ1Z1swXS5saW5lbm8sIFwiLmNvbnRhaW5lclxcbiAgI21hcF9jYW52YXNcXG5cIik7XG59XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9ib2R5LmphZGVcbiAqKiBtb2R1bGUgaWQgPSAyMDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2phZGUvbGliL3J1bnRpbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZnMgKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gMjAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIFN0YXRzID0gZnVuY3Rpb24gKCkge1xuXG5cdHZhciBzdGFydFRpbWUgPSBEYXRlLm5vdygpLCBwcmV2VGltZSA9IHN0YXJ0VGltZTtcblx0dmFyIG1zID0gMCwgbXNNaW4gPSBJbmZpbml0eSwgbXNNYXggPSAwO1xuXHR2YXIgZnBzID0gMCwgZnBzTWluID0gSW5maW5pdHksIGZwc01heCA9IDA7XG5cdHZhciBmcmFtZXMgPSAwLCBtb2RlID0gMDtcblxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0Y29udGFpbmVyLmlkID0gJ3N0YXRzJztcblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBzZXRNb2RlKCArKyBtb2RlICUgMiApIH0sIGZhbHNlICk7XG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOjgwcHg7b3BhY2l0eTowLjk7Y3Vyc29yOnBvaW50ZXInO1xuXG5cdHZhciBmcHNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRmcHNEaXYuaWQgPSAnZnBzJztcblx0ZnBzRGl2LnN0eWxlLmNzc1RleHQgPSAncGFkZGluZzowIDAgM3B4IDNweDt0ZXh0LWFsaWduOmxlZnQ7YmFja2dyb3VuZC1jb2xvcjojMDAyJztcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBmcHNEaXYgKTtcblxuXHR2YXIgZnBzVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdGZwc1RleHQuaWQgPSAnZnBzVGV4dCc7XG5cdGZwc1RleHQuc3R5bGUuY3NzVGV4dCA9ICdjb2xvcjojMGZmO2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoxNXB4Jztcblx0ZnBzVGV4dC5pbm5lckhUTUwgPSAnRlBTJztcblx0ZnBzRGl2LmFwcGVuZENoaWxkKCBmcHNUZXh0ICk7XG5cblx0dmFyIGZwc0dyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0ZnBzR3JhcGguaWQgPSAnZnBzR3JhcGgnO1xuXHRmcHNHcmFwaC5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjc0cHg7aGVpZ2h0OjMwcHg7YmFja2dyb3VuZC1jb2xvcjojMGZmJztcblx0ZnBzRGl2LmFwcGVuZENoaWxkKCBmcHNHcmFwaCApO1xuXG5cdHdoaWxlICggZnBzR3JhcGguY2hpbGRyZW4ubGVuZ3RoIDwgNzQgKSB7XG5cblx0XHR2YXIgYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XG5cdFx0YmFyLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6MXB4O2hlaWdodDozMHB4O2Zsb2F0OmxlZnQ7YmFja2dyb3VuZC1jb2xvcjojMTEzJztcblx0XHRmcHNHcmFwaC5hcHBlbmRDaGlsZCggYmFyICk7XG5cblx0fVxuXG5cdHZhciBtc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdG1zRGl2LmlkID0gJ21zJztcblx0bXNEaXYuc3R5bGUuY3NzVGV4dCA9ICdwYWRkaW5nOjAgMCAzcHggM3B4O3RleHQtYWxpZ246bGVmdDtiYWNrZ3JvdW5kLWNvbG9yOiMwMjA7ZGlzcGxheTpub25lJztcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBtc0RpdiApO1xuXG5cdHZhciBtc1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRtc1RleHQuaWQgPSAnbXNUZXh0Jztcblx0bXNUZXh0LnN0eWxlLmNzc1RleHQgPSAnY29sb3I6IzBmMDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXNpemU6OXB4O2ZvbnQtd2VpZ2h0OmJvbGQ7bGluZS1oZWlnaHQ6MTVweCc7XG5cdG1zVGV4dC5pbm5lckhUTUwgPSAnTVMnO1xuXHRtc0Rpdi5hcHBlbmRDaGlsZCggbXNUZXh0ICk7XG5cblx0dmFyIG1zR3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRtc0dyYXBoLmlkID0gJ21zR3JhcGgnO1xuXHRtc0dyYXBoLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246cmVsYXRpdmU7d2lkdGg6NzRweDtoZWlnaHQ6MzBweDtiYWNrZ3JvdW5kLWNvbG9yOiMwZjAnO1xuXHRtc0Rpdi5hcHBlbmRDaGlsZCggbXNHcmFwaCApO1xuXG5cdHdoaWxlICggbXNHcmFwaC5jaGlsZHJlbi5sZW5ndGggPCA3NCApIHtcblxuXHRcdHZhciBiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcblx0XHRiYXIuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDoxcHg7aGVpZ2h0OjMwcHg7ZmxvYXQ6bGVmdDtiYWNrZ3JvdW5kLWNvbG9yOiMxMzEnO1xuXHRcdG1zR3JhcGguYXBwZW5kQ2hpbGQoIGJhciApO1xuXG5cdH1cblxuXHR2YXIgc2V0TW9kZSA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRtb2RlID0gdmFsdWU7XG5cblx0XHRzd2l0Y2ggKCBtb2RlICkge1xuXG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGZwc0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0bXNEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdGZwc0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHRtc0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdH07XG5cblx0dmFyIHVwZGF0ZUdyYXBoID0gZnVuY3Rpb24gKCBkb20sIHZhbHVlICkge1xuXG5cdFx0dmFyIGNoaWxkID0gZG9tLmFwcGVuZENoaWxkKCBkb20uZmlyc3RDaGlsZCApO1xuXHRcdGNoaWxkLnN0eWxlLmhlaWdodCA9IHZhbHVlICsgJ3B4JztcblxuXHR9O1xuXG5cdHJldHVybiB7XG5cblx0XHRSRVZJU0lPTjogMTIsXG5cblx0XHRkb21FbGVtZW50OiBjb250YWluZXIsXG5cblx0XHRzZXRNb2RlOiBzZXRNb2RlLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0c3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuXHRcdH0sXG5cblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIHRpbWUgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRtcyA9IHRpbWUgLSBzdGFydFRpbWU7XG5cdFx0XHRtc01pbiA9IE1hdGgubWluKCBtc01pbiwgbXMgKTtcblx0XHRcdG1zTWF4ID0gTWF0aC5tYXgoIG1zTWF4LCBtcyApO1xuXG5cdFx0XHRtc1RleHQudGV4dENvbnRlbnQgPSBtcyArICcgTVMgKCcgKyBtc01pbiArICctJyArIG1zTWF4ICsgJyknO1xuXHRcdFx0dXBkYXRlR3JhcGgoIG1zR3JhcGgsIE1hdGgubWluKCAzMCwgMzAgLSAoIG1zIC8gMjAwICkgKiAzMCApICk7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0aWYgKCB0aW1lID4gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwcyA9IE1hdGgucm91bmQoICggZnJhbWVzICogMTAwMCApIC8gKCB0aW1lIC0gcHJldlRpbWUgKSApO1xuXHRcdFx0XHRmcHNNaW4gPSBNYXRoLm1pbiggZnBzTWluLCBmcHMgKTtcblx0XHRcdFx0ZnBzTWF4ID0gTWF0aC5tYXgoIGZwc01heCwgZnBzICk7XG5cblx0XHRcdFx0ZnBzVGV4dC50ZXh0Q29udGVudCA9IGZwcyArICcgRlBTICgnICsgZnBzTWluICsgJy0nICsgZnBzTWF4ICsgJyknO1xuXHRcdFx0XHR1cGRhdGVHcmFwaCggZnBzR3JhcGgsIE1hdGgubWluKCAzMCwgMzAgLSAoIGZwcyAvIDEwMCApICogMzAgKSApO1xuXG5cdFx0XHRcdHByZXZUaW1lID0gdGltZTtcblx0XHRcdFx0ZnJhbWVzID0gMDtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0c3RhcnRUaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbmlmICggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBTdGF0cztcblxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0YXRzLmpzL3NyYy9TdGF0cy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==