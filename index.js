import{a as f,S as y,i as o}from"./assets/vendor-CrlV4O_2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(r){if(r.ep)return;r.ep=!0;const t=e(r);fetch(r.href,t)}})();const m="50801128-9bde19728bc3e6666ae5ca17b";function d(n){const s=new URLSearchParams({key:m,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0});return f.get(`https://pixabay.com/api/?${s}`).then(({data:e})=>{if(e.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");return e})}const u=document.querySelector(".gallery");let h=new y(".gallery a");const c=document.querySelector(".loader");c.style.display="none";function g(n){const s=n.map(e=>`
      <li class="gallery-item">
      <a href="${e.largeImageURL}">
      <img class="img" src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="wrapper">
     <p class="text">Likes<span class="span">${e.likes}</span></p>
        <p class="text">Views<span class="span">${e.views}</span></p>
        <p class="text">Comments<span class="span">${e.comments}</span></p>
        <p class="text">Downloads<span class="span">${e.downloads}</span></p>
        </div>
      </li>`).join("");u.insertAdjacentHTML("beforeend",s),h.refresh()}function L(){u.innerHTML=""}function b(){c.style.display="block"}function i(){c.style.display="none"}const p=document.querySelector(".form"),w=document.querySelector('input[name="search-text"]');p.addEventListener("submit",S);i();function S(n){n.preventDefault(),L(),b();const s=w.value.trim();if(!s){o.warning({message:"Please enter a search query"}),i();return}d(s).then(e=>{if(e.hits.length===0){o.info({message:"Sorry, there are no images matching your search query."});return}g(e.hits)}).catch(e=>{o.error({message:"Sorry, there are no images matching your search query. Please try again!"})}).finally(()=>{i(),p.reset()})}
//# sourceMappingURL=index.js.map
