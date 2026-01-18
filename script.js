// Quiz Data
const quizQuestions = [
    {
        question: "Apakah yang dilakukan oleh Sifer Caesar?",
        options: [
            "Mengacau semua huruf secara rawak seperti ribut pasir",
            "Mengalihkan setiap huruf dengan nombor tetap",
            "Menukar huruf kepada nombor hieroglif",
            "Memadamkan huruf yang diberkati oleh Ra"
        ],
        correct: 1
    },
    {
        question: "Siapakah yang menggunakan Sifer Caesar untuk komunikasi ketenteraan?",
        options: [
            "Cleopatra di istana Mesir",
            "Julius Caesar di Rom purba",
            "Alexander the Great di Macedonia",
            "Ramses II di piramid"
        ],
        correct: 1
    },
    {
        question: "Berapakah anjakan yang biasa digunakan oleh Julius Caesar?",
        options: [
            "Anjakan 1",
            "Anjakan 5",
            "Anjakan 3",
            "Anjakan 13"
        ],
        correct: 2
    },
    {
        question: "Apakah jenis sifer yang tergolong dalam kategori Sifer Caesar?",
        options: [
            "Sifer penggantian polialfabetik",
            "Sifer penggantian monoalfabetik",
            "Sifer transposisi",
            "Sifer kunci awam"
        ],
        correct: 1
    },
    {
        question: "Mengapa Sifer Caesar tidak selamat untuk penggunaan moden?",
        options: [
            "Terlalu perlahan untuk dilaksanakan",
            "Memerlukan komputer yang kuat",
            "Hanya ada 25 kemungkinan kunci yang mudah dicuba",
            "Huruf hieroglif sudah tidak digunakan"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Initialize quiz
function initQuiz() {
    loadQuestion();
}

// Load current question
function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showFinalResults();
        return;
    }

    const question = quizQuestions[currentQuestion];
    
    // Update question number
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion) / quizQuestions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    const container = document.getElementById('quizContainer');
    const optionsHTML = question.options.map((option, index) => {
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        return `
            <div class="quiz-option" onclick="selectAnswer(this, ${index})">
                <strong>${letter})</strong> ${option}
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <h3 id="questionText" class="sphinx-question">${question.question}</h3>
        ${optionsHTML}
        <button onclick="nextQuestion()" class="egyptian-btn large" style="margin-top: 1.5rem;">
            Teka-teki Seterusnya Sphinx →
        </button>
        <div id="quizResult" style="margin-top: 1rem; font-size: 1.2rem; font-weight: bold;"></div>
    `;
    
    selectedAnswer = null;
}

// Select answer
function selectAnswer(element, answerIndex) {
    // Remove previous selection
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark current selection
    element.classList.add('selected');
    selectedAnswer = answerIndex;
    
    // Clear result message
    document.getElementById('quizResult').textContent = '';
}

// Next question
function nextQuestion() {
    if (selectedAnswer === null) {
        document.getElementById('quizResult').innerHTML = 
            '<span style="color: #d4af37;">⚠️ Sila pilih jawapan dahulu!</span>';
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    const resultDiv = document.getElementById('quizResult');
    const allOptions = document.querySelectorAll('.quiz-option');
    
    // Check if answer is correct
    if (selectedAnswer === question.correct) {
        score++;
        allOptions[selectedAnswer].classList.add('correct');
        resultDiv.innerHTML = '<span style="color: #4CAF50;">✓ Betul! Sphinx berbangga dengan anda!</span>';
    } else {
        allOptions[selectedAnswer].classList.add('incorrect');
        allOptions[question.correct].classList.add('correct');
        resultDiv.innerHTML = '<span style="color: #f44336;">✗ Salah. Jawapan yang betul telah ditandakan.</span>';
    }
    
    // Disable all options
    allOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Wait 2 seconds before moving to next question
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000);
}

// Show final results
function showFinalResults() {
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    let rank = '';
    
    if (percentage >= 80) {
        rank = '👑 Guru Sifer';
        message = 'Cemerlang! Anda telah menguasai seni kriptografi purba!';
    } else if (percentage >= 60) {
        rank = '📜 Jurutulis Mahir';
        message = 'Bagus! Pengetahuan anda berkembang seperti Sungai Nil.';
    } else if (percentage >= 40) {
        rank = '🔍 Pelajar Bersemangat';
        message = 'Teruskan usaha! Kebijaksanaan memerlukan masa untuk dikuasai.';
    } else {
        rank = '🌱 Pemula Kuil';
        message = 'Jangan putus asa! Setiap jurutulis bermula dari sini.';
    }
    
    document.getElementById('quizProgress').style.width = '100%';
    
    const container = document.getElementById('quizContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: #d4af37; font-size: 2.5rem; margin-bottom: 1rem;">
                🏆 Kuiz Selesai! 🏆
            </h2>
            <div style="font-size: 3rem; margin: 1.5rem 0;">
                ${rank}
            </div>
            <p style="font-size: 1.5rem; margin: 1rem 0;">
                Skor Anda: <strong>${score}/${quizQuestions.length}</strong> (${percentage.toFixed(0)}%)
            </p>
            <p style="font-size: 1.2rem; color: #d4af37; margin: 1.5rem 0;">
                ${message}
            </p>
            <button onclick="restartQuiz()" class="egyptian-btn large" style="margin-top: 2rem;">
                🔄 Cuba Lagi
            </button>
        </div>
    `;
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    initQuiz();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);