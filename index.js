const questions = {
    math: [
        { q: "√144 + √81 = ?", a: "21", opt: ["20", "21", "22", "19"] },
        { q: "5x + 10 = 50, x = ?", a: "8", opt: ["6", "7", "8", "9"] }
    ],
    phys: [
        { q: "Nyuton qaysi kuch birligi?", a: "Kuch", opt: ["Energiya", "Kuch", "Bosim", "Tezlik"] }
    ],
    eng: [
        { q: "Opposite of 'Hot'?", a: "Cold", opt: ["Warm", "Cold", "Ice", "Sun"] }
    ],
    logic: [
        { q: "Daraxtda 10 qush bor, 1 tasi otildi. Nechtasi qoldi?", a: "0", opt: ["9", "1", "0", "8"] }
    ]
};

const langData = {
    uz: { title: "GALAKTIKA IQ", login: "Davom etish uchun tizimga kiring", select: "Yo'nalishni tanlang", settings: "Sozlamalar" },
    en: { title: "GALAXY IQ", login: "Sign in to continue", select: "Select Subject", settings: "Settings" },
    ru: { title: "ГАЛАКТИКА IQ", login: "Войдите, чтобы продолжить", select: "Выберите предмет", settings: "Настройки" }
};

let currentSubj = [];
let qIdx = 0;
let score = 100;
let timer;
let timeLeft = 120;

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function changeLang(lang) {
    const d = langData[lang];
    document.getElementById('main-title').innerText = d.title;
    document.getElementById('login-text').innerText = d.login;
    document.getElementById('select-text').innerText = d.select;
    document.getElementById('settings-title').innerText = d.settings;
    toggleMenu();
}

function enterSite() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
}

function selectSubject(s) {
    currentSubj = questions[s];
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    startTimer();
    renderQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        document.getElementById('time').innerText = `${m}:${s < 10 ? '0'+s : s}`;
        if(timeLeft <= 0) endTest();
    }, 1000);
}

function renderQuestion() {
    const q = currentSubj[qIdx];
    document.getElementById('question-text').innerText = q.q;
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';
    q.opt.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'subj-btn';
        btn.innerText = o;
        btn.onclick = () => check(o);
        optDiv.appendChild(btn);
    });
}

function check(ans) {
    const correct = currentSubj[qIdx].a;
    const feedback = document.getElementById('feedback');
    if(ans === correct) {
        score += 15;
        feedback.innerHTML = '✔';
        feedback.style.background = '#2ecc71';
        playSound(880);
    } else {
        score -= 10;
        feedback.innerHTML = '✖';
        feedback.style.background = '#e74c3c';
        playSound(220);
    }
    document.getElementById('iq-count').innerText = score;
    setTimeout(() => {
        feedback.innerHTML = '';
        feedback.style.background = 'transparent';
        qIdx++;
        if(qIdx < currentSubj.length) renderQuestion();
        else endTest();
    }, 600);
}

function playSound(freq) {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
}

function endTest() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-iq').innerText = score;
}

