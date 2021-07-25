const showYesNo = function () {
    const yesNo = window.document.querySelector('.yesNo') as HTMLDivElement

    

    const inputText = document.querySelector('.inputText') as HTMLDivElement


    //Test if the buttons are still listening to events before display none
    yesNo.style.display = "none"
    inputText.style.display = "block"

    return;
}

export {showYesNo}