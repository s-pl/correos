
# Consulta de Estado de Envío con Correos®

Este proyecto consiste en una aplicación web simple que permite a los usuarios consultar el estado de un envío utilizando el servicio de seguimiento de Correos®. La aplicación está compuesta por un servidor Node.js que maneja las solicitudes y una interfaz de usuario HTML/CSS/JavaScript que permite a los usuarios ingresar el código de seguimiento y ver el estado del envío.

# Funcionalidades
Los usuarios pueden ingresar un código de seguimiento para consultar el estado de un envío.
La aplicación realiza una solicitud al servidor Node.js que a su vez realiza una solicitud a la API de Correos® para obtener información sobre el estado del envío.
El estado del envío se muestra en la interfaz de usuario en forma de mensaje HTML.

# Requisitos Previos
Para ejecutar esta aplicación, es necesario tener instalado Node.js en el sistema. Puede descargarse desde https://nodejs.org.
# Instalación

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/consulta-envio-correos.git
```

Navega al directorio del proyecto:


```bash
cd consulta-envio-correos
```

Instala las dependencias del proyecto utilizando npm:
```bash
npm install
```

# Uso 
 Inicia el servidor Node.js ejecutando el siguiente comando en la terminal:

```js
node server.js
```

 Navega a ``https://localhost:3000``
 En la página de inicio, ingresa el código de seguimiento del envío en el campo provisto y haz clic en el botón "Consultar estado". El estado del envío se mostrará debajo del botón en forma de mensajes de texto.





## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

