/* eslint-disable */
(function(factory) {

    // ie 11
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            let to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                    }
                }
                }
            }
            return to;
            },
            writable: true,
            configurable: true
        });
    }
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike/*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                    T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method 
                // of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                    A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
            }
        });
    }
    Number.isNaN = Number.isNaN || function(value) {
        return typeof value === "number" && isNaN(value);
    }
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(search, this_len) {
            if (this_len === undefined || this_len > this.length) {
                this_len = this.length;
            }
            return this.substring(this_len - search.length, this_len) === search;
        };
    }
    // ie 11 end

    var trace = function(i) { console.log('rrwebSDK : ' + i); };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        trace('import ... ');
        let rrweb = require('./rrweb-1.1.1.js');
        trace('import ... ok');
        module.exports = factory(trace, rrweb);
    } else {
        trace('load ... ');
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.onload = function() {
            trace('load ... ok');
            (window.onReady || window.onready || function(){})(factory(trace, rrweb));
        }
        script.src = 'https://cdn.ecs2pay.com/rrweb/rrweb-1.1.3.js';
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    }

}(function(trace, rrweb) {
    return function(options) {

        var status = {
            timer : null,
            events : [],
            stop : true,
            debug : false,
        };

        var config = {
            reportUrl : 'https://www.yunbaoxiao.com.cn/recall',
            reportTimes : 3,
            reportTimeout : 0,
            notSupportInfo : '浏览器版本过低，需要 IE11+ 以上版本。',
            notSupportEvent : null,
        };

        var cache = {
            recallCode : '',
            busCode: '',
            goodsCode: '',
            goodsVersion: '',
        }

        var _debug = function(i) {
            if (status.debug) console.log('rrwebSDK : ' + i);
        }

        var _cache = function(a) {
            var c = window.sessionStorage, k = 'rrwebsdk_cache';
            switch(a) {
                case undefined: return JSON.parse(c.getItem(k)) || cache;
                case null: c.removeItem(k); break;
                default: c.setItem(k, JSON.stringify(cache));
            }
        }

        var _report = function(callback) {
            _debug('report ...');
            if (!status.events.length) {
                trace('report ... ignore');
                if (typeof callback == 'function') callback(true);
                return;
            }
            var events = [].concat(status.events); status.events = [];
            var data = JSON.parse(JSON.stringify(cache));
            data.events = JSON.stringify({ events: events });
            var body = '';
            for(var k in data) {
                body += '&'+k+'='+encodeURIComponent(data[k]);
            }
            body = body.substring(1);
            var url = config.reportUrl+'/api/events/report.shtml';
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        trace('report ... ok (' + JSON.parse(xhr.responseText || '{}').message + ')');
                        if (typeof callback == 'function') callback(1);
                    }else{
                        trace('report ... error (' + xhr.status + ')');
                        status.events = [].concat(events, status.events);
                        if (typeof callback == 'function') callback(0);
                    }
                }
            }
            if (config.reportTimeout && typeof callback == 'function') {
                xhr.timeout = config.reportTimeout * 1000;
                xhr.ontimeout = function (e) {
                    callback(2);
                };
            }
            xhr.send(body);
        }

        var _start = function() {
            if (!status.stop) return;
            status.stop = false;
            rrweb.record({
                emit : function(event) {
                    _debug('rr ... ' + (status.stop ? 'miss' : '+1'));
                    if(!status.stop){
                        status.events.push(event);
                    }
                },
            });
            status.timer = setInterval(_report, config.reportTimes * 1000);
        }

        var _stop = function(callback, methodName) {
            status.stop = true;
            clearInterval(status.timer);
            _report(function(state) {
                if (state && methodName == 'stop') _cache(null);
                if (typeof callback == 'function') callback(state);
                trace(methodName + ' ... ' + (state ? 'ok' : 'error'));
            });
        }

        var _token = function(a) {
            if (a == 'encode') {
                _debug('token encode ...');
                return 'rrwebsdk_token=' + JSON.stringify(cache).replace(/"/g,'@').replace(/:/g,'-').replace(/,/g,'_').replace(/[{}]/g,'')
            }
            if (a == 'decode') {
                _debug('token decode ...');
                var vars = window.location.search.substring(1).split("&");
                var rrwebsdk_token = '';
                for (var i=0; i<vars.length; i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == 'rrwebsdk_token') { rrwebsdk_token = pair[1]; break; }
                }
                _debug('token decode ... : ' + (rrwebsdk_token || 'null'));
                if (rrwebsdk_token) {
                    var token = JSON.parse('{' + rrwebsdk_token.replace(/@/g,'"').replace(/-/g,':').replace(/_/g,',') + '}');
                    for(var k in cache) { if (Object.keys(token).indexOf(k) < 0) return false; }
                    return token;
                }
                return false;
            }
        }

        this.report = function(data) {
            var crucial = [
                'goodsCode', //产品编码（必填）
                'goodsVersion', //产品版本
                'busCode', //业务编码
            ];
            var order = [
                'goodsName', //产品名称
                'orderNo', //订单号
                'policyNo', //保单号
                'applicantName', //投保人名
                'idNo', //投保证件
                'origin', //来源，和后台保持一致
                'faceRecognition',
            ];
            var c = false, u = {};
            for(var k in data) {
                if (crucial.indexOf(k) >= 0) { cache[k] = data[k]; c=1; }
                if (crucial.concat(order).indexOf(k) >= 0) u[k] = data[k];
            }
            if (c) _cache(true);
            if (JSON.stringify(u) != '{}') status.events.push({ type:'_customer_variable_', data:u});
        };


        this.start = function(data) {
            trace('start ...');
            if (!status.stop) {
                trace('start ... error (已在录制中，若要开始一个新的录制，请先使用 stop() 停止旧的录制)');
                return;
            }
            cache.recallCode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function() {return '0123456789abcdef'.charAt(Math.floor(Math.random() * 16))});
            _cache(true);
            _start();
            trace('start ... ok');
        }

        this.leaveReport = function(callback) {
            trace('leave report ...');
            _stop(callback, 'leave report');
        }

        this.restoreReport = function() {
            trace('restoreReport ...');
            if (!status.stop) {
                trace('restore report ... error (已在录制中)');
                return;
            }
            if (!cache.recallCode) {
                var token = _token('decode');
                if (token) {
                    cache = token;
                    _cache(true);
                } else {
                    trace('restore report ... error (回溯码不存在，无法继续录制)');
                    return;
                }
            }
            _start();
            trace('restore report ... ok');
        };

        this.stop = function(callback){
            trace('stop ...');
            _stop(callback, 'stop');
        };

        this.open = function(url) {
            trace('open ...');
            var s = url.indexOf('?') < 0 ? '?' : '&';
            window.location.href = url + s + _token('encode');
        };

        this.face = function(onoff) {
            trace('face ...');
            if (onoff) {
                var id = Date.parse(new Date());
                var div = document.createElement("div");
                div.style = 'position: fixed; z-index: 999999; left: 0; top: 0; right: 0; bottom: 0; width: 100%; height: 100%; border:none; background:#000;';
                div.id = 'rrwebsdk_face';
                var video = document.createElement("video");
                video.style = 'width:100%; height:auto;';
                video.controls = false;
                video.autoplay = true;
                video.loop = false;
                video.onended = function(){ var div = document.querySelector('#rrwebsdk_face'); if (div) div.remove(); }
                video.src = 'video-'+id+'-src';
                var body = document.querySelector('body');
                div.appendChild(video);
                body.appendChild(div);
            } else {
                var div = document.querySelector('#rrwebsdk_face');
                if (div) div.remove();
            }
            trace('face ... ' + (onoff ? 'on' : 'off'));
        };

        this.debug = function(onoff) {
            trace('debug ...');
            status.debug = !!onoff;
            trace('debug ... ' + (status.debug ? 'on' : 'off'));
        };

        this.version = function() {
            var v = '1.1.3';
            trace('version ' + v);
            return v;
        }

        trace('instantiate ...');
        if (options) {
            for (var k in config) {
                if(options[k] !== undefined) config[k] = options[k];
            }
        }
        if (!window.MutationObserver) {
            if (config.notSupportEvent) {
                config.notSupportEvent();
            } else {
                alert(config.notSupportInfo);
                window.history.back();
            }
            return;
        }
        cache = _cache();
        trace('instantiate ... ok');

    };
}))