package com.example.SurveyApe_server.model;





        import java.util.ArrayList;
        import java.util.List;

        import javax.persistence.Embedded;
        import javax.persistence.Entity;
        import javax.persistence.GeneratedValue;
        import javax.persistence.GenerationType;
        import javax.persistence.Id;
        import com.example.SurveyApe_server.*;


public class CompleteResponse {


    ArrayList<Response> responses;

    public ArrayList<Response> getResponses() {
        return responses;
    }

    public void setResponses(ArrayList<Response> responses) {
        this.responses = responses;
    }

    public CompleteResponse () {}






}