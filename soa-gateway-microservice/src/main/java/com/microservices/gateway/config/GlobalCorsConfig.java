package com.microservices.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;

import java.util.List;

@Configuration
public class GlobalCorsConfig {
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOriginPatterns(List.of("/**"));
        corsConfig.setAllowedMethods(List.of("PUT", "GET", "POST", "DELETE", "OPTIONS"));
        corsConfig.setAllowedHeaders(List.of("Content-Type: Application/json"));
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(3600L);
        return new CorsWebFilter(exchange -> corsConfig);
    }
}
