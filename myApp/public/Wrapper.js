function Wrapper() {

    const setProductsandUsersQty = (response) => {

        console.log("Tengo info parseada de la API")
        console.log(response)
        console.log(response.count)
        return response.count
    }
    const setCategoriesQty = (response) => {
        console.log("Tengo info parseada de la API")
        let cont = 0;
        for (const prop in response.countByCategory) {
            console.log(`response.countByCategory.${prop} = ${response.countByCategory[prop]}`);
            cont++;
        }
        return cont;
    }

    return (
        <div>
            <Componente url="http://localhost:3000/api/products" titulo="Total de productos" callback={setProductsandUsersQty} />
            <Componente url="http://localhost:3000/api/users" titulo="Total de usuarios" callback={setProductsandUsersQty} />
            <Componente url="http://localhost:3000/api/products" titulo="Total de categorías" callback={setCategoriesQty} />            
        </div>
    )
}