//Script that allows us to play with wall and interact with an other Internet Computer services from inside the game
import { Actor,HttpAgent } from "@dfinity/agent";
import { showInputText } from "../../scenes/UI/InputText";
import {idlFactory as wall_idl , canisterId as wall_id} from "../wall/counter"


const agent = new HttpAgent();
const wall = Actor.createActor(wall_idl, {agent , canisterId : wall_id})



function playWithWall() {

   const yesNo = window.document.querySelector(".yesNo") as HTMLDivElement
   const btnYes = window.document.querySelector(".btnYes") as HTMLButtonElement
   const btnNo = window.document.querySelector(".btnNo") as HTMLButtonElement

   function handleNo () {
       console.log("NO")
       yesNo.style.display = 'none'
       return;
   }

   function handleYes() {
       console.log('Yes')
       showInputText()
       
       return;
   }

   btnYes?.addEventListener('click', handleYes)
   btnNo?.addEventListener('click', handleNo)
   console.log(btnYes)
   console.log(btnNo)
}



    

export {playWithWall}