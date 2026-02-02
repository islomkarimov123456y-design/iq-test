/* OMEGA CORE DATABASE */
const IQ_DATABASE = {
    math: [
        { q: "x^2 = 169, x = ?", a: "13", o: ["11", "12", "13", "14"] },
        { q: "log10(100) = ?", a: "2", o: ["1", "2", "10", "100"] }
    ],
    logic: [
        { q: "Savol: Qaysi so'z hamma joyda bir xil yoziladi?", a: "Ism", o: ["Vaqt", "Ism", "Salom", "Dunyo"] }
    ]
};

/* SYSTEM ENGINE */
const Engine = {
    score: 100,
    idx: 0,
    timer: null,
    timeLeft: 120,
    lang: 'uz'
};

/* SIDEBAR CONTROLLER */
function toggleOmegaMenu() {
    document.getElementById('omega-sidebar').classList.toggle('active');
}

/* LOGIN VALIDATION */
async function initLogin(type) {
    const loader = document.getElementById('global-loader');
    const phone = document.getElementById('user-phone').value;

    if(type === 'Phone' && phone.length < 9) {
        alert("Raqam kiritilmadi!");
        return;
    }

    loader.classList.remove('hidden');
    // Giper-yuklanish simulyatsiyasi
    await new Promise(r => setTimeout(r, 1500));
    
    loader.classList.add('hidden');
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('category-view').classList.remove('hidden');
    renderCategories();
}

/* UI RENDERERS */
function renderCategories() {
    const grid = document.getElementById('cat-grid');
    grid.innerHTML = `
        <div class="omega-card" onclick="startTest('math')">MATEMATIKA</div>
        <div class="omega-card" onclick="startTest('logic')">MANTIQ</div>
    `;
}

function startTest(cat) {
    Engine.currentQuestions = IQ_DATABASE[cat];
    document.getElementById('category-view').classList.add('hidden');
    document.getElementById('quiz-view').classList.remove('hidden');
    // Testni boshlash mantiqi bu yerda davom etadi...
}

/* SOUND ENGINE */
const playSFX = (f) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = f; o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    o.stop(ctx.currentTime + 0.5);
};

