const unit1 = {
  name: 'Movement',
  lessons: [{
      id: '1.1',
      name: 'Basic Movement',
      finishCond: {
        cursorPos: [0, [0, 3]]
      },
      lessonText: [
        `This is a line of text`,
        `Put the cursor on this period.`,
        `move to this line with j`,
        `and then j again to this line.`
      ],
      hints: {
        title: `Welcome to Vim`,
        text: [`The <span class="key">j</span> & <span class="key">k</span> keys act as down and up arrow keys respectively. There are a couple interesting functionalities -- the cursor column is preserved when moving from a long line past a short line to another long line. In this example, if the cursor is on the period in line 2 and you move down two lines, you will land on the period again. You'll also notice that the cursor lands on the last character of the shorter line inbetween. This makes a lot of sense when bouncing between repeated lines to edit the same details.`],
        additional: [`The <span class="key">h</span>, <span class="key">j</span>, <span class="key">k</span>, and <span class="key">l</span> keys will all work in this lesson. Try them all out! complete the lesson by moving to the first character of either the first or last line.`],
        resources: [`<a href="https://en.wikibooks.org/wiki/Learning_the_vi_Editor/Vim/Modes" target="_blank">Vim modes from Learning the Vi Editor</a>`]
      },
    },
    {
      id: `1.2`,
      name: `Start/end of line`,
      finishCond: {
        cursorPos: [0, 42]
      },
      lessonText: [
        `Move to end of this line to end the lesson.`,
        `  try a ^ and 0 on this line`,
        `and this line to see the difference`,
      ],
      hints: {
        title: `Start/end of line - ^ 0 $`,
        text: [`The <span class="key">^</span>, <span class="key">0</span>, <span class="key">$</span> move within the current line. <span class="key">0 </span> moves to the first character of the line. <span class="key">^</span> will move to the first non-empty character (useful for indented code). <span class="key">$</span> will move to the end of the current line.`],
        additional: [`The <span class="key">j</span> & <span class="key">k</span> keys will work in this lesson to change lines. Complete the lesson by moving to the last character of the first line.`],
        resources: []
      },
    },
    //  {
    //    id: '1.3',
    //    name: 'Move between words',
    //    finishCond: [],
    //    lessonText: [],
    //    hints: {
    //      title: '',
    //      text: [],
    //      additional: [],
    //      resources: []
    //    },
    //  },
    //  {
    //    id: '1.4',
    //    name: 'Jumping to characters',
    //    finishCond: [],
    //    lessonText: [],
    //    hints: {
    //      title: '',
    //      text: [],
    //      additional: [],
    //      resources: []
    //    },
    //  }
  ]
}

export {
  unit1
}