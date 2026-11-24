(function(){
  var cart=document.getElementById('cart'),toggle=document.getElementById('cart-toggle');
  var bd=document.createElement('div');bd.id='cart-backdrop';bd.hidden=true;document.body.appendChild(bd);
  var x=document.createElement('button');x.id='cart-close';x.type='button';x.setAttribute('aria-label','Close cart');x.textContent='\u00d7';cart.insertBefore(x,cart.firstChild);
  function sync(){bd.hidden=cart.hidden;toggle.setAttribute('aria-expanded',String(!cart.hidden));}
  function close(){cart.hidden=true;sync();}
  x.onclick=close;bd.onclick=close;
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!cart.hidden)close();});
  toggle.addEventListener('click',function(){setTimeout(sync,0);});
  var co=document.getElementById('checkout'),total=document.getElementById('total');
  function chk(){co.disabled=(total.textContent==='$0.00');}
  new MutationObserver(chk).observe(total,{childList:true,characterData:true,subtree:true});chk();
  document.addEventListener('click',function(e){var r=e.target.dataset&&e.target.dataset.rm;if(r){e.target.setAttribute('aria-label','Remove one');}});
  new MutationObserver(function(){document.querySelectorAll('#items button[data-rm]').forEach(function(b){b.setAttribute('aria-label','Remove one '+b.closest('li').firstChild.textContent);});}).observe(document.getElementById('items'),{childList:true});
  document.querySelectorAll('#items button[data-rm]').forEach(function(b){b.setAttribute('aria-label','Remove one '+b.closest('li').firstChild.textContent);});
})();
