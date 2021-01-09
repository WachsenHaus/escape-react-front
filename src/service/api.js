import axios from "axios";

class Escape {
  constructor() {
    this.escape = axios.create({
      baseURL: "http://localhost:8888/escape/",
    });
  }

  async getReservation(branchName, thema, mDate) {
    try {
      const response = await this.escape.get("reservation/reservation_ajax.do", {
        params: {
          name: branchName,
          thema: thema,
          date: mDate,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Escape;
