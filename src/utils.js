export default function formatDuration(duration = 0, display = false) {
  var hrs = parseInt(duration / 3600, 10);
  duration -= hrs * 3600;
  var mins = parseInt(duration / 60, 10);
  var secs = duration - mins * 60;
  return display
    ? (hrs > 0 ? hrs + " hrs " : "") +
        (mins > 0 ? mins + " mins " : "") +
        (secs > 0 ? secs + " secs" : "")
    : leftPad(hrs) + ":" + leftPad(mins) + ":" + leftPad(secs);
}

function leftPad(n) {
  return ("0" + n).slice(-2);
}

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    "Client-Key": "M@n@g3rQ#!z"
  }
};

//const baseUrl = "http://localhost:2001/api/v1/quiz/mgr/quiz-manager/";

const baseUrl =
  "https://testapp-gw.fcmb.com/quiz-service/api/v1/quiz/mgr/quiz-manager";

export { baseUrl, requestOptions, formatDuration };
