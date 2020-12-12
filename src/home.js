//check if user is logged in or not
function authentication(){
  let user = getLocalValue('username');
  if(typeof(user) === "undefined" || user == null){
    location.href = "index.html"
  } else {
    innerHtml("loggedInUsername", user);
    listItems();
  }
}

//add item to list
function addItem(){
  let itemName = getFieldValueById("itemName").trim();
  let username = getLocalValue('username');
  let items = getLocalValue('items');
  
  if(items == null){
    var newItem = [{username: username, items: [itemName]}];
    setLocalValue('items', JSON.stringify(newItem));
    return true;
  } 

  items = JSON.parse(items);
  if(items.length > 0){
    let userFound = false;
    items.forEach((item, i) => {
      if(item.username == username){
        userFound = true;
        if(items[i].items.length == 5){
          throwError("You can add only 5 items");
          return false;
        } else {
          if(items[i].items.length > 0){
            let alreadyAdded = false;
            items[i].items.forEach((eachItem) => {
              if(eachItem == itemName){
                alreadyAdded = true;
              } 
            })
            if(alreadyAdded === true){
              throwError(itemName+" already added.")
            } else {
              items[i].items.push(itemName);
            }
          } else {
            items[i].items.push(itemName);
          }
        }
      }
    });
    if(userFound === false){
      items.push({username: username, items: [itemName]});
      setLocalValue('items', JSON.stringify(items));
      listItems();
      return false;
    }
    setLocalValue('items', JSON.stringify(items));
    setFieldValueById("itemName","");
    listItems();
    return false;
  } else {
    throwError("Invalid items.")
  }
}

//load item list into table
function listItems(){
  let username = getLocalValue("username");
  let items = getLocalValue("items");
  if(items != null){
    items = JSON.parse(items);
    if(items.length > 0){
      items.forEach((item, i) => {
        if(item.username == username){
          if(item.items.length > 0){
            let html = '';
            item.items.forEach((eachItem, j) => {
              html += '<tr> \
                        <th scope="row">'+(j+1)+'</th> \
                        <td>'+eachItem+'</td> \
                        <td> \
                          <a href="javascript: void(0);" onclick="hideShowPopup(`show`, `editItem`); setFieldValueById(`updateItemName`,`'+eachItem+'`); setFieldValueById(`oldItemName`,`'+eachItem+'`);">Edit</a> || \
                          <a href="javascript: void(0);" onclick="removeItem(`'+eachItem+'`)">Delete</a> \
                        </td> \
                      </tr>';
            })
            innerHtml("allItems", html);
          } else {
            let html = '<tr> \
                        <th scope="row"></th> \
                        <td colspan="2">No Items.</td> \
                      </tr>';
            innerHtml("allItems", html)
          }
          //update remaining count
          innerHtml("remainingCount", (5-item.items.length))
        }
      });  
    } 
  }
}

//update item from list
function editItem(){
  let oldItemName = getFieldValueById("oldItemName");
  let itemName = getFieldValueById("updateItemName");
  let username = getLocalValue("username");
  let items = getLocalValue("items");
  items = JSON.parse(items);
  if(items.length > 0){
    items.forEach((item, i) => {
      if(item.username == username){
        if(item.items.length > 0){
          let indexFound = item.items.indexOf(oldItemName);
          if(indexFound != -1){
            let alreadyExists = false;
            item.items.forEach((eachItem, j) => {
              if(eachItem == itemName && indexFound != j){
                alreadyExists = true;
              }
            })
            if(alreadyExists === true){
              throwError(itemName+" already exists")
            } else {
              items[i].items[indexFound] = itemName;
              hideShowPopup("hide", "editItem")
            }
          }
        }
      }
    });
    setLocalValue('items', JSON.stringify(items));
    listItems();
  }
}

//remove item from list
function removeItem(itemName){
  if(!confirm("Are you sure you want to delete?")){
    return false;
  }
  let username = getLocalValue("username");
  let items = getLocalValue("items");
  items = JSON.parse(items);

  if(items.length > 0){
    items.forEach((item, i) => {
      if(item.username == username){
        if(item.items.length > 0){
          item.items.forEach((eachItem, j) => {
            if(eachItem == itemName){
              items[i].items.splice(j, 1);
            }
          })
        }
      }
    });
    setLocalValue('items', JSON.stringify(items));
    listItems();
  }
}

//logout user
function logout(){
  deleteLocalValue('username');
  location.href = "index.html";
}