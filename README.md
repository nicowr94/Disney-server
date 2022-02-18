# Disney-server

El aplicativo permite la autentificación de los usuarios con JWT

## Se utilizó
- Node.js
- Babel
- Express
- Mongo


## Para ejecutar la aplicación

- Descargar el repositorio
- Abrir consola en la dirección del proyecto
- Ejecutar el comando para iniciar Mongo
  ```javascipt
    mongod
  ```
  
- Ejecutar el comando para iniciar el aplicativo
  ```javascipt
    npm run dev  
  ```
  ## Funcionalidades
- Al iniciar el servidor se creará a un usuario con rol de aministrador (correo: admin@ejemplo.poc, contraseña: admin123)
- El aplicativo validará si el usuario tiene un token valido y en ciertos casos el rol de administrador
- El aplicativo al registrar una nueva sesión de un usuario este validará que no tenga activa otra sesión. Si el usuario tiene una sesión en otro dispositivo, el aplicativo desactivará la sesión mas antigua.
  
  ## Forma de utilizar los servicos
  - Ir a http://localhost:4000/
  - Utilizar los API´s con los datos necesarios como el token (sugerencia: usar postman): 
  
    POST: http://localhost:4000/api/users
    
    POST: http://localhost:4000/api/auth/signup
    
    POST: http://localhost:4000/api/auth/logout
    
    POST: http://localhost:4000/api/auth/verifyLogin
    
