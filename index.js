const allQuestions = {
    matematika: [
        { q: "√144 + √81 nechaga teng?", a: "21", opt: ["20", "21", "22", "19"] },
        { q: "5x + 10 = 50 bo'lsa, x = ?", a: "8", opt: ["6", "7", "8", "10"] },
        // ... yana 8 ta qo'shish mumkin
    ],
    fizika: [
        { q: "Kuch birligi nima?", a: "Nyuton", opt: ["Vatt", "Joul", "Nyuton", "Paskal"] },
        { q: "Yorug'lik tezligi qancha? (km/s)", a: "300,000", opt: ["150,000", "300,000", "450,000", "100,000"] },
    ],
    ingliz: [
        { q: "Choose the correct: 'I ___ a student.'", a: "am", opt: ["is", "are", "am", "be"] },
        { q: "Past form of 'Go'?", a: "went", opt: ["goes", "gone", "went", "going"] },
    ],
    mantiq: [
        { q: "Qaysi oyda 28 kun bor?", a: "Hammasida", opt: ["Fevral", "Hammasida", "Yanvar", "Hech biri"] },
        { q: "Daraxtda 10 qush bor edi, ovchi 1 tasini otdi. Nechta qoldi?", a: "0", opt: ["9", "1", "0", "8"] },
    ]
};

// Ovozli effektlar (Brauzerning o'zidan sintez qilamiz)
const playSound = (isCorrect) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    if(isCorrect) {
        osc.frequency.setValueAtTime(880, context.currentTime); // Baland ovoz
        osc.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
    } else {
        osc.frequency.setValueAtTime(220, context.currentTime); // Past g'o'ng'illash
        osc.frequency.exponentialRampToValueAtTime(110, context.currentTime + 0.2);
    }
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);
    osc.stop(context.currentTime + 0.3);
};

let currentSubject = [];
let idx = 0;
let score = 100;
let timer;
let timeLeft = 120;

function selectSubject(subj) {
    currentSubject = allQuestions[subj];
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
    const q = currentSubject[idx];
    document.getElementById('question-text').innerText = q.q;
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';
    q.opt.forEach(o => {
        const b = document.createElement('button');
        b.className = 'opt-btn';
        b.innerText = o;
        b.onclick = () => check(o);
        optDiv.appendChild(b);
    });
}

function check(answer) {
    const correct = currentSubject[idx].a;
    const feedback = document.getElementById('feedback-icon');
    
    if(answer === correct) {
        score += 15;
        feedback.innerHTML = '✔';
        feedback.className = 'feedback-anim show-correct';
        playSound(true);
    } else {
        score -= 10;
        feedback.innerHTML = '✖';
        feedback.className = 'feedback-anim show-wrong';
        playSound(false);
    }
    
    document.getElementById('iq-count').innerText = score;
    
    // Animatsiyani tozalash
    setTimeout(() => {
        feedback.className = 'feedback-anim';
        idx++;
        if(idx < currentSubject.length) renderQuestion();
        else endTest();
    }, 600);
}

function endTest() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-iq').innerText = score;
    document.getElementById('result-msg').innerText = score > 120 ? "Siz daho ekansiz!" : "Yaxshi natija!";
}

