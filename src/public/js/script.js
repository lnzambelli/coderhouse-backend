//Abrimos nueva conexion
const tboby = document.getElementById('tableContent');

const socket = io();
socket.emit('nombre_mensaje', 'cliente conectado')
socket.on('lista', (listado)=>{
        const trDelete = document.createElement("tr");
        tboby.replaceChildren(trDelete)
        listado.forEach(element => {
        const tr = document.createElement("tr");
        let idActual = ''
       for (const product in element) {
            idActual = element['id']
            if (product != 'thumbnail'){
                const td = document.createElement("td");
                td.textContent = element[product];
                tr.appendChild(td);
            }
            
       }
       const td = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = 'delete';
        button.id = idActual;
        button.addEventListener('click', ()=> socket.emit('deleteProduct', button.id))
        td.appendChild(button);
        tr.appendChild(td)  
        tboby.appendChild(tr);  
    })
})

const form  = document.getElementById('formProduct');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let product = {};
    product['title'] = event.target[0].value;
    product['description'] = event.target[1].value;
    product['price'] = +event.target[2].value;
    product['thumbnail']= [],
    product['code'] = event.target[3].value;
    product['stock'] = +event.target[4].value;
    product['status'] = false;
    product['category'] = event.target[5].value;
    console.log(product)
    socket.emit('addProduct', product)
    form.reset()
});
