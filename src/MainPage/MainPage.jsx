//MainPage.jsx
import { Link } from "react-router-dom";

export default function MainPage(){
    return(
        <>
        <h1>Игра memory</h1>
        
        <Link to="/game">Начать игру</Link>
        </>
    )
}