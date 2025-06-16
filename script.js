const questions = [
    {
        question: "Are you still in Phase 1 or have you transitioned to Phase 2?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q1.jpg",
        options: [
            { text: "Phase 1", score: 5 },
            { text: "Phase 2", score: 15 }
        ]
    },
    {
        question: "How many stars do you have in the Succinct testnet?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q2.jpg",
        options: [
            { text: "Below 10,000", score: 5 },
            { text: "Above 10,000", score: 15 }
        ]
    },
    {
        question: "How many messages have you sent in the Succinct Discord?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q3.jpg",
        options: [
            { text: "Below 1,000", score: 5 },
            { text: "Above 1,000", score: 15 }
        ]
    },
    {
        question: "How many posts have you made about Succinct?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q4.jpg",
        options: [
            { text: "Below 50", score: 5 },
            { text: "Above 50", score: 15 }
        ]
    },
    {
        question: "Do you help participants in the Succinct community?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q5.jpg",
        options: [
            { text: "No", score: 5 },
            { text: "Yes", score: 15 }
        ]
    },
    {
        question: "Did you know about Succinct before the testnet started?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q6.jpg",
        options: [
            { text: "No", score: 5 },
            { text: "Yes", score: 15 }
        ]
    },
    {
        question: "How many proofs did you generate in Phase 1?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q7.jpg",
        options: [
            { text: "Below 100", score: 5 },
            { text: "Above 100", score: 15 }
        ]
    },
    {
        question: "Do you have published content on Sfbay?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q8.jpg",
        options: [
            { text: "No", score: 5 },
            { text: "Yes", score: 15 }
        ]
    },
    {
        question: "Do you answer Truthlens quizzes yourself?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q9.jpg",
        options: [
            { text: "No", score: 5 },
            { text: "Yes", score: 15 }
        ]
    },
    {
        question: "Do you cheat on Veristar quizzes?",
        image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/q10.jpg",
        options: [
            { text: "Yes", score: 5 },
            { text: "No", score: 15 }
        ]
    }
];

const results = [
    { range: [60, 90], title: "Succinct Beginner", image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/beg.jpg" },
    { range: [91, 110], title: "Succinct Prover", image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/prov.jpg" },
    { range: [111, 130], title: "Succinct Warrior", image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/war.jpg" },
    { range: [131, 150], title: "Succinct Legend", image: "https://raw.githubusercontent.com/kriptopoco/succinctimages/main/images/leg.jpg" }
];

let currentQuestion = 0;
let totalScore = 0;
let selected = null;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("question-image").src = q.image;

    const buttons = document.querySelectorAll(".option");
    buttons.forEach((btn, i) => {
        btn.textContent = q.options[i].text;
        btn.classList.remove("selected");
    });

    document.getElementById("next-btn").disabled = true;
    selected = null;
}

function selectOption(index) {
    const q = questions[currentQuestion];
    selected = q.options[index].score;

    document.querySelectorAll(".option").forEach((btn, i) => {
        btn.classList.toggle("selected", i === index);
    });

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    if (selected === null) return;

    totalScore += selected;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    const result = results.find(r => totalScore >= r.range[0] && totalScore <= r.range[1]);

    document.getElementById("result-text").textContent = result.title;
    document.getElementById("result-image").src = result.image;
}

function restartQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    selected = null;
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

function shareResult() {
    const text = `I just got "${document.getElementById("result-text").textContent}" on the Succinct Personality Quiz! 🧠 zk vibes only 👇`;
    const url = encodeURIComponent(window.location.href);
    const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    window.open(tweet, "_blank");
}

// Start the quiz
window.onload = loadQuestion;
