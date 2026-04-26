import type {IUser} from "../../../types/IUser";
import type {Rol} from "../../../types/Rol";

const registroForm = document.getElementById('registroForm') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const rolselect = document.getElementById('rol') as HTMLSelectElement;

registroForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const usuariosGuardados = localStorage.getItem('users');
    const listaUsuarios: IUser[]=usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

    const existe = listaUsuarios.some(u =>u.email===email.value);

    if (existe){
        alert('El usuario ya existe!');
        return;
    }
    const nuevoUsuario: IUser = {
        email: email.value,
        password: password.value,
        rol: rolselect.value as Rol

    };

    listaUsuarios.push(nuevoUsuario);
    localStorage.setItem('users', JSON.stringify(listaUsuarios));    

    alert('Registro exitoso! Inicie Sesion');
    window.location.href = '../login/login.html';
});