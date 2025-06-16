const questions = [ /* senin yukarıda verdiğin questions dizisi aynı şekilde buraya gelecek */ ];
const results = [ /* yine yukarıda verdiğin results dizisi buraya gelecek */ ];

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
}

function restartQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    selected = false;

    document.getElementById("result").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}

function shareResult() {
    const text = `Benim Succinct kişilik seviyem: ${document.getElementById("result-text").textContent}! ✨`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, "_blank");
}
