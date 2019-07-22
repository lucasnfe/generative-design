
var isGreeting = false;

document.getElementById("slug-img").onclick = function() {
    isGreeting = !isGreeting;

    if(isGreeting) {
        document.getElementById("greeting").innerHTML = "Hey!"
    }
    else {
        document.getElementById("greeting").innerHTML = ""
    }
};
