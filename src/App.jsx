import { useState ,useEffect, useCallback,useRef} from 'react'
import './App.css'

function App() {

  const[length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[character,setCharacter]=useState(false);
  const[password,setPassword]=useState("")
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass="";
    let str="ABCDEFGHIJKLMLOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) str += "0123456789";
    if(character) str += "~!@#$%^&*(){}[]?/";

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length +1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  },[length,number,character,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,character]);

  return (
    <div class="root">
      <h1>Password Generator</h1>

      <div class="child">
        <input 
          class="input" 
          type="text"
          value={password}
          readOnly
          ref = {passwordRef}
        />
        <button class="copy" onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div>
        
        <div class="effect">
          <input
            class="change"
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length({length})</label>
        </div>
        
        <div class="effect">
          <input
            class="change"
            defaultChecked={number}
            type="checkbox"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
        
        <div class="effect">
          <input
            class="change"
            defaultChecked={character}
            type="checkbox"
            onChange={() => setCharacter((prev) => !prev)}
          />
          <label>Characters</label>
        </div>

      </div>

    </div>
  )
}

export default App
