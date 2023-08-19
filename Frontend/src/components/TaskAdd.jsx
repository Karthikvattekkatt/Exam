import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const TaskAdd = (props) => {
    //console.log("props data", props.data);
    const [inputs, setInputs] = useState(props.data);
    const navigate = useNavigate();

    //to display form validation warnings
    const[displayLid,setDisplayLid]=useState(false);
    const[displayNamewarn,setDisplayNamewarn]=useState(false);
    const[displayCwarn,setDisplayCwarn]=useState(false);
    const[displayProwarn,setDisplayProwarn]=useState(false);
    const[displayBwarn,setDisplayBwarn]=useState(false);
    const[displayCswarn,setDisplayCswarn]=useState(false);

    // function to handle inputs from form
    const inputHandler = (e) => {
        setDisplayLid(false);
        setDisplayNamewarn(false);
        setDisplayCwarn(false);
        setDisplayProwarn(false);
        setDisplayBwarn(false);
        setDisplayCswarn(false);

        const { name, value } = e.target;
        setInputs({
            ...inputs, [name]: value
        });
    }


    // function to handle from inputs when submit button is clicked
    const submitHandler = () => {
        if (!validateForm()) {
            return; 
          }

        let data = {
            taskId: taskID,
            description: inputs.description,
            status: inputs.status
        }

        // post function
        if (props.method === "post") {
            axios.post(`http://localhost:5000/api/postldata`, data)
                .then((response) => {
                    if (response.data.message === "Posted successfully") {
                        console.log("response post", response);
                        Swal.fire('', response.data.message, 'success');
                        navigate('/thome');
                    }
                    else {
                        Swal.fire('Sorry', response.data.message, '');
                    }
                })
                .catch((err) => { console.log(err) })
        }
        // update function
        if (props.method === "put") {
            axios.put(`http://localhost:5000/api/putldata/${inputs._id}`, data)
                .then((response) => {
                    if (response.data.message === "Updated successfully") {
                        Swal.fire('', response.data.message, 'success');
                        window.location.reload(false);
                    }
                    else {
                        Swal.fire('Sorry', response.data.message, '');
                    }
                })
                .catch((err) => { console.log(err) })
        }
    }
return (
        <div>
            <div className="container w-50 mt-5 pt-5  bg-secondary-subtle rounded">
                <h3>TODO form</h3>
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-2">
                    
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="taskid" className="form-label">Task Id :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <input type="text"
                                            id="taskid"
                                            className="form-control"
                                            name="taskid"
                                            value={inputs.taskId}
                                            onChange={inputHandler}
                                        />
                                        {displayLid?<p className="fw-light fst-italic text-start text-danger">Must contain letters,numbers and - only</p>:<p></p>}
                                    </div>
                                </div>
                            </div>
                            {/* Name of learner */}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="name" className="form-label">Description :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <input type="text"
                                            id="name"
                                            className="form-control"
                                            name="name"
                                            value={inputs.description}
                                            onChange={inputHandler}
                                        />
                                        {displayNamewarn?<p className="fw-light fst-italic text-start text-danger">Must contain letters only</p>:<p></p>}
                                    </div>
                                </div>
                            </div>


                            {/* Task  Status*/}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                        <label htmlFor="course" className="form-label">Task Status :</label>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                                        <select className="form-select required"
                                            aria-label="Default select example"
                                            name="cstatus"
                                            value={inputs.cstatus}
                                            onChange={inputHandler}>
                                            <option defaultValue></option>
                                            <option value="Qualified">Completed</option>
                                            <option value="Incompetent">Not completed</option>
                                        </select>
                                        {displayCswarn?<p className="fw-light fst-italic text-start text-danger">Please select the task status</p>:<p></p>}
                                    </div>
                                </div>
                            </div>

                            {/* Button*/}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row">
                                    {/* offset */}
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                    </div>
                                    {/* Button Submit*/}
                                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                        <button className="btn btn-success" onClick={submitHandler}>Submit</button>
                                    </div>
                                    {/* Button */}
                                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
                                        <a href="/thome"><button className="btn btn-warning">Back to Dashboard</button></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskAdd