

function updateMaxValue() {
  const maxSelect = document.getElementById('max');
  const selectedMax = maxSelect.value;

  firebase.database().ref('settings/max').set(selectedMax);
  console.log(selectedMax)

}

document.addEventListener("DOMContentLoaded", () => {
    // Your JavaScript code here
    document.getElementById("save_j").addEventListener("click", () => {
        console.log("hello")
        let a = document.getElementById("mail_j").value.trim()

       firebase.app("judge").database().ref("users").get().then(sn => {
        let data = sn.val()
        data.push(a)
        console.log(data)
        firebase.app("judge").database().ref("users").set(data)
       })
    });
});