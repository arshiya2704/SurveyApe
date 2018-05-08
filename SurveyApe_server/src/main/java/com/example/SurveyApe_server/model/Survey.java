package com.example.SurveyApe_server.model;


        import java.util.ArrayList;
        import java.util.Date;
        import java.util.List;

        import javax.persistence.Embedded;
        import javax.persistence.Entity;
        import javax.persistence.GeneratedValue;
        import javax.persistence.GenerationType;
        import javax.persistence.Id;
        import com.example.SurveyApe_server.*;

@Entity // This tells Hibernate to make a table out of this class
public class Survey {

    String users;
//    String publish;
//    String end;
//    String email;
    String type;
    @Id
    String name;

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
