const screens = document.querySelectorAll('.screen');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const selectedType = document.getElementById('selectedType');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const confirmBtn = document.getElementById('confirmBtn');
const dateError = document.getElementById('dateError');
const summary = document.getElementById('summary');
const photoWall = document.getElementById('photoWall');

let chosenType = "";
let chosenDate = "";
let chosenTime = "";

function show(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

yesBtn.addEventListener('click', () => show('types'));

function moveNoButton() {
  noBtn.classList.add('running');
  const padding = 18;
  const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - noBtn.offsetHeight - padding);
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
}
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });
noBtn.addEventListener('click', (e) => { e.preventDefault(); moveNoButton(); });

document.querySelectorAll('.date-card').forEach(card => {
  card.addEventListener('click', () => {
    chosenType = card.dataset.type;
    selectedType.textContent = `You chose: ${chosenType} 💗`;
    show('calendar');
  });
});

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split('T')[0];
dateInput.min = localToday;

confirmBtn.addEventListener('click', async () => {
  if (!dateInput.value) {
    dateError.textContent = "Hehe you forgot to choose a date 🥺";
    return;
  }
  dateError.textContent = "";
  chosenDate = dateInput.value;
  chosenTime = timeInput.value || "18:00";

  const prettyDate = new Date(`${chosenDate}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  summary.innerHTML = `
    💗 <b>${chosenType}</b><br>
    📅 ${prettyDate}<br>
    ⏰ ${chosenTime}
  `;

  buildPhotoWall();
  show('final');
  await sendChoice({
    type: chosenType,
    date: chosenDate,
    time: chosenTime,
    submittedAt: new Date().toISOString()
  });
});

function buildPhotoWall() {
  photoWall.innerHTML = "";

  const photos = [
    "photo1.png",
    "photo2.jpeg",
    "photo3.jpg",
    "photo5.jpg",
    "photo7.jpg",
    "photo4.jpeg",
    "photo6.jpeg"
  ];

  photos.forEach((photo, index) => {
    const img = document.createElement("img");

    img.src = photo;
    img.alt = `Our memory ${index + 1}`;
    img.loading = "lazy";

    img.onerror = () => {
      console.log("Cannot load:", photo);
      img.remove();
    };

    photoWall.appendChild(img);
  });
}

async function sendChoice(data) {
  if (!CONFIG.APPS_SCRIPT_URL) {
    console.log("No Apps Script URL configured. Selected date:", data);
    return;
  }

  try {
    await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "text/plain;charset=utf-8"},
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Could not send selection:", error);
  }
}

buildPhotoWall();
