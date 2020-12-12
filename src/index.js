// this function will authenticate user
function authentication(){
  let username = getFieldValueById('username');
  
  //hide the warning message if there's any
  hideShowElement('hide','warningMessage')

  if(checkIfString(username)){
    var user = addUser(username);
    if(typeof(user.password) === "undefined" || user.password == "") {
      setLocalValue('username', username)
      window.location.href = "home.html";
    } else if(user.password == null){
      hideShowPopup('show', 'addPassword');
    } else if(user.password != null && user.password != ""){
      hideShowPopup('show', 'checkPassword');
    } else {
      throwError("Not authorized to access.")
    }
    return false;
  } else {
    innerHtml('warningMessage', "Username must be string");
    hideShowElement('show','warningMessage');
    return false;
  }
}

function addPassword(){
  let username = getFieldValueById('username');
  let password = getFieldValueById('password');
  if(password == null){
    password = "";
  }
  let users = JSON.parse(getLocalValue('users'));
  if(users.length > 0){
    users.forEach((user, i) => {
      if(user.username == username){
        if(user.password == password && (password != null || password != "")){
          window.location.href = "home.html";
        } else {
          users[i].password = password;
        }
      }
    });
    setLocalValue("users", JSON.stringify(users));
    setLocalValue('username', username)
    window.location.href = "home.html";
  } else {
    throwError("Invalid user data.");
    return false;
  }
}

function checkPassword(){
  let users = JSON.parse(getLocalValue('users'));
  let username = getFieldValueById('username');
  let password = getFieldValueById('chkpassword');

  if(users.length > 0){
    users.forEach((user, i) => {
      console.log(user, username, password)
      if(user.username == username && user.password == password){
        setLocalValue('username', username)
        window.location.href = "home.html";
      } else {
        throwError("Invalid password.");
      }
    });
  } else {
    throwError("Invalid user data.");
    return false;
  }
}