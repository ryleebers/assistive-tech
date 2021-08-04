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
    showQuestion(visualQuestions[currentIndex])
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
    if (visualQuestions.length > currentIndex) {
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
    if (techList.includes("noRecCardLSID") && techList.includes("noRecCardAID") && techList.includes("noRecCardTouchID") && techList.includes("noRecCardTID")) {
        submitButton.classList.add("hide")
        document.getElementById("progressBarID").classList.add("hide")
        document.getElementById("rec-page").classList.remove("hide")
        document.getElementById("norecID").classList.remove("hide")
    }
    else {
        submitButton.classList.add("hide")
        document.getElementById("progressBarID").classList.add("hide")
        document.getElementById("rec-page").classList.remove("hide")
        document.getElementById("touchId").classList.remove("hide")
        document.getElementById("touchLine1Id").classList.remove("hide")
        document.getElementById("audioToolsId").classList.remove("hide")
        document.getElementById("audioToolsLine1Id").classList.remove("hide")
        document.getElementById("lightNSizingToolsId").classList.remove("hide")
        document.getElementById("lightSizeLine1Id").classList.remove("hide")
        document.getElementById("translationToolsId").classList.remove("hide")
        document.getElementById("translationLine1Id").classList.remove("hide")
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
        if (activeClasses==8){
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


const visualQuestions = [
    {
        question: 'Do you have trouble seeing objects or writing?',
        answers: [
            {text: 'Yes', nxtQuestion:1, tech:[]},
            {text: 'No', nxtQuestion:5, tech:["noRecCardTouchID","noRecCardAID"]}           
        ]
    },
    {  
        question: 'Which of these statements most accurately describes your vision?',
        answers: [
            {text: 'I have trouble seeing or I need to see things up close', nxtQuestion:2, tech:["9", "10"]},
            {text: 'I am blind', nxtQuestion:4, tech:["noRecCardLSID"]}
        ]
    },
    {  
        question: 'Would you like a larger screen or monitor?',
        answers: [
            {text: 'Yes', nxtQuestion:3, tech:["11"]},
            {text: 'No', nxtQuestion:3, tech:[]}
        ]
    },
    {   
        question: 'Do bright lights cause you discomfort?',
        answers: [
            {text: 'Yes', nxtQuestion:4, tech:["8"]},
            {text: 'No', nxtQuestion:4, tech:[]}
        ]
    },
    {  
        question: 'Would you prefer to have a ...',
        answers: [
            {text: 'Braille or Touch-Based Assistant', nxtQuestion:6, tech: ["1", "2", "3", "4", "noRecCardAID"]},
            {text: 'Auditory Assistant', nxtQuestion:6, tech: ["5", "6", "7", "noRecCardTouchID"]},
            {text: 'Both', nxtQuestion:6, tech: ["1", "2", "3", "4", "5", "6", "7"]},
            {text: 'Neither', nxtQuestion:6, tech: ["noRecCardTouchID", "noRecCardAID"]}
        ]
    },
    {   
        question: 'Do bright lights cause you discomfort?',
        answers: [
            {text: 'Yes', nxtQuestion:6, tech: ["8"]},
            {text: 'No', nxtQuestion:6, tech: ["noRecCardLSID"]}
        ]
    },
    {  
        question: 'Do you need assistance with converting languages?',
        answers: [
            {text: 'Yes', nxtQuestion:7, tech:["12", "13"]},
            {text: 'No', nxtQuestion:7, tech: ["noRecCardTID"]}
        ]
    }
]
