const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
const gallery=document.getElementById('gallery');
const captions=['Automatizēta metināšana ražotnē', 'Kawasaki robots ražošanas līnijā', 'Kawasaki robots un speciālisti', 'Kawasaki robotu automatizācijas līnija', 'Kawasaki metināšanas robots darbībā', 'Robotizācijas sistēmas uzstādīšana', 'Iepakoti industriālie roboti', 'Kawasaki robota uzstādīšana darbnīcā', 'Automatizēta paletizēšanas līnija', 'Miller automatizētās metināšanas iekārtas', 'RGR komanda un partneri izstādē'];
const galleryNumbers=[1,2,3,4,5,6,7,8,9,11,12];
let current=0;
const lightbox=document.getElementById('lightbox');
function showImage(i){current=(i+captions.length)%captions.length;lightbox.querySelector('img').src=`images/robot-${String(galleryNumbers[current]).padStart(2,'0')}.jpg`;lightbox.querySelector('img').alt=captions[current];}
for(let i=0;i<captions.length;i++){
 const num=String(galleryNumbers[i]).padStart(2,'0');const item=document.createElement('button');item.type='button';item.className='gallery-item';item.setAttribute('aria-label',`Atvērt attēlu: ${captions[i]}`);
 const img=document.createElement('img');img.src=`images/robot-${num}.jpg`;img.alt=captions[i];img.loading='lazy';img.decoding='async';item.appendChild(img);item.addEventListener('click',()=>{showImage(i);lightbox.showModal();});gallery.appendChild(item);
}
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(current-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showImage(current+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
document.addEventListener('keydown',e=>{if(!lightbox.open)return;if(e.key==='ArrowLeft')showImage(current-1);if(e.key==='ArrowRight')showImage(current+1);});


// Vietēji glabāts fona video: oriģināla posms no 00:38 līdz beigām.
(function () {
  const video = document.getElementById('rgr-hero-player');
  const toggle = document.getElementById('rgr-video-toggle');
  if (!(video instanceof HTMLVideoElement)) return;
  const hero = video.closest('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || '')));
  let wantsPlayback = !reducedMotion.matches && !saveData;
  let visible = true;
  let sourceLoaded = false;
  video.muted = true;
  video.defaultMuted = true;

  function updateToggle() {
    if (!toggle) return;
    toggle.hidden = Boolean(video.error);
    toggle.textContent = video.paused ? 'Atskaņot fonu' : 'Apturēt fonu';
    toggle.setAttribute('aria-label', video.paused ? 'Atskaņot fona video' : 'Apturēt fona video');
  }

  async function play() {
    if (!wantsPlayback || !visible || document.visibilityState === 'hidden') return;
    if (!sourceLoaded) {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      video.src = video.dataset[mobile ? 'mobileSrc' : 'desktopSrc'];
      sourceLoaded = true;
      video.load();
    }
    try { await video.play(); } catch { updateToggle(); }
  }

  video.addEventListener('playing', () => {
    video.classList.add('is-ready');
    updateToggle();
  });
  video.addEventListener('pause', updateToggle);
  video.addEventListener('error', () => {
    wantsPlayback = false;
    video.classList.remove('is-ready');
    updateToggle();
  });
  if (toggle) {
    toggle.addEventListener('click', () => {
      wantsPlayback = video.paused;
      if (wantsPlayback) play();
      else video.pause();
    });
  }
  if ('IntersectionObserver' in window && hero) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else video.pause();
    }, { threshold: 0.05 });
    observer.observe(hero);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') video.pause();
    else play();
  });
  reducedMotion.addEventListener('change', event => {
    wantsPlayback = !event.matches && !saveData;
    if (wantsPlayback) play();
    else video.pause();
  });
  updateToggle();
  // Dodam priekšroku sākuma attēlam un teksta pirmajai uzzīmēšanai.
  window.requestAnimationFrame(() => window.requestAnimationFrame(play));
})();
