//Script that allows us to play with wall and interact with an other Internet Computer services from inside the game
import { Actor,HttpAgent } from "@dfinity/agent";

import { showYesNo } from "../../scenes/UI/YesNo";
import {idlFactory as wall_idl , canisterId as wall_id} from "../wall/counter"

import { showInputTextWithMessage } from "../../scenes/UI/InputTextWithMessage";

import showMessage from "../../scenes/UI/Message";


const agentOptions = {
    host: "http://localhost:8000" 
}
const agent = new HttpAgent(agentOptions);
const wall = Actor.createActor(wall_idl, {agent , canisterId : wall_id})
console.log(wall)

function playWithWall(scene : Phaser.Scene) {

  

   const titleZone = window.document.querySelector('#titleZone') as HTMLTitleElement
   titleZone.style.display = "block"
   titleZone.innerText = "The Wall 🪧"
   const yesNo = window.document.querySelector(".yesNo") as HTMLDivElement
   const btnYes = window.document.querySelector(".btnYes") as HTMLButtonElement
   const btnNo = window.document.querySelector(".btnNo") as HTMLButtonElement
   showYesNo()

   function handleNo () {
       
       console.log("No")
       yesNo.style.display = 'none'
       return;
   }

   function handleYes() {

        
       scene.game.input.keyboard.removeCapture(32);
       scene.game.input.keyboard.stopListeners()

       btnYes.removeEventListener('click', handleYes)
       btnNo.removeEventListener('click', handleNo)

       showInputTextWithMessage("Write a message for the posterity")

      

       const submitMessage = () => {
           const inputText = window.document.querySelector("textarea") as HTMLTextAreaElement
           console.log(inputText?.value)
           if (inputText.value === "") {
               alert("You must enter a message!")
           }
           else {
               const message = inputText.value
               showInputTextWithMessage("Sign with your pseudo")
               btnOk.removeEventListener('click', submitMessage)

                const submitPseudo = () => {
                    const inputText = window.document.querySelector("textarea") as HTMLTextAreaElement
                    if (inputText.value === "") {
                        alert("You must enter a pseudo!")
                    }
                    else {
                        btnOk.removeEventListener('click', submitPseudo)
                        const pseudo = inputText.value
                        wall.addMessage(pseudo, message)
                        showMessage("Thanks for making history, you can check your message here")
                        scene.game.input.keyboard.addCapture(32)
                        scene.game.input.keyboard.startListeners()
                    }
                
                }
               btnOk.addEventListener('click', submitPseudo)
           }
       }
       const btnOk = window.document.querySelector('.btnOk') as HTMLButtonElement
       console.log(btnOk)
       btnOk.addEventListener('click', submitMessage)
       return;
   }

   btnYes?.addEventListener('click', handleYes)
   btnNo?.addEventListener('click', handleNo)
   console.log(btnYes)
   console.log(btnNo)
}

export {playWithWall}