import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import { accounts } from "/src/models/Firebase.js";
function Notification(notification){
  let m = {
    image: '',
    warningLevel: '',
  }

  if(notification){
    m.image = notification.image ? notification.image : '';
  }

  return m;
}

export default Notification;
