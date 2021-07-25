const showInputTextWithMessage = function (message:string) {

    const yesNo = window.document.querySelector('.yesNo') as HTMLDivElement
    const defaultZone = window.document.querySelector('.default') as HTMLDivElement
    const inputText = window.document.querySelector('.inputText') as HTMLDivElement
    const titleZone = window.document.querySelector('#titleZone') as HTMLElement

    titleZone.innerText = message;
    // inputText.innerText = ""
    //Test if the buttons are still listening to events before display none
    yesNo.style.display = "none"
    defaultZone.style.display = "none"
    inputText.style.display = "flex"

    return;
}

export {showInputTextWithMessage}