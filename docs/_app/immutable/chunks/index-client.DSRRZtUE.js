import{m as p,x as v,n as u,y as _,v as l,z as h,E as y,H as g,A as k,B as A,C as d,w as E,d as i,D as w,b as R,F as C,e as D}from"./runtime.BrVvZwPA.js";function b(e){throw new Error("lifecycle_outside_component")}function H(e,n,o,s=null,a=!1){l&&h();var t=e,f=null,c=null,r=null,x=a?y:0;p(()=>{if(r===(r=!!n()))return;let m=!1;if(l){const T=t.data===g;r===T&&(t=k(),A(t),d(!1),m=!0)}r?(f?v(f):f=u(()=>o(t)),c&&_(c,()=>{c=null})):(c?v(c):s&&(c=u(()=>s(t))),f&&_(f,()=>{f=null})),m&&d(!0)},x),l&&(t=E)}function P(e,n,o){l&&h();var s=e,a,t;p(()=>{a!==(a=n())&&(t&&(_(t),t=null),a&&(t=u(()=>o(s,a))))},y),l&&(s=E)}function $(e){i===null&&b(),w&&i.l!==null?N(i).m.push(e):R(()=>{const n=D(e);if(typeof n=="function")return n})}function F(e,n,{bubbles:o=!1,cancelable:s=!1}={}){return new CustomEvent(e,{detail:n,bubbles:o,cancelable:s})}function q(){const e=i;return e===null&&b(),(n,o,s)=>{var t;const a=(t=e.s.$$events)==null?void 0:t[n];if(a){const f=C(a)?a.slice():[a],c=F(n,o,s);for(const r of f)r.call(e.x,c);return!c.defaultPrevented}return!0}}function N(e){var n=e.l;return n.u??(n.u={a:[],b:[],m:[]})}export{q as a,P as c,H as i,$ as o};
