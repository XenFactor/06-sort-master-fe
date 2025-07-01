import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layouts/Layout";
import Containers from "./pages/Containers";
import CreateContainerForm from "./components/CreateContainerForm";
import Items from "./pages/Items";
import ItemPage from "./pages/ItemPage.tsx";
import EditAdvertPage from "./pages/EditAdvertPage.tsx";
import { AdvertsProvider } from "./context/AdvertsContext";

function App() {
    return (
        <AdvertsProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/containers" element={<Containers/>}/>
                    <Route path="/add-container" element={<CreateContainerForm/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/items/:id" element={<ItemPage/>}/>
                    <Route path="/edit-advert/:id" element={<EditAdvertPage/>}/>
                </Routes>
            </Layout>
        </AdvertsProvider>
    );
}

export default App;
