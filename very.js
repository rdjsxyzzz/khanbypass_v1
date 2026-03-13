(async function(){

console.log("🔎 Simulación de ataques iniciada");

const results = [];

function report(name, ok){
  results.push({test:name, status: ok ? "BLOCKED ✅" : "VULNERABLE ❌"});
  console.log((ok ? "🛡️" : "⚠️"), name);
}

// --------------------
// XSS payload tests
// --------------------

const xssPayloads = [
"<script>alert(1)</script>",
"<img src=x onerror=alert(1)>",
"<svg/onload=alert(1)>",
"<body onload=alert(1)>",
"javascript:alert(1)"
];

let xssBlocked = true;

for(const payload of xssPayloads){
  const el = document.createElement("div");
  el.innerHTML = payload;

  if(el.querySelector("script") || el.querySelector("[onerror]")){
    xssBlocked = false;
  }
}

report("XSS payload sanitization", xssBlocked);


// --------------------
// SQL injection test
// --------------------

const sqlPayloads = [
"' OR 1=1 --",
"' OR 'a'='a",
"' UNION SELECT * FROM users --",
"admin'--"
];

let sqlBlocked = true;

sqlPayloads.forEach(p=>{
  if(document.body.innerHTML.includes(p)){
    sqlBlocked = false;
  }
});

report("SQL injection pattern detection", sqlBlocked);


// --------------------
// paste injection test
// --------------------

const input = document.querySelector("input");

let pasteBlocked = true;

if(input){

  const evt = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });

  evt.clipboardData.setData("text/plain","<script>alert(1)</script>");

  const prevented = !input.dispatchEvent(evt);

  pasteBlocked = prevented;
}

report("Malicious paste blocked", pasteBlocked);


// --------------------
// drag & drop test
// --------------------

let dragBlocked = false;

const dragEvent = new Event("dragover",{cancelable:true});
document.addEventListener("dragover",e=>{
  if(e.defaultPrevented) dragBlocked = true;
});

document.dispatchEvent(dragEvent);

report("Drag & drop protection", dragBlocked);


// --------------------
// iframe test
// --------------------

const clickjackProtected = window.self === window.top;

report("Clickjacking protection", clickjackProtected);


// --------------------
// rate limit simulation
// --------------------

let rateLimitActive = false;

for(let i=0;i<10;i++){
  const start = performance.now();
  await fetch(window.location.href);
  const time = performance.now() - start;

  if(time > 1000){
    rateLimitActive = true;
  }
}

report("Rate limit behavior detected", rateLimitActive);


// --------------------
// summary
// --------------------

console.log("------ RESULTADOS ------");
console.table(results);

const banner = document.createElement("div");
banner.innerText = "Security attack simulation completed";
banner.style.position="fixed";
banner.style.bottom="10px";
banner.style.right="10px";
banner.style.background="black";
banner.style.color="white";
banner.style.padding="10px";
banner.style.zIndex="999999";

document.body.appendChild(banner);

})();
