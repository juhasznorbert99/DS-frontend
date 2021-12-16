import React from "react";
import {Row} from "reactstrap";
import {Button} from "react-bootstrap";
import { withRouter} from "react-router-dom";
import {Label, Col, Input} from 'reactstrap';
import {Container} from "react-bootstrap";
import * as API_RPC from "../user/grpc-api";

import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class GRPC extends React.Component{
    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            selectedUpdateForm: false,
            selectedAddDeviceForm: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            client: null,
            error: null,
            listDevices: [],
            listDevicesRPC: [],
            dataSet: [],
            dataSetAverage: []
        };
    }

    reload() {
        this.fetchDevices();
    }

    componentDidMount(){
        this.fetchDevices();
    }

    fetchDevices() {
        return API_RPC.getDevices((result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    listDevicesRPC: result.result,
                    isLoaded: true
                });
                console.log(result.result);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    render() {
        return (
            <Container>
                <br/>
                <Row>
                    <Col sm={{size: '4', offset: 0}}>
                        <div>
                            <Label for='devices'> Device: </Label>
                            <select id='devices' className="form-select col-8" aria-label="Default select example">
                                {
                                    this.state.listDevicesRPC.map((value, index) =>
                                        <option value={this.state.listDevicesRPC[index].id}>{this.state.listDevicesRPC[index].description}</option>
                                )}
                            </select>
                        </div>
                    </Col>
                    <Col sm={{size: '4', offset: 0}}>
                        <div>
                            <Label for='ddays'> Days: </Label>
                            <select id='ddays' className="form-select col-8" aria-label="Default select example" onChange={this.handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7" selected="selected">7</option>
                            </select>
                        </div>
                    </Col>
                    
                    <Col sm={{size: '4', offset: 0}}>
                        <div>
                            <Label for='day'> Select Day: </Label>
                            <select id='day' className="form-select col-8" aria-label="Default select example">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </Col>
                    <Col>
                        <br/>
                        <center><button onClick={this.getSensorDatas} type="button" className="btn btn-outline-secondary">Submit</button></center>
                    </Col>
                    <br/>
                    <center><h1>Hourly based on one day</h1></center>
                    <LineChart width={1300} height={600} data={this.state.dataSet} 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                            <Line type="monotone" dataKey="value" stroke="#0095FF" />
                    </LineChart>
                    <br/>
                    
                    <br/>
                    <center><h1>Average in the past d days</h1></center>
                    <LineChart width={1300} height={600} data={this.state.dataSetAverage} 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                            <Line type="monotone" dataKey="value" stroke="#059c6e" />
                    </LineChart>
                    <Col sm={{size: '4', offset: 0}}>
                        <div>
                            <Label for='hour'> Hours: </Label>
                            <select id='hour' className="form-select col-8" aria-label="Default select example">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                            </select>
                        </div>
                    </Col>
                    <Col sm={{size: '4', offset: 0}}>
                        <div>
                            <br/>
                            <button id="Hours" onClick={this.computeMinValue} type="button" className="btn btn-outline-secondary">Compute</button>
                        </div>
                    </Col>
                    
                    <Col sm={{size: '4', offset: 0}}>
                        <div>
                            <br/>
                            <input type="text" id="averageValue" readOnly="true"></input>
                            <br/>
                            <br/>
                            <input type="text" id="ts" readOnly="true"></input>
                            <br/>
                            <br/>
                            <input type="text" id="te" readOnly="true"></input>
                        </div>
                    </Col>
                </Row>
                <br/>
                <br/>
            </Container>
        )
    }

    handleChange = event =>{
        console.log(event.target.value);
        let nr = parseInt(event.target.value);
        
        let select = document.getElementById("day");
        select.innerHTML = "";
        let stringRes = ""
        for(let i = 0;i<nr;i++){
            stringRes += "<option value="+i.toString()+">"+i.toString()+"</option>"
        }
        select.innerHTML = stringRes;
    }

    computeMinValue = () => {
        let eDevice = document.getElementById("devices");
        let deviceIndex = eDevice.options[eDevice.selectedIndex].value;

        let eDDays = document.getElementById("ddays");
        let ddaysNumber = eDDays.options[eDDays.selectedIndex].value;

        let eDays = document.getElementById("day");
        let dayNumber = eDays.options[eDays.selectedIndex].value;

        let eHours = document.getElementById("hour");
        let hourValue = eHours.options[eHours.selectedIndex].value;
        console.log(hourValue);

        let indexVal = ddaysNumber-dayNumber-1;
        return API_RPC.getSensorDatas(deviceIndex,ddaysNumber, (result, status, error) =>{
            if (result !== null && (status === 200 || status === 201)) {
                console.log(result.result);

                let dataChart = [];
                let dataChartAverage = [];
                for(let i=0;i<24;i++){
                    let insertData = {}
                    insertData["name"] = i.toString();
                    insertData["value"] = result.result[parseInt(indexVal)][i].toString();
                    dataChart.push(insertData);
                    let aux=0;

                    for(let j=0;j<ddaysNumber;j++){
                        aux+=result.result[j][i];
                    }
                    
                    let insertDataAverage = {}
                    insertDataAverage["name"] = i.toString();
                    insertDataAverage["value"] = (aux/ddaysNumber).toString();
                    dataChartAverage.push(insertDataAverage);
                }
                let minValue = 9999999;
                let ts=0;
                let te=0;
                console.log(parseInt(hourValue));
                for(let i=0;i<24-parseInt(hourValue);i++){
                    let maxValue = -1;
                    for(let j=0;j<parseInt(hourValue);j++){
                        if(parseFloat(dataChartAverage[j+i]["value"]) > maxValue)
                            maxValue = parseFloat(dataChartAverage[j+i]["value"]);
                    }
                    if(maxValue<minValue){
                        ts = i;
                        te = i+parseInt(hourValue);
                        minValue=maxValue;
                    }
                }
                API_RPC.getDevice( deviceIndex,(result, status, error) =>{
                    let eDevice = document.getElementById("averageValue").value = (minValue+result.averageEnergyConsumption).toString();
                    document.getElementById("ts").value = "TS: " + ts.toString();
                    document.getElementById("te").value = "TE: " + te.toString();
                });

            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });

    }

    getSensorDatas = () =>{
        let eDevice = document.getElementById("devices");
        let deviceIndex = eDevice.options[eDevice.selectedIndex].value;

        let eDDays = document.getElementById("ddays");
        let ddaysNumber = eDDays.options[eDDays.selectedIndex].value;

        
        let eDays = document.getElementById("day");
        let dayNumber = eDays.options[eDays.selectedIndex].value;

        console.log(deviceIndex);
        console.log(ddaysNumber);
        console.log(dayNumber);
        let indexVal = ddaysNumber-dayNumber-1;
        return API_RPC.getSensorDatas(deviceIndex,ddaysNumber, (result, status, error) =>{
            if (result !== null && (status === 200 || status === 201)) {
                console.log(result.result);

                let dataChart = [];
                let dataChartAverage = [];
                for(let i=0;i<24;i++){
                    let insertData = {}
                    insertData["name"] = i.toString();
                    insertData["value"] = result.result[parseInt(indexVal)][i].toString();
                    dataChart.push(insertData);
                    let aux=0;
                    for(let j=0;j<ddaysNumber;j++){
                        aux+=result.result[j][i];
                    }
                    
                    let insertDataAverage = {}
                    insertDataAverage["name"] = i.toString();
                    insertDataAverage["value"] = (aux/ddaysNumber).toString();
                    dataChartAverage.push(insertDataAverage);
                }
                console.log(dataChartAverage)
                console.log(dataChart);
                this.setState(({
                    dataSet: dataChart,
                    dataSetAverage: dataChartAverage
                }));
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

}

export default withRouter(GRPC);