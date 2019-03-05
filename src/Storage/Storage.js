const Storage = {
    saveToStorage(event) {
        event.preventDefault()
        let userTextBox = document.getElementById('user-name')
        let userName = userTextBox.value
        let vimStorage = window.localStorage
        vimStorage.setItem(userName, JSON.stringify(unit1))
        unit1.removePopUp()
    },
    updateFromStorage(event) {
        event.preventDefault()
        let userSelect = document.getElementById('user-select')
        let userSelectVal = userSelect.value
        let vimStorage = window.localStorage
        let unitRetrieved = JSON.parse(vimStorage[userSelectVal])
        unit1.recursiveUpdater(unit1, unitRetrieved)
        unit1.initLesson()
    }
}

export default Storage