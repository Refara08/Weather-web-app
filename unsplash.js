class Unsplash {
  constructor() {
    this.keyID = "elITr_R-bfpEoILUdbt69-j0ja338Udx1i98_FrDKQI";
  }

  async getRandomIMG(object) {
    const responseIMG = await fetch(
      `https://api.unsplash.com/photos/random/?query=${object} building&orientation=landscape&per_page=1&client_id=${this.keyID}`
    );

    const IMG = await responseIMG.json();

    return {
      IMG,
    };
  }
}
