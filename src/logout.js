
import axios from "axios";
import Cookies from "js-cookie";
export const Logout=()=>{
    const mail=Cookies.get('token');
    let check={};
    if(mail===undefined){
        console.log("user not exists");
        check={token:9};

     }
     else{
    const formdata={email:mail}
    console.log(formdata);
    axios.post('https://speechtranscript.onrender.com/logout',formdata).then((response)=>{
        
            Cookies.remove('token');

        


    });}
    return (
        <div>
            {check &&(
            <div>
              { check.token===9? (<p class="text-red-500">user not exists</p>):(<p class="text-red-500"> logged out successfully</p>)}
            </div>


            )

            }
            
            
    </div>
              


        

    );

  

}