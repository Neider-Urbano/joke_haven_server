# Utiliza la imagen oficial de Node.js como base
FROM node:18

# Crea un directorio de trabajo para la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente al directorio de trabajo
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD [ "npm", "start" ]
