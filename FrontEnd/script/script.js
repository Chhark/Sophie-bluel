 async function test() {
    let reponse = await fetch('http://localhost:5678/api/works')
    pieces = await reponse.json();
    const valeurPieces = JSON.stringify(pieces);
    console.log("test1")
    console.log(pieces )
    console.log(valeurPieces)
    console.log(pieces[2])
    console.log("test")  
} 

test()
    

