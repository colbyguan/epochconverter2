(this.webpackJsonpepochconverter=this.webpackJsonpepochconverter||[]).push([[0],{11:function(e,t,n){},12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(1),c=n.n(a),r=n(5),o=n.n(r),i=(n(11),n(2)),l=(n.p,n(12),function(e){return Object(s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",width:"20px",height:"20px",className:"transform transition mt-0.5 text-gray-600 group-hover:text-black group-hover:scale-110",children:Object(s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})})}),d=n(4),u=n.n(d),j=function(e){return e<0?"border-red-500":0===e?"border-gray-300":"border-green-500"},b=function(e,t){return t<0?"bad input":e-t},h=function(e){var t=e.hovered,n=(e.ts,e.alignLeft);return Object(s.jsxs)("div",{onClick:function(){console.log(e.ts),u()(e.ts),e.handleCopySuccess(e.ts)},className:"group border w-full cursor-pointer hover:bg-blue-200 flex flex-row my-1 px-2 py-1 "+(t?"bg-yellow-300 rounded-none border-yellow-300 ":e.borderColor+" rounded-md ")+(t&&n?"rounded-l-md ":"rounded-r-md"),children:[t?"":Object(s.jsx)(l,{}),Object(s.jsx)("div",{className:"w-full "+(t&&n?"text-right":""),children:e.ts+(t&&n?" : ":"")})]})},m=function(e){var t=j(e.startOffset),n=j(e.endOffset);!0===e.disableBorder&&(t="border-white",n="border-white");var c=Object(a.useState)(!1),r=Object(i.a)(c,2),o=r[0],d=r[1],m=b(e.now,e.startOffset),x=b(e.now,e.endOffset);return Object(s.jsxs)("div",{className:"grid grid-cols-3 px-2 "+(o?"gap-0":"gap-2"),children:[Object(s.jsxs)("div",{onMouseEnter:function(e){d(!0)},onMouseLeave:function(e){d(!1)},onClick:function(){var t=m+":"+x;u()(t),e.handleCopySuccess(t)},className:"group cursor-pointer hover:bg-yellow-200 rounded-md flex flex-row m-1 px-2 py-1",children:[Object(s.jsx)(l,{}),"start:end"]}),Object(s.jsx)(h,{borderColor:t,alignLeft:!0,ts:m,hovered:o,handleCopySuccess:e.handleCopySuccess,handleCopyFail:e.handleCopyFail}),Object(s.jsx)(h,{borderColor:n,ts:x,hovered:o,handleCopySuccess:e.handleCopySuccess,handleCopyFail:e.handleCopyFail})]})},x={s:1,m:60,h:3600,d:86400},O=function(e){if(console.log(e),e.length<3)return 0;var t=e.charAt(e.length-1);if(t in x){var n=e.substring(1,e.length-1);return x[t]*n}return-1},p=["both","millis","seconds"],f=["page load","realtime"];var v=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=(t[0],t[1]),c=Object(a.useState)(""),r=Object(i.a)(c,2),o=(r[0],r[1]),l=Object(a.useState)(0),d=Object(i.a)(l,2),u=d[0],j=d[1],b=Object(a.useState)(0),h=Object(i.a)(b,2),x=h[0],v=h[1],g=Object(a.useState)(0),y=Object(i.a)(g,2),w=y[0],C=(y[1],Object(a.useState)(0)),N=Object(i.a)(C,2),S=(N[0],N[1],Object(a.useState)("hello")),F=Object(i.a)(S,2),k=F[0],L=F[1],T=Object(a.useState)("white"),_=Object(i.a)(T,2),M=_[0],B=_[1],E=Object(a.useState)(!1),D=Object(i.a)(E,2),P=D[0],I=D[1],J=Object(a.useState)(!1),U=Object(i.a)(J,2),z=U[0],A=U[1],H=Object(a.useState)([]),V=Object(i.a)(H,2),W=V[0],q=V[1],G=Object(a.useState)(Math.round(Date.now()/1e3)),K=Object(i.a)(G,2),Q=K[0],R=(K[1],new Date(0));R.setUTCSeconds(Q);var X=R.toLocaleString(),Y=function(e){L("Copied "+e),B("green"),I(!0),A(!1),"hello"===k?(I(!1),A(!0)):setTimeout((function(){I(!1),A(!0)}),150),W.forEach((function(e){clearTimeout(e)})),(W=[]).push(setTimeout((function(){I(!0),A(!1)}),3e3)),q(W)},Z=function(e){L("Fail to copy "+e),B("red")};return Object(s.jsx)("div",{className:"container mx-auto",children:Object(s.jsxs)("div",{className:"max-w-xl mx-auto",children:[Object(s.jsx)("div",{className:"mt-5 h-auto w-full p-4 my-4 mx-auto rounded-md text-center text-xl border text-white bg-"+M+"-500 "+(P?"opacity-0 ":"")+"transition transform duration-300  "+(z?"translate-y-0 opacity-1 ":"-translate-y-8 opacity-0"),children:k}),Object(s.jsxs)("div",{className:"vspace",children:[Object(s.jsx)("span",{className:"now",children:Q})," or ",Object(s.jsx)("span",{className:"now",children:X}),' as the "now" time']}),Object(s.jsxs)("div",{className:"vspace",children:[Object(s.jsx)("div",{className:"inline-flex mr-1",children:"Show units: "}),Object(s.jsx)("div",{className:"cursor-pointer inline-flex shadow-sm -space-x-px",children:p.map((function(e,t){return Object(s.jsx)("a",{className:"option-btn "+(t===w?"active":""),children:e})}))})]}),Object(s.jsxs)("div",{className:"vspace",children:[Object(s.jsx)("div",{className:"inline-flex mr-1",children:'Use "now" time of: '}),Object(s.jsx)("div",{className:"cursor-pointer inline-flex shadow-sm -space-x-px",children:f.map((function(e,t){return Object(s.jsx)("a",{className:"option-btn "+(t===w?"active":""),children:e})}))})]}),Object(s.jsxs)("div",{className:"card-container",children:[Object(s.jsxs)("div",{className:"grid grid-cols-3 gap-2",children:[Object(s.jsx)("div",{}),Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"start_time",className:"block text-sm font-medium text-gray-700",children:"Start time"}),Object(s.jsx)("input",{type:"text",name:"start_time",id:"start_time",className:"textinput",onChange:function(e){n(e.target.value),j(O(e.target.value))}})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"end_time",className:"block text-sm font-medium text-gray-700",children:"End time"}),Object(s.jsx)("input",{type:"text",name:"end_time",id:"end_time",className:"textinput",onChange:function(e){o(e.target.value),v(O(e.target.value))}})]})]}),Object(s.jsx)(m,{now:Q,startOffset:u,endOffset:x,handleCopySuccess:Y,handleCopyFail:Z}),Object(s.jsx)(m,{now:1e3*Q,startOffset:1e3*u,endOffset:1e3*x,handleCopySuccess:Y,handleCopyFail:Z})]}),Object(s.jsx)("div",{className:"text-lg font-medium leading-6 text-gray-900 mt-5",children:"Previous timestamps"}),Object(s.jsx)("div",{className:"card-container",children:"Feature coming soon"})]})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),c(e),r(e)}))};o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(v,{})}),document.getElementById("root")),g()}},[[14,1,2]]]);
//# sourceMappingURL=main.d506e8d9.chunk.js.map