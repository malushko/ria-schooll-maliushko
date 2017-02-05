/**
 * Created by vadim on 05.02.17.
 */
module.exports = function () {

    function Menu(elem) {
        elem.onclick = function (e) {
            let self = e.target;
            if (self.className == 'user-delete') {
                let userId = self.parentElement.parentElement.children[0].innerHTML;
                userId = (Number(userId) - 1).toString();
                alert(userId);
                self.parentElement.parentElement.children[1].innerHTML = "DELETE";
                for(let i = 0; i < 2; i++){
                    self.parentElement.parentElement.lastElementChild.remove();
                }
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', `/users/${userId}`, true);
                xhr.send();
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





