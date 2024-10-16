FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/soa-order_detail-microservice.jar soa-order_detail-microservice.jar

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "soa-order_detail-microservice.jar"]