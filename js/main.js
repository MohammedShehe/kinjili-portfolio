(function(){
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const n=new Date();let age=n.getFullYear()-2011;if(n<new Date(n.getFullYear(),11,20))age--;
$('#yr').textContent=n.getFullYear();

const route=$('#route'),L=route.getTotalLength(),ball=$('#ball'),story=$('#story');
const nodes=$$('.nd');
function onScroll(){
  const h=document.documentElement;
  $('#bar').style.width=h.scrollTop/(h.scrollHeight-innerHeight)*100+'%';
  $('#nav').classList.toggle('solid',scrollY>50);
  const r=story.getBoundingClientRect(),p=Math.min(1,Math.max(0,(-r.top+innerHeight*.2)/(r.height-innerHeight*.9)));
  const pt=route.getPointAtLength(p*L);ball.setAttribute('transform','translate('+pt.x+','+pt.y+') rotate('+p*900+')');
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// chapters drive the board
const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  $$('.chap').forEach(c=>c.classList.remove('on'));e.target.classList.add('on');
  const i=+e.target.dataset.i;$('#board').dataset.theme=i;$('#boardTag').textContent=e.target.dataset.tag;
  nodes.forEach((nd,k)=>nd.classList.toggle('on',k<=i));
}),{rootMargin:'-45% 0px -45% 0px'});
$$('.chap').forEach(c=>co.observe(c));

// reveals, counters, meters
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add('on');io.unobserve(e.target);
  const b=e.target.querySelector('[data-count]');if(b)count(b);
}),{threshold:.3});
$$('.reveal').forEach(el=>io.observe(el));
function count(el){const t=el.dataset.count==='age'?age:+el.dataset.count,s=performance.now();
  (function f(x){const k=Math.min(1,(x-s)/1300);el.textContent=Math.round(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(s)}

// "tell him something" fun reply
const R=['I already knew that.','Old news. Next.','Tell me something I don’t know.','Yes, yes. I’ve seen the stats on that already.','Hmm… I knew that before you did.','Nice try, but the football brain is never wrong.','Correct. And I could add three more facts about it.'];
let last=-1;
$('#tellForm').onsubmit=e=>{e.preventDefault();
  let k;do{k=Math.floor(Math.random()*R.length)}while(k===last);last=k;
  const a=$('#answer');a.classList.remove('pop');void a.offsetWidth;a.innerHTML='<i class="fa-solid fa-comment-dots"></i> '+R[k];a.classList.add('pop');$('#tellIn').value='';
};
// tap to flip on touch
$$('.flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('on')));
$$('.nav-link').forEach(a=>a.addEventListener('click',()=>{const m=$('#menu');if(m.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(m).hide()}));
})();
