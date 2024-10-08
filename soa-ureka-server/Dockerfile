FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/soa-eureka-microservice.jar app.jar

EXPOSE 8099

ENTRYPOINT ["java", "-jar", "app.jar"]