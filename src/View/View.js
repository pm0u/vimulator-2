import Vim from '../vim'

const View = {
    genHTML(lessonNum = 0) {
        let lesson = this.lessons[lessonNum]
        let spanPreLineNo = '<span class="line-no">'
        let spanPre = '<span class="mode-normal-cursor">'
        let spanPost = '</span>'
        let newText = []
        for (let i in lesson.lessonText) {
            if (i == lesson.cRow) {
                newText.push(`${lesson.lessonText[lesson.cRow].substring(0,lesson.cCol)}${spanPre}${lesson.lessonText[lesson.cRow].charAt(lesson.cCol)}${spanPost}${lesson.lessonText[lesson.cRow].substring(lesson.cCol+1)}`)
            } else {
                newText.push(lesson.lessonText[i])
            }
        }
        this.addLineNos(newText)
        return newText.join('<br>')
    },

    promptForSave() {
        vim.removePopUp()
        let promptHTML = document.createElement('div')
        promptHTML.className = 'pop-up-contents'

        let promptTitle = document.createElement('h3')
        promptTitle.innerText = 'Please enter a name to save progress'

        let saveForm = document.createElement('form')
        saveForm.id = 'saveForm'
        saveForm.addEventListener('submit', this.saveToStorage)

        let userTextBox = document.createElement('input')
        userTextBox.className = 'subtle-textbox'
        userTextBox.type = 'text'
        userTextBox.name = 'username'
        userTextBox.id = 'user-name'
        userTextBox.pattern = '\\w{3,}'
        userTextBox.title = 'Must be at least 3 characters. Combination of letters, numbers, and underscores.'
        userTextBox.placeholder = '<username>'

        let submitBtn = document.createElement('input')
        submitBtn.className = 'subtle-btn'
        submitBtn.type = 'submit'
        submitBtn.value = 'save'

        let cancelBtn = document.createElement('input')
        cancelBtn.className = 'subtle-btn'
        cancelBtn.type = 'button'
        cancelBtn.value = 'cancel'
        cancelBtn.addEventListener('click', unit1.initLesson)

        saveForm.appendChild(userTextBox)
        saveForm.appendChild(submitBtn)
        saveForm.appendChild(cancelBtn)

        promptHTML.appendChild(promptTitle)
        promptHTML.appendChild(saveForm)

        this.popUp(promptHTML)
    },
    promptForUpdate() {
        this.removePopUp()
        let vimStorage = window.localStorage
        let promptHTML = document.createElement('div')
        promptHTML.className = 'pop-up-contents'

        let promptTitle = document.createElement('h3')
        promptTitle.innerText = 'Please choose a save to load'

        let loadForm = document.createElement('form')
        loadForm.id = 'loadForm'
        loadForm.addEventListener('submit', this.updateFromStorage)

        let submitBtn = document.createElement('input')
        submitBtn.className = 'subtle-btn'
        submitBtn.type = 'submit'
        submitBtn.value = 'load'

        let cancelBtn = document.createElement('input')
        cancelBtn.className = 'subtle-btn'
        cancelBtn.type = 'button'
        cancelBtn.value = 'cancel'
        cancelBtn.addEventListener('click', unit1.initLesson)

        let userSelect = document.createElement('select')
        userSelect.id = 'user-select'
        userSelect.className = 'subtle-drop'

        for (let i in vimStorage) {
            if (typeof vimStorage[i] === 'string') {
                let newOpt = document.createElement('option')
                newOpt.value = i
                newOpt.innerText = i
                userSelect.appendChild(newOpt)
            }
        }

        loadForm.appendChild(userSelect)
        loadForm.appendChild(submitBtn)
        loadForm.appendChild(cancelBtn)

        promptHTML.appendChild(promptTitle)
        promptHTML.appendChild(loadForm)

        this.popUp(promptHTML)

    },
    writeToTextArea(html) {
        let vimText = document.getElementById('vim-text')
        vimText.innerHTML = html
    },
    updateCursorPosDisplay(row, col) {
        let posDiv = document.getElementById('pos-div')
        posDiv.innerText = `${row+1},${col+1}`
    },
    setHints() {
        let hintsDiv = document.getElementById('hints-content')
        hintsDiv.innerHTML = unit1.lessons[this.currLesson].hints
    },
    finishNotice() {
        finishElement = document.createElement('div')
        finishElement.className = 'pop-up-contents'
        finishElement.innerHTML = '<h3>Lesson Complete!</h3><p>great job! press <span class=\'emph\'>r</span> to restart this lesson or <span class=\'emph\'>enter</span> to start the next lesson</p>'
        this.popUp(finishElement)
        this.finishKeyListenerActive = true
        document.addEventListener('keypress', unit1.finishNoticeKeyListener)
    },
    popUp(element) {
        let popUpDiv = document.createElement('div')
        let vimContent = document.getElementById('vim-content')
        let vimBox = document.getElementById('vim-box')
        let vimText = document.getElementById('vim-text')
        vimContent.className = 'blur'
        popUpDiv.className = 'pop-up-div'
        popUpDiv.id = 'pop-up-div'
        popUpDiv.appendChild(element)
        vimBox.appendChild(popUpDiv)
        if (vimText.innerText.match('.+')) {
            unit1.lessons[this.currLesson].killKeys()
        }
    },
    removePopUp() {
        let vimContent = document.getElementById('vim-content')
        let vimText = document.getElementById('vim-text')
        let vimBox = document.getElementById('vim-box')
        if (document.contains(document.getElementById('pop-up-div'))) {
            let finishDiv = document.getElementById('pop-up-div')
            finishDiv.parentNode.removeChild(finishDiv)
        }
        if (vimContent.classList.contains('blur')) {
            vimContent.classList.remove('blur')
        }
    },
    addLineNos(text) {
        let spanPre = '<span class="line-no">'
        let spanPost = '</span>'
        let lineNosDiv = document.getElementById('line-nos')
        let newText = []

        for (let i = 0; i < text.length; i++) {
            newText.push(`${spanPre}${i+1}${spanPost}`)
        }
        lineNosDiv.innerHTML = newText.join('<br>')
    }
}

export default View