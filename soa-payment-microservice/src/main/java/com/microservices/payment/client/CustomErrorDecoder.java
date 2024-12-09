package com.microservices.payment.client;

import feign.Response;
import feign.codec.ErrorDecoder;
import java.io.IOException;

public class CustomErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {

        if (response.status() == 404) {
            return new RuntimeException("Recurso no encontrado");
        } else if (response.status() == 500) {
            return new RuntimeException("Error interno del servidor");
        }
        return new Exception("Error desconocido");
    }
}
