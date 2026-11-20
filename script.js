/* ==========================================================
   Sitara Clothing: shared script (vanilla JS, no libraries)
   Sections: 1 Config  2 Data  3 Helpers  4 Header/footer
   5 Cart  6 Renderers  7 Page logic  8 Countdown  9 Reveals
   ========================================================== */
document.documentElement.classList.add('js');

/* 1. CONFIG: change these once, every page updates */
const CONFIG = {
  brand: 'Sitara Clothing',
  whatsapp: '923001234567',            // country code + number, no + or spaces
  phone: '+92 300 1234567',
  email: 'hello@sitaraclothing.pk',
  address: 'Shop 14, Main Boulevard Market, Gulberg III, Lahore',
  hours: 'Monday to Saturday, 11am to 8pm',
  instagram: '@sitaraclothing.pk',
  freeShipFrom: 3000,
  deliveryFee: 200,
  saleDays: 3                          // countdown length in days
};

/* 2. DATA
   img: paste a photo URL (Unsplash/Pexels) for each product.
   While img is empty a soft colour tile with the product name is shown. */
const PRODUCTS = [
  {id:1,name:'Gulaab Printed Lawn Suit, 3 Piece',cat:'lawn',fit:'women',price:3790,old:5490,badge:'Sale',stock:4,tone:'#F2D9DC',img:[],colors:[['Rose','#D98A9B'],['Mint','#A9CDB9']],desc:'Soft printed lawn shirt with matching shalwar and chiffon dupatta. Light enough for a Lahore summer.'},
  {id:2,name:'Charcoal Cotton Kurta',cat:'kurta',fit:'men',price:2690,old:0,badge:'New Arrival',stock:9,tone:'#D9D6D0',img:[],colors:[['Charcoal','#3B3B3B'],['Navy','#27364D']],desc:'Straight cut cotton kurta with side pockets. Easy to wear to the office, on Fridays and at family gatherings.'},
  {id:3,name:'Zaitoon Wash and Wear Shalwar Kameez',cat:'shalwar-kameez',fit:'men',price:3490,old:4990,badge:'Best Seller',stock:6,tone:'#DDE0D2',img:[],colors:[['Olive','#6B705C'],['Off white','#EFEBE0'],['Sand','#C9B79C']],desc:'Wash and wear fabric that stays crisp without ironing. Full stitched, ready to wear.'},
  {id:4,name:'Ivory Embroidered Formal Kurta',cat:'formal',fit:'women',price:6490,old:12990,badge:'50% OFF',stock:3,tone:'#EFE8D8',img:[],colors:[['Ivory','#F4EFE2'],['Blush','#EBCFC7']],desc:'Hand finished neckline embroidery on soft cotton net. Made for mehndi, nikkah and Eid dinners.'},
  {id:5,name:'Sky Blue Cotton Casual Kurta',cat:'casual',fit:'men',price:2290,old:0,badge:'New Arrival',stock:12,tone:'#D6E3EC',img:[],colors:[['Sky blue','#A9C7DD'],['White','#F7F7F4']],desc:'Relaxed cotton kurta for hot afternoons, weekend outings and Friday prayers.'},
  {id:6,name:'Sage Green Lawn Shalwar Kameez',cat:'lawn',fit:'women',price:3290,old:4290,badge:'Best Seller',stock:5,tone:'#DCE3D6',img:[],colors:[['Sage green','#A9B8A0'],['Forest green','#4F6F52']],desc:'Soft lawn kameez with matching shalwar in a calm green. Light and breathable for summer.'},
  {id:7,name:'Festive Kurta Shalwar with Shawl',cat:'formal',fit:'men',price:5990,old:7490,badge:'Sale',stock:7,tone:'#E6D9C4',img:[],colors:[['Cream','#EFE6D2'],['Fawn','#C9B79C']],desc:'Kurta and shalwar set finished with a shawl, made for weddings and Eid. Pair it with khussa for the full look.'},
  {id:8,name:'Sunshine Yellow Casual Shalwar Kameez',cat:'casual',fit:'women',price:2990,old:3990,badge:'Sale',stock:8,tone:'#F4E6BC',img:[],colors:[['Sunshine yellow','#E9C46A'],['Mustard','#C79A2E']],desc:'Bright, easy care suit for everyday wear, college and family visits.'}
];
/* PHOTOS: free Pexels photos (no attribution needed). Numbers are Pexels photo IDs,
   first ID is the card image, the rest fill the gallery on the product page.
   To swap a photo, paste any Pexels ID, or replace px() to use your own image URLs. */
const px = (id, w = 800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const PHOTOS = {
  1:[20690539,20690519,20690513,25184995],   // floral lawn suit: women in floral and pink salwar kameez
  2:[40366351,8770930,40366340,40366341],    // charcoal kurta: men in black kurta
  3:[8692253,8621978,12165106,8570134],      // shalwar kameez: men in shalwar kameez
  4:[20516286,36634909],                     // ivory formal kurta: women in white and embroidered formal wear
  5:[8692305,8692658,8692657,8588663],       // sky blue kurta: men in blue kurta and shalwar kameez
  6:[22064201,35576577],                     // sage green suit: women in green salwar kameez
  7:[8588636,9108786,33952751],              // festive kurta shalwar with shawl: men in traditional dress
  8:[33824984,20407233]                      // yellow casual suit: women in yellow salwar kameez
};
PRODUCTS.forEach(p => p.img = (PHOTOS[p.id] || []).map(id => px(id)));
const HERO_IMG = px(31874436, 1000);
const CATS = [['all','All'],['kurta','Kurta'],['shalwar-kameez','Shalwar Kameez'],['lawn','Lawn Suits'],['casual','Casual Wear'],['formal','Formals']];
const CAT_LABEL = {kurta:'Kurta','shalwar-kameez':'Shalwar Kameez',lawn:'Lawn suit',casual:'Casual wear',formal:'Formal'};
const CHEST = {S:'38',M:'40',L:'42',XL:'44'};
const REVIEWS = [
  {n:'Ayesha Rehman',c:'Lahore',t:'Ordered the lawn suit for Eid. The fabric is soft, the colour matches the pictures and it reached me in three days. I opened the parcel before paying, which gave me confidence.'},
  {n:'Hamza Tariq',c:'Karachi',t:'The white kurta fits properly at the shoulders and did not shrink after washing. I have already ordered two more for Friday prayers.'},
  {n:'Sana Malik',c:'Islamabad',t:'I needed a size exchange and they sorted it on WhatsApp the same day. Honest service is rare online.'},
  {n:'Usman Ghani',c:'Faisalabad',t:'The wash and wear shalwar kameez is good for the price. Stitching is neat and the cotton is not see through.'},
  {n:'Mahnoor Iqbal',c:'Multan',t:'The embroidery on the formal kurta looks even better in person. I got many compliments at my cousin’s mehndi.'},
  {n:'Bilal Ahmed',c:'Rawalpindi',t:'Free delivery above three thousand rupees and cash on delivery made it an easy decision. Packing was neat.'}
];

/* 3. HELPERS */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pkr = n => '₨' + Number(n).toLocaleString('en-PK');
const wa = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const off = p => p.old ? Math.round((1 - p.price / p.old) * 100) : 0;

/* Simple line icons (Phosphor style, drawn inline so no library is needed) */
const PATHS = {
  truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  back:'<path d="M5 8h10a5 5 0 010 10H8M5 8l3-3M5 8l3 3"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  lock:'<path d="M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  cart:'<path d="M3 4h3l2 11h10l2-8H7"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>',
  pin:'<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/>',
  mail:'<path d="M3 6h18v12H3zM3 7l9 7 9-7"/>',
  wa:'<path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-2-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
};
const ico = (n, c = '') => `<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${PATHS[n]}</svg>`;
const stars = () => `<span class="stars" role="img" aria-label="5 out of 5 stars">${ico('star', 'fill').repeat(5)}</span>`;

/* Product picture: real photo if img is set, otherwise a labelled colour tile */
const pic = (src, label, tone = '#E9E2D6') => src
  ? `<img src="${src}" alt="${label}" loading="lazy" onerror="this.outerHTML='<div class=ph style=--tone:${tone}>${label}</div>'">`
  : `<div class="ph" style="--tone:${tone}" role="img" aria-label="${label}">${label}</div>`;

const stockText = p => p.stock <= 8 ? `Only ${p.stock} left in stock` : 'In stock, ships in 24 hours';

/* 4. HEADER, MOBILE MENU, FOOTER, WHATSAPP BUTTON (same on every page) */
function buildChrome() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const links = [['index.html','Home'],['shop.html','Shop'],['about.html','About'],['contact.html','Contact']];
  const nav = links.map(([h, t]) =>
    `<a href="${h}" class="title-3" ${page === h || (h === 'shop.html' && page === 'product.html') ? 'aria-current="page"' : ''}>${t}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
    <a class="skip" href="#main">Skip to content</a>
    <div class="ann caption-4"><b>Cash on Delivery Available</b> · Free Delivery on Orders Above ${pkr(CONFIG.freeShipFrom)} · Sale ends in <b data-countdown-text></b></div>
    <header class="hdr">
      <a href="index.html" class="brand" aria-label="${CONFIG.brand} home">Sitara<span>.</span></a>
      <nav class="nav" aria-label="Main">${nav}</nav>
      <div class="hdr-end">
        <button class="cart" id="cartBtn" aria-label="Order cart on WhatsApp">${ico('cart')}<span class="cart-n caption-3" id="cartN">0</span></button>
        <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </header>
    <nav class="panel" aria-label="Mobile">${nav}</nav>`);

  const chips = ['Cash on Delivery','Easypaisa','JazzCash','Bank transfer'].map(t => `<span class="chip caption-4">${t}</span>`).join('');
  const shopLinks = CATS.slice(1).map(([k, l]) => `<li><a href="shop.html?c=${k}">${l}</a></li>`).join('');
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="ftr"><div class="wrap">
      <div class="ftr-grid">
        <div><a href="index.html" class="brand">Sitara<span>.</span></a>
          <p class="body-6 muted" style="margin-top:12px">Everyday and festive wear stitched in Lahore. Cash on delivery across Pakistan and seven days to exchange.</p>
          <div class="chips">${chips}</div></div>
        <div><h4 class="title-3">Shop</h4><ul class="body-6">${shopLinks}</ul></div>
        <div><h4 class="title-3">Help</h4><ul class="body-6">
          <li><a href="about.html#returns">Returns and exchange</a></li>
          <li><a href="about.html#policies">Privacy policy and terms</a></li>
          <li><a href="contact.html#faq">Questions and answers</a></li>
          <li><a href="${wa('Assalam o Alaikum, I need help with my order.')}" target="_blank" rel="noopener">Chat on WhatsApp</a></li></ul></div>
        <div><h4 class="title-3">Contact us</h4><ul class="body-6">
          <li>${ico('phone')} <a href="tel:${CONFIG.phone.replace(/\s/g,'')}">${CONFIG.phone}</a></li>
          <li>${ico('mail')} <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
          <li>${ico('pin')} ${CONFIG.address}</li><li class="muted">${CONFIG.hours}</li></ul>
          <div class="chips"><span class="chip caption-4">100% Original</span><span class="chip caption-4">Secure Checkout</span><span class="chip caption-4">Verified Seller</span></div></div>
      </div>
      <div class="ftr-bot caption-5 muted"><span>© ${new Date().getFullYear()} ${CONFIG.brand}. All rights reserved.</span><span>Instagram ${CONFIG.instagram}</span></div>
    </div></footer>
    <a class="wa-float" href="${wa('Assalam o Alaikum, I have a question about your clothes.')}" target="_blank" rel="noopener" aria-label="Order on WhatsApp">${ico('wa')}</a>
    <div class="toast body-4" id="toast" role="status" aria-live="polite"></div>`);

  // Mobile menu toggle
  const burger = $('#burger');
  const setMenu = open => { document.body.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('.panel a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  $('#cartBtn').addEventListener('click', checkoutOnWhatsApp);
}

let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* 5. CART (saved in localStorage, falls back to memory if storage is blocked) */
let memCart = [];
const getCart = () => { try { return JSON.parse(localStorage.getItem('sitara_cart')) || []; } catch (e) { return memCart; } };
const setCart = c => { memCart = c; try { localStorage.setItem('sitara_cart', JSON.stringify(c)); } catch (e) {} updateCartCount(); };
const updateCartCount = () => { const n = $('#cartN'); if (n) n.textContent = getCart().length; };

function addToCart(id, size, color) {
  const c = getCart(); c.push({id, size, color}); setCart(c);
  const p = PRODUCTS.find(x => x.id === id);
  toast(`${p.name} added to your cart.`);
  const b = $('#cartN'); b.animate([{transform:'scale(1.4)'},{transform:'scale(1)'}], {duration:500, easing:'cubic-bezier(0.22,1,0.36,1)'});
}

// The cart has no payment page: the order is confirmed on WhatsApp
function checkoutOnWhatsApp() {
  const c = getCart();
  if (!c.length) return toast('Your cart is empty. Pick a piece from the shop first.');
  let total = 0;
  const lines = c.map((i, k) => { const p = PRODUCTS.find(x => x.id === i.id); total += p.price; return `${k + 1}. ${p.name} (Size ${i.size}, ${i.color}) ${pkr(p.price)}`; });
  const ship = total >= CONFIG.freeShipFrom ? 'Free delivery' : `Delivery ${pkr(CONFIG.deliveryFee)}`;
  window.open(wa(`Assalam o Alaikum, I would like to order:\n${lines.join('\n')}\n${ship}\nTotal ${pkr(total + (total >= CONFIG.freeShipFrom ? 0 : CONFIG.deliveryFee))}. Cash on delivery please.`), '_blank');
}

/* 6. RENDERERS */
function card(p) {
  const d = off(p);
  return `<article class="card reveal">
    <a class="card-img" href="product.html?id=${p.id}" aria-label="${p.name}">${pic(p.img[0], p.name, p.tone)}<span class="badge caption-3" data-b="${p.badge}">${p.badge}</span></a>
    <div class="card-body">
      <p class="caption-4 muted">${CAT_LABEL[p.cat]}</p>
      <h3 class="title-4"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <p class="price body-4"><b>${pkr(p.price)}</b>${p.old ? ` <s>${pkr(p.old)}</s> <span class="off caption-3">${d}% off</span>` : ''}</p>
      <p class="urgent caption-3">${stockText(p)}</p>
    </div></article>`;
}
const reviewCard = r => `<article class="rev reveal">${stars()}<p class="body-6">${r.t}</p><p class="title-4">${r.n}</p><p class="caption-5 muted">Verified buyer, ${r.c}</p></article>`;

const TRUST = [
  ['truck','Cash on Delivery Available','Pay the rider after you check the parcel'],
  ['truck',`Free Delivery on Orders Above ${pkr(CONFIG.freeShipFrom)}`,'Nationwide, usually 2 to 4 days'],
  ['back','7 Day Easy Returns / Exchange','Wrong size or colour? We swap it'],
  ['shield','100% Original','Our own designs and fabric'],
  ['lock','Secure Checkout','Orders are confirmed on WhatsApp'],
  ['check','Verified Seller','Real shop, real address in Lahore']
];

/* Blocks reused on several pages: <div data-block="trust|returns|reviews|insta"> */
const BLOCKS = {
  stars: () => stars(),
  trust: () => TRUST.map(([i, t, s]) => `<div class="reveal">${ico(i)}<p class="title-4">${t}</p><p class="caption-5 muted">${s}</p></div>`).join(''),
  reviews: () => REVIEWS.map(reviewCard).join(''),
  insta: () => PRODUCTS.slice(0, 6).map(p => `<a href="product.html?id=${p.id}" class="reveal" aria-label="${p.name}">${pic(p.img[0], p.name, p.tone)}</a>`).join(''),
  returns: () => [
    ['Open before you pay','With cash on delivery you check the fabric and stitching while the rider waits.'],
    ['Exchange within 7 days','Wrong size or colour? Message us on WhatsApp and we send a replacement.'],
    ['Refund if we got it wrong','If the piece is damaged or different from the photos, we return your money.']
  ].map(([t, s], i) => `<article class="reveal"><span class="num title-4">${i + 1}</span><h3 class="title-1">${t}</h3><p class="body-6 muted">${s}</p></article>`).join('')
};
function renderBlocks() { $$('[data-block]').forEach(el => el.innerHTML = BLOCKS[el.dataset.block]()); }

/* 7. PAGE LOGIC */
// Home: featured products
function initHome() {
  const f = $('#featured'); if (f) f.innerHTML = [3, 1, 6, 4].map(id => card(PRODUCTS.find(p => p.id === id))).join('');
  const h = $('#heroPic'); if (h) h.innerHTML = pic(HERO_IMG, 'New season lawn, kurtas and shalwar kameez', '#E9E2D6') + '<span class="badge caption-3" data-b="Sale">Limited Stock</span>';
  // Tagline reveal: words turn from muted to full colour one at a time while scrolling
  const t = $('.tagline');
  if (t) {
    t.innerHTML = t.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return $$('.w', t).forEach(w => w.classList.add('on'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), {rootMargin: '0px 0px -35% 0px'});
    $$('.w', t).forEach(w => io.observe(w));
  }
}

// Shop: filter buttons (also reads ?c=kurta from the footer links)
function initShop() {
  const grid = $('#shopGrid'); if (!grid) return;
  const bar = $('#filters');
  const start = new URLSearchParams(location.search).get('c');
  let current = CATS.some(c => c[0] === start) ? start : 'all';
  bar.innerHTML = CATS.map(([k, l]) => `<button class="button-sm" data-c="${k}">${l}</button>`).join('');
  const draw = () => {
    const list = PRODUCTS.filter(p => current === 'all' || p.cat === current);
    $$('button', bar).forEach(b => { b.classList.toggle('on', b.dataset.c === current); b.setAttribute('aria-pressed', b.dataset.c === current); });
    $('#count').textContent = `${list.length} ${list.length === 1 ? 'piece' : 'pieces'}`;
    grid.innerHTML = list.length ? list.map(card).join('') : '<div class="empty" style="grid-column:1/-1"><p class="title-1">Nothing here yet</p><p class="body-6 muted">New pieces arrive every week. Try another category.</p></div>';
    observe();
  };
  bar.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { current = b.dataset.c; draw(); } });
  draw();
}

// Product: details from ?id=, size and colour pickers, add to cart, buy now
function initProduct() {
  const box = $('#product'); if (!box) return;
  const p = PRODUCTS.find(x => x.id === Number(new URLSearchParams(location.search).get('id')));
  if (!p) { box.innerHTML = '<div class="empty" style="grid-column:1/-1"><p class="title-1">We could not find that piece</p><p class="body-6 muted">It may be sold out. <a href="shop.html" style="text-decoration:underline">Browse the shop</a>.</p></div>'; return; }
  document.title = `${p.name} | ${CONFIG.brand}`;
  const views = ['Front view', 'Back view', 'Fabric close up', 'Styled look'].slice(0, Math.max(1, p.img.length));
  let size = '', color = p.colors[0][0];
  const unit = p.fit === 'men' ? 'Chest' : 'Bust';
  box.innerHTML = `
    <div><div class="gal-main" id="gal">${pic(p.img[0], p.name + ', ' + views[0], p.tone)}<span class="badge caption-3" data-b="${p.badge}">${p.badge}</span></div>
      ${views.length > 1 ? `<div class="thumbs">${views.map((v, i) => `<button class="${i ? '' : 'on'}" data-i="${i}" aria-label="${v}">${pic(p.img[i], v, p.tone)}</button>`).join('')}</div>` : ''}</div>
    <div class="pd-info">
      <p class="caption-4 muted">${CAT_LABEL[p.cat]} · ${p.fit === 'men' ? 'Men' : 'Women'}</p>
      <h1 class="heading-4">${p.name}</h1>
      <p class="price title-1"><b>${pkr(p.price)}</b>${p.old ? ` <s>${pkr(p.old)}</s> <span class="off caption-3">${off(p)}% off</span>` : ''}</p>
      <p class="urgent caption-3">${stockText(p)}. Limited time price.</p>
      <p class="body-6 muted">${p.desc}</p>
      <div><p class="title-4" style="margin-bottom:8px">Colour: <span id="colName">${color}</span></p>
        <div class="row">${p.colors.map(([n, h], i) => `<button class="swatch ${i ? '' : 'on'}" data-n="${n}" style="background:${h}" aria-label="${n}"></button>`).join('')}</div></div>
      <div><p class="title-4" style="margin-bottom:8px">Size (${unit.toLowerCase()} in inches)</p>
        <div class="row" id="sizes">${Object.keys(CHEST).map(s => `<button class="opt button-sm" data-s="${s}">${s} · ${CHEST[s]}"</button>`).join('')}</div>
        <p class="caption-5 muted" style="margin-top:8px">Not sure? Send us your usual size on WhatsApp and we will confirm the fit.</p></div>
      <p class="err caption-4" id="sizeErr" role="alert"></p>
      <div class="row"><button class="btn btn-primary btn-lg button-md" id="add">${ico('cart')} Add to cart</button><button class="btn btn-ghost btn-lg button-md" id="buy">Buy now on WhatsApp</button></div>
      <div class="mini body-6">
        <div>${ico('truck')} Cash on Delivery Available</div>
        <div>${ico('truck')} Free delivery above ${pkr(CONFIG.freeShipFrom)}</div>
        <div>${ico('back')} 7 Day Easy Returns / Exchange</div>
        <div>${ico('shield')} 100% Original, Verified Seller</div></div>
    </div>`;
  // thumbnails swap the main picture
  const th = $('.thumbs', box); if (th) th.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('.thumbs button', box).forEach(x => x.classList.toggle('on', x === b)); $('#gal .ph, #gal img').outerHTML = pic(p.img[+b.dataset.i], p.name + ', ' + views[b.dataset.i], p.tone); });
  $$('.swatch', box).forEach(s => s.addEventListener('click', () => { color = s.dataset.n; $('#colName').textContent = color; $$('.swatch', box).forEach(x => x.classList.toggle('on', x === s)); }));
  $('#sizes').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; size = b.dataset.s; $('#sizeErr').textContent = ''; $$('#sizes button').forEach(x => x.classList.toggle('on', x === b)); });
  const need = () => { if (size) return true; $('#sizeErr').textContent = 'Choose a size before you continue.'; return false; };
  $('#add').addEventListener('click', () => need() && addToCart(p.id, size, color));
  $('#buy').addEventListener('click', () => need() && window.open(wa(`Assalam o Alaikum, I want to order ${p.name}, Size ${size}, Colour ${color}, ${pkr(p.price)}. Cash on delivery please.`), '_blank'));
  const more = $('#more'); if (more) more.innerHTML = PRODUCTS.filter(x => x.id !== p.id && x.cat !== p.cat).slice(0, 4).map(card).join('');
  const rv = $('#prodReviews'); if (rv) rv.innerHTML = REVIEWS.slice(0, 3).map(reviewCard).join('');
}

// Contact: client side validation (frontend only, nothing is sent)
function initContact() {
  const f = $('#contactForm'); if (!f) return;
  const rules = {
    name: v => v.trim().length >= 2 || 'Please enter your name.',
    phone: v => /^(\+92|0)?3\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a mobile number like 0300 1234567.',
    email: v => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address, or leave it empty.',
    message: v => v.trim().length >= 10 || 'Please write at least 10 characters so we can help.'
  };
  f.addEventListener('submit', e => {
    e.preventDefault(); let ok = true;
    Object.keys(rules).forEach(k => {
      const input = f.elements[k], res = rules[k](input.value), box = input.closest('.field');
      box.classList.toggle('bad', res !== true); $('small', box).textContent = res === true ? '' : res; if (res !== true) ok = false;
    });
    if (ok) { f.hidden = true; $('#sent').hidden = false; }
  });
}

/* 8. COUNTDOWN: one shared sale end time, kept in localStorage */
function saleEnd() {
  try {
    let end = Number(localStorage.getItem('sitara_sale_end'));
    if (!end || end < Date.now()) { end = Date.now() + CONFIG.saleDays * 864e5; localStorage.setItem('sitara_sale_end', end); }
    return end;
  } catch (e) { return Date.now() + CONFIG.saleDays * 864e5; }
}
function startCountdown() {
  const end = saleEnd(), two = n => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60); s %= 60;
    $$('[data-countdown-text]').forEach(el => el.textContent = `${d}d ${two(h)}h ${two(m)}m ${two(s)}s`);
    $$('[data-cd]').forEach(el => el.textContent = two({d, h, m, s}[el.dataset.cd]));
  };
  tick(); setInterval(tick, 1000);
}

/* 9. SCROLL REVEALS (IntersectionObserver, plays once) */
let revealIO;
function observe() {
  revealIO = revealIO || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }), {threshold: .12});
  $$('.reveal:not(.in)').forEach(el => revealIO.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  buildChrome(); renderBlocks(); updateCartCount();
  initHome(); initShop(); initProduct(); initContact();
  startCountdown(); observe();
});
