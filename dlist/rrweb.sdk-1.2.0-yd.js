// 1.2.0 英大加密定制版
/* eslint-disable */

/*
    rrweb.encrypt

    version 1.0.0
    update  2020/09/29
*/

/* import crypto-js.js */
!function(t,r){t.CryptoJS=r()}(window,function(){var t=t||function(t,r){var e=Object.create||function(){function t(){}return function(r){var e;return t.prototype=r,e=new t,t.prototype=null,e}}(),i={},n=i.lib={},o=n.Base=function(){return{extend:function(t){var r=e(this);return t&&r.mixIn(t),r.hasOwnProperty("init")&&this.init!==r.init||(r.init=function(){r.$super.init.apply(this,arguments)}),r.init.prototype=r,r.$super=this,r},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var r in t)t.hasOwnProperty(r)&&(this[r]=t[r]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),s=n.WordArray=o.extend({init:function(t,e){t=this.words=t||[],e!=r?this.sigBytes=e:this.sigBytes=4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var r=this.words,e=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var s=e[o>>>2]>>>24-o%4*8&255;r[i+o>>>2]|=s<<24-(i+o)%4*8}else for(var o=0;o<n;o+=4)r[i+o>>>2]=e[o>>>2];return this.sigBytes+=n,this},clamp:function(){var r=this.words,e=this.sigBytes;r[e>>>2]&=4294967295<<32-e%4*8,r.length=t.ceil(e/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(r){for(var e,i=[],n=function(r){var r=r,e=987654321,i=4294967295;return function(){e=36969*(65535&e)+(e>>16)&i,r=18e3*(65535&r)+(r>>16)&i;var n=(e<<16)+r&i;return n/=4294967296,n+=.5,n*(t.random()>.5?1:-1)}},o=0;o<r;o+=4){var a=n(4294967296*(e||t.random()));e=987654071*a(),i.push(4294967296*a()|0)}return new s.init(i,r)}}),a=i.enc={},c=a.Hex={stringify:function(t){for(var r=t.words,e=t.sigBytes,i=[],n=0;n<e;n++){var o=r[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var r=t.length,e=[],i=0;i<r;i+=2)e[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new s.init(e,r/2)}},h=a.Latin1={stringify:function(t){for(var r=t.words,e=t.sigBytes,i=[],n=0;n<e;n++){var o=r[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var r=t.length,e=[],i=0;i<r;i++)e[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new s.init(e,r)}},l=a.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},f=n.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(r){var e=this._data,i=e.words,n=e.sigBytes,o=this.blockSize,a=4*o,c=n/a;c=r?t.ceil(c):t.max((0|c)-this._minBufferSize,0);var h=c*o,l=t.min(4*h,n);if(h){for(var f=0;f<h;f+=o)this._doProcessBlock(i,f);var u=i.splice(0,h);e.sigBytes-=l}return new s.init(u,l)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),u=(n.Hasher=f.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var r=this._doFinalize();return r},blockSize:16,_createHelper:function(t){return function(r,e){return new t.init(e).finalize(r)}},_createHmacHelper:function(t){return function(r,e){return new u.HMAC.init(t,e).finalize(r)}}}),i.algo={});return i}(Math);return function(){function r(t,r,e){for(var i=[],o=0,s=0;s<r;s++)if(s%4){var a=e[t.charCodeAt(s-1)]<<s%4*2,c=e[t.charCodeAt(s)]>>>6-s%4*2;i[o>>>2]|=(a|c)<<24-o%4*8,o++}return n.create(i,o)}var e=t,i=e.lib,n=i.WordArray,o=e.enc;o.Base64={stringify:function(t){var r=t.words,e=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<e;o+=3)for(var s=r[o>>>2]>>>24-o%4*8&255,a=r[o+1>>>2]>>>24-(o+1)%4*8&255,c=r[o+2>>>2]>>>24-(o+2)%4*8&255,h=s<<16|a<<8|c,l=0;l<4&&o+.75*l<e;l++)n.push(i.charAt(h>>>6*(3-l)&63));var f=i.charAt(64);if(f)for(;n.length%4;)n.push(f);return n.join("")},parse:function(t){var e=t.length,i=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<i.length;o++)n[i.charCodeAt(o)]=o}var s=i.charAt(64);if(s){var a=t.indexOf(s);a!==-1&&(e=a)}return r(t,e,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(r){function e(t,r,e,i,n,o,s){var a=t+(r&e|~r&i)+n+s;return(a<<o|a>>>32-o)+r}function i(t,r,e,i,n,o,s){var a=t+(r&i|e&~i)+n+s;return(a<<o|a>>>32-o)+r}function n(t,r,e,i,n,o,s){var a=t+(r^e^i)+n+s;return(a<<o|a>>>32-o)+r}function o(t,r,e,i,n,o,s){var a=t+(e^(r|~i))+n+s;return(a<<o|a>>>32-o)+r}var s=t,a=s.lib,c=a.WordArray,h=a.Hasher,l=s.algo,f=[];!function(){for(var t=0;t<64;t++)f[t]=4294967296*r.abs(r.sin(t+1))|0}();var u=l.MD5=h.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,r){for(var s=0;s<16;s++){var a=r+s,c=t[a];t[a]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}var h=this._hash.words,l=t[r+0],u=t[r+1],d=t[r+2],v=t[r+3],p=t[r+4],_=t[r+5],y=t[r+6],g=t[r+7],B=t[r+8],w=t[r+9],k=t[r+10],S=t[r+11],m=t[r+12],x=t[r+13],b=t[r+14],H=t[r+15],z=h[0],A=h[1],C=h[2],D=h[3];z=e(z,A,C,D,l,7,f[0]),D=e(D,z,A,C,u,12,f[1]),C=e(C,D,z,A,d,17,f[2]),A=e(A,C,D,z,v,22,f[3]),z=e(z,A,C,D,p,7,f[4]),D=e(D,z,A,C,_,12,f[5]),C=e(C,D,z,A,y,17,f[6]),A=e(A,C,D,z,g,22,f[7]),z=e(z,A,C,D,B,7,f[8]),D=e(D,z,A,C,w,12,f[9]),C=e(C,D,z,A,k,17,f[10]),A=e(A,C,D,z,S,22,f[11]),z=e(z,A,C,D,m,7,f[12]),D=e(D,z,A,C,x,12,f[13]),C=e(C,D,z,A,b,17,f[14]),A=e(A,C,D,z,H,22,f[15]),z=i(z,A,C,D,u,5,f[16]),D=i(D,z,A,C,y,9,f[17]),C=i(C,D,z,A,S,14,f[18]),A=i(A,C,D,z,l,20,f[19]),z=i(z,A,C,D,_,5,f[20]),D=i(D,z,A,C,k,9,f[21]),C=i(C,D,z,A,H,14,f[22]),A=i(A,C,D,z,p,20,f[23]),z=i(z,A,C,D,w,5,f[24]),D=i(D,z,A,C,b,9,f[25]),C=i(C,D,z,A,v,14,f[26]),A=i(A,C,D,z,B,20,f[27]),z=i(z,A,C,D,x,5,f[28]),D=i(D,z,A,C,d,9,f[29]),C=i(C,D,z,A,g,14,f[30]),A=i(A,C,D,z,m,20,f[31]),z=n(z,A,C,D,_,4,f[32]),D=n(D,z,A,C,B,11,f[33]),C=n(C,D,z,A,S,16,f[34]),A=n(A,C,D,z,b,23,f[35]),z=n(z,A,C,D,u,4,f[36]),D=n(D,z,A,C,p,11,f[37]),C=n(C,D,z,A,g,16,f[38]),A=n(A,C,D,z,k,23,f[39]),z=n(z,A,C,D,x,4,f[40]),D=n(D,z,A,C,l,11,f[41]),C=n(C,D,z,A,v,16,f[42]),A=n(A,C,D,z,y,23,f[43]),z=n(z,A,C,D,w,4,f[44]),D=n(D,z,A,C,m,11,f[45]),C=n(C,D,z,A,H,16,f[46]),A=n(A,C,D,z,d,23,f[47]),z=o(z,A,C,D,l,6,f[48]),D=o(D,z,A,C,g,10,f[49]),C=o(C,D,z,A,b,15,f[50]),A=o(A,C,D,z,_,21,f[51]),z=o(z,A,C,D,m,6,f[52]),D=o(D,z,A,C,v,10,f[53]),C=o(C,D,z,A,k,15,f[54]),A=o(A,C,D,z,u,21,f[55]),z=o(z,A,C,D,B,6,f[56]),D=o(D,z,A,C,H,10,f[57]),C=o(C,D,z,A,y,15,f[58]),A=o(A,C,D,z,x,21,f[59]),z=o(z,A,C,D,p,6,f[60]),D=o(D,z,A,C,S,10,f[61]),C=o(C,D,z,A,d,15,f[62]),A=o(A,C,D,z,w,21,f[63]),h[0]=h[0]+z|0,h[1]=h[1]+A|0,h[2]=h[2]+C|0,h[3]=h[3]+D|0},_doFinalize:function(){var t=this._data,e=t.words,i=8*this._nDataBytes,n=8*t.sigBytes;e[n>>>5]|=128<<24-n%32;var o=r.floor(i/4294967296),s=i;e[(n+64>>>9<<4)+15]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),e[(n+64>>>9<<4)+14]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),t.sigBytes=4*(e.length+1),this._process();for(var a=this._hash,c=a.words,h=0;h<4;h++){var l=c[h];c[h]=16711935&(l<<8|l>>>24)|4278255360&(l<<24|l>>>8)}return a},clone:function(){var t=h.clone.call(this);return t._hash=this._hash.clone(),t}});s.MD5=h._createHelper(u),s.HmacMD5=h._createHmacHelper(u)}(Math),function(){var r=t,e=r.lib,i=e.WordArray,n=e.Hasher,o=r.algo,s=[],a=o.SHA1=n.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,r){for(var e=this._hash.words,i=e[0],n=e[1],o=e[2],a=e[3],c=e[4],h=0;h<80;h++){if(h<16)s[h]=0|t[r+h];else{var l=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=l<<1|l>>>31}var f=(i<<5|i>>>27)+c+s[h];f+=h<20?(n&o|~n&a)+1518500249:h<40?(n^o^a)+1859775393:h<60?(n&o|n&a|o&a)-1894007588:(n^o^a)-899497514,c=a,a=o,o=n<<30|n>>>2,n=i,i=f}e[0]=e[0]+i|0,e[1]=e[1]+n|0,e[2]=e[2]+o|0,e[3]=e[3]+a|0,e[4]=e[4]+c|0},_doFinalize:function(){var t=this._data,r=t.words,e=8*this._nDataBytes,i=8*t.sigBytes;return r[i>>>5]|=128<<24-i%32,r[(i+64>>>9<<4)+14]=Math.floor(e/4294967296),r[(i+64>>>9<<4)+15]=e,t.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=n.clone.call(this);return t._hash=this._hash.clone(),t}});r.SHA1=n._createHelper(a),r.HmacSHA1=n._createHmacHelper(a)}(),function(r){var e=t,i=e.lib,n=i.WordArray,o=i.Hasher,s=e.algo,a=[],c=[];!function(){function t(t){for(var e=r.sqrt(t),i=2;i<=e;i++)if(!(t%i))return!1;return!0}function e(t){return 4294967296*(t-(0|t))|0}for(var i=2,n=0;n<64;)t(i)&&(n<8&&(a[n]=e(r.pow(i,.5))),c[n]=e(r.pow(i,1/3)),n++),i++}();var h=[],l=s.SHA256=o.extend({_doReset:function(){this._hash=new n.init(a.slice(0))},_doProcessBlock:function(t,r){for(var e=this._hash.words,i=e[0],n=e[1],o=e[2],s=e[3],a=e[4],l=e[5],f=e[6],u=e[7],d=0;d<64;d++){if(d<16)h[d]=0|t[r+d];else{var v=h[d-15],p=(v<<25|v>>>7)^(v<<14|v>>>18)^v>>>3,_=h[d-2],y=(_<<15|_>>>17)^(_<<13|_>>>19)^_>>>10;h[d]=p+h[d-7]+y+h[d-16]}var g=a&l^~a&f,B=i&n^i&o^n&o,w=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),k=(a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25),S=u+k+g+c[d]+h[d],m=w+B;u=f,f=l,l=a,a=s+S|0,s=o,o=n,n=i,i=S+m|0}e[0]=e[0]+i|0,e[1]=e[1]+n|0,e[2]=e[2]+o|0,e[3]=e[3]+s|0,e[4]=e[4]+a|0,e[5]=e[5]+l|0,e[6]=e[6]+f|0,e[7]=e[7]+u|0},_doFinalize:function(){var t=this._data,e=t.words,i=8*this._nDataBytes,n=8*t.sigBytes;return e[n>>>5]|=128<<24-n%32,e[(n+64>>>9<<4)+14]=r.floor(i/4294967296),e[(n+64>>>9<<4)+15]=i,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=o.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=o._createHelper(l),e.HmacSHA256=o._createHmacHelper(l)}(Math),function(){function r(t){return t<<8&4278255360|t>>>8&16711935}var e=t,i=e.lib,n=i.WordArray,o=e.enc;o.Utf16=o.Utf16BE={stringify:function(t){for(var r=t.words,e=t.sigBytes,i=[],n=0;n<e;n+=2){var o=r[n>>>2]>>>16-n%4*8&65535;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var r=t.length,e=[],i=0;i<r;i++)e[i>>>1]|=t.charCodeAt(i)<<16-i%2*16;return n.create(e,2*r)}};o.Utf16LE={stringify:function(t){for(var e=t.words,i=t.sigBytes,n=[],o=0;o<i;o+=2){var s=r(e[o>>>2]>>>16-o%4*8&65535);n.push(String.fromCharCode(s))}return n.join("")},parse:function(t){for(var e=t.length,i=[],o=0;o<e;o++)i[o>>>1]|=r(t.charCodeAt(o)<<16-o%2*16);return n.create(i,2*e)}}}(),function(){if("function"==typeof ArrayBuffer){var r=t,e=r.lib,i=e.WordArray,n=i.init,o=i.init=function(t){if(t instanceof ArrayBuffer&&(t=new Uint8Array(t)),(t instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),t instanceof Uint8Array){for(var r=t.byteLength,e=[],i=0;i<r;i++)e[i>>>2]|=t[i]<<24-i%4*8;n.call(this,e,r)}else n.apply(this,arguments)};o.prototype=i}}(),function(r){function e(t,r,e){return t^r^e}function i(t,r,e){return t&r|~t&e}function n(t,r,e){return(t|~r)^e}function o(t,r,e){return t&e|r&~e}function s(t,r,e){return t^(r|~e)}function a(t,r){return t<<r|t>>>32-r}var c=t,h=c.lib,l=h.WordArray,f=h.Hasher,u=c.algo,d=l.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),v=l.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),p=l.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),_=l.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),y=l.create([0,1518500249,1859775393,2400959708,2840853838]),g=l.create([1352829926,1548603684,1836072691,2053994217,0]),B=u.RIPEMD160=f.extend({_doReset:function(){this._hash=l.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,r){for(var c=0;c<16;c++){var h=r+c,l=t[h];t[h]=16711935&(l<<8|l>>>24)|4278255360&(l<<24|l>>>8)}var f,u,B,w,k,S,m,x,b,H,z=this._hash.words,A=y.words,C=g.words,D=d.words,R=v.words,E=p.words,M=_.words;S=f=z[0],m=u=z[1],x=B=z[2],b=w=z[3],H=k=z[4];for(var F,c=0;c<80;c+=1)F=f+t[r+D[c]]|0,F+=c<16?e(u,B,w)+A[0]:c<32?i(u,B,w)+A[1]:c<48?n(u,B,w)+A[2]:c<64?o(u,B,w)+A[3]:s(u,B,w)+A[4],F|=0,F=a(F,E[c]),F=F+k|0,f=k,k=w,w=a(B,10),B=u,u=F,F=S+t[r+R[c]]|0,F+=c<16?s(m,x,b)+C[0]:c<32?o(m,x,b)+C[1]:c<48?n(m,x,b)+C[2]:c<64?i(m,x,b)+C[3]:e(m,x,b)+C[4],F|=0,F=a(F,M[c]),F=F+H|0,S=H,H=b,b=a(x,10),x=m,m=F;F=z[1]+B+b|0,z[1]=z[2]+w+H|0,z[2]=z[3]+k+S|0,z[3]=z[4]+f+m|0,z[4]=z[0]+u+x|0,z[0]=F},_doFinalize:function(){var t=this._data,r=t.words,e=8*this._nDataBytes,i=8*t.sigBytes;r[i>>>5]|=128<<24-i%32,r[(i+64>>>9<<4)+14]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),t.sigBytes=4*(r.length+1),this._process();for(var n=this._hash,o=n.words,s=0;s<5;s++){var a=o[s];o[s]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)}return n},clone:function(){var t=f.clone.call(this);return t._hash=this._hash.clone(),t}});c.RIPEMD160=f._createHelper(B),c.HmacRIPEMD160=f._createHmacHelper(B)}(Math),function(){var r=t,e=r.lib,i=e.Base,n=r.enc,o=n.Utf8,s=r.algo;s.HMAC=i.extend({init:function(t,r){t=this._hasher=new t.init,"string"==typeof r&&(r=o.parse(r));var e=t.blockSize,i=4*e;r.sigBytes>i&&(r=t.finalize(r)),r.clamp();for(var n=this._oKey=r.clone(),s=this._iKey=r.clone(),a=n.words,c=s.words,h=0;h<e;h++)a[h]^=1549556828,c[h]^=909522486;n.sigBytes=s.sigBytes=i,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var r=this._hasher,e=r.finalize(t);r.reset();var i=r.finalize(this._oKey.clone().concat(e));return i}})}(),function(){var r=t,e=r.lib,i=e.Base,n=e.WordArray,o=r.algo,s=o.SHA1,a=o.HMAC,c=o.PBKDF2=i.extend({cfg:i.extend({keySize:4,hasher:s,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,r){for(var e=this.cfg,i=a.create(e.hasher,t),o=n.create(),s=n.create([1]),c=o.words,h=s.words,l=e.keySize,f=e.iterations;c.length<l;){var u=i.update(r).finalize(s);i.reset();for(var d=u.words,v=d.length,p=u,_=1;_<f;_++){p=i.finalize(p),i.reset();for(var y=p.words,g=0;g<v;g++)d[g]^=y[g]}o.concat(u),h[0]++}return o.sigBytes=4*l,o}});r.PBKDF2=function(t,r,e){return c.create(e).compute(t,r)}}(),function(){var r=t,e=r.lib,i=e.Base,n=e.WordArray,o=r.algo,s=o.MD5,a=o.EvpKDF=i.extend({cfg:i.extend({keySize:4,hasher:s,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,r){for(var e=this.cfg,i=e.hasher.create(),o=n.create(),s=o.words,a=e.keySize,c=e.iterations;s.length<a;){h&&i.update(h);var h=i.update(t).finalize(r);i.reset();for(var l=1;l<c;l++)h=i.finalize(h),i.reset();o.concat(h)}return o.sigBytes=4*a,o}});r.EvpKDF=function(t,r,e){return a.create(e).compute(t,r)}}(),function(){var r=t,e=r.lib,i=e.WordArray,n=r.algo,o=n.SHA256,s=n.SHA224=o.extend({_doReset:function(){this._hash=new i.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var t=o._doFinalize.call(this);return t.sigBytes-=4,t}});r.SHA224=o._createHelper(s),r.HmacSHA224=o._createHmacHelper(s)}(),function(r){var e=t,i=e.lib,n=i.Base,o=i.WordArray,s=e.x64={};s.Word=n.extend({init:function(t,r){this.high=t,this.low=r}}),s.WordArray=n.extend({init:function(t,e){t=this.words=t||[],e!=r?this.sigBytes=e:this.sigBytes=8*t.length},toX32:function(){for(var t=this.words,r=t.length,e=[],i=0;i<r;i++){var n=t[i];e.push(n.high),e.push(n.low)}return o.create(e,this.sigBytes)},clone:function(){for(var t=n.clone.call(this),r=t.words=this.words.slice(0),e=r.length,i=0;i<e;i++)r[i]=r[i].clone();return t}})}(),function(r){var e=t,i=e.lib,n=i.WordArray,o=i.Hasher,s=e.x64,a=s.Word,c=e.algo,h=[],l=[],f=[];!function(){for(var t=1,r=0,e=0;e<24;e++){h[t+5*r]=(e+1)*(e+2)/2%64;var i=r%5,n=(2*t+3*r)%5;t=i,r=n}for(var t=0;t<5;t++)for(var r=0;r<5;r++)l[t+5*r]=r+(2*t+3*r)%5*5;for(var o=1,s=0;s<24;s++){for(var c=0,u=0,d=0;d<7;d++){if(1&o){var v=(1<<d)-1;v<32?u^=1<<v:c^=1<<v-32}128&o?o=o<<1^113:o<<=1}f[s]=a.create(c,u)}}();var u=[];!function(){for(var t=0;t<25;t++)u[t]=a.create()}();var d=c.SHA3=o.extend({cfg:o.cfg.extend({outputLength:512}),_doReset:function(){for(var t=this._state=[],r=0;r<25;r++)t[r]=new a.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(t,r){for(var e=this._state,i=this.blockSize/2,n=0;n<i;n++){var o=t[r+2*n],s=t[r+2*n+1];o=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),s=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8);var a=e[n];a.high^=s,a.low^=o}for(var c=0;c<24;c++){for(var d=0;d<5;d++){for(var v=0,p=0,_=0;_<5;_++){var a=e[d+5*_];v^=a.high,p^=a.low}var y=u[d];y.high=v,y.low=p}for(var d=0;d<5;d++)for(var g=u[(d+4)%5],B=u[(d+1)%5],w=B.high,k=B.low,v=g.high^(w<<1|k>>>31),p=g.low^(k<<1|w>>>31),_=0;_<5;_++){var a=e[d+5*_];a.high^=v,a.low^=p}for(var S=1;S<25;S++){var a=e[S],m=a.high,x=a.low,b=h[S];if(b<32)var v=m<<b|x>>>32-b,p=x<<b|m>>>32-b;else var v=x<<b-32|m>>>64-b,p=m<<b-32|x>>>64-b;var H=u[l[S]];H.high=v,H.low=p}var z=u[0],A=e[0];z.high=A.high,z.low=A.low;for(var d=0;d<5;d++)for(var _=0;_<5;_++){var S=d+5*_,a=e[S],C=u[S],D=u[(d+1)%5+5*_],R=u[(d+2)%5+5*_];a.high=C.high^~D.high&R.high,a.low=C.low^~D.low&R.low}var a=e[0],E=f[c];a.high^=E.high,a.low^=E.low}},_doFinalize:function(){var t=this._data,e=t.words,i=(8*this._nDataBytes,8*t.sigBytes),o=32*this.blockSize;e[i>>>5]|=1<<24-i%32,e[(r.ceil((i+1)/o)*o>>>5)-1]|=128,t.sigBytes=4*e.length,this._process();for(var s=this._state,a=this.cfg.outputLength/8,c=a/8,h=[],l=0;l<c;l++){var f=s[l],u=f.high,d=f.low;u=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8),d=16711935&(d<<8|d>>>24)|4278255360&(d<<24|d>>>8),h.push(d),h.push(u)}return new n.init(h,a)},clone:function(){for(var t=o.clone.call(this),r=t._state=this._state.slice(0),e=0;e<25;e++)r[e]=r[e].clone();return t}});e.SHA3=o._createHelper(d),e.HmacSHA3=o._createHmacHelper(d)}(Math),function(){function r(){return s.create.apply(s,arguments)}var e=t,i=e.lib,n=i.Hasher,o=e.x64,s=o.Word,a=o.WordArray,c=e.algo,h=[r(1116352408,3609767458),r(1899447441,602891725),r(3049323471,3964484399),r(3921009573,2173295548),r(961987163,4081628472),r(1508970993,3053834265),r(2453635748,2937671579),r(2870763221,3664609560),r(3624381080,2734883394),r(310598401,1164996542),r(607225278,1323610764),r(1426881987,3590304994),r(1925078388,4068182383),r(2162078206,991336113),r(2614888103,633803317),r(3248222580,3479774868),r(3835390401,2666613458),r(4022224774,944711139),r(264347078,2341262773),r(604807628,2007800933),r(770255983,1495990901),r(1249150122,1856431235),r(1555081692,3175218132),r(1996064986,2198950837),r(2554220882,3999719339),r(2821834349,766784016),r(2952996808,2566594879),r(3210313671,3203337956),r(3336571891,1034457026),r(3584528711,2466948901),r(113926993,3758326383),r(338241895,168717936),r(666307205,1188179964),r(773529912,1546045734),r(1294757372,1522805485),r(1396182291,2643833823),r(1695183700,2343527390),r(1986661051,1014477480),r(2177026350,1206759142),r(2456956037,344077627),r(2730485921,1290863460),r(2820302411,3158454273),r(3259730800,3505952657),r(3345764771,106217008),r(3516065817,3606008344),r(3600352804,1432725776),r(4094571909,1467031594),r(275423344,851169720),r(430227734,3100823752),r(506948616,1363258195),r(659060556,3750685593),r(883997877,3785050280),r(958139571,3318307427),r(1322822218,3812723403),r(1537002063,2003034995),r(1747873779,3602036899),r(1955562222,1575990012),r(2024104815,1125592928),r(2227730452,2716904306),r(2361852424,442776044),r(2428436474,593698344),r(2756734187,3733110249),r(3204031479,2999351573),r(3329325298,3815920427),r(3391569614,3928383900),r(3515267271,566280711),r(3940187606,3454069534),r(4118630271,4000239992),r(116418474,1914138554),r(174292421,2731055270),r(289380356,3203993006),r(460393269,320620315),r(685471733,587496836),r(852142971,1086792851),r(1017036298,365543100),r(1126000580,2618297676),r(1288033470,3409855158),r(1501505948,4234509866),r(1607167915,987167468),r(1816402316,1246189591)],l=[];!function(){for(var t=0;t<80;t++)l[t]=r()}();var f=c.SHA512=n.extend({_doReset:function(){this._hash=new a.init([new s.init(1779033703,4089235720),new s.init(3144134277,2227873595),new s.init(1013904242,4271175723),new s.init(2773480762,1595750129),new s.init(1359893119,2917565137),new s.init(2600822924,725511199),new s.init(528734635,4215389547),new s.init(1541459225,327033209)])},_doProcessBlock:function(t,r){for(var e=this._hash.words,i=e[0],n=e[1],o=e[2],s=e[3],a=e[4],c=e[5],f=e[6],u=e[7],d=i.high,v=i.low,p=n.high,_=n.low,y=o.high,g=o.low,B=s.high,w=s.low,k=a.high,S=a.low,m=c.high,x=c.low,b=f.high,H=f.low,z=u.high,A=u.low,C=d,D=v,R=p,E=_,M=y,F=g,P=B,W=w,O=k,U=S,I=m,K=x,X=b,L=H,j=z,N=A,T=0;T<80;T++){var Z=l[T];if(T<16)var q=Z.high=0|t[r+2*T],G=Z.low=0|t[r+2*T+1];else{var J=l[T-15],$=J.high,Q=J.low,V=($>>>1|Q<<31)^($>>>8|Q<<24)^$>>>7,Y=(Q>>>1|$<<31)^(Q>>>8|$<<24)^(Q>>>7|$<<25),tt=l[T-2],rt=tt.high,et=tt.low,it=(rt>>>19|et<<13)^(rt<<3|et>>>29)^rt>>>6,nt=(et>>>19|rt<<13)^(et<<3|rt>>>29)^(et>>>6|rt<<26),ot=l[T-7],st=ot.high,at=ot.low,ct=l[T-16],ht=ct.high,lt=ct.low,G=Y+at,q=V+st+(G>>>0<Y>>>0?1:0),G=G+nt,q=q+it+(G>>>0<nt>>>0?1:0),G=G+lt,q=q+ht+(G>>>0<lt>>>0?1:0);Z.high=q,Z.low=G}var ft=O&I^~O&X,ut=U&K^~U&L,dt=C&R^C&M^R&M,vt=D&E^D&F^E&F,pt=(C>>>28|D<<4)^(C<<30|D>>>2)^(C<<25|D>>>7),_t=(D>>>28|C<<4)^(D<<30|C>>>2)^(D<<25|C>>>7),yt=(O>>>14|U<<18)^(O>>>18|U<<14)^(O<<23|U>>>9),gt=(U>>>14|O<<18)^(U>>>18|O<<14)^(U<<23|O>>>9),Bt=h[T],wt=Bt.high,kt=Bt.low,St=N+gt,mt=j+yt+(St>>>0<N>>>0?1:0),St=St+ut,mt=mt+ft+(St>>>0<ut>>>0?1:0),St=St+kt,mt=mt+wt+(St>>>0<kt>>>0?1:0),St=St+G,mt=mt+q+(St>>>0<G>>>0?1:0),xt=_t+vt,bt=pt+dt+(xt>>>0<_t>>>0?1:0);j=X,N=L,X=I,L=K,I=O,K=U,U=W+St|0,O=P+mt+(U>>>0<W>>>0?1:0)|0,P=M,W=F,M=R,F=E,R=C,E=D,D=St+xt|0,C=mt+bt+(D>>>0<St>>>0?1:0)|0}v=i.low=v+D,i.high=d+C+(v>>>0<D>>>0?1:0),_=n.low=_+E,n.high=p+R+(_>>>0<E>>>0?1:0),g=o.low=g+F,o.high=y+M+(g>>>0<F>>>0?1:0),w=s.low=w+W,s.high=B+P+(w>>>0<W>>>0?1:0),S=a.low=S+U,a.high=k+O+(S>>>0<U>>>0?1:0),x=c.low=x+K,c.high=m+I+(x>>>0<K>>>0?1:0),H=f.low=H+L,f.high=b+X+(H>>>0<L>>>0?1:0),A=u.low=A+N,u.high=z+j+(A>>>0<N>>>0?1:0)},_doFinalize:function(){var t=this._data,r=t.words,e=8*this._nDataBytes,i=8*t.sigBytes;r[i>>>5]|=128<<24-i%32,r[(i+128>>>10<<5)+30]=Math.floor(e/4294967296),r[(i+128>>>10<<5)+31]=e,t.sigBytes=4*r.length,this._process();var n=this._hash.toX32();return n},clone:function(){var t=n.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:32});e.SHA512=n._createHelper(f),e.HmacSHA512=n._createHmacHelper(f)}(),function(){var r=t,e=r.x64,i=e.Word,n=e.WordArray,o=r.algo,s=o.SHA512,a=o.SHA384=s.extend({_doReset:function(){this._hash=new n.init([new i.init(3418070365,3238371032),new i.init(1654270250,914150663),new i.init(2438529370,812702999),new i.init(355462360,4144912697),new i.init(1731405415,4290775857),new i.init(2394180231,1750603025),new i.init(3675008525,1694076839),new i.init(1203062813,3204075428)])},_doFinalize:function(){var t=s._doFinalize.call(this);return t.sigBytes-=16,t}});r.SHA384=s._createHelper(a),r.HmacSHA384=s._createHmacHelper(a)}(),t.lib.Cipher||function(r){var e=t,i=e.lib,n=i.Base,o=i.WordArray,s=i.BufferedBlockAlgorithm,a=e.enc,c=(a.Utf8,a.Base64),h=e.algo,l=h.EvpKDF,f=i.Cipher=s.extend({cfg:n.extend(),createEncryptor:function(t,r){return this.create(this._ENC_XFORM_MODE,t,r)},createDecryptor:function(t,r){return this.create(this._DEC_XFORM_MODE,t,r)},init:function(t,r,e){this.cfg=this.cfg.extend(e),this._xformMode=t,this._key=r,this.reset()},reset:function(){s.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){t&&this._append(t);var r=this._doFinalize();return r},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?m:w}return function(r){return{encrypt:function(e,i,n){return t(i).encrypt(r,e,i,n)},decrypt:function(e,i,n){return t(i).decrypt(r,e,i,n)}}}}()}),u=(i.StreamCipher=f.extend({_doFinalize:function(){var t=this._process(!0);return t},blockSize:1}),e.mode={}),d=i.BlockCipherMode=n.extend({createEncryptor:function(t,r){return this.Encryptor.create(t,r)},createDecryptor:function(t,r){return this.Decryptor.create(t,r)},init:function(t,r){this._cipher=t,this._iv=r}}),v=u.CBC=function(){function t(t,e,i){var n=this._iv;if(n){var o=n;this._iv=r}else var o=this._prevBlock;for(var s=0;s<i;s++)t[e+s]^=o[s]}var e=d.extend();return e.Encryptor=e.extend({processBlock:function(r,e){var i=this._cipher,n=i.blockSize;t.call(this,r,e,n),i.encryptBlock(r,e),this._prevBlock=r.slice(e,e+n)}}),e.Decryptor=e.extend({processBlock:function(r,e){var i=this._cipher,n=i.blockSize,o=r.slice(e,e+n);i.decryptBlock(r,e),t.call(this,r,e,n),this._prevBlock=o}}),e}(),p=e.pad={},_=p.Pkcs7={pad:function(t,r){for(var e=4*r,i=e-t.sigBytes%e,n=i<<24|i<<16|i<<8|i,s=[],a=0;a<i;a+=4)s.push(n);var c=o.create(s,i);t.concat(c)},unpad:function(t){var r=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=r}},y=(i.BlockCipher=f.extend({cfg:f.cfg.extend({mode:v,padding:_}),reset:function(){f.reset.call(this);var t=this.cfg,r=t.iv,e=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var i=e.createEncryptor;else{var i=e.createDecryptor;this._minBufferSize=1}this._mode&&this._mode.__creator==i?this._mode.init(this,r&&r.words):(this._mode=i.call(e,this,r&&r.words),this._mode.__creator=i)},_doProcessBlock:function(t,r){this._mode.processBlock(t,r)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var r=this._process(!0)}else{var r=this._process(!0);t.unpad(r)}return r},blockSize:4}),i.CipherParams=n.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),g=e.format={},B=g.OpenSSL={stringify:function(t){var r=t.ciphertext,e=t.salt;if(e)var i=o.create([1398893684,1701076831]).concat(e).concat(r);else var i=r;return i.toString(c)},parse:function(t){var r=c.parse(t),e=r.words;if(1398893684==e[0]&&1701076831==e[1]){var i=o.create(e.slice(2,4));e.splice(0,4),r.sigBytes-=16}return y.create({ciphertext:r,salt:i})}},w=i.SerializableCipher=n.extend({cfg:n.extend({format:B}),encrypt:function(t,r,e,i){i=this.cfg.extend(i);var n=t.createEncryptor(e,i),o=n.finalize(r),s=n.cfg;return y.create({ciphertext:o,key:e,iv:s.iv,algorithm:t,mode:s.mode,padding:s.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,r,e,i){i=this.cfg.extend(i),r=this._parse(r,i.format);var n=t.createDecryptor(e,i).finalize(r.ciphertext);return n},_parse:function(t,r){return"string"==typeof t?r.parse(t,this):t}}),k=e.kdf={},S=k.OpenSSL={execute:function(t,r,e,i){i||(i=o.random(8));var n=l.create({keySize:r+e}).compute(t,i),s=o.create(n.words.slice(r),4*e);return n.sigBytes=4*r,y.create({key:n,iv:s,salt:i})}},m=i.PasswordBasedCipher=w.extend({cfg:w.cfg.extend({kdf:S}),encrypt:function(t,r,e,i){i=this.cfg.extend(i);var n=i.kdf.execute(e,t.keySize,t.ivSize);i.iv=n.iv;var o=w.encrypt.call(this,t,r,n.key,i);return o.mixIn(n),o},decrypt:function(t,r,e,i){i=this.cfg.extend(i),r=this._parse(r,i.format);var n=i.kdf.execute(e,t.keySize,t.ivSize,r.salt);i.iv=n.iv;var o=w.decrypt.call(this,t,r,n.key,i);return o}})}(),t.mode.CFB=function(){function r(t,r,e,i){var n=this._iv;if(n){var o=n.slice(0);this._iv=void 0}else var o=this._prevBlock;i.encryptBlock(o,0);for(var s=0;s<e;s++)t[r+s]^=o[s]}var e=t.lib.BlockCipherMode.extend();return e.Encryptor=e.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize;r.call(this,t,e,n,i),this._prevBlock=t.slice(e,e+n)}}),e.Decryptor=e.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize,o=t.slice(e,e+n);r.call(this,t,e,n,i),this._prevBlock=o}}),e}(),t.mode.ECB=function(){var r=t.lib.BlockCipherMode.extend();return r.Encryptor=r.extend({processBlock:function(t,r){this._cipher.encryptBlock(t,r)}}),r.Decryptor=r.extend({processBlock:function(t,r){this._cipher.decryptBlock(t,r)}}),r}(),t.pad.AnsiX923={pad:function(t,r){var e=t.sigBytes,i=4*r,n=i-e%i,o=e+n-1;t.clamp(),t.words[o>>>2]|=n<<24-o%4*8,t.sigBytes+=n},unpad:function(t){var r=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=r}},t.pad.Iso10126={pad:function(r,e){var i=4*e,n=i-r.sigBytes%i;r.concat(t.lib.WordArray.random(n-1)).concat(t.lib.WordArray.create([n<<24],1))},unpad:function(t){var r=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=r}},t.pad.Iso97971={pad:function(r,e){r.concat(t.lib.WordArray.create([2147483648],1)),t.pad.ZeroPadding.pad(r,e)},unpad:function(r){t.pad.ZeroPadding.unpad(r),r.sigBytes--}},t.mode.OFB=function(){var r=t.lib.BlockCipherMode.extend(),e=r.Encryptor=r.extend({processBlock:function(t,r){var e=this._cipher,i=e.blockSize,n=this._iv,o=this._keystream;n&&(o=this._keystream=n.slice(0),this._iv=void 0),e.encryptBlock(o,0);for(var s=0;s<i;s++)t[r+s]^=o[s]}});return r.Decryptor=e,r}(),t.pad.NoPadding={pad:function(){},unpad:function(){}},function(r){var e=t,i=e.lib,n=i.CipherParams,o=e.enc,s=o.Hex,a=e.format;a.Hex={stringify:function(t){return t.ciphertext.toString(s)},parse:function(t){var r=s.parse(t);return n.create({ciphertext:r})}}}(),function(){var r=t,e=r.lib,i=e.BlockCipher,n=r.algo,o=[],s=[],a=[],c=[],h=[],l=[],f=[],u=[],d=[],v=[];!function(){for(var t=[],r=0;r<256;r++)r<128?t[r]=r<<1:t[r]=r<<1^283;for(var e=0,i=0,r=0;r<256;r++){var n=i^i<<1^i<<2^i<<3^i<<4;n=n>>>8^255&n^99,o[e]=n,s[n]=e;var p=t[e],_=t[p],y=t[_],g=257*t[n]^16843008*n;a[e]=g<<24|g>>>8,c[e]=g<<16|g>>>16,h[e]=g<<8|g>>>24,l[e]=g;var g=16843009*y^65537*_^257*p^16843008*e;f[n]=g<<24|g>>>8,u[n]=g<<16|g>>>16,d[n]=g<<8|g>>>24,v[n]=g,e?(e=p^t[t[t[y^p]]],i^=t[t[i]]):e=i=1}}();var p=[0,1,2,4,8,16,32,64,128,27,54],_=n.AES=i.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,r=t.words,e=t.sigBytes/4,i=this._nRounds=e+6,n=4*(i+1),s=this._keySchedule=[],a=0;a<n;a++)if(a<e)s[a]=r[a];else{var c=s[a-1];a%e?e>6&&a%e==4&&(c=o[c>>>24]<<24|o[c>>>16&255]<<16|o[c>>>8&255]<<8|o[255&c]):(c=c<<8|c>>>24,c=o[c>>>24]<<24|o[c>>>16&255]<<16|o[c>>>8&255]<<8|o[255&c],c^=p[a/e|0]<<24),s[a]=s[a-e]^c}for(var h=this._invKeySchedule=[],l=0;l<n;l++){var a=n-l;if(l%4)var c=s[a];else var c=s[a-4];l<4||a<=4?h[l]=c:h[l]=f[o[c>>>24]]^u[o[c>>>16&255]]^d[o[c>>>8&255]]^v[o[255&c]]}}},encryptBlock:function(t,r){this._doCryptBlock(t,r,this._keySchedule,a,c,h,l,o)},decryptBlock:function(t,r){var e=t[r+1];t[r+1]=t[r+3],t[r+3]=e,this._doCryptBlock(t,r,this._invKeySchedule,f,u,d,v,s);var e=t[r+1];t[r+1]=t[r+3],t[r+3]=e},_doCryptBlock:function(t,r,e,i,n,o,s,a){for(var c=this._nRounds,h=t[r]^e[0],l=t[r+1]^e[1],f=t[r+2]^e[2],u=t[r+3]^e[3],d=4,v=1;v<c;v++){var p=i[h>>>24]^n[l>>>16&255]^o[f>>>8&255]^s[255&u]^e[d++],_=i[l>>>24]^n[f>>>16&255]^o[u>>>8&255]^s[255&h]^e[d++],y=i[f>>>24]^n[u>>>16&255]^o[h>>>8&255]^s[255&l]^e[d++],g=i[u>>>24]^n[h>>>16&255]^o[l>>>8&255]^s[255&f]^e[d++];h=p,l=_,f=y,u=g}var p=(a[h>>>24]<<24|a[l>>>16&255]<<16|a[f>>>8&255]<<8|a[255&u])^e[d++],_=(a[l>>>24]<<24|a[f>>>16&255]<<16|a[u>>>8&255]<<8|a[255&h])^e[d++],y=(a[f>>>24]<<24|a[u>>>16&255]<<16|a[h>>>8&255]<<8|a[255&l])^e[d++],g=(a[u>>>24]<<24|a[h>>>16&255]<<16|a[l>>>8&255]<<8|a[255&f])^e[d++];t[r]=p,t[r+1]=_,t[r+2]=y,t[r+3]=g},keySize:8});r.AES=i._createHelper(_)}(),function(){function r(t,r){var e=(this._lBlock>>>t^this._rBlock)&r;this._rBlock^=e,this._lBlock^=e<<t}function e(t,r){var e=(this._rBlock>>>t^this._lBlock)&r;this._lBlock^=e,this._rBlock^=e<<t;
}var i=t,n=i.lib,o=n.WordArray,s=n.BlockCipher,a=i.algo,c=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],h=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],l=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],f=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],u=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],d=a.DES=s.extend({_doReset:function(){for(var t=this._key,r=t.words,e=[],i=0;i<56;i++){var n=c[i]-1;e[i]=r[n>>>5]>>>31-n%32&1}for(var o=this._subKeys=[],s=0;s<16;s++){for(var a=o[s]=[],f=l[s],i=0;i<24;i++)a[i/6|0]|=e[(h[i]-1+f)%28]<<31-i%6,a[4+(i/6|0)]|=e[28+(h[i+24]-1+f)%28]<<31-i%6;a[0]=a[0]<<1|a[0]>>>31;for(var i=1;i<7;i++)a[i]=a[i]>>>4*(i-1)+3;a[7]=a[7]<<5|a[7]>>>27}for(var u=this._invSubKeys=[],i=0;i<16;i++)u[i]=o[15-i]},encryptBlock:function(t,r){this._doCryptBlock(t,r,this._subKeys)},decryptBlock:function(t,r){this._doCryptBlock(t,r,this._invSubKeys)},_doCryptBlock:function(t,i,n){this._lBlock=t[i],this._rBlock=t[i+1],r.call(this,4,252645135),r.call(this,16,65535),e.call(this,2,858993459),e.call(this,8,16711935),r.call(this,1,1431655765);for(var o=0;o<16;o++){for(var s=n[o],a=this._lBlock,c=this._rBlock,h=0,l=0;l<8;l++)h|=f[l][((c^s[l])&u[l])>>>0];this._lBlock=c,this._rBlock=a^h}var d=this._lBlock;this._lBlock=this._rBlock,this._rBlock=d,r.call(this,1,1431655765),e.call(this,8,16711935),e.call(this,2,858993459),r.call(this,16,65535),r.call(this,4,252645135),t[i]=this._lBlock,t[i+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});i.DES=s._createHelper(d);var v=a.TripleDES=s.extend({_doReset:function(){var t=this._key,r=t.words;this._des1=d.createEncryptor(o.create(r.slice(0,2))),this._des2=d.createEncryptor(o.create(r.slice(2,4))),this._des3=d.createEncryptor(o.create(r.slice(4,6)))},encryptBlock:function(t,r){this._des1.encryptBlock(t,r),this._des2.decryptBlock(t,r),this._des3.encryptBlock(t,r)},decryptBlock:function(t,r){this._des3.decryptBlock(t,r),this._des2.encryptBlock(t,r),this._des1.decryptBlock(t,r)},keySize:6,ivSize:2,blockSize:2});i.TripleDES=s._createHelper(v)}(),function(){function r(){for(var t=this._S,r=this._i,e=this._j,i=0,n=0;n<4;n++){r=(r+1)%256,e=(e+t[r])%256;var o=t[r];t[r]=t[e],t[e]=o,i|=t[(t[r]+t[e])%256]<<24-8*n}return this._i=r,this._j=e,i}var e=t,i=e.lib,n=i.StreamCipher,o=e.algo,s=o.RC4=n.extend({_doReset:function(){for(var t=this._key,r=t.words,e=t.sigBytes,i=this._S=[],n=0;n<256;n++)i[n]=n;for(var n=0,o=0;n<256;n++){var s=n%e,a=r[s>>>2]>>>24-s%4*8&255;o=(o+i[n]+a)%256;var c=i[n];i[n]=i[o],i[o]=c}this._i=this._j=0},_doProcessBlock:function(t,e){t[e]^=r.call(this)},keySize:8,ivSize:0});e.RC4=n._createHelper(s);var a=o.RC4Drop=s.extend({cfg:s.cfg.extend({drop:192}),_doReset:function(){s._doReset.call(this);for(var t=this.cfg.drop;t>0;t--)r.call(this)}});e.RC4Drop=n._createHelper(a)}(),t.mode.CTRGladman=function(){function r(t){if(255===(t>>24&255)){var r=t>>16&255,e=t>>8&255,i=255&t;255===r?(r=0,255===e?(e=0,255===i?i=0:++i):++e):++r,t=0,t+=r<<16,t+=e<<8,t+=i}else t+=1<<24;return t}function e(t){return 0===(t[0]=r(t[0]))&&(t[1]=r(t[1])),t}var i=t.lib.BlockCipherMode.extend(),n=i.Encryptor=i.extend({processBlock:function(t,r){var i=this._cipher,n=i.blockSize,o=this._iv,s=this._counter;o&&(s=this._counter=o.slice(0),this._iv=void 0),e(s);var a=s.slice(0);i.encryptBlock(a,0);for(var c=0;c<n;c++)t[r+c]^=a[c]}});return i.Decryptor=n,i}(),function(){function r(){for(var t=this._X,r=this._C,e=0;e<8;e++)a[e]=r[e];r[0]=r[0]+1295307597+this._b|0,r[1]=r[1]+3545052371+(r[0]>>>0<a[0]>>>0?1:0)|0,r[2]=r[2]+886263092+(r[1]>>>0<a[1]>>>0?1:0)|0,r[3]=r[3]+1295307597+(r[2]>>>0<a[2]>>>0?1:0)|0,r[4]=r[4]+3545052371+(r[3]>>>0<a[3]>>>0?1:0)|0,r[5]=r[5]+886263092+(r[4]>>>0<a[4]>>>0?1:0)|0,r[6]=r[6]+1295307597+(r[5]>>>0<a[5]>>>0?1:0)|0,r[7]=r[7]+3545052371+(r[6]>>>0<a[6]>>>0?1:0)|0,this._b=r[7]>>>0<a[7]>>>0?1:0;for(var e=0;e<8;e++){var i=t[e]+r[e],n=65535&i,o=i>>>16,s=((n*n>>>17)+n*o>>>15)+o*o,h=((4294901760&i)*i|0)+((65535&i)*i|0);c[e]=s^h}t[0]=c[0]+(c[7]<<16|c[7]>>>16)+(c[6]<<16|c[6]>>>16)|0,t[1]=c[1]+(c[0]<<8|c[0]>>>24)+c[7]|0,t[2]=c[2]+(c[1]<<16|c[1]>>>16)+(c[0]<<16|c[0]>>>16)|0,t[3]=c[3]+(c[2]<<8|c[2]>>>24)+c[1]|0,t[4]=c[4]+(c[3]<<16|c[3]>>>16)+(c[2]<<16|c[2]>>>16)|0,t[5]=c[5]+(c[4]<<8|c[4]>>>24)+c[3]|0,t[6]=c[6]+(c[5]<<16|c[5]>>>16)+(c[4]<<16|c[4]>>>16)|0,t[7]=c[7]+(c[6]<<8|c[6]>>>24)+c[5]|0}var e=t,i=e.lib,n=i.StreamCipher,o=e.algo,s=[],a=[],c=[],h=o.Rabbit=n.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,i=0;i<4;i++)t[i]=16711935&(t[i]<<8|t[i]>>>24)|4278255360&(t[i]<<24|t[i]>>>8);var n=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],o=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]];this._b=0;for(var i=0;i<4;i++)r.call(this);for(var i=0;i<8;i++)o[i]^=n[i+4&7];if(e){var s=e.words,a=s[0],c=s[1],h=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8),l=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),f=h>>>16|4294901760&l,u=l<<16|65535&h;o[0]^=h,o[1]^=f,o[2]^=l,o[3]^=u,o[4]^=h,o[5]^=f,o[6]^=l,o[7]^=u;for(var i=0;i<4;i++)r.call(this)}},_doProcessBlock:function(t,e){var i=this._X;r.call(this),s[0]=i[0]^i[5]>>>16^i[3]<<16,s[1]=i[2]^i[7]>>>16^i[5]<<16,s[2]=i[4]^i[1]>>>16^i[7]<<16,s[3]=i[6]^i[3]>>>16^i[1]<<16;for(var n=0;n<4;n++)s[n]=16711935&(s[n]<<8|s[n]>>>24)|4278255360&(s[n]<<24|s[n]>>>8),t[e+n]^=s[n]},blockSize:4,ivSize:2});e.Rabbit=n._createHelper(h)}(),t.mode.CTR=function(){var r=t.lib.BlockCipherMode.extend(),e=r.Encryptor=r.extend({processBlock:function(t,r){var e=this._cipher,i=e.blockSize,n=this._iv,o=this._counter;n&&(o=this._counter=n.slice(0),this._iv=void 0);var s=o.slice(0);e.encryptBlock(s,0),o[i-1]=o[i-1]+1|0;for(var a=0;a<i;a++)t[r+a]^=s[a]}});return r.Decryptor=e,r}(),function(){function r(){for(var t=this._X,r=this._C,e=0;e<8;e++)a[e]=r[e];r[0]=r[0]+1295307597+this._b|0,r[1]=r[1]+3545052371+(r[0]>>>0<a[0]>>>0?1:0)|0,r[2]=r[2]+886263092+(r[1]>>>0<a[1]>>>0?1:0)|0,r[3]=r[3]+1295307597+(r[2]>>>0<a[2]>>>0?1:0)|0,r[4]=r[4]+3545052371+(r[3]>>>0<a[3]>>>0?1:0)|0,r[5]=r[5]+886263092+(r[4]>>>0<a[4]>>>0?1:0)|0,r[6]=r[6]+1295307597+(r[5]>>>0<a[5]>>>0?1:0)|0,r[7]=r[7]+3545052371+(r[6]>>>0<a[6]>>>0?1:0)|0,this._b=r[7]>>>0<a[7]>>>0?1:0;for(var e=0;e<8;e++){var i=t[e]+r[e],n=65535&i,o=i>>>16,s=((n*n>>>17)+n*o>>>15)+o*o,h=((4294901760&i)*i|0)+((65535&i)*i|0);c[e]=s^h}t[0]=c[0]+(c[7]<<16|c[7]>>>16)+(c[6]<<16|c[6]>>>16)|0,t[1]=c[1]+(c[0]<<8|c[0]>>>24)+c[7]|0,t[2]=c[2]+(c[1]<<16|c[1]>>>16)+(c[0]<<16|c[0]>>>16)|0,t[3]=c[3]+(c[2]<<8|c[2]>>>24)+c[1]|0,t[4]=c[4]+(c[3]<<16|c[3]>>>16)+(c[2]<<16|c[2]>>>16)|0,t[5]=c[5]+(c[4]<<8|c[4]>>>24)+c[3]|0,t[6]=c[6]+(c[5]<<16|c[5]>>>16)+(c[4]<<16|c[4]>>>16)|0,t[7]=c[7]+(c[6]<<8|c[6]>>>24)+c[5]|0}var e=t,i=e.lib,n=i.StreamCipher,o=e.algo,s=[],a=[],c=[],h=o.RabbitLegacy=n.extend({_doReset:function(){var t=this._key.words,e=this.cfg.iv,i=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],n=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]];this._b=0;for(var o=0;o<4;o++)r.call(this);for(var o=0;o<8;o++)n[o]^=i[o+4&7];if(e){var s=e.words,a=s[0],c=s[1],h=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8),l=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),f=h>>>16|4294901760&l,u=l<<16|65535&h;n[0]^=h,n[1]^=f,n[2]^=l,n[3]^=u,n[4]^=h,n[5]^=f,n[6]^=l,n[7]^=u;for(var o=0;o<4;o++)r.call(this)}},_doProcessBlock:function(t,e){var i=this._X;r.call(this),s[0]=i[0]^i[5]>>>16^i[3]<<16,s[1]=i[2]^i[7]>>>16^i[5]<<16,s[2]=i[4]^i[1]>>>16^i[7]<<16,s[3]=i[6]^i[3]>>>16^i[1]<<16;for(var n=0;n<4;n++)s[n]=16711935&(s[n]<<8|s[n]>>>24)|4278255360&(s[n]<<24|s[n]>>>8),t[e+n]^=s[n]},blockSize:4,ivSize:2});e.RabbitLegacy=n._createHelper(h)}(),t.pad.ZeroPadding={pad:function(t,r){var e=4*r;t.clamp(),t.sigBytes+=e-(t.sigBytes%e||e)},unpad:function(t){for(var r=t.words,e=t.sigBytes-1;!(r[e>>>2]>>>24-e%4*8&255);)e--;t.sigBytes=e+1}},t});

/* rrweb.encrypt */
var rrwebEncrypt = {
    encrypt : function(mode, data, key) {
        if (mode == 'des') {
            let ckey = window.CryptoJS.enc.Utf8.parse(key)
            let encrypted = window.CryptoJS.DES.encrypt(data, ckey, {
                mode: window.CryptoJS.mode.ECB,
                padding: window.CryptoJS.pad.Pkcs7
            })
            return encrypted.toString()
        } else {
            console.log('rrwebEncrypt.encrypt() : Unknown mode');
            return false;
        }
    },
    decrypt : function(mode, data, key) {
        if (mode == 'des') {
            let ckey = CryptoJS.enc.Utf8.parse(key)
            let decrypt = CryptoJS.DES.decrypt(data, ckey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            })
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
            return decryptedStr.toString()
        } else {
            console.log('rrwebEncrypt.decrypt() : Unknown mode');
            return false;
        }
    }
};

/* rrwebsdk-modules : Polyfill  */
(function(){
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
})();

/* rrwebsdk-modules : core  */
var rrweb = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && o.constructor == Set) o = Array.from(o);
        if (o && o.constructor == Object) o = Array.from(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["Document"] = 0] = "Document";
        NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
        NodeType[NodeType["Element"] = 2] = "Element";
        NodeType[NodeType["Text"] = 3] = "Text";
        NodeType[NodeType["CDATA"] = 4] = "CDATA";
        NodeType[NodeType["Comment"] = 5] = "Comment";
    })(NodeType || (NodeType = {}));

    var _id = 1;
    var symbolAndNumberRegex = RegExp('[^a-z1-6-]');
    function genId() {
        return _id++;
    }
    function getValidTagName(tagName) {
        var processedTagName = tagName.toLowerCase().trim();
        if (symbolAndNumberRegex.test(processedTagName)) {
            return 'div';
        }
        return processedTagName;
    }
    function getCssRulesString(s) {
        try {
            var rules = s.rules || s.cssRules;
            return rules
                ? Array.from(rules).reduce(function (prev, cur) { return prev + getCssRuleString(cur); }, '')
                : null;
        }
        catch (error) {
            return null;
        }
    }
    function getCssRuleString(rule) {
        return isCSSImportRule(rule)
            ? getCssRulesString(rule.styleSheet) || ''
            : rule.cssText;
    }
    function isCSSImportRule(rule) {
        return 'styleSheet' in rule;
    }
    function extractOrigin(url) {
        var origin;
        if (url.indexOf('//') > -1) {
            origin = url.split('/').slice(0, 3).join('/');
        }
        else {
            origin = url.split('/')[0];
        }
        origin = origin.split('?')[0];
        return origin;
    }
    var URL_IN_CSS_REF = /url\((?:'([^']*)'|"([^"]*)"|([^)]*))\)/gm;
    var RELATIVE_PATH = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;
    var DATA_URI = /^(data:)([\w\/\+\-]+);(charset=[\w-]+|base64).*,(.*)/i;
    function absoluteToStylesheet(cssText, href) {
        return (cssText || '').replace(URL_IN_CSS_REF, function (origin, path1, path2, path3) {
            var filePath = path1 || path2 || path3;
            if (!filePath) {
                return origin;
            }
            if (!RELATIVE_PATH.test(filePath)) {
                return "url('" + filePath + "')";
            }
            if (DATA_URI.test(filePath)) {
                return "url(" + filePath + ")";
            }
            if (filePath[0] === '/') {
                return "url('" + (extractOrigin(href) + filePath) + "')";
            }
            var stack = href.split('/');
            var parts = filePath.split('/');
            stack.pop();
            for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                var part = parts_1[_i];
                if (part === '.') {
                    continue;
                }
                else if (part === '..') {
                    stack.pop();
                }
                else {
                    stack.push(part);
                }
            }
            return "url('" + stack.join('/') + "')";
        });
    }
    function getAbsoluteSrcsetString(doc, attributeValue) {
        if (attributeValue.trim() === '') {
            return attributeValue;
        }
        var srcsetValues = attributeValue.split(',');
        var resultingSrcsetString = srcsetValues
            .map(function (srcItem) {
            var trimmedSrcItem = srcItem.trimLeft().trimRight();
            var urlAndSize = trimmedSrcItem.split(' ');
            if (urlAndSize.length === 2) {
                var absUrl = absoluteToDoc(doc, urlAndSize[0]);
                return absUrl + " " + urlAndSize[1];
            }
            else if (urlAndSize.length === 1) {
                var absUrl = absoluteToDoc(doc, urlAndSize[0]);
                return "" + absUrl;
            }
            return '';
        })
            .join(',');
        return resultingSrcsetString;
    }
    function absoluteToDoc(doc, attributeValue) {
        if (!attributeValue || attributeValue.trim() === '') {
            return attributeValue;
        }
        var a = doc.createElement('a');
        a.href = attributeValue;
        return a.href;
    }
    function isSVGElement(el) {
        return el.tagName === 'svg' || el instanceof SVGElement;
    }
    function transformAttribute(doc, name, value) {
        if (name === 'src' || (name === 'href' && value)) {
            return absoluteToDoc(doc, value);
        }
        else if (name === 'srcset' && value) {
            return getAbsoluteSrcsetString(doc, value);
        }
        else if (name === 'style' && value) {
            return absoluteToStylesheet(value, location.href);
        }
        else {
            return value;
        }
    }
    function serializeNode(n, doc, blockClass, inlineStylesheet, maskInputOptions) {
        if (maskInputOptions === void 0) { maskInputOptions = {}; }
        switch (n.nodeType) {
            case n.DOCUMENT_NODE:
                return {
                    type: NodeType.Document,
                    childNodes: []
                };
            case n.DOCUMENT_TYPE_NODE:
                return {
                    type: NodeType.DocumentType,
                    name: n.name,
                    publicId: n.publicId,
                    systemId: n.systemId
                };
            case n.ELEMENT_NODE:
                var needBlock_1 = false;
                if (typeof blockClass === 'string') {
                    needBlock_1 = n.classList.contains(blockClass);
                }
                else {
                    n.classList.forEach(function (className) {
                        if (blockClass.test(className)) {
                            needBlock_1 = true;
                        }
                    });
                }
                var tagName = getValidTagName(n.tagName);
                var attributes_1 = {};
                for (var _i = 0, _a = Array.from(n.attributes); _i < _a.length; _i++) {
                    var _b = _a[_i], name = _b.name, value = _b.value;
                    attributes_1[name] = transformAttribute(doc, name, value);
                }
                if (tagName === 'link' && inlineStylesheet) {
                    var stylesheet = Array.from(doc.styleSheets).find(function (s) {
                        return s.href === n.href;
                    });
                    var cssText = getCssRulesString(stylesheet);
                    if (cssText) {
                        delete attributes_1.rel;
                        delete attributes_1.href;
                        attributes_1._cssText = absoluteToStylesheet(cssText, stylesheet.href);
                    }
                }
                if (tagName === 'style' &&
                    n.sheet &&
                    !(n.innerText ||
                        n.textContent ||
                        '').trim().length) {
                    var cssText = getCssRulesString(n.sheet);
                    if (cssText) {
                        attributes_1._cssText = absoluteToStylesheet(cssText, location.href);
                    }
                }
                if (tagName === 'input' ||
                    tagName === 'textarea' ||
                    tagName === 'select') {
                    var value = n.value;
                    if (attributes_1.type !== 'radio' &&
                        attributes_1.type !== 'checkbox' &&
                        attributes_1.type !== 'submit' &&
                        attributes_1.type !== 'button' &&
                        value) {
                        attributes_1.value =
                            maskInputOptions[attributes_1.type] ||
                                maskInputOptions[tagName]
                                ? '*'.repeat(value.length)
                                : value;
                    }
                    else if (n.checked) {
                        attributes_1.checked = n.checked;
                    }
                }
                if (tagName === 'option') {
                    var selectValue = n.parentElement;
                    if (attributes_1.value === selectValue.value) {
                        attributes_1.selected = n.selected;
                    }
                }
                if (tagName === 'canvas') {
                    attributes_1.rr_dataURL = n.toDataURL();
                }
                if (tagName === 'audio' || tagName === 'video') {
                    attributes_1.rr_mediaState = n.paused
                        ? 'paused'
                        : 'played';
                }
                if (needBlock_1) {
                    var _c = n.getBoundingClientRect(), width = _c.width, height = _c.height;
                    attributes_1.rr_width = width + "px";
                    attributes_1.rr_height = height + "px";
                }
                return {
                    type: NodeType.Element,
                    tagName: tagName,
                    attributes: attributes_1,
                    childNodes: [],
                    isSVG: isSVGElement(n) || undefined,
                    needBlock: needBlock_1
                };
            case n.TEXT_NODE:
                var parentTagName = n.parentNode && n.parentNode.tagName;
                var textContent = n.textContent;
                var isStyle = parentTagName === 'STYLE' ? true : undefined;
                if (isStyle && textContent) {
                    textContent = absoluteToStylesheet(textContent, location.href);
                }
                if (parentTagName === 'SCRIPT') {
                    textContent = 'SCRIPT_PLACEHOLDER';
                }
                return {
                    type: NodeType.Text,
                    textContent: textContent || '',
                    isStyle: isStyle
                };
            case n.CDATA_SECTION_NODE:
                return {
                    type: NodeType.CDATA,
                    textContent: ''
                };
            case n.COMMENT_NODE:
                return {
                    type: NodeType.Comment,
                    textContent: n.textContent || ''
                };
            default:
                return false;
        }
    }
    function serializeNodeWithId(n, doc, map, blockClass, skipChild, inlineStylesheet, maskInputOptions) {
        if (skipChild === void 0) { skipChild = false; }
        if (inlineStylesheet === void 0) { inlineStylesheet = true; }
        var _serializedNode = serializeNode(n, doc, blockClass, inlineStylesheet, maskInputOptions);
        if (!_serializedNode) {
            console.warn(n, 'not serialized');
            return null;
        }
        var id;
        if ('__sn' in n) {
            id = n.__sn.id;
        }
        else {
            id = genId();
        }
        var serializedNode = Object.assign(_serializedNode, { id: id });
        n.__sn = serializedNode;
        map[id] = n;
        var recordChild = !skipChild;
        if (serializedNode.type === NodeType.Element) {
            recordChild = recordChild && !serializedNode.needBlock;
            delete serializedNode.needBlock;
        }
        if ((serializedNode.type === NodeType.Document ||
            serializedNode.type === NodeType.Element) &&
            recordChild) {
            for (var _i = 0, _a = Array.from(n.childNodes); _i < _a.length; _i++) {
                var childN = _a[_i];
                var serializedChildNode = serializeNodeWithId(childN, doc, map, blockClass, skipChild, inlineStylesheet, maskInputOptions);
                if (serializedChildNode) {
                    serializedNode.childNodes.push(serializedChildNode);
                }
            }
        }
        if (serializedNode.tagName == 'canvas') {
            if (window.MediaRecorder) {
                var _mr = new MediaRecorder(n.captureStream(60), { mimeType: 'video/webm;codecs=vp9' });
                _mr.ondataavailable= function(e) {
                    wrappedEmit({
                        type: 3,
                        data: {
                            source: 0,
                            texts: [],
                            attributes: [
                                {
                                    id: serializedNode.id,
                                    attributes: {
                                        rr_dataURL: n.toDataURL('image/png',0.1)
                                    }
                                }
                            ],
                            removes: [],
                            adds: []
                        },
                        timestamp: new Date().getTime()
                    })
                }
                _mr.start(300);
            } else {
                var _cs = document.querySelector('#'+serializedNode.attributes.id);
                _cs.ww_time = 0;
                _cs.ww_frame = n.toDataURL('image/png',0.1);
                _cs.addEventListener('mousemove', function(e) {
                    this.ww_time--;
                    if (this.ww_time < 0) {
                        this.ww_time = 15;
                        var frame = n.toDataURL('image/png',0.1);
                        if (this.ww_frame != frame) {
                            this.ww_frame = frame;
                            wrappedEmit({
                                type: 3,
                                data: {
                                    source: 0,
                                    texts: [],
                                    attributes: [
                                        {
                                            id: serializedNode.id,
                                            attributes: {
                                                rr_dataURL: frame
                                            }
                                        }
                                    ],
                                    removes: [],
                                    adds: []
                                },
                                timestamp: new Date().getTime()
                            })
                        }
                    }
                })
            }
        }
        return serializedNode;
    }
    function snapshot(n, blockClass, inlineStylesheet, maskAllInputsOrOptions) {
        if (blockClass === void 0) { blockClass = 'rr-block'; }
        if (inlineStylesheet === void 0) { inlineStylesheet = true; }
        var idNodeMap = {};/*  */
        var maskInputOptions = maskAllInputsOrOptions === true
            ? {
                color: true,
                date: true,
                'datetime-local': true,
                email: true,
                month: true,
                number: true,
                range: true,
                search: true,
                tel: true,
                text: true,
                time: true,
                url: true,
                week: true
            }
            : maskAllInputsOrOptions === false
                ? {}
                : maskAllInputsOrOptions;
        return [
            serializeNodeWithId(n, n, idNodeMap, blockClass, false, inlineStylesheet, maskInputOptions),
            idNodeMap,
        ];
    }

    var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
    function parse(css, options) {
        if (options === void 0) { options = {}; }
        var lineno = 1;
        var column = 1;
        function updatePosition(str) {
            var lines = str.match(/\n/g);
            if (lines) {
                lineno += lines.length;
            }
            var i = str.lastIndexOf('\n');
            column = i === -1 ? column + str.length : str.length - i;
        }
        function position() {
            var start = { line: lineno, column: column };
            return function (node) {
                node.position = new Position(start);
                whitespace();
                return node;
            };
        }
        var Position = (function () {
            function Position(start) {
                this.start = start;
                this.end = { line: lineno, column: column };
                this.source = options.source;
            }
            return Position;
        }());
        Position.prototype.content = css;
        var errorsList = [];
        function error(msg) {
            var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
            err.reason = msg;
            err.filename = options.source;
            err.line = lineno;
            err.column = column;
            err.source = css;
            if (options.silent) {
                errorsList.push(err);
            }
            else {
                throw err;
            }
        }
        function stylesheet() {
            var rulesList = rules();
            return {
                type: 'stylesheet',
                stylesheet: {
                    source: options.source,
                    rules: rulesList,
                    parsingErrors: errorsList
                }
            };
        }
        function open() {
            return match(/^{\s*/);
        }
        function close() {
            return match(/^}/);
        }
        function rules() {
            var node;
            var rules = [];
            whitespace();
            comments(rules);
            while (css.length && css.charAt(0) !== '}' && (node = atrule() || rule())) {
                if (node !== false) {
                    rules.push(node);
                    comments(rules);
                }
            }
            return rules;
        }
        function match(re) {
            var m = re.exec(css);
            if (!m) {
                return;
            }
            var str = m[0];
            updatePosition(str);
            css = css.slice(str.length);
            return m;
        }
        function whitespace() {
            match(/^\s*/);
        }
        function comments(rules) {
            if (rules === void 0) { rules = []; }
            var c;
            while ((c = comment())) {
                if (c !== false) {
                    rules.push(c);
                }
                c = comment();
            }
            return rules;
        }
        function comment() {
            var pos = position();
            if ('/' !== css.charAt(0) || '*' !== css.charAt(1)) {
                return;
            }
            var i = 2;
            while ('' !== css.charAt(i) &&
                ('*' !== css.charAt(i) || '/' !== css.charAt(i + 1))) {
                ++i;
            }
            i += 2;
            if ('' === css.charAt(i - 1)) {
                return error('End of comment missing');
            }
            var str = css.slice(2, i - 2);
            column += 2;
            updatePosition(str);
            css = css.slice(i);
            column += 2;
            return pos({
                type: 'comment',
                comment: str
            });
        }
        function selector() {
            var m = match(/^([^{]+)/);
            if (!m) {
                return;
            }
            return trim(m[0])
                .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
                .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
                return m.replace(/,/g, '\u200C');
            })
                .split(/\s*(?![^(]*\)),\s*/)
                .map(function (s) {
                return s.replace(/\u200C/g, ',');
            });
        }
        function declaration() {
            var pos = position();
            var propMatch = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
            if (!propMatch) {
                return;
            }
            var prop = trim(propMatch[0]);
            if (!match(/^:\s*/)) {
                return error("property missing ':'");
            }
            var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
            var ret = pos({
                type: 'declaration',
                property: prop.replace(commentre, ''),
                value: val ? trim(val[0]).replace(commentre, '') : ''
            });
            match(/^[;\s]*/);
            return ret;
        }
        function declarations() {
            var decls = [];
            if (!open()) {
                return error("missing '{'");
            }
            comments(decls);
            var decl;
            while ((decl = declaration())) {
                if (decl !== false) {
                    decls.push(decl);
                    comments(decls);
                }
                decl = declaration();
            }
            if (!close()) {
                return error("missing '}'");
            }
            return decls;
        }
        function keyframe() {
            var m;
            var vals = [];
            var pos = position();
            while ((m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/))) {
                vals.push(m[1]);
                match(/^,\s*/);
            }
            if (!vals.length) {
                return;
            }
            return pos({
                type: 'keyframe',
                values: vals,
                declarations: declarations()
            });
        }
        function atkeyframes() {
            var pos = position();
            var m = match(/^@([-\w]+)?keyframes\s*/);
            if (!m) {
                return;
            }
            var vendor = m[1];
            m = match(/^([-\w]+)\s*/);
            if (!m) {
                return error('@keyframes missing name');
            }
            var name = m[1];
            if (!open()) {
                return error("@keyframes missing '{'");
            }
            var frame;
            var frames = comments();
            while ((frame = keyframe())) {
                frames.push(frame);
                frames = frames.concat(comments());
            }
            if (!close()) {
                return error("@keyframes missing '}'");
            }
            return pos({
                type: 'keyframes',
                name: name,
                vendor: vendor,
                keyframes: frames
            });
        }
        function atsupports() {
            var pos = position();
            var m = match(/^@supports *([^{]+)/);
            if (!m) {
                return;
            }
            var supports = trim(m[1]);
            if (!open()) {
                return error("@supports missing '{'");
            }
            var style = comments().concat(rules());
            if (!close()) {
                return error("@supports missing '}'");
            }
            return pos({
                type: 'supports',
                supports: supports,
                rules: style
            });
        }
        function athost() {
            var pos = position();
            var m = match(/^@host\s*/);
            if (!m) {
                return;
            }
            if (!open()) {
                return error("@host missing '{'");
            }
            var style = comments().concat(rules());
            if (!close()) {
                return error("@host missing '}'");
            }
            return pos({
                type: 'host',
                rules: style
            });
        }
        function atmedia() {
            var pos = position();
            var m = match(/^@media *([^{]+)/);
            if (!m) {
                return;
            }
            var media = trim(m[1]);
            if (!open()) {
                return error("@media missing '{'");
            }
            var style = comments().concat(rules());
            if (!close()) {
                return error("@media missing '}'");
            }
            return pos({
                type: 'media',
                media: media,
                rules: style
            });
        }
        function atcustommedia() {
            var pos = position();
            var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (!m) {
                return;
            }
            return pos({
                type: 'custom-media',
                name: trim(m[1]),
                media: trim(m[2])
            });
        }
        function atpage() {
            var pos = position();
            var m = match(/^@page */);
            if (!m) {
                return;
            }
            var sel = selector() || [];
            if (!open()) {
                return error("@page missing '{'");
            }
            var decls = comments();
            var decl;
            while ((decl = declaration())) {
                decls.push(decl);
                decls = decls.concat(comments());
            }
            if (!close()) {
                return error("@page missing '}'");
            }
            return pos({
                type: 'page',
                selectors: sel,
                declarations: decls
            });
        }
        function atdocument() {
            var pos = position();
            var m = match(/^@([-\w]+)?document *([^{]+)/);
            if (!m) {
                return;
            }
            var vendor = trim(m[1]);
            var doc = trim(m[2]);
            if (!open()) {
                return error("@document missing '{'");
            }
            var style = comments().concat(rules());
            if (!close()) {
                return error("@document missing '}'");
            }
            return pos({
                type: 'document',
                document: doc,
                vendor: vendor,
                rules: style
            });
        }
        function atfontface() {
            var pos = position();
            var m = match(/^@font-face\s*/);
            if (!m) {
                return;
            }
            if (!open()) {
                return error("@font-face missing '{'");
            }
            var decls = comments();
            var decl;
            while ((decl = declaration())) {
                decls.push(decl);
                decls = decls.concat(comments());
            }
            if (!close()) {
                return error("@font-face missing '}'");
            }
            return pos({
                type: 'font-face',
                declarations: decls
            });
        }
        var atimport = _compileAtrule('import');
        var atcharset = _compileAtrule('charset');
        var atnamespace = _compileAtrule('namespace');
        function _compileAtrule(name) {
            var re = new RegExp('^@' + name + '\\s*([^;]+);');
            return function () {
                var pos = position();
                var m = match(re);
                if (!m) {
                    return;
                }
                var ret = { type: name };
                ret[name] = m[1].trim();
                return pos(ret);
            };
        }
        function atrule() {
            if (css[0] !== '@') {
                return;
            }
            return (atkeyframes() ||
                atmedia() ||
                atcustommedia() ||
                atsupports() ||
                atimport() ||
                atcharset() ||
                atnamespace() ||
                atdocument() ||
                atpage() ||
                athost() ||
                atfontface());
        }
        function rule() {
            var pos = position();
            var sel = selector();
            if (!sel) {
                return error('selector missing');
            }
            comments();
            return pos({
                type: 'rule',
                selectors: sel,
                declarations: declarations()
            });
        }
        return addParent(stylesheet());
    }
    function trim(str) {
        return str ? str.replace(/^\s+|\s+$/g, '') : '';
    }
    function addParent(obj, parent) {
        var isNode = obj && typeof obj.type === 'string';
        var childParent = isNode ? obj : parent;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var k = _a[_i];
            var value = obj[k];
            if (Array.isArray(value)) {
                value.forEach(function (v) {
                    addParent(v, childParent);
                });
            }
            else if (value && typeof value === 'object') {
                addParent(value, childParent);
            }
        }
        if (isNode) {
            Object.defineProperty(obj, 'parent', {
                configurable: true,
                writable: true,
                enumerable: false,
                value: parent || null
            });
        }
        return obj;
    }

    var tagMap = {
        script: 'noscript',
        altglyph: 'altGlyph',
        altglyphdef: 'altGlyphDef',
        altglyphitem: 'altGlyphItem',
        animatecolor: 'animateColor',
        animatemotion: 'animateMotion',
        animatetransform: 'animateTransform',
        clippath: 'clipPath',
        feblend: 'feBlend',
        fecolormatrix: 'feColorMatrix',
        fecomponenttransfer: 'feComponentTransfer',
        fecomposite: 'feComposite',
        feconvolvematrix: 'feConvolveMatrix',
        fediffuselighting: 'feDiffuseLighting',
        fedisplacementmap: 'feDisplacementMap',
        fedistantlight: 'feDistantLight',
        fedropshadow: 'feDropShadow',
        feflood: 'feFlood',
        fefunca: 'feFuncA',
        fefuncb: 'feFuncB',
        fefuncg: 'feFuncG',
        fefuncr: 'feFuncR',
        fegaussianblur: 'feGaussianBlur',
        feimage: 'feImage',
        femerge: 'feMerge',
        femergenode: 'feMergeNode',
        femorphology: 'feMorphology',
        feoffset: 'feOffset',
        fepointlight: 'fePointLight',
        fespecularlighting: 'feSpecularLighting',
        fespotlight: 'feSpotLight',
        fetile: 'feTile',
        feturbulence: 'feTurbulence',
        foreignobject: 'foreignObject',
        glyphref: 'glyphRef',
        lineargradient: 'linearGradient',
        radialgradient: 'radialGradient'
    };
    function getTagName(n) {
        var tagName = tagMap[n.tagName] ? tagMap[n.tagName] : n.tagName;
        if (tagName === 'link' && n.attributes._cssText) {
            tagName = 'style';
        }
        return tagName;
    }
    var HOVER_SELECTOR = /([^\\]):hover/g;
    function addHoverClass(cssText) {
        var ast = parse(cssText, { silent: true });
        if (!ast.stylesheet) {
            return cssText;
        }
        ast.stylesheet.rules.forEach(function (rule) {
            if ('selectors' in rule) {
                (rule.selectors || []).forEach(function (selector) {
                    if (HOVER_SELECTOR.test(selector)) {
                        var newSelector = selector.replace(HOVER_SELECTOR, '$1.\\:hover');
                        cssText = cssText.replace(selector, selector + ", " + newSelector);
                    }
                });
            }
        });
        return cssText;
    }
    function buildNode(n, doc, HACK_CSS) {
        //console.log('333',n);
        switch (n.type) {
            case NodeType.Document:
                return doc.implementation.createDocument(null, '', null);
            case NodeType.DocumentType:
                return doc.implementation.createDocumentType(n.name, n.publicId, n.systemId);
            case NodeType.Element:
                var tagName = getTagName(n);
                var node_1;
                if (n.isSVG) {
                    node_1 = doc.createElementNS('http://www.w3.org/2000/svg', tagName);
                }
                else {
                    node_1 = doc.createElement(tagName);
                }
                var _loop_1 = function (name) {
                    if (!n.attributes.hasOwnProperty(name)) {
                        return "continue";
                    }
                    var value = n.attributes[name];
                    value = typeof value === 'boolean' ? '' : value;
                    if (!name.startsWith('rr_')) {
                        var isTextarea = tagName === 'textarea' && name === 'value';
                        var isRemoteOrDynamicCss = tagName === 'style' && name === '_cssText';
                        if (isRemoteOrDynamicCss && HACK_CSS) {
                            value = addHoverClass(value);
                        }
                        if (isTextarea || isRemoteOrDynamicCss) {
                            var child = doc.createTextNode(value);
                            for (var _i = 0, _a = Array.from(node_1.childNodes); _i < _a.length; _i++) {
                                var c = _a[_i];
                                if (c.nodeType === node_1.TEXT_NODE) {
                                    node_1.removeChild(c);
                                }
                            }
                            node_1.appendChild(child);
                            return "continue";
                        }
                        if (tagName === 'iframe' && name === 'src') {
                            return "continue";
                        }
                        try {
                            if (n.isSVG && name === 'xlink:href') {
                                node_1.setAttributeNS('http://www.w3.org/1999/xlink', name, value);
                            }
                            else if (name == 'onload' || name == 'onclick' || name.substring(0, 7) == 'onmouse') {
                                node_1.setAttribute('_' + name, value);
                            }
                            else {
                                node_1.setAttribute(name, value);
                            }
                        }
                        catch (error) {
                        }
                    }
                    else {
                        if (tagName === 'canvas' && name === 'rr_dataURL') {
                            var image_1 = document.createElement('img');
                            image_1.src = value;
                            image_1.onload = function () {
                                var ctx = node_1.getContext('2d');
                                if (ctx) {
                                    ctx.drawImage(image_1, 0, 0, image_1.width, image_1.height);
                                }
                            };
                        }
                        if (name === 'rr_width') {
                            node_1.style.width = value;
                        }
                        if (name === 'rr_height') {
                            node_1.style.height = value;
                        }
                        if (name === 'rr_mediaState') {
                            switch (value) {
                                case 'played':
                                    node_1.play();
                                case 'paused':
                                    node_1.pause();
                                    break;
                            }
                        }
                    }
                };
                for (var name in n.attributes) {
                    _loop_1(name);
                }
                return node_1;
            case NodeType.Text:
                return doc.createTextNode(n.isStyle && HACK_CSS ? addHoverClass(n.textContent) : n.textContent);
            case NodeType.CDATA:
                return doc.createCDATASection(n.textContent);
            case NodeType.Comment:
                return doc.createComment(n.textContent);
            default:
                return null;
        }
    }
    function buildNodeWithSN(n, doc, map, skipChild, HACK_CSS) {
        if (skipChild === void 0) { skipChild = false; }
        if (HACK_CSS === void 0) { HACK_CSS = true; }
        var node = buildNode(n, doc, HACK_CSS);
        if (!node) {
            return null;
        }
        if (n.type === NodeType.Document) {
            doc.close();
            doc.open();
            node = doc;
        }
        node.__sn = n;
        map[n.id] = node;
        if ((n.type === NodeType.Document || n.type === NodeType.Element) &&
            !skipChild) {
            for (var _i = 0, _a = n.childNodes; _i < _a.length; _i++) {
                var childN = _a[_i];
                var childNode = buildNodeWithSN(childN, doc, map, false, HACK_CSS);
                if (!childNode) {
                    console.warn('Failed to rebuild', childN);
                }
                else {
                    node.appendChild(childNode);
                }
            }
        }
        return node;
    }
    function rebuild(n, doc, HACK_CSS) {
        if (HACK_CSS === void 0) { HACK_CSS = true; }
        var idNodeMap = {};
        return [buildNodeWithSN(n, doc, idNodeMap, false, HACK_CSS), idNodeMap];
    }

    (function (EventType) {
        EventType[EventType["DomContentLoaded"] = 0] = "DomContentLoaded";
        EventType[EventType["Load"] = 1] = "Load";
        EventType[EventType["FullSnapshot"] = 2] = "FullSnapshot";
        EventType[EventType["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
        EventType[EventType["Meta"] = 4] = "Meta";
        EventType[EventType["Custom"] = 5] = "Custom";
    })(exports.EventType || (exports.EventType = {}));
    (function (IncrementalSource) {
        IncrementalSource[IncrementalSource["Mutation"] = 0] = "Mutation";
        IncrementalSource[IncrementalSource["MouseMove"] = 1] = "MouseMove";
        IncrementalSource[IncrementalSource["MouseInteraction"] = 2] = "MouseInteraction";
        IncrementalSource[IncrementalSource["Scroll"] = 3] = "Scroll";
        IncrementalSource[IncrementalSource["ViewportResize"] = 4] = "ViewportResize";
        IncrementalSource[IncrementalSource["Input"] = 5] = "Input";
        IncrementalSource[IncrementalSource["TouchMove"] = 6] = "TouchMove";
        IncrementalSource[IncrementalSource["MediaInteraction"] = 7] = "MediaInteraction";
        IncrementalSource[IncrementalSource["StyleSheetRule"] = 8] = "StyleSheetRule";
    })(exports.IncrementalSource || (exports.IncrementalSource = {}));
    (function (MouseInteractions) {
        MouseInteractions[MouseInteractions["MouseUp"] = 0] = "MouseUp";
        MouseInteractions[MouseInteractions["MouseDown"] = 1] = "MouseDown";
        MouseInteractions[MouseInteractions["Click"] = 2] = "Click";
        MouseInteractions[MouseInteractions["ContextMenu"] = 3] = "ContextMenu";
        MouseInteractions[MouseInteractions["DblClick"] = 4] = "DblClick";
        MouseInteractions[MouseInteractions["Focus"] = 5] = "Focus";
        MouseInteractions[MouseInteractions["Blur"] = 6] = "Blur";
        MouseInteractions[MouseInteractions["TouchStart"] = 7] = "TouchStart";
        MouseInteractions[MouseInteractions["TouchMove_Departed"] = 8] = "TouchMove_Departed";
        MouseInteractions[MouseInteractions["TouchEnd"] = 9] = "TouchEnd";
    })(exports.MouseInteractions || (exports.MouseInteractions = {}));
    var MediaInteractions;
    (function (MediaInteractions) {
        MediaInteractions[MediaInteractions["Play"] = 0] = "Play";
        MediaInteractions[MediaInteractions["Pause"] = 1] = "Pause";
    })(MediaInteractions || (MediaInteractions = {}));
    (function (ReplayerEvents) {
        ReplayerEvents["Start"] = "start";
        ReplayerEvents["Pause"] = "pause";
        ReplayerEvents["Resume"] = "resume";
        ReplayerEvents["Resize"] = "resize";
        ReplayerEvents["Finish"] = "finish";
        ReplayerEvents["FullsnapshotRebuilded"] = "fullsnapshot-rebuilded";
        ReplayerEvents["LoadStylesheetStart"] = "load-stylesheet-start";
        ReplayerEvents["LoadStylesheetEnd"] = "load-stylesheet-end";
        ReplayerEvents["SkipStart"] = "skip-start";
        ReplayerEvents["SkipEnd"] = "skip-end";
        ReplayerEvents["MouseInteraction"] = "mouse-interaction";
        ReplayerEvents["EventCast"] = "event-cast";
        ReplayerEvents["CustomEvent"] = "custom-event";
        ReplayerEvents["Flush"] = "flush";
    })(exports.ReplayerEvents || (exports.ReplayerEvents = {}));

    function on(type, fn, target) {
        if (target === void 0) { target = document; }
        var options = { capture: true, passive: true };
        target.addEventListener(type, fn, options);
        return function () { return target.removeEventListener(type, fn, options); };
    }
    var mirror = {
        map: {},
        getId: function (n) {
            if (!n.__sn) {
                return -1;
            }
            return n.__sn.id;
        },
        getNode: function (id) {
            return mirror.map[id] || null;
        },
        removeNodeFromMap: function (n) {
            var id = n.__sn && n.__sn.id;
            delete mirror.map[id];
            if (n.childNodes) {
                n.childNodes.forEach(function (child) {
                    return mirror.removeNodeFromMap(child);
                });
            }
        },
        has: function (id) {
            return mirror.map.hasOwnProperty(id);
        },
    };
    function throttle(func, wait, options) {
        if (options === void 0) { options = {}; }
        var timeout = null;
        var previous = 0;
        return function (arg) {
            var now = Date.now();
            if (!previous && options.leading === false) {
                previous = now;
            }
            var remaining = wait - (now - previous);
            var context = this;
            var args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    window.clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(context, args);
            }
            else if (!timeout && options.trailing !== false) {
                timeout = window.setTimeout(function () {
                    previous = options.leading === false ? 0 : Date.now();
                    timeout = null;
                    func.apply(context, args);
                }, remaining);
            }
        };
    }
    function hookSetter(target, key, d, isRevoked, win) {
        if (win === void 0) { win = window; }
        var original = win.Object.getOwnPropertyDescriptor(target, key);
        win.Object.defineProperty(target, key, isRevoked
            ? d
            : {
                set: function (value) {
                    var _this = this;
                    setTimeout(function () {
                        d.set.call(_this, value);
                    }, 0);
                    if (original && original.set) {
                        original.set.call(this, value);
                    }
                },
            });
        return function () { return hookSetter(target, key, original || {}, true); };
    }
    function patch(source, name, replacement) {
        if (!(name in source)) {
            return function () { };
        }
        var original = source[name];
        var wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            try {
                wrapped.prototype = wrapped.prototype || {};
                Object.defineProperties(wrapped, {
                    __rrweb_original__: {
                        enumerable: false,
                        value: original,
                    },
                });
            }
            catch (_a) {
            }
        }
        source[name] = wrapped;
        return function () {
            source[name] = original;
        };
    }
    function getWindowHeight() {
        return (window.innerHeight ||
            (document.documentElement && document.documentElement.clientHeight) ||
            (document.body && document.body.clientHeight));
    }
    function getWindowWidth() {
        return (window.innerWidth ||
            (document.documentElement && document.documentElement.clientWidth) ||
            (document.body && document.body.clientWidth));
    }
    function isBlocked(node, blockClass) {
        if (!node) {
            return false;
        }
        if (node.nodeType === node.ELEMENT_NODE) {
            var needBlock_1 = false;
            if (typeof blockClass === 'string') {
                needBlock_1 = node.classList.contains(blockClass);
            }
            else {
                node.classList.forEach(function (className) {
                    if (blockClass.test(className)) {
                        needBlock_1 = true;
                    }
                });
            }
            return needBlock_1 || isBlocked(node.parentNode, blockClass);
        }
        if (node.nodeType === node.TEXT_NODE) {
            return isBlocked(node.parentNode, blockClass);
        }
        return isBlocked(node.parentNode, blockClass);
    }
    function isAncestorRemoved(target) {
        var id = mirror.getId(target);
        if (!mirror.has(id)) {
            return true;
        }
        if (target.parentNode &&
            target.parentNode.nodeType === target.DOCUMENT_NODE) {
            return false;
        }
        if (!target.parentNode) {
            return true;
        }
        return isAncestorRemoved(target.parentNode);
    }
    function isTouchEvent(event) {
        return Boolean(event.changedTouches);
    }
    function polyfill() {
        if ('NodeList' in window && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = Array.prototype
                .forEach;
        }
    }
    function needCastInSyncMode(event) {
        switch (event.type) {
            case exports.EventType.DomContentLoaded:
            case exports.EventType.Load:
            case exports.EventType.Custom:
                return false;
            case exports.EventType.FullSnapshot:
            case exports.EventType.Meta:
                return true;
        }
        switch (event.data.source) {
            case exports.IncrementalSource.MouseMove:
            case exports.IncrementalSource.MouseInteraction:
            case exports.IncrementalSource.TouchMove:
            case exports.IncrementalSource.MediaInteraction:
                return false;
            case exports.IncrementalSource.ViewportResize:
            case exports.IncrementalSource.StyleSheetRule:
            case exports.IncrementalSource.Scroll:
            case exports.IncrementalSource.Input:
                return true;
        }
        return true;
    }
    var TreeIndex = (function () {
        function TreeIndex() {
            this.reset();
        }
        TreeIndex.prototype.add = function (mutation) {
            var parentTreeNode = this.indexes.get(mutation.parentId);
            var treeNode = {
                id: mutation.node.id,
                mutation: mutation,
                children: [],
                texts: [],
                attributes: [],
            };
            if (!parentTreeNode) {
                this.tree[treeNode.id] = treeNode;
            }
            else {
                treeNode.parent = parentTreeNode;
                parentTreeNode.children[treeNode.id] = treeNode;
            }
            this.indexes.set(treeNode.id, treeNode);
        };
        TreeIndex.prototype.remove = function (mutation) {
            var _this = this;
            var parentTreeNode = this.indexes.get(mutation.parentId);
            var treeNode = this.indexes.get(mutation.id);
            var deepRemoveFromMirror = function (id) {
                _this.removeIdSet.add(id);
                var node = mirror.getNode(id);
                node === null || node === void 0 ? void 0 : node.childNodes.forEach(function (childNode) {
                    return deepRemoveFromMirror(childNode.__sn.id);
                });
            };
            var deepRemoveFromTreeIndex = function (node) {
                _this.removeIdSet.add(node.id);
                Object.values(node.children).forEach(function (n) { return deepRemoveFromTreeIndex(n); });
                var _treeNode = _this.indexes.get(node.id);
                if (_treeNode) {
                    var _parentTreeNode = _treeNode.parent;
                    if (_parentTreeNode) {
                        delete _treeNode.parent;
                        delete _parentTreeNode.children[_treeNode.id];
                        _this.indexes.delete(mutation.id);
                    }
                }
            };
            if (!treeNode) {
                this.removeNodeMutations.push(mutation);
                deepRemoveFromMirror(mutation.id);
            }
            else if (!parentTreeNode) {
                delete this.tree[treeNode.id];
                this.indexes.delete(treeNode.id);
                deepRemoveFromTreeIndex(treeNode);
            }
            else {
                delete treeNode.parent;
                delete parentTreeNode.children[treeNode.id];
                this.indexes.delete(mutation.id);
                deepRemoveFromTreeIndex(treeNode);
            }
        };
        TreeIndex.prototype.text = function (mutation) {
            var treeNode = this.indexes.get(mutation.id);
            if (treeNode) {
                treeNode.texts.push(mutation);
            }
            else {
                this.textMutations.push(mutation);
            }
        };
        TreeIndex.prototype.attribute = function (mutation) {
            var treeNode = this.indexes.get(mutation.id);
            if (treeNode) {
                treeNode.attributes.push(mutation);
            }
            else {
                this.attributeMutations.push(mutation);
            }
        };
        TreeIndex.prototype.scroll = function (d) {
            this.scrollMap.set(d.id, d);
        };
        TreeIndex.prototype.input = function (d) {
            this.inputMap.set(d.id, d);
        };
        TreeIndex.prototype.flush = function () {
            var e_1, _a, e_2, _b;
            var _this = this;
            var _c = this, tree = _c.tree, removeNodeMutations = _c.removeNodeMutations, textMutations = _c.textMutations, attributeMutations = _c.attributeMutations;
            var batchMutationData = {
                source: exports.IncrementalSource.Mutation,
                removes: removeNodeMutations,
                texts: textMutations,
                attributes: attributeMutations,
                adds: [],
            };
            var walk = function (treeNode, removed) {
                if (removed) {
                    _this.removeIdSet.add(treeNode.id);
                }
                batchMutationData.texts = batchMutationData.texts
                    .concat(removed ? [] : treeNode.texts)
                    .filter(function (m) { return !_this.removeIdSet.has(m.id); });
                batchMutationData.attributes = batchMutationData.attributes
                    .concat(removed ? [] : treeNode.attributes)
                    .filter(function (m) { return !_this.removeIdSet.has(m.id); });
                if (!_this.removeIdSet.has(treeNode.id) &&
                    !_this.removeIdSet.has(treeNode.mutation.parentId) &&
                    !removed) {
                    batchMutationData.adds.push(treeNode.mutation);
                    if (treeNode.children) {
                        Object.values(treeNode.children).forEach(function (n) { return walk(n, false); });
                    }
                }
                else {
                    Object.values(treeNode.children).forEach(function (n) { return walk(n, true); });
                }
            };
            Object.values(tree).forEach(function (n) { return walk(n, false); });
            try {
                for (var _d = __values(this.scrollMap.keys()), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var id = _e.value;
                    if (this.removeIdSet.has(id)) {
                        this.scrollMap.delete(id);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _f = __values(this.inputMap.keys()), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var id = _g.value;
                    if (this.removeIdSet.has(id)) {
                        this.inputMap.delete(id);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var scrollMap = new Map(this.scrollMap);
            var inputMap = new Map(this.inputMap);
            this.reset();
            return {
                mutationData: batchMutationData,
                scrollMap: scrollMap,
                inputMap: inputMap,
            };
        };
        TreeIndex.prototype.reset = function () {
            this.tree = [];
            this.indexes = new Map();
            this.removeNodeMutations = [];
            this.textMutations = [];
            this.attributeMutations = [];
            this.removeIdSet = new Set();
            this.scrollMap = new Map();
            this.inputMap = new Map();
        };
        return TreeIndex;
    }());

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        on: on,
        mirror: mirror,
        throttle: throttle,
        hookSetter: hookSetter,
        patch: patch,
        getWindowHeight: getWindowHeight,
        getWindowWidth: getWindowWidth,
        isBlocked: isBlocked,
        isAncestorRemoved: isAncestorRemoved,
        isTouchEvent: isTouchEvent,
        polyfill: polyfill,
        needCastInSyncMode: needCastInSyncMode,
        TreeIndex: TreeIndex
    });

    var moveKey = function (id, parentId) { return id + "@" + parentId; };
    function isINode(n) {
        return '__sn' in n;
    }
    var MutationBuffer = (function () {
        function MutationBuffer(cb, blockClass, inlineStylesheet, maskInputOptions) {
            var _this = this;
            this.texts = [];
            this.attributes = [];
            this.removes = [];
            this.adds = [];
            this.movedMap = {};
            this.addedSet = new Set();
            this.movedSet = new Set();
            this.droppedSet = new Set();
            this.processMutations = function (mutations) {
                var e_1, _a, e_2, _b;
                mutations.forEach(_this.processMutation);
                var addQueue = [];
                var pushAdd = function (n) {
                    if (!n.parentNode) {
                        return;
                    }
                    var parentId = mirror.getId(n.parentNode);
                    var nextId = n.nextSibling && mirror.getId(n.nextSibling);
                    if (parentId === -1 || nextId === -1) {
                        return addQueue.push(n);
                    }
                    _this.adds.push({
                        parentId: parentId,
                        nextId: nextId,
                        node: serializeNodeWithId(n, document, mirror.map, _this.blockClass, true, _this.inlineStylesheet, _this.maskInputOptions),
                    });
                };
                try {
                    for (var _c = __values(_this.movedSet), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var n = _d.value;
                        pushAdd(n);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _e = __values(_this.addedSet), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var n = _f.value;
                        if (!isAncestorInSet(_this.droppedSet, n) &&
                            !isParentRemoved(_this.removes, n)) {
                            pushAdd(n);
                        }
                        else if (isAncestorInSet(_this.movedSet, n)) {
                            pushAdd(n);
                        }
                        else {
                            _this.droppedSet.add(n);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                while (addQueue.length) {
                    if (addQueue.every(function (n) { return mirror.getId(n.parentNode) === -1; })) {
                        break;
                    }
                    pushAdd(addQueue.shift());
                }
                _this.emit();
            };
            this.emit = function () {
                var payload = {
                    texts: _this.texts
                        .map(function (text) { return ({
                        id: mirror.getId(text.node),
                        value: text.value,
                    }); })
                        .filter(function (text) { return mirror.has(text.id); }),
                    attributes: _this.attributes
                        .map(function (attribute) { return ({
                        id: mirror.getId(attribute.node),
                        attributes: attribute.attributes,
                    }); })
                        .filter(function (attribute) { return mirror.has(attribute.id); }),
                    removes: _this.removes,
                    adds: _this.adds,
                };
                if (!payload.texts.length &&
                    !payload.attributes.length &&
                    !payload.removes.length &&
                    !payload.adds.length) {
                    return;
                }
                _this.emissionCallback(payload);
                _this.texts = [];
                _this.attributes = [];
                _this.removes = [];
                _this.adds = [];
                _this.addedSet = new Set();
                _this.movedSet = new Set();
                _this.droppedSet = new Set();
                _this.movedMap = {};
            };
            this.processMutation = function (m) {
                switch (m.type) {
                    case 'characterData': {
                        var value = m.target.textContent;
                        if (!isBlocked(m.target, _this.blockClass) && value !== m.oldValue) {
                            _this.texts.push({
                                value: value,
                                node: m.target,
                            });
                        }
                        break;
                    }
                    case 'attributes': {
                        var value = m.target.getAttribute(m.attributeName);
                        if (isBlocked(m.target, _this.blockClass) || value === m.oldValue) {
                            return;
                        }
                        var item = _this.attributes.find(function (a) { return a.node === m.target; });
                        if (!item) {
                            item = {
                                node: m.target,
                                attributes: {},
                            };
                            _this.attributes.push(item);
                        }
                        item.attributes[m.attributeName] = transformAttribute(document, m.attributeName, value);
                        break;
                    }
                    case 'childList': {
                        m.addedNodes.forEach(function (n) { return _this.genAdds(n, m.target); });
                        m.removedNodes.forEach(function (n) {
                            var nodeId = mirror.getId(n);
                            var parentId = mirror.getId(m.target);
                            if (isBlocked(n, _this.blockClass) ||
                                isBlocked(m.target, _this.blockClass)) {
                                return;
                            }
                            if (_this.addedSet.has(n)) {
                                deepDelete(_this.addedSet, n);
                                _this.droppedSet.add(n);
                            }
                            else if (_this.addedSet.has(m.target) && nodeId === -1) ;
                            else if (isAncestorRemoved(m.target)) ;
                            else if (_this.movedSet.has(n) &&
                                _this.movedMap[moveKey(nodeId, parentId)]) {
                                deepDelete(_this.movedSet, n);
                            }
                            else {
                                _this.removes.push({
                                    parentId: parentId,
                                    id: nodeId,
                                });
                            }
                            mirror.removeNodeFromMap(n);
                        });
                        break;
                    }
                }
            };
            this.genAdds = function (n, target) {
                if (isBlocked(n, _this.blockClass)) {
                    return;
                }
                if (isINode(n)) {
                    _this.movedSet.add(n);
                    var targetId = null;
                    if (target && isINode(target)) {
                        targetId = target.__sn.id;
                    }
                    if (targetId) {
                        _this.movedMap[moveKey(n.__sn.id, targetId)] = true;
                    }
                }
                else {
                    _this.addedSet.add(n);
                    _this.droppedSet.delete(n);
                }
                n.childNodes.forEach(function (childN) { return _this.genAdds(childN); });
            };
            this.blockClass = blockClass;
            this.inlineStylesheet = inlineStylesheet;
            this.maskInputOptions = maskInputOptions;
            this.emissionCallback = cb;
        }
        return MutationBuffer;
    }());
    function deepDelete(addsSet, n) {
        addsSet.delete(n);
        n.childNodes.forEach(function (childN) { return deepDelete(addsSet, childN); });
    }
    function isParentRemoved(removes, n) {
        var parentNode = n.parentNode;
        if (!parentNode) {
            return false;
        }
        var parentId = mirror.getId(parentNode);
        if (removes.some(function (r) { return r.id === parentId; })) {
            return true;
        }
        return isParentRemoved(removes, parentNode);
    }
    function isAncestorInSet(set, n) {
        var parentNode = n.parentNode;
        if (!parentNode) {
            return false;
        }
        if (set.has(parentNode)) {
            return true;
        }
        return isAncestorInSet(set, parentNode);
    }

    function initMutationObserver(cb, blockClass, inlineStylesheet, maskInputOptions) {
        var mutationBuffer = new MutationBuffer(cb, blockClass, inlineStylesheet, maskInputOptions);
        var observer = new MutationObserver(mutationBuffer.processMutations);
        observer.observe(document, {
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true,
        });
        return observer;
    }
    function initMoveObserver(cb, sampling) {
        if (sampling.mousemove === false) {
            return function () { };
        }
        var threshold = typeof sampling.mousemove === 'number' ? sampling.mousemove : 50;
        var positions = [];
        var timeBaseline;
        var wrappedCb = throttle(function (isTouch) {
            var totalOffset = Date.now() - timeBaseline;
            cb(positions.map(function (p) {
                p.timeOffset -= totalOffset;
                return p;
            }), isTouch ? exports.IncrementalSource.TouchMove : exports.IncrementalSource.MouseMove);
            positions = [];
            timeBaseline = null;
        }, 500);
        var updatePosition = throttle(function (evt) {
            var target = evt.target;
            var _a = isTouchEvent(evt)
                ? evt.changedTouches[0]
                : evt, clientX = _a.clientX, clientY = _a.clientY;
            if (!timeBaseline) {
                timeBaseline = Date.now();
            }
            positions.push({
                x: clientX,
                y: clientY,
                id: mirror.getId(target),
                timeOffset: Date.now() - timeBaseline,
            });
            wrappedCb(isTouchEvent(evt));
        }, threshold, {
            trailing: false,
        });
        var handlers = [
            on('mousemove', updatePosition),
            on('touchmove', updatePosition),
        ];
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function initMouseInteractionObserver(cb, blockClass, sampling) {
        if (sampling.mouseInteraction === false) {
            return function () { };
        }
        var disableMap = sampling.mouseInteraction === true || sampling.mouseInteraction === undefined
            ? {}
            : sampling.mouseInteraction;
        var handlers = [];
        var getHandler = function (eventKey) {
            return function (event) {
                if (isBlocked(event.target, blockClass)) {
                    return;
                }
                var id = mirror.getId(event.target);
                var _a = isTouchEvent(event) ? event.changedTouches[0] : event, clientX = _a.clientX, clientY = _a.clientY;
                cb({ type: exports.MouseInteractions[eventKey], id: id, x: clientX, y: clientY });
            };
        };
        Object
            .keys(exports.MouseInteractions)
            .filter(function (key) {
            return Number.isNaN(Number(key)) &&
                !key.endsWith('_Departed') &&
                disableMap[key] !== false;
        })
            .forEach(function (eventKey) {
            var eventName = eventKey.toLowerCase();
            var handler = getHandler(eventKey);
            handlers.push(on(eventName, handler));
        });
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function initScrollObserver(cb, blockClass, sampling) {
        var updatePosition = throttle(function (evt) {
            if (!evt.target || isBlocked(evt.target, blockClass)) {
                return;
            }
            var id = mirror.getId(evt.target);
            if (evt.target === document) {
                var scrollEl = (document.scrollingElement || document.documentElement);
                cb({ id: id, x: scrollEl.scrollLeft, y: scrollEl.scrollTop });
            }
            else {
                cb({ id: id, x: evt.target.scrollLeft, y: evt.target.scrollTop });
            }
        }, sampling.scroll || 100);
        return on('scroll', updatePosition);
    }
    function initViewportResizeObserver(cb) {
        var updateDimension = throttle(function () {
            var height = getWindowHeight();
            var width = getWindowWidth();
            cb({ width: Number(width), height: Number(height) });
        }, 200);
        return on('resize', updateDimension, window);
    }
    var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
    var lastInputValueMap = new WeakMap();
    function initInputObserver(cb, blockClass, ignoreClass, maskInputOptions, sampling) {
        function eventHandler(event) {
            var target = event.target;
            if (!target ||
                !target.tagName ||
                INPUT_TAGS.indexOf(target.tagName) < 0 ||
                isBlocked(target, blockClass))
                return;
            var type = target.type;
            if (type === 'password' ||
                target.classList.contains(ignoreClass))
                return;
            var text = target.value;
            var isChecked = false;
            if (type === 'radio' || type === 'checkbox') {
                isChecked = target.checked;
            }
            else if (maskInputOptions[target.tagName.toLowerCase()] || maskInputOptions[type]) {
                text = '*'.repeat(text.length);
            }
            cbWithDedup(target, { text: text, isChecked: isChecked });
            var name = target.name;
            if (type === 'radio' && name && isChecked) {
                document
                    .querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]")
                    .forEach(function (el) {
                    if (el !== target) {
                        cbWithDedup(el, {
                            text: el.value,
                            isChecked: !isChecked,
                        });
                    }
                });
            }
        }
        function cbWithDedup(target, v) {
            var lastInputValue = lastInputValueMap.get(target);
            if (!lastInputValue ||
                lastInputValue.text !== v.text ||
                lastInputValue.isChecked !== v.isChecked) {
                lastInputValueMap.set(target, v);
                var id = mirror.getId(target);
                cb(__assign(__assign({}, v), { id: id }));
            }
        }
        var events = sampling.input === 'last' ? ['change'] : ['input', 'change'];
        var handlers = events.map(function (eventName) { return on(eventName, eventHandler); });
        var propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
        var hookProperties = [
            [HTMLInputElement.prototype, 'value'],
            [HTMLInputElement.prototype, 'checked'],
            [HTMLSelectElement.prototype, 'value'],
            [HTMLTextAreaElement.prototype, 'value'],
        ];
        if (propertyDescriptor && propertyDescriptor.set) {
            handlers.push.apply(handlers, __spread(hookProperties.map(function (p) { return hookSetter(p[0], p[1], {
                set: function () {
                    eventHandler({ target: this });
                },
            }); })));
        }
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function initStyleSheetObserver(cb) {
        var insertRule = CSSStyleSheet.prototype.insertRule;
        CSSStyleSheet.prototype.insertRule = function (rule, index) {
            var id = mirror.getId(this.ownerNode);
            if (id !== -1) {
                cb({ id: id, adds: [{ rule: rule, index: index }] });
            }
            return insertRule.apply(this, arguments);
        };
        var deleteRule = CSSStyleSheet.prototype.deleteRule;
        CSSStyleSheet.prototype.deleteRule = function (index) {
            var id = mirror.getId(this.ownerNode);
            if (id !== -1) {
                cb({ id: id, removes: [{ index: index }] });
            }
            return deleteRule.apply(this, arguments);
        };
        return function () {
            CSSStyleSheet.prototype.insertRule = insertRule;
            CSSStyleSheet.prototype.deleteRule = deleteRule;
        };
    }
    function initMediaInteractionObserver(mediaInteractionCb, blockClass) {
        var handler = function (type) { return function (event) {
            var target = event.target;
            if (!target || isBlocked(target, blockClass))
                return;
            mediaInteractionCb({
                type: type === 'play' ? MediaInteractions.Play : MediaInteractions.Pause,
                id: mirror.getId(target),
            });
        }; };
        var handlers = [on('play', handler('play')), on('pause', handler('pause'))];
        return function () {
            handlers.forEach(function (h) { return h(); });
        };
    }
    function mergeHooks(o, hooks) {
        var mutationCb = o.mutationCb, mousemoveCb = o.mousemoveCb, mouseInteractionCb = o.mouseInteractionCb, scrollCb = o.scrollCb, viewportResizeCb = o.viewportResizeCb, inputCb = o.inputCb, mediaInteractionCb = o.mediaInteractionCb, styleSheetRuleCb = o.styleSheetRuleCb;
        o.mutationCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mutation)
                hooks.mutation.apply(hooks, __spread(p));
            mutationCb.apply(void 0, __spread(p));
        };
        o.mousemoveCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mousemove)
                hooks.mousemove.apply(hooks, __spread(p));
            mousemoveCb.apply(void 0, __spread(p));
        };
        o.mouseInteractionCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mouseInteraction)
                hooks.mouseInteraction.apply(hooks, __spread(p));
            mouseInteractionCb.apply(void 0, __spread(p));
        };
        o.scrollCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.scroll)
                hooks.scroll.apply(hooks, __spread(p));
            scrollCb.apply(void 0, __spread(p));
        };
        o.viewportResizeCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.viewportResize)
                hooks.viewportResize.apply(hooks, __spread(p));
            viewportResizeCb.apply(void 0, __spread(p));
        };
        o.inputCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.input)
                hooks.input.apply(hooks, __spread(p));
            inputCb.apply(void 0, __spread(p));
        };
        o.mediaInteractionCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.mediaInteaction)
                hooks.mediaInteaction.apply(hooks, __spread(p));
            mediaInteractionCb.apply(void 0, __spread(p));
        };
        o.styleSheetRuleCb = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (hooks.styleSheetRule)
                hooks.styleSheetRule.apply(hooks, __spread(p));
            styleSheetRuleCb.apply(void 0, __spread(p));
        };
    }
    function initObservers(o, hooks) {
        if (hooks === void 0) { hooks = {}; }
        mergeHooks(o, hooks);
        var mutationObserver = initMutationObserver(o.mutationCb, o.blockClass, o.inlineStylesheet, o.maskInputOptions);
        var mousemoveHandler = initMoveObserver(o.mousemoveCb, o.sampling);
        var mouseInteractionHandler = initMouseInteractionObserver(o.mouseInteractionCb, o.blockClass, o.sampling);
        var scrollHandler = initScrollObserver(o.scrollCb, o.blockClass, o.sampling);
        var viewportResizeHandler = initViewportResizeObserver(o.viewportResizeCb);
        var inputHandler = initInputObserver(o.inputCb, o.blockClass, o.ignoreClass, o.maskInputOptions, o.sampling);
        var mediaInteractionHandler = initMediaInteractionObserver(o.mediaInteractionCb, o.blockClass);
        var styleSheetObserver = initStyleSheetObserver(o.styleSheetRuleCb);
        return function () {
            mutationObserver.disconnect();
            mousemoveHandler();
            mouseInteractionHandler();
            scrollHandler();
            viewportResizeHandler();
            inputHandler();
            mediaInteractionHandler();
            styleSheetObserver();
        };
    }

    function wrapEvent(e) {
        return __assign(__assign({}, e), { timestamp: Date.now() });
    }
    var wrappedEmit;
    function record(options) {
        if (options === void 0) { options = {}; }
        var emit = options.emit, checkoutEveryNms = options.checkoutEveryNms, checkoutEveryNth = options.checkoutEveryNth, _a = options.blockClass, blockClass = _a === void 0 ? 'rr-block' : _a, _b = options.ignoreClass, ignoreClass = _b === void 0 ? 'rr-ignore' : _b, _c = options.inlineStylesheet, inlineStylesheet = _c === void 0 ? true : _c, maskAllInputs = options.maskAllInputs, _maskInputOptions = options.maskInputOptions, hooks = options.hooks, packFn = options.packFn, _d = options.sampling, sampling = _d === void 0 ? {} : _d, mousemoveWait = options.mousemoveWait;
        if (!emit) {
            throw new Error('emit function is required');
        }
        if (mousemoveWait !== undefined && sampling.mousemove === undefined) {
            sampling.mousemove = mousemoveWait;
        }
        var maskInputOptions = maskAllInputs === true
            ? {
                color: true,
                date: true,
                'datetime-local': true,
                email: true,
                month: true,
                number: true,
                range: true,
                search: true,
                tel: true,
                text: true,
                time: true,
                url: true,
                week: true,
                textarea: true,
                select: true,
            }
            : _maskInputOptions !== undefined
                ? _maskInputOptions
                : {};
        polyfill();
        var lastFullSnapshotEvent;
        var incrementalSnapshotCount = 0;
        wrappedEmit = function (e, isCheckout) {
            emit((packFn ? packFn(e) : e), isCheckout);
            if (e.type === exports.EventType.FullSnapshot) {
                lastFullSnapshotEvent = e;
                incrementalSnapshotCount = 0;
            }
            else if (e.type === exports.EventType.IncrementalSnapshot) {
                incrementalSnapshotCount++;
                var exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
                var exceedTime = checkoutEveryNms &&
                    e.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
                if (exceedCount || exceedTime) {
                    takeFullSnapshot(true);
                }
            }
        };
        function takeFullSnapshot(isCheckout) {
            var _a, _b, _c, _d;
            if (isCheckout === void 0) { isCheckout = false; }
            wrappedEmit(wrapEvent({
                type: exports.EventType.Meta,
                data: {
                    href: window.location.href,
                    width: getWindowWidth(),
                    height: getWindowHeight(),
                },
            }), isCheckout);
            var _e = __read(snapshot(document, blockClass, inlineStylesheet, maskInputOptions), 2), node = _e[0], idNodeMap = _e[1];
            if (!node) {
                return console.warn('Failed to snapshot the document');
            }
            mirror.map = idNodeMap;
            wrappedEmit(wrapEvent({
                type: exports.EventType.FullSnapshot,
                data: {
                    node: node,
                    initialOffset: {
                        left: window.pageXOffset !== undefined
                            ? window.pageXOffset
                            : (document === null || document === void 0 ? void 0 : document.documentElement.scrollLeft) || ((_b = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.scrollLeft) || (document === null || document === void 0 ? void 0 : document.body.scrollLeft) ||
                                0,
                        top: window.pageYOffset !== undefined
                            ? window.pageYOffset
                            : (document === null || document === void 0 ? void 0 : document.documentElement.scrollTop) || ((_d = (_c = document === null || document === void 0 ? void 0 : document.body) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.scrollTop) || (document === null || document === void 0 ? void 0 : document.body.scrollTop) ||
                                0,
                    },
                },
            }));
        }
        try {
            var handlers_1 = [];
            handlers_1.push(on('DOMContentLoaded', function () {
                wrappedEmit(wrapEvent({
                    type: exports.EventType.DomContentLoaded,
                    data: {},
                }));
            }));
            var init_1 = function () {
                takeFullSnapshot();
                handlers_1.push(initObservers({
                    mutationCb: function (m) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.Mutation }, m),
                        }));
                    },
                    mousemoveCb: function (positions, source) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: {
                                source: source,
                                positions: positions,
                            },
                        }));
                    },
                    mouseInteractionCb: function (d) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.MouseInteraction }, d),
                        }));
                    },
                    scrollCb: function (p) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.Scroll }, p),
                        }));
                    },
                    viewportResizeCb: function (d) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.ViewportResize }, d),
                        }));
                    },
                    inputCb: function (v) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.Input }, v),
                        }));
                    },
                    mediaInteractionCb: function (p) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.MediaInteraction }, p),
                        }));
                    },
                    styleSheetRuleCb: function (r) {
                        return wrappedEmit(wrapEvent({
                            type: exports.EventType.IncrementalSnapshot,
                            data: __assign({ source: exports.IncrementalSource.StyleSheetRule }, r),
                        }));
                    },
                    blockClass: blockClass,
                    ignoreClass: ignoreClass,
                    maskInputOptions: maskInputOptions,
                    inlineStylesheet: inlineStylesheet,
                    sampling: sampling,
                }, hooks));
            };
            if (document.readyState === 'interactive' ||
                document.readyState === 'complete') {
                init_1();
            }
            else {
                handlers_1.push(on('load', function () {
                    wrappedEmit(wrapEvent({
                        type: exports.EventType.Load,
                        data: {},
                    }));
                    init_1();
                }, window));
            }
            return function () {
                handlers_1.forEach(function (h) { return h(); });
            };
        }
        catch (error) {
            console.warn(error);
        }
    }
    record.addCustomEvent = function (tag, payload) {
        if (!wrappedEmit) {
            throw new Error('please add custom event after start recording');
        }
        wrappedEmit(wrapEvent({
            type: exports.EventType.Custom,
            data: {
                tag: tag,
                payload: payload,
            },
        }));
    };

    //      
    // An event handler can take an optional event argument
    // and should not return a value
                                              
                                                                   

    // An array of all currently registered event handlers for a type
                                                
                                                                
    // A map of event types and their corresponding event handlers.
                            
                                     
                                       
      

    /** Mitt: Tiny (~200b) functional event emitter / pubsub.
     *  @name mitt
     *  @returns {Mitt}
     */
    function mitt(all                 ) {
    	all = all || Object.create(null);

    	return {
    		/**
    		 * Register an event handler for the given type.
    		 *
    		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
    		 * @param  {Function} handler Function to call in response to given event
    		 * @memberOf mitt
    		 */
    		on: function on(type        , handler              ) {
    			(all[type] || (all[type] = [])).push(handler);
    		},

    		/**
    		 * Remove an event handler for the given type.
    		 *
    		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
    		 * @param  {Function} handler Handler function to remove
    		 * @memberOf mitt
    		 */
    		off: function off(type        , handler              ) {
    			if (all[type]) {
    				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
    			}
    		},

    		/**
    		 * Invoke all handlers for the given type.
    		 * If present, `"*"` handlers are invoked after type-matched handlers.
    		 *
    		 * @param {String} type  The event type to invoke
    		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
    		 * @memberOf mitt
    		 */
    		emit: function emit(type        , evt     ) {
    			(all[type] || []).slice().map(function (handler) { handler(evt); });
    			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
    		}
    	};
    }

    var mittProxy = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': mitt
    });

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var smoothscroll = createCommonjsModule(function (module, exports) {
    /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
    (function () {

      // polyfill
      function polyfill() {
        // aliases
        var w = window;
        var d = document;

        // return if scroll behavior is supported and polyfill is not forced
        if (
          'scrollBehavior' in d.documentElement.style &&
          w.__forceSmoothScrollPolyfill__ !== true
        ) {
          return;
        }

        // globals
        var Element = w.HTMLElement || w.Element;
        var SCROLL_TIME = 468;

        // object gathering original scroll methods
        var original = {
          scroll: w.scroll || w.scrollTo,
          scrollBy: w.scrollBy,
          elementScroll: Element.prototype.scroll || scrollElement,
          scrollIntoView: Element.prototype.scrollIntoView
        };

        // define timing method
        var now =
          w.performance && w.performance.now
            ? w.performance.now.bind(w.performance)
            : Date.now;

        /**
         * indicates if a the current browser is made by Microsoft
         * @method isMicrosoftBrowser
         * @param {String} userAgent
         * @returns {Boolean}
         */
        function isMicrosoftBrowser(userAgent) {
          var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

          return new RegExp(userAgentPatterns.join('|')).test(userAgent);
        }

        /*
         * IE has rounding bug rounding down clientHeight and clientWidth and
         * rounding up scrollHeight and scrollWidth causing false positives
         * on hasScrollableSpace
         */
        var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

        /**
         * changes scroll position inside an element
         * @method scrollElement
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function scrollElement(x, y) {
          this.scrollLeft = x;
          this.scrollTop = y;
        }

        /**
         * returns result of applying ease math function to a number
         * @method ease
         * @param {Number} k
         * @returns {Number}
         */
        function ease(k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        }

        /**
         * indicates if a smooth behavior should be applied
         * @method shouldBailOut
         * @param {Number|Object} firstArg
         * @returns {Boolean}
         */
        function shouldBailOut(firstArg) {
          if (
            firstArg === null ||
            typeof firstArg !== 'object' ||
            firstArg.behavior === undefined ||
            firstArg.behavior === 'auto' ||
            firstArg.behavior === 'instant'
          ) {
            // first argument is not an object/null
            // or behavior is auto, instant or undefined
            return true;
          }

          if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
            // first argument is an object and behavior is smooth
            return false;
          }

          // throw error when behavior is not supported
          throw new TypeError(
            'behavior member of ScrollOptions ' +
              firstArg.behavior +
              ' is not a valid value for enumeration ScrollBehavior.'
          );
        }

        /**
         * indicates if an element has scrollable space in the provided axis
         * @method hasScrollableSpace
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function hasScrollableSpace(el, axis) {
          if (axis === 'Y') {
            return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
          }

          if (axis === 'X') {
            return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
          }
        }

        /**
         * indicates if an element has a scrollable overflow property in the axis
         * @method canOverflow
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function canOverflow(el, axis) {
          var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

          return overflowValue === 'auto' || overflowValue === 'scroll';
        }

        /**
         * indicates if an element can be scrolled in either axis
         * @method isScrollable
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function isScrollable(el) {
          var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
          var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

          return isScrollableY || isScrollableX;
        }

        /**
         * finds scrollable parent of an element
         * @method findScrollableParent
         * @param {Node} el
         * @returns {Node} el
         */
        function findScrollableParent(el) {
          while (el !== d.body && isScrollable(el) === false) {
            el = el.parentNode || el.host;
          }

          return el;
        }

        /**
         * self invoked function that, given a context, steps through scrolling
         * @method step
         * @param {Object} context
         * @returns {undefined}
         */
        function step(context) {
          var time = now();
          var value;
          var currentX;
          var currentY;
          var elapsed = (time - context.startTime) / SCROLL_TIME;

          // avoid elapsed times higher than one
          elapsed = elapsed > 1 ? 1 : elapsed;

          // apply easing to elapsed time
          value = ease(elapsed);

          currentX = context.startX + (context.x - context.startX) * value;
          currentY = context.startY + (context.y - context.startY) * value;

          context.method.call(context.scrollable, currentX, currentY);

          // scroll more if we have not reached our destination
          if (currentX !== context.x || currentY !== context.y) {
            w.requestAnimationFrame(step.bind(w, context));
          }
        }

        /**
         * scrolls window or element with a smooth behavior
         * @method smoothScroll
         * @param {Object|Node} el
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function smoothScroll(el, x, y) {
          var scrollable;
          var startX;
          var startY;
          var method;
          var startTime = now();

          // define scroll context
          if (el === d.body) {
            scrollable = w;
            startX = w.scrollX || w.pageXOffset;
            startY = w.scrollY || w.pageYOffset;
            method = original.scroll;
          } else {
            scrollable = el;
            startX = el.scrollLeft;
            startY = el.scrollTop;
            method = scrollElement;
          }

          // scroll looping over a frame
          step({
            scrollable: scrollable,
            method: method,
            startTime: startTime,
            startX: startX,
            startY: startY,
            x: x,
            y: y
          });
        }

        // ORIGINAL METHODS OVERRIDES
        // w.scroll and w.scrollTo
        w.scroll = w.scrollTo = function() {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.scroll.call(
              w,
              arguments[0].left !== undefined
                ? arguments[0].left
                : typeof arguments[0] !== 'object'
                  ? arguments[0]
                  : w.scrollX || w.pageXOffset,
              // use top prop, second argument if present or fallback to scrollY
              arguments[0].top !== undefined
                ? arguments[0].top
                : arguments[1] !== undefined
                  ? arguments[1]
                  : w.scrollY || w.pageYOffset
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            w,
            d.body,
            arguments[0].left !== undefined
              ? ~~arguments[0].left
              : w.scrollX || w.pageXOffset,
            arguments[0].top !== undefined
              ? ~~arguments[0].top
              : w.scrollY || w.pageYOffset
          );
        };

        // w.scrollBy
        w.scrollBy = function() {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0])) {
            original.scrollBy.call(
              w,
              arguments[0].left !== undefined
                ? arguments[0].left
                : typeof arguments[0] !== 'object' ? arguments[0] : 0,
              arguments[0].top !== undefined
                ? arguments[0].top
                : arguments[1] !== undefined ? arguments[1] : 0
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            w,
            d.body,
            ~~arguments[0].left + (w.scrollX || w.pageXOffset),
            ~~arguments[0].top + (w.scrollY || w.pageYOffset)
          );
        };

        // Element.prototype.scroll and Element.prototype.scrollTo
        Element.prototype.scroll = Element.prototype.scrollTo = function() {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            // if one number is passed, throw error to match Firefox implementation
            if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
              throw new SyntaxError('Value could not be converted');
            }

            original.elementScroll.call(
              this,
              // use left prop, first number argument or fallback to scrollLeft
              arguments[0].left !== undefined
                ? ~~arguments[0].left
                : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
              // use top prop, second argument or fallback to scrollTop
              arguments[0].top !== undefined
                ? ~~arguments[0].top
                : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
            );

            return;
          }

          var left = arguments[0].left;
          var top = arguments[0].top;

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            this,
            this,
            typeof left === 'undefined' ? this.scrollLeft : ~~left,
            typeof top === 'undefined' ? this.scrollTop : ~~top
          );
        };

        // Element.prototype.scrollBy
        Element.prototype.scrollBy = function() {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.elementScroll.call(
              this,
              arguments[0].left !== undefined
                ? ~~arguments[0].left + this.scrollLeft
                : ~~arguments[0] + this.scrollLeft,
              arguments[0].top !== undefined
                ? ~~arguments[0].top + this.scrollTop
                : ~~arguments[1] + this.scrollTop
            );

            return;
          }

          this.scroll({
            left: ~~arguments[0].left + this.scrollLeft,
            top: ~~arguments[0].top + this.scrollTop,
            behavior: arguments[0].behavior
          });
        };

        // Element.prototype.scrollIntoView
        Element.prototype.scrollIntoView = function() {
          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.scrollIntoView.call(
              this,
              arguments[0] === undefined ? true : arguments[0]
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          var scrollableParent = findScrollableParent(this);
          var parentRects = scrollableParent.getBoundingClientRect();
          var clientRects = this.getBoundingClientRect();

          if (scrollableParent !== d.body) {
            // reveal element inside parent
            smoothScroll.call(
              this,
              scrollableParent,
              scrollableParent.scrollLeft + clientRects.left - parentRects.left,
              scrollableParent.scrollTop + clientRects.top - parentRects.top
            );

            // reveal parent in viewport unless is fixed
            if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
              w.scrollBy({
                left: parentRects.left,
                top: parentRects.top,
                behavior: 'smooth'
              });
            }
          } else {
            // reveal element in viewport
            w.scrollBy({
              left: clientRects.left,
              top: clientRects.top,
              behavior: 'smooth'
            });
          }
        };
      }

      {
        // commonjs
        module.exports = { polyfill: polyfill };
      }

    }());
    });
    var smoothscroll_1 = smoothscroll.polyfill;

    var Timer = (function () {
        function Timer(config, actions) {
            if (actions === void 0) { actions = []; }
            this.timeOffset = 0;
            this.actions = actions;
            this.config = config;
        }
        Timer.prototype.addAction = function (action) {
            var index = this.findActionIndex(action);
            this.actions.splice(index, 0, action);
        };
        Timer.prototype.addActions = function (actions) {
            var _a;
            (_a = this.actions).push.apply(_a, __spread(actions));
        };
        Timer.prototype.start = function () {
            this.actions.sort(function (a1, a2) { return a1.delay - a2.delay; });
            this.timeOffset = 0;
            var lastTimestamp = performance.now();
            var _a = this, actions = _a.actions, config = _a.config;
            var self = this;
            function check(time) {
                self.timeOffset += (time - lastTimestamp) * config.speed;
                lastTimestamp = time;
                while (actions.length) {
                    var action = actions[0];
                    if (self.timeOffset >= action.delay) {
                        actions.shift();
                        action.doAction();
                    }
                    else {
                        break;
                    }
                }
                if (actions.length > 0 || self.config.liveMode) {
                    self.raf = requestAnimationFrame(check);
                }
            }
            this.raf = requestAnimationFrame(check);
        };
        Timer.prototype.clear = function () {
            if (this.raf) {
                cancelAnimationFrame(this.raf);
            }
            this.actions.length = 0;
        };
        Timer.prototype.findActionIndex = function (action) {
            var start = 0;
            var end = this.actions.length - 1;
            while (start <= end) {
                var mid = Math.floor((start + end) / 2);
                if (this.actions[mid].delay < action.delay) {
                    start = mid + 1;
                }
                else if (this.actions[mid].delay > action.delay) {
                    end = mid - 1;
                }
                else {
                    return mid;
                }
            }
            return start;
        };
        return Timer;
    }());
    function getDelay(event, baselineTime) {
        if (event.type === exports.EventType.IncrementalSnapshot &&
            event.data.source === exports.IncrementalSource.MouseMove) {
            var firstOffset = event.data.positions[0].timeOffset;
            var firstTimestamp = event.timestamp + firstOffset;
            event.delay = firstTimestamp - baselineTime;
            return firstTimestamp - baselineTime;
        }
        event.delay = event.timestamp - baselineTime;
        return event.timestamp - baselineTime;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var t;!function(t){t[t.NotStarted=0]="NotStarted",t[t.Running=1]="Running",t[t.Stopped=2]="Stopped";}(t||(t={}));var n={type:"xstate.init"};function e(t){return void 0===t?[]:[].concat(t)}function r(t){return {type:"xstate.assign",assignment:t}}function i(t,n){return "string"==typeof(t="string"==typeof t&&n&&n[t]?n[t]:t)?{type:t}:"function"==typeof t?{type:t.name,exec:t}:t}function o(t){return function(n){return t===n}}function a(t){return "string"==typeof t?{type:t}:t}function u(t,n){return {value:t,context:n,actions:[],changed:!1,matches:o(t)}}function c(t,n){void 0===n&&(n={});var r={config:t,_options:n,initialState:{value:t.initial,actions:e(t.states[t.initial].entry).map((function(t){return i(t,n.actions)})),context:t.context,matches:o(t.initial)},transition:function(n,c){var s,f,l="string"==typeof n?{value:n,context:t.context}:n,v=l.value,p=l.context,g=a(c),y=t.states[v];if(y.on){var d=e(y.on[g.type]),x=function(n){if(void 0===n)return {value:u(v,p)};var e="string"==typeof n?{target:n}:n,a=e.target,c=void 0===a?v:a,s=e.actions,f=void 0===s?[]:s,l=e.cond,d=p;if((void 0===l?function(){return !0}:l)(p,g)){var x=t.states[c],m=!1,h=[].concat(y.exit,f,x.entry).filter((function(t){return t})).map((function(t){return i(t,r._options.actions)})).filter((function(t){if("xstate.assign"===t.type){m=!0;var n=Object.assign({},d);return "function"==typeof t.assignment?n=t.assignment(d,g):Object.keys(t.assignment).forEach((function(e){n[e]="function"==typeof t.assignment[e]?t.assignment[e](d,g):t.assignment[e];})),d=n,!1}return !0}));return {value:{value:c,context:d,actions:h,changed:c!==v||h.length>0||m,matches:o(c)}}}};try{for(var m=function(t){var n="function"==typeof Symbol&&t[Symbol.iterator],e=0;return n?n.call(t):{next:function(){return t&&e>=t.length&&(t=void 0),{value:t&&t[e++],done:!t}}}}(d),h=m.next();!h.done;h=m.next()){var S=x(h.value);if("object"==typeof S)return S.value}}catch(t){s={error:t};}finally{try{h&&!h.done&&(f=m.return)&&f.call(m);}finally{if(s)throw s.error}}}return u(v,p)}};return r}var s=function(t,n){return t.actions.forEach((function(e){var r=e.exec;return r&&r(t.context,n)}))};function f(e){var r=e.initialState,i=t.NotStarted,o=new Set,u={_machine:e,send:function(n){i===t.Running&&(r=e.transition(r,n),s(r,a(n)),o.forEach((function(t){return t(r)})));},subscribe:function(t){return o.add(t),t(r),{unsubscribe:function(){return o.delete(t)}}},start:function(){return i=t.Running,s(r,n),u},stop:function(){return i=t.Stopped,o.clear(),u},get state(){return r},get status(){return i}};return u}

    function discardPriorSnapshots(events, baselineTime) {
        for (var idx = events.length - 1; idx >= 0; idx--) {
            var event = events[idx];
            if (event.type === exports.EventType.Meta) {
                if (event.timestamp <= baselineTime) {
                    return events.slice(idx);
                }
            }
        }
        return events;
    }
    function createPlayerService(context, _a) {
        var getCastFn = _a.getCastFn, emitter = _a.emitter;
        var playerMachine = c({
            id: 'player',
            context: context,
            initial: 'inited',
            states: {
                inited: {
                    on: {
                        PLAY: {
                            target: 'playing',
                            actions: ['recordTimeOffset', 'play'],
                        },
                        TO_LIVE: {
                            target: 'live',
                            actions: ['startLive'],
                        },
                    },
                },
                playing: {
                    on: {
                        PAUSE: {
                            target: 'paused',
                            actions: ['pause'],
                        },
                        END: 'ended',
                        FAST_FORWARD: 'skipping',
                        CAST_EVENT: {
                            target: 'playing',
                            actions: 'castEvent',
                        },
                    },
                },
                paused: {
                    on: {
                        RESUME: {
                            target: 'playing',
                            actions: ['recordTimeOffset', 'play'],
                        },
                        CAST_EVENT: {
                            target: 'paused',
                            actions: 'castEvent',
                        },
                    },
                },
                skipping: {
                    on: {
                        BACK_TO_NORMAL: 'playing',
                    },
                },
                ended: {
                    on: {
                        REPLAY: 'playing',
                    },
                },
                live: {
                    on: {
                        ADD_EVENT: {
                            target: 'live',
                            actions: ['addEvent'],
                        },
                    },
                },
            },
        }, {
            actions: {
                castEvent: r({
                    lastPlayedEvent: function (ctx, event) {
                        if (event.type === 'CAST_EVENT') {
                            return event.payload.event;
                        }
                        return context.lastPlayedEvent;
                    },
                }),
                recordTimeOffset: r(function (ctx, event) {
                    var timeOffset = ctx.timeOffset;
                    if ('payload' in event && 'timeOffset' in event.payload) {
                        timeOffset = event.payload.timeOffset;
                    }
                    return __assign(__assign({}, ctx), { timeOffset: timeOffset, baselineTime: ctx.events[0].timestamp + timeOffset });
                }),
                play: function (ctx) {
                    var e_1, _a;
                    var timer = ctx.timer, events = ctx.events, baselineTime = ctx.baselineTime, lastPlayedEvent = ctx.lastPlayedEvent;
                    timer.clear();
                    var neededEvents = discardPriorSnapshots(events, baselineTime);
                    var actions = new Array();
                    var _loop_1 = function (event) {
                        if (lastPlayedEvent &&
                            lastPlayedEvent.timestamp > baselineTime &&
                            (event.timestamp <= lastPlayedEvent.timestamp ||
                                event === lastPlayedEvent)) {
                            return "continue";
                        }
                        var isSync = event.timestamp < baselineTime;
                        if (isSync && !needCastInSyncMode(event)) {
                            return "continue";
                        }
                        var castFn = getCastFn(event, isSync);
                        if (isSync) {
                            castFn();
                        }
                        else {
                            actions.push({
                                doAction: function () {
                                    castFn();
                                    emitter.emit(exports.ReplayerEvents.EventCast, event);
                                },
                                delay: getDelay(event, baselineTime),
                            });
                        }
                    };
                    try {
                        for (var neededEvents_1 = __values(neededEvents), neededEvents_1_1 = neededEvents_1.next(); !neededEvents_1_1.done; neededEvents_1_1 = neededEvents_1.next()) {
                            var event = neededEvents_1_1.value;
                            _loop_1(event);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (neededEvents_1_1 && !neededEvents_1_1.done && (_a = neededEvents_1.return)) _a.call(neededEvents_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    emitter.emit(exports.ReplayerEvents.Flush);
                    timer.addActions(actions);
                    timer.start();
                },
                pause: function (ctx) {
                    ctx.timer.clear();
                },
                startLive: r({
                    baselineTime: function (ctx, event) {
                        ctx.timer.start();
                        if (event.type === 'TO_LIVE' && event.payload.baselineTime) {
                            return event.payload.baselineTime;
                        }
                        return Date.now();
                    },
                }),
                addEvent: r(function (ctx, machineEvent) {
                    var baselineTime = ctx.baselineTime, timer = ctx.timer, events = ctx.events;
                    if (machineEvent.type === 'ADD_EVENT') {
                        var event_1 = machineEvent.payload.event;
                        events.push(event_1);
                        var isSync = event_1.timestamp < baselineTime;
                        var castFn_1 = getCastFn(event_1, isSync);
                        if (isSync) {
                            castFn_1();
                        }
                        else {
                            timer.addAction({
                                doAction: function () {
                                    castFn_1();
                                    emitter.emit(exports.ReplayerEvents.EventCast, event_1);
                                },
                                delay: getDelay(event_1, baselineTime),
                            });
                        }
                    }
                    return __assign(__assign({}, ctx), { events: events });
                }),
            },
        });
        return f(playerMachine);
    }

    var rules = function (blockClass) { return [
        "iframe, ." + blockClass + " { background: #ccc }",
        'noscript { display: none !important; }',
    ]; };

    var SKIP_TIME_THRESHOLD = 10 * 1000;
    var SKIP_TIME_INTERVAL = 5 * 1000;
    var mitt$1 = mitt || mittProxy;
    var REPLAY_CONSOLE_PREFIX = '[replayer]';
    var defaultConfig = {
        speed: 1,
        root: document.body,
        loadTimeout: 0,
        skipInactive: false,
        showWarning: true,
        showDebug: false,
        blockClass: 'rr-block',
        liveMode: false,
        insertStyleRules: [],
        triggerFocus: true,
    };
    var Replayer = (function () {
        function Replayer(events, config) {
            var _this = this;
            this.emitter = mitt$1();
            this.noramlSpeed = -1;
            this.legacy_missingNodeRetryMap = {};
            if (!(config === null || config === void 0 ? void 0 : config.liveMode) && events.length < 2) {
                throw new Error('Replayer need at least 2 events.');
            }
            this.config = Object.assign({}, defaultConfig, config);
            this.handleResize = this.handleResize.bind(this);
            this.getCastFn = this.getCastFn.bind(this);
            this.emitter.on(exports.ReplayerEvents.Resize, this.handleResize);
            smoothscroll_1();
            polyfill();
            this.setupDom();
            this.treeIndex = new TreeIndex();
            this.fragmentParentMap = new Map();
            this.emitter.on(exports.ReplayerEvents.Flush, function () {
                var e_1, _a, e_2, _b, e_3, _c;
                var _d = _this.treeIndex.flush(), scrollMap = _d.scrollMap, inputMap = _d.inputMap;
                try {
                    for (var _e = __values(scrollMap.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        _this.applyScroll(d);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _g = __values(inputMap.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var d = _h.value;
                        _this.applyInput(d);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    for (var _j = __values(_this.fragmentParentMap.entries()), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var _l = __read(_k.value, 2), frag = _l[0], parent = _l[1];
                        mirror.map[parent.__sn.id] = parent;
                        if (parent.__sn.type === NodeType.Element &&
                            parent.__sn.tagName === 'textarea' &&
                            frag.textContent) {
                            parent.value = frag.textContent;
                        }
                        parent.appendChild(frag);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                _this.fragmentParentMap.clear();
            });
            this.service = createPlayerService({
                events: events.map(function (e) {
                    if (config && config.unpackFn) {
                        return config.unpackFn(e);
                    }
                    return e;
                }),
                timer: new Timer(this.config),
                speed: (config === null || config === void 0 ? void 0 : config.speed) || defaultConfig.speed,
                timeOffset: 0,
                baselineTime: 0,
                lastPlayedEvent: null,
            }, {
                getCastFn: this.getCastFn,
                emitter: this.emitter,
            });
            this.service.start();
            this.service.subscribe(function (state) {
                if (!state.changed) {
                    return;
                }
            });
            var contextEvents = this.service.state.context.events;
            var firstMeta = contextEvents.find(function (e) { return e.type === exports.EventType.Meta; });
            var firstFullsnapshot = contextEvents.find(function (e) { return e.type === exports.EventType.FullSnapshot; });
            if (firstMeta) {
                var _a = firstMeta.data, width = _a.width, height = _a.height;
                this.emitter.emit(exports.ReplayerEvents.Resize, {
                    width: width,
                    height: height,
                });
            }
            if (firstFullsnapshot) {
                this.rebuildFullSnapshot(firstFullsnapshot);
            }
        }
        Object.defineProperty(Replayer.prototype, "timer", {
            get: function () {
                return this.service.state.context.timer;
            },
            enumerable: false,
            configurable: true
        });
        Replayer.prototype.on = function (event, handler) {
            this.emitter.on(event, handler);
        };
        Replayer.prototype.setConfig = function (config) {
            var _this = this;
            Object.keys(config).forEach(function (key) {
                _this.config[key] = config[key];
            });
            if (!this.config.skipInactive) {
                this.noramlSpeed = -1;
            }
        };
        Replayer.prototype.getMetaData = function () {
            var events = this.service.state.context.events;
            var firstEvent = events[0];
            var lastEvent = events[events.length - 1];
            return {
                startTime: firstEvent.timestamp,
                endTime: lastEvent.timestamp,
                totalTime: lastEvent.timestamp - firstEvent.timestamp,
            };
        };
        Replayer.prototype.getCurrentTime = function () {
            return this.timer.timeOffset + this.getTimeOffset();
        };
        Replayer.prototype.getTimeOffset = function () {
            var _a = this.service.state.context, baselineTime = _a.baselineTime, events = _a.events;
            return baselineTime - events[0].timestamp;
        };
        Replayer.prototype.play = function (timeOffset) {
            if (timeOffset === void 0) { timeOffset = 0; }
            if (this.service.state.value === 'ended') {
                this.service.state.context.lastPlayedEvent = null;
                this.service.send({ type: 'REPLAY' });
            }
            if (this.service.state.value === 'paused') {
                this.service.send({ type: 'RESUME', payload: { timeOffset: timeOffset } });
            }
            else {
                this.service.send({ type: 'PLAY', payload: { timeOffset: timeOffset } });
            }
            this.emitter.emit(exports.ReplayerEvents.Start);
        };
        Replayer.prototype.pause = function () {
            this.service.send({ type: 'PAUSE' });
            this.emitter.emit(exports.ReplayerEvents.Pause);
        };
        Replayer.prototype.resume = function (timeOffset) {
            if (timeOffset === void 0) { timeOffset = 0; }
            this.service.send({ type: 'RESUME', payload: { timeOffset: timeOffset } });
            this.emitter.emit(exports.ReplayerEvents.Resume);
        };
        Replayer.prototype.startLive = function (baselineTime) {
            this.service.send({ type: 'TO_LIVE', payload: { baselineTime: baselineTime } });
        };
        Replayer.prototype.addEvent = function (rawEvent) {
            var _this = this;
            var event = this.config.unpackFn
                ? this.config.unpackFn(rawEvent)
                : rawEvent;
            Promise.resolve().then(function () {
                return _this.service.send({ type: 'ADD_EVENT', payload: { event: event } });
            });
        };
        Replayer.prototype.enableInteract = function () {
            this.iframe.setAttribute('scrolling', 'auto');
            this.iframe.style.pointerEvents = 'auto';
        };
        Replayer.prototype.disableInteract = function () {
            this.iframe.setAttribute('scrolling', 'no');
            this.iframe.style.pointerEvents = 'none';
        };
        Replayer.prototype.setupDom = function () {
            this.wrapper = document.createElement('div');
            this.wrapper.classList.add('replayer-wrapper');
            this.config.root.appendChild(this.wrapper);
            this.mouse = document.createElement('div');
            this.mouse.classList.add('replayer-mouse');
            this.wrapper.appendChild(this.mouse);
            this.iframe = document.createElement('iframe');
            //this.iframe.setAttribute('sandbox', 'allow-same-origin');
            this.disableInteract();
            this.wrapper.appendChild(this.iframe);
        };
        Replayer.prototype.handleResize = function (dimension) {
            this.iframe.setAttribute('width', String(dimension.width));
            this.iframe.setAttribute('height', String(dimension.height));
        };
        Replayer.prototype.getCastFn = function (event, isSync) {
            var _this = this;
            if (isSync === void 0) { isSync = false; }
            var events = this.service.state.context.events;
            var castFn;
            switch (event.type) {
                case exports.EventType.DomContentLoaded:
                case exports.EventType.Load:
                    break;
                case exports.EventType.Custom:
                    castFn = function () {
                        _this.emitter.emit(exports.ReplayerEvents.CustomEvent, event);
                    };
                    break;
                case exports.EventType.Meta:
                    castFn = function () {
                        return _this.emitter.emit(exports.ReplayerEvents.Resize, {
                            width: event.data.width,
                            height: event.data.height,
                        });
                    };
                    break;
                case exports.EventType.FullSnapshot:
                    castFn = function () {
                        _this.rebuildFullSnapshot(event);
                        _this.iframe.contentWindow.scrollTo(event.data.initialOffset);
                    };
                    break;
                case exports.EventType.IncrementalSnapshot:
                    castFn = function () {
                        var e_4, _a;
                        _this.applyIncremental(event, isSync);
                        if (event === _this.nextUserInteractionEvent) {
                            _this.nextUserInteractionEvent = null;
                            _this.restoreSpeed();
                        }
                        if (_this.config.skipInactive && !_this.nextUserInteractionEvent) {
                            try {
                                for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                                    var _event = events_1_1.value;
                                    if (_event.timestamp <= event.timestamp) {
                                        continue;
                                    }
                                    if (_this.isUserInteraction(_event)) {
                                        if (_event.delay - event.delay >
                                            SKIP_TIME_THRESHOLD * _this.config.speed) {
                                            _this.nextUserInteractionEvent = _event;
                                        }
                                        break;
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            if (_this.nextUserInteractionEvent) {
                                _this.noramlSpeed = _this.config.speed;
                                var skipTime = _this.nextUserInteractionEvent.delay - event.delay;
                                var payload = {
                                    speed: Math.min(Math.round(skipTime / SKIP_TIME_INTERVAL), 360),
                                };
                                _this.setConfig(payload);
                                _this.emitter.emit(exports.ReplayerEvents.SkipStart, payload);
                            }
                        }
                    };
                    break;
            }
            var wrappedCastFn = function () {
                if (castFn) {
                    castFn();
                }
                _this.service.send({ type: 'CAST_EVENT', payload: { event: event } });
                if (event === events[events.length - 1]) {
                    _this.restoreSpeed();
                    _this.service.send('END');
                    _this.emitter.emit(exports.ReplayerEvents.Finish);
                }
            };
            return wrappedCastFn;
        };
        Replayer.prototype.rebuildFullSnapshot = function (event) {
            if (!this.iframe.contentDocument) {
                return console.warn('Looks like your replayer has been destroyed.');
            }
            if (Object.keys(this.legacy_missingNodeRetryMap).length) {
                console.warn('Found unresolved missing node map', this.legacy_missingNodeRetryMap);
            }
            this.legacy_missingNodeRetryMap = {};
            mirror.map = rebuild(event.data.node, this.iframe.contentDocument)[1];
            var styleEl = document.createElement('style');
            var _a = this.iframe.contentDocument, documentElement = _a.documentElement, head = _a.head;
            documentElement.insertBefore(styleEl, head);
            var injectStylesRules = rules(this.config.blockClass).concat(this.config.insertStyleRules);
            for (var idx = 0; idx < injectStylesRules.length; idx++) {
                styleEl.sheet.insertRule(injectStylesRules[idx], idx);
            }
            this.emitter.emit(exports.ReplayerEvents.FullsnapshotRebuilded, event);
            this.waitForStylesheetLoad();
        };
        Replayer.prototype.waitForStylesheetLoad = function () {
            var _this = this;
            var _a;
            var head = (_a = this.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.head;
            if (head) {
                var unloadSheets_1 = new Set();
                var timer_1;
                var beforeLoadState_1 = this.service.state;
                head
                    .querySelectorAll('link[rel="stylesheet"]')
                    .forEach(function (css) {
                    if (!css.sheet) {
                        unloadSheets_1.add(css);
                        css.addEventListener('load', function () {
                            unloadSheets_1.delete(css);
                            if (unloadSheets_1.size === 0 && timer_1 !== -1) {
                                if (beforeLoadState_1.matches('playing')) {
                                    _this.resume(_this.getCurrentTime());
                                }
                                _this.emitter.emit(exports.ReplayerEvents.LoadStylesheetEnd);
                                if (timer_1) {
                                    window.clearTimeout(timer_1);
                                }
                            }
                        });
                    }
                });
                if (unloadSheets_1.size > 0) {
                    this.service.send({ type: 'PAUSE' });
                    this.emitter.emit(exports.ReplayerEvents.LoadStylesheetStart);
                    timer_1 = window.setTimeout(function () {
                        if (beforeLoadState_1.matches('playing')) {
                            _this.resume(_this.getCurrentTime());
                        }
                        timer_1 = -1;
                    }, this.config.loadTimeout);
                }
            }
        };
        Replayer.prototype.applyIncremental = function (e, isSync) {
            var _this = this;
            var baselineTime = this.service.state.context.baselineTime;
            var d = e.data;
            switch (d.source) {
                case exports.IncrementalSource.Mutation: {
                    if (isSync) {
                        d.adds.forEach(function (m) { return _this.treeIndex.add(m); });
                        d.texts.forEach(function (m) { return _this.treeIndex.text(m); });
                        d.attributes.forEach(function (m) { return _this.treeIndex.attribute(m); });
                        d.removes.forEach(function (m) { return _this.treeIndex.remove(m); });
                    }
                    this.applyMutation(d, isSync);
                    break;
                }
                case exports.IncrementalSource.MouseMove:
                    if (isSync) {
                        var lastPosition = d.positions[d.positions.length - 1];
                        this.moveAndHover(d, lastPosition.x, lastPosition.y, lastPosition.id);
                    }
                    else {
                        d.positions.forEach(function (p) {
                            var action = {
                                doAction: function () {
                                    _this.moveAndHover(d, p.x, p.y, p.id);
                                },
                                delay: p.timeOffset + e.timestamp - baselineTime,
                            };
                            _this.timer.addAction(action);
                        });
                    }
                    break;
                case exports.IncrementalSource.MouseInteraction: {
                    if (d.id === -1) {
                        break;
                    }
                    var event = new Event(exports.MouseInteractions[d.type].toLowerCase());
                    var target = mirror.getNode(d.id);
                    if (!target) {
                        return this.debugNodeNotFound(d, d.id);
                    }
                    this.emitter.emit(exports.ReplayerEvents.MouseInteraction, {
                        type: d.type,
                        target: target,
                    });
                    var triggerFocus = this.config.triggerFocus;
                    switch (d.type) {
                        case exports.MouseInteractions.Blur:
                            if ('blur' in target) {
                                target.blur();
                            }
                            break;
                        case exports.MouseInteractions.Focus:
                            if (triggerFocus && target.focus) {
                                target.focus({
                                    preventScroll: true,
                                });
                            }
                            break;
                        case exports.MouseInteractions.Click:
                        case exports.MouseInteractions.TouchStart:
                        case exports.MouseInteractions.TouchEnd:
                            if (!isSync) {
                                this.moveAndHover(d, d.x, d.y, d.id);
                                this.mouse.classList.remove('active');
                                void this.mouse.offsetWidth;
                                this.mouse.classList.add('active');
                            }
                            break;
                        default:
                            target.dispatchEvent(event);
                    }
                    break;
                }
                case exports.IncrementalSource.Scroll: {
                    if (d.id === -1) {
                        break;
                    }
                    if (isSync) {
                        this.treeIndex.scroll(d);
                        break;
                    }
                    this.applyScroll(d);
                    break;
                }
                case exports.IncrementalSource.ViewportResize:
                    this.emitter.emit(exports.ReplayerEvents.Resize, {
                        width: d.width,
                        height: d.height,
                    });
                    break;
                case exports.IncrementalSource.Input: {
                    if (d.id === -1) {
                        break;
                    }
                    if (isSync) {
                        this.treeIndex.input(d);
                        break;
                    }
                    this.applyInput(d);
                    break;
                }
                case exports.IncrementalSource.MediaInteraction: {
                    var target = mirror.getNode(d.id);
                    if (!target) {
                        return this.debugNodeNotFound(d, d.id);
                    }
                    var mediaEl_1 = target;
                    if (d.type === MediaInteractions.Pause) {
                        mediaEl_1.pause();
                    }
                    if (d.type === MediaInteractions.Play) {
                        if (mediaEl_1.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
                            mediaEl_1.play();
                        }
                        else {
                            mediaEl_1.addEventListener('canplay', function () {
                                mediaEl_1.play();
                            });
                        }
                    }
                    break;
                }
                case exports.IncrementalSource.StyleSheetRule: {
                    var target = mirror.getNode(d.id);
                    if (!target) {
                        return this.debugNodeNotFound(d, d.id);
                    }
                    var styleEl = target;
                    var styleSheet_1 = styleEl.sheet;
                    if (d.adds) {
                        d.adds.forEach(function (_a) {
                            var rule = _a.rule, index = _a.index;
                            var _index = index === undefined
                                ? undefined
                                : Math.min(index, styleSheet_1.rules.length);
                            try {
                                styleSheet_1.insertRule(rule, _index);
                            }
                            catch (e) {
                            }
                        });
                    }
                    if (d.removes) {
                        d.removes.forEach(function (_a) {
                            var index = _a.index;
                            styleSheet_1.deleteRule(index);
                        });
                    }
                    break;
                }
            }
        };
        Replayer.prototype.applyMutation = function (d, useVirtualParent) {
            var _this = this;
            d.removes.forEach(function (mutation) {
                var target = mirror.getNode(mutation.id);
                if (!target) {
                    return _this.warnNodeNotFound(d, mutation.id);
                }
                var parent = mirror.getNode(mutation.parentId);
                if (!parent) {
                    return _this.warnNodeNotFound(d, mutation.parentId);
                }
                mirror.removeNodeFromMap(target);
                if (parent) {
                    var realParent = _this.fragmentParentMap.get(parent);
                    if (realParent && realParent.contains(target)) {
                        realParent.removeChild(target);
                    }
                    else {
                        parent.removeChild(target);
                    }
                }
            });
            var legacy_missingNodeMap = __assign({}, this.legacy_missingNodeRetryMap);
            var queue = [];
            var appendNode = function (mutation) {
                if (!_this.iframe.contentDocument) {
                    return console.warn('Looks like your replayer has been destroyed.');
                }
                var parent = mirror.getNode(mutation.parentId);
                if (!parent) {
                    return queue.push(mutation);
                }
                var parentInDocument = _this.iframe.contentDocument.contains(parent);
                if (useVirtualParent && parentInDocument) {
                    var virtualParent = document.createDocumentFragment();
                    mirror.map[mutation.parentId] = virtualParent;
                    _this.fragmentParentMap.set(virtualParent, parent);
                    while (parent.firstChild) {
                        virtualParent.appendChild(parent.firstChild);
                    }
                    parent = virtualParent;
                }
                var previous = null;
                var next = null;
                if (mutation.previousId) {
                    previous = mirror.getNode(mutation.previousId);
                }
                if (mutation.nextId) {
                    next = mirror.getNode(mutation.nextId);
                }
                if (mutation.nextId !== null && mutation.nextId !== -1 && !next) {
                    return queue.push(mutation);
                }
                var target = buildNodeWithSN(mutation.node, _this.iframe.contentDocument, mirror.map, true);
                if (mutation.previousId === -1 || mutation.nextId === -1) {
                    legacy_missingNodeMap[mutation.node.id] = {
                        node: target,
                        mutation: mutation,
                    };
                    return;
                }
                if (previous && previous.nextSibling && previous.nextSibling.parentNode) {
                    parent.insertBefore(target, previous.nextSibling);
                }
                else if (next && next.parentNode) {
                    parent.contains(next)
                        ? parent.insertBefore(target, next)
                        : parent.insertBefore(target, null);
                }
                else {
                    parent.appendChild(target);
                }
                if (mutation.previousId || mutation.nextId) {
                    _this.legacy_resolveMissingNode(legacy_missingNodeMap, parent, target, mutation);
                }
            };
            d.adds.forEach(function (mutation) {
                appendNode(mutation);
            });
            while (queue.length) {
                if (queue.every(function (m) { return !Boolean(mirror.getNode(m.parentId)); })) {
                    return queue.forEach(function (m) { return _this.warnNodeNotFound(d, m.node.id); });
                }
                var mutation = queue.shift();
                appendNode(mutation);
            }
            if (Object.keys(legacy_missingNodeMap).length) {
                Object.assign(this.legacy_missingNodeRetryMap, legacy_missingNodeMap);
            }
            d.texts.forEach(function (mutation) {
                var target = mirror.getNode(mutation.id);
                if (!target) {
                    return _this.warnNodeNotFound(d, mutation.id);
                }
                if (_this.fragmentParentMap.has(target)) {
                    target = _this.fragmentParentMap.get(target);
                }
                target.textContent = mutation.value;
            });
            d.attributes.forEach(function (mutation) {
                var target = mirror.getNode(mutation.id);
                if (!target) {
                    return _this.warnNodeNotFound(d, mutation.id);
                }
                if (_this.fragmentParentMap.has(target)) {
                    target = _this.fragmentParentMap.get(target);
                }
                for (var attributeName in mutation.attributes) {
                    if (typeof attributeName === 'string') {
                        var value = mutation.attributes[attributeName];

                        if (attributeName == 'rr_dataURL') {
                            var ctx = target.getContext('2d');
                            var img = new Image();
                            img.onload = function() { ctx.drawImage(img, 0, 0, img.width, img.height); };
                            img.src = value;
                        } else {

                            if (value !== null) {
                                target.setAttribute(attributeName, value); //5555
                            }
                            else {
                                target.removeAttribute(attributeName);
                            }
                            
                        }

                    }
                }
            });
        };
        Replayer.prototype.applyScroll = function (d) {
            var target = mirror.getNode(d.id);
            if (!target) {
                return this.debugNodeNotFound(d, d.id);
            }
            if (target === this.iframe.contentDocument) {
                this.iframe.contentWindow.scrollTo({
                    top: d.y,
                    left: d.x,
                    behavior: 'smooth',
                });
            }
            else {
                try {
                    target.scrollTop = d.y;
                    target.scrollLeft = d.x;
                }
                catch (error) {
                }
            }
        };
        Replayer.prototype.applyInput = function (d) {
            var target = mirror.getNode(d.id);
            if (!target) {
                return this.debugNodeNotFound(d, d.id);
            }
            try {
                target.checked = d.isChecked;
                target.value = d.text;
            }
            catch (error) {
            }
        };
        Replayer.prototype.legacy_resolveMissingNode = function (map, parent, target, targetMutation) {
            var previousId = targetMutation.previousId, nextId = targetMutation.nextId;
            var previousInMap = previousId && map[previousId];
            var nextInMap = nextId && map[nextId];
            if (previousInMap) {
                var _a = previousInMap, node = _a.node, mutation = _a.mutation;
                parent.insertBefore(node, target);
                delete map[mutation.node.id];
                delete this.legacy_missingNodeRetryMap[mutation.node.id];
                if (mutation.previousId || mutation.nextId) {
                    this.legacy_resolveMissingNode(map, parent, node, mutation);
                }
            }
            if (nextInMap) {
                var _b = nextInMap, node = _b.node, mutation = _b.mutation;
                parent.insertBefore(node, target.nextSibling);
                delete map[mutation.node.id];
                delete this.legacy_missingNodeRetryMap[mutation.node.id];
                if (mutation.previousId || mutation.nextId) {
                    this.legacy_resolveMissingNode(map, parent, node, mutation);
                }
            }
        };
        Replayer.prototype.moveAndHover = function (d, x, y, id) {
            this.mouse.style.left = x + "px";
            this.mouse.style.top = y + "px";
            var target = mirror.getNode(id);
            if (!target) {
                return this.debugNodeNotFound(d, id);
            }
            this.hoverElements(target);
        };
        Replayer.prototype.hoverElements = function (el) {
            var _a;
            (_a = this.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.\\:hover').forEach(function (hoveredEl) {
                hoveredEl.classList.remove(':hover');
            });
            var currentEl = el;
            while (currentEl) {
                if (currentEl.classList) {
                    currentEl.classList.add(':hover');
                }
                currentEl = currentEl.parentElement;
            }
        };
        Replayer.prototype.isUserInteraction = function (event) {
            if (event.type !== exports.EventType.IncrementalSnapshot) {
                return false;
            }
            return (event.data.source > exports.IncrementalSource.Mutation &&
                event.data.source <= exports.IncrementalSource.Input);
        };
        Replayer.prototype.restoreSpeed = function () {
            if (this.noramlSpeed === -1) {
                return;
            }
            var payload = { speed: this.noramlSpeed };
            this.setConfig(payload);
            this.emitter.emit(exports.ReplayerEvents.SkipEnd, payload);
            this.noramlSpeed = -1;
        };
        Replayer.prototype.warnNodeNotFound = function (d, id) {
            if (!this.config.showWarning) {
                return;
            }
            console.warn(REPLAY_CONSOLE_PREFIX, "Node with id '" + id + "' not found in", d);
        };
        Replayer.prototype.debugNodeNotFound = function (d, id) {
            if (!this.config.showDebug) {
                return;
            }
            console.log(REPLAY_CONSOLE_PREFIX, "Node with id '" + id + "' not found in", d);
        };
        return Replayer;
    }());

    var addCustomEvent = record.addCustomEvent;

    exports.Replayer = Replayer;
    exports.addCustomEvent = addCustomEvent;
    exports.mirror = mirror;
    exports.record = record;
    exports.utils = utils;

    return exports;

}({}));

/* rrwebsdk-modules : api  */

var rrwebSDK = (function(factory) {

    var trace = function(i) { console.log('rrwebSDK : ' + i); };

    trace('init ...');
    if (typeof module === 'object' && typeof module.exports === 'object') {
        trace('init ... module mode ...');
        module.exports = factory(trace, rrweb);
    }
    trace('init ... ok');
    return factory(trace, rrweb);
    
}(function(trace, rrweb) {
    return function(options) {

        var status = {
            timer : null,
            events : [],
            stop : true,
            debug : false,
            rrwebStop : null,
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

        var _shieldvconsole = function() {
            var vconsole = document.getElementById('__vconsole');
            if(!vconsole) return;
            if(!vconsole.classList.contains('rr-block')) {
                vconsole.classList.add('rr-block');
                vconsole.classList.add('rr-ignore');
                trace('vconsole shield.');
            }
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
            _shieldvconsole();
            _debug('report ...');
            if (!status.events.length) {
                trace('report ... ignore');
                if (typeof callback == 'function') callback(true);
                return;
            }
            var events = [].concat(status.events); status.events = [];
            var data = JSON.parse(JSON.stringify(cache));
            data.events = JSON.stringify({ events: events });
            data.events = rrwebEncrypt.encrypt('des', data.events, 'e4d56711175fe349def6ed4cba25d3c7');
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
                        if (typeof callback == 'function') callback(true);
                    }else{
                        trace('report ... error (' + xhr.status + ')');
                        status.events = [].concat(events, status.events);
                        if (typeof callback == 'function') callback(false);
                    }
                }
            }
            if (config.reportTimeout && typeof callback == 'function') {
                xhr.timeout = config.reportTimeout * 1000;
                xhr.ontimeout = function (e) {
                    callback(null);
                };
            }
            xhr.send(body);
        }

        var _start = function() {
            if (!status.stop) return;
            status.stop = false;
            status.rrwebStop = rrweb.record({
                emit : function(event) {
                    _debug('rr ... ' + (status.stop ? 'miss' : '+1'));
                    if(!status.stop){
                        status.events.push(event);
                    }
                },
            });
            setTimeout(_report, 500);
            status.timer = setInterval(_report, config.reportTimes * 1000);
        }

        var _stop = function(callback, methodName) {
            status.stop = true;
            if(typeof status.rrwebStop == 'function') status.rrwebStop();
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
            if (data && data.constructor == Object) {
                this.report(data);
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

        this.debug = function(onoff) {
            trace('debug ...');
            status.debug = !!onoff;
            trace('debug ... ' + (status.debug ? 'on' : 'off'));
        };

        this.version = function() {
            var v = '1.2.0';
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
        _shieldvconsole();
        trace('instantiate ... ok');

    };
}));
//export default rrwebSDK;