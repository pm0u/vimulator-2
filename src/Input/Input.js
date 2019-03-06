const Input = {
    finishNoticeKeyListener: (event) => {
        switch (event.key) {
            case 'Enter':
                unit1.nextLesson()
                break
            case 'r':
                unit1.resetLesson()
                break
        }
    },
    cursorMover: (key) => {
        // this needs to be refactored to separate concerns
        // between vim.js and this
        // only handle directing keys to appropriate mode file
        // mode file calls appropriate vim function
        // vim function modifies state & triggers re-render if necessary
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
    }
}

export default Input