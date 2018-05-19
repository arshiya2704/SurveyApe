import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
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
            surveyList:[],
            addInvitees:'',
            newEndDate:''
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

    delete= (formName) =>{
        console.log(formName);
        API.del({formname:formName})
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };
    stats= (formName) =>{
        console.log(formName);
        API.stats({formname:formName})
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };

    editDate= (val) =>{
        console.log(val);
        const value={
            end:val.newEndDate,
            name:val.formname
            }
        ;
        API.edit(value)
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };

    send= (val) =>{
        console.log(val);
        const value={
                users:val.addInvitees,
                name:val.formname
            }
        ;
        API.addInvitees(value)
            .then((res) => {
                // if (res.status === 200) {
                //     setTimeout(function(){
                //         window.location.reload(1);
                //     }, 2000)
                //
                // }
            });

    };

    init() {
        console.log("component showsurvey check");

       // var mytext= this.getUrlParam('sname','Empty');
       //  $('.dropdown-menu').click(function(e) {
       //      e.stopPropagation();
       //      if ($(e.target).is('[data-toggle=modal]')) {
       //          $($(e.target).data('target')).modal()
       //      }
       //  });

        API.getSurveys({"email":reactLocalStorage.getObject('var')})
            .then((data) => {
                console.log(data);
                this.setState({
                    surveyList: data,
                    formname: this.props.location.state.formname,
                    questions:this.props.location.state.questions
                });
            });


    }

    handleChange1 (propertyName, event) {
        event.preventDefault();
        const survey = this.state;
        survey[propertyName] = event.target.value;
        this.setState({ survey: survey });
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
          margin:"4px",
          //size:"180px"
            color: "#8A2BE2"
        };
        var style4={
          width:"530px"
        };
        var style5={
            float:"left",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
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
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons1}>
                        SurveyApe
                    </div>
                </div>
                <div className="row" style={style1}>
                    <div style={style5}>
                        <NavBarShow surveyList={this.state.surveyList}/>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 col-xs-6" style={buttons}>
                        <form className="form">
                            <div className="form-group">
                                <textarea
                                    value={this.state.formname}
                                    style={style2}
                                    disabled={true}
                                />
                                <span style={style3} className="glyphicon glyphicon-trash" aria-hidden="true" role="button" data-toggle="modal"  data-target="#myModal_delete"></span>
                                <div className="modal fade" id="myModal_delete" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Are you sure you want to unpublish {this.state.formname}?</h4>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.delete(this.state.formname)} >Unpublish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span style={style3} className="glyphicon glyphicon-edit" aria-hidden="true" role="button" data-toggle="modal"  data-target="#myModal_edit"></span>
                                <div className="modal fade" id="myModal_edit" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Extend end date</h4>
                                            </div>
                                            <div className="modal-body">
                                                <input type="date"
                                                       placeholder="New End Date" onChange={this.handleChange1.bind(this, 'newEndDate')} />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.editDate(this.state)} >Extend</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span style={style3} className="glyphicon glyphicon-envelope" aria-hidden="true" role="button" data-toggle="modal"  data-target="#myModal_invite"></span>
                                <div className="modal fade" id="myModal_invite" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Add invitees emails separated by semi-colon</h4>
                                            </div>
                                            <div className="modal-body">
                                                <textarea style={style4} placeholder="Enter ; separated email id's" type="text" onChange={this.handleChange1.bind(this, 'addInvitees')}></textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.send(this.state)} >Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <span style={style3} className="glyphicon glyphicon-stats" aria-hidden="true" role="button" onClick={() => this.stats(this.props.location.state.formname)}></span>
                                <br/>
                                <br/>
                                <hr/>
                                <hr/>
                                <QuestionShow questions={this.state.questions}/>
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