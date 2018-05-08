package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.User;

import java.util.*;

import com.example.SurveyApe_server.model.ServiceResponse;
import com.example.SurveyApe_server.repository.UserRepository;
//import com.oracle.javafx.jmx.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.mail.*;
import javax.mail.PasswordAuthentication;
import javax.mail.internet.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping(value = "/users")
public class UserResource {

    @Autowired
    UserRepository userRepository;


    @GetMapping(value = "/all")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PostMapping(value = "/login", produces=MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<?> login(@RequestBody final User user) {

        System.out.println("login called");
        System.out.println(user.getPwd());
        System.out.println(user.getEmail());
        String email= user.getEmail();
        User u = userRepository.findFirstByEmailAndPwd(user.getEmail(),user.getPwd());
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


    @Autowired
    UserRepository ur;

    @GetMapping(value = "/verify")
    public String verifyUser(@RequestParam("uname") String uname, @RequestParam("code") Integer code) {
        User a = ur.findByEmail(uname);
        if(a.getVerified() == code) {

            a.setVerified(0);
            //System.out.println(uname);
            ur.save(a);
            sendConfirmation (a.getEmail());
            return "success";
        }
        return "verify again";
    }


    @PostMapping(value = "/register")
    public ResponseEntity <ServiceResponse> registerUser(@RequestBody User user) {
        System.out.println("register called");

        System.out.println(user.getFirstname());
        System.out.println(user.getLastname());
        System.out.println(user.getPwd());
        System.out.println(user.getEmail());
        Random rand = new Random();


        User u = new User();
        u.setEmail(user.getEmail());
        u.setVerified(rand.nextInt(9999));
        u.setFirstname(user.getFirstname());
        u.setLastname(user.getLastname());
        u.setPwd(user.getPwd());


        userRepository.save(u);
        ServiceResponse r = new ServiceResponse();
        r.setMessage("User Registered!!");

        sendEmail(user.getEmail(),u.getVerified());
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    public static void sendEmail(String uname,int code) {
        final String username = "anshitanshit123@gmail.com";
        final String password = "surveyape";
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
            message.setFrom(new InternetAddress("anshitanshit123@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, //use uname
                    InternetAddress.parse(uname));
            //compose
            message.setSubject("Verify the Email");
            message.setText("fin,"
                    + "Visit http://localhost:8080/users/verify?uname="+uname+"&code="+code);  ///verify/"+uanme
            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }




    public static void sendConfirmation(String uname) {
        final String username = "anshitanshit123@gmail.com";
        final String password = "surveyape";
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
            message.setFrom(new InternetAddress("anshitanshit123@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, //use uname
                    InternetAddress.parse(uname));
            //compose
            message.setSubject("Verify the Email");
            message.setText("fin,"
                    + "Welcome to SurveyApe." +
                    "For login: localhost:3000 ");  ///verify/"+uanme
            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


}




