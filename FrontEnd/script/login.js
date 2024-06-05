let error = document.querySelector('.error-log')
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
    if (token.ok) {
        token = await token.json()
        window.localStorage.setItem("token",token)
        console.log(token)
        window.location.href = "http://127.0.0.1:5501/FrontEnd/index.html" 
        console.log("test")
        connectedView()
    } else{
        console.log("vous n'êtes pas connecté")
        error.style.display = "block"
    }
     
})



