function starIssueForkCountEtc(data) {
  const star = data.stargazers_count;
  const issue = data.open_issues_count;
  const fork = data.forks_count;
  const name = data.name;
  const description = data?.description || "No description";
  const web = data.html_url;
  const license = data.license?.spdx_id || "";
  const language = data.language;
  const sample = `${web}/blob/master/README.md`;

  const object = {
    "star": star,
    "issue": issue,
    "fork": fork,
    "name": name,
    "description": description === "No description" ? description : description.substring(0, 95),
    "web": web,
    "license": license,
    "language": language,
    "sample": sample
  }
  return object;
}

export default starIssueForkCountEtc;
