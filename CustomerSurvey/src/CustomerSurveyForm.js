import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import './CustomerSurveyForm.css';
import { sendsurvey } from './Api'


class CustomerSurveyForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            age: null,
            gender: null,
            drivinglicence: null,
            isfirstcar: null,
            drivetrain:null,
            fuelemission:null,
            noofcar:null,
            cars : [
                'BMW', 'Audi', 'Mercedes'
            ],
            selectedcar:null,
            carmodels : ["M1","M2"],
            selectedcarmodels : null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectCar = this.selectCar.bind(this);
        this.selectModel = this.selectModel.bind(this);
    }

    submitform = () => {
        let dict = {}
        debugger;
        for(let key in this.state){
            let value = this.state[key]
            if(!(value instanceof Array)){
                dict[key] = value
            }
        }
        debugger;
        console.log(dict);
        sendsurvey(dict).then((data)=>{
            console.log(data)
        }).catch((e)=>{
            console.log(e)
        })
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name == "isfirstcar" && value == "Yes"){
            this.setState({drivetrain:null,
                fuelemission:null,
                noofcar:null,
                selectedcar:null,
                selectedcarmodels : null})
        }

        if(name== "drivinglicence" && value == "No"){
            this.setState({
                isfirstcar: null,
                drivetrain:null,
                fuelemission:null,
                noofcar:null,
                selectedcar:null,
                selectedcarmodels : null})
        }

        if(name == "age" && value < 18){
            this.setState({
                drivinglicence: null,
                isfirstcar: null,
                drivetrain:null,
                fuelemission:null,
                noofcar:null,
                selectedcar:null,
                selectedcarmodels : null})
        }

        this.setState({
            [name]: value
        });
    }

    selectCar(event) {
        this.setState({selectedcarmodels:null})
        this.setState({selectedcar:this.state.cars[event.target.id]})
    }

    selectModel(event){
        this.setState({selectedcarmodels:this.state.carmodels[event.target.id]})
    }

    render() {
        return (
            <div>
            <h1 style={{textAlign:"center"}}>Customer Servey Form</h1>
            <table className="customerID">
                <tr>
                    <td className="leftside">
                        <label><strong>Age</strong></label>
                    </td>
                    <td className="rightside">
                        <div className="container">
                            <input type="text" name="age" value={this.state.age} placeholder="Enter Age" onChange={this.handleInputChange} required />  
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label><strong>Gender</strong></label>
                    </td>
                    <td>
                        <div className="container">
                            <input type="radio" value="Male" name="gender" checked={this.state.gender === "Male"} onChange={this.handleInputChange} />Male
                            <input type="radio" value="Female"  name="gender" checked={this.state.gender === "Female"} onChange={this.handleInputChange} /> Female
                        </div>
                    </td>
                </tr>

                { this.state.age >= 18 && (
                    <tr>
                        <td>
                            <label for="divingLicense"><strong>Do you own a car driving license?</strong></label>
                        </td>
                        <td>
                            <div className="container">
                                <input type="radio" value="Yes" name="drivinglicence" checked={this.state.drivinglicence === "Yes"} onChange={this.handleInputChange} /> Yes
                                <input type="radio" value="No" name="drivinglicence" checked={this.state.drivinglicence === "No"} onChange={this.handleInputChange} /> No, I Prefer  using other Tranport
                            </div>
                        </td>
                    </tr>
                )}
                { this.state.age >= 18 && this.state.drivinglicence == "Yes" && (
                    <tr>
                        <td>
                            <label for="firstCar"><strong>Is this your first Car?</strong>&nbsp;&nbsp;</label>&nbsp;&nbsp;
                        </td>
                        <td>
                            <div className="container">
                                <input type="radio" value="Yes" name="isfirstcar" checked={this.state.isfirstcar === "Yes"} onChange={this.handleInputChange} /> Yes
                                <input type="radio" value="No" name="isfirstcar" checked={this.state.isfirstcar === "No"} onChange={this.handleInputChange}  /> No
                            </div>
                        </td>
                    </tr>
                )}
                    

                { this.state.age >= 18 && this.state.drivinglicence == "Yes" && this.state.isfirstcar == "No" && (
                    <>
                        <tr>
                            <td>
                                <label for="driveTrain"><strong>What DriveTrain do you Prefer?</strong></label>
                            </td>
                            <td>
                                <div className="container">
                                    <input type="radio" value="FWD" name="drivetrain" checked={this.state.drivetrain === "FWD"} onChange={this.handleInputChange} /> FWD
                                    <input type="radio" value="RWD" name="drivetrain"  checked={this.state.drivetrain === "RWD"} onChange={this.handleInputChange} /> RWD
                                    <input type="radio" value="IDK"  name="drivetrain"  checked={this.state.drivetrain === "IDK"} onChange={this.handleInputChange} /> I Don't Know
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="fuelEmission"><strong>Are you Worried about Fuel Emission</strong></label>
                            </td>
                            <td>
                                <div className="container">
                                    <input type="radio" value="Yes" name="fuelemission" checked={this.state.fuelemission === "Yes"} onChange={this.handleInputChange} /> Yes
                                    <input type="radio" value="No" name="fuelemission" checked={this.state.fuelemission === "No"} onChange={this.handleInputChange} /> No
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="noOfCar"><strong>How many car do you have in your family</strong></label>&nbsp;&nbsp;
                            </td>
                            <td>
                                <div className="container">
                                    <input type="text" name="noofcar" value={this.state.noofcar} placeholder="Enter No Of Car" onChange={this.handleInputChange} required />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="carname"><strong>Which Car you Drive?</strong></label>&nbsp;&nbsp;
                            </td>
                            <td>
                                <div className="container">
                                    <div class="dropdown">
                                        <button class="dropbtn">{this.state.selectedcar==null ? "Please select car" : this.state.selectedcar}</button>
                                        <div class="dropdown-content">
                                            { this.state.cars.map((values, index)=>{
                                                return <a id={index} onClick={this.selectCar}>{values}</a>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </>
                )}
                
                { this.state.age >= 18 && this.state.drivinglicence == "Yes" && this.state.isfirstcar == "No" && this.state.selectedcar && (
                    <tr>
                        <td>
                            <label style={{marginBottom:"20px"}}><strong>Which Car model You do Drive?</strong></label>
                        </td>
                        <td>
                            <div className="container">
                                <div class="dropdown">
                                    <button class="dropbtn">{this.state.selectedcarmodels == null ? "Please select car model" : this.state.selectedcarmodels}</button>
                                    <div class="dropdown-content">
                                        { this.state.carmodels.map((values, index)=>{
                                            return <a id={index} onClick={this.selectModel}>{values}</a>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                <tr style={{margin:"0, auto",display:"block"}}>
                  
                    <button  type="submit"  onClick={this.submitform}><strong>Submit</strong></button>
                    
                </tr>
            </table>
        </div>
        )
    }
}

export default CustomerSurveyForm;