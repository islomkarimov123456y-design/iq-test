const questions = [
    { q: "7, 26, 63, 124, ? Keyingi son?", a: ["215", "217", "210"], c: 0 },
    { q: "1, 1, 2, 3, 5, 8, 13, ? Keyingi son?", a: ["18", "21", "25"], c: 1 },
    { q: "Qaysi biri guruhga kirmaydi?", a: ["Olma", "Nok", "Kaltak"], c: 2 }
];
let currentQ = 0, score = 0, timeLeft = 120, timer;
function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
    timer = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60), sec = timeLeft % 60;
        document.getElementById('time').innerText = `${min}:${sec < 10 ? '0'+sec : sec}`;
        if(timeLeft <= 0) finish();
    }, 1000);
}
function showQuestion() {
    let q = questions[currentQ];
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('q-num').innerText = currentQ + 1;
    let optDiv = document.getElementById('q-options');
    optDiv.innerHTML = "";
    q.a.forEach((opt, i) => {
        optDiv.innerHTML += `<button class="opt-btn" onclick="check(${i})">${opt}</button>`;
    });
}
function check(i) {
    if(i === questions[currentQ].c) score += 20;
    currentQ++;
    if(currentQ < questions.length) showQuestion();
    else finish();
}
function finish() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-iq').innerText = 70 + score;
}

