import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import { accounts } from "/src/models/Firebase.js";
function Notification(record){
  let m = {
    message: '',
  }

  if(record){
    m.message = record.message ? record.message : '';
  }

  return m;
}

export default Notification;
