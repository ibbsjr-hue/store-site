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

$("products").innerHTML = products.map(p =>
  `<div class="card"><div class="img"></div><div><strong>${p.name}</strong></div><div class="desc">${p.desc}</div><div class="price">${money(p.price)}</div><button data-add="${p.id}">Add to cart</button></div>`
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
