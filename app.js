document.querySelector("#joke-form").addEventListener("submit", function(e){
    let numJokes = document.querySelector("#number-jokes").value;
    //console.log(parseInt(numJokes));
    getJokes(numJokes);
    e.preventDefault();
})

function getJokes(n){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.icndb.com/jokes/random/${n}`, true);
    xhr.onload = function(){
        if(this.status === 200){
            let resp =  JSON.parse(this.responseText);
            let jokeUI = document.querySelector("#joke-container");
            while(jokeUI.firstElementChild){
                jokeUI.firstElementChild.remove();
            }
            if(resp.type === "success"){
                resp.value.forEach(j => {
                let lj = document.createElement("li");
                lj.appendChild(document.createTextNode(j.joke.replace(/&quot;/g,'"')))
                //lj.appendChild(document.createTextNode(unescape(j.joke)))
                jokeUI.appendChild(lj);
                //console.log(j.joke)
            });}else{
                jokeUI.innerHTML = `<li>something went wrong :(</li>`
            }
            console.log(resp);
        }else{
            jokeUI.innerHTML = `<li>something went wrong :(</li>`;
        }   
    }
    xhr.send();
}
