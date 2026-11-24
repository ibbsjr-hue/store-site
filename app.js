const products = [
  {id:1,name:"Felt Desk Mat",desc:"Wool felt, 80 x 40 cm. Quiet keys, warm surface.",price:48},
  {id:2,name:"Oak Monitor Riser",desc:"Solid oak with a hidden cable slot.",price:79},
  {id:3,name:"Focus Timer",desc:"Analog 25 minute timer. No screen, no pings.",price:29},
  {id:4,name:"Cable Keeper Set",desc:"Six silicone clips that keep cables in place.",price:14},
  {id:5,name:"Ceramic Pen Cup",desc:"Hand-glazed stoneware in matte sand.",price:22},
  {id:6,name:"Desk Starter Bundle",desc:"Mat, timer and cable keepers together.",price:79}
];
let cart = {};
try { cart = JSON.parse(localStorage.getItem("cart") || "{}"); } catch (e) { cart = {}; }
const $ = id => document.getElementById(id);
const money = n => "$" + n.toFixed(2);

const S = (bg, body) => `<svg viewBox="0 0 250 190" xmlns="http://www.w3.org/2000/svg"><rect width="250" height="190" fill="${bg}"/>${body}</svg>`;
const art = {
  1: S("#e9dfce", `<ellipse cx="125" cy="150" rx="100" ry="14" fill="#d8c9b0"/><rect x="30" y="70" width="190" height="70" rx="10" fill="#8a9a8b"/><rect x="38" y="78" width="174" height="54" rx="6" fill="none" stroke="#a9b8aa" stroke-width="2" stroke-dasharray="5 4"/><rect x="95" y="90" width="60" height="26" rx="4" fill="#f4efe6"/>`),
  2: S("#efe6d6", `<rect x="40" y="60" width="170" height="14" rx="4" fill="#c58b55"/><rect x="48" y="74" width="16" height="56" fill="#a96f3e"/><rect x="186" y="74" width="16" height="56" fill="#a96f3e"/><rect x="105" y="66" width="40" height="5" rx="2" fill="#7e5129"/><rect x="85" y="14" width="80" height="46" rx="4" fill="#2b2622"/><rect x="90" y="19" width="70" height="36" fill="#6f8794"/><ellipse cx="125" cy="138" rx="90" ry="6" fill="#d8c9b0"/>`),
  3: S("#f0e3d3", `<ellipse cx="125" cy="150" rx="55" ry="9" fill="#d8c0a4"/><circle cx="125" cy="95" r="52" fill="#b4683c"/><circle cx="125" cy="95" r="40" fill="#fffdf9"/><path d="M125 95V65M125 95l18 10" stroke="#2b2622" stroke-width="4" stroke-linecap="round"/><circle cx="125" cy="95" r="4" fill="#2b2622"/><path d="M125 43v-8" stroke="#2b2622" stroke-width="5" stroke-linecap="round"/>`),
  4: S("#e8e2d3", `<path d="M20 120c60-50 110 40 210-20" fill="none" stroke="#2b2622" stroke-width="5" stroke-linecap="round"/><g fill="#8a9a8b"><rect x="55" y="88" width="26" height="22" rx="8"/><rect x="105" y="100" width="26" height="22" rx="8"/><rect x="155" y="92" width="26" height="22" rx="8"/><rect x="200" y="78" width="26" height="22" rx="8"/></g><g fill="#fffdf9"><circle cx="68" cy="99" r="5"/><circle cx="118" cy="111" r="5"/><circle cx="168" cy="103" r="5"/><circle cx="213" cy="89" r="5"/></g>`),
  5: S("#eee4d2", `<ellipse cx="125" cy="156" rx="48" ry="8" fill="#d8c9b0"/><path d="M82 60h86l-8 92c0 4-4 6-8 6H98c-4 0-8-2-8-6z" fill="#d9c4a0"/><ellipse cx="125" cy="60" rx="43" ry="8" fill="#c9b189"/><ellipse cx="125" cy="60" rx="36" ry="5" fill="#4a3f35"/><path d="M110 58l-6-34M125 56l2-38M138 58l12-30" stroke="#2b2622" stroke-width="4" stroke-linecap="round"/>`),
  6: S("#f0e0cf", `<rect x="25" y="95" width="130" height="50" rx="8" fill="#8a9a8b"/><circle cx="185" cy="85" r="34" fill="#b4683c"/><circle cx="185" cy="85" r="26" fill="#fffdf9"/><path d="M185 85V68M185 85l11 6" stroke="#2b2622" stroke-width="3" stroke-linecap="round"/><path d="M40 70c30-22 50 18 80-4" fill="none" stroke="#2b2622" stroke-width="4" stroke-linecap="round"/><ellipse cx="125" cy="152" rx="100" ry="7" fill="#d8c9b0"/>`)
};
$("products").innerHTML = products.map(p =>
  `<div class="card${p.id==6?" featured":""}">${p.id==6?'<span class="badge">Best value</span>':""}<div class="img" role="img" aria-label="${p.name}">${art[p.id]}</div><div><strong>${p.name}</strong></div><div class="desc">${p.desc}</div><div class="price">${money(p.price)}</div><button data-add="${p.id}">Add to cart</button></div>`
).join("");

function save(){ try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} }

function render(){
  save();
  let total = 0, count = 0;
  $("items").innerHTML = Object.entries(cart).map(([id,q]) => {
    const p = products.find(x => x.id == id);
    total += p.price * q; count += q;
    return `<li><span>${p.name} x${q}</span><span>${money(p.price*q)} <button data-rm="${id}">-</button></span></li>`;
  }).join("");
  $("total").textContent = money(total);
  $("count").textContent = count;
}
document.addEventListener("click", e => {
  const a = e.target.dataset.add, r = e.target.dataset.rm;
  if (a) cart[a] = (cart[a]||0) + 1;
  if (r && --cart[r] <= 0) delete cart[r];
  if (a || r) render();
});
$("cart-toggle").onclick = () => $("cart").hidden = !$("cart").hidden;
$("checkout").onclick = () => $("note").textContent = "Checkout is a placeholder. Payments are not connected yet.";
render();
