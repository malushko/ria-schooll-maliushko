/**
 * Created by vadim on 04.02.17.
 */

module.exports = function () {
    function ready() {
        alert("I am runing!");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/users', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                // обработать ошибку
                alert(xhr.status + ':' + xhr.statusText);
            } else {
                // вывести результат
                let responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                for(let key in responseData){
                    userId = Number(key) + 1;
                    if(responseData[key] == null){
                        alert("i have Null");
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
            }
        }

    }

    document.addEventListener("DOMContentLoaded", ready);
};


