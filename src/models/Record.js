import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"

export const RECORD_TYPES = { NEW: "new", UPDATE: "update", DELETE: "delete" };
export const RECORD_ONS = { INVENTORY: "inventory", PROFILE: "profile" };

export function Record(recordType, recordOn, forID, forName, byName, byID, record){

  let m = {
    recordType: '',
    recordOn: '',
    forID: '',
    forName: '',
    byName: '',
    byID: '',
    record: {},
    getAsData: function (){},
    logged: Date.now(),
  }

  if(typeof title === "object"){
    // docId = title.docId;
    // numInStock = title.numInStock;
    // reorderLevel = title.reorderLevel;
    // lastUpdated = title.lastUpdated;
    // image = title.image;
    //
    // title = title.title;
  }

  m.recordType = m.recordType = recordType ? recordType : '';
  m.recordOn = m.recordOn = recordOn ? recordOn : '';
  m.forID = m.forID = forID ? forID : '';
  m.forName = m.forName = forName ? forName : '';
  m.byName = m.byName = byName ? byName : '';
  m.byID = m.byID = byID ? byID : '';
  m.record = m.record = record ? record : {};


  m.getAsData = function(){
    const dataItem = {
      recordType: m.recordType,
      recordOn: m.recordOn,
      forID: m.forID,
      forName: m.forName,
      byName: m.byName,
      byID: m.byID,
      record: m.record,
    }
    return dataItem;
  }


  return m;

}
export default { Record, RECORD_TYPES, RECORD_ONS };
