/**
 * Created by vadim on 03.02.17.
 */
/**
 * Created by vadim on 03.02.17.
 */

module.exports = function () {

    /**
     *
     * Add new User!!!!
     *
     *
     */


    /**
     *
     * @param url /users
     * @param data write user
     * @returns {Promise}
     */
    function addOnDbNewUser(url, data) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if(this.status > 250){
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }else{
                    let responseFromDb = this.statusText;
                    resolve(responseFromDb);
                }
            };
            xhr.send(JSON.stringify({name: data}));
        })
    }

    /**
     * after user add "ДОБАВИТЬ"
     */
    function addNewElement() {
        let usserId = document.getElementsByClassName("tbody-user")[0].lastElementChild;
        let data = document.getElementById('name').value;
        if (!usserId) {
            usserId = 1;
        }
        else {
            usserId = Number(document.getElementsByClassName("tbody-user")[0].lastElementChild.firstElementChild.innerHTML) + 1;
        }
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${usserId}</td><td>${data}</td><td>
                                     <a class="user-delete" href="#delete">Удалить</a> | <a class="user-update" href="#update">Изменить</a></td>
                               <td style="display: none" class="form-update-none"><form class="form-inline" onsubmit="return false"><div class="form-group">
                                 <label for="updateName" class="sr-only">Имя</label>
                                <input class="form-control" type="text" id="updateName"></div>&nbsp;
                                 <button type="submit" class="btn btn-primary">Изменить</button></form></td>`;
        document.getElementsByClassName("tbody-user")[0].appendChild(tr);
//
// POST REQUEST
//
        addOnDbNewUser('/users', data)
            .then(
                 responseFromDb => console.log(responseFromDb),
                 error => {
                     let tr = document.createElement('tr');
                     tr.innerHTML = `<h2>${error}</h2>`;
                });
    }

    // even add new user
    addUser.addEventListener("click", addNewElement);

};



