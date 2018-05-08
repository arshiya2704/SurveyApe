import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import img from '../img2.png';
import Question from "./Question";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            survey: {
                name: '',
                questions: [],
                type:'',
                users:''
            },
        };
        this.handleQueArr = this.handleQueArr.bind(this);
        };



    handleChange1 (propertyName, event) {
        event.preventDefault();
        const survey = this.state.survey;
        survey[propertyName] = event.target.value;
        this.setState({ survey: survey });
    }

    init() {
        console.log("component check");
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


    addSurvey = (survey) => {
            API.postSurvey(survey)
                .then((res) => {
                    console.log(res);
                    // alert(res.message);
                    // this.props.history.push("/");
                });
    };

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
                    <div className="dropdown">
                        <button style={style4} className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Send
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
                            <li>
                                Enter email addresses:
                                <textarea
                                    onChange={this.handleChange1.bind(this, 'users')} value={this.state.survey.users}
                                    style={style2}
                                    placeholder="Form Name"
                                />
                            </li>
                            <li>
                                <button style={style3} className="btn btn-primary" onClick={() => this.addSurvey(this.state)}>Publish</button>
                            </li>
                            {/*</div>*/}

                        </ul>
                    </div>
                </div>
                <div className="row" style={style1}>
                    <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6" style={buttons}>
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