import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";

const form = document.getElementById("registro-form") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form?.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    if (inputPassword.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    try {
        // 1. Verificamos si el email ya existe en usuarios.json
        const response = await fetch('/data/usuarios.json');
        const usuarios = await response.json();
        
        // Usamos u.mail porque así lo define el TPI
        const emailExiste = usuarios.find((u: any) => u.mail === inputEmail.value);
        
        if (emailExiste) {
            alert("Ese email ya está registrado en el sistema. Por favor, inicia sesión.");
            return;
        }

        // 2. Si no existe, creamos el nuevo usuario
        const nuevoUsuario: any = {
            id: Date.now(), 
            nombre: inputNombre.value,
            apellido: "", 
            mail: inputEmail.value, // Cambiado a 'mail' según el TPI
            celular: "",  
            rol: "USUARIO"
        };

        // 3. Auto-login y redirección
        saveUser(nuevoUsuario);
        alert(`¡Registro exitoso! Bienvenido/a a Food Store, ${nuevoUsuario.nombre}.`);
        window.location.href = "../../store/home/home.html";

    } catch (error) {
        console.error("Error al registrar:", error);
    }
});