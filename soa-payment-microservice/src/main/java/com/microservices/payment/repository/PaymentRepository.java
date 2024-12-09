package com.microservices.payment.repository;

import com.microservices.payment.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Long getLastOrderNumber();

}
