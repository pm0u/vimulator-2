class Lesson {
    constructor({
        id,
        name,
        finishCond,
        lessonText,
        hints
    }) {
        this.id = id
        this.name = name
        this.finishCond = finishCond
        this.lessonText = lessonText,
            this.hints = hints
    }
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
    }
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
    }
    initLesson() {
        if (this.finishKeyListenerActive) {
            document.removeEventListener('keypress', unit1.finishNoticeKeyListener)
        }
        unit1.removePopUp()
        unit1.lessons[unit1.currLesson].initKeys()
        unit1.writeToTextArea(unit1.genHTML(unit1.currLesson))
        unit1.updateCursorPosDisplay(unit1.lessons[unit1.currLesson].cRow, unit1.lessons[unit1.currLesson].cCol)
        unit1.setHints()
    }
    resetLesson(lessonNum = this.currLesson) {
        let currLessonForProps = this.lessons[lessonNum]
        let startState = currLessonForProps.changes[0]
        for (let i in startState) {
            currLessonForProps[i] = startState[i]
        }
        this.initLesson()
    }
}

export default Lesson