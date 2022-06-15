function App() {

    
    return (
        <div>
            <h1>Dashboard with data fetch from API</h1>
            <Wrapper />
        </div>
    )

}

//Contenedor de la miniApp de React
const domContainer = document.querySelector('#appReact');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
