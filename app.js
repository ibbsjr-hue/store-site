const products = [
  {id:1,name:"Product One",price:24},
  {id:2,name:"Product Two",price:39},
  {id:3,name:"Product Three",price:15.5},
  {id:4,name:"Product Four",price:60}
];
let cart = JSON.parse(localStorage.getItem("cart") || "{}");
const $ = id => document.getElementById(id);
const money = n => "$" + n.toFixed(2);

$("products").innerHTML = products.map(p =>
  `<div class="card"><div class="img"></div><div>${p.name}</div><div class="price">${money(p.price)}</div><button data-add="${p.id}">Add to cart</button></div>`
).join("");

function render(){
  localStorage.setItem("cart", JSON.stringify(cart));
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
