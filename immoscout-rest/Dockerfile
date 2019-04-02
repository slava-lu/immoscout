FROM openjdk:8-jre-alpine

MAINTAINER Viacheslav Luschinskiy "slavalu74@gmail.com"

EXPOSE 8080

WORKDIR /usr/local/bin

ARG JAR_FILE

ADD target/${JAR_FILE} restserver.jar

ENTRYPOINT ["java", "-jar", "restserver.jar"]