# Proyecto de Registro de Clientes - Fullstack

Este proyecto consta de una aplicación web básica con funcionalidades mínimas para el registro de clientes. La arquitectura está compuesta por microservicios implementados en Node.js utilizando los frameworks Hapi (o Fastify), y el frontend está construido con Angular.

## Estructura del Proyecto

- **frontend**: Contiene la aplicación Angular.
- **backend/src/ms_security**: Microservicio de seguridad.
- **backend/src/ms_client**: Microservicio de clientes.
- **backend/src/ms_mail**: Microservicio de correos.

## Configuración del Entorno

Asegúrate de tener instalado Mysql, Node.js y npm en tu sistema antes de comenzar.

### Frontend (Angular)

1. Navega al directorio `frontend`.
   ```bash
   cd frontend
   ```

2. Instala las dependencias.
   ```bash
   npm install
   ```

3. Inicia la aplicación Angular.
   ```bash
   ng serve
   ```

### Microservicio de Seguridad

1. Navega al directorio `backend/src/ms_security`.
   ```bash
   cd backend/security-service
   ```

2. Instala las dependencias.
   ```bash
   npm install
   ```

3. Inicia el microservicio.
   ```bash
   npm run dev-security
   ```

### Microservicio de Clientes

1. Navega al directorio `backend/src/ms_client`.
   ```bash
   cd backend/client-service
   ```

2. Instala las dependencias.
   ```bash
   npm install
   ```

3. Inicia el microservicio.
   ```bash
   npm run dev-client
   ```

### Microservicio de Correos

1. Navega al directorio `backend/src/ms_mail`.
   ```bash
   cd backend/email-service
   ```

2. Instala las dependencias.
   ```bash
   npm install
   ```

3. Inicia el microservicio.
   ```bash
   npm run dev-mail
   ```

## Configuración de Redis y RabbitMQ

Asegúrate de tener Redis y RabbitMQ instalados y en ejecución en tu entorno. Configura las conexiones y detalles necesarios en cada microservicio según sea necesario.

## Uso

1. Abre tu navegador y accede a `http://localhost:4200` para ver la aplicación Angular.

2. Completa el formulario de registro, que obtendrá un token del microservicio de seguridad y registrará el cliente en el microservicio correspondiente.

3. Consulta los registros y envíos de correos en las bases de datos respectivas.

---

Este proyecto es un esquema básico y puede requerir ajustes adicionales según los requisitos específicos del entorno y las necesidades del usuario.
