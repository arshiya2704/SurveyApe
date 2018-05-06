import React, {Component} from 'react';
import {Route,withRouter,Link} from 'react-router-dom';
import * as API from '../api/API';
import  '../App.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            tag:'',
            userData: {
                email: '',
                password: ''
            }
        }};

    handleChange (propertyName, event) {
        const userData = this.state.userData;
        userData[propertyName] = event.target.value;
        this.setState({ userData: userData });
    }

    handleSubmit = (userdata) => {
        if(userdata.userData.email === '' || userdata.userData.password === '') {
            this.props.history.push("/error");
        }
        else{
            API.login(userdata)
                .then((res) => {
                    console.log(res);
                    if (res.message === 'logged in'){
                        this.setState(
                            {
                                tag : res.email
                            });
                        this.props.history.push("/welcome");
                    }
                    else alert(res.message);
                });}
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div className="background">
                        <div className="row">
                            <div className="text-center">
                                <button className="background-btn" id="menu1" type="button" data-toggle="modal" data-target="#myModal">
                                Go to Google Forms
                                </button>
                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Sign in using an existing account</h4>
                                            </div>
                                            <div className="modal-body">
                                                <form action="" className="form-group">
                                                    <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.userData.email}/><br/>
                                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.userData.password}/><br/>
                                                    <button className="btn btn-primary" type="submit" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Sign In</button>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <Link to="/register">Or create an account</Link><br/><br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(Login);