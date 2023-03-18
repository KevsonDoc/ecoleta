import { BrowserRouter, Route, Routes as RoutesContainer } from 'react-router-dom';
import CreatePoint from './pages/CreatePoint';
import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
        <RoutesContainer>
            <Route element={<Home />} path="/" />
            <Route element={<CreatePoint />} path="/create-point" />;
        </RoutesContainer>
        </BrowserRouter>
    )
}

export default Routes;