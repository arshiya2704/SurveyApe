package com.example.SurveyApe_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.SurveyApe_server.model.Users;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users,String> {
    public Users findFirstByEmailAndPwd(String email, String pwd);

}
