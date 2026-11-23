import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   VRIDHI SPACE INTERIORS: Home page (single file, React 18+, no deps)
   Usage: import VridhiHome from "./VridhiHome"; <VridhiHome />
   Images are Unsplash links (w=2400 = high-res). Swap with your own
   project photography whenever you have it.
------------------------------------------------------------------- */

const U = (id, w = 2400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=90`;

const IMG = {
  hero: U("photo-1618221195710-dd6b41faaea6"),
  living: U("photo-1600210492486-724fe5c67fb0"),
  bedroom: U("photo-1616486338812-3dadae4b4ace"),
  kitchen: U("photo-1556911220-bff31c812dba"),
  villa: U("photo-1600585154340-be6161a56a0c"),
  lounge: U("photo-1631679706909-1844bbd07221"),
  suite: U("photo-1540518614846-7eded433c457"),
  study: U("photo-1600607687939-ce8a6c25118c"),
  foyer: U("photo-1600566753190-17f0baa2a6c3"),
  sofa: U("photo-1484101403633-562f891dc89a"),
  loft: U("photo-1502672260266-1c1ef2d93688"),
  apt: U("photo-1522708323590-d24dbb6b0267"),
  cosy: U("photo-1560448204-e02f11c3d0e2"),
  open: U("photo-1600121848594-d8644e57abab"),
  living3: U("photo-1513694203232-719a280e022f"),
  bed2: U("photo-1615529182904-14819c35db37"),
  bed3: U("photo-1505693416388-ac5ce068fe85"),
  dining: U("photo-1617806118233-18e1de247200"),
  bath: U("photo-1552321554-5fefe8c9ef14"),
  house: U("photo-1600573472550-8090b5e0745e"),
  kitchen2: U("photo-1556228453-efd6c1ff04f6"),
  living4: U("photo-1586023492125-27b2c045efd7"),
  living5: U("photo-1493663284031-b7e3aefcb4f2"),
};
const sm = (u, w = 900) => u.replace("w=2400", "w=" + w);
const GALLERY = [IMG.sofa, IMG.bed2, IMG.kitchen2, IMG.dining, IMG.loft, IMG.bath, IMG.house, IMG.cosy, IMG.living3, IMG.open].map((u) => sm(u));
const ROOMS = [
  { t: "Living rooms", i: IMG.living3 },
  { t: "Bedrooms", i: IMG.bed3 },
  { t: "Modular kitchens", i: IMG.kitchen2 },
  { t: "Dining spaces", i: IMG.dining },
  { t: "Bathrooms", i: IMG.bath },
  { t: "Home offices", i: IMG.study },
  { t: "Villas & bungalows", i: IMG.house },
  { t: "Apartments", i: IMG.apt },
].map((r) => ({ ...r, i: sm(r.i, 1200) }));

const BANNERS = [
  { i: U("photo-1586023492125-27b2c045efd7", 3840), t: "Living rooms with soul", s: "Warm textures, soft light, made for every day." },
  { i: U("photo-1616486338812-3dadae4b4ace", 3840), t: "Bedrooms that slow time", s: "Quiet palettes and layered linen for deep rest." },
  { i: U("photo-1556911220-bff31c812dba", 3840), t: "Kitchens worth gathering in", s: "Precision joinery, honest stone, brass details." },
  { i: U("photo-1600585154340-be6161a56a0c", 3840), t: "Villas, start to finish", s: "One team from the first sketch to the last cushion." },
  { i: U("photo-1493663284031-b7e3aefcb4f2", 3840), t: "Spaces. Styles. Stories.", s: "Interiors as personal as a signature." },
];

// ---- Edit the founder details here ----
const FOUNDER = {
  name: "Amogh",
  role: "Founder & Principal Designer",
  img: "/images/founder.png", // put founder.png inside /public/images/
  quote: "A home should feel like it was always yours. We simply help it remember.",
  bio: "Starting Vridhi Space Interiors with a sketchbook and a single apartment, he built a studio that treats every room as a story. His approach is simple: listen first, design second, and sweat every detail until the space feels effortless.",
};

const PROJECTS = [
  { t: "The Walnut Residence", p: "Living · Bengaluru", i: IMG.living },
  { t: "Sandstone Suite", p: "Bedroom · Mysuru", i: IMG.bedroom },
  { t: "Hearth & Brass", p: "Kitchen · Hyderabad", i: IMG.kitchen },
  { t: "Courtyard Villa", p: "Full home · Coorg", i: IMG.villa },
  { t: "Linen Lounge", p: "Lounge · Chennai", i: IMG.lounge },
  { t: "The Quiet Study", p: "Workspace · Pune", i: IMG.study },
  { t: "Maple Loft", p: "Apartment · Bengaluru", i: IMG.loft },
  { t: "Ivory Dining", p: "Dining · Kochi", i: IMG.dining },
  { t: "Stone & Steam", p: "Bathroom · Goa", i: IMG.bath },
];

const SERVICES = [
  { t: "Residential interiors", d: "Apartments, villas and farmhouses planned around how your family really lives, from the first sketch to the last cushion.", i: IMG.suite },
  { t: "Modular kitchens & wardrobes", d: "Precision-built joinery with soft-close hardware, honest materials and storage that disappears into the walls.", i: IMG.kitchen },
  { t: "Commercial & hospitality", d: "Offices, boutiques and cafés that carry your brand story into every surface, light and texture.", i: IMG.foyer },
  { t: "Turnkey execution", d: "One team for design, procurement and site work. Fixed timelines, weekly updates, a clean handover.", i: IMG.study },
];

const STEPS = [
  ["Listen", "We walk the space and hear your story before drawing a single line.", IMG.cosy],
  ["Imagine", "Mood boards, layouts and 3D walkthroughs so you can see it before it exists.", IMG.sofa],
  ["Craft", "Materials chosen by hand. Joinery built to the millimetre.", IMG.kitchen2],
  ["Handover", "Styled, cleaned and photographed. You move in; we stay on call.", IMG.living5],
];

const WORDS = ["Spaces", "Styles", "Stories"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
:root{--cream:#F0E6D8;--sand:#E4D5C0;--clay:#7B5A3E;--bark:#4A3524;--espresso:#1F1610;--ink:#2A1E15;--gold:#C9A46C}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--cream);color:var(--ink);font-family:'Jost',sans-serif;font-weight:300;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.serif{font-family:'Cormorant Garamond',serif}
a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
:focus-visible{outline:2px solid var(--gold);outline-offset:4px}
img{display:block;max-width:100%}
.wrap{padding:0 clamp(20px,5vw,72px)}

/* header */
.hd{position:fixed;inset:0 0 auto 0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:22px clamp(20px,5vw,72px);transition:background .4s,padding .4s,color .4s;color:var(--cream)}
.hd.solid{background:rgba(240,230,216,.9);backdrop-filter:blur(14px);padding-top:14px;padding-bottom:14px;color:var(--clay)}
.logo{display:flex;align-items:center;gap:12px;letter-spacing:.32em;font-size:15px;font-weight:400}
.logo svg{width:26px;height:26px}
.nav{display:flex;gap:34px;font-size:13px;letter-spacing:.18em}
.nav a{position:relative;padding:4px 0}
.nav a::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:currentColor;transition:width .35s}
.nav a:hover::after{width:100%}
.burger{display:none;width:44px;height:44px;position:relative}
.burger i{position:absolute;left:10px;right:10px;height:1px;background:currentColor;transition:.3s}
.burger i:first-child{top:18px}.burger i:last-child{top:25px}
.burger.on i:first-child{top:22px;transform:rotate(45deg)}.burger.on i:last-child{top:22px;transform:rotate(-45deg)}
.menu{position:fixed;inset:0;z-index:40;background:var(--espresso);color:var(--cream);display:flex;flex-direction:column;justify-content:center;gap:10px;padding:0 8vw;clip-path:circle(0 at calc(100% - 40px) 40px);transition:clip-path .7s cubic-bezier(.7,0,.2,1)}
.menu.on{clip-path:circle(150% at calc(100% - 40px) 40px)}
.menu a{font-size:clamp(40px,9vw,84px);line-height:1.1;font-family:'Cormorant Garamond',serif;font-weight:300;transition:padding .3s,color .3s}
.menu a:hover{padding-left:20px;color:var(--gold)}
@media(max-width:860px){.nav{display:none}.burger{display:block}}

/* hero */
.hero{position:relative;min-height:100vh;background:var(--espresso);color:var(--cream);overflow:hidden;display:grid;place-items:center}
.hero-bg{position:absolute;inset:-6%;background-size:cover;background-position:center;opacity:.42;filter:saturate(.8);transition:transform .2s ease-out}
.hero-v{position:relative;width:min(78vw,640px);aspect-ratio:1/1.05;clip-path:polygon(48% 0,52% 0,52% 0,50% 0,50% 0,50% 0,50% 0);background-size:cover;background-position:center}
.hero-v.go{animation:vopen 1.8s cubic-bezier(.7,0,.2,1) forwards}
@keyframes vopen{to{clip-path:polygon(0 0,27% 0,50% 74%,73% 0,100% 0,56% 100%,44% 100%)}}
.hero-t{position:absolute;left:0;right:0;bottom:clamp(60px,12vh,120px);text-align:center;padding:0 20px}
.hero-t h1{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,6.2vw,92px);line-height:1.02;letter-spacing:-.01em}
.hero-t h1 em{font-style:italic;color:var(--gold)}
.hero-t p{margin-top:22px;letter-spacing:.42em;font-size:clamp(10px,1.2vw,13px);opacity:.8}
.scroll{position:absolute;right:clamp(20px,5vw,72px);bottom:36px;writing-mode:vertical-rl;font-size:11px;letter-spacing:.3em;display:flex;align-items:center;gap:14px}
.scroll::after{content:"";width:1px;height:60px;background:var(--cream);animation:drip 2s infinite}
@keyframes drip{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

/* marquee */
.mq{overflow:hidden;white-space:nowrap;background:var(--clay);color:var(--cream);padding:22px 0}
.mq-in{display:inline-flex;animation:mq 38s linear infinite}
.mq:hover .mq-in{animation-play-state:paused}
.mq span{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,54px);font-weight:300;padding:0 28px;display:inline-flex;align-items:center;gap:56px}
.mq span::after{content:"";width:8px;height:8px;background:var(--gold);transform:rotate(45deg)}
@keyframes mq{to{transform:translateX(-50%)}}
.rev .mq-in{animation-direction:reverse}

/* intro */
.intro{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(30px,6vw,100px);padding:clamp(80px,14vw,200px) clamp(20px,5vw,72px);align-items:center}
.intro h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,5vw,76px);line-height:1.05;color:var(--bark)}
.intro p{font-size:17px;line-height:1.85;max-width:46ch;color:var(--bark)}
.intro .pic{margin-top:34px;aspect-ratio:4/3;overflow:hidden}
.intro .pic img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
.intro .pic:hover img{transform:scale(1.07)}
.stats{display:flex;gap:44px;margin-top:40px}
.stats b{display:block;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:54px;color:var(--clay);line-height:1}
.stats small{font-size:13px;letter-spacing:.08em}
@media(max-width:860px){.intro{grid-template-columns:1fr}}

/* horizontal gallery */
.hs{height:560vh;position:relative;background:var(--espresso);color:var(--cream)}
.hs-stick{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center}
.hs-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:5vh}
.hs-head h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,5vw,72px);line-height:1}
.hs-head p{font-size:13px;letter-spacing:.2em;opacity:.7}
.hs-track{display:flex;gap:clamp(16px,3vw,40px);padding-left:clamp(20px,5vw,72px);will-change:transform}
.card{flex:0 0 auto;width:clamp(260px,34vw,520px);position:relative}
.card:nth-child(even){margin-top:6vh}
.card .im{aspect-ratio:3/4;overflow:hidden;background:var(--bark)}
.card img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.card:hover img{transform:scale(1.08)}
.card h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:28px;margin-top:16px}
.card p{font-size:13px;letter-spacing:.12em;opacity:.65;margin-top:4px}
.bar{position:absolute;left:clamp(20px,5vw,72px);right:clamp(20px,5vw,72px);bottom:5vh;height:1px;background:rgba(240,230,216,.2)}
.bar i{display:block;height:100%;background:var(--gold);width:0}

/* services accordion */
.sv{padding:clamp(80px,12vw,180px) clamp(20px,5vw,72px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,6vw,100px)}
.sv h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,5vw,72px);line-height:1.05;color:var(--bark);margin-bottom:40px}
.row{border-top:1px solid rgba(74,53,36,.3)}
.row:last-child{border-bottom:1px solid rgba(74,53,36,.3)}
.row button{width:100%;text-align:left;display:flex;justify-content:space-between;align-items:center;padding:26px 0;font-family:'Cormorant Garamond',serif;font-size:clamp(24px,2.6vw,36px);color:var(--bark)}
.row .pl{width:28px;height:28px;position:relative;flex:none}
.row .pl::before,.row .pl::after{content:"";position:absolute;left:6px;right:6px;top:13px;height:1px;background:var(--clay);transition:.35s}
.row .pl::after{transform:rotate(90deg)}
.row.on .pl::after{transform:rotate(0)}
.row .bd{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s}
.row.on .bd{grid-template-rows:1fr}
.row .bd p{overflow:hidden;line-height:1.8;font-size:16px;max-width:52ch}
.row.on .bd p{padding-bottom:28px}
.sv-pic{position:sticky;top:100px;align-self:start;aspect-ratio:4/5;overflow:hidden;background:var(--sand)}
.sv-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.08);transition:opacity .8s,transform 1.4s}
.sv-pic img.on{opacity:1;transform:scale(1)}
@media(max-width:860px){.sv{grid-template-columns:1fr}.sv-pic{display:none}}

/* process: a real sequence */
.pr{background:var(--sand);padding:clamp(70px,10vw,150px) 0}
.pr h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,5vw,72px);color:var(--bark);margin-bottom:50px}
.pr-row{display:flex;gap:2px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 clamp(20px,5vw,72px) 20px;cursor:grab;scrollbar-width:none}
.pr-row::-webkit-scrollbar{display:none}
.step{flex:0 0 min(78vw,380px);scroll-snap-align:start;background:var(--cream);padding:36px;min-height:340px;display:flex;flex-direction:column;justify-content:space-between;transition:background .4s,color .4s}
.step:hover{background:var(--clay);color:var(--cream)}
.step span{font-family:'Cormorant Garamond',serif;font-size:80px;line-height:1;opacity:.35}
.step h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:34px;margin-bottom:10px}
.step p{line-height:1.7;font-size:15px}

/* quote */
.qt{padding:clamp(80px,12vw,180px) clamp(20px,5vw,72px);text-align:center}
.qt blockquote{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(28px,4vw,58px);line-height:1.2;max-width:22em;margin:0 auto;color:var(--bark)}
.qt cite{display:block;margin-top:34px;font-style:normal;font-size:14px;letter-spacing:.14em;color:var(--clay)}

/* cta */
.cta{position:relative;min-height:80vh;display:grid;place-items:center;text-align:center;color:var(--cream);background-size:cover;background-position:center;background-attachment:fixed}
.cta::before{content:"";position:absolute;inset:0;background:linear-gradient(rgba(31,22,16,.62),rgba(31,22,16,.8))}
.cta div{position:relative;padding:0 20px}
.cta h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(38px,7vw,110px);line-height:1}
.btn{display:inline-block;margin-top:40px;padding:20px 44px;border:1px solid var(--cream);letter-spacing:.24em;font-size:13px;position:relative;overflow:hidden;transition:color .4s}
.btn::before{content:"";position:absolute;inset:0;background:var(--cream);transform:translateY(101%);transition:transform .45s cubic-bezier(.7,0,.2,1);z-index:-1}
.btn:hover{color:var(--espresso)}.btn:hover::before{transform:none}
.btn{z-index:0}

/* footer */
.ft{background:var(--espresso);color:var(--cream);padding-top:clamp(60px,8vw,110px);overflow:hidden}
.ft-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;padding-bottom:70px}
.ft h4{font-size:12px;letter-spacing:.24em;color:var(--gold);font-weight:400;margin-bottom:20px}
.ft li{list-style:none;margin-bottom:12px}
.ft li a{opacity:.8;transition:.3s;display:inline-block}
.ft li a:hover{opacity:1;color:var(--gold);transform:translateX(6px)}
.ft-big{font-family:'Cormorant Garamond',serif;font-weight:500;line-height:.8;text-align:center;font-size:27.5vw;letter-spacing:-.02em;margin:0 0 -.07em;padding-top:.1em;background:linear-gradient(110deg,#7B5A3E 0%,#C9A46C 35%,#F0E6D8 50%,#C9A46C 65%,#7B5A3E 100%);background-size:250% 100%;background-position:var(--mx,0%) 0;-webkit-background-clip:text;background-clip:text;color:transparent;user-select:none;transition:background-position .25s}
.ft-mq{border-top:1px solid rgba(240,230,216,.15);border-bottom:1px solid rgba(240,230,216,.15);overflow:hidden;white-space:nowrap;padding:16px 0;position:relative}
.ft-mq .mq-in{animation-duration:26s}
.ft-mq span{font-size:15px;letter-spacing:.4em;padding:0 22px;gap:44px;font-family:'Jost';font-weight:300}
.ft-bot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:22px 0;font-size:12px;letter-spacing:.1em;opacity:.6}
@media(max-width:860px){.ft-grid{grid-template-columns:1fr 1fr}}

/* banner slider */
.bn{position:relative;height:100vh;min-height:560px;background:var(--espresso);color:var(--cream);overflow:hidden;touch-action:pan-y}
.bn-s{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity 1.3s ease,visibility 0s 1.3s;clip-path:inset(0 0 0 0)}
.bn-s.on{opacity:1;visibility:visible;transition:opacity 1.3s ease;z-index:2}
.bn-s img{width:100%;height:100%;object-fit:cover;transform:scale(1.18);transition:transform 0s}
.bn-s.on img{transform:scale(1);transition:transform 8s cubic-bezier(.2,.6,.2,1)}
.bn-s::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(31,22,16,.72),rgba(31,22,16,.05) 65%),linear-gradient(0deg,rgba(31,22,16,.6),transparent 45%)}
.bn-c{position:absolute;z-index:3;left:clamp(20px,5vw,72px);bottom:clamp(110px,18vh,170px);max-width:min(90vw,820px)}
.bn-c h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(40px,7vw,108px);line-height:1;overflow:hidden}
.bn-c h2 span{display:block;animation:bnup 1s cubic-bezier(.7,0,.2,1) .35s both}
.bn-c p{margin-top:20px;font-size:clamp(15px,1.5vw,19px);animation:bnfade .9s .8s both}
@keyframes bnup{from{transform:translateY(105%)}}
@keyframes bnfade{from{opacity:0;transform:translateY(14px)}to{opacity:.85}}
.bn-ui{position:absolute;z-index:4;left:clamp(20px,5vw,72px);right:clamp(20px,5vw,72px);bottom:clamp(28px,5vh,50px);display:flex;align-items:center;gap:22px}
.bn-ct{font-family:'Cormorant Garamond',serif;font-size:22px;min-width:78px}
.bn-bars{display:flex;gap:10px;flex:1;max-width:520px}
.bn-bars button{flex:1;height:26px;position:relative}
.bn-bars button::before,.bn-bars button i{content:"";position:absolute;left:0;right:0;top:12px;height:2px}
.bn-bars button::before{background:rgba(240,230,216,.3)}
.bn-bars button i{background:var(--gold);width:0;right:auto}
.bn-bars button.done i{width:100%}
.bn-bars button.cur i{animation:bnfill 6s linear forwards}
.bn.paused .bn-bars button.cur i{animation-play-state:paused}
@keyframes bnfill{to{width:100%}}
.bn-ar{margin-left:auto;display:flex;gap:10px}
.bn-ar button{width:52px;height:52px;border:1px solid rgba(240,230,216,.5);border-radius:50%;display:grid;place-items:center;transition:.3s}
.bn-ar button:hover{background:var(--cream);color:var(--espresso)}
.bn-th{position:absolute;z-index:4;right:clamp(20px,5vw,72px);top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px}
.bn-th button{width:84px;height:56px;overflow:hidden;opacity:.5;border:1px solid transparent;transition:.4s}
.bn-th button.cur{opacity:1;border-color:var(--gold);width:108px}
.bn-th img{width:100%;height:100%;object-fit:cover}
@media(max-width:860px){.bn-th{display:none}.bn-ar button{width:44px;height:44px}.bn-ct{display:none}}

/* logo with full name */
.logo-t{display:flex;flex-direction:column;line-height:1.15}
.logo-t b{font-weight:400;letter-spacing:.32em;font-size:15px}
.logo-t small{font-size:8.5px;letter-spacing:.44em;opacity:.85;margin-top:3px}

/* preloader: a floor plan draws itself, then the doors open */
.pl{position:fixed;inset:0;z-index:100;color:var(--cream)}
.pl.out{pointer-events:none}
.pl-door{position:absolute;top:0;bottom:0;width:50.2%;background:var(--espresso);transition:transform 1.3s cubic-bezier(.77,0,.18,1) .15s}
.pl-door.l{left:0;border-right:1px solid rgba(201,164,108,.5)}.pl-door.r{right:0}
.pl.out .pl-door.l{transform:translateX(-101%)}.pl.out .pl-door.r{transform:translateX(101%)}
.pl-c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;transition:opacity .5s,transform .9s}
.pl.out .pl-c{opacity:0;transform:scale(1.1)}
.pl svg{width:min(72vw,460px);height:auto;overflow:visible;margin-bottom:10px}
.pl svg *{fill:none;stroke:var(--gold);stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:pldraw 1.6s cubic-bezier(.6,0,.2,1) forwards;animation-delay:calc(var(--d)*.26s)}
@keyframes pldraw{to{stroke-dashoffset:0}}
.pl-name{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,8vw,72px);font-weight:300;letter-spacing:.3em;padding-left:.3em}
.pl-name span{display:inline-block;opacity:0;transform:translateY(40%);animation:plup .8s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(1.1s + var(--i)*.07s)}
.pl-sub{font-size:clamp(10px,1.3vw,13px);letter-spacing:.55em;padding-left:.55em;opacity:0;animation:plfade .8s 1.9s forwards}
@keyframes plup{to{opacity:1;transform:none}}
@keyframes plfade{to{opacity:.85}}
.pl-count{position:absolute;left:clamp(20px,5vw,72px);bottom:3vh;font-family:'Cormorant Garamond',serif;font-size:clamp(60px,12vw,150px);font-weight:300;line-height:1;color:var(--gold);z-index:2;transition:opacity .4s}
.pl-count small{font-size:.3em;margin-left:6px}
.pl.out .pl-count{opacity:0}
.pl-line{position:absolute;left:0;bottom:0;height:2px;background:var(--gold);z-index:2}

/* richer image blocks */
.pic2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:34px}
.pic2 div{aspect-ratio:3/4;overflow:hidden}.pic2 div:nth-child(2){margin-top:44px}
.pic2 img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
.pic2 div:hover img{transform:scale(1.08)}
.step{padding:0 0 30px;min-height:440px;justify-content:flex-start;gap:20px}
.step .im{height:210px;overflow:hidden}
.step .im img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s}
.step:hover .im img{transform:scale(1.08)}
.step span{font-size:54px;padding:0 30px}
.step>div:last-child{padding:0 30px;margin-top:auto}
.rm{padding:clamp(70px,10vw,150px) 0 clamp(40px,6vw,80px)}
.rm h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,5vw,72px);color:var(--bark);margin-bottom:44px}
.rm-c{flex:0 0 min(70vw,340px);aspect-ratio:3/4;position:relative;overflow:hidden;scroll-snap-align:start;background:var(--sand)}
.rm-c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.3s cubic-bezier(.2,.7,.2,1)}
.rm-c:hover img{transform:scale(1.1)}
.rm-c::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(31,22,16,.75),transparent 55%)}
.rm-c h3{position:absolute;z-index:2;left:22px;right:22px;bottom:20px;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:30px;color:var(--cream)}
.rm .pr-row{background:none;gap:14px}
.strip{overflow:hidden;background:var(--espresso);padding:14px 0}
.strip-in{display:flex;gap:14px;width:max-content;animation:mq 70s linear infinite}
.strip:hover .strip-in{animation-play-state:paused}
.strip.rev .strip-in{animation-direction:reverse}
.st{width:clamp(200px,26vw,380px);aspect-ratio:4/3;overflow:hidden;flex:none}
.st img{width:100%;height:100%;object-fit:cover;transition:transform 1s}
.st:hover img{transform:scale(1.1)}

/* signature footer wordmark */
.ft-name{position:relative;overflow:hidden;padding:clamp(30px,5vw,70px) 0 0}
.ft-big{display:flex;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:500;line-height:.82;font-size:25.5vw;margin:0 0 -.05em;user-select:none}
.ft-big span{display:inline-block;padding:0 .01em;background:linear-gradient(110deg,#7B5A3E 0%,#C9A46C 25%,#F0E6D8 50%,#C9A46C 75%,#7B5A3E 100%);background-size:700% 100%;background-position:calc(var(--i)*14% + var(--mx,0%)*.5) 0;-webkit-background-clip:text;background-clip:text;color:transparent;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.ft-big span:hover{transform:translateY(-7%) skewX(-6deg)}
.ft-out{display:flex;justify-content:center;gap:.5em;font-family:'Jost',sans-serif;font-weight:300;font-size:clamp(26px,7.4vw,138px);letter-spacing:.04em;line-height:1;padding:.18em 0 .22em;user-select:none;flex-wrap:wrap}
.ft-out .w{display:flex}
.ft-out .w>span{display:inline-block;color:transparent;-webkit-text-stroke:1px var(--gold);transition:color .4s,transform .5s cubic-bezier(.2,.8,.2,1)}
.ft-out .w>span:hover{color:var(--gold);transform:translateY(-12%)}
.ft-badge{position:absolute;right:clamp(16px,5vw,72px);top:0;width:clamp(86px,10vw,150px);aspect-ratio:1;display:grid;place-items:center;z-index:3;color:var(--cream)}
.ft-badge svg{position:absolute;inset:0;width:100%;height:100%;animation:spin 18s linear infinite}
.ft-badge text{font-size:11.5px;letter-spacing:.2em;fill:var(--cream);font-family:'Jost'}
.ft-badge b{font-weight:300;font-size:26px;transition:transform .4s}
.ft-badge:hover b{transform:translateY(-6px)}
@keyframes spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.pl svg *{stroke-dashoffset:0!important}.pl-name span,.pl-sub{opacity:1!important;transform:none!important}}

/* founder */
.fd{position:relative;background:var(--sand);padding:clamp(80px,12vw,180px) 0;overflow:hidden}
.fd-bg{position:absolute;top:50%;left:0;transform:translateY(-50%);white-space:nowrap;pointer-events:none}
.fd-bg div{display:inline-flex;animation:mq 70s linear infinite}
.fd-bg span{font-family:'Cormorant Garamond',serif;font-size:clamp(160px,30vw,440px);line-height:1;padding:0 .3em;color:transparent;-webkit-text-stroke:1px rgba(123,90,62,.28)}
.fd-in{position:relative;display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(40px,7vw,120px);align-items:center}
.fd-pw{position:relative;max-width:520px;width:100%;margin:0 auto}
.fd-frame{position:absolute;inset:0;border:1px solid var(--clay);transform:translate(20px,20px)}
.fd-ph{position:relative;aspect-ratio:4/5;overflow:hidden;clip-path:polygon(0 0,100% 0,100% 90%,50% 100%,0 90%);background:var(--bark)}
.fd-ph img{width:100%;height:100%;object-fit:cover;object-position:50% 20%;transform:scale(1.25);transition:transform 2.2s cubic-bezier(.2,.7,.2,1)}
.fd-ph::after{content:"";position:absolute;inset:0;background:var(--espresso);transform-origin:top;transition:transform 1.3s cubic-bezier(.7,0,.2,1)}
.fd.in .fd-ph::after{transform:scaleY(0)}
.fd.in .fd-ph img{transform:scale(1)}
.fd-tag{position:absolute;left:-28px;bottom:14%;background:var(--espresso);color:var(--cream);padding:18px 26px;z-index:2;opacity:0;transform:translateX(-20px);transition:.9s 1.1s}
.fd.in .fd-tag{opacity:1;transform:none}
.fd-tag b{display:block;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:24px}
.fd-tag small{font-size:12px;letter-spacing:.14em;color:var(--gold)}
.fd-badge{position:absolute;right:-36px;top:-36px;width:clamp(96px,11vw,132px);aspect-ratio:1;display:grid;place-items:center;z-index:2;background:var(--clay);border-radius:50%;color:var(--cream)}
.fd-badge svg{position:absolute;inset:6px;width:calc(100% - 12px);height:calc(100% - 12px);animation:spin 16s linear infinite}
.fd-badge text{font-size:11px;letter-spacing:.18em;fill:var(--cream);font-family:'Jost'}
.fd-badge b{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:400}
.fd-tx h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,5vw,72px);line-height:1.05;color:var(--bark)}
.fd-tx blockquote{margin:30px 0 22px;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(24px,2.6vw,38px);line-height:1.3;color:var(--clay);border-left:2px solid var(--gold);padding-left:24px}
.fd-tx p{line-height:1.85;font-size:17px;max-width:52ch;color:var(--bark)}
.fd-sig{margin-top:34px;display:flex;align-items:baseline;gap:18px;flex-wrap:wrap}
.fd-sig b{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:clamp(34px,4vw,54px);color:var(--bark)}
.fd-sig span{font-size:14px;letter-spacing:.08em;color:var(--clay)}
.fd-st{display:flex;gap:clamp(24px,4vw,56px);margin:34px 0 40px;flex-wrap:wrap}
.fd-st b{display:block;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:50px;line-height:1;color:var(--clay)}
.fd-st small{font-size:13px;letter-spacing:.06em}
.fd .btn{color:var(--bark);border-color:var(--bark);margin-top:0}
.fd .btn::before{background:var(--bark)}
.fd .btn:hover{color:var(--cream)}
@media(max-width:860px){.fd-in{grid-template-columns:1fr}.fd-tag{left:-8px}.fd-badge{right:-8px;top:-30px}.fd-frame{transform:translate(12px,12px)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
`;

const VMark = () => (
  <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
    <path d="M2 4h10l10 24 9-17V4h4v10L24 38H20z" opacity=".95" />
  </svg>
);

const FALLBACK = U("photo-1618221195710-dd6b41faaea6", 1600);
function Pic(props) {
  return (
    <img
      draggable={false}
      {...props}
      onError={(e) => {
        if (e.currentTarget.dataset.f) return;
        e.currentTarget.dataset.f = "1";
        e.currentTarget.src = FALLBACK;
      }}
    />
  );
}

function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, sx = 0, sl = 0;
    const d = (e) => { down = true; sx = e.pageX; sl = el.scrollLeft; el.style.scrollSnapType = "none"; };
    const m = (e) => { if (down) el.scrollLeft = sl - (e.pageX - sx); };
    const u = () => { down = false; el.style.scrollSnapType = "x mandatory"; };
    el.addEventListener("mousedown", d);
    window.addEventListener("mousemove", m);
    window.addEventListener("mouseup", u);
    return () => {
      el.removeEventListener("mousedown", d);
      window.removeEventListener("mousemove", m);
      window.removeEventListener("mouseup", u);
    };
  }, []);
}

function Strip({ items, rev }) {
  const set = items.map((src, i) => <div className="st" key={i}><Pic src={src} alt="" loading="lazy" /></div>);
  return <div className={`strip ${rev ? "rev" : ""}`} aria-hidden="true"><div className="strip-in">{set}{set}</div></div>;
}

function Preloader({ onDone }) {
  const [p, setP] = useState(0);
  const [out, setOut] = useState(false);
  const done = useRef(onDone);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf, t0;
    const T = 3200;
    const tick = (t) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / T);
      setP(Math.round(100 * (1 - Math.pow(1 - k, 2.2))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const a = setTimeout(() => setOut(true), T + 500);
    const b = setTimeout(() => { document.body.style.overflow = ""; done.current(); }, T + 2100);
    return () => { cancelAnimationFrame(raf); clearTimeout(a); clearTimeout(b); document.body.style.overflow = ""; };
  }, []);
  const d = (n) => ({ pathLength: 1, style: { "--d": n } });
  return (
    <div className={`pl ${out ? "out" : ""}`} role="status" aria-label="Loading Vridhi Space Interiors">
      <div className="pl-door l" /><div className="pl-door r" />
      <div className="pl-c">
        <svg viewBox="0 0 240 160" aria-hidden="true">
          <rect x="20" y="20" width="200" height="120" {...d(0)} />
          <path d="M110 20V80H220" {...d(1)} />
          <path d="M110 110V140" {...d(2)} />
          <path d="M60 140V110A30 30 0 0 1 90 140" {...d(3)} />
          <path d="M150 14H200M150 26H200" {...d(3)} />
          <rect x="34" y="92" width="52" height="24" rx="5" {...d(4)} />
          <circle cx="165" cy="50" r="14" {...d(5)} />
          <rect x="135" y="95" width="70" height="35" rx="3" {...d(5)} />
          <path d="M135 105H205" {...d(6)} />
        </svg>
        <div className="pl-name" aria-hidden="true">{"VRIDHI".split("").map((c, i) => <span key={i} style={{ "--i": i }}>{c}</span>)}</div>
        <div className="pl-sub">SPACE INTERIORS</div>
      </div>
      <div className="pl-count">{p}<small>%</small></div>
      <div className="pl-line" style={{ width: p + "%" }} />
    </div>
  );
}

function Founder() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className={`fd ${on ? "in" : ""}`} id="founder" ref={ref}>
      <div className="fd-bg" aria-hidden="true"><div>{[0, 1, 2, 3].map((i) => <span key={i}>FOUNDER</span>)}</div></div>
      <div className="wrap fd-in">
        <div className="fd-pw">
          <div className="fd-frame" />
          <div className="fd-ph"><Pic src={FOUNDER.img} alt={`${FOUNDER.name}, ${FOUNDER.role}`} loading="lazy" /></div>
          <div className="fd-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120"><defs><path id="circ2" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text><textPath href="#circ2">12 YEARS • OF CRAFT • 350 SPACES •</textPath></text></svg>
            <b>V</b>
          </div>
          <div className="fd-tag"><b>{FOUNDER.name}</b><small>{FOUNDER.role}</small></div>
        </div>
        <div className="fd-tx">
          <h2>The mind behind Vridhi</h2>
          <blockquote>“{FOUNDER.quote}”</blockquote>
          <p>{FOUNDER.bio}</p>
          <div className="fd-st">
            <div><b>12</b><small>Years of practice</small></div>
            <div><b>350+</b><small>Spaces designed</small></div>
            <div><b>1</b><small>Team, start to finish</small></div>
          </div>
          <a className="btn" href="#contact">MEET THE FOUNDER</a>
          <div className="fd-sig"><b>{FOUNDER.name}</b><span>{FOUNDER.role}</span></div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ items, cls = "" }) {
  const set = items.map((w, i) => <span key={i}>{w}</span>);
  return (
    <div className={`mq ${cls}`} aria-hidden="true">
      <div className="mq-in">{set}{set}{set}{set}</div>
    </div>
  );
}

function BannerSlider() {
  const [a, setA] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = BANNERS.length;
  const touch = useRef(0);
  const next = () => setA((x) => (x + 1) % n);
  const prev = () => setA((x) => (x - 1 + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, 6000);
    return () => clearTimeout(id);
  }, [a, paused]);

  const pad = (x) => String(x + 1).padStart(2, "0");
  return (
    <section
      className={`bn ${paused ? "paused" : ""}`}
      aria-roledescription="carousel"
      aria-label="Featured interiors"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const d = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(d) > 50) (d < 0 ? next : prev)();
      }}
    >
      {BANNERS.map((b, i) => (
        <div key={b.t} className={`bn-s ${i === a ? "on" : ""}`} aria-hidden={i !== a}>
          <Pic src={b.i} alt={b.t} loading={i === 0 ? "eager" : "lazy"} />
        </div>
      ))}
      <div className={`bn-c go`} key={a}>
        <h2><span>{BANNERS[a].t}</span></h2>
        <p>{BANNERS[a].s}</p>
      </div>
      <div className="bn-th">
        {BANNERS.map((b, i) => (
          <button key={i} className={i === a ? "cur" : ""} onClick={() => setA(i)} aria-label={`Show banner ${i + 1}`}>
            <Pic src={U(b.i.split("/").pop().split("?")[0], 300)} alt="" />
          </button>
        ))}
      </div>
      <div className="bn-ui">
        <div className="bn-ct">{pad(a)} / {pad(n - 1)}</div>
        <div className="bn-bars">
          {BANNERS.map((b, i) => (
            <button key={i} className={i < a ? "done" : i === a ? "cur" : ""} onClick={() => setA(i)} aria-label={`Go to banner ${i + 1}`}>
              <i key={i === a ? "a" + a : "x"} />
            </button>
          ))}
        </div>
        <div className="bn-ar">
          <button onClick={prev} aria-label="Previous banner">←</button>
          <button onClick={next} aria-label="Next banner">→</button>
        </div>
      </div>
    </section>
  );
}

export default function VridhiHome() {
  const [solid, setSolid] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const rmRow = useRef(null);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(0);
  const heroBg = useRef(null);
  const hs = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const prRow = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 80);
      const sec = hs.current, tr = track.current;
      if (sec && tr) {
        const r = sec.getBoundingClientRect();
        const total = sec.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / total));
        const max = tr.scrollWidth - window.innerWidth + 80;
        tr.style.transform = `translate3d(${-p * Math.max(0, max)}px,0,0)`;
        if (bar.current) bar.current.style.width = p * 100 + "%";
      }
      if (heroBg.current && window.scrollY < window.innerHeight)
        heroBg.current.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.05)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useDragScroll(prRow);
  useDragScroll(rmRow);

  const links = ["Home", "Projects", "Services", "Process", "Founder", "Contact"];
  const go = (e, l) => {
    setMenu(false);
    const map = { Projects: "projects", Services: "services", Process: "process", Founder: "founder", Contact: "contact" };
    const t = map[l] && document.getElementById(map[l]);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  };

  return (
    <>
      <style>{css}</style>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <header className={`hd ${solid && !menu ? "solid" : ""}`} style={menu ? { color: "var(--cream)" } : null}>
        <a href="#top" className="logo" aria-label="Vridhi Space Interiors home"><VMark /><span className="logo-t"><b>VRIDHI</b><small>SPACE INTERIORS</small></span></a>
        <nav className="nav" aria-label="Primary">
          {links.slice(1).map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => go(e, l)}>{l.toUpperCase()}</a>)}
        </nav>
        <button className={`burger ${menu ? "on" : ""}`} onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}><i /><i /></button>
      </header>

      <div className={`menu ${menu ? "on" : ""}`}>
        {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => go(e, l)}>{l}</a>)}
      </div>

      <main id="top">
        <section className="hero">
          <div ref={heroBg} className="hero-bg" style={{ backgroundImage: `url(${IMG.hero})` }} />
          <div className={`hero-v ${loaded ? "go" : ""}`} style={{ backgroundImage: `url(${IMG.living})` }} role="img" aria-label="Interior seen through the Vridhi V" />
          <div className="hero-t">
            <h1>Interiors that tell <em>your</em> story.</h1>
            <p>SPACES · STYLES · STORIES</p>
          </div>
          <div className="scroll">SCROLL</div>
        </section>

        <BannerSlider />

        <Marquee items={["Residences", "Villas", "Kitchens", "Boutiques", "Hospitality", "Workspaces"]} />

        <section className="intro" id="about">
          <h2 className="serif">We design rooms you feel before you notice.</h2>
          <div>
            <p>Vridhi Space Interiors shapes homes and commercial spaces around light, material and the way people move through them. Every project begins with a conversation and ends with a space that could belong to no one else.</p>
            <div className="stats">
              <div><b>350+</b><small>Spaces completed</small></div>
              <div><b>12</b><small>Years of practice</small></div>
              <div><b>98%</b><small>On-time handovers</small></div>
            </div>
            <div className="pic2">
              <div><Pic src={IMG.suite} alt="Warm bedroom with natural textures" loading="lazy" /></div>
              <div><Pic src={IMG.living5} alt="Bright living room with layered decor" loading="lazy" /></div>
            </div>
          </div>
        </section>

        <section className="hs" id="projects" ref={hs}>
          <div className="hs-stick">
            <div className="hs-head wrap">
              <h2>Selected work</h2>
              <p>KEEP SCROLLING</p>
            </div>
            <div className="hs-track" ref={track}>
              {PROJECTS.map((p) => (
                <article className="card" key={p.t}>
                  <div className="im"><Pic src={p.i} alt={p.t} loading="lazy" /></div>
                  <h3>{p.t}</h3>
                  <p>{p.p}</p>
                </article>
              ))}
              <div style={{ flex: "0 0 8vw" }} />
            </div>
            <div className="bar"><i ref={bar} /></div>
          </div>
        </section>

        <section className="rm">
          <div className="wrap"><h2>Spaces we design</h2></div>
          <div className="pr-row" ref={rmRow}>
            {ROOMS.map((r) => (
              <div className="rm-c" key={r.t}><Pic src={r.i} alt={r.t} loading="lazy" /><h3>{r.t}</h3></div>
            ))}
          </div>
        </section>

        <section className="sv" id="services">
          <div>
            <h2>What we do</h2>
            {SERVICES.map((s, i) => (
              <div key={s.t} className={`row ${open === i ? "on" : ""}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {s.t}<span className="pl" />
                </button>
                <div className="bd"><p>{s.d}</p></div>
              </div>
            ))}
          </div>
          <div className="sv-pic">
            {SERVICES.map((s, i) => <Pic key={s.t} src={s.i} alt="" className={open === i || (open === -1 && i === 0) ? "on" : ""} loading="lazy" />)}
          </div>
        </section>

        <section className="pr" id="process">
          <div className="wrap"><h2>From first hello to final styling</h2></div>
          <div className="pr-row" ref={prRow}>
            {STEPS.map(([t, d, im], i) => (
              <div className="step" key={t}>
                <div className="im"><Pic src={sm(im, 1000)} alt="" loading="lazy" /></div>
                <span>{i + 1}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </section>

        <Marquee items={["Spaces", "Styles", "Stories"]} cls="rev" />
        <Strip items={GALLERY} />

        <Founder />

        <section className="qt">
          <blockquote>“They understood our home better than we did. Every corner now feels like us.”</blockquote>
          <cite>A client in Bengaluru</cite>
        </section>

        <section className="cta" id="contact" style={{ backgroundImage: `url(${IMG.villa})` }}>
          <div>
            <h2>Let’s build the<br />home you imagine.</h2>
            <a className="btn" href="mailto:hello@vridhispace.com">BOOK A CONSULTATION</a>
          </div>
        </section>
      </main>

      <footer
        className="ft"
        onMouseMove={(e) => e.currentTarget.style.setProperty("--mx", (e.clientX / window.innerWidth) * 100 + "%")}
      >
        <div className="wrap ft-grid">
          <div>
            <h4>VRIDHI SPACE INTERIORS</h4>
            <p style={{ lineHeight: 1.8, maxWidth: "32ch", opacity: 0.8 }}>Spaces, styles and stories, designed and built under one roof.</p>
          </div>
          <div><h4>EXPLORE</h4><ul>{["Projects", "Services", "Process", "About"].map((l) => <li key={l}><a href={`#${l.toLowerCase()}`} onClick={(e) => go(e, l)}>{l}</a></li>)}</ul></div>
          <div><h4>FOLLOW</h4><ul>{["Instagram", "Pinterest", "LinkedIn", "YouTube"].map((l) => <li key={l}><a href="#top">{l}</a></li>)}</ul></div>
          <div><h4>VISIT</h4><ul><li>Bengaluru, Karnataka</li><li><a href="mailto:hello@vridhispace.com">hello@vridhispace.com</a></li><li><a href="tel:+910000000000">+91 00000 00000</a></li></ul></div>
        </div>

        <div className="ft-mq mq" aria-hidden="true">
          <div className="mq-in">
            {[...Array(4)].map((_, k) => WORDS.map((w) => <span key={k + w}>{w.toUpperCase()}</span>))}
          </div>
        </div>

        <div className="ft-name" aria-label="Vridhi Space Interiors">
          <a className="ft-badge" href="#top" aria-label="Back to top">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs><path id="circ" d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0" /></defs>
              <text><textPath href="#circ">SPACES • STYLES • STORIES • SPACES • STYLES • STORIES •</textPath></text>
            </svg>
            <b>↑</b>
          </a>
          <div className="ft-big" aria-hidden="true">{"VRIDHI".split("").map((c, i) => <span key={i} style={{ "--i": i }}>{c}</span>)}</div>
          <div className="ft-out" aria-hidden="true">
            {["SPACE", "INTERIORS"].map((w) => <span className="w" key={w} style={{ display: "flex" }}>{w.split("").map((c, i) => <span key={i}>{c}</span>)}</span>)}
          </div>
        </div>

        <div className="wrap ft-bot" style={{ background: "var(--espresso)", position: "relative" }}>
          <span>© 2026 Vridhi Space Interiors</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </>
  );
}