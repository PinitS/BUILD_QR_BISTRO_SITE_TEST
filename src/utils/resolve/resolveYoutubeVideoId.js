import _ from "lodash";

export const resolveYoutubeVideoId = ({ url }) => {
  try {
    const ytRegexList = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/];

    const result =
      _.chain(ytRegexList)
        .map((regex) => url.match(regex))
        .find((match) => _.get(match, [1]))
        .get([1])
        .value() || null;

    console.log("resolveYoutubeVideoId :>> ", result);
    return result;
  } catch {
    return null;
  }
};
