



const app = new Vue({
    el:"#app",
    data: {
        openListings: []
    },
    created() {
        console.log("")
        fetch(`getListings`).then((res) => {
            if(!res.ok) {
                throw new Error(`Fetch didnt work: ${res.status}`);

            }
            return res.json();
        }).then((jsonRes) => {
            console.log("WORKS");
            this.openListings = jsonRes;
        });
    }
});


