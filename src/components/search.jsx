import { useRef, useState } from "react";
import App from "../App";


// const filtered = ({checked, search}) =>{
    
// }


const Filtered = ({todo, setFiltered, setIsFilter}) =>{
    const [checking ,setChecking] = useState("ALL");
    const [search,setSearch] = useState("");


    const searchRef = useRef(null);
    
    if(checking === "ALL"){
        setIsFilter(false);
    }
    else if(checking === "T"){
        console.log("T")
    }
    else if(checking ==="F"){
        console.log("F")
    }
    if(searchRef){
        
        console.log("test");
    }


    
    return(
    <>
        <div>
            <input type="text" placeholder="search" ref={searchRef}/>
            <button>검색</button>
        </div>
        <div>

            <label htmlFor="ALL">ALL</label>
            <input type="radio" name="check" id="ALL" value="ALL"/>
            <label htmlFor="T">Checked</label>
            <input type="radio" name="check" id="T" value="T"/>
            <label htmlFor="F">UnChecked</label>
            <input type="radio" name="check" id="F" value="F"/>
        </div>
    </>
    );
}






export default Filtered;

