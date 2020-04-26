function getPageNumberAndCategory(filePath) {
  switch (true) {
    case /^tags\//.test(filePath):
      return { pageNumber: 1, categoryName: filePath.split("/")[1] };
    case /^\d+$/.test(filePath):
      return { pageNumber: filePath, categoryName: "all" };

    default:
      return { pageNumber: 1, categoryName: "all" };
  }
}

export default getPageNumberAndCategory;
