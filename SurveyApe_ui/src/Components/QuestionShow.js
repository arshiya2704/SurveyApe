import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';

class QuestionShow extends Component {








    render() {

        var style2={
            border:"none",
            float:"left",
            width:"650px"
        };
        var style3={
            border:"none",
            float:"left",
            width:"500px"
        };
        var style5={
            width:"200px",
            float:"left",
            border:"none"
        };
        var fileStyle1={
            float:'left',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };

        const queShow= this.props.questions;
        console.log(queShow);
        const optionList= queShow.map((option) =>  ((option.qtype ==='text') ?
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
                    disabled={true}
                />
                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                </div> :
                (option.qtype === 'star')?
                    <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star-empty" style={fileStyle1} aria-hidden="true"></span>
                        <br/>
                        <hr/>
                    </div>:
                    <div>
                        <textarea
                            value={option.description}
                            style={style3}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input type="radio" disabled={true}></input>
                        </button>
                        <input
                            value={option.options.split(";")[0]}
                            style={style5}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input type="radio" disabled={true}></input>
                        </button>
                        <input
                            value={option.options.split(";")[1]}
                            style={style5}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input type="radio" disabled={true}></input>
                        </button>
                        <input
                            value={option.options.split(";")[2]}
                            style={style5}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <button style={style5} className="btn">
                            <input type="radio" disabled={true}></input>
                        </button>
                        <input
                            value={option.options.split(";")[3]}
                            style={style5}
                            disabled={true}
                        />
                        <br/>
                        <br/>
                        <hr/>
                    </div>

        ));
        return (
            <div>
                {optionList}

            </div>


        );

    }


}


export default withRouter(QuestionShow);