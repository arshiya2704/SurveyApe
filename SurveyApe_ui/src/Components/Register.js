import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../pic.jpg';
import * as API from '../api/API';
//import logo from '../logo.png';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                Fname: '',
                Lname: '',
                email: '',
                password: ''
            }
        };
    };
    handleChange (propertyName, event) {
        const formData = this.state.formData;
        formData[propertyName] = event.target.value;
        this.setState({ formData: formData });
    }

    handleSubmit = (formdata) => {
        if(formdata.formData.Fname === '' || formdata.formData.email === '' || formdata.formData.password === '' ) {
            alert("Please enter the details");
            this.props.history.push("register");
        }
        else{
            API.register(formdata)
                .then((res) => {
                    console.log(res);
                    //alert(res.message);
                   // this.props.history.push("/verify");
                });}
    };

    handleSubmit1 = (formdata) => {
        if(formdata.formData.Fname === '' || formdata.formData.email === '' || formdata.formData.password === '' ) {
            e.preventDefault();
            this.props.history.push("/error1");
        }
        else{
            API.register(formdata)
                .then((res) => {
                    console.log(res);
                    //alert(res.message);
                    // this.props.history.push("/verify");
                });}
    };

    render() {
        var pos={
            marginTop: "120px"
        };
        var style1={
            width:"60px",
            marginRight:"10px"
        };
        return (
            <div className="row justify-content-md-center" style={pos}>
                <div className="col">
                </div>
                <div className="col-md-3 col-md-offset-3 col-sm-5 col-sm-offset-3 col-xs-6">
                    <img src={img} className="img-responsive" alt="logo"/>
                </div>
                <div className="col-md-4 col-md-offset-0 col-sm-5 col-sm-offset-0 col-xs-6">
                    Create an account
                    <hr/>
                    <form action="">
                        <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange.bind(this, 'Fname')} value={this.state.formData.Fname}/><br/>
                        <input type="text" className="form-control" placeholder="Surname" onChange={this.handleChange.bind(this, 'Lname')} value={this.state.formData.Lname}/><br/>
                        <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.formData.email}/><br/>
                        <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange.bind(this, 'password')} value={this.state.formData.password}/><br/><br/>
                        <button type="submit" className="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Create an account</button>
                        <div className="modal fade" id="myModal" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Please enter the verification code</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form action="" className="form-group">
                                                <textarea style={style1}></textarea>
                                                <textarea style={style1}></textarea>
                                                <textarea style={style1}></textarea>
                                                <textarea style={style1}></textarea>

                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-warning"  onClick={(e) => (e.preventDefault(), this.handleSubmit1(this.state))}>Verify</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);