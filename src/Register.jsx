import { useState} from "react"
import { useHistory } from "react-router-dom"

const Register = () =>{

    const history = useHistory()
    const [email, setemail] = useState('')
    const [pwd, setpwd] = useState('')
    const [name, setname] = useState('')
    const [stat, setstat] = useState()

    const capval = (e) => {
        setemail(e.target.value)
    }
    const cappwd = (e) => {
        setpwd(e.target.value)
    }
    const capname = (e) => {
        setname(e.target.value)
    }

    const postData = (e) =>{
        e.preventDefault()
        const data = {name:name, email:email, pwd:pwd}
        fetch('https://bank-server-gsc.herokuapp.com/register', {
            method:'POST',
            headers:{'Content-Type':'application/JSON'},
            body:JSON.stringify(data)
        }).then( res => res.text()
        ).then( disp => {
            setstat(disp)
            setTimeout( ()=> history.push('/login'), 1500)
        })
    }

    return(
        <>
            <div className="cen"><h1 style={{color:"#349432"}}>Register</h1></div>
            {!stat && <form onSubmit={postData}>
                <label className='form-label'>Full Name: </label>
                <input className="form-control" type='text' value={name} onChange={capname} /><br/><br/>
                <label className='form-label'>ID (Provided by Bank): </label>
                <input className="form-control" type='text' value={email} onChange={capval} /><br/><br/>
                <label className='form-label'>Set Password: </label>
                <input className="form-control" type='text' value={pwd} onChange={cappwd} />{' '}<br/><br/>
                <button className='btn btn-primary' type='submit'>Sign Up</button>
            </form>}
            {stat && <h4>Registered Successfully</h4>}
        </>
    )
}

export default Register