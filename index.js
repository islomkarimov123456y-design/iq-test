const questions = [
    { q: "7, 26, 63, 124, ? Keyingi son?", a: "215", options: ["215", "217", "210"] },
    { q: "1, 1, 2, 3, 5, 8, 13, ? Keyingi son?", a: "21", options: ["18", "21", "25"] },
    { q: "Qaysi biri guruhga kirmaydi?", a: "Kaltak", options: ["Olma", "Nok", "Kaltak"] },
    { q: "Agar kecha ertaga bo'lganida, bugun payshanba bo'lardi. Bugun qaysi kun?", a: "Seshanba", options: ["Seshanba", "Shanba", "Yakshanba"] },
    { q: "Daraxtda 10 ta qush bor edi, ovchi birini urib tushirdi. Nechta qoldi?", a: "0", options: ["9", "1", "0"] },
    { q: "Siz poygada 2-o'rindagi odamni quvib o'tdingiz. Hozir nechanchi o'rindasiz?", a: "2", options: ["1", "2", "3"] },
    { q: "Qaysi oyda 28 kun bor?", a: "Hammasida", options: ["Fevral", "Hammasida", "Hech qaysisida"] },
    { q: "0, 1, 4, 9, 16, ?", a: "25", options: ["20", "25", "30"] },
    { q: "Nima doim keladi, lekin hech qachon yetib kelmaydi?", a: "Ertaga", options: ["Ertaga", "Poezd", "Baxt"] },
    { q: "Savatda 5 ta olma bor, ularni 5 kishiga bittadan berishdi, lekin savatda 1 ta olma qoldi. Qanday qilib?", a: "Oxirgisi savat bilan olgan", options: ["Xato", "Olma bo'lingan", "Oxirgisi savat bilan olgan"] }
];

let currentIdx = 0;
let score = 0;
let timeLeft = 120;
let timer;

function startQuiz() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    timer = setInterval(updateTimer, 1000);
    showQuestion();
}

function updateTimer() {
    timeLeft--;
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    document.getElementById('time').innerText = `${min}:${sec < 10 ? '0'+sec : sec}`;
    if(timeLeft <= 0) endGame();
}

function showQuestion() {
    let q = questions[currentIdx];
    document.getElementById('current-q').innerText = currentIdx + 1;
    document.getElementById('question-text').innerText = q.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if(selected === questions[currentIdx].a) score += 15;
    currentIdx++;
    if(currentIdx < questions.length) showQuestion();
    else endGame();
}

function endGame() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('iq-result').innerText = score + 50; // Bazaviy 50 ball
}

