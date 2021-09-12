
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
      difficulties: [],
      sources: [],
      topis: [],
      subtopics: [],
      event: '',
    }
  )
}


export default converter;


