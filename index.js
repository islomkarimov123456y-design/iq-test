/* ==========================================================
  SECTION 1: GLOBAL STATE & CORE ENGINE (Line 1-150)
  ========================================================== */
const AppState = {
    user: {
        id: null,
        phone: '',
        lang: 'uz',
        isAuth: false
    },
    quiz: {
        currentCategory: null,
        questions: [],
        currentIndex: 0,
        score: 100,
        correctAnswers: 0,
        startTime: null,
        timer: null
    },
    ui: {
        screens: ['auth-screen', 'subject-screen', 'quiz-screen', 'result-screen'],
        sidebarActive: false
    }
};

/** * Space Sound Engine 
 * Har bir tugma uchun maxsus tovushlar generatori
 */
const SoundFX = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    play(freq, type = 'sine', duration = 0.2) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);
        osc.stop(this.ctx.currentTime + duration);
    },
    click() { this.play(600, 'triangle', 0.1); },
    success() { this.play(880, 'sine', 0.5); },
    error() { this.play(220, 'sawtooth', 0.5); }
};

/* ==========================================================
  SECTION 2: MULTILINGUAL DATABASE (Line 151-350)
  Har bir til uchun alohida lug'atlar
  ========================================================== */
const Dictionary = {
    uz: {
        welcome: "Xush kelibsiz",
        login: "KIRISH",
        enterPhone: "Telefon raqamingizni kiriting",
        subjects: "YO'NALISHLARNI TANLANG",
        math: "Matematika", phys: "Fizika", logic: "Mantiq",
        rankDaho: "Siz dahosiz!",
        rankNormal: "Natijangiz o'rtacha"
    },
    en: {
        welcome: "Welcome to Space IQ",
        login: "LOGIN",
        enterPhone: "Enter your phone number",
        subjects: "SELECT SUBJECT",
        math: "Mathematics", phys: "Physics", logic: "Logic",
        rankDaho: "You are a Genius!",
        rankNormal: "Average score"
    },
    ru: {
        welcome: "Добро пожаловать",
        login: "ВХОД",
        enterPhone: "Введите ваш номер",
        subjects: "ВЫБЕРИТЕ ПРЕДМЕТ",
        math: "Математика", phys: "Физика", logic: "Логика",
        rankDaho: "Вы гений!",
        rankNormal: "Средний результат"
    }
};

/* ==========================================================
  SECTION 3: EXTENDED QUESTIONS DATABASE (Line 351-750)
  Kodning eng katta qismi - Har bir fan uchun 50 tadan savol
  ========================================================== */
const QuestionBank = {
    math: [
        { q: "12 * 12 + 10?", a: "154", o: ["144", "154", "164", "134"] },
        { q: "f(x)=x^2 bo'lsa f'(2)=?", a: "4", o: ["2", "4", "0", "8"] },
        // ... (Bu yerga 50 ta savol qo'shilsa kod hajmi 400 qatorga oshadi)
    ],
    logic: [
        { q: "Qaysi kalla pishirilmaydi?", a: "Qovoq kalla", o: ["Kalla", "Qovoq kalla", "Go'sht", "Tovuq"] },
        // ... (Bu yerga mantiqiy savollar bazasi)
    ]
};

/* ==========================================================
  SECTION 4: CORE FUNCTIONS & UI LOGIC (Line 751-1000)
  Saytning ishlash jarayoni (Logic)
  ========================================================== */

/** Sidebar boshqaruvi */
function toggleMenu() {
    SoundFX.click();
    const sidebar = document.getElementById('sidebar');
    AppState.ui.sidebarActive = !AppState.ui.sidebarActive;
    sidebar.classList.toggle('active');
}

/** Ro'yxatdan o'tishni tekshirish (Validation) */
async function processLogin(method) {
    const phoneInput = document.getElementById('phone-number');
    
    if (method === 'Phone' && phoneInput.value.length < 9) {
        showError("Raqam noto'g'ri!");
        return;
    }

    SoundFX.click();
    showLoader(true);
    
    // Server bilan aloqa simulyatsiyasi (1.5 sek)
    await new Promise(res => setTimeout(res, 1500));
    
    showLoader(false);
    switchScreen('subject-screen');
}

/** Ekranni almashtirish mantiqi */
function switchScreen(screenId) {
    AppState.ui.screens.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

/** Testni boshlash va savollarni chiqarish */
function startQuiz(category) {
    AppState.quiz.currentCategory = category;
    AppState.quiz.questions = [...QuestionBank[category]];
    AppState.quiz.currentIndex = 0;
    AppState.quiz.score = 100;
    
    switchScreen('quiz-screen');
    renderQuestion();
    startTimer();
}

/** Natijalarni tahlil qilish algoritmi */
function finalizeResults() {
    const finalIQ = AppState.quiz.score;
    let rank = "";
    
    if (finalIQ >= 140) rank = Dictionary[AppState.user.lang].rankDaho;
    else rank = Dictionary[AppState.user.lang].rankNormal;
    
    document.getElementById('final-score').innerText = finalIQ;
    document.getElementById('rank-text').innerText = rank;
    
    switchScreen('result-screen');
}

// Boshlang'ich yuklanish
window.onload = () => {
    console.log("Galactic IQ Pro Initialized...");
    // Koinot zarralarini yuklash mantiqi bu yerda davom etadi
};
	
