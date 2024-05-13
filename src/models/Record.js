import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"

export const RECORD_TYPES = { NEW: "new", UPDATE: "update", DELETE: "delete" };
export const RECORD_ONS = { INVENTORY: "inventory", PROFILE: "profile" };

export function Record(recordType, recordOn, forID, forName, byName, byID, record, loggedOn = Date.now(), ){

  let m = {
    recordType: '',
    recordOn: '',
    forID: '',
    forName: '',
    byName: '',
    byID: '',
    record: {},
    getAsData: function (){},
    loggedOn: '',
  }

  if(typeof recordType === "object"){
    recordOn = recordType.recordOn;
    forID = recordType.forID;
    forName = recordType.forName;
    byName = recordType.byName;
    byID = recordType.byID;
    record = recordType.record;
    loggedOn = recordType.loggedOn? recordType.loggedOn : Date.now();

    recordType = recordType.recordType;
  }

  m.recordType = recordType ? recordType : '';
  m.recordOn = recordOn ? recordOn : '';
  m.forID = forID ? forID : '';
  m.forName = forName ? forName : '';
  m.byName = byName ? byName : '';
  m.byID = byID ? byID : '';
  m.record = record ? record : {};
  m.loggedOn = loggedOn ? loggedOn : Date.now();


  m.getAsData = function(){
    const dataItem = {
      recordType: m.recordType,
      recordOn: m.recordOn,
      forID: m.forID,
      forName: m.forName,
      byName: m.byName,
      byID: m.byID,
      record: m.record,
      loggedOn: m.loggedOn,
    }
    return dataItem;
  }


  return m;

}
export default { Record, RECORD_TYPES, RECORD_ONS };
