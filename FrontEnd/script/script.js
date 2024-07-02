let change_in  = document.querySelectorAll(".change-in")
let change_out  = document.querySelectorAll(".change-out")
let pieces

async function loadCategories(){
    let categoriesResponse = await fetch('http://localhost:5678/api/categories')
    let categories = await categoriesResponse.json();
    const listCategorie = JSON.stringify(categories)
    window.localStorage.setItem("categories",listCategorie)
}

loadCategories()

connectedView()
async function affichageprojet() {
    pieces = window.localStorage.getItem("work");
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
         Responsegalery = await fetch('http://localhost:5678/api/works')
         galery = await Responsegalery.json();
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
    let Display_img = ""
    galery.forEach((élement , index) => {
        let img = `
            <div class="relativeDiv">
                <img src="${élement.imageUrl}" alt="${élement.title}">
                <i class="fa-solid fa-trash-can fa-2xs"data-id="${index}"></i>
            </div>
        `;
        Display_img += img
    })
    display_img.innerHTML = Display_img
    document.querySelectorAll(".fa-trash-can").forEach(trashicon => {
        trashicon.addEventListener("click",async function() {
            let idd = this.getAttribute('data-id');
            console.log(pieces)
            idd = pieces[idd].id
            console.log(idd)
            await DeleteWork(idd)
            refreshgalery()
            
        })
    })

}
let bearerToken = window.localStorage.getItem('token')
bearerToken = JSON.parse(bearerToken)
bearerToken = bearerToken.token
console.log(bearerToken)
async function refreshgalery(){
    let reponse = await fetch('http://localhost:5678/api/works')
        pieces = await reponse.json();
        const valeurPieces = JSON.stringify(pieces);
        window.localStorage.setItem("work",valeurPieces)
        //pieces = JSON.parse(pieces);
        innerelement(pieces)
}
function DeleteWork(workId) {
    let DeleteResponse = fetch(`http://localhost:5678/api/works/${workId}` ,{ 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
}

let edition = document.querySelector(".projet-edition").addEventListener("click" , () => {
    BG_popup.classList.remove("none")
    galeryPhoto()
})


document.querySelector(".addPhoto").addEventListener('click',()=>{
    document.querySelectorAll(".popup").forEach((popup ) =>{
        popup.classList.toggle('none')
                
    })
    let optionCategorie = ""
    let selectCategories = document.getElementById("categorie")
    let caté = window.localStorage.getItem("categories")
    caté = JSON.parse(caté)
    caté.forEach((element)=>{
        optionCategorie += ` <option value="${element.name}">${element.name}</option>`
    })
    selectCategories.innerHTML = optionCategorie
    
})
let preview = document.querySelector(".ajout-photo")
let image = document.querySelector('#imageUpload').files[0]
let image2 = document.querySelector('#imageUpload')
let file 
let formData = new FormData();
image2.addEventListener("change" , (event)=>{
    file = event.target.files[0]
    //formData.append()///////////////////////////////////
    if(file){
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = e.target.result;
            preview.innerHTML = `<img src="${img}" alt=""></img>`
            preview.style.padding = "0px";
        };

        reader.readAsDataURL(file);
    
    
}
})
 
/*let token = window.localStorage.getItem('token')
token = JSON.parse(token)
document.getElementById('imageUpload').addEventListener('change',async function(event) {
    event.preventDefault();
    const file = event.target.files[0]; // Récupère le fichier
    if (!file) {
        console.log("Aucun fichier sélectionné.");
        return;
    }

    const formData = new FormData();
    formData.append('image', file); // Ajoute l'image

    await AddAPIWork(formData)
    


}) */
let formm = document.getElementById('addWork')
let submitButton = document.querySelector(".valid")
let RequiredInput = formm.querySelectorAll("input , select")
console.log(formm , submitButton , RequiredInput)

function FormComplet() {
    let allfilled = true
    console.log("form")
    RequiredInput.forEach(input => {
        if(!input.value){
            allfilled = false 
        }
    })
    if (allfilled) {
        console.log("complet")
        submitButton.classList.remove('btn-disabled');
        submitButton.classList.add('btn-enabled');
        submitButton.disabled = false;
    } else {
        console.log("incomplet")
        submitButton.classList.remove('btn-enabled');
        submitButton.classList.add('btn-disabled');
        submitButton.disabled = true;
    }
}

RequiredInput.forEach(input => {
    input.addEventListener('input', FormComplet);
});
let response
formm.addEventListener('submit', async (Event)=>{
    Event.preventDefault()
    let titre = document.querySelector('#Titre').value
    let catégorie = 1 /*document.querySelector('#categorie').value*/
    //let formData = new FormData();
    //formData.append('image', file);
    formData.append('title', titre);
    formData.append('category', catégorie );
    console.log(file)
    console.log("test")
    let token = window.localStorage.getItem('token')
    console.log(token)
    token = JSON.parse(token)
    console.log(token)
    await zpublishwork(formData , token)
    console.log("test2")
    console.log(response)
})

async function publishwork(formData , token){
    const response = await fetch('http://localhost:5678/api/works',{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token.token // Assurez-vous que le token est correct
        },
        body: formData
    }) 
}
let popup1 = document.querySelector(".A-popup")
let popups = document.querySelectorAll(".popup")
let Croix = document.querySelectorAll(".fa-xmark")
Croix.forEach(X_mark => {
    X_mark.addEventListener("click" , () => {
        Close_Popup()
})
})
function Close_Popup(){
    popups.forEach(popup =>{
        popup.classList.add('none')
        BG_popup.classList.add("none")
        popup1.classList.remove("none")
})
}

BG_popup.addEventListener("click",Close_Popup)

popups.forEach(popup => {
    popup.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});