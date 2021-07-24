//Script that allows us to play with wall and interact with an other Internet Computer services from inside the game
import { Actor,HttpAgent } from "@dfinity/agent";
import {idlFactory as wall_idl , canisterId as wall_id} from "../wall/counter"


const agent = new HttpAgent();
const wall = Actor.createActor(wall_idl, {agent , canisterId : wall_id})



function playWithWall() {
    const inputWall = document.getElementById("inputWall") as HTMLDivElement
    const inputWallBtn = document.getElementById('btnWall') as HTMLButtonElement
    const inputText = document.getElementById("textWall") as HTMLInputElement

    inputWall.style.display = 'block'

    console.log(inputWallBtn)
    console.log(inputWall)



    
    const handleClick = async () => {
        if (inputText.value === "") {
            alert('Your message is empty')
        }
        const message = inputText.value;
        const data = await wall.addMessage("Game", message)
        console.log(data)
        return;
        
    }

    inputWallBtn.addEventListener("click", handleClick)
}



    

export {playWithWall}