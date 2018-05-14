import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Link} from 'react-router-dom';

class Navbar extends Component {

    constructor() {
        super();
        this.state = {

            qtype:'mcq',
            opt1:'',
            opt2:'',
            opt3:'',
            opt4:'',
            description:''
        };
        //this.init();
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);

    };


    showSurvey(surName){
        console.log("component check");

        API.getSurvey({"sname":surName})
            .then((data) => {
                console.log(data);

                this.setState({
                    questions: data,
                    formname: surName
                },() => { this.props.history.push(
                    {
                        pathname: "showsurvey/"+surName,
                        state: { questions: this.state.questions,
                        formname:this.state.formname}
                    });
                });

                // this.setState({
                //     questions: data,
                //     formname:surName
                // });
                // this.props.history.push("takesurvey");
            });
    }

    // init() {
    //     console.log("component check");
    //
    //     API.getSurveys({"email":"abc@gmail.com"})
    //         .then((data) => {
    //             console.log(data);
    //             this.setState({
    //                 surveyList: data
    //             });
    //         });
    // }

    render() {
        var style4={
            float:"left",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };
        const surveys= this.props.surveyList;
        const optionList= surveys.map((option) =>  <div>
                <button className="btn btn-link" onClick={() => this.showSurvey(option)}>{option}</button>
                <br/>
            </div>

        );
        return (
            <div style={style4}>
                <button className="btn btn-default btn-circle" onClick={() => this.addSur}>+</button>
                <text>My Posted Surveys:</text>
                <hr/>
                {optionList}

            </div>


        );

    }


}


export default withRouter(Navbar);