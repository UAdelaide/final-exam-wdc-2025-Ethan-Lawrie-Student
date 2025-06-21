



const app = new Vue({
    el:"#app",
    data: {
        openListings: []
    },
    created() {
        fetch(`getListings`).then((res))
    }
});


