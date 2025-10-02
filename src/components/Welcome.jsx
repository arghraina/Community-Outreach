import styles from "../CSS/Welcome.module.css";
import { useNavigate , Link, replace } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const handleOnClick1 = ()=>{
    navigate("/login" );
  }
  const handleOnClick2 = ()=>{
    navigate("/signup");
  }
  return (
    <>
      <div className={styles.class1}>
        <p className={styles.para1}>
          This is a platform envisioned to help the vendors who don't get full
          recognition from the tourists.
        </p>

        <p style={{color : "black"}}>
          Already Have an account?{" "}
          <button onClick={handleOnClick1}>Click to login</button>
        </p>

        <p style={{color : "black"}}> 
            create a new one...{" "}
            <button onClick={handleOnClick2}>SignUp</button>
        </p>
      </div>
    </>
  );
};

export default Welcome;
