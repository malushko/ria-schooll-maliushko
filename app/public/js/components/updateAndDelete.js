/**
 * Created by vadim on 05.02.17.
 */
module.exports = function () {
    /**
     *
     *update user!!!
     *
     */


    /**
     * Update
     * @param url /users/userID
     * @param data
     * @returns {Promise}
     */
    function updateInDbUser(url, data) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', url, true);
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
     * Delete function
     * @param url users/userID
     * @returns {Promise}
     */
    function deleteInDbUser(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', url, true);
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
            xhr.send();
        })
    }



    // event update!!!
    function Menu(elem) {
        elem.onclick = function (e) {
            let self = e.target;
            if(self.className == 'user-update') {
                console.log("update!!!");
                self.parentElement.parentElement.lastElementChild.previousElementSibling.style = "display:none";
                self.parentElement.parentElement.lastElementChild.style = "display:block";
            }
            else if (self.className == 'btn btn-primary'){
                let data = self.previousElementSibling.lastElementChild.value;

                let userId = self.parentElement.parentElement.parentElement.children[0].innerHTML;
                userId = (Number(userId) - 1).toString();

                self.parentElement.parentElement.parentElement.children[1].innerHTML = data;
                self.parentElement.parentElement.style = "display:none";
                self.parentElement.parentElement.previousElementSibling.style = "display:block";

                updateInDbUser(`/users/${userId}`, data)
                    .then(
                        error => console.log(error),
                        responseFromDb => {
                            console.log(responseFromDb);
                        }
                    );
            }
            else if(self.className == 'user-delete'){
                let userId = self.parentElement.parentElement.children[0].innerHTML;
                userId = (Number(userId) - 1).toString();
                self.parentElement.parentElement.children[1].innerHTML = "DELETE";
                for(let i = 0; i < 2; i++){
                    self.parentElement.parentElement.lastElementChild.remove();
                }
                deleteInDbUser(`/users/${userId}`)
                    .then(
                        error => console.log(error),
                        responseFromDb => {
                            console.log(responseFromDb);
                        }
                    );
            }
        }
    }
    let eventObject = new Menu(tbodyUser);
};