// beginning refactor of vim engine to separate from lessons.
// as I dig into this.. wondering if things should be separated further

// Vim engine -- specifically vim related functionality and state management of
//  vim object..
//    would this even involve drawing to the window area?
//    perhaps this would just involve tracking data, etc

// keytracker -- this would listen for keypresses and issue commands to vim
//  engine
//    engage keys from lesson
//    handle key events
//    pass to specific methods of vim engine
//    remove initkeys/killkeys from units!!
//    cursormove as well, not in VIM obj

// displayer -- would render information to window based on info from vim engine
//    queries current lesson, cursor position, etc to draw window
//    any decisions about how to display happen here

const vim = {
  currLesson: false,
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
  recursiveUpdater(object, storageObj) {
    // used to update lesson state from local storage
    // updates keys in object only if they exist in storageObj
    // use to update unit.lessons[x] with unit.changes[x]
    let newObj = object
    for (let i in storageObj) {
      if (typeof storageObj[i] === 'object' || typeof storageObj[i] === 'array') {
        newObj[i] = this.recursiveUpdater(newObj[i], storageObj[i])
      } else {
        newObj[i] = storageObj[i]
      }
    }
    return newObj
  },
  finisher() {
    //checks finish conditions against current lesson state (deep comparison)
    // uses code very similar to recursiveUpdater(), could perhaps be condensed
    // or combined?
    let currLessonForProps = this.lessons[this.currLesson]
    let currFinishCond = currLessonForProps.finishCond
    for (let i in currFinishCond) {
      if ((typeof currFinishCond[i] === 'array' || typeof currFinishCond[i] === 'object') && (typeof currLessonForProps[i] !== 'array' || typeof currLessonForProps[i] !== 'object')) {
        if (!currFinishCond[i].includes(currLessonForProps[i])) {
          return false
        }
      } else {
        if (currFinishCond[i] !== currLessonForProps[i]) {
          return false
        }
      }
    }
    currLessonForProps.finished = true
    this.lessons[this.currLesson].killKeys()
    return true
  },
  saveToStorage(event) {
    event.preventDefault()
    let userTextBox = document.getElementById('user-name')
    let userName = userTextBox.value
    let vimStorage = window.localStorage
    vimStorage.setItem(userName, JSON.stringify(unit1))
    unit1.removePopUp()
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
  updateFromStorage(event) {
    event.preventDefault()
    let userSelect = document.getElementById('user-select')
    let userSelectVal = userSelect.value
    let vimStorage = window.localStorage
    let unitRetrieved = JSON.parse(vimStorage[userSelectVal])
    unit1.recursiveUpdater(unit1, unitRetrieved)
    unit1.initLesson()
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
  finishKeyListenerActive: false,
  cursorMove(key) {
    let activeLesson = unit1.lessons[this.currLesson]
    this.cursorMover(key)
    this.writeToTextArea(this.genHTML(this.currLesson))
    this.updateCursorPosDisplay(activeLesson.cRow, activeLesson.cCol)
    if (this.finisher()) {
      this.finishNotice()
    }
  },
  cursorMover(key) {
    let activeLesson = unit1.lessons[this.currLesson]
    switch (key) {
      case 'l':
        (activeLesson.cCol >= activeLesson.lessonText[activeLesson.cRow].length - 1) || activeLesson.cCol++
        activeLesson.furthestCol = activeLesson.cCol
        break
      case 'h':
        (activeLesson.cCol <= 0) || activeLesson.cCol--;
        activeLesson.furthestCol = activeLesson.cCol
        break
      case 'j':
        (activeLesson.cRow >= activeLesson.lessonText.length - 1) || activeLesson.cRow++
        if (activeLesson.furthestCol <= activeLesson.lessonText[activeLesson.cRow].length - 1) {
          activeLesson.cCol = activeLesson.furthestCol
        } else {
          activeLesson.cCol = activeLesson.lessonText[activeLesson.cRow].length - 1
        }
        break
      case 'k':
        (activeLesson.cRow === 0) || activeLesson.cRow--
        if (activeLesson.furthestCol <= activeLesson.lessonText[activeLesson.cRow].length - 1) {
          activeLesson.cCol = activeLesson.furthestCol
        } else {
          activeLesson.cCol = activeLesson.lessonText[activeLesson.cRow].length - 1
        }
        break
      case '$':
        activeLesson.cCol = activeLesson.lessonText[activeLesson.cRow].length - 1
        activeLesson.furthestCol = activeLesson.cCol
        break
      case '0':
        activeLesson.cCol = 0
        activeLesson.furthestCol = activeLesson.cCol
        break
      case '^':
        activeLesson.cCol = unit1.findFirstNonEmpty(activeLesson)
        activeLesson.furthestCol = activeLesson.cCol
        break
      case 'w':
        break
      case 'W':
        break
      case 'b':
        break
      case 'B':
        break
      case 'e':
        break
      case 'E':
        break

    }
  },
  findFirstNonEmpty(lesson) {
    let currLine = lesson.lessonText[lesson.cRow]
    return currLine.search(/\S/)

  },
  initLesson() {
    if (this.finishKeyListenerActive) {
      document.removeEventListener('keypress', unit1.finishNoticeKeyListener)
    }
    unit1.removePopUp()
    unit1.lessons[unit1.currLesson].initKeys()
    unit1.writeToTextArea(unit1.genHTML(unit1.currLesson))
    unit1.updateCursorPosDisplay(unit1.lessons[unit1.currLesson].cRow, unit1.lessons[unit1.currLesson].cCol)
    unit1.setHints()
  },
  changeCurrLesson(lessonNum) {
    this.currLesson = lessonNum
  },
  changeLesson(lessonNum) {
    let activeLesson = unit1.lessons[this.currLesson]
    activeLesson.killKeys()
    this.changeCurrLesson(lessonNum)
    this.initLesson()
  },
  nextLesson() {
    console.log(!!unit1.lessons[unit1.currLesson + 1])
    if (!!unit1.lessons[unit1.currLesson + 1]) {
      unit1.changeLesson(unit1.currLesson + 1)
    } else {
      unit1.initLesson()
    }
  },
  writeToTextArea(html) {
    let vimText = document.getElementById('vim-text')
    vimText.innerHTML = html
  },
  resetLesson(lessonNum = this.currLesson) {
    let currLessonForProps = this.lessons[lessonNum]
    let startState = currLessonForProps.changes[0]
    for (let i in startState) {
      currLessonForProps[i] = startState[i]
    }
    this.initLesson()
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
  finishNoticeKeyListener(event) {
    switch (event.key) {
      case 'Enter':
        unit1.nextLesson()
        break
      case 'r':
        unit1.resetLesson()
        break
    }
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

export default vim