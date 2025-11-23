FROM amazoncorretto:21-alpine3.21

WORKDIR /app

COPY . .

RUN ./gradlew build

EXPOSE 8080

CMD ["java", "-jar", "build/libs/api-0.0.1-SNAPSHOT.jar"]