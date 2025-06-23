const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      let dogURL = "";
      let displayImage = false;


      function getDog(){
        fetch("https://dog.ceo/api/breeds/image/random").then((data) => {
            if(!data.ok) {
                throw new Error("didn't fetch properly");
                return;
            }
            return data.json();
        }).then((data) => {
            if(data.status === "success") {
                this.dogURL = data.message;
            }
        })
      }

      function showDog() {
        displayImage = true;
      }


      return {
        message,
        dogURL,
        displayImage,
        getDog,
        showDog


      }
    }
  }).mount('#main')