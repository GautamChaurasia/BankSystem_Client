import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Share } from "./Share";

const Logout = () => {
    
    const history = useHistory()
    const {setvalue, value} = useContext(Share)
    const logout = async () => {
        try{
            const res = await fetch('https://bank-server-gsc.herokuapp.com/logout', {
                method:'GET',
                credentials: 'include',
                headers:{'Content-Type':'application/JSON'},
            })

            if(res.status !== 200){
                throw new Error('Server Error')
            }
            setvalue(null)

        }catch(e){
            console.log(e+'\nLogOut Failed.')
        }
    }

    useEffect(() => {
        if(value){
            logout()
        }
        history.push('/login')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {value && <h4>Logging Out...</h4>}
        </>
    );
}
 
export default Logout;