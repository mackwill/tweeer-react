export const chrono = function (tweetDate) {
  let result = "";

  const diffInSeconds = new Date() - new Date(tweetDate);
  if (diffInSeconds / (60 * 60 * 24 * 356 * 1000) >= 1) {
    result = `${Math.floor(
      diffInSeconds / (60 * 60 * 24 * 365 * 1000)
    )} years ago`;
  } else if (diffInSeconds / (60 * 60 * 24 * 30 * 1000) >= 1) {
    result = `${Math.floor(
      diffInSeconds / (60 * 60 * 24 * 30 * 1000)
    )} months ago`;
  } else if (diffInSeconds / (60 * 60 * 24 * 30 * 1000) >= 1) {
    result = `${Math.floor(diffInSeconds / (60 * 60 * 24 * 1000))} days ago`;
  } else if (diffInSeconds / (60 * 60 * 1000) >= 1) {
    result = `${Math.floor(diffInSeconds / (60 * 60 * 1000))} hours ago`;
  } else if (diffInSeconds / (60 * 1000) >= 1) {
    result = `${Math.floor(diffInSeconds / (60 * 1000))} minutes ago`;
  } else {
    result = `a few seconds ago`;
  }
  return result;
};

export const findDaysAgo = (tweetDate) => {
  const today = new Date();
  return chrono(today - new Date(tweetDate));
};
