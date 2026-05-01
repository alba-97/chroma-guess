let n = 3;

function generateRandomColors(n) {
    document.querySelector("h1").style.backgroundColor = "#3463ad";
    let index = Math.floor(Math.random() * n);
    let colors = [];

    let message = document.querySelector("#message");
    message.textContent = "";

    let container = document.querySelector("#colors");
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        colors.push("rgb(" + r + ", " + g + ", " + b + ")");
        let div = document.createElement("div");
        div.classList.add("square");
        if (i % 3 == 0) {
            container.insertAdjacentHTML("beforeend", "<br>");
        }
        container.appendChild(div);
    }
    

    let colorCorrecto = document.querySelector("#colorDisplay");

    squares = document.querySelectorAll(".square");
    colorCorrecto.textContent = colors[index].toUpperCase();

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            if (this.style.backgroundColor == colors[index]) {
                message.textContent = "Correct!";
                for (let j = 0; j < squares.length; j++) {
                    squares[j].style.backgroundColor = colors[index];
                    squares[j].style.opacity = "1";
                }
                document.querySelector("h1").style.backgroundColor = colors[index];
                document.querySelector("#reset").innerHTML = "Play again";
            } else {
                this.style.opacity = "0";
                message.textContent = "Try again";
            }
        });
    }
}

document.querySelector("#easyButton").addEventListener("click", function () {
    document.querySelector("#hardButton").classList.toggle("selected");
    this.classList.toggle("selected");
    n = 3;
    generateRandomColors(n);
});

document.querySelector("#hardButton").addEventListener("click", function () {
    document.querySelector("#easyButton").classList.toggle("selected");
    this.classList.toggle("selected");
    n = 6;
    generateRandomColors(n);
});

document.querySelector("#reset").addEventListener("click", function () {
    generateRandomColors(n);
});

generateRandomColors(n);