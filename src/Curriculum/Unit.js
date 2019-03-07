import Lesson from './Lesson.js'

class Unit {
    constructor(unit, currLesson = 0) {
        this.name = unit.name
        this.lessons = this.makeLessons(unit.lessons)
        this.currLessonNum = currLesson
        this.currLesson = this.lessons[this.currLessonNum]
        this.lessonListMaker = this.lessonListMaker.bind(this)
    }
    lessonListMaker = () => {
        const unit = this
        const detail = document.createElement('details')
        const summary = document.createElement('summary')
        const lessonList = document.createElement('ul')

        lessonList.id = 'lesson-list'
        summary.innerText = unit.name
        detail.appendChild(summary)
        detail.open = true

        unit.lessons.forEach(lesson => {
            let lessonLi = document.createElement('li')
            let lessonLink = document.createElement('a')
            lessonLink.href = '#'
            lessonLink.id = lesson.id
            lessonLink.target = '_self'
            lessonLink.innerText = lesson.name
            lessonLi.appendChild(lessonLink)
            lessonList.appendChild(lessonLi)
        })
        detail.appendChild(lessonList)
        return detail
    }
    makeLessons(lessons) {
        let lessonList = []
        for (let lesson of lessons) {
            lessonList.push(new Lesson(lesson))
        }
        return lessonList
    }
}

export default Unit