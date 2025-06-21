



const app = new Vue({
    el:"#app",
    data: {
        openListings: []
    },
    created() {
        fetch(`getListings`).then((res) => {
            if(!res.ok) {
                throw new Error(`Fetch didnt work: ${res.status}`);

            }
        });
    }
});


