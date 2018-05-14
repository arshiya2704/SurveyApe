import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import img from '../img2.png';
import QuestionShow from "./QuestionShow";
import NavBarShow from "./NavBarShow";
import {reactLocalStorage} from 'reactjs-localstorage';

class ShowSurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
            ],
            formname:'',
            surveyList:[]
        };
        this.init();
    };

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    getUrlParam(parameter, defaultvalue){
        var urlparameter = defaultvalue;
        if(window.location.href.indexOf(parameter) > -1){
            urlparameter = this.getUrlVars()[parameter];
        }
        return urlparameter;
    }


    init() {
        console.log("component showsurvey check");

       // var mytext= this.getUrlParam('sname','Empty');

        API.getSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data
                });
            });


    }

    render() {
        var buttons={
            width:"770px",
            // height:"500px",
            minHeight:"500px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%"
        };

        var style={
            // marginTop: "180px",
            backgroundColor: "#8A2BE2",
            height: "200px",
            position:"center"
        };
        var style1={
            // marginTop: "180px",
            backgroundColor: "#E6E6FA",
            //height: "600px",
            minHeight:"600px",
            backgroundSize: "100%"
        };
        var style2={
            border:"none",
            float:"left",
            width:"650px"
        };
        var style3={
            float:"right"
        };
        var style4={
            float:"right"
        };
        var style5={
            width:"200px",
            float:"left"
        };
        var fileStyle1={
            float:'left',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };


        return (
            <div className="container-fluid">
                <div className="row" style={style}>
                    {/*<button style={style3} className="btn btn-primary" onClick={() => this.addSurvey(this.state)}>Send</button>*/}
                </div>
                <div className="row" style={style1}>
                    <NavBarShow surveyList={this.state.surveyList}/>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons}>
                        <form className="form">
                            <div className="form-group">
                                <textarea
                                    value={this.props.location.state.formname}
                                    style={style2}
                                    disabled={true}
                                />
                                <br/>
                                <br/>
                                <hr/>
                                <hr/>
                                <QuestionShow questions={this.props.location.state.questions}/>
                                {/*{this.state.survey.questions.map((item,index)  => <QuestionShow arr={this.state.questions} />)}*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}


export default withRouter(ShowSurvey);