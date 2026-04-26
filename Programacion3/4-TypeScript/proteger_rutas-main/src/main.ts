import { checkAuhtUser } from "./utils/auth";


const interceptorDeRutas = () => {
  const currentPath = window.location.pathname;

  // 1. Si el usuario intenta entrar a cualquier página dentro de /admin/
  if (currentPath.includes("/admin/")) {
    checkAuhtUser(
      "/src/pages/auth/login/login.html",    // Redirección si no hay sesión
      "/src/pages/client/home/home.html",   // Redirección si es un cliente infiltrado
      "admin"                                // Rol requerido
    );
  } 

  // 2. Si el usuario intenta entrar a cualquier página dentro de /client/
  else if (currentPath.includes("/client/")) {
    checkAuhtUser(
      "/src/pages/auth/login/login.html",    // Redirección si no hay sesión
      "/src/pages/admin/home/home.html",    // Redirección si es un admin (opcional)
      "client"                               // Rol requerido
    );
  }

  // 3. Manejo de la raíz (index.html)
  // Si estamos en la raíz, redirigimos al login por defecto
  if (currentPath === "/" || currentPath.endsWith("index.html")) {
    window.location.href = "/src/pages/auth/login/login.html";
  }
};

// Se ejecuta inmediatamente al cargar el archivo
interceptorDeRutas();