!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=fabric},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o);const i={};function a(e,t,n){const o=n.getPointer(t.e);return{radius:5,fill:"#ffffff",stroke:"#333333",strokeWidth:.5,left:o.x,top:o.y,selectable:!0,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",id:e,objectCaching:!1}}i.newPolygon={stroke:"#333333",strokeWidth:.5,fill:"red",opacity:1,perPixelTargetFind:!0,hasBorders:!1,hasControls:!1,lockMovementY:!0,lockMovementX:!0,shapeName:"polygon"},i.newTempPolygon={stroke:"#333333",strokeWidth:1,fill:"#cccccc",opacity:.3,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1},i.newLine={strokeWidth:2,fill:"#999999",stroke:"#999999",class:"line",originX:"center",originY:"center",selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1},i.firstCircle={fill:"red"},i.newCircle=a;let l=!1,s=null,c=null;function u(e,t,n,o){s=n,c=o;const r=document.getElementById("labelNamePopUp");r.style.display="block";const i=document.getElementById("canvas-wrapper").getBoundingClientRect(),a=i.top,u=i.left;r.style.top=`${t+a}px`,r.style.left=`${e+u}px`,l=!0}function d(){l&&(c.remove(s),l=!1,document.getElementById("labelNamePopUp").style.display="none")}function f(e){e.discardActiveObject(),e.renderAll(),e.forEachObject(e=>{e.selectable=!1}),e.defaultCursor="crosshair",e.hoverCursor="crosshair"}function h(e){e.defaultCursor="default",e.hoverCursor="move",e.forEachObject(e=>{e.selectable=!0})}window.labelShape=function(){const e=document.getElementById("label-title").value;document.getElementById("labelNamePopUp").style.display="none";const t=new r.a.Text(e,function(e){return{fontSize:10,fill:"yellow",left:e.left,top:e.top,width:e.width,height:e.height}}(s));if("bndBoxTemp"===s.shapeName){const e=new r.a.Group([s,t],function(e){return{left:e.left,top:e.top,width:e.width,height:e.height,stroke:"rgba(255,0,0)",strokeWidth:2,fill:"rgba(255,0,0,0.1)"}}(s));c.add(e)}else if("polygon"===s.shapeName){const e=new r.a.Group([s,t],i.newPolygon);c.add(e)}l=!0,c.remove(s)};let g=null,m=!1,p=!1;const w={};function b(){d(),g.remove(g.getActiveObject())}const y=99,v=999999;let x=null,C=[],j=[],P=!0,k=null,_=!1;function B(){j.forEach(e=>{x.remove(e)}),x.remove(_).remove(k)}function O(e){e.target&&e.target.id&&e.target.id===C[0].id&&function(e){const t=[];C.forEach(e=>{t.push({x:e.left,y:e.top}),x.remove(e)}),B();const n=new r.a.Polygon(t,i.newPolygon);x.add(n),k=null,_=null,P=!1;const o=x.getPointer(e.e);u(o.x,o.y,n,x,i.newPolygon),h(x)}(e),P&&function(e){const t=Math.floor(Math.random()*(v-y+1))+y,n=(new Date).getTime()+t,o=x.getPointer(e.e),a=new r.a.Circle(i.newCircle(n,e,x));0===C.length&&a.set(i.firstCircle);let l=[o.x,o.y,o.x,o.y];const s=new r.a.Line(l,i.newLine);if(_){(l=_.get("points")).push({x:o.x,y:o.y});const e=new r.a.Polygon(l,i.newTempPolygon);x.remove(_),x.add(e),_=e,x.renderAll()}else{const e=[{x:o.x,y:o.y}],t=new r.a.Polygon(e,i.newTempPolygon);_=t,x.add(t)}k=s,C.push(a),j.push(s),x.add(s),x.add(a),x.selection=!1}(e)}function A(e){x=e,P=!0,C.forEach(e=>{x.remove(e)}),B(),C=[],j=[],_=null,k=null,d(),x.discardActiveObject(),f(x)}let L=null;function W(){L.on("mouse:down",()=>{!function(){if(m){p=!0;const e=g.getPointer(g.e);w.origX=e.x,w.origY=e.y,w.rect=new r.a.Rect(function(e,t){return{left:e.origX,top:e.origY,width:t.x-e.origX,height:t.y-e.origY,stroke:"rgba(255,0,0)",strokeWidth:2,fill:"rgba(255,0,0,0)",shapeName:"bndBoxTemp"}}(w,e)),g.add(w.rect)}}()}),L.on("mouse:over",e=>{!function(e){e.target&&"bndBox"===e.target.shapeName&&(e.target._objects[0].set("fill","rgba(255,0,0,0.2)"),g.renderAll())}(e)}),L.on("mouse:out",e=>{!function(e){e.target&&"bndBox"===e.target.shapeName&&(e.target._objects[0].set("fill","rgba(255,0,0,0"),g.renderAll())}(e)}),L.on("mouse:move",e=>{!function(e){if(!p)return;const t=g.getPointer(e.e);w.origX>t.x&&w.rect.set({left:Math.abs(t.x)}),w.origY>t.y&&w.rect.set({top:Math.abs(t.y)}),w.rect.set({width:Math.abs(w.origX-t.x)}),w.rect.set({height:Math.abs(w.origY-t.y)}),g.renderAll()}(e)}),L.on("mouse:up",e=>{!function(e){if(p){m=!1,p=!1,w.rect.setCoords(),w.rect.selectable=!1,h(g);const t=g.getPointer(e.e);u(t.x,t.y,w.rect,g)}}(e)})}function E(){L.on("mouse:down",e=>{O(e)}),L.on("mouse:move",e=>{!function(e){if(k&&"line"===k.class){const t=x.getPointer(e.e);k.set({x2:t.x,y2:t.y});const n=_.get("points");n[C.length]={x:t.x,y:t.y},_.set({points:n}),x.renderAll()}x.renderAll()}(e)}),L.on("mouse:over",e=>{e.target&&e.target.selectable?L.hoverCursor="move":L.hoverCursor="crosshair"})}function M(){L.__eventListeners&&(L.__eventListeners["mouse:down"]=[],L.__eventListeners["mouse:over"]=[],L.__eventListeners["mouse:out"]=[],L.__eventListeners["mouse:move"]=[],L.__eventListeners["mouse:up"]=[])}function N(){M(),(g=L).backgroundImage&&(d(),m=!0,g.discardActiveObject(),f(g)),W()}function U(){M(),A(L),E()}const I={uploaded:!1,name:null},T={};let X=null;function Y(e,t){t?function(e,t){X.setWidth(t.width),X.setHeight(t.height),r.a.Image.fromURL(e.src,e=>{X.setBackgroundImage(e,X.renderAll.bind(X),{scaleX:X.width/e.width,scaleY:X.height/e.height})})}(e,t):function(e){X.setWidth(e.width),X.setHeight(e.height),X.setBackgroundColor({source:e.src},()=>{X.renderAll()})}(e)}function $(e){const t={},n=T.maximumCanvasWidth/e.width;return t.width=T.maximumCanvasWidth,t.height=e.height*n,t}function H(){I.uploaded=!0;const e=this;if(T.maximumCanvasHeight<e.height){let t=function(e){const t={},n=T.maximumCanvasHeight/e.height;return t.height=T.maximumCanvasHeight,t.width=e.width*n,t}(e);T.maximumCanvasWidth<t.width&&(t=$(t)),Y(e,t)}else if(T.maximumCanvasWidth<e.width){Y(e,$(e))}else Y(e)}function R(e){const t=new Image;t.src=e.target.result,t.onload=H}function S(e){if(d(),e.files&&e.files[0]){const t=new FileReader;I.name=e.files[0].name,t.onload=R,t.readAsDataURL(e.files[0])}}function z(e){X=e,T.maximumCanvasHeight=window.innerHeight-54,T.maximumCanvasWidth=window.innerWidth-110}function D(e){return function e(t){let n="";return Object.keys(t).forEach(o=>{"object"==typeof t[o]?n+=`<${o}>${e(t[o])}</${o}>`:n+=`<${o}>${t[o]}</${o}>`}),n}(e)}let F=null;function G(e){const t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});return t.setAttribute("href",window.URL.createObjectURL(n)),t.setAttribute("download",`${new RegExp("^([^.]+)").exec(I.name)[0]}.xml`),t.dataset.downloadurl=["text/plain",t.download,t.href].join(":"),t.draggable=!0,t.classList.add("dragout"),t}function q(){if(d(),F.backgroundColor){!function(e){G(e).click()}(D(function(e,t){const n={};return n.annotations=function(e,t){return{folder:"Unknown",filename:t.name,path:"Unknown",source:{database:"Unknown"},size:{width:e.getWidth(),height:e.getHeight(),depth:1},segmented:0}}(e,t),n.annotations.object=function(e){let t={};return e.forEachObject(e=>{const n=e._objects[0],o=e._objects[1].text;t={name:o,pose:"Unspecified",truncated:1,difficult:0,bndbox:{xmin:n.left,ymin:n.top,xmax:n.left+n.width,ymax:n.top+n.height}}}),t}(e),n}(F,I)))}}!function(){const e=new r.a.Canvas("c",{selection:!1});r.a.Object.prototype.transparentCorners=!1,L=e,z(e),function(e){F=e}(e)}(),window.createNewBndBox=N,window.createNewPolygon=U,window.removeBndBox=b,window.uploadImage=S,window.downloadXML=q}]);