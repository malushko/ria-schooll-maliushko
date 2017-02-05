/**
 * Created by vadim on 05.02.17.
 */
module.exports = function () {
    function Menu(elem) {
        elem.onclick = function (e) {
            let self = e.target;
            // if (self.className == 'user-delete') {
            //     let userId = self.parentElement.parentElement.children[0].innerHTML;
            //     userId = (Number(userId) - 1).toString();
            //     alert(userId);
            //     self.parentElement.parentElement.children[1].innerHTML = "DELETE";
            //     for(let i = 0; i < 2; i++){
            //         self.parentElement.parentElement.lastElementChild.remove();
            //     }
            //     let xhr = new XMLHttpRequest();
            //     xhr.open('DELETE', `/users/${userId}`, true);
            //     xhr.send();
            //     xhr.onreadystatechange = function () {
            //         if (this.readyState != 4) return;
            //         if (this.status > 250) {
            //             alert(this.status ? this.statusText : 'The request fails!!!');
            //         }
            //         else alert(this.statusText);
            //     }
            // }
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
                let xhr = new XMLHttpRequest();
                xhr.open('PUT', `/users/${userId}`, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({name: data}));
                xhr.onreadystatechange = function () {
                    if (this.readyState != 4) return;
                    if (this.status > 250) {
                        alert(this.status ? this.statusText : 'The request fails!!!');
                    }
                    else alert(this.statusText);
                }
            }
        }
    }
    let eventObject = new Menu(tbodyUser);
};