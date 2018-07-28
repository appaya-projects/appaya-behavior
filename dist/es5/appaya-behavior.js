!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=4)}([function(e,t,r){"use strict";r.d(t,"a",function(){return n});class n{constructor(e,t,r){this.element=e,this._options=t,this.children=r,this.options={}}beforeInit(){this.mergeOptions(this._options)}mergeOptions(e){for(let e in this.defaultOptions)this.options[e]=this.defaultOptions[e];for(let t in e)this.options[t]=e[t]}addChildren(e,t){this.children[e]=t}removeChildren(e){delete this.children[e]}}},,,,function(e,t,r){"use strict";r.r(t);class n{constructor(e,t={}){this.behaviors=e,this.options=t}initializeBehaviors(){const e=document.querySelectorAll("[appaya-behavior]"),t=[];for(let r=0;r<e.length;r++){const n=e[r],o=n.getAttribute("appaya-behavior");if(null==o)continue;const i=o.split(";");for(const e of this.behaviors.filter(e=>i.indexOf(e.behaviorName)>=0)){const r=this.createInstance(n,e);t.push(r)}n.removeAttribute("appaya-behavior")}return t}checkBehaviors(){for(const e of this.behaviors)null==e.behaviorName&&console.warn('Null "behaviorName" on '+e.name)}createInstance(e,t){return new t(e,this.parseOptions(e),this.parseChildren(e,t))}parseOptions(e){const t=e.dataset,r=t.options;let n={};r&&this.options[r]&&(n=this.options[r]);for(let r in t){const o=t[r];let i=o;switch(o){case"true":i=!0;break;case"false":i=!1;break;default:isNaN(parseInt(i))||(i=parseInt(i))}n[r]=i;try{delete e.dataset[r]}catch(e){console.warn(e)}}return n}parseChildren(e,t){let r={};const n=e.querySelectorAll(`[${t.behaviorName}-child]`);for(let e=0;e<n.length;e++){const o=n[e],i=o.getAttribute(`${t.behaviorName}-child`);if(!i)continue;const s=r[i];s?Array.isArray(s)?s.push(o):r[i]=[s,o]:r[i]=o,o.removeAttribute(`${t.behaviorName}-child`)}return r}}function o(e,t={}){const r=new n(e,t),o=r.initializeBehaviors();r.checkBehaviors();for(let e of o)e.beforeInit(),e.init();return o}var i=r(0);r.d(t,"BehaviorBootstrap",function(){return o}),r.d(t,"Behavior",function(){return i.a})}]);
//# sourceMappingURL=appaya-behavior.js.map