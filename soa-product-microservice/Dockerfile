
FROM openjdk:17-jdk-slim

WORKDIR /app

ARG JAR_VERSION=latest

COPY soa-product-microservice/target/soa-product-microservice-${JAR_VERSION}.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
