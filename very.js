(async function(){

console.log("🔎 SECURITY AUDIT STARTED");

const results = [];

function report(name, ok){
  results.push({test:name, status: ok ? "PASS" : "FAIL"});
  console.log((ok ? "✅" : "❌"), name);
}


// --------------------
// XSS test
// --------------------

const payloads = [
"<script>alert(1)</script>",
"<img src=x onerror=alert(1)>",
"<svg/onload=alert(1)>",
"javascript:alert(1)"
];

let xssBlocked = true;

payloads.forEach(p=>{
  const div = document.createElement("div");
  div.innerHTML = p;

  if(div.querySelector("script") || div.querySelector("[onerror]")){
    xssBlocked = false;
  }
});

report("XSS sanitization", xssBlocked);


// --------------------
// eval protection
// --------------------

let evalBlocked = false;

try{
  eval("console.log('eval test')");
}catch{
  evalBlocked = true;
}

report("eval blocked", evalBlocked);


// --------------------
// iframe protection
// --------------------

const inIframe = window.self !== window.top;
report("clickjacking protection", !inIframe);


// --------------------
// drag drop protection
// --------------------

let dragPrevented = false;

document.addEventListener("dragover", e=>{
  if(e.defaultPrevented) dragPrevented = true;
});

const event = new Event("dragover", {cancelable:true});
document.dispatchEvent(event);

report("drag & drop blocked", dragPrevented);


// --------------------
// devtools detection
// --------------------

let devtoolsDetected = false;

const widthThreshold = window.outerWidth - window.innerWidth > 160;
const heightThreshold = window.outerHeight - window.innerHeight > 160;

if(widthThreshold || heightThreshold){
  devtoolsDetected = true;
}

report("devtools detection active", devtoolsDetected);


// --------------------
// summary
// --------------------

console.log("------ RESULTS ------");
console.table(results);

const banner = document.createElement("div");
banner.innerText = "SECURITY TEST COMPLETED";
banner.style.position="fixed";
banner.style.bottom="10px";
banner.style.right="10px";
banner.style.background="black";
banner.style.color="white";
banner.style.padding="10px";
banner.style.zIndex="999999";

document.body.appendChild(banner);

})();
