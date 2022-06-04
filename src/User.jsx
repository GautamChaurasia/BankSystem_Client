import { Share } from "./Share";
import { useContext } from "react";
// import { Link } from "react-router-dom";

const User = (props) => {

    const ulist = props.data
    const {setulist, setsel} = useContext(Share)

    const select = (e)=>{
        const data = e.target.value
        const [email, name] = data.split(',',2)
        // console.log(email, name)
        setulist(false)
        setsel({email, name})
    }

    const disp = (list) => {
        try{
                if(list.length === 0){
                    return <h4>No User Found</h4>
                }
                
                return(
                    list.map((usr)=>(
                        <div key={usr._id}>
                            <br/><button style={{'marginLeft':'25px', 'width':'170px'}} className='btn btn-warning' value={[usr.email,usr.name]} onClick={select}>{usr.name}</button>
                        </div>
                    ))
                )
        }catch(e){
            console.log('Search Error')
        }
    }

    return (
        <>
            {disp(ulist)}
        </>
    );
}
 
export default User;