
# Clasificador de Perros y Gatos con TensorFlow.js

Este es un proyecto que utiliza un modelo de **TensorFlow.js** para clasificar imágenes en tiempo real desde la cámara web, detectando si la imagen es un **perro** o un **gato**. La predicción se realiza y se muestra en tiempo real sobre el video, con un efecto visual moderno.

## Tecnologías Utilizadas

- **React**: Para la interfaz de usuario.
- **TensorFlow.js**: Para el procesamiento y clasificación de imágenes.
- **TailwindCSS**: Para el diseño y estilo de la aplicación.
- **ngrok** (opcional): Para exponer el servicio de forma remota a través de un túnel seguro.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/)
- **npm**: Viene instalado con Node.js (si no lo tienes, puedes instalarlo desde [npm](https://www.npmjs.com/get-npm)).

Si deseas exponer el proyecto remotamente, también necesitarás **ngrok**:

- **ngrok**: [Descargar e instalar ngrok](https://ngrok.com/download)

## Instalación

1. **Clona el repositorio:**

   Abre tu terminal y clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instala las dependencias:**

   Ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Carga el modelo:**

   El proyecto requiere un modelo preentrenado de **TensorFlow.js**. Asegúrate de tener el archivo `model.json` del modelo ya entrenado en la carpeta adecuada. Si no tienes este modelo, puedes entrenarlo tú mismo o utilizar uno disponible en línea.

## Ejecución

1. **Inicia la aplicación:**

   Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. **Accede a la aplicación:**

   Abre tu navegador y accede a la URL:

   ```
   http://localhost:3000
   ```

   Esto abrirá la aplicación en tu navegador y podrás ver el clasificador de perros y gatos en tiempo real.

## Uso de ngrok

Si deseas exponer tu aplicación local para que otros puedan acceder a ella a través de Internet, puedes usar **ngrok**. Sigue estos pasos:

1. **Inicia ngrok:**

   Asegúrate de haber instalado **ngrok** y ejecuta el siguiente comando en tu terminal:

   ```bash
   ngrok http 3000
   ```

2. **Accede a la URL de ngrok:**

   Después de ejecutar el comando anterior, **ngrok** te proporcionará una URL pública que redirige a tu aplicación local. La URL tendrá un formato como:

   ```
   https://xxxxxx.ngrok.io
   ```

   Ahora puedes compartir esta URL con otras personas para acceder a tu aplicación desde cualquier lugar.

## Notas Adicionales

- Si experimentas problemas con la cámara, asegúrate de que el navegador tenga permisos para acceder a la cámara web.
- Puedes ajustar los colores y el estilo de la interfaz modificando los archivos de configuración de **TailwindCSS**.
- El modelo de TensorFlow.js utilizado para clasificar imágenes se encuentra en la carpeta `model`. Asegúrate de cargar un modelo válido en esta ubicación.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o mejoras, abre un **issue** o un **pull request**.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
