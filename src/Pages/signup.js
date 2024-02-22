import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../firebase";

export default function Signup(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setchecked] = useState(false);
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(userName, checked);
        postUser(email, password).then((res) => {
            console.log(res);
            navigate("/", {state : {
                email : email, 
                name : userName,
            }});
        });
    }

    return (
    <div className = "bg-primary min-vh-100 d-flex justify-content-center align-items-center">
        <div className="rounded-4 bg-light p-5">
            <div className = "d-flex justify-content-center ">
                <h4>Create Account</h4>
            </div>
            <form>
            <div class="form-group mt-3">
                <label for="name">Name</label>
                <input onChange={(e)=>setUserName(e.target.value)} type="text" class="form-control" id="name" placeholder="Name"/>
            </div>
            <div class="form-group mt-3">
                <label for="email">Email address</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" id="email"  placeholder="Enter email"/>
            </div>
            <div class="form-group mt-3">
                <label for="password">Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-group mt-3">
                <input id="remember" type="checkbox"/> 
                <label onChange={(e)=>setchecked(e.target.value)} for="remember" className="ms-2">Remember me</label>
            </div>
            <div className="d-grid gap-2">
                <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary mt-5">Submit</button>
            </div>
            </form> 
            <div className="rederict mt-3 d-flex justify-content-center">
                Already have an account <Link className = "ms-2" to={"/signin"}> Login</Link>
            </div>
        </div>   
    </div>
    )
}