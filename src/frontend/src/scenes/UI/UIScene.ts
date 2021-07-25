// import Phaser from "phaser";
// import SettingsMenu from "../../components/SettingsMenu";

// export default class UIScene extends Phaser.Scene {


//     private settingsMenu!: SettingsMenu

//     constructor() {
//         super('ui')
//     }
//     create() {

//         this.settingsMenu= new SettingsMenu(this)

//         const {width} = this.scale

//         const settingsButton = this.add.image (width-10 ,10 , 'smallbutton').setOrigin(1,0)
//         this.add.image(settingsButton.x - settingsButton.width * 0.5 + 1, 28, 'quest').setScale(0.15)

//         settingsButton.setInteractive()
//             .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
//                 console.log("over")
//                 settingsButton.setTint(0xdedede)
//             })
//             .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
//                 settingsButton.setTint(0xffffff)
//             })
//             .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
//                 settingsButton.setTint(0x8afbff)
//             })
//             .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
//                 settingsButton.setTint(0xffffff)
//                 //toggle modal
//             })
//     }

// }