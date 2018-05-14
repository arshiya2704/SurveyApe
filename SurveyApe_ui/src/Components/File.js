import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Link} from 'react-router-dom';
import Question from "./Question";
import {reactLocalStorage} from 'reactjs-localstorage';

class File extends Component {

    constructor() {
        super();
        this.state = {
            survey: {
                name: '',
                questions: [],
                type:'',
                users:'',
                email:reactLocalStorage.getObject('var')
            },
            surveyList:[]
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);

    };


    handleChange1 (propertyName, event) {
        event.preventDefault();
        const survey = this.state.survey;
        survey[propertyName] = event.target.value;
        this.setState({ survey: survey });
    }

    addQue(){
        console.log('here');
        // var joined = this.state.formData.queArrShow.concat(<Question/>);
        // this.setState({ formData: { ...this.state.formData, queArrShow: joined} })
        this.setState(state=> state.survey.questions.push(<Question handleQueArr={this.handleQueArr}/>));
    }

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
            float:"left",
            width:"180px",
            backgroundColor:"#D8BFD8",
            backgroundSize:"100%",
            minHeight:"600px"
        };
        var style5={
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
            <div>
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


        );

    }


}


export default withRouter(File);