import{S as p,a as g,i as n}from"./assets/vendor-Db2TdIkw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const h=new p(".gallery a",{captionsData:"alt"}),c=document.querySelector(".gallery"),u=document.querySelector(".loader");function F(){c.innerHTML=""}function y(a){const o=a.map(({webformatURL:t,largeImageURL:i,tags:e,likes:r,views:s,comments:m,downloads:f})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${i}" >
        <img src="${t}" alt="${e}">
      </a>
      <div class="info">
        <p><b>Likes:</b> ${r}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${m}</p>
        <p><b>Downloads:</b> ${f}</p>
      </div>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",o),h.refresh()}function d(){u.classList.add("loader")}function l(){u.classList.remove("loader")}const b="49548683-ee808159962119513bc31ef98",L="https://pixabay.com/api/";function B(a){const o=Math.floor(Math.random()*50)+1;return d(),g.get(L,{params:{key:b,q:a,image_type:"photo",orientation:"horizontal",page:o,per_page:"15",safesearch:!0}}).then(t=>(l(),t.data.hits.length===0&&n.error({message:"Sorry, there are no images matching your search query. Please try again!",titleColor:"#FFFFFF",messageColor:"#FFFFFF",color:"#B51B1B",position:"topRight"}),t.data.hits)).catch(t=>(l(),n.error({message:"An error occurred while fetching images. Please try again later.",titleColor:"#FFFFFF",messageColor:"#FFFFFF",color:"#B51B1B",position:"topRight"}),[]))}const P=document.querySelector(".form");l();P.addEventListener("submit",a=>{a.preventDefault();const o=a.target.elements["search-text"].value.trim();if(!o){n.error({message:"Please enter a search term!",titleColor:"#FFFFFF",messageColor:"#FFFFFF",color:"#B51B1B",position:"topRight"});return}d(),F(),B(o).then(t=>y(t)).catch(t=>n.error({message:t})).finally(()=>l())});
//# sourceMappingURL=index.js.map
