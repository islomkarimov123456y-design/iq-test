// 1. Ma'lumotlar bazasi (3 ta fan: Biologiya, Matematika, Tarix)
const quizData = [
    // --- BIOLOGIYA ---
    { q: "O'simlik hujayrasida fotosintez qayerda sodir bo'ladi?", a: "Xloroplast", options: ["Xloroplast", "Ribosoma", "Yadro", "Mitoxondriya"], subject: "Biologiya" },
    { q: "Odam tanasidagi eng katta organ qaysi?", a: "Teri", options: ["Jigar", "O'pka", "Teri", "Yurak"], subject: "Biologiya" },
    { q: "Qonning qizil rangi qaysi modda bilan bog'liq?", a: "Gemoglobin", options: ["Xlorofill", "Gemoglobin", "Plazma", "Insulin"], subject: "Biologiya" },
    { q: "DNK kislotasi qayerda saqlanadi?", a: "Yadroda", options: ["Sitoplazmada", "Yadroda", "Membranada", "Vakuolada"], subject: "Biologiya" },
    { q: "Baliqlar nima orqali nafas oladi?", a: "Jabralar", options: ["O'pka", "Teri", "Jabralar", "Havo pufagi"], subject: "Biologiya" },

    // --- MATEMATIKA ---
    { q: "Agar x + 15 = 40 bo'lsa, x nechaga teng?", a: "25", options: ["20", "25", "30", "35"], subject: "Matematika" },
    { q: "Kvadratning tomoni 5 sm bo'lsa, uning yuzi necha sm²?", a: "25", options: ["20", "25", "10", "15"], subject: "Matematika" },
    { q: "Eng kichik tub sonni toping?", a: "2", options: ["1", "2", "3", "0"], subject: "Matematika" },
    { q: "Uchburchak ichki burchaklari yig'indisi necha daraja?", a: "180", options: ["90", "180", "360", "270"], subject: "Matematika" },
    { q: "Doira yuzini hisoblash formulasi qaysi?", a: "πr²", options: ["2πr", "πr²", "2r", "πd"], subject: "Matematika" },

    // --- TARIX ---
    { q: "Amir Temur nechanchi yilda tug'ilgan?", a: "1336", options: ["1336", "1342", "1405", "1300"], subject: "Tarix" },
    { q: "O'zbekiston mustaqilligi nechanchi yilda e'lon qilingan?", a: "1991", options: ["1990", "1991", "1992", "1989"], subject: "Tarix" },
    { q: "Zahiriddin Muhammad Bobur qayerda tug'ilgan?", a: "Andijon", options: ["Samarqand", "Andijon", "Xiva", "Buxoro"], subject: "Tarix" },
    { q: "Ikkinchi jahon urushi qachon tugagan?", a: "1945", options: ["1941", "1943", "1945", "1950"], subject: "Tarix" },
    { q: "Alisher Navoiy qaysi asrda yashagan?", a: "XV asr", options: ["XIV asr", "XV asr", "XVI asr", "XIII asr"], subject: "Tarix" }
];

// 2. O'zgaruvchilar
let currentIdx = 0;
let score = 0;
let timeLeft = 180; // 3 daqiqa
let timer;
let userAnswers = [];

// 3. Ovoz effektlari (ixtiyoriy)
const playSound = (type) => {
    // Kelajakda bu yerga audio qo'shish mumkin
};

// 4. Testni boshlash funksiyasi
function startQuiz() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    // Savollarni aralashtirish
    quizData.sort(() => Math.random() - 0.5);
    startTimer();
    showQuestion();
}

// 5. Taymer mantiqi
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById('time').innerText = `${min}:${sec < 10 ? '0'+sec : sec}`;
        
        if (timeLeft <= 10) {
            document.getElementById('timer').style.color = "#ff4757";
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// 6. Savolni ekranga chiqarish
function showQuestion() {
    const q = quizData[currentIdx];
    document.getElementById('current-q').innerText = currentIdx + 1;
    document.getElementById('question-text').innerHTML = `<span class="subject-tag">${q.subject}</span><br>${q.q}`;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn option-btn';
        btn.innerHTML = `<span class="opt-num">${index + 1}</span> ${opt}`;
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });
}

// 7. Javobni tekshirish
function checkAnswer(selected) {
    const correct = quizData[currentIdx].a;
    if (selected === correct) {
        score += 10;
        // To'g'ri javob effekti (kelajakda qo'shish uchun)
    }
    
    userAnswers.push({ q: quizData[currentIdx].q, user: selected, correct: correct });
    currentIdx++;

    if (currentIdx < quizData.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// 8. O'yinni tugatish
function endGame() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const finalScore = Math.round((score / (quizData.length * 10)) * 100);
    document.getElementById('iq-result').innerText = finalScore + "%";
    
    let feedback = "";
    if (finalScore >= 80) feedback = "Siz daho ekansiz! 🌟";
    else if (finalScore >= 50) feedback = "Yaxshi natija, yana ozroq o'qing! 📚";
    else feedback = "Ko'proq shug'ullanish kerak! 💡";
    
    document.getElementById('result-text').innerText = feedback;
}

// Sayt yuklanganda animatsiya
window.onload = () => {
    console.log("IQ Test Platformasi tayyor!");
};

