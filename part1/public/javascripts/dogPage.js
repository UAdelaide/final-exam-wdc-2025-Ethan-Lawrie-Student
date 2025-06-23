const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')


      function getDog(){
        fetch("")
      }
      return {
        message
      }
    }
  }).mount('#main')