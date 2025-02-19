import { useState } from "react";

const blogPosts = [
    {
        id: 1,
        title: "Zuppa di Nebbia e Luci",
        author: "Luca Ferri",
        content: "Mescola la nebbia delle prime ore del mattino con un raggio di luce solare che fluttua nell'aria. Lascia che la sostanza diventi un sogno liquido, dove il caldo dell’inverno incontra la freschezza della primavera. Servi la zuppa in un piatto di silenzio, decorato con frammenti di stelle cadenti.",
        category: "Zuppe surreali",
        magic: true
    },
    {
        id: 2,
        title: "Risotto di Stelle e Ombre",
        author: "Marta Bianchi",
        content: "Cuoci i granelli di stella nell'oscurità di una notte senza luna. L’ombra di un sogno infranto scivola sopra il riso, avvolgendo ogni chicco di una misteriosa malinconia. Una volta pronto, lascia che le ombre si mescolino alla luce della tua tavola, come se il cielo fosse stato raccolto in un piatto.",
        category: "Risotti onirici",
        magic: false

    },
    {
        id: 3,
        title: "Insalata di Venti e Fiori di Luce",
        author: "Giovanni Rossi",
        content: "Fai danzare i venti tra le foglie di un albero che non esiste, raccogli i fiori di luce che crescono nel vuoto e mescolali in un piatto che non ha confini. Ogni boccone è una carezza del vento che si scompone in colori e ombre, come un ricordo che si dissolve nell'aria.",
        category: "Contorni immaginari",
        magic: true
    },
    {
        id: 4,
        title: "Torta di Nuvole e Polvere di Sogno",
        author: "Alessandra Verdi",
        content: "Fondi insieme le nuvole più leggere, che si dissolvono alla prima carezza, con la polvere di sogni lontani. Lascia che la torta lieviti come una nuvola di passaggio, pronta a svanire non appena tocca il piatto. Una volta cotta, cospargila di sogni in polvere, per un effetto che evoca l’immensità di un universo senza tempo.",
        category: "Dolci surreali",
        magic: true
    },
    {
        id: 5,
        title: "Pasta al Raggio di Luna e Fumo di Primavera",
        author: "Simone Icardi",
        content: "Lascia che la pasta scivoli tra i raggi di luna che si spezzano come cristalli nel cielo. Ogni filo è avvolto nel fumo di una primavera che non è mai arrivata. Il piatto si trasforma mentre lo guardi, sfumando tra il caldo del giorno e il fresco della notte, in un eterno istante di perfezione.",
        category: "Primi onirici",
        magic: false
    }
];



const initialPostData = {
    title: "",
    author: "",
    content: "",
    category: "",
    magic: false
};


export default function BlogPost() {

    // stato della lista posts 
    const [posts, setPosts] = useState(blogPosts)
    // stato dell'input inserimento in form
    // const [newPost, setNewPost] = useState(initialPostData);
    const [formData, setFormData] = useState(initialPostData);





    // !! funzione per la modifica dei dati nel form
    function handleFormData(e) {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        // LOGGA PER DEBUG
        console.log("Evento:", e);  // Vedi l'evento completo
        console.log("Target:", e.target);  // Vedi l'elemento che ha scatenato l'evento
        console.log("Nome del campo:", e.target.name);  // Il name dell'input
        console.log("Valore del campo:", e.target.value);  // Il valore attuale

        setFormData((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: value
        }));
    }


    // !! funzione di gestione INVIO INTERO FORM e quindi per l'aggiunta di un nuovo post alla lista
    const addPost = e => {
        e.preventDefault();
        // crea nuovo oggetto post
        const newPostObject = {
            id: posts.length === 0 ? 1 : posts[posts.length - 1].id + 1,
            ...formData
        };
        // aggiungi il nuovo post alla lista
        const updatedPosts = [...posts, newPostObject];
        setPosts(updatedPosts);
        // azzeriamo i valori del form
        setFormData(initialPostData);
    }



    // !! funzione per la rimozione del post
    const removePost = (id) => {
        const updatedPosts = posts.filter((post) => {
            return post.id !== id
        });
        setPosts(updatedPosts);
    }


    // funzione per intercettare Ctrl + Enter all'interno del text area e inviare il form
    const handleKeyDown = event => {
        if (event.key === "Enter" && event.ctrlKey) {
            event.preventDefault(); // Evita di andare a capo
            addPost(event); // Invia il form
        }
    };



    return (
        <>


            <div className="main-wrapper">

                {posts.length === 0 ? <p className="empty-message">La lista di ricette è vuota</p> :
                    // lista post
                    <ul className="posts-list">
                        {posts.map((post) => (

                            <li className="post" key={post.id}>
                                <div className="post-upper-wrapper">
                                    <h3>
                                        {post.title} ({post.magic ? "Richiede magia" : "Non richiede magia"})
                                    </h3>

                                    <button className="remove" onClick={() => removePost(post.id)}>
                                        X
                                    </button>
                                </div>
                                <p className="content">{post.content}</p>
                                <div className="post-lower-wrapper">
                                    <span>{post.author}</span>
                                    <span className="category">{post.category}</span>

                                </div>


                            </li>
                        ))}
                    </ul>
                }


                {/* form per aggiunta post */}
                <div className="right-wrapper">
                    <p className="textarea-caption" >AGGIUNGI UNA RICETTA</p>
                    <form onSubmit={addPost}>
                        <div className="upper-inputs">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleFormData}
                                placeholder="Titolo Post"
                            />

                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleFormData}
                                placeholder="Autore"
                            />

                        </div>
                        <div className="lower-inputs">
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleFormData}
                                placeholder="Categoria"
                            />
                            <div className="available">
                                <label htmlFor="available">Richiede Magia</label>
                                <input
                                    type="checkbox"
                                    name="magic"
                                    checked={formData.available}
                                    onChange={handleFormData}
                                    id="available"
                                />
                            </div>


                        </div>

                        <textarea
                            type="text"
                            name="content"
                            value={formData.content}
                            onChange={handleFormData}
                            onKeyDown={handleKeyDown}
                        />
                        <button>Invia</button>
                    </form >
                </div>
            </div>
        </>
    )
}