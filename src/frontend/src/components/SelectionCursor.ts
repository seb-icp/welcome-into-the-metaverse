// @ts-ignore
import Phaser from "phaser";
import {IComponent, IComponentsService} from "../services/ComponentService"

import DataPeople from "./DataPeople";
import DialogBox from "./DialogBox";
import { playWithWall } from "../ICservices/game/wall";



export default class SelectionCursor implements IComponent {
    
    private readonly cursors! : Phaser.Types.Input.Keyboard.CursorKeys
    private readonly distance : number
    private readonly pnjs : Phaser.Physics.Arcade.StaticGroup
    private readonly character : Phaser.GameObjects.GameObject

    private selector!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    private gameObject! : Phaser.GameObjects.Shape
    private components !: IComponentsService 
    private dialog : DialogBox | undefined

    private sceneName : string //Temporary solution
    private securityScene : 0 | 1 //Solution for multiples scenes creation
   
  

    constructor(cursors : Phaser.Types.Input.Keyboard.CursorKeys, pnjs : Phaser.Physics.Arcade.StaticGroup, character : Phaser.GameObjects.GameObject , distance = 8, sceneName :string) {
        this.cursors = cursors
        this.pnjs = pnjs
        this.distance = distance
        this.character = character
        this.sceneName = sceneName
        this.securityScene = 0
        
    }

    init(go : Phaser.GameObjects.GameObject, components : IComponentsService) {
        this.gameObject =  go as Phaser.GameObjects.Shape
        this.components = components
        this.dialog = this.components.findComponent(this.character,DialogBox)
    }
    
    awake () {

        const {scene} = this.gameObject

        const box = scene.add.rectangle(0,0,16,16,0xffffff,0)
        scene.physics.add.existing(box)
       
        this.selector = box as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        scene.physics.add.overlap(this.selector, this.pnjs.getChildren() , this.handleOverlap, undefined , this)
    }

    update() {
        const {x , y} = this.gameObject

        if (this.cursors.left.isDown) {

            this.selector.setPosition(x - this.distance , y)
        }
        else if  (this.cursors.right.isDown) {
            this.selector.setPosition(x + this.distance , y)
        }
        else if (this.cursors.up.isDown) {
            this.selector.setPosition(x , y - this.distance)
        }
        else if (this.cursors.down.isDown) {
            this.selector.setPosition(x , y + this.distance)
        }
    
    }

    private handleOverlap (_obj1 : Phaser.GameObjects.GameObject, pnj : Phaser.GameObjects.GameObject) {
       
        if (!this.cursors.space.isDown)
		{
			return;
		}

        

      if (this.dialog === undefined) {
          console.log("problem...")
          return;
      }
      if (this.dialog.isDialogBoxVisible()) {
          console.log('already talking to someone')
          return; //Means we are alredy talking to someone
          
        }

    
        const data = this.components.findComponent(pnj, DataPeople)
     
        let text : string = '....'
        //This is fucked but will fix that later

        if (this.sceneName === 'city') {
                text = `Hello my name is ${data.name}! ${data.message}`
            if (data.name === 'santa') {
                let date = new Date()
                let year = date.getFullYear()
                if (year === 2029) {
                    text = "Oh Oh Oh it's the day 🎁 : 235655551"
                } else {
                    text = "Do you want some ICP ?"
                }
            }
            if (data.name === "secretGhost") {
                text = "Oh you found me! 👻 I can give you my secret : 0251158944"

            }
            if (data.name === 'ghostCity') {
                const {scene} = this.gameObject
                scene.cameras.main.fadeOut(1000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (_cam : any, _effect : any) => {
                    if (this.securityScene === 0) {
                        this.securityScene =1
                        scene.time.delayedCall(1000, () => {
                            scene.scene.start('school')
                            this.securityScene = 0
                        })
                    }
                })
                return;
            }
        }

        else if (this.sceneName === 'school') {
            if (data.name === 'girl') {
                text = `${data.message}`
                this.dialog!._toggleWindow() 
                this.dialog!.setText(text, true)
                return;
            }
            if (data.name === 'locker') {
                const date = new Date()
                const year = date.getFullYear()
                if (year >= 2029) {
                    text = "Oh! There is a paper : 195678910"
                } else {
                    text = `${data.message}`
                }
            }

            if (data.name === 'ghost') {
                text = `${data.message}`
                this.dialog!._toggleWindow() 
                this.dialog!.setText(text, true)
                pnj.destroy()
                
                //@ts-ignore
                window.ghostInSchool = true
                return;
            }

            if(data.name === 'ghost2'|| data.name === 'ghost3' || data.name === 'ghost4') { //To move from school to city scene
                const {scene} = this.gameObject
                scene.cameras.main.fadeOut(1000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (_cam : any, _effect : any) => {
                    if (this.securityScene ===0) {
                        this.securityScene = 1
                        scene.time.delayedCall(1000, () => {
                            scene.scene.start('city')
                        })
                    }
        
                })
                return;
            }
            if (data.name === 'wall') {
                const {scene} = this.gameObject
                console.log('Wall')
                text = `${data.message}`
                this.dialog!._toggleWindow() 
                this.dialog!.setText(text, true)
                playWithWall(scene)
                
                return;

            }
            
            if(data.name === 'item') {
                text = data.message
            }
            if (data.name === 'gameInTheGame') {

                //Add some dialog to let choice

                const {scene} = this.gameObject
                function createElementFromHTML(htmlString : string) {
                    var div = document.createElement('div');
                    div.innerHTML = htmlString.trim();
            
                    return div; 
                }
                scene.scene.pause()

                const div = createElementFromHTML(`<div class="wrap"><iframe  src="https://cieun-eiaaa-aaaad-qak6a-cai.raw.ic0.app/"/tool/"></iframe></div>`)
                const buttonStop = createElementFromHTML(`<button class="buttonStop"> Wait  📀  </button>`)
                const otherdiv = document.querySelector('#game') as HTMLDivElement

                otherdiv?.appendChild(div)
                otherdiv?.appendChild(buttonStop)

                setTimeout(() => {
                    const btnStop = document.querySelector('.buttonStop') as HTMLButtonElement
                    btnStop.innerText = "Quit 🚦"

                    const quitGame = () => {
                        const gameDiv = document.querySelector('.wrap')
                        gameDiv?.remove()
                        btnStop.remove()
                        scene.scene.resume()
                    }
                    btnStop.addEventListener('click', quitGame)
                },7000)
                return;
            }

            else {
                text = data.message
            }
        }

        else {
            text = 'Hmm this is strange, probably a bug you shouldnt be here'
        }
        
    
        this.dialog!._toggleWindow() 
        this.dialog!.setText(text, true)

    }
}
