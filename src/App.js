import './App.css';
import Cards from "./components/Cards";
import Header from "./components/UI/Header/Header";

function App() {

    return (
        <>
            <Header />
            <div className="container">
                <Cards />
            </div>
        </>
    );
}

export default App;
