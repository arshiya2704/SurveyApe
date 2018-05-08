package com.example.SurveyApe_server.repository;


        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.repository.CrudRepository;

        import com.example.SurveyApe_server.model.Response;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ResponseRepository extends JpaRepository<Response, Long> {

}