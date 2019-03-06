const LessonMgr = {
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
}

export default LessonMgr