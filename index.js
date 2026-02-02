// 1. Ma'lumotlar bazasi
const quizDatabase = {
    math: [
        { q: "√625 + 25 = ?", a: "50", opts: ["45", "50", "55", "60"] },
        { q: "x^2 = 81, x = ?", a: "9", opts: ["7", "8", "9", "10"] },
        { q: "15 * 4 - 10 = ?", a: "50", opts: ["40", "50", "60", "70"] }
    ],
    phys: [
        { q: "Yorug'lik tezligi (c) qancha?", a: "300k km/s", opts: ["150k km/s", "300k km/s", "500k km/s", "1 mln km/s"] },
        { q: "E=mc^2 kimning formulasi?", a: "Eynshteyn", opts: ["Nyuton", "Eynshteyn", "Tesla", "Bor"] }
    ],
    eng: [
        { q: "Past form of 'Write'?", a: "Wrote", opts: ["Written", "Wrote", "Writes", "Writing"] },
        { q: "Opposite of 'Weak'?", a: "Strong", opts: ["Small", "Strong", "Hard", "Fast"] }
    ],
    logic: [
        { q: "Qaysi kalla gapirmaydi?", a: "Qovoq kalla", opts: ["Katta kalla", "Qovoq kalla", "Olim kalla", "Aqlli kalla"] },
        { q: "9-qavatdan tashlangan tuxum sinmadi. Nega?", a: "Polda tushdi", opts: ["Pishgan edi", "Polda tushdi", "Siniq edi", "Hech qachon sinmaydi"] }
    ]
};

// 2. Tillar lug'ati
const dictionary = {
    uz: { mainT: "GALAKTIKA IQ", logD: "Koinot bo'ylab sayohatni boshlash uchun kiring", subjT: "Yo'nalishni tanlang", settings: "SOZLAMALAR" },
    en: { mainT: "GALAXY IQ", logD: "Log in to start your space journey", subjT: "Choose Category", settings: "SETTINGS" },
    ru: { mainT: "ГАЛАКТИКА IQ", logD: "Войдите, чтобы начать путешествие", subjT: "Выберите категорию", settings: "НАСТРОЙКИ" }
};

// 3. O'zgaruvchilar
let currentCategory = [];
let qIndex = 0;
let iqScore = 100;
let time = 120;
let timerInterval;

// 4. Funksiyalar
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function changeLang(l) {
    const lang = dictionary[l];
    document.getElementById('main-title').innerText = lang.mainT;
    document.getElementById('login-desc').innerText = lang.logD;
    document.getElementById('subject-title').innerText = lang.subjT;
    document.getElementById('side-title').innerText = lang.settings;
    toggleMenu();
}

function enterApp() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('subject-screen').classList.remove('hidden');
}

function startTest(cat) {
    currentCategory = quizDatabase[cat];
    document.getElementById('subject-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    qIndex = 0;
    iqScore = 100;
    loadQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        let m = Math.floor(time / 60);
        let s = time % 60;
        document.getElementById('timer').innerText = `${m}:${s < 10 ? '0'+s : s}`;
        if(time <= 0) finishGame();
    }, 1000);
}

function loadQuestion() {
    const data = currentCategory[qIndex];
    document.getElementById('question-text').innerText = data.q;
    const box = document.getElementById('options-box');
    box.innerHTML = '';
    
    data.opts.forEach(opt => {
        const b = document.createElement('button');
        b.className = 'opt-btn';
        b.innerText = opt;
        b.onclick = () => checkAnswer(opt);
        box.appendChild(b);
    });
}

function checkAnswer(userAns) {
    const correct = currentCategory[qIndex].a;
    const status = document.getElementById('status-icon');
    
    if(userAns === correct) {
        iqScore += 10;
        status.innerHTML = '✔';
        status.className = 'status-anim correct-pop';
        playTone(800);
    } else {
        iqScore -= 15;
        status.innerHTML = '✖';
        status.className = 'status-anim wrong-pop';
        playTone(200);
    }
    
    document.getElementById('iq-level').innerText = iqScore;
    
    setTimeout(() => {
        status.className = 'status-anim';
        status.innerHTML = '';
        qIndex++;
        if(qIndex < currentCategory.length) loadQuestion();
        else finishGame();
    }, 600);
}

function playTone(freq) {
    const actx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = actx.createOscillator();
    const g = actx.createGain();
    osc.frequency.setValueAtTime(freq, actx.currentTime);
    osc.connect(g);
    g.connect(actx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, actx.currentTime + 0.4);
    osc.stop(actx.currentTime + 0.4);
}

function finishGame() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('total-iq').innerText = iqScore;
}

