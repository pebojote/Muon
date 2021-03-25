function downloadCount(data) {
  if (data.length) {
    const downloadArray = data[0].assets;
    const downloadLength = downloadArray.length;
    const downloadNumber = [];
    if (downloadLength) {
      for (let i = 0, l = downloadLength; i <= l; i++) {
        const count = downloadArray[i]?.download_count || 0;
        downloadNumber.push(count);
        if (downloadNumber.length > 2) {
          downloadNumber.reduce((prev, next) => prev + next);
        }
      }
    } else {
      downloadNumber.push(0);
    }
    return downloadNumber[0];
  } else {
    return 0;
  }
}

export default downloadCount;
