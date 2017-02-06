/**
 * Created by vadim on 04.02.17.
 */


module.exports = function () {
    /**
     * get All date from DB
     *
     *
     *
     */


    /**
     * @param url /users
     * @returns {Promise}
     */
    function getForDateBase(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if(this.status > 250){
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }else{
                    let responseData = JSON.parse(xhr.responseText);
                    resolve(responseData);
                }
            };
            xhr.send();
        });
    }

    //< read DB
    function read() {
        getForDateBase('/users')
            .then(
                responseData =>  {
                    for(let key in responseData){
                        userId = Number(key) + 1;
                        if(responseData[key] == null){
                            let tr = document.createElement('tr');
                            tr.innerHTML = `<td>${userId.toString()}</td><td>DELETE</td>`;
                            document.getElementsByClassName("tbody-user")[0].appendChild(tr);
                        }
                        else {
                            let tr = document.createElement('tr');
                            tr.innerHTML = `<td>${userId.toString()}</td><td>${responseData[key].name}</td><td>
                                     <a class="user-delete" href="#delete">Удалить</a> | <a class="user-update" href="#update">Изменить</a></td>
                               <td style="display: none" class="form-update-none"><form class="form-inline" onsubmit="return false"><div class="form-group">
                                 <label for="updateName" class="sr-only">Имя</label>
                                <input class="form-control" name="updateValue" type="text" id="updateName"></div>&nbsp;
                                 <button type="button" class="btn btn-primary">Изменить</button></form></td>`;
                            document.getElementsByClassName("tbody-user")[0].appendChild(tr);
                        }
                    }
                },
                error => {
                    let tr = document.createElement('tr');
                    tr.innerHTML = `<h2>${error}</h2>`;
                }
            );
    }
    document.addEventListener("DOMContentLoaded", read);
    //>
};


