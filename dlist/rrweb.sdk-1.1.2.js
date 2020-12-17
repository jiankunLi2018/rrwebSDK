/* eslint-disable */
(function(factory) {

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
        script.src = '/sdk/rrweb/rrweb-1.1.1.js';
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    }

}(function(trace, rrweb) {
    return function(options) {

        var status = {
            timer : null,
            events : [],
            stop : true,
            debug : 1,
        };

        var config = {
            reportUrl : 'https://www.yunbaoxiao.com.cn/recall',
            reportTimes : 3,
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
            xhr.open('POST',url,true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(body);
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        trace('report ... ok (' + JSON.parse(xhr.responseText || '{}').message + ')');
                        if (typeof callback == 'function') callback(true);
                    }else{
                        trace('report ... error (' + xhr.status + ')');
                        status.events = [].concat(events, status.events);
                        if (typeof callback == 'function') callback(false);
                    }
                }
            }
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
                'faceRecognition', //开始人脸识别时间戳
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
            var v = '1.1.2';
            trace('version ' + v);
            return v;
        };

        // 内部草案方法，未最终确认，商户勿自行调用
        this.pushEvents = function(_events) {
            status.events.push(_events);
        };

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