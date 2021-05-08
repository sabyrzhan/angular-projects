FROM maven:latest
WORKDIR /project
COPY ./ ./
RUN mvn clean package
RUN ls -la ./target/

FROM azul/zulu-openjdk-alpine:16
WORKDIR /root/
COPY --from=0 /project/target/*.jar ./zapper.jar
EXPOSE 8080
CMD ["java", "-jar", "zapper.jar"]
