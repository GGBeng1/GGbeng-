(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0f4a":function(t,e,n){},5331:function(t,e,n){},5679:function(t,e,n){"use strict";(function(t){n("34ef");var o=n("2909"),i=(n("cadf"),n("551c"),n("097d"),n("a02b")),s=(n("a7fc"),n("6411"));e["a"]={metaInfo:{title:"GGbeng-UI",meta:[{name:"GGbeng-UI",content:"ggbeng-ui,bbeng,GGbeng,ggbeng-ui,bbeng,GGbeng,ggbeng-ui,bbeng,GGbeng,ggbeng-ui,bbeng,GGbeng"}]},components:{ball:i["a"],qrcode:s["default"]},data:function(){return{showQrCode:!1,placeholder:"写点啥，老铁",connected:!1,openFullscreen:!1,participants:[{id:"user1",name:"GGbeng",imageUrl:"http://localhost:3000/g.png"},{id:"me",name:"You",imageUrl:"http://localhost:3000/you.png"}],titleImageUrl:"http://localhost:3000/ggbeng.png",messageList:[],newMessagesCount:0,isChatOpen:!1,showTypingIndicator:"",colors:{header:{bg:"#4e8cff",text:"#ffffff"},launcher:{bg:"#4e8cff"},messageList:{bg:"#ffffff"},sentMessage:{bg:"#4e8cff",text:"#ffffff"},receivedMessage:{bg:"#eaeaea",text:"#222222"},userInput:{bg:"#f4f7f9",text:"#565867"}},alwaysScrollToBottom:!0,messageStyling:!0,msg:{}}},methods:{showLogin:function(){this.openFullscreen=!0},showQrCodeDialog:function(){this.showQrCode=!0},closeFullscreenDialog:function(){this.openFullscreen=!1,this.showQrCode=!1},sendMessage:function(t){this.showTypingIndicator="",t.text?(this.newMessagesCount=this.isChatOpen?this.newMessagesCount:this.newMessagesCount+1,this.onMessageWasSent({author:"user1",type:"text",data:t},!0)):t.emoji?this.onMessageWasSent({author:"user1",type:"emoji",data:t},!0):t.file},onMessageWasSent:function(t,e){e?e&&(this.messageList=Object(o["a"])(this.messageList).concat([t])):(this.$socket.emit("messages",t),this.messageList=Object(o["a"])(this.messageList).concat([t]))},load:function(t){this.$socket.emit("messages",t)},toBuffer:function(e){for(var n=new t(e.byteLength),o=new Uint8Array(e),i=0;i<n.length;++i)n[i]=o[i];return n},openChat:function(){this.isChatOpen=!0,this.newMessagesCount=0},closeChat:function(){this.isChatOpen=!1}},sockets:{connect:function(){console.log("socket connected"),this.connected=!0},messages:function(t){this.sendMessage(t)}},mounted:function(){var t=this;this.showTypingIndicator="1";var e=document.getElementById("contents");e.style.height=window.innerHeight+"px",setTimeout(function(){var e={type:"load",author:"me",data:{text:"hi,请提交符合规范的bug内容"}};t.load(e)},3e3)},created:function(){this.$on("zip",function(){console.log("zip")})},watch:{isChatOpen:function(t){var e=this;t&&(this.showTypingIndicator="1",setTimeout(function(){var t={type:"load",author:"me",data:{text:"hi,当你看见此条内容说明我不在线,请务必提交后留下邮箱."}};e.load(t)},1500))}}}}).call(this,n("b639").Buffer)},"63d9":function(t,e,n){n("ec30")("Float32",4,function(t){return function(e,n,o){return t(this,e,n,o)}})},a02b:function(t,e,n){"use strict";var o,i,s,a,r,c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"100%"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],attrs:{id:"vertexshader"}},[t._v("\n    attribute float scale; void main() { vec4 mvPosition = modelViewMatrix *\n    vec4( position, 1.0 ); gl_PointSize = scale * ( 300.0 / - mvPosition.z );\n    gl_Position = projectionMatrix * mvPosition; }\n  ")]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],attrs:{id:"fragmentshader"}},[t._v("\n    uniform vec3 color; void main() { if ( length( gl_PointCoord - vec2( 0.5,\n    0.5 ) ) > 0.475 ) discard; gl_FragColor = vec4( color, 1.0 ); }\n  ")]),n("div",{staticStyle:{height:"100%",width:"100%"},attrs:{id:"container"}})])},l=[],u=(n("63d9"),100),d=50,h=50,g=0,f=0,m=window.innerWidth/2,p=window.innerHeight/2,v={name:"ball",data:function(){return{isShow:!1}},methods:{init:function(){o=document.getElementById("container"),i=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e4),i.position.z=1e3,s=new THREE.Scene;for(var t=d*h,e=new Float32Array(3*t),n=new Float32Array(t),c=0,l=0,g=0;g<d;g++)for(var f=0;f<h;f++)e[c]=g*u-d*u/2,e[c+1]=0,e[c+2]=f*u-h*u/2,n[l]=1,c+=3,l++;var m=new THREE.BufferGeometry;m.addAttribute("position",new THREE.BufferAttribute(e,3)),m.addAttribute("scale",new THREE.BufferAttribute(n,1));var p=new THREE.ShaderMaterial({uniforms:{color:{value:new THREE.Color(621531)}},vertexShader:document.getElementById("vertexshader").textContent,fragmentShader:document.getElementById("fragmentshader").textContent});r=new THREE.Points(m,p),s.add(r),a=new THREE.WebGLRenderer({antialias:!0}),a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),o.appendChild(a.domElement),o.addEventListener("mousemove",this.onDocumentMouseMove,!1),o.addEventListener("touchstart",this.onDocumentTouchStart,{passive:!1}),o.addEventListener("touchmove",this.onDocumentTouchMove,{passive:!1}),window.addEventListener("resize",this.onWindowResize,!1)},onWindowResize:function(){m=window.innerWidth/2,p=window.innerHeight/2,i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)},onDocumentMouseMove:function(t){f=t.clientX-m,t.clientY-p},onDocumentTouchStart:function(t){1===t.touches.length&&(t.preventDefault(),f=t.touches[0].pageX-m,t.touches[0].pageY-p)},onDocumentTouchMove:function(t){1===t.touches.length&&(t.preventDefault(),f=t.touches[0].pageX-m,t.touches[0].pageY-p)},animate:function(){requestAnimationFrame(this.animate),this.render()},render:function(){i.position.x+=.05*(f-i.position.x),i.position.y=364,i.lookAt(s.position);for(var t=r.geometry.attributes.position.array,e=r.geometry.attributes.scale.array,n=0,o=0,c=0;c<d;c++)for(var l=0;l<h;l++)t[n+1]=50*Math.sin(.3*(c+g))+50*Math.sin(.5*(l+g)),e[o]=8*(Math.sin(.3*(c+g))+1)+8*(Math.sin(.5*(l+g))+1),n+=3,o++;r.geometry.attributes.position.needsUpdate=!0,r.geometry.attributes.scale.needsUpdate=!0,a.render(s,i),a.setClearColor("#13194B",1),g+=.1}},mounted:function(){this.init(),this.animate()}},b=v,w=(n("d34b"),n("2877")),y=Object(w["a"])(b,c,l,!1,null,null,null);y.options.__file="threeball.vue";e["a"]=y.exports},a7fc:function(t,e){!function(t){var e,n='<svg><symbol id="icon-github-fill" viewBox="0 0 1024 1024"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"  ></path></symbol></svg>',o=(e=document.getElementsByTagName("script"))[e.length-1].getAttribute("data-injectcss");if(o&&!t.__iconfont__svg__cssinject__){t.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}!function(e){if(document.addEventListener)if(~["complete","loaded","interactive"].indexOf(document.readyState))setTimeout(e,0);else{var n=function t(){document.removeEventListener("DOMContentLoaded",t,!1),e()};document.addEventListener("DOMContentLoaded",n,!1)}else document.attachEvent&&(o=e,i=t.document,s=!1,a=function(){s||(s=!0,o())},(r=function(){try{i.documentElement.doScroll("left")}catch(e){return void setTimeout(r,50)}a()})(),i.onreadystatechange=function(){"complete"==i.readyState&&(i.onreadystatechange=null,a())});var o,i,s,a,r}(function(){var t,e,o,i,s,a;(t=document.createElement("div")).innerHTML=n,n=null,(e=t.getElementsByTagName("svg")[0])&&(e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.width=0,e.style.height=0,e.style.overflow="hidden",o=e,(i=document.body).firstChild?(s=o,(a=i.firstChild).parentNode.insertBefore(s,a)):i.appendChild(o))})}(window)},d34b:function(t,e,n){"use strict";var o=n("0f4a"),i=n.n(o);i.a},f26d:function(t,e,n){"use strict";var o=n("5331"),i=n.n(o);i.a},f820:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"admin"},[n("div",{staticClass:"header"},[n("p",{staticClass:"title"},[t._v("GGbeng-UI")]),n("p",{staticClass:"text1"},[t._v("基于vue.js的多端高质量UI组件")]),n("p",{staticClass:"text1"},[t._v("~PC端免登陆!~")]),n("div",{staticClass:"list"},[n("a",{attrs:{href:"https://ggbeng1.github.io/GGbengUI/"}},[t._v("指南")]),n("a",{attrs:{href:"https://ggbeng1.github.io/GGbengUI/baseComponents/"}},[t._v("组件")]),n("a",{attrs:{href:"https://ggbeng1.github.io/GGbengUI/baseComponents/base/updata.html"}},[t._v("更新日志")]),n("a",{attrs:{href:"https://github.com/GGBeng1/GGbengUI"}},[n("svg",{staticClass:"icon",staticStyle:{height:"17px",width:"17px"},attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-github-fill"}})]),t._v("GitHub\n      ")]),n("a",{attrs:{href:"#"},on:{click:t.showLogin}},[t._v("bug提交")]),n("a",{attrs:{href:"http://blog.ggbeng.xyz"}},[t._v("博客")]),n("a",{attrs:{href:"#"},on:{click:t.showQrCodeDialog}},[t._v("二维码转换")])])]),n("div",{staticClass:"content",attrs:{id:"contents"}},[n("ball")],1),n("mu-dialog",{attrs:{width:"360",transition:"slide-bottom",fullscreen:"",open:t.openFullscreen},on:{"update:open":function(e){t.openFullscreen=e}}},[n("mu-appbar",{attrs:{color:"primary",title:"GGbeng-UI BUG提交"}},[n("mu-button",{attrs:{slot:"left",icon:""},on:{click:t.closeFullscreenDialog},slot:"left"},[n("mu-icon",{attrs:{value:"close"}})],1),n("mu-button",{attrs:{slot:"right",flat:""},on:{click:t.closeFullscreenDialog},slot:"right"},[t._v("Done")])],1),n("div",{staticStyle:{padding:"24px","padding-top":"120px"}},[n("mu-container",[n("mu-card",{staticStyle:{width:"100%","max-width":"750px",margin:"0 auto"}},[n("mu-card-header",{attrs:{title:"GGbeng","sub-title":"cmz"}},[n("mu-avatar",{attrs:{slot:"avatar"},slot:"avatar"},[t._v("G")])],1),n("mu-card-title",{attrs:{title:"感谢您选择GGbeng-ui","sub-title":"愿您开发一切顺利➡_➡"}}),n("mu-card-text",[t._v("ggbeng-ui刚刚起步，有许多不完善的地方，希望开发者多多提出宝贵的意见。\n            "),n("br"),t._v("ggbeng-ui近期会有大动作，pc端和移动端的分离，小程序端的开发，更多的组件。\n            "),n("br"),t._v("自始至终，ggbeng-UI的开发都是我一个人，难免有些纰漏，希望开发者面对BUG不要紧张，只需提交即可，我会在最快的时间内回复。\n            "),n("br"),n("span",{staticStyle:{color:"orangered"}},[t._v("提交规范：")]),n("br"),n("span",{staticStyle:{color:"orangered"}},[t._v("\n              bug场景+组件名+相应部分源码/或者上传\n              "),n("span",{staticStyle:{color:"#000"}},[t._v(".zip")]),t._v("文件不大于\n              "),n("span",{staticStyle:{color:"#000"}},[t._v("800kb")]),t._v("！\n            ")]),n("br"),n("span",{staticStyle:{color:"orangered"}},[t._v("\n              上传文件务必压缩为\n              "),n("span",{staticStyle:{color:"#000"}},[t._v(".zip")]),t._v("的文件，将场景及报错截图，源码放入即可\n            ")])]),n("mu-card-actions")],1)],1),n("beautiful-chat",{attrs:{participants:t.participants,titleImageUrl:t.titleImageUrl,onMessageWasSent:t.onMessageWasSent,messageList:t.messageList,newMessagesCount:t.newMessagesCount,isOpen:t.isChatOpen,close:t.closeChat,open:t.openChat,showEmoji:!0,showFile:!0,showTypingIndicator:t.showTypingIndicator,colors:t.colors,alwaysScrollToBottom:t.alwaysScrollToBottom,messageStyling:t.messageStyling,placeholder:t.placeholder}})],1)],1),n("mu-dialog",{attrs:{width:"360",transition:"slide-bottom",fullscreen:"",open:t.showQrCode},on:{"update:open":function(e){t.showQrCode=e}}},[n("mu-appbar",{attrs:{color:"primary",title:"GGbeng-UI Qr转换"}},[n("mu-button",{attrs:{slot:"left",icon:""},on:{click:t.closeFullscreenDialog},slot:"left"},[n("mu-icon",{attrs:{value:"close"}})],1),n("mu-button",{attrs:{slot:"right",flat:""},on:{click:t.closeFullscreenDialog},slot:"right"},[t._v("Done")])],1),n("qrcode")],1)],1)},i=[],s=n("5679"),a=s["a"],r=(n("f26d"),n("2877")),c=Object(r["a"])(a,o,i,!1,null,null,null);c.options.__file="About.vue";e["default"]=c.exports}}]);
