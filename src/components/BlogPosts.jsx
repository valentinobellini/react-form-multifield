import { useState } from "react";

const blogPosts = [
    {
        id: 1,
        title: "Zuppa di Nebbia e Luci"
    },
    {
        id: 2,
        title: "Risotto di Stelle e Ombre"
    },
    {
        id: 3,
        title: "Insalata di Venti e Fiori di Luce"
    },
    {
        id: 4,
        title: "Torta di Nuvole e Polvere di Sogno"
    },
    {
        id: 5,
        title: "Pasta al Raggio di Luna e Fumo di Primavera"
    }
];



export default function BlogPost() {

    // stato della lista posts
    const [posts, setPosts] = useState(blogPosts)
    // stato dell'input inserimento post
    const [newPost, setNewPost] = useState('');

    // funzione per l'aggiunta di un nuovo post da input
    const addPost = e => {
        e.preventDefault();


        // crea nuovo oggetto post
        const newPostObject = {
            id: posts.length === 0 ? 1 : posts[posts.length - 1].id + 1,
            title: newPost
        };


        // aggiungi il nuovo post alla lista
        const updatedPosts = [...posts, newPostObject];
        setPosts(updatedPosts);
        // azzeriamo il valore di newPost in input
        setNewPost('');
    }


    // funzione per la rimozione del post
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
                        {posts.map((post, i) => (
                            <li className="post" key={post.id}>
                                <p>{post.title}</p>
                                <button className="remove" onClick={() => removePost(post.id)}>
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                }


                {/* form per aggiunta post */}
                <div className="right-wrapper">
                    <p className="textarea-caption" >AGGIUNGI UNA RICETTA</p>
                    <form onSubmit={addPost}>
                        <textarea type="text" value={newPost} onKeyDown={handleKeyDown}
                            onChange={event => { setNewPost(event.target.value) }}
                        />
                        <button>Invia</button>
                    </form >
                </div>
            </div>
        </>
    )
}