function topics(data) {
  const topic = data.names;
  if (topic.length) {
    if (topic) {
      return topic.slice(0, 4);
    }
  } else {
    return ["No tags"]
  }
}

export default topics;
