class Productos {
    
    constructor(){
        this.productos = []
        // this.id = 0    
    }

    addProduct(producto){
        if (this.productos.length == 0) {
            const prod = {
                id: 1,
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail,
            };
            this.productos.push(prod);

        } else {
            let newId = this.productos[this.productos.length-1].id;
            const prod = {
                id: newId+1,
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail,
            };
            this.productos.push(prod);
        }
    }

    list(id){
        const prod = this.productos.find(prod => prod.id == id);
        return prod || {error : 'El producto no existe!'}
    }

    listAll(){
        // console.log(this.productos)
        return this.productos.length ? [...this.productos] : {error : 'No hay productos!'}
    }


    save(prod){
        const newProd = { ...prod, id:++this.id }
        this.productos.push(newProd)
        return newProd
    }

    actualizar(prod, id) {
        const newProd = { id: Number(id), ...prod };
        // Acá findIndex encuentra el producto por ese id // sino encuentra ese id te retorna -1 
        const index = this.productos.findIndex(p => p.id == id)
        // splice pasarle el indice buscado, la cantidad a remplazar y con qué lo voy a reemplazar
        if(index !== -1){
            this.productos.splice(index, 1, newProd)
            return newProd
        } else {
            return {error : 'El producto no existe!'}
        }
    }

    delete(id){
        const index = this.productos.findIndex(p => p.id == id)
        if(index !== -1){
            return this.productos.splice(index, 1)
        } else {
            return { error : 'El producto no existe!' }
        }
    }
}

module.exports = {Productos}