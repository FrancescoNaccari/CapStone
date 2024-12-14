# Stage 1: Build del progetto
FROM maven:3.8.5-openjdk-17 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file pom.xml e scarica le dipendenze
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia il codice sorgente
COPY src ./src

# Esegui il build del progetto
RUN mvn clean package -DskipTests

# Stage 2: Creazione dell'immagine finale
FROM openjdk:17-jdk-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file JAR dal primo stage
COPY --from=build /app/target/*.jar app.jar

# Esponi la porta (assicurati che corrisponda alla porta configurata)
EXPOSE 8080

# Comando per avviare l'applicazione
ENTRYPOINT ["java", "-jar", "app.jar"]
