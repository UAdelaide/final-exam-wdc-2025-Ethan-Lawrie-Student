const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')


      function getDog(){
        fetch("https://dog.ceo/api/breeds/image/random").then((data) => {
            
        })
      }
      return {
        message
      }
    }
  }).mount('#main')