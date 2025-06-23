const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      let dogURL = ref("");
      let imageDisplay = ref("none");


      function getDog(){
        fetch("https://dog.ceo/api/breeds/image/random").then((data) => {
            if(!data.ok) {
                throw new Error("didn't fetch properly");
                return;
            }
            return data.json();
        }).then((data) => {
            if(data.status === "success") {
                dogURL.value = data.message;
            }
        })
      }

      function showDog() {
        imageDisplay.value = "block";
      }


      return {
        message,
        dogURL,
        imageDisplay,
        getDog,
        showDog


      }
    }
  }).mount('#main')