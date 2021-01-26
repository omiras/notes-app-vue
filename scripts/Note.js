const url = 'https://notes-app-ecb85-default-rtdb.europe-west1.firebasedatabase.app/notes.json'

export default class Note {
    constructor(title, description) {
        this.title = title
        this.description = description      
    }

    save(cb) {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                title: this.title,
                description: this.description
            })
        }  
        fetch(url, postOptions).
        then(data => {
            console.log("Inserciñon finalizada")
            // en este punto ya podemos asegurar que a inserción en BBDD se ha realizado
            cb()
        }).
        catch(error => console.error(error)) 
    }
    static fetchAll(cb) {
        fetch(url)
        .then(response => response.json())
        .then(data => cb(data)); // hey, cuando acabes de obtener los datos de la base de datos, invocame la función 'cb' que te he pasado por parámetro
    }
}

