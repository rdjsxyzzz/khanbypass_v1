(function(){

console.log("🔧 DOM modification test started");

// --------- HEADER ---------

const headerTitle = document.querySelector("header h1, header .logo, header");

if(headerTitle){
  
  const badge = document.createElement("span");
  badge.innerText = " TEST ";
  badge.style.background = "yellow";
  badge.style.color = "black";
  badge.style.padding = "3px 6px";
  badge.style.marginLeft = "8px";
  badge.style.fontSize = "12px";

  headerTitle.appendChild(badge);

  console.log("Header modified");
}


// --------- SIDEBAR ---------

const sidebar = document.querySelector("aside, nav");

if(sidebar){

  const fakeItem = document.createElement("div");
  fakeItem.innerText = "⚠ Test Item";
  fakeItem.style.color = "red";
  fakeItem.style.padding = "8px";
  fakeItem.style.fontWeight = "bold";

  sidebar.appendChild(fakeItem);

  console.log("Sidebar modified");
}


// --------- VISUAL ALERT ---------

const banner = document.createElement("div");
banner.innerText = "DOM SECURITY TEST";
banner.style.position = "fixed";
banner.style.bottom = "20px";
banner.style.right = "20px";
banner.style.background = "red";
banner.style.color = "white";
banner.style.padding = "10px";
banner.style.zIndex = "999999";

document.body.appendChild(banner);

})();
