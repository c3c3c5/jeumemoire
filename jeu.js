let gamearray = [];
let currentnumber = 1;
let remainingattempts;
function prepareGame(nbofnbs) {
    for (let i=1; i<nbofnbs + 1; i++){
        gamearray.push(i);
    }
    for (let i=0; i<gamearray.length; i++){
        let position = Math.floor(Math.random() * (gamearray.length));
        let temp = gamearray[position];
        gamearray[position] = gamearray[i];
        gamearray[i] = temp;
        document.querySelector(".board-container").insertAdjacentHTML("beforeend", `<button class="gamebutton"></button>`)
    }
}

function showButtons(){
    clickableButtons(false);
    document.querySelectorAll(".gamebutton").forEach((gb,i)=>{
        gb.textContent = gamearray[i];
    })
}

function hideButtons(){
    document.querySelectorAll(".gamebutton").forEach((gb) => {
        gb.textContent = "";
    })
    clickableButtons(true);
}

function clickableButtons(areClickable){
    document.querySelectorAll(".gamebutton").forEach((gb)=>{
        if (areClickable){
            gb.disabled = false;
        } else {
            gb.disabled = true;
        }
    })
}

function showButton(index){
    document.querySelectorAll(".gamebutton")[index].textContent = gamearray[index];
}

function hideButton(index){
    let button = document.querySelectorAll(".gamebutton")[index];
    button.textContent = "";
    button.classList.remove("wrong");
    button.classList.remove("right");
}

function getButtonValue(index) {
    return Number(document.querySelectorAll(".gamebutton")[index].textContent);
}

function rightGuess(right,index){
    let button = document.querySelectorAll(".gamebutton")[index];
    if (right){
        button.classList.add("right");
    } else {
        button.classList.add("wrong");
    }
    button.disabled = true;
}

function updateDisplayText(remainingattempts){
    document.getElementById("remainingattempts").textContent = remainingattempts;
}

function gameOver(win){
    document.querySelectorAll(".gamebutton").forEach((gb)=>{
        gb.remove();
    })
    let text = document.getElementById("winlosetext");
    text.style.display = "block";
    if (win) {
        text.textContent = "You WIN";
        text.style.color = "green";
    } else {
        text.textContent = "You LOSE";
        text.style.color = "red";
    }
    setTimeout(()=>{
        text.style.display = "none";
    },1000)
    document.getElementById("sqclength").classList.remove("hide");
    document.getElementById("memotime").classList.remove("hide");
    document.getElementById("maxattempts").classList.remove("hide");
    document.getElementById("start-game").classList.remove("hide");
}

function gameStart(){
    document.querySelectorAll(".gamebutton").forEach((gb,index)=>{
        gb.addEventListener("click", ()=>{
            console.log("buttonclicked")
            showButton(index);
            console.log(index)
            console.log(getButtonValue(index));
            if (getButtonValue(index) == currentnumber){
                currentnumber++;
                rightGuess(true,index);
            } else {
                if (remainingattempts == 0){
                    remainingattempts = 0;
                } else {
                    remainingattempts--;
                }
                updateDisplayText(remainingattempts);
                rightGuess(false,index);
                clickableButtons(false);
                setTimeout(()=>{
                    hideButton(index);
                    clickableButtons(true);
                },1000);
            }
            console.log(currentnumber);
            if (currentnumber > gamearray.length){
                setTimeout(()=>{
                    gameOver(true);
                }, 750);
            } else if (remainingattempts == 0){
                setTimeout(()=>{
                    gameOver(false);
                }, 750);
            }
        })
    })
}

document.getElementById("start-game").addEventListener("click", ()=>{
    document.getElementById("start-game").classList.add("hide");
    document.getElementById("sqclength").classList.add("hide");
    document.getElementById("memotime").classList.add("hide");
    document.getElementById("maxattempts").classList.add("hide");
    remainingattempts = document.getElementById("max-attempts").value;
    updateDisplayText(remainingattempts);
    let sequencelength = Number(document.getElementById("sequence-length").value);
    let memorizationtime = Number(document.getElementById("memorization-time").value);
    currentnumber = 1;
    gamearray = [];
    prepareGame(sequencelength);
    showButtons();
    setTimeout(hideButtons, memorizationtime * 1000)
    gameStart();
})