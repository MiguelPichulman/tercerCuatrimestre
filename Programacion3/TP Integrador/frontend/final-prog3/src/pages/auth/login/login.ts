import { saveUser } from "../../../utils/localStorage";

const form = document.getElementById("login-form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form?.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    try {
        // 1. Traemos los usuarios del JSON
        const response = await fetch('/data/usuarios.json');
        
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo de usuarios.");
        }
        
        const usuarios = await response.json();

        // 2. Buscamos si existe un usuario con ese mail y esa contraseña
        const usuarioValido = usuarios.find((u: any) => 
            u.mail === inputEmail.value && u.password === inputPassword.value
        );

        if (!usuarioValido) {
            alert("Credenciales incorrectas o usuario no encontrado.");
            return;
        }

        // 3. Si es válido, guardamos los datos en localStorage (SIN la contraseña, según TPI)
        const { password, ...usuarioSinPassword } = usuarioValido;
        saveUser(usuarioSinPassword);

        // 4. Redirección basada en el ROL
        if (usuarioValido.rol === "ADMIN") {
            window.location.href = "../../admin/adminHome/adminHome.html";
        } else {
            // Si es USUARIO (o cualquier otro)
            window.location.href = "../../store/home/home.html";
        }

    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        alert("Ocurrió un error al intentar iniciar sesión. Revisa la consola.");
    }
});