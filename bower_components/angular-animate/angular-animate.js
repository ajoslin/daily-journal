!function(n,t,a){"use strict";t.module("ngAnimate",["ng"]).factory("$$animateReflow",["$window","$timeout",function(n,t){var a=n.requestAnimationFrame||n.webkitRequestAnimationFrame||function(n){return t(n,10,!1)},e=n.cancelAnimationFrame||n.webkitCancelAnimationFrame||function(n){return t.cancel(n)};return function(n){var t=a(n);return function(){e(t)}}}]).config(["$provide","$animateProvider",function(e,i){function r(n){for(var t=0;t<n.length;t++){var a=n[t];if(a.nodeType==f)return a}}function o(n,t){return r(n)==r(t)}var s=t.noop,u=t.forEach,l=i.$$selectors,f=1,c="$$ngAnimateState",m="ng-animate",d={running:!0};e.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$timeout","$rootScope","$document",function(n,a,e,f,v,p){function g(n){return v(n,0,!1)}function y(n){if(n){var t=[],i={},r=n.substr(1).split(".");(e.transitions||e.animations)&&r.push("");for(var o=0;o<r.length;o++){var s=r[o],u=l[s];u&&!i[s]&&(t.push(a.get(u)),i[s]=!0)}return t}}function C(n,t,a,e,i,o,l){function f(n){if(A(),n===!0)return void S();var t=a.data(c);t&&(t.done=S,a.data(c,t)),d(I,"after",S)}function d(e,i,r){function o(n,t){var a=t+"Complete",i=e[n];i[a]=!0,(i[l]||s)();for(var o=0;o<e.length;o++)if(!e[o][a])return;r()}"after"==i?D():C();var l=i+"End";u(e,function(e,r){var s=function(){o(r,i)};return"before"!=i||"enter"!=n&&"move"!=n?void(e[i]?e[l]=R?e[i](a,t,s):e[i](a,s):s()):void s()})}function p(e){a.triggerHandler("$animate:"+e,{event:n,className:t})}function C(){g(function(){p("before")})}function D(){g(function(){p("after")})}function x(){g(function(){p("close"),l&&l()})}function A(){A.hasBeenRun||(A.hasBeenRun=!0,o())}function S(){if(!S.hasBeenRun){S.hasBeenRun=!0;var n=a.data(c);n&&(R?b(a):(n.closeAnimationTimeout=g(function(){b(a)}),a.data(c,n))),x()}}var k,N,M=r(a);if(M&&(k=M.className,N=k+" "+t),!M||!w(N))return A(),C(),D(),void S();var F=(" "+N).replace(/\s+/g,".");e||(e=i?i.parent():a.parent());var E=y(F),R="addClass"==n||"removeClass"==n,T=a.data(c)||{};if($(a,e)||0===E.length)return A(),C(),D(),void S();var I=[],P=R?!(T.disabled||T.running&&T.structural):!0;if(P&&u(E,function(e){if(!e.allowCancel||e.allowCancel(a,n,t)){var i,r=e[n];"leave"==n?(i=r,r=null):i=e["before"+n.charAt(0).toUpperCase()+n.substr(1)],I.push({before:i,after:r})}}),0===I.length)return A(),C(),D(),void x();var O=" ",B=O+k+O;if(T.running){v.cancel(T.closeAnimationTimeout),b(a),h(T.animations);var q=R&&!T.structural,W=q&&T.className==t&&n!=T.event;T.beforeComplete||W?(T.done||s)(!0):q&&(B="removeClass"==T.event?B.replace(O+T.className+O,O):B+T.className+O)}var j=O+t+O;return"addClass"==n&&B.indexOf(j)>=0||"removeClass"==n&&-1==B.indexOf(j)?(A(),C(),D(),void x()):(a.addClass(m),a.data(c,{running:!0,event:n,className:t,structural:!R,animations:I,done:f}),void d(I,"before",f))}function D(n){var a=r(n);u(a.querySelectorAll("."+m),function(n){n=t.element(n);var a=n.data(c);a&&(h(a.animations),b(n))})}function h(n){var t=!0;u(n,function(n){n.beforeComplete||(n.beforeEnd||s)(t),n.afterComplete||(n.afterEnd||s)(t)})}function b(n){o(n,f)?d.disabled||(d.running=!1,d.structural=!1):(n.removeClass(m),n.removeData(c))}function $(n,t){if(d.disabled)return!0;if(o(n,f))return d.disabled||d.running;do{if(0===t.length)break;var a=o(t,f),e=a?d:t.data(c),i=e&&(!!e.disabled||!!e.running);if(a||i)return i;if(a)return!0}while(t=t.parent());return!0}f.data(c,d),p.$$postDigest(function(){p.$$postDigest(function(){d.running=!1})});var x=i.classNameFilter(),w=x?function(n){return x.test(n)}:function(){return!0};return{enter:function(t,a,e,i){this.enabled(!1,t),n.enter(t,a,e),p.$$postDigest(function(){C("enter","ng-enter",t,a,e,s,i)})},leave:function(t,a){D(t),this.enabled(!1,t),p.$$postDigest(function(){C("leave","ng-leave",t,null,null,function(){n.leave(t)},a)})},move:function(t,a,e,i){D(t),this.enabled(!1,t),n.move(t,a,e),p.$$postDigest(function(){C("move","ng-move",t,a,e,s,i)})},addClass:function(t,a,e){C("addClass",a,t,null,null,function(){n.addClass(t,a)},e)},removeClass:function(t,a,e){C("removeClass",a,t,null,null,function(){n.removeClass(t,a)},e)},enabled:function(n,t){switch(arguments.length){case 2:if(n)b(t);else{var a=t.data(c)||{};a.disabled=!0,t.data(c,a)}break;case 1:d.disabled=!n;break;default:n=!d.disabled}return!!n}}}]),i.register("",["$window","$sniffer","$timeout","$$animateReflow",function(e,i,o,l){function c(n,a){T&&T(),J.push(a);var e=r(n);n=t.element(e),L.push(n);var i=n.data(W),s=i.stagger,f=i.itemIndex*(Math.max(s.animationDelay,s.transitionDelay)||0),c=(i.maxDelay+i.maxDuration)*H;Q=Math.max(Q,(f+c)*K),i.animationCount=U,T=l(function(){u(J,function(n){n()});var n=[],t=U;u(L,function(t){n.push(t)}),o(function(){m(n,t),n=null},Q,!1),J=[],L=[],T=null,z={},Q=0,U++})}function m(n,t){u(n,function(n){var a=n.data(W);a&&a.animationCount==t&&(a.closeAnimationFn||s)()})}function d(n,t){var a=t?z[t]:null;if(!a){var i,r,o,s,l=0,c=0,m=0,d=0;u(n,function(n){if(n.nodeType==f){var t=e.getComputedStyle(n)||{};o=t[N+I],l=Math.max(v(o),l),s=t[N+P],i=t[N+O],c=Math.max(v(i),c),r=t[F+O],d=Math.max(v(r),d);var a=v(t[F+I]);a>0&&(a*=parseInt(t[F+B],10)||1),m=Math.max(a,m)}}),a={total:0,transitionPropertyStyle:s,transitionDurationStyle:o,transitionDelayStyle:i,transitionDelay:c,transitionDuration:l,animationDelayStyle:r,animationDelay:d,animationDuration:m},t&&(z[t]=a)}return a}function v(n){var a=0,e=t.isString(n)?n.split(/\s*,\s*/):[];return u(e,function(n){a=Math.max(parseFloat(n)||0,a)}),a}function p(n){var t=n.parent(),a=t.data(q);return a||(t.data(q,++G),a=G),a+"-"+r(n).className}function g(n,t,a){var e=p(n),i=e+" "+t,r={},o=z[i]?++z[i].total:0;if(o>0){var s=t+"-stagger",l=e+" "+s,f=!z[l];f&&n.addClass(s),r=d(n,l),f&&n.removeClass(s)}a=a||function(n){return n()},n.addClass(t);var c=a(function(){return d(n,i)}),m=Math.max(c.transitionDelay,c.animationDelay),v=Math.max(c.transitionDuration,c.animationDuration);if(0===v)return n.removeClass(t),!1;var g="";return c.transitionDuration>0?y(n):C(n),u(t.split(" "),function(n,t){g+=(t>0?" ":"")+n+"-active"}),n.data(W,{className:t,activeClassName:g,maxDuration:v,maxDelay:m,classes:t+" "+g,timings:c,stagger:r,itemIndex:o}),!0}function y(n){r(n).style[N+P]="none"}function C(n){r(n).style[F]="none 0s"}function D(n){var t=N+P,a=r(n);a.style[t]&&a.style[t].length>0&&(a.style[t]="")}function h(n){var t=F,a=r(n);a.style[t]&&a.style[t].length>0&&(a.style[t]="")}function b(n,t,a){function e(){n.off(v,i),n.removeClass(c),S(n,t);var a=r(n);for(var e in y)a.style.removeProperty(y[e])}function i(n){n.stopPropagation();var t=n.originalEvent||n,e=t.$manualTimeStamp||t.timeStamp||Date.now(),i=parseFloat(t.elapsedTime.toFixed(j));Math.max(e-d,0)>=m&&i>=f&&a()}var o=n.data(W),s=r(n);if(-1==s.className.indexOf(t)||!o)return void a();var u=o.timings,l=o.stagger,f=o.maxDuration,c=o.activeClassName,m=Math.max(u.transitionDelay,u.animationDelay)*K,d=Date.now(),v=E+" "+M,p=o.itemIndex,g="",y=[];if(u.transitionDuration>0){var C=u.transitionPropertyStyle;-1==C.indexOf("all")&&(g+=R+"transition-property: "+C+";",g+=R+"transition-duration: "+u.transitionDurationStyle+";",y.push(R+"transition-property"),y.push(R+"transition-duration"))}if(p>0){if(l.transitionDelay>0&&0===l.transitionDuration){var D=u.transitionDelayStyle;g+=R+"transition-delay: "+$(D,l.transitionDelay,p)+"; ",y.push(R+"transition-delay")}l.animationDelay>0&&0===l.animationDuration&&(g+=R+"animation-delay: "+$(u.animationDelayStyle,l.animationDelay,p)+"; ",y.push(R+"animation-delay"))}if(y.length>0){var h=s.getAttribute("style")||"";s.setAttribute("style",h+" "+g)}return n.on(v,i),n.addClass(c),o.closeAnimationFn=function(){e(),a()},e}function $(n,t,a){var e="";return u(n.split(","),function(n,i){e+=(i>0?",":"")+(a*t+parseInt(n,10))+"s"}),e}function x(n,t,a){return g(n,t,a)?function(a){a&&S(n,t)}:void 0}function w(n,t,a){return n.data(W)?b(n,t,a):(S(n,t),void a())}function A(n,t,a){var e=x(n,t);if(!e)return void a();var i=e;return c(n,function(){D(n),h(n),i=w(n,t,a)}),function(n){(i||s)(n)}}function S(n,t){n.removeClass(t),n.removeData(W)}function k(n,a){var e="";return n=t.isArray(n)?n:n.split(/\s+/),u(n,function(n,t){n&&n.length>0&&(e+=(t>0?" ":"")+n+a)}),e}var N,M,F,E,R="";n.ontransitionend===a&&n.onwebkittransitionend!==a?(R="-webkit-",N="WebkitTransition",M="webkitTransitionEnd transitionend"):(N="transition",M="transitionend"),n.onanimationend===a&&n.onwebkitanimationend!==a?(R="-webkit-",F="WebkitAnimation",E="webkitAnimationEnd animationend"):(F="animation",E="animationend");var T,I="Duration",P="Property",O="Delay",B="IterationCount",q="$$ngAnimateKey",W="$$ngAnimateCSS3Data",j=3,H=1.5,K=1e3,U=0,z={},G=0,J=[],L=[],Q=0;return{allowCancel:function(n,a,e){var i=(n.data(W)||{}).classes;if(!i||["enter","leave","move"].indexOf(a)>=0)return!0;var o=n.parent(),s=t.element(r(n).cloneNode());s.attr("style","position:absolute; top:-9999px; left:-9999px"),s.removeAttr("id"),s.empty(),u(i.split(" "),function(n){s.removeClass(n)});var l="addClass"==a?"-add":"-remove";s.addClass(k(e,l)),o.append(s);var f=d(s);return s.remove(),Math.max(f.transitionDuration,f.animationDuration)>0},enter:function(n,t){return A(n,"ng-enter",t)},leave:function(n,t){return A(n,"ng-leave",t)},move:function(n,t){return A(n,"ng-move",t)},beforeAddClass:function(n,t,a){var e=x(n,k(t,"-add"),function(a){n.addClass(t);var e=a();return n.removeClass(t),e});return e?(c(n,function(){D(n),h(n),a()}),e):void a()},addClass:function(n,t,a){return w(n,k(t,"-add"),a)},beforeRemoveClass:function(n,t,a){var e=x(n,k(t,"-remove"),function(a){var e=n.attr("class");n.removeClass(t);var i=a();return n.attr("class",e),i});return e?(c(n,function(){D(n),h(n),a()}),e):void a()},removeClass:function(n,t,a){return w(n,k(t,"-remove"),a)}}}])}])}(window,window.angular);