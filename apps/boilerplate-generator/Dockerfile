# Use a base image with Java installed
FROM openjdk:11

# Install curl
RUN apt-get update && apt-get install -y curl

# Install ANTLR
RUN curl -O https://www.antlr.org/download/antlr-4.13.1-complete.jar \
    && mv antlr-4.13.1-complete.jar /usr/local/lib/antlr-4.9.2-complete.jar

# Set environment variables for ANTLR
ENV CLASSPATH=".:/usr/local/lib/antlr-4.9.2-complete.jar:$CLASSPATH"
ENV PATH="/usr/local/lib:$PATH"

# Create app directory and set as working directory
WORKDIR /usr/src/app

# Copy the grammar file into the container
COPY ./src/outputs/ProblemDefinition.g4 .

# Run ANTLR to generate TypeScript parser files
CMD ["java", "-Xmx500M", "-cp", "/usr/local/lib/antlr-4.9.2-complete.jar", "org.antlr.v4.Tool", "-Dlanguage=TypeScript", "ProblemDefinition.g4"]
