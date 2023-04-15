/*
const ids = document.querySelectorAll('#github-search, #github-action-search, #img-profile, #github-name, #github-username, #github-joined, #github-repos, #github-followers, #github-following');
console.log(ids);

ids.forEach(div_id => {
    console.log(div_id.id);
});
*/
const imageProfile = document.querySelector("#img-profile");
const githubName = document.querySelector("#github-name");
const githubUsername = document.querySelector("#github-username");
const githubJoined = document.querySelector("#github-joined");
const githubRepos = document.querySelector("#github-repos");
const githubFollowers = document.querySelector("#github-followers");
const githubFollowing = document.querySelector("#github-following");


const githubCompany = document.querySelector("#github-company");
const githubUpdated = document.querySelector("#github-updated");
const githubBio = document.querySelector("#github-bio");
const githubBlog = document.querySelector("#github-blog");
const githubEmail = document.querySelector("#github-email");
const githubTwitter = document.querySelector("#github-twitter");
const githubLocation = document.querySelector("#github-location");
//action

const githubActionSearch = document.querySelector("#github-action-search");
const githubInputSearch = document.querySelector("#github-search");


//evento onclick del bton

githubActionSearch.onclick=()=>{
    const username = githubInputSearch.value;

    githubInputSearch.value="";
    if(username === ""){
        Swal.fire({
            title:"Error",
            text:"Debes llenar el usuario",
            icon:"error"
        });
        return;
    }
    obtenerDatosGithub(username);
}




//vamos detectar el evento de enter cuano este en el input(este es otro evento - keyup)

githubInputSearch.addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        obtenerDatosGithub(event.target.value);
    }
});


//es la funcion fecth que consume el Api

const obtenerDatosGithub = async (username="guillermosifu") => {
  // ene ste ejemplio await esta haciendo lo sgte
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  
 //data mesaage de error cuando el usario no existe 
 //su valor sea not found 
  if(data.message === "Not Found"){
    Swal.fire({
        title:"Error",
        text:"No existe el usuario",
        icon:"error"
    })
    return;
  }

  setDataUser(data);
  obtenerRepos(username);
};


//es una funcion que alamacena los datos a cambiar 

const setDataUser =(data)=>{
    imageProfile.src= data.avatar_url;
    if(data.name != null){
        githubName.style.display = 'block';
        githubName.innerHTML = `<i class="fa-solid fa-circle"></i> ${limpiar_texto(data.name)}`;
    }else{
        githubName.style.display = 'none';
    }
    githubUsername.innerHTML=`@${data.login}`;
    githubJoined.innerHTML = `<i class="fa-solid fa-user-check"></i> Fecha de registro: ${(data.created_at).substr(0,10)}`;
    githubRepos.innerHTML = data.public_repos;
    githubFollowers.innerHTML = data.followers;
    githubFollowing.innerHTML = data.following;

    githubCompany.innerHTML = `<i class="fa-sharp fa-solid fa-building"></i> ${limpiar_texto(data.company)}`;
    githubUpdated.innerHTML = `<i class="fa-regular fa-clock"></i> Última conexión: ${(data.updated_at).substr(0,10)}`;
    githubBio.innerHTML = `<i class="fa-solid fa-quote-left"></i> ${limpiar_texto(data.bio)}`;
    githubBlog.innerHTML = `<i class="fa-solid fa-link"></i> ${limpiar_texto(data.blog)}`;
    githubEmail.innerHTML = `<i class="fa-regular fa-envelope"></i> ${limpiar_texto(data.email)}`;
    githubTwitter.innerHTML = `<i class="fa-brands fa-twitter"></i> ${limpiar_texto(data.twitter_username)}`;
    githubLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${limpiar_texto(data.location)}`;
}
obtenerDatosGithub();

const limpiar_texto = (texto) => {
    if(texto == null || texto == ""){
        return '-';
    }
    return texto;
}


const obtenerRepos = async (username) => {
    // ene ste ejemplio await esta haciendo lo sgte
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    // console.log(data.length);
    // console.log(data[0].name);

    const div_list = document.querySelector("#list-repos");
    let html = '';

    if(data.length >= 3){
        let num = 0;
        html += '<p class="sub-title">Algunos repositorios:</p>';
        while( num < 3){
            // console.log(num+' repos');
            html += '<a id="github-repo" href="'+data[num].html_url+'" target="_blank" rel="nofollow"><i class="fa-brands fa-square-git"></i> '+data[num].name+'</a>';
            num++;
        }
    }
    div_list.innerHTML = html;
  };
  