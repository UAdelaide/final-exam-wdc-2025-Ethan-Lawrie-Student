



const app = new Vue({
    el:"#app",
    data: {
        openListings: [],
        messageTxt:""

    },
    created() {
        console.log("fetching listings");
        fetch(`/getListings`, {
            method:"GET"
        }).then((res) => {
            if(!res.ok) {
                throw new Error(`Fetch didnt work: ${res.status}`);

            }
            return res.json();
        }).then((jsonRes) => {
            console.log("WORKS");
            this.openListings = jsonRes;
        });
    },
    methods: {
        sendMessage(listing) {
            fetch(`/postMessage`, {
                method:"POST",
                
            })
        }
    }

});


