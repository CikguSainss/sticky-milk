// ====== CHANGE THIS NUMBER ======
// Malaysia format WITHOUT + or spaces.
// Example: 60123456789
const WHATSAPP_NUMBER = "6014264650";

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

function qtyId(item) {
  return `qty-${item.replaceAll(" ", "-")}`;
}

function changeQty(item, amount) {
  quantities[item] = Math.max(0, quantities[item] + amount);
  document.getElementById(qtyId(item)).textContent = quantities[item];
  updateTotal();
}

function addItem(item) {
  quantities[item] += 1;
  document.getElementById(qtyId(item)).textContent = quantities[item];
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
    alert("Please select at least one Sticky Milk.");
    return;
  }

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please enter the real WhatsApp number in script.js first.");
    return;
  }

  let total = 0;
  const lines = ["Hi Sticky Milk! 👋", "", "Saya nak order:", ""];

  selected.forEach(([item, qty]) => {
    const subtotal = qty * prices[item];
    total += subtotal;
    lines.push(`• ${item} x ${qty} = RM${subtotal}`);
  });

  lines.push("", `Total: RM${total}`, "", "Terima kasih! 🥛");
  const message = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

updateTotal();
