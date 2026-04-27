import { checkAuhtUser } from "./utils/auth";


const interceptorDeRutas = () => {
  const currentPath = window.location.pathname;

  
  if (currentPath.includes("/admin/")) {
    checkAuhtUser(
      "/src/pages/auth/login/login.html",    // si no hay sesión
      "/src/pages/client/home/home.html",   // si es un cliente infiltrado
      "admin"                                // Rol requerido
    );
  } 

  
  else if (currentPath.includes("/client/")) {
    checkAuhtUser(
      "/src/pages/auth/login/login.html",    // si no hay sesión
      "/src/pages/admin/home/home.html",    // si es un admin (opcional)
      "client"                               // Rol requerido
    );
  }

  
  // Si estamos en la raiz redirigimos al login por defecto
  if (currentPath === "/" || currentPath.endsWith("index.html")) {
    window.location.href = "/src/pages/auth/login/login.html";
  }
};

interceptorDeRutas();