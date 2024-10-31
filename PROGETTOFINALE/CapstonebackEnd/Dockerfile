# Usa un'immagine base di Java 17
FROM openjdk:17-jdk-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file Maven Wrapper
COPY .mvn/ .mvn
COPY mvnw .

# Rendi eseguibile mvnw
RUN chmod +x mvnw

# Copia il file pom.xml e la cartella src nel container
COPY pom.xml .
COPY src ./src

# Scarica le dipendenze
RUN ./mvnw dependency:resolve

# Compila il progetto
RUN ./mvnw package -DskipTests

# Esponi la porta dell'app
EXPOSE 8080

# Comando per avviare l'applicazione
CMD ["java", "-jar", "target/CapstonebackEnd-0.0.1-SNAPSHOT.jar"]
