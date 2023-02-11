function editSlug(title) {
  let output = "";
  for (let i = 0; i < title.length; i++) {
    if (title[i] === " " ||title[i] === "?" || title[i] === "_" ) {
      output += "_";
    } else {
      output += title[i];
    }
  }
  return output;
}

module.exports = editSlug;
