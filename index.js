// 1. Savollar Bazasi
const QUIZ_DB = {
    math: [
        { q: "x + 20 = 50, x = ?", a: "30", opts: ["20", "30", "40", "10"] },
        { q: "√100 + √16 = ?", a: "14", opts: ["12", "14", "16", "20"] },
        { q: "25 * 4 - 50 = ?", a: "50", opts: ["40", "50", "60", "70"] },
        { q: "Doira yuzi formulasi?", a: "πr²", opts: ["2πr", "πr²", "πd", "r²"] }
    ],
    phys: [
        { q: "Tezlik formulasi?", a: "v = s / t", opts: ["v = m / a", "v = s / t", "v = F * d", "v = m * g"] },
        { q: "Energiya birligi?", a: "Joul", opts: ["Vatt", "Nyuton", "Joul", "Amper"] }
    ],
    eng: [
        { q: "Plural of 'Child'?", a: "Children", opts: ["Childs", "Children", "Childrens", "Childes"] },
        { q: "Synonym for 'Fast'?", a: "Quick", opts: ["Slow", "Quick", "Hard", "Large"] }
    ],
    logic: [
        { q: "Qaysi kalla pishirilmaydi?", a: "Qovoq kalla", opts: ["Kalla", "Qovoq kalla", "Pishgan kalla", "Hech biri"] }
    ]
};

// 2. Lug'at
const LANG = {
    uz: { side: "SOZLAMALAR", main: "KIRISH", google: "Google orqali", fb: "Facebook orqali", wa: "WhatsApp orqali", ph: "Nomer orqali", subj: "YO'NALISHLAR" },
    en: { side: "SETTINGS", main: "LOGIN", google: "Via Google", fb: "Via Facebook", wa: "Via WhatsApp", ph: "Via Number", subj: "CATEGORIES" },
    ru: { side: "НАСТРОЙКИ", main: "ВХОД", google: "Через Google", fb: "Через Facebook", wa: "Через WhatsApp", ph: "По номеру", subj: "КАТЕГОРИИ" }
};

// 3. O'zgaruvchilar
let iqScore = 100;
let qIdx = 0;
let currentSubj = [];
let timer;
let timeLeft = 120;

// 4. UI Funksiyalari
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function changeLang(l) {
    const d = LANG[l];
    document.getElementById('side-title').innerText = d.side;
    document.getElementById('main-header').innerText = d.main;
    document.getElementById('txt-google').innerText = d.google;
    document.getElementById('txt-fb').innerText = d.fb;
    document.getElementById('txt-wa').innerText = d.wa;
    document.getElementById('txt-phone').innerText = d.ph;
    document.getElementById('subj-header').innerText = d.subj;
    toggleMenu();
}

function handleAuth(m) {
    if(m === 'Phone' && document.getElementById('user-phone').value.length < 9) {
        alert("Raqamni kiriting!"); return;
    }
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('subject-screen').classList.remove('hidden');
}

// 5. Test Mantiqi
function initQuiz(s) {
    currentSubj = QUIZ_DB[s];
    document.getElementById('subject-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    startTimer();
    renderQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        document.getElementById('timer-val').innerText = `${m}:${s < 10 ? '0'+s : s}`;
        if(timeLeft <= 0) endQuiz();
    }, 1000);
}

function renderQuestion() {
    const data = currentSubj[qIdx];
    document.getElementById('q-text').innerText = data.q;
    const box = document.getElementById('options-container');
    box.innerHTML = '';
    data.opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'lang-option';
        b.innerText = o;
        b.onclick = () => check(o);
        box.appendChild(b);
    });
}

function check(val) {
    const correct = currentSubj[qIdx].a;
    const fx = document.getElementById('fx-layer');
    if(val === correct) {
        iqScore += 15;
        fx.innerText = "✔"; fx.style.color = "#2ecc71";
        playAudio(800);
    } else {
        iqScore -= 20;
        fx.innerText = "✖"; fx.style.color = "#e74c3c";
        playAudio(200);
    }
    document.getElementById('iq-val').innerText = iqScore;
    qIdx++;
    setTimeout(() => {
        fx.innerText = "";
        if(qIdx < currentSubj.length) renderQuestion();
        else endQuiz();
    }, 600);
}

function playAudio(f) {
    const actx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = actx.createOscillator();
    const g = actx.createGain();
    osc.frequency.setValueAtTime(f, actx.currentTime);
    osc.connect(g); g.connect(actx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, actx.currentTime + 0.4);
    osc.stop(actx.currentTime + 0.4);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-iq').innerText = iqScore;
    document.getElementById('rank-val').innerText = iqScore > 120 ? "Daho" : "Normal";
}

