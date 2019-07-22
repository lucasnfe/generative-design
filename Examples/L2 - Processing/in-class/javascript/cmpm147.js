
myImg = document.getElementById("myImg");
myImg.onclick = function() {
    // Get one paragraph <p> in your DOM and change it's value with innerHTML
    console.log("hey!");
    cat = document.getElementById("cat");
    cat.innerHTML = "<a href='cat.html'>Sushi</a>";
}
