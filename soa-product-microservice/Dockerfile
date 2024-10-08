
FROM openjdk:17-jdk-slim

WORKDIR /app

ARG JAR_VERSION=latest

COPY soa-user-microservice/target/soa-user-microservice-${JAR_VERSION}.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
