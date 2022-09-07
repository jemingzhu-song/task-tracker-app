const TaskStatus = Object.freeze({
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE',
  IN_PROGRESS: 'IN_PROGRESS',
});

const TaskDescription = Object.freeze({
  DEFAULT: 'To Do',
});

module.exports = {
  TaskStatus: TaskStatus,
  TaskDescription: TaskDescription,
};
