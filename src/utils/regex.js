class RegUtil {
  constructor() {
    //숫자있는 핸드폰번호
    this.phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;
    this.nonHipenPhoneRegExp = /^\d{3}\d{4}\d{4}$/;
    this.checkHangleNameRegExp = /^[가-힣]{2,4}$/;
    this.numberRegExp = /^\d/;
  }
  checkHangleName = (element) => {
    if (!this.checkHangleNameRegExp.test(element.value)) {
      return false;
    } else {
      return true;
    }
  };
  checkPhoneNumber = (element) => {
    if (!this.phoneRegExp.test(element.value)) {
      return false;
    } else {
      return true;
    }
  };
  checkNonHipenPhoneNumber = (element) => {
    if (!this.nonHipenPhoneRegExp.test(element.value)) {
      return false;
    } else {
      return true;
    }
  };
  checkDigitNumber = (element) => {
    if (!this.numberRegExp.test(element.value)) {
      return false;
    } else {
      return true;
    }
  };
}

export default RegUtil;
