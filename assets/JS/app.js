var config = {
    apiKey: "AIzaSyCmwE_K_9wlBO7As3mXndUJgXWk56tKQgo",
    authDomain: "train-ff9cb.firebaseapp.com",
    databaseURL: "https://train-ff9cb.firebaseio.com",
    projectId: "train-ff9cb",
    storageBucket: "train-ff9cb.appspot.com",
    messagingSenderId: "911060336707"
  };
  moment().format();
  firebase.initializeApp(config);
  let train_data
  let date=moment(`${Date.now()}`,'x').format('YYYY-MM-DD')

  console.log(date)

  let db=firebase.firestore();
  document.addEventListener('click',({target})=>{
      if(target.className==="submit")
      {
          let name=document.querySelector(".name").value
          document.querySelector(".name").value=''
          let destination=document.querySelector(".destination").value
          document.querySelector(".destination").value=''
          let first=document.querySelector(".first").value
          document.querySelector(".first").value=''
          let freq=document.querySelector(".freq").value
          document.querySelector(".freq").value=''
          data_train={'name':name,'destination':destination,'first':first,'freq':freq}
          console.log(data_train.name)
          db.collection('trains').doc(`${data_train.name}`).set(data_train)

      }
  })
db.collection('trains').onSnapshot(({docs})=>{
    document.querySelector(".table").innerHTML=`
            <div class="col table_cell_title s3 l3">Train name</div>
            <div class="col table_cell_title s3 l3">Destination</div>
            <div class="col table_cell_title s2 l2">Frequency(min)</div>
            <div class="col table_cell_title s2 l2">Arrival time</div>
            <div class="col table_cell_title s2 l2">Minutes away</div>`
    let t=Date.now()
    db.collection('trains').get()
    .then(({docs})=>{
        docs.forEach(element => {
            let init=moment(`${date} ${element.data().first}`,'YYYY-MM-DD HH:mm').format('x')
            let cell_div=document.createElement('div')
            console.log(t)
            console.log(init)
            let res=element.data().freq-Math.floor((t-parseInt(init))/1000/60)%element.data().freq
            cell_div.innerHTML=` <div class="col table_cell_title s3 l3">${element.data().name}</div>
            <div class="col table_cell_title s3 l3">${element.data().destination}</div>
            <div class="col table_cell_title s2 l2">${element.data().freq}</div>
            <div class="col table_cell_title s2 l2">${moment(parseInt(t)+res*60000,'x').format('HH:mm')}</div>
            <div class="col table_cell_title s2 l2">${res}</div>`
            document.querySelector(".table").append(cell_div)
        });
    })
})
