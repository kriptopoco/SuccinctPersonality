const questions = [
    {
        question: "Phase 1'de misin yoksa Phase 2'ye geçiş yaptın mı?",
        image: "https://hizliresim.com/n9bktn4",
        options: [
            { text: "Phase 1", score: 5 },
            { text: "Phase 2", score: 15 }
        ]
    },
    {
        question: "Succinct testnetinde kaç yıldızın var?",
        image: "https://hizliresim.com/flg1khe",
        options: [
            { text: "Below 10,000", score: 5 },
            { text: "Above 10,000", score: 15 }
        ]
    },
    {
        question: "Succinct Discord'unda mesaj sayın kaç?",
        image: "https://hizliresim.com/amfafxm",
        options: [
            { text: "Below 1000", score: 5 },
            { text: "Above 1000", score: 15 }
        ]
    },
    {
        question: "Succinct hakkında kaç post hazırladın?",
        image: "https://hizliresim.com/na3dxdn",
        options: [
            { text: "Below 50", score: 5 },
            { text: "Above 50", score: 15 }
        ]
    },
    {
        question: "Succinct topluluğu katılımcılarına yardımcı oluyor musun?",
        image: "https://hizliresim.com/c57fobn",
        options: [
            { text: "Hayır", score: 5 },
            { text: "Evet", score: 15 }
        ]
    },
    {
        question: "Succinct testneti başlamadan önce projeden haberdar mıydın?",
        image: "https://hizliresim.com/5ausad2",
        options: [
            { text: "Hayır", score: 5 },
            { text: "Evet", score: 15 }
        ]
    },
    {
        question: "Phase 1'de kaç proof ürettin?",
        image: "https://hizliresim.com/18s4lwy",
        options: [
            { text: "Below 100", score: 5 },
            { text: "Above 100", score: 15 }
        ]
    },
    {
        question: "Sfbay'de yayınlanmış bir içeriğin var mı?",
        image: "https://hizliresim.com/dbl00kt",
        options: [
            { text: "Hayır", score: 5 },
            { text: "Evet", score: 15 }
        ]
    },
    {
        question: "Truthlens quizlerini kendin mi cevaplıyorsun?",
        image: "https://hizliresim.com/7bwne8u",
        options: [
            { text: "Hayır", score: 5 },
            { text: "Evet", score: 15 }
        ]
    },
    {
        question: "Veristar quizlerinde kopya çekiyor musun?",
        image: "https://hizliresim.com/lc2c608",
        options: [
            { text: "Evet", score: 5 },
            { text: "Hayır", score: 15 }
        ]
    }
];

const results = [
    { range: [60, 90], title: "Succinct Beginner", image: "https://hizliresim.com/tkp23k6" },
    { range: [91, 110], title: "Succinct Prover", image: "https://hizliresim.com/7ukt74v" },
    { range: [111, 130], title: "Succinct Warrior", image: "https://hizliresim.com/7mfx2ap" },
    { range: [131, 150], title: "Succinct Legend", image: "https://hizliresim.com/f51d2hp" }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const questionImage = document.getElementById("question-image");
    const current = questions[currentQuestion];

    questionElement.innerText = current.question;
    questionImage.src = current.image;
    optionsElement.innerHTML = "";

    current.options.forEach((option) => {
        const button = document.createElement("div");
        button.className = "option";
        button.innerText = option.text;
        button.onclick = () => selectOption(option.score);
        optionsElement.appendChild(button);
    });
}

function selectOption(optionScore) {
    score += optionScore;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    const resultText = document.getElementById("result-text");
    const resultImage = document.getElementById("result-image");

    const result = results.find(r => score >= r.range[0] && score <= r.range[1]);
    resultText.innerText = `Sen bir ${result.title}!`;
    resultImage.src = result.image;
}

function shareResult() {
    const result = results.find(r => score >= r.range[0] && score <= r.range[1]);
    const tweetText = `Succinct Personality Quiz sonucum: ${result.title}! Sen de test et! #SuccinctPersonality`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
}

function restartQuiz() {
    startQuiz();
}

startQuiz();