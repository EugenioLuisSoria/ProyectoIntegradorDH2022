const {useState, useEffect} = React

function Componente (props) {    
    const [data, setData] = useState()

    //Paralelismo con componentDidMount()
    useEffect( () => {        
        console.log("Se montó el componente");
        apiCall(props.url, props.callback);
        
    }, []);   

    const apiCall = (url, handler) => {
        fetch(url)
            .then((res) => res.json())
            .then(data => setData(handler(data)))
            .catch((e) => {
                console.log("Yo rompi");
                console.log(e);
            });
    }
   
    let contenido;
    if(!data) {
        contenido = "Cargando...";
        console.log("Estoy cargandome todavia");
        
    } else {
        contenido = data; 
    }

    return (
        <div className="wrapper__component">
            <h1>{props.titulo}</h1>
            <h2>{contenido}</h2> 
        </div>
    )
}