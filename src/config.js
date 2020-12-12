// common function to get value of field by id
function getFieldValueById(fieldId){
    return document.getElementById(fieldId).value;
}

function setFieldValueById(fieldId, value){
    return document.getElementById(fieldId).value = value;
}

//common function to put html inside html element
function innerHtml(tag, html){
    document.getElementById(tag).innerHTML = html;
}

//hide/show html element by id
function hideShowElement(action, id){
    if(action == 'show'){
        document.getElementById(id).style.display = "block";
    }
    if(action == 'hide'){
        document.getElementById(id).style.display = "none";
    }
}

//hide/show popup
function hideShowPopup(action, id){
    if(action == 'show'){
        document.getElementById(id).style.display = "block";
    }
    if(action == 'hide'){
        document.getElementById(id).style.display = "none";
    }
}


//check if username is string or not
function checkIfString(username){
    return /^[a-z]+$/i.test(username);
}

//set value to localstorage
function setLocalValue(name, value){
    localStorage.setItem(name, value);
}
//get value from localstorage
function getLocalValue(name){
    return localStorage.getItem(name)
}

//remove localhostorage
function deleteLocalValue(name){
    localStorage.removeItem(name);
}

//common error messages
function throwError(error){
    alert(error)
}

function addUser(username){
    let users = getLocalValue('users');
    if(users == null){
        let usersLocalStorage = [];
        let userData = {username: username, password: null};
        usersLocalStorage.push(userData);
        setLocalValue("users",JSON.stringify(usersLocalStorage));
        return userData;
    } else {
        users = JSON.parse(users);
        let userMatched;
        if(users.length > 0){
            users.forEach((user) => {
                if(user.username == username){
                    userMatched = user;
                }
            });
            if(typeof(userMatched) == "undefined"){
                let userData = {username: username, password: null};
                users.unshift(userData);
                if(users.length > 3){
                    let removedUser = users.pop();
                    removeItems(removedUser.username)
                }
                setLocalValue("users",JSON.stringify(users));
                return userData;
            } else {
                return userMatched;
            }
        } else {
            throwError("Invalid data.");
        }
    }
}

//remove all user's item
function removeItems(username){
    let items = getLocalValue('items');
    items = JSON.parse(items);
    if(items.length > 0){
      items.forEach((item, i) => {
        if(item.username == username){
          items.splice(i, 1);
        }
      });
      if(items.length == 0){
        deleteLocalValue('items');
      } else {
        setLocalValue("items", JSON.stringify(items));
      }
    }
  }