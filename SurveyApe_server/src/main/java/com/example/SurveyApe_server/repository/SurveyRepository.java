package com.example.SurveyApe_server.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.SurveyApe_server.model.Survey;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface SurveyRepository extends JpaRepository<Survey, Long> {
        public Survey findByName(String name);
}