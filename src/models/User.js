import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import { accounts } from "/src/models/Firebase.js";
function FullUserDetails(firebaseUser){
  let m = {
    email: '',
    uid: '',
    image: '',
    role: '',
  }

  if(firebaseUser){
    m.email = firebaseUser.email ? firebaseUser.email : '';
    m.uid = firebaseUser.uid ? firebaseUser.uid : '';
    accounts.doc(m.uid).get()
      .then((supplementalAccountDoc) => {
        const supplementalData = supplementalAccountDoc.data();
        m.image = supplementalData.image ?? null;
        m.role =supplementalData.role ?? null;
      })
  }

  return m;
}

export default FullUserDetails;
