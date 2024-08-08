const ipworks = require('@nsoftware/ipworks');

async function makeRequest() {
    try {
        console.log('Starting the request process...');

        const http = new ipworks.http();

        
        http.on("Transfer", function(e){
            const response = JSON.parse(e.text.toString());
            const products = response.products || [];

          
            products.forEach(product => {
                console.log(product.title);
            });
        });

      
        http.on("SSLServerAuthentication", function(e) {
            e.accept = true;
        });

        // Set the URL and follow redirects if necessary
        const url = "https://dummyjson.com/products";
        http.setFollowRedirects(1);

        // Make the GET request
        await http.get(url).catch((err) => {
            console.error('Request failed:', err.message);
        });

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the function to make the request
makeRequest();
