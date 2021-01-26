import Note from "./Note.js"

const app = Vue.createApp({
    data() {
        return {
            notes: [],
            test: 'miau',
            isAddFormVisible: false,
            title: '',
            description: ''
        }
    },
    // utilizar el 'hook' que se invoca cuando se ha creado el objeto Vue
    created() {
        console.log("Aplicación Vue Creada")
        this.getAllNotesFromBBDD()
    },
    methods: {
        getAllNotesFromBBDD() {
            Note.fetchAll( (data) => {
                // Paso por parémtro a la función 'fetchAll' a mi misma (que también resulto ser una función). Cuando fetchAll tenga los datos, me va a invocar de vuelta pasandomelos por parámetro (data)
                this.notes = data
                console.log("Datos recuperados de la BBDD: ", data)
            })

        },
    
        showAddForm() {
            this.isAddFormVisible = true
        },
        addNote() {

            if (!this.title ||!this.description) {
                alert('Some of the fields are empty! Please check it!')
                return
            }

            const note = new Note(this.title, this.description)
            note.save( () => {
                this.getAllNotesFromBBDD()
            })
            this.isAddFormVisible = false
        }
    }
})

app.mount('#app')

