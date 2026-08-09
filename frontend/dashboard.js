/* VIEW SWITCH */

function switchView(view){
  const dash=document.getElementById("mainDashboardView");
  const ai=document.getElementById("aiAdvisorSection");

  dash.style.display=view==="ai"?"none":"block";
  ai.style.display=view==="ai"?"block":"none";

  document.getElementById("navDash").classList.toggle("active",view!=="ai");
  document.getElementById("navAI").classList.toggle("active",view==="ai");
}


/* WEATHER */

const API="bd5e378503939ddaee76f12ad7a97608";

async function loadWeather(){

  try{
    const r=await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Bhimtal&units=metric&appid=${API}`
    );

    const d=await r.json();

    if(d.main){
      document.getElementById("dash-temp").textContent=
        Math.round(d.main.temp)+"°C";

      document.getElementById("dash-condition").textContent=
        d.weather[0].description;

      document.getElementById("dash-humidity").textContent=
        d.main.humidity+"%";

      document.getElementById("dash-wind").textContent=
        d.wind.speed+" km/h";
    }

  }catch(e){
    console.log("Using demo weather data");
  }
}

loadWeather();


/* PROFIT CHART */

new Chart(document.getElementById("profitChart"),{
  type:"line",
  data:{
    labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets:[{
      label:"Net Profit",
      data:[4000,5500,3000,7000,8500,6000,9300],
      borderColor:"#00ff66",
      backgroundColor:"rgba(0,255,102,.08)",
      fill:true,
      tension:.4
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{legend:{labels:{color:"#9bb0a4"}}},
    scales:{
      x:{ticks:{color:"#9bb0a4"},grid:{color:"#203c2b"}},
      y:{ticks:{color:"#9bb0a4"},grid:{color:"#203c2b"}}
    }
  }
});


/* IMAGE PREVIEW */

function previewImage(e){

  const file=e.target.files[0];
  if(!file)return;

  const img=document.getElementById("imagePreview");
  const text=document.getElementById("uploadContent");

  img.src=URL.createObjectURL(file);
  img.style.display="block";
  text.style.display="none";
}


/* DISEASE ANALYSIS */

function analyzeCropDisease(){

  const file=document.getElementById("cropImg").files[0];

  if(!file){
    alert("Please upload a crop image first!");
    return;
  }

  document.getElementById("diseaseResult").style.display="block";
}


/* AI CHAT */

function sendFullChat(){

  const input=document.getElementById("fullChatInp");
  const text=input.value.trim();

  if(!text)return;

  const box=document.getElementById("fullChatMsgs");

  box.innerHTML+=`
    <div class="user-msg">
      <b>You</b><br>${text}
    </div>`;

  input.value="";
  box.scrollTop=box.scrollHeight;

  setTimeout(()=>{

    let reply=
      "Maintain proper irrigation, monitor soil moisture and check your crop regularly. 🌱";

    const q=text.toLowerCase();

    if(q.includes("wheat")||q.includes("gehu"))
      reply="For wheat, maintain proper irrigation during the crown root initiation stage. 🌾";

    else if(q.includes("price")||q.includes("bhav"))
      reply="Market prices can vary. Check the Market section before selling your crop. 💰";

    else if(q.includes("water")||q.includes("irrigation"))
      reply="Your soil moisture is currently optimal at 42%. Next irrigation is recommended tomorrow at 7 AM. 💧";

    box.innerHTML+=`
      <div class="ai-msg">
        <b>AgriTwin AI</b><br>${reply}
      </div>`;

    box.scrollTop=box.scrollHeight;

  },600);
}


/* CLEAR CHAT */

function clearChat(){

  document.getElementById("fullChatMsgs").innerHTML=`
    <div class="ai-msg">
      <b>AgriTwin AI</b><br>
      Chat cleared! 🌱 How can I help you with your farm?
    </div>`;
}