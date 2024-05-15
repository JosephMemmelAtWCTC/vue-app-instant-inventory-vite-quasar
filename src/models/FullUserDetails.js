import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import { accounts } from "/src/models/Firebase.js";
function FullUserDetails(firebaseUser){
  let m = {
    email: '',
    uid: '',
    image: '',
    role: '',
    lastLogin: '',
  }

  if(firebaseUser){
    m.email = firebaseUser.email ? firebaseUser.email : '';
    m.uid = firebaseUser.uid ? firebaseUser.uid : '';
  }

  return m;
}

export default FullUserDetails;
