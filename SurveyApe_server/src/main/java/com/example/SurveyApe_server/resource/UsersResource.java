package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.Users;

import com.example.SurveyApe_server.model.ServiceResponse;
import com.example.SurveyApe_server.repository.UsersRepository;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
//import com.oracle.javafx.jmx.json.JSONException;
import com.sun.org.apache.xerces.internal.xni.parser.XMLDTDFilter;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.json.*;

import javax.servlet.http.HttpServletResponse;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.logging.XMLFormatter;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/users")
public class UsersResource {

    @Autowired
    UsersRepository usersRepository;


    @GetMapping(value = "/all")
    public List<Users> getAll() {
        return usersRepository.findAll();
    }

    @PostMapping(value = "/login", produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<?> login(@RequestBody final Users user) {

            System.out.println("login called");
            System.out.println(user.getPwd());
            System.out.println(user.getEmail());
            String email= user.getEmail();
            Users u = usersRepository.findFirstByEmailAndPwd(user.getEmail(),user.getPwd());
            if(u == null){
                System.out.println("User does not exist!!");
                ServiceResponse r=new ServiceResponse();
                r.setMessage("User does not exist!!");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);}
            else{
                System.out.println("Logged In");
                ServiceResponse r=new ServiceResponse();
                r.setMessage("logged in");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
            }
        }
    @PostMapping(value = "/register")
    public ResponseEntity <ServiceResponse> registerUser(@RequestBody final Users user){
        System.out.println("register called");

        System.out.println(user.getFirstname());
        System.out.println(user.getLastname());
        System.out.println(user.getPwd());
        System.out.println(user.getEmail());


        Users u = new Users();
        u.setEmail(user.getEmail());
        u.setFirstname(user.getFirstname());
        u.setLastname(user.getLastname());
        u.setPwd(user.getPwd());

        usersRepository.save(u);
        ServiceResponse r=new ServiceResponse();
        r.setMessage("User Registered!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        //return usersRepository.findAll();
//        //return Ht;
//        return null;
    }

}
