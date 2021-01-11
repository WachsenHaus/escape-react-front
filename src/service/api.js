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
  async getResNumber(branchName, thema, mDate, mTime) {
    try {
      const response = await this.escape.get("reservation/res_number.do", {
        params: {
          bname: branchName,
          thema: thema,
          resdate: mDate,
          time: mTime,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async setReservation(resname, resdate, time, bname, thema, phone, cost, personal) {
    try {
      //resname:$scope.resname,
      //resdate:$scope.date,
      //time:$scope.time,
      //bname:$scope.bname,
      //thema:$scope.thema,
      //phone:$scope.phone,
      //cost:$scope.cost,
      //personal:$scope.personal

      const response = await this.escape.get("reservation/res_process.do", {
        params: {
          resname: resname,
          resdate: resdate,
          time: time,
          bname: bname,
          thema: thema,
          phone: phone,
          cost: cost,
          personal: personal,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Escape;
