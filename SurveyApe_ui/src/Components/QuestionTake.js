import React, {Component} from 'react';
import * as API from '../api/API';
import {Route,withRouter,Link} from 'react-router-dom';
import Rating from 'react-star-rating-meter';
import {reactLocalStorage} from 'reactjs-localstorage';

class QuestionTake extends Component {

    constructor() {
        super();
        // this.handleChange = this.handleChange.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);
        this.state={

                sname:'survey',
                qtype:'fh',
                qdescription:'fh',
                ansM:'',
            ansS:'',
            options:'',
                email:reactLocalStorage.getObject('var'),
                ansT:'',

            //responses:[],
            svgHeart: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);

    };

    handleClick(rating, label, event) {
        this.setState({[label]:rating,
        options:rating});
    }

    handleHover(rating, label, event) {
        console.log(`HOVER rating: ${rating}, label: ${label}`);
    }

    handleChangeSur (qtype, qdesc, index,event) {
        event.preventDefault();
        const val = this.state;
        val['options'] = event.target.value;
        // if(qtype === 'text'){
        //     this.setState({ansT: event.target.value});
        // }
        // else if (qtype === 'star'){
        //     this.setState({ansS:this.ratings})
        // }
        // else{
        //     this.setState({ansM:event.target.value})
        // }

        const val2={
            sname:this.props.sname,
            qtype:qtype,
            qdescription:qdesc,
            options:this.state.options,
            email:reactLocalStorage.getObject('var'),
        };
        console.log('index'+index);
        this.props.sendResponse(val2,index);
    }



        render()
        {
            var buttons = {
                width: "770px",
                height: "500px",
                backgroundColor: "#FFFFFF",
            };

            var style = {
                // marginTop: "180px",
                backgroundColor: "#8A2BE2",
                height: "200px",
                position: "center"
            };
            var style1 = {
                // marginTop: "180px",
                backgroundColor: "#E6E6FA",
                height: "600px"
            };
            var style2 = {
                border: "none",
                float: "left",
                width: "650px"
            };
            var style3 = {
                border: "none",
                float: "left",
                width: "500px"
            };
            var style4 = {
                float: "right"
            };
            var style5 = {
                width: "200px",
                float: "left",
                border: "none"
            };
            var fileStyle1 = {
                float: 'left',
                color: 'skyblue',
                marginRight: '10px',
                marginLeft: '10px',
                padding: '3px',
                fontSize: '20px'
            };
            let svgHeart = {
                path: "M11.608,21.997c-22.647-12.354-6.268-27.713,0-17.369C17.877-5.716,34.257,9.643,11.608,21.997z",
                viewBox: "0 0 23.217 21.217"
            };

            const titleStyle = {
                marginLeft: "10px",
                marginBottom: "10px",
                fontSize: "1.2em",
                fontFamily: "Helvetica, sans-serif",
                display: "table-caption"
            };
            const ratingStyle = {
                position: "relative",
                paddingBottom: "50px",
                display: "table",
                margin: "auto 0",

            };
            const textStyle = {
                marginLeft: "10px",
                marginTop: "8px"
            };


            const ratings =
                [
                    <div style={ratingStyle} key={"svgHeart"}>
                        <Rating
                            label={"svgHeart"}
                            height={40}
                            length={500}
                            svg={svgHeart}
                            meterEmptyColor={"#8A2BE2"}
                            meterSelectColor={""}
                            meterBorderColor={"purple"}
                            meterBorderSize={0}
                            meterBorderStyle={"double"}
                            highlightColor={""}
                            highlightWidth={60}
                            starEmptyColor={"#D8BFD8"}
                            starSelectColor={"green"}
                            starSize={25}
                            getRating={this.handleClick}
                            onHover={this.handleHover}
                        />
                    </div>
                ];


            const queShow = this.props.questions;
            console.log(queShow);
            const optionList = queShow.map((option,index) => (

                    (option.qtype === 'text') ?
                        <div>
                    <textarea
                        value={option.description}
                        style={style3}
                        disabled={true}
                    />
                            <br/>
                            <textarea
                                style={style2}
                                placeholder="Enter Text"
                                onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}
                                // value={this.state.ans}
                            />
                            <br/>
                            <br/>
                            <br/>
                            <hr/>
                        </div>
                     :
                (option.qtype === 'star') ?

                    <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            {ratings}
                            <input type="text" value={this.state.svgHeart} onClick={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} style={textStyle} />
                            {/*<text value={this.state.svgHeart} onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}>{ratings}</text>*/}
                        </div>
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        {/*<span id="star" className="glyphicon glyphicon-star-empty" style={fileStyle1}*/}
                        {/*aria-hidden="true" role="button" onClick={() => this.handleChange.bind(this, 'optionsS') }></span>*/}
                        <br/>
                        <hr/>
                    </div>
                     :
                        <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                            <br/>
                            <br/>
                            <br/>


                            <div className="radio">
                                <label>
                                    <input type="radio" name="radio" value={option.options.split(";")[0]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                    {option.options.split(";")[0]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio"  name="radio" value={option.options.split(";")[1]} onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)}/>
                                    {option.options.split(";")[1]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio"  name="radio" value={option.options.split(";")[2]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                    {option.options.split(";")[2]}
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio"  name="radio" value={option.options.split(";")[3]}  onChange={(e) => this.handleChangeSur(option.qtype, option.description, index,e)} />
                                    {option.options.split(";")[3]}
                                </label>
                            </div>
                        </div>







            ));
            return (
                <div>
                    <ul>
                        {optionList}
                    </ul>
                    {/*<button className="btn btn-primary" onClick={() => this.submit}>Submit</button>*/}

                </div>


            );

        }


}


export default withRouter(QuestionTake);