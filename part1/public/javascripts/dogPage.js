const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')


      function getDog(){
        fetch("https://dog.ceo/api/breeds/image/random").then((data) => {
            if(!data.ok) {
                throw new Error("")
                return;
            }
            return data.json();
        }).then(())
      }
      return {
        message
      }
    }
  }).mount('#main')