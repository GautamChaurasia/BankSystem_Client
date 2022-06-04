import { useState } from "react"
import { useHistory } from "react-router-dom"
// import { Share } from "./Share"

const Login = () => {

    const history = useHistory()
    // const {setvalue} = useContext(Share)

    const [email, setemail] = useState('')
    const [pwd, setpwd] = useState('')
    const [stat, setstat] = useState(null)

    const capval = (e) => {
        setemail(e.target.value)
    }
    const cappwd = (e) => {
        setpwd(e.target.value)
    }

    const getData = async (e) =>{
        e.preventDefault()
        const data = {email:email, pwd:pwd}
        const res = await fetch(`https://bank-server-gsc.herokuapp.com/login`, {
                method:'POST',
                credentials: 'include',
                headers:{'Content-Type':'application/JSON'},
                body:JSON.stringify(data)
            })
        setstat(await res.text())
        // setvalue(1)
        if(res.status === 200){
            setTimeout( ()=> history.push('/'), 1000)
        }
        else{
            setTimeout( ()=> history.push('/'), 1000)
        }
    }

    return (
        <>
            <div className="cen"><h1 style={{color:'#9e8b1e'}}>Log In</h1></div>
            {!stat && <form onSubmit={getData}>
                <label className='form-label'>ID: </label>
                <input className="form-control" type='text' required value={email} onChange={capval} /><br/><br/>
                <label className='form-label'>Password: </label>
                <input className="form-control" type='password' required value={pwd} onChange={cappwd} />{' '}<br/><br/>
                <button className='btn btn-primary' type='submit'>Log In</button>
            </form>}
            {stat && <h4 className='mgn'>{stat}</h4>}
        </>
    );
}

export default Login;