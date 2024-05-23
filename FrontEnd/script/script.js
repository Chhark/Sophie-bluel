let log = false
let change  = document.querySelectorAll(".change")
console.log(change)
 async function affichageprojet() {
    let reponse = await fetch('http://localhost:5678/api/works')
    pieces = await reponse.json();
    const valeurPieces = JSON.stringify(pieces);  
    let galery = document.querySelector(".gallery")

    pieces.forEach((élement) => {
        html = "<figure><img src=\""+élement.imageUrl+"\"alt=\""+élement.title+"\"> <figcaption>"+élement.title+"</figcaption> </figure>";
        console.log(html)
        galery.innerHTML += html
 })
} 

affichageprojet()
const form = document.getElementById('login-form');

form.addEventListener('submit',async (event) => {
    event.preventDefault()
    const Email = document.querySelector(".LogEmail").value
    const MDP = document.querySelector(".LogMDP").value
    let token = await fetch('http://localhost:5678/api/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            email: Email,
            password: MDP,
        })
    })
    token = await token.json()
    console.log(token)
    log = true
    connectedView(log) 
})

function connectedView(loged) {
    if (loged) {
        console.log("vous êtes connecté")


    }
    else {
        console.log("vous n'êtes pas connecté")
    }

}