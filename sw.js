if(!self.define){let e,s={};const n=(n,r)=>(n=new URL(n+".js",r).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,i)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>n(e,l),c={module:{uri:l},exports:a,require:o};s[l]=Promise.all(r.map((e=>c[e]||o(e)))).then((e=>(i(...e),a)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"2b3f3d079fd7a315f02a385762e4a992"},{url:"apple-touch-icon.png",revision:"a566afdb3c703668a9a5e426f8effb79"},{url:"assets/Absences-DI-Ehwn9.css",revision:null},{url:"assets/Absences-HgGMwSc5.js",revision:null},{url:"assets/Account-BdLMS_Xl.css",revision:null},{url:"assets/Account-D4SU12p2.js",revision:null},{url:"assets/Grades-CAvnhWzg.css",revision:null},{url:"assets/Grades-gm6-1AHT.js",revision:null},{url:"assets/Home-BWheTyLH.css",revision:null},{url:"assets/Home-Dh5FNKcn.js",revision:null},{url:"assets/index-BlrcymA1.js",revision:null},{url:"assets/index-oad4M2h5.css",revision:null},{url:"assets/logo-DUbCt9xw.svg",revision:null},{url:"assets/Messages-CoxpG2dn.js",revision:null},{url:"assets/Messages-De2uPsWA.css",revision:null},{url:"assets/Schedule-C9R-pp-P.css",revision:null},{url:"assets/Schedule-DYqAX_HK.js",revision:null},{url:"assets/useRefreshLogin-Cnq5u03C.js",revision:null},{url:"btrbaka.png",revision:"9cb589d6593098c2f51a0a60baba1831"},{url:"btrbaka.svg",revision:"c260b247076c7affb058d98336a3bd5b"},{url:"btrbakahero.png",revision:"00449b7001295e3b9aefec9b439b9418"},{url:"btrbakapride.png",revision:"45047840047a191293ffacd23a00b24a"},{url:"btrbakapride.svg",revision:"9695fe374f2ea6f452f89f88ccaf43f7"},{url:"favicon.ico",revision:"98bfbbd82e892b45e37ac16904884deb"},{url:"index.html",revision:"09305ce1c52227bf1733d78cceb00e29"},{url:"maskable-icon-512x512.png",revision:"a40a0b64925e0d6fd19f346747853fbe"},{url:"pwa-192x192.png",revision:"de2dec334c7975fa00358617c3f89681"},{url:"pwa-512x512.png",revision:"69ffda24c6f6a871c9e0a91064922e24"},{url:"pwa-64x64.png",revision:"46d416c0e797f3279a75496105578efd"},{url:"screenshots/absences.png",revision:"d388b373b751735c6927d430c9d373ad"},{url:"screenshots/account.png",revision:"461d4a6628afd3c2d73feabf7875166f"},{url:"screenshots/grades.png",revision:"793c331a7312d61cce362f21e4488fa3"},{url:"screenshots/home.png",revision:"ac257bbf737e690a5d3554732a7263a1"},{url:"screenshots/messages.png",revision:"ad7ae706d4d461ffb8ebf5d7f3e07833"},{url:"screenshots/schedule.png",revision:"8bfdc1661c5ccd2e85aa515f9f22d980"},{url:"pwa-192x192.png",revision:"983365b0b4b23220f7d9e7059ef6532b"},{url:"pwa-512x512.png",revision:"05c407a4258108deba782c5e59626c96"},{url:"manifest.webmanifest",revision:"fddcf79fe58930177356666b0be3f96c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
