class Unsplash {
  constructor() {
    this.keyID = "elITr_R-bfpEoILUdbt69-j0ja338Udx1i98_FrDKQI";
  }

  async getRandomIMG(object) {
    const responseIMG = await fetch(
      `https://api.unsplash.com/search/photos?query=${object}&orientation=landscape&page=1&client_id=${this.keyID}`
      // `https://api.unsplash.com/search/photos?query=serang&orientation=landscape&page=1&client_id=elITr_R-bfpEoILUdbt69-j0ja338Udx1i98_FrDKQI`
      //https://api.unsplash.com/search/photos?page=1&query=office
    );

    const IMG = await responseIMG.json();

    return {
      IMG,
    };
  }
}
