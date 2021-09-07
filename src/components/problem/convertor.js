
const converter = ({
  difficultyLevel,
  appropriateGrades,
  name,
  problem,
  selectedTags,
  selectedSubtags,
  selectedEvents,
  selectedSource
}) => {

  const tags = [];
  const sub_tags = [];
  const events = [];

  for (var id in selectedTags) {
    if (selectedTags[id]) {
      tags.push(id);
    }
  }
  for (var id in selectedSubtags) {
    if (selectedSubtags[id]) {
      sub_tags.push(id)
    }
  }
  for (var id in selectedEvents) {
    if (selectedEvents[id]) {
      events.push(id);
    }
  }

  return (
    {
      hardness: {
        id: null,
        level: difficultyLevel,
        appropriate_grades_min: appropriateGrades[0],
        appropriate_grades_max: appropriateGrades[1],
      },
      answers: [
      ],
      name,
      verification_status: "w",
      verification_comment: "",
      text: problem,
      source: selectedSource,
      tags,
      sub_tags,
      events,
      comments: [],
    }
  )
}


export default converter;


