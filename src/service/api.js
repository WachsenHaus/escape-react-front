import axios from "axios";

class Escape {
  constructor() {
    this.escape = axios.create({
      // baseURL: "http://localhost:8888/",
      baseURL: "http://escape-react.wachsenhaus.com/",
    });
  }
  async tryLogin(id, pwd) {
    try {
      let form = new FormData();
      form.append("aid", id);
      form.append("apwd", pwd);

      const response = await this.escape.post("login/login_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
  }
  async tryLogout() {
    try {
      const response = await this.escape.get("login/logout_AJAX.do");
      return response;
    } catch (error) {
      return false;
    }
  }
  async getNoticeList(branch, pageNum) {
    try {
      const response = await this.escape.get("notice/list.do", {
        params: {
          branch: branch,
          pageNum: pageNum,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async getNoticePageNumber(branch, pageNum) {
    try {
      const response = await this.escape.get("notice/ajax_listpage.do", {
        params: {
          branch: branch,
          pageNum: pageNum,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async getNoticePageList(pageNum) {
    try {
      const response = await this.escape.get("notice/ajax_list.do", {
        params: {
          pageNum: pageNum,
        },
      });

      return response;
    } catch (error) {
      return false;
    }
  }

  async updateNoticeContent(pageNum) {
    try {
      let form = new FormData();
      form.append("num", pageNum);

      const response = await this.escape.post("/notice/update_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
  }
  async updateNoticeBoard(num, title, content) {
    try {
      let form = new FormData();
      form.append("num", num);
      form.append("title", title);
      form.append("content", content);

      const response = await this.escape.post("notice/doUpdate_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
  }
  async getReviewPageNumber(pageNum) {
    try {
      const response = await this.escape.get("review/ajax_listpage.do", {
        params: {
          pageNum: pageNum,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }

  //페이지네이션
  async getReviewPageCondition(condition, keyword) {
    try {
      const response = await this.escape.get("review/ajax_listpage.do", {
        params: {
          condition: condition,
          keyword: keyword,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async getReviewPageList(pageNum) {
    try {
      const response = await this.escape.get("review/ajax_list.do", {
        params: {
          pageNum: pageNum,
        },
      });

      return response;
    } catch (error) {
      return false;
    }
  }
  //리스트 얻기
  async getReviewSearchPageList(pageNum, condition, keyword) {
    try {
      const response = await this.escape.get("review/ajax_list.do", {
        params: {
          pageNum: pageNum,
          condition: condition,
          keyword: keyword,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async sendNotice(branch, writer, title, content) {
    try {
      let form = new FormData();
      form.append("branch", branch);
      form.append("writer", writer);
      form.append("title", title);
      form.append("content", content);

      const response = await this.escape.post("notice/insert_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
  }
  async sendBoard(writer, pwd, title, content) {
    try {
      let form = new FormData();
      form.append("writer", writer);
      form.append("pwd", pwd);
      form.append("title", title);
      form.append("content", content);

      const response = await this.escape.post("review/insert_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
  }
  async updateBoard(num, writer, pwd, title, content) {
    try {
      let form = new FormData();
      form.append("num", num);
      form.append("writer", writer);
      form.append("pwd", pwd);
      form.append("title", title);
      form.append("content", content);

      const response = await this.escape.post("review/private/doUpdate_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
  }
  async getReviewBoardContent(num) {
    try {
      const response = await this.escape.get("review/review-detail_AJAX.do", {
        params: {
          num: num,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async getNoticeBoardContent(num) {
    try {
      const response = await this.escape.get("notice/detail_AJAX.do", {
        params: {
          num: num,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async deleteReviewContent(num, pwd) {
    try {
      const response = await this.escape.get("/review/private/delete_AJAX.do", {
        params: {
          num: num,
          pwd: pwd,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async updateReviewContent(num, pwd) {
    try {
      let form = new FormData();
      form.append("num", num);
      form.append("pwd", pwd);
      const response = await this.escape.post("/review/private/update_AJAX.do", form);
      return response;
    } catch (error) {
      return false;
    }
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
      return false;
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
      return false;
    }
  }
  async getReservationStat(res_name, phone, res_no) {
    try {
      const response = await this.escape.get("confirm/confirmApi.do", {
        params: {
          res_name: res_name,
          phone: phone,
          res_no: res_no,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async deleteReservation(res_name, phone, res_no) {
    try {
      const response = await this.escape.get("confirm/deleteApi.do", {
        params: {
          res_name: res_name,
          phone: phone,
          res_no: res_no,
        },
      });
      return response;
    } catch (error) {
      return false;
    }
  }
  async setReservation(resname, resdate, time, bname, thema, phone, cost, personal) {
    try {
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
      return false;
    }
  }
}

export default Escape;
