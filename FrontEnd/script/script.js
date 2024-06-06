let change_in  = document.querySelectorAll(".change-in")
let change_out  = document.querySelectorAll(".change-out")
connectedView()
async function affichageprojet() {
    let pieces = window.localStorage.getItem("work");
    if (pieces === null) {
        let reponse = await fetch('http://localhost:5678/api/works')
        pieces = await reponse.json();
        const valeurPieces = JSON.stringify(pieces);
        window.localStorage.setItem("work",valeurPieces)
        pieces = JSON.parse(pieces);
        innerelement(pieces)
    } else {
        pieces = JSON.parse(pieces);
        innerelement(pieces)
    }
      
} 

function innerelement(pieces){
    let galeryy = document.querySelector(".gallery")

    pieces.forEach((élement) => {
        let html = "<figure><img src=\""+élement.imageUrl+"\"alt=\""+élement.title+"\"> <figcaption>"+élement.title+"</figcaption> </figure>";
        console.log(html)
        galeryy.innerHTML += html
    })
}

affichageprojet()
function connectedView() {
    let changeInClass = "change-in";
    let changeOutClass = "change-out";
    let connecttoken = window.localStorage.getItem("token")
    console.log(connecttoken)
    if (connecttoken != null) {
        console.log("vous êtes connecté")
        change_out.forEach(element => {
            element.classList.add(changeInClass);
            element.classList.remove(changeOutClass);
        });
        change_in.forEach(element => {
            element.classList.add(changeOutClass);
            element.classList.remove(changeInClass);
        });


    }else {
        console.log("vous n'êtes pas connecté")
        change_out.forEach(element => {
            element.classList.add(changeOutClass);
            element.classList.remove(changeInClass);
        });
        change_in.forEach(element => {
            element.classList.add(changeInClass);
            element.classList.remove(changeOutClass);
        });
    }

}

const logout = document.getElementById("logout")
logout.addEventListener('click', () => {
    localStorage.removeItem("token")
    connectedView()
})

let display_img = document.querySelector(".display-img")
let BG_popup = document.querySelector(".BG-popup")

async function galeryPhoto() {
    let galery = window.localStorage.getItem("work")
    if (galery === null) {
         galery = await fetch('http://localhost:5678/api/works')
         galery = await response.json();
        galery = JSON.stringify(galery);
        window.localStorage.setItem("work",galery)
        galery = JSON.parse(galery);
        innerGalery(galery)
    }else {
        galery = JSON.parse(galery);
        innerGalery(galery)
        
    }
}

function innerGalery(galery) {
    galery.forEach((élement) => {
        let img = "<div class=\"relativeDiv\"><img src=\""+élement.imageUrl+"\"alt=\""+élement.title+"\"><i class=\"fa-solid fa-trash-can fa-2xs\"></i></div>"
        display_img.innerHTML += img
    })}

let edition = document.querySelector(".projet-edition").addEventListener("click" , () => {
    BG_popup.classList.remove("none")
    galeryPhoto()
})