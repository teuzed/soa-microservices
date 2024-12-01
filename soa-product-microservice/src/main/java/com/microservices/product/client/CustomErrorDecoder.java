package com.microservices.product.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservices.product.exceptions.GenericErrorResponse;
import feign.Response;
import feign.codec.ErrorDecoder;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class CustomErrorDecoder implements ErrorDecoder {
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Exception decode(String methodKey, Response response) {
        try (InputStream body = response.body().asInputStream()) {

            String responseBody = IOUtils.toString(body, StandardCharsets.UTF_8);
            Map<String, String> errors = mapper.readValue(responseBody, Map.class);

            return new GenericErrorResponse(
                    errors.get("error") != null ? errors.get("error") : "Unknown error",
                    HttpStatus.valueOf(response.status())
            );

        } catch (IOException exception) {

            return new GenericErrorResponse(
                    exception.getMessage() != null ? exception.getMessage() : "Error reading response body",
                    HttpStatus.valueOf(response.status())
            );
        }
    }
}