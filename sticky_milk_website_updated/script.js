// ====== CHANGE THIS NUMBER ======
// Malaysia format WITHOUT + or spaces.
// Example: 60123456789
const WHATSAPP_NUMBER = "60142646650";

const prices = {
  Pistachio: 5,
  "Vanilla Blue": 5,
  Chocolate: 5,
  "Strawberry Tart": 5
};

const quantities = {
  Pistachio: 0,
  "Vanilla Blue": 0,
  Chocolate: 0,
  "Strawberry Tart": 0
};

function changeQty(item, amount) {
  quantities[item] = Math.max(0, quantities[item] + amount);
  document.getElementById(`qty-${item.replaceAll(" ", "-")}`).textContent = quantities[item];
  updateTotal();
}

function addItem(item) {
  quantities[item] += 1;
  document.getElementById(`qty-${item.replaceAll(" ", "-")}`).textContent = quantities[item];
  updateTotal();
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function updateTotal() {
  let total = 0;
  Object.keys(quantities).forEach(item => {
    total += quantities[item] * prices[item];
  });
  document.getElementById("total").textContent = `RM${total}`;
}

function orderWhatsApp() {
  const selected = Object.entries(quantities).filter(([_, qty]) => qty > 0);

  if (selected.length === 0) {
    alert("Please choose at least one Sticky Milk.");
    return;
  }

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please replace WHATSAPP_NUMBER in script.js with your real WhatsApp number first.");
    return;
  }

  let total = 0;
  let message = "Hi Sticky Milk! 👋%0A%0AI would like to order:%0A";

  selected.forEach(([item, qty]) => {
    const subtotal = qty * prices[item];
    total += subtotal;
    message += `• ${item} x ${qty} = RM${subtotal}%0A`;
  });

  message += `%0ATotal: RM${total}%0A%0AThank you!`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

updateTotal();
