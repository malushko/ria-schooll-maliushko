/**
 * Created by vadim on 03.02.17.
 */
/**
 * Created by vadim on 03.02.17.
 */

module.exports = function () {
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
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/users', true);
        data = JSON.stringify({name: data});
        alert(data);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                alert(this.status ? this.statusText : 'The request fails!!!');
            }
        }
    }

    // even add new user
    addUser.addEventListener("click", addNewElement);

}



