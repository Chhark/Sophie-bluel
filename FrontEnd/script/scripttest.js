/*let token = window.localStorage.getItem('token')
token = JSON.parse(token)
console.log(token.token)
let fillle = document.getElementById('test')
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
fillle.addEventListener('input' , async (event) =>{
    event.preventDefault()
    formData = new FormData()
    const file = event.target.files[0];
    formData.append('image', file); // Ajoute l'image
    formData.append('title', 'Votre Titre Ici'); // Ajoute le titre
    formData.append('category', 1);
    const response = await fetch('http://localhost:5678/api/works',{
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token.token // Assurez-vous que le token est correct
        },
        body: formData
    })
    console.log('envoie reussi')
    console.log(response)
    console.log("test")
})*/

let token = window.localStorage.getItem('token');
token = JSON.parse(token);
console.log(token.token);

let fillle = document.getElementById('test');

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

fillle.addEventListener('input', async (event) => {
    event.preventDefault();
    console.log('Event prevented');

    let formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file); // Ajoute l'image
    formData.append('title', 'Votre Titre Ici'); // Ajoute le titre
    formData.append('category', 1);

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token.token // Assurez-vous que le token est correct
            },
            body: formData
        });
        console.log('Envoi réussi');
        console.log(response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi', error);
    }

    console.log("test");
});
