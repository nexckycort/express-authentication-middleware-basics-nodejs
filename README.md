# NodeJS: Middleware de autenticación Express

Su empresa lanzará pronto una aplicación de administrador de tareas. El equipo ya ha creado una aplicación Express con varias rutas para crear y administrar tareas. Como desarrolladar de Nodes en su empresa, debe escribir un middleware de autenticación basado en claves API para proteger algunas rutas y hacer que este disponible solo para los usuarios que proporcionan claves API validas.

__El middleware debe implementar las siguientes funcionalidades:__

- Complete el módulo ``key-store.js``. La exportación predeterminada del modulo es una función de controlador de ruta Express que:
  - Genera una nueva clave API unica
  - Lo agrega al archivo ``valid-keys.txt``
  - Responde con el estado 201 y el cuerpo ``{ "apiKey": API_KEY }`` es la clave API recien generada.
- Las claves del archivo deben almacenarse por linea. Cada clave debe ser única y la linea de terminaciones /separador/delimitador para cada dave debe ser el Nodes marcador de fin de linea os.EOL
- Complete el modulo middlewares La exportación predeterminada del modulo es una función de middleware ExpressJS. Esta función debe analizar el encabezado ``api-key`` y verificar si es una clave valida o no.
  - Si es una cave válida, llame a la siguiente función para pasar el control a la siguiente función en la pila de middleware
  - Si la cave no es valida o el encabezado no está presente, el servidor debe responder con el Código de estado 401 y no pasa el control a la siguiente función
