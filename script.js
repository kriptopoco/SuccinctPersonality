const questions = [
    {
        question: "Are you still in Phase 1 or have you transitioned to Phase 2?",
        image: "/images/q1.jpg",
        options: [{ text: "Phase 1", score: 5 }, { text: "Phase 2", score: 15 }]
    },
    {
        question: "How many stars do you have in the Succinct testnet?",
        image: "/images/q2.jpg",
        options: [{ text: "Below 10,000", score: 5 }, { text: "Above 10,000", score: 15 }]
    },
    {
        question: "How many messages have you sent in the Succinct Discord?",
        image: "/images/q3.jpg",
        options: [{ text: "Below 1,000", score: 5 }, { text: "Above 1,000", score: 15 }]
    },
    {
        question: "How many posts have you made about Succinct?",
        image: "/images/q4.jpg",
        options: [{ text: "Below 50", score: 5 }, { text: "Above 50", score: 15 }]
    },
    {
        question: "Do you help participants in the Succinct community?",
        image: "/images/q5.jpg",
        options: [{ text: "No", score: 5 }, { text: "Yes", score: 15 }]
    },
    {
        question: "Did you know about Succinct before the testnet started?",
        image: "/images/q6.jpg",
        options: [{ text: "No", score: 5 }, { text: "Yes", score: 15 }]
    },
    {
        question: "How many proofs did you generate in Phase 1?",
        image: "/images/q7.jpg",
        options: [{ text: "Below 100", score: 5 }, { text: "Above 100", score: 15 }]
    },
    {
        question: "Do you have published content on Sfbay?",
        image: "/images/q8.jpg",
        options: [{ text: "No", score: 5 }, { text: "Yes", score: 15 }]
    },
    {
        question: "Do you answer Truthlens quizzes yourself?",
        image: "/images/q9.jpg",
        options: [{ text: "No", score: 5 }, { text: "Yes", score: 15 }]
    },
    {
        question: "Do you cheat on Veristar quizzes?",
        image: "/images/q10.jpg",
        options: [{ text: "Yes", score: 5 }, { text: "No", score: 15 }]
    }
];

const results = [
    { range: [60, 90], title: "Succinct Beginner", image: "/images/beg.jpg" },
    { range: [91, 110], title: "Succinct Prover", image: "/images/prov.jpg" },
    { range: [111, 130], title: "Succinct Warrior", image: "/images/war.jpg" },
    { range: [131, 150], title: "Succinct Legend", image: "/images/leg.jpg" }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let selected = false;

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
}

function showQuestion() {
    selected = false;
    document.getElementById("next-btn").disabled = true;

    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    document.getElementById("question-image").src = question.image;
    document.getElementById("question-image").alt = question.question; // Erişilebilirlik için
    document.getElementById("option-a").textContent = question.options[0].text;
    document.getElementById("option-b").textContent = question.options[1].text;

    document.getElementById("option-a").classList.remove("selected");
    document.getElementById("option-b").classList.remove("selected");
}

function selectOption(option) {
    if (selected) return;
    selected = true;

    const score = option === "A" ? questions[currentQuestionIndex].options[0].score : questions[currentQuestionIndex].options[1].score;
    totalScore += score;

    document.getElementById("option-a").classList.toggle("selected", option === "A");
    document.getElementById("option-b").classList.toggle("selected", option === "B");

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    const result = results.find(r => totalScore >= r.range[0] && totalScore <= r.range[1]) || results[0];
    document.getElementById("result-text").textContent = result.title;
    document.getElementById("result-image").src = result.image;
    document.getElementById("result-image").alt = result.title; // Erişilebilirlik için
}

function restartQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    selected = false;

    document.getElementById("result").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}

function shareResult() {
    const text = `My Succinct personality level is: ${document.getElementById("result-text").textContent}! 🚀 Try it yourself!`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, "_blank");
}
