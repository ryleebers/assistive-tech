// homepage button mappings to functions
document.getElementById("request-id").addEventListener("click", request);
document.getElementById("hearing-id").addEventListener("click", requestHearing);
document.getElementById("vision-id").addEventListener("click", requestVisual);
document.getElementById("cognitive-id").addEventListener("click", requestCognitive);
 

// homepage button functions
// opens new window and redirects to assitive technology hub request form
function request() {
    window.open("https://inside.dell.com/community/active/assistive-technology/pages/technology-suggestion");
}

// same window, redirects to visual quiz page
function requestVisual() {
    window.location.href = "quizvisual.html";
}

// same window, redirects to hearing quiz page
function requestHearing(){
    window.location.href = "quizhearing.html";
}

// same window, redirects to cognitive quiz page
function requestCognitive(){
    window.location.href = "quizcognitive.html";
}
