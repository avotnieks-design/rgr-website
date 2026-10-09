const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();
const gallery=document.getElementById('gallery');
const captions=['Robotu piegāde un sagatavošana','Tehnoloģiju demonstrācija izstādē','Robotizētas metināšanas testēšana','Metināšanas iekārtas ražotnē','Robotizācijas risinājumu prezentācija','Automatizēta detaļu pārvietošana','Robotizēta metināšana darbībā','Robotizēta materiālu apstrāde','Automatizēta metāla apstrāde','Metināšanas iekārtu ražošanas process'];
let current=0;
const lightbox=document.getElementById('lightbox');
function showImage(i){current=(i+captions.length)%captions.length;lightbox.querySelector('img').src=`images/robot-${String(current+1).padStart(2,'0')}.jpg`;lightbox.querySelector('img').alt=captions[current];}
for(let i=0;i<captions.length;i++){
 const num=String(i+1).padStart(2,'0');const item=document.createElement('button');item.type='button';item.className='gallery-item';item.setAttribute('aria-label',`Atvērt attēlu: ${captions[i]}`);
 const img=document.createElement('img');img.src=`images/robot-${num}.jpg`;img.alt=captions[i];img.loading='lazy';img.decoding='async';item.appendChild(img);item.addEventListener('click',()=>{showImage(i);lightbox.showModal();});gallery.appendChild(item);
}
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(current-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showImage(current+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
document.addEventListener('keydown',e=>{if(!lightbox.open)return;if(e.key==='ArrowLeft')showImage(current-1);if(e.key==='ArrowRight')showImage(current+1);});


// Sākumlapas video: no 10. sekundes līdz 10 sekundēm pirms beigām.
(function () {
  const videoId = 'rgr-hero-player';
  if (!document.getElementById(videoId)) return;
  let player, timer;
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player(videoId, {
      events: {
        onReady(event) {
          event.target.mute();
          event.target.playVideo();
          timer = window.setInterval(() => {
            if (!player || typeof player.getDuration !== 'function') return;
            const duration = player.getDuration();
            const current = player.getCurrentTime();
            if (duration > 20 && current >= duration - 10) {
              player.seekTo(10, true);
              player.playVideo();
            }
          }, 250);
        },
        onStateChange(event) {
          if (event.data === YT.PlayerState.ENDED) {
            event.target.seekTo(10, true);
            event.target.playVideo();
          }
        }
      }
    });
  };
  const api = document.createElement('script');
  api.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(api);
  window.addEventListener('pagehide', () => window.clearInterval(timer), { once: true });
})();
