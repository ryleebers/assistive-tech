// quiz page button mappings
document.getElementById("home-id").addEventListener("click", returnHome);
document.getElementById("recHome-id").addEventListener("click", returnHome);
document.getElementById("btnid").addEventListener("click", setNextQuestion);
const progress = document.getElementById("progressID");
const circles = document.querySelectorAll(".circle");
document.getElementById("start-btn").addEventListener("click", startQuiz);
const startbutton = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");
const recommendationspage = document.getElementById("rec-page");

// sends user back to home screen 
function returnHome() {
    window.location.href = "index.html";
}

// q&a functions
let currentIndex = 0
let progressIndex = 0
questionElement = document.getElementById("question-id")
answerButtonsElement = document.getElementById("answer-buttons")

function startQuiz(){
    startbutton.classList.add("hide")
    questionElement.classList.remove("hide")
    answerButtonsElement.classList.remove("hide")
    recommendationspage.classList.add("hide")
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(hearingQuestions[currentIndex])
}

function resetState(){
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        button.dataset.nxtquest = answer.nxtQuestion
        button.dataset.tech = answer.tech
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// recommendation functions
let techList = []
function selectAnswer(e) {
    const selectedButton = e.target
    progressIndex = parseInt(selectedButton.dataset.nxtquest) - currentIndex
    currentIndex = selectedButton.dataset.nxtquest
    if (selectedButton.dataset.tech != ""){
        techList = techList.concat(selectedButton.dataset.tech.split(","))
    }
    if (hearingQuestions.length > currentIndex) {
        setNextQuestion()
    }
    else {
        resetState()
        questionElement.classList.add("hide")
        submitButton.classList.remove("hide")
        submitButton.addEventListener("click", displayTech)
    }
}

function displayTech() {
    if (techList.includes("noRecCardVID") && techList.includes("noRecCardNID") && techList.includes("noRecCardTID")) {
        submitButton.classList.add("hide")
        document.getElementById("progressBarID").classList.add("hide")
        document.getElementById("rec-page").classList.remove("hide")
        document.getElementById("norecID").classList.remove("hide")
    }
    else {
        submitButton.classList.add("hide")
        document.getElementById("progressBarID").classList.add("hide")
        document.getElementById("rec-page").classList.remove("hide")
        document.getElementById("textvisualizationID").classList.remove("hide")
        document.getElementById("textvisualizationline1ID").classList.remove("hide")
        document.getElementById("narrationID").classList.remove("hide")
        document.getElementById("narrationline1ID").classList.remove("hide")
        document.getElementById("translatingtoolsID").classList.remove("hide")
        document.getElementById("translatingtoolsline1ID").classList.remove("hide")
        techList.forEach(tech => {
            const card = document.getElementById(tech)
            card.classList.remove("hide")
        })
    }
}

// progress bar
let activeClasses = 1;
answerButtonsElement.addEventListener("click", () => {
    if (activeClasses > circles.length) {
        activeClasses = circles.length;
    }
    for(i = 0; i < progressIndex; i++){
        activeClasses++;
        update();
        document.getElementById("progressBarID").setAttribute("aria-valuenow", activeClasses);
        const breadcrumbquestion = document.querySelector('.qNumberText');
        if (activeClasses==4){
            breadcrumbquestion.textContent = "Submit";
        }
        else{
            breadcrumbquestion.textContent = "Question " + activeClasses;
        }
    }
});

function update() {
    circles.forEach((circle, index) => {
        if (index < activeClasses) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });
    const actives = document.querySelectorAll(".active");
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
}


const hearingQuestions = [
    {   
        question: 'Do you experience any difficulty in hearing?',
        answers: [
            {text: 'I experience difficulty hearing without assistance', nxtQuestion:1, tech:["1", "2", "3"]},
            {text: 'No', nxtQuestion:2, tech:["noRecCardVID", "noRecCardNID"]}           
        ]
    },
    {  
        question: 'Would you like a narrator?',
        answers: [
            {text: 'Yes', nxtQuestion:2, tech:["4", "5", "6"]},
            {text: 'No', nxtQuestion:2, tech:["noRecCardNID"]}
        ]
    },
    {  
        question: 'Do you need assistance with converting languages?',
        answers: [
            {text: 'Yes', nxtQuestion:3, tech:["7", "8"]},
            {text: 'No', nxtQuestion:3, tech:["noRecCardTID"]}
        ]
    }
]
