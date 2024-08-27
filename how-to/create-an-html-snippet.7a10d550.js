const e=["a","address","article","aside","blockquote","button","caption","details","dialog","dd","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","img","input","label","legend","li","main","menu","nav","ol","option","output","picture","p","pre","progress","search","select","summary","table","td","textarea","tfoot","th","thead","ul"],t=e=>{let t=document.createElement("div");return t.innerHTML=e.trim(),t},r=()=>{let e=[];for(let t of Array.from(document.querySelector("body").children)){let r=o(t);r&&e.push(r)}return e},l=e=>1===e.nodeType,a=t=>!!l(t)&&e.includes(t.tagName.toLowerCase()),o=e=>{let t={tag:e.tagName.toLowerCase(),children:[]};for(let r of e.children)a(r)&&t.children.push(o(r));if(0===t.children.length&&delete t.children,"script"!==t.tag)return t},d=e=>{let t=e?.children||[];if(t?.length===0)return`<div>${e.tag}</div>`;let r="";for(let e of t)r+=d(e);return`
      <details>
          <summary>${e.tag}</summary>
          ${r}
      </details>
  `},n=e=>{let r="";for(let t of e)r+=d(t);return t(r)};(async()=>{let e=r(),t=document.getElementsByTagName("body")[0];if(t){let r=n(e);t.appendChild(r)}})();
//# sourceMappingURL=create-an-html-snippet.7a10d550.js.map
