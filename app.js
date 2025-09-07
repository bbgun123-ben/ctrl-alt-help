
const BRAND = {"name": "Ctrl+Alt+Help", "slogan": "Best School-Run Tech Support", "primary": "benniebluest@icloud.com", "secondary": "Carter.lanaway@hotmail.com", "kofi": "https://ko-fi.com/bennietzfanya", "city": "Online \u2014 Remote only"};
const SERVICES = [{"name": "Wi\u2011Fi Rescue", "price": 15, "unit": "flat", "why": "Includes basic router settings guidance and stability checks. Complex mesh systems or ISP escalations may require a custom quote."}, {"name": "PC Tune\u2011Up", "price": 20, "unit": "flat", "why": "Covers a standard remote tune\u2011up. If the device needs deep cleanup, OS repair, or data migration, we\u2019ll quote first."}, {"name": "Printer Setup", "price": 15, "unit": "flat", "why": "Standard setup and test page. Advanced multi\u2011function features or business networks may need extra time."}, {"name": "New Device Setup", "price": 10, "unit": "flat", "why": "Great for fresh laptops/phones. Data transfers or full backup planning can add time."}, {"name": "Website Basics (Wix)", "price": 10, "unit": "hour", "why": "Billed hourly for simple pages and edits. Larger content imports or custom features will be quoted."}, {"name": "Custom Website (HTML/JS)", "price": 30, "unit": "hour", "why": "Billed hourly; we\u2019ll scope pages, components, and timeline together before work begins."}, {"name": "Safety Check", "price": 25, "unit": "flat", "why": "Covers a standard remote safety pass. If we spot deeper issues, we\u2019ll pause and get your OK first."}, {"name": "3D Printer Help", "price": 25, "unit": "flat", "why": "Remote guidance only. Hardware replacements or advanced calibration steps may need extra time or a local pro."}];

function openKofi(note){
  const url = BRAND.kofi + (note ? ("?note=" + encodeURIComponent(note)) : "");
  window.open(url, "_blank", "noopener");
}

function payPreset(amount, note) {
  try { navigator.clipboard.writeText(String(amount)); } catch (e) {}
  openKofi(note + " — preset");
  alert("Opening Ko‑fi. Amount copied to clipboard — paste it into Ko‑fi if needed.");
}

function payCustom() {
  var v = document.getElementById('customAmount').value;
  if(!v){ alert('Enter an amount'); return; }
  try { navigator.clipboard.writeText(String(v)); } catch (e) {} 
  openKofi("Custom amount");
  alert("Opening Ko‑fi. Amount copied to clipboard — paste it into Ko‑fi if needed.");
}

function submitContact(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get("name") || "";
  const email = fd.get("email") || "";
  const msg = fd.get("message") || "";
  const subject = "Help request from " + encodeURIComponent(name);
  const body = encodeURIComponent("From: " + name + "\nEmail: " + email + "\n\n" + msg + "\n\n(If under 18, please copy a parent/guardian.)");
  window.location.href = "mailto:" + BRAND.primary + "," + BRAND.secondary + "?subject=" + subject + "&body=" + body;
  return false;
}

function renderPricing(){
  const tbody = document.getElementById('pricingRows');
  if(!tbody) return;
  tbody.innerHTML = "";
  SERVICES.forEach(s => {
    const tr = document.createElement('tr');
    tr.className = "border-t border-slate-800";
    tr.innerHTML = `
      <td class="py-2 pr-4">${s.name}</td>
      <td class="py-2 pr-4 text-emerald-300">${s.unit === "hour" ? "$" + s.price + "/hr" : "$" + s.price}</td>
      <td class="py-2 pr-4">
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-primary">Pay $${s.price}</button>
          ${s.unit === "hour" ? `<button class="btn">2 hr ($$${s.price * 2})</button>` : ""}
          <button class="btn">Custom</button>
        </div>
      </td>
      <td class="py-2 text-slate-300">${s.why}</td>
    `;
    const [payBtn, maybe2hrBtn, customBtn] = tr.querySelectorAll('button');
    payBtn.onclick = () => payPreset(s.price, s.name);
    if (s.unit === "hour") {
      maybe2hrBtn.onclick = () => payPreset(s.price * 2, s.name + " — 2 hours");
      customBtn.onclick = () => openKofi(s.name + " — custom");
    } else {
      (customBtn || maybe2hrBtn).onclick = () => openKofi(s.name + " — custom");
    }
    tbody.appendChild(tr);
  });
}

function setYear(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  renderPricing();
  setYear();
});
