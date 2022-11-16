import { useEffect, useState, useRef} from 'react';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register  = () =>{
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userValid, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [pwdMatchValid, setPwdMatchValid] = useState(false);
    const [pwdMatchFocus, setPwdMatchFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        console.log(userRef.current);
        userRef.current.focus();
    }, []);

    useEffect(() =>{
        setValidUser(USER_REGEX.test(user));
        console.log(userValid);
    }, [user]);

    useEffect(()=>{
        setPwdValid(PWD_REGEX.test(pwd));
        setPwdMatchValid(pwd == pwdMatch);
    }, [pwd, pwdMatch]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, pwdMatch])
     
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const userName = USER_REGEX.test(user);
        const pass = PWD_REGEX.test(pwd);

        if(!userName || !pass) {
            setErrMsg("Invalid Entry");
            return;
        }

        try{
            const response = await axios.post(REGISTER_URL, JSON.stringify({user,pwd}),{
                headers:{'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setPwd('');
            setPwdMatch('');

        }catch(err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
        

    }
    return (
     <>
      {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) :(
      <section>
        <h1> Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">userName: </label>
            <input  type="text" id="username" required  ref={userRef}
              autoComplete="off" onChange={(e)=> setUser(e.target.value)} value={user}
              aria-invalid={userValid ? "false" : "true"} 
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)} />
              { userFocus &&  user && !userValid ?
            <p id="uidnote" className={userFocus &&  user && !userValid ? "instructions" : "offscreen"}>
                         
                 4 to 24 characters.<br />
                 Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p> : null
            }
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" required onChange={(e)=> setPwd(e.target.value)}
              value={pwd} aria-invalid={pwdValid ? "false" : "true"} 
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              />

            <p id="pwdnote" className={pwdFocus && ! pwdValid ? "instructions" : "offscreen"}>
                            
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
 
            <label htmlFor="pass-confirm">confirm password</label>
            <input type="password" id="pass-confirm" required onChange={(e)=> setPwdMatch(e.target.value)} 
             value={pwdMatch} aria-invalid={pwdMatchValid ? "false" : "true"} 
             onFocus={() => setPwdMatchFocus(true)}
             onBlur={() => setPwdMatchFocus(false)}/>
            
            <p id="confirmnote" className={pwdMatchFocus && !pwdMatchValid ? "instructions" : "offscreen"}>
                Must match the first password input field.
            </p>
            <button> Sign Up</button>
        </form>
        <p> Already registered?<br />
            <span className="line">
                 {/*put router link here*/}
                    <a href="#">Sign In</a>
            </span>
        </p>
      </section>)
     }
     </>
    );

  

}

export default Register