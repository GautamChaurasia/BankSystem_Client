import { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { Share } from "./Share"

const Home = () => {

  const history = useHistory()
  const [user, setuser] = useState('')
  const {setvalue, value, setshusr, setulist} = useContext(Share)
  // const [loginstat, setloginstat] = useState('')

  const fetch_dets = async () => {
    try{
        const res = await fetch(`https://bank-server-gsc.herokuapp.com/home`, {
            method:'GET',
            credentials: 'include',
            headers:{
              Accept: "application/JSON",
              'Content-Type':'application/JSON'},
        })

        if(res.status !== 200){
          throw new Error(res.error)
        }

        const usr = await res.json()

        setvalue(true)
        setshusr(usr)
        setuser(usr)

    }catch(e){
      // console.log(e)
      // history.push('/login')
    }
  }

  useEffect(() => {
    fetch_dets()
    setulist(false)
    // eslint-disable-next-line
  }, [])

  return(
      <div style={{'marginTop':'30px'}} className="mgn">
        {!value && <><b><h2 style={{'color':'#376dc4'}}>Welcome to our bank</h2></b><h5><i style={{'color':'#37b864'}}>Login</i> to continue !</h5></>}
        {value && 
        <><br/><h4> Welcome, <i style={{color:'#3c5cc7'}}>{user.name}</i></h4>
        <p>Your current balance is <b>Rs. {user.bal}</b></p><br/>
        <center><button className='rnd' onClick={()=>history.push('./transaction')}>Transfer Funds</button></center></>}
      </div>
    )
  }
  
  export default Home