import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("Loginform") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usuariosGuardados = localStorage.getItem("users");
  const listaUsuarios : IUser[]= usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

  
  const usuarioEncontrado = listaUsuarios.find(u => 
    u.email === valueEmail && u.password === valuePassword
  );

  if (usuarioEncontrado) {
    usuarioEncontrado.loggedIn = true;
    
    localStorage.setItem("userData", JSON.stringify(usuarioEncontrado));//ver

    saveUser(usuarioEncontrado);

    alert(`Sesión iniciada como ${usuarioEncontrado.rol}`);
    
    if (usuarioEncontrado.rol === "admin") {
      navigate("/src/pages/admin/home/home.html");
    } else {
      navigate("/src/pages/client/home/home.html");
    }

  } else {
    
    alert("Email o contraseña incorrectos.");
  }
});