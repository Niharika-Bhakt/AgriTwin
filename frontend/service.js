let selectedService = "";
let basePrice = 0;

const prices = {
  "Crop Spraying": 500,
  "Drone Monitoring": 800,
  "Farm Equipment": 1200,
  "Soil Testing": 300
};

function selectService(service, card){

  selectedService = service;
  basePrice = prices[service];

  document.querySelectorAll(".service-card")
    .forEach(c => c.classList.remove("selected"));

  card.classList.add("selected");

  document.getElementById("selectedService").value = service;
  document.getElementById("selectedText").innerText = service;

  calculatePrice();
}


function calculatePrice(){

  const acres = Number(document.getElementById("farmSize").value);

  if(!selectedService) return;

  const price = basePrice * acres;

  document.getElementById("estimatedPrice").innerText =
    "₹" + price.toLocaleString();
}


document.getElementById("farmSize").addEventListener(
  "change",
  calculatePrice
);


document.getElementById("bookingForm").addEventListener(
  "submit",
  function(e){

    e.preventDefault();

    if(!selectedService){
      alert("Please select a service first.");
      return;
    }

    const name =
      document.getElementById("farmerName").value.trim();

    const location =
      document.getElementById("location").value.trim();

    const date =
      document.getElementById("date").value;

    const price =
      document.getElementById("estimatedPrice").innerText;

    document.getElementById("bookingMessage").innerHTML =
      `Thank you <b>${name}</b>!<br><br>
       Your <b>${selectedService}</b> request for
       <b>${location}</b> has been received.<br><br>
       Estimated cost: <b>${price}</b><br>
       Preferred date: <b>${date}</b><br><br>
       AgriTwin will help find a nearby verified service provider.`;

    document.getElementById("successModal").style.display = "flex";
  }
);


function closeModal(){

  document.getElementById("successModal").style.display = "none";

  document.getElementById("bookingForm").reset();

  document.querySelectorAll(".service-card")
    .forEach(c => c.classList.remove("selected"));

  selectedService = "";
  basePrice = 0;

  document.getElementById("selectedText").innerText =
    "Please select a service";

  document.getElementById("estimatedPrice").innerText = "₹0";
}