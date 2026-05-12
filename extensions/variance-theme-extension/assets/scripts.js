async function hitGetApi() {
    await fetch('/apps/variant-tool/testing').then(response => response.text()).then(data => {
        alert(data);
    }).catch(error => {
        console.error('Error:', error);
    }   
);
    
}