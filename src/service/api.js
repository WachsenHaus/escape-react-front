import axios from "axios";

class Escape {
  constructor() {
    this.escape = axios.create({
      baseURL: "http://localhost:8888/escape/",
    });
  }

  async getReservation(branchName, thema, mDate) {
    const response = await this.escape.get("reservation/reservation_ajax.do", {
      params: {
        name: branchName,
        thema: thema,
        date: mDate,
      },
    });
    return response;
  }
}

export default Escape;
