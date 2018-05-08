package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.*;
import com.example.SurveyApe_server.repository.QuestionRepository;
import com.example.SurveyApe_server.repository.ResponseRepository;
import com.example.SurveyApe_server.repository.SurveyRepository;
import com.example.SurveyApe_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping(value = "/surveys")
public class SurveyResource {

    @Autowired
    SurveyRepository sr;
    @Autowired
    QuestionRepository qr;
    @Autowired
    ResponseRepository rr;
    @Autowired
    UserRepository ur;


    @PostMapping(value="/addSurvey")
    public String addSurvey (@RequestBody final Complete obj) {

        System.out.println("check here");
        System.out.println(obj.getQuestions());
        sr.save(obj.getSurvey());
        qr.saveAll(obj.getQuestions());
        String link;
        if(obj.getSurvey().getType()=="1") {
            //send email to all users same link
            link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName();
        }
        else if (obj.getSurvey().getType()=="2") {
            //send email to all users with unique link
            link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName()+"&uname=arun"; //change user
        }

        else {
            //ccheck if user is there then follow 1
            //else follow2

            if (ur.findByEmail("arun")!=null) //check uname
                link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName();
            else
                link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName()+"&uname=arun";
        }

        return link;
    }


    @PostMapping(value="/addResponse")
    public String addResponse (@RequestBody CompleteResponse obj) {



        rr.saveAll(obj.getResponses());

        return "success";
    }

    @GetMapping(value="/getSurvey")
    public ArrayList<Question> getSurvey (@RequestParam("sname") String sname) {


        return qr.findAllBySname(sname);
    }

//    @GetMapping(value="/getSurvey")
//    public ArrayList<Question> getSurvey (@RequestParam("sname") String sname,@RequestParam("uname") String uname ) {
//        Survey obj = sr.findByName(sname);
//        if(obj.getUsers().toLowerCase().contains(uname.toLowerCase()))
//            return qr.findAllBySname(sname);
//        else
//            return null;
//
//
//    }



}




