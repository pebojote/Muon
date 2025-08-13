import time from '../helper/time';
import downloadCount from '../helper/download.count';
import starIssueForkCountEtc from '../helper/star.issue.fork.count';
import topics from '../helper/topic.get';

async function promising(value) {
  const arrayOriginal = [];
  if (typeof value !== 'undefined') {
    const master = await fetch(
      'https://api.github.com/repos/' + value + '/commits/master'
    );
    const masterJSON = await master.json();
    const masterDATA = time(masterJSON);

    const release = await fetch(
      'https://api.github.com/repos/' + value + '/releases'
    );
    const releaseJSON = await release.json();
    const releaseDATA = downloadCount(releaseJSON);

    const repository = await fetch('https://api.github.com/repos/' + value);
    const repositoryJSON = await repository.json();
    const repositoryDATA = starIssueForkCountEtc(repositoryJSON);

    const topic = await fetch(
      'https://api.github.com/repos/' + value + '/topics',
      {
        headers: {
          Accept: 'Accept: application/vnd.github.mercy-preview+json',
        },
      }
    );
    const topicJSON = await topic.json();
    const topicDATA = topics(topicJSON);

    arrayOriginal.push({
      date: masterDATA,
      download: releaseDATA,
      other: repositoryDATA,
      topic: topicDATA,
    });
  }
  return arrayOriginal;
}

const exploreData = async (filter) => {
  try {
    const promises = [];
    const sample = [
      'pebojote/Vacuum',
      'facebook/react',
      'd3/d3',
      'jashkenas/underscore',
      'lodash/lodash',
    ];

    for (let i = 0, l = sample.length; i < l; ++i) {
      promises.push(await promising(sample[i]));
    }
    const object = await Promise.all(promises);
    const datum = [];
    for (let j = 0, l = object.length; j < l; j++) {
      const data = {
        date: object[j][0].date,
        download: object[j][0].download.toLocaleString(),
        star: object[j][0].other.star.toLocaleString(),
        issue: object[j][0].other.issue.toLocaleString(),
        fork: object[j][0].other.fork.toLocaleString(),
        name: object[j][0].other.name,
        description: object[j][0].other.description,
        web: object[j][0].other.web,
        license: object[j][0].other.license,
        language: object[j][0].other.language,
        sample: object[j][0].other.sample,
        topic: object[j][0].topic,
      };

      datum.push(data);
    }

    if (typeof filter !== 'undefined' && filter.length) {
      console.log('filter: ', filter);
    }

    datum.sort(
      (a: any, b: any) => +new Date(a.date.old) - +new Date(b.date.old)
    );
    return datum.reverse();
  } catch (error) {
    console.log('Error: ', error.message);
    return 'offline';
  }
};

export default exploreData;
