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
@CrossOrigin(origins = "http://localhost:3000")
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


//    @PostMapping(value="/addSurvey")
//    public @ResponseBody ResponseEntity<?>  addSurvey (@RequestBody final Complete obj) {
//
//        System.out.println("check here");
//        System.out.println(obj.getQuestions());
//        sr.save(obj.getSurvey());
//        qr.saveAll(obj.getQuestions());
//        String link;
////        if(obj.getSurvey().getType()=="1") {
////            //send email to all users same link
////            link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName();
////        }
////        else if (obj.getSurvey().getType()=="2") {
////            //send email to all users with unique link
////            link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName()+"&uname=arun"; //change user
////        }
////
////        else {
////            //ccheck if user is there then follow 1
////            //else follow2
////
////            if (ur.findByEmail("arun")!=null) //check uname
////                link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName();
////            else
////                link = "http://localhost:8080/getSurvey/sname="+obj.getSurvey().getName()+"&uname=arun";
////        }
////
////        return link;
//        ServiceResponse r = new ServiceResponse();
//        r.setMessage("Survey Created Successfully!!");
//        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
//
//    }


    @PostMapping(value="/addSurvey")
    public @ResponseBody ResponseEntity<?> addSurvey (@RequestBody final Complete obj) {

        sr.save(obj.getSurvey());
        qr.saveAll(obj.getQuestions());
        String link;
        String rusers = obj.getSurvey().getUsers();
        String[] ru = rusers.split(";");
        if(obj.getSurvey().getType().equals("General")) {
            //send email to all users same link

            for(int i=0;i<ru.length;i++) {
                link = "http://localhost:8080/takesurvey?sname=" + obj.getSurvey().getName();
                sendEmail(link,ru[i]);
                ServiceResponse r = new ServiceResponse();
           r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);

            }
        }
        else if (obj.getSurvey().getType().equals("Closed")) {
            //send email to all users with unique link3000

            for(int i=0;i<ru.length;i++) {
                link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName() + "&uname="+ru[i]; //change user
                sendEmail(link,ru[i]);
                ServiceResponse r = new ServiceResponse();
                r.setMessage("success");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
            }
        }

        else if (obj.getSurvey().getType().equals("Open")){
            //ccheck if user is there then follow 1
            //else follow2

            for (int i=0;i<ru.length;i++){
                User x = ur.findByEmail(ru[i]);
                if(x!=null){
                    link =  "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName();
                    sendEmail(link,ru[i]);
                    ServiceResponse r = new ServiceResponse();
                    r.setMessage("success");
                    return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);               }
                else {
                    link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName() + "&uname="+ru[i];
                    sendEmail(link,ru[i]);
                    ServiceResponse r = new ServiceResponse();
                    r.setMessage("success");
                    return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
                }
            }


        }

        ServiceResponse r = new ServiceResponse();
        r.setMessage("x");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    public static void sendEmail(String link,String uname) {
        final String username = "surveyape07@gmail.com";
        final String password = "SurveyApe";
        //properties
        Properties pro = new Properties();
        pro.put("mail.smtp.auth", "true");
        pro.put("mail.smtp.starttls.enable", "true");
        pro.put("mail.smtp.host", "smtp.gmail.com");
        pro.put("mail.smtp.port", "587");

        Session session = Session.getInstance(pro,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            //send
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("surveyape07@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, //use uname
                    InternetAddress.parse(uname));
            //compose
            message.setSubject("Invited to take a survey");
            message.setText("Take survey using this link : "
                    + link);  ///verify/"+uanme

            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping(value="/addResponse")
    public @ResponseBody ResponseEntity<?> addResponse (@RequestBody CompleteResponse obj) {

        System.out.println("hit it");

        rr.saveAll(obj.getResponses());

        ServiceResponse r = new ServiceResponse();
        r.setMessage("Survey Submitted Successfully!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    @PostMapping(value="/getSurvey")
    public ArrayList<Question> getSurvey (@RequestBody final Survey obj) {
        System.out.println("i am here"+ obj.getName());

        return qr.findAllBySname(obj.getName());
    }

    @PostMapping(value="/getUniqueSurvey")
    public ArrayList<Question> getUniqueSurvey (@RequestBody final CompleteSurvey obj) {
        System.out.println("******************************");
        String  x = obj.getSurvey().getName();
        System.out.println(x);
        Survey survey = sr.findByName(x);


        String y = obj.getUser().getEmail();

        System.out.println(y);
        if (survey.getUsers().contains(y)){
            survey.setUsers(survey.getUsers().replace(y,"BB@gmail.com"));
            sr.save(survey);
            //survey.getUsers().replace(obj.getUser().getEmail(),"x@gmail.com");
            return qr.findAllBySname(survey.getName());
//            sr.save(survey);
//            return qr.findAllBySname(survey.getName());
        }
//        else
//            System.out.println("noe");
       // Question a = new Question();
        ArrayList<Question> n = new ArrayList<>();
        //n.add(a);
         return n;
        //return sr.findAllBySname(sname);

    }
//
//    @GetMapping(value="/getSurvey")
//    public ArrayList<Question> getSurvey1 (@RequestParam("sname") String sname,@RequestParam("uname") String uname ) {
////        Survey obj = sr.findByName(sname);
////        if(obj.getUsers().toLowerCase().contains(uname.toLowerCase()))
////            return qr.findAllBySname(sname);
////        else
//            return null;
////
////
//    }

    @PostMapping(value = "/getSurveys")
    public ArrayList<String> getSurveys(@RequestBody final User email){
       // System.out.println(sr.findAllByEmail(email));
        //return (sr.findAllByEmail(email)).getSname();
        System.out.println(email);
        ArrayList<Survey> obj =  sr.findAllByEmail(email.getEmail());
        System.out.println(obj);
        ArrayList<String> out = new ArrayList<String> ();
        int i=0;
        for(Survey x : obj) {
            out.add(i,x.getName());
            i++;
        }
        System.out.println(out);
        return out;
    }


}




