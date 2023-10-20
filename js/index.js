let nombreUsuario = document.getElementById("nombreUsuario")

function botonJugar(){
    if (nombreUsuario.value == ""){
        nombreUsuario.classList.add("parpadeo");
        let timer = setTimeout(function(){
            nombreUsuario.classList.remove("parpadeo");
        }, 3000)
    }else{
        localStorage.setItem("jugador", nombreUsuario.value)
        location.href = "pagina1.html"
    }
    return false
}