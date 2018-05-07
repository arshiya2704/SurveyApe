package com.example.SurveyApe_server.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Response {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;


    private String option;

    private Integer survey_id;

    private Integer question_id;
}
