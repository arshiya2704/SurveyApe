import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';

import Question from "./Question";
import moment from 'moment';
import Navbar from "./Navbar";
import 'react-datepicker/dist/react-datepicker.css';
import {reactLocalStorage} from 'reactjs-localstorage';

class Home extends Component {

    // static propTypes = {
    //     history: PropTypes.object.isRequired
    // };

    constructor(props) {
       super(props);
        this.state = {
            survey: {
                name: '',
                questions: [],
                type:'',
                users:'',
                publish: moment(),
                end:moment(),
                email:reactLocalStorage.getObject('var')
            },
            surveyList:[]

        };
        this.init();
        this.handleQueArr = this.handleQueArr.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        };


    getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    handleChange1 (propertyName, event) {
        event.preventDefault();
        const survey = this.state.survey;
        survey[propertyName] = event.target.value;
        this.setState({ survey: survey });
    }

    handleChange2(date, event) {
        event.preventDefault();
        this.setState({ survey: { ...this.state.survey, end: date} })
    }

    init() {
        console.log("component check");
        const check= JSON.stringify(reactLocalStorage.getObject('var'));
        if(check === JSON.stringify({})){
            //alert("Please login to continue");
            window.location="/";
            //this.props.history.push("/");
        }

        //if(reactLocalStorage.getObject('var'))
        console.log('user'+this.props.tag);
        API.getSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data
                });
            });
    }

    addQue(){
        console.log('here');
        // var joined = this.state.formData.queArrShow.concat(<Question/>);
        // this.setState({ formData: { ...this.state.formData, queArrShow: joined} })
        this.setState(state=> state.survey.questions.push(<Question handleQueArr={this.handleQueArr}/>));
    }

    // let i=0;
    handleQueArr (e,index) {
        console.log('called' );
       // e.preventDefault();

         let stepsValidated = this.state.survey.questions.slice();
         stepsValidated[index] =e;

   this.setState({ survey: { ...this.state.survey, questions: stepsValidated} })
   //      this.setState({
   //          abc:stepsValidated
   //      })
    }

    addSur(){
        this.props.history.push("home");
    }


    addSurvey = (survey) => {
            API.postSurvey(survey)
                .then((res) => {
                    console.log(res);
                     alert('Survey created successfully!!');
                     // window.location.reload();
                });
        setTimeout(function(){
            window.location.reload(1);
        }, 500)
    };

    logOut(){
        localStorage.clear();
        this.props.history.push("/");
    }



    render() {
        var buttons={
            width:"770px",
           // height:"500px",
            minHeight:"500px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%"
        };
        var buttons1={
            width:"770px",
            // height:"500px",
            minHeight:"60px",
            backgroundColor:"#FFFFFF",
            backgroundSize: "100%",
            marginTop:"97px",
            marginLeft:"297px"
        };

        var style={
            // marginTop: "180px",
            backgroundColor: "#8A2BE2",
            height: "200px",
            position:"center"
        };
        var style1={
            // marginTop: "180px",
            backgroundColor: "#e4dbf6",
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
            float:"right",
            // margin:"20px",
            marginTop:"-20px",
            marginRight:"40px",
            backgroundColor:"white",
            //textColor:"#FF4500"
        };
        var style4={
            float:"left",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };
        var style5={
            float:"left"
        };
        var style6={
            float:'right',
            margin:"20px",
            backgroundColor:"#FF4500",
            textColor:"#D8BFD8"
        };

        var style7={
            color: "#8A2BE2"
        };

        var style8={
            color: "#FFF"
        };


        return (
            <div className="container-fluid">
                <div className="row" style={style}>
                    {/*<button style={style3} className="btn btn-primary" onClick={() => this.addSurvey(this.state)}>Send</button>*/}
                    <div className="dropdown">
                        <button style={style6} className="btn btn-circle dropdown-toggle" id="menu1" type="button"  data-toggle="dropdown"><text style={style8}>{reactLocalStorage.getObject('var').charAt(0).toUpperCase()}</text>
                        </button>
                        <br/>
                        <br/>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1" >
                            {/*<img src ={dropbox} className="img-responsive" alt="profile"/>*/}
                            {reactLocalStorage.getObject('var')}
                            <br/>
                            <li role="presentation" class="divider"></li>
                            <button type="button" className="btn btn-light" onClick={() => this.logOut()}>Sign out</button>
                        </ul>
                    </div>

                    <div className="dropdown" >
                        <button style={style3} className="btn dropdown-toggle" type="button" data-toggle="dropdown"><text style={style7}>SEND</text>
                            <span className="caret"></span></button>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1" >
                            {/*<div className="radio-group">*/}
                                <li><div className="radio">
                                    <label>
                                        <input type="radio" name="radio" value='Open'  onChange={this.handleChange1.bind(this, 'type')} />
                                        Open
                                    </label>
                                </div></li>
                                <li><div className="radio">
                                    <label>
                                        <input type="radio"  name="radio" value='Closed'  onChange={this.handleChange1.bind(this, 'type')}/>
                                        Closed
                                    </label>
                                </div></li>
                                <li><div className="radio">
                                    <label>
                                        <input type="radio"  name="radio" value='General'  onChange={this.handleChange1.bind(this, 'type')} />
                                        General
                                    </label>
                                </div></li>
                            <br/>
                            <li>
                                <text style={style5}> Enter semicolon separated email addresses:</text>
                                <br/>
                                <textarea
                                    onChange={this.handleChange1.bind(this, 'users')} value={this.state.survey.users}
                                    style={style2}
                                    placeholder="Recipients"
                                />
                            </li>
                            <li>
                                <text style={style5}> Please choose the publish date:</text>
                                <br/>
                                <br/>
                                {/*<DatePicker*/}
                                {/*selected={this.state.end}*/}
                                {/*onChange={this.handleChange2.bind(this, 'end')}*/}
                                {/*placeholderText={"mm/dd/yyyy"} />*/}

                                <input type="date"
                                       placeholder="Check-in"  onChange={this.handleChange1.bind(this, 'publish')}/>
                            </li>
                            <br/>
                            <li>
                                <text style={style5}> Please choose the end date:</text>
                                {/*<DatePicker*/}
                                    {/*selected={this.state.end}*/}
                                    {/*onChange={this.handleChange2.bind(this, 'end')}*/}
                                {/*placeholderText={"mm/dd/yyyy"} />*/}

                                <input type="date"
                                       placeholder="Check-in"  onChange={this.handleChange1.bind(this, 'end')}/>
                            </li>
                            <li>
                                <button style={style3} className="btn btn-primary" onClick={() => this.addSurvey(this.state)}>Publish</button>
                            </li>
                            {/*</div>*/}

                        </ul>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons1}>
                        SurveyApe
                    </div>
                </div>
                <div className="row" style={style1}>
                    <div style={style4}>
                        <Navbar surveyList={this.state.surveyList}/>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons}>
                        <form className="form">
                            <div className="form-group">
                                <textarea
                                    onChange={this.handleChange1.bind(this, 'name')} value={this.state.survey.name}
                                    style={style2}
                                    placeholder="Form Name"
                                />
                                <button className="btn btn-primary" onClick={(e) => (e.preventDefault(), this.addQue())}>+</button>
                                <br/>
                                <br/>
                                <hr/>
                                <hr/>
                                {/*<Question handleQueArr={this.handleQueArr}/>*/}
                                {/*<Question handleQueArr={this.handleQueArr}/>*/}
                                {/*/!*<Question handleQueArrfunc={this.handleQueArr}/>*!/*/}
                                {/*/!*<Question handleQueArrfunc={this.handleQueArr}/>*!/*/}
                                {/*/!*{this.state.formData.queArrShow.map((item, index) => <Question/>)}*!/*/}
                                {this.state.survey.questions.map((item,index)  => <Question index={index} sname={this.state.survey.name} handleQueArr={this.handleQueArr} />)}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}


export default withRouter(Home);