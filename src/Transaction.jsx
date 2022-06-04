import { Share } from "./Share";
import { useHistory } from "react-router";
import { useContext, useState, useEffect } from "react";
import User from "./User";

const Transaction = () => {

    const {shusr, ulist, setulist, sel, setsel} = useContext(Share)
    // console.log(shusr)
    const [name, setname] = useState('')
    const [stat, setstat] = useState('')
    const [amt, setamt] = useState('')
    const [cpbal, setcpbal] = useState('')
    // const [col, setcol] = useState('')
    // const [disp, setdisp] = useState(null)

    const history = useHistory()
    useEffect(()=>{
        if(!shusr){
            history.push('/home')
        }else{
            setcpbal(shusr.bal)
        }
        // eslint-disable-next-line
    },[])

    const set  = (e) => {
        setname(e.target.value)
    }

    const capamt  = (e) => {
        setamt(e.target.value)
    }

    const reset  = () => {
        setsel(false)
        setname('')
        setstat(null)
    }

    const transfer = async (e)=> {
        e.preventDefault()
        const res = await fetch('https://bank-server-gsc.herokuapp.com/transfer', {
            method:'POST',
            headers:{'Content-Type':'application/JSON'},
            body:JSON.stringify({to:sel.email, from:shusr['email'], amt})
        })
        // console.log({to:sel, from:shusr['email'], amt})
        setcpbal(cpbal-amt)
        setstat(await res.text())
    }

    const findusr = async ()=> {
        setsel(false)
        setstat(false)
        setamt(false)
        const res = await fetch('https://bank-server-gsc.herokuapp.com/search', {
            method:'POST',
            headers:{'Content-Type':'application/JSON'},
            body:JSON.stringify({name})
        })

        const data = await res.json()
        const list = data.filter((usr)=>usr.name!==shusr.name)

        setulist(list)
    }

    return ( 
        <div className="mgn">
            {shusr && <div className="tpl"><h2>Transfer money</h2>
            {cpbal && <p className='form-label' style={{'marginTop':'50px'}}>From: <b><i>{shusr.name}</i></b> (Cur. Bal. <i><b>Rs.{cpbal}</b></i>)</p>}
            <p style={{display:"inline", 'marginLeft':'20px'}}>To:</p>{' '}
            {!sel && <><input style={{display:'inline'}} className="form-control" type='text' value={name} onChange={set} />{' '}
            <button style={{'marginLeft': '5px'}} className="btn btn-outline-dark" onClick={findusr}>Search</button></>}
            {sel && <><b><i>{sel.name} </i></b><button style={{'marginLeft': '15px'}} className='btn btn-outline-danger' onClick={reset}>Remove</button></>}
            {ulist && <><h6 style={{'marginTop':'30px'}}>Search Results:</h6><User data = {ulist} cmp = {shusr.name} /></>}<br/><br/>
            {!stat && <>{sel && <form style={{'marginLeft':'0px'}} onSubmit={transfer}>
                <label>Enter Amount: </label>
                <br/><input style={{'display':'inline'}} className="form-control" type='number' value={amt} max={parseInt(shusr.bal)} min='1' onChange={capamt} />{' '}
                <button style={{'marginLeft': '5px'}} className="btn btn-warning" type='submit'>Transfer</button>
            </form>}</>}
            {stat && <h4 style={{'color':'#39a84a'}}>{stat}</h4>}</div>}
        </div>
    );
}
 
export default Transaction;