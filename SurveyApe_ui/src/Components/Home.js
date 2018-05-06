import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import img from '../img2.png';


class Home extends Component {

    // handleFileUpload = (event) => {
    //     const payload = new FormData();
    //     payload.append('mypic', event.target.files[0]);
    //     payload.append('owner',this.state.owner);
    //     payload.append('parent','root');
    //     console.log(payload);
    //     API.uploadFile(payload)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 NotificationManager.success('', res.message , 1000);
    //                 this.setState({
    //                     parent:res.id
    //                 });
    //                 API.getImages()
    //                     .then((data) => {
    //                         this.setState({
    //                             files: data
    //                         });
    //                     });
    //             }
    //             else{
    //                 NotificationManager.error('', res.message , 1000);
    //             }
    //         });
    //     setTimeout(function(){
    //         window.location.reload(1);
    //     }, 500);
    // };
    //
    // handleDirectory = () =>{
    //     const payload = new FormData();
    //     payload.append('owner',this.state.owner);
    //     payload.append('dirName',this.state.dirName);
    //     payload.append('parent','root');
    //     API.createDirectory(payload).then((res) => {
    //         if (res.status === 200) {
    //             this.setState({
    //                 parent:res.id
    //             });
    //             NotificationManager.success('', res.message , 1000);
    //             API.getImages()
    //                 .then((data) => {
    //                     this.setState({
    //                         files: data,
    //                     });
    //                 });
    //         }
    //         else{
    //             NotificationManager.error('', res.message , 1000);
    //         }
    //     });
    //     setTimeout(function(){
    //         window.location.reload(1);
    //     }, 500)
    // };

    constructor() {
        super();
        this.state = {
            files: [],
            dirName:'',
            owner:'',
            message:'',
            parent:'root',
            logs:[]
        };
        this.init();
    }

    handleChange (propertyName, event) {
        const val = this.state;
        val[propertyName] = event.target.value;
        this.setState({ val: val });
    }

    // logOut(){
    //     API.logOut().then((res) => {
    //         if(res.status === 200){
    //             this.props.history.push("/");
    //         }
    //     });
    // }

    init() {
        console.log("component check");
        // API.checkSession().then((res) => {
        //     if (res.status === 500){
        //         this.props.history.push("/");
        //     }
        //     else if(res.status === 200) {
        //         this.setState({
        //             owner:res.owner
        //         });
        //         var owner1 = res.owner;
        //         if (!this.state.files || this.state.files.length === 0) {
        //             API.getImages({value: owner1, parent:'root'})
        //                 .then((data) => {
        //                     console.log(data);
        //                     this.setState({
        //                         files: data
        //                     });
        //                 });
        //
        //         }
        //     }});
    }

    // showLogs(owner){
    //     API.getLogs({owner}).then((res) => {
    //         console.log(res.message);
    //         if (res.status === 500){
    //             this.props.history.push("/");
    //         }
    //         else if(res.status === 200) {
    //             this.setState({
    //                 logs: res.message
    //             },() => { this.props.history.push(
    //                 {
    //                     pathname: "/logs",
    //                     state: { logVal : res.message }
    //                 });
    //             });
    //         }});
    // }

    render() {
        var buttons={
            width:"770px",
            height:"500px",
            backgroundColor:"#FFFFFF",
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
            height: "600px"
        };
        var style2={
          border:"none",
            float:"left",
            width:"550px"
        };
        return (
            <div className="container-fluid">
                <div className="row" style={style}>
                </div>
                <div className="row" style={style1}>
                    <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6" style={buttons}>
                        <textarea
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={style2}
                            placeholder="Question"
                        />
                        <br/>
                        <br/>
                        <hr/>
                    </div>
                </div>
            </div>

        );

    }

}


export default withRouter(Home);