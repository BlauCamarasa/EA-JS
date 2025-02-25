console.log("Inicio");

// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

async function fetchOrderDetails() {
  try {
    const user = await getUser(1);
    console.log("Usuario:", user);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);

    console.log("Comentarios del primer post:", comments);
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log("Inicio");

//fetchOrderDetails();


/*Usar una API fake como por ejemplo https://jsonplaceholder.typicode.com/

Pedir los datos JSON de un usuario
Pedir los posts de ese mismo usuario
Pedir los comentarios de los posts
Usar 3 de las funciones de alto nivel combinadas (map, reduce, filte,...) con los datos. */

// Funció per obtenir el Id d'un usuari a partir d'un nom 
async function getUserFromName(nombre) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/users`);
  if (!resp.ok){
    throw new Error("Error al obtener usuario");
  }
  const usrs = await resp.json();
  const usr = usrs.filter(usu => usu.name.toLowerCase() === nombre.toLowerCase());
  if(usr.length === 0){
    throw new Error("No existe este usuario");
  }
  if(usr.length > 1){
    throw new Error("Existe mas de un usuario con este nombre");
  }
  return usr[0];
}

// Funció que per cada post busca els seus comentaris amb la funció getComments i els posa a comentarios
async function getComentarios(posts) {
  if(posts.length === 0){
    throw new Error("No existen posts de este usuario");
  }
  const com = posts.map(post => getComments(post.id));
  const commentarios = await Promise.all(com);
  if(commentarios.length === 0){
    throw new Error("No existen comentarios en los posts de este usuario");
  }
  return commentarios.flat();   
}


async function Seminario(nom) {
  try {
    const usuario = await getUserFromName(nom);
    console.log("Datos del usuario:",usuario);

    const posts = await getPosts(usuario.id);     //Funció de Roc
    console.log("Posts de "+ nom +": ", posts);

    const comments = await getComentarios(posts);
    console.log("Comentarios de todos los posts de "+ nom +": ", comments);

    const resultadoCombinado = comments.filter((comm) => comm.id > 3)
    .map((comm) => comm.email.concat("Hello"))
    .sort((a,b) => a.length - b.length);
    console.log("Resultado combinado: ", resultadoCombinado);
    
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}

Seminario("Kurtis Weissnat");




