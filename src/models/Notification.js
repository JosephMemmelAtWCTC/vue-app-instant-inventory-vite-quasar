import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import { accounts } from "/src/models/Firebase.js";
import {STORAGE_TYPES} from "src/models/InventoryItem";
export function Notification(title, level, docId, numInStock, reorderLevel, lastUpdated, image){
  let m = {
    image: '',
    level: '',
    docId: '',
    title: '',
    numInStock: '',
    reorderLevel: '',
    lastUpdated: '',
    getAsData: function (){
    }
  }



  if(typeof title === "object"){
    level = title.level
    docId = title.docId
    title = title.title
    numInStock = title.numInStock
    reorderLevel = title.reorderLevel
    lastUpdated = title.lastUpdated
    image = title.image
  }

  m.level = level ? level : '';
  m.docId = docId ? docId : '';
  m.title = title ? title : '';
  m.numInStock = numInStock ? numInStock : '';
  m.reorderLevel = reorderLevel ? reorderLevel : '';
  m.lastUpdated = lastUpdated ? lastUpdated : '';
  m.image = image ? image : '';


  m.getAsData = function(){
    const dataItem = {
      level: m.level,
      docId: m.docId,
      title: m.title,
      numInStock: m.numInStock,
      reorderLevel: m.reorderLevel,
      lastUpdated: m.lastUpdated,
      image: m.image,
    }
    return dataItem;
  }


  return m;

}
export default Notification;
