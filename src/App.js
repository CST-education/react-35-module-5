import { lazy, Suspense } from 'react';
import './App.css';

import { NavLink, Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';
import { Navigation } from './components/Navigation/Navigation';
// STATIC IMPORTS
// import HomePage from './pages/Home/Home';
// import PexelsPage from './pages/Pexels/Pexels';
// import ProductsPage from './pages/Products/Products';

// DYNAMIC IMPORTS
const HomePage = lazy(() =>
  import('./pages/Home/Home' /* webpackChunkName: 'Home Page'*/),
);
const PexelsPage = lazy(() =>
  import('./pages/Pexels/Pexels' /* webpackChunkName: 'Pexels Page'*/),
);
const ProductsPage = lazy(() =>
  import('./pages/Products/Products' /* webpackChunkName: 'Products Page'*/),
);

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/pexels">
            <PexelsPage title="MAin Title" />
          </Route>

          <Route path="/products" component={ProductsPage} />

          <Route>
            <p>Page not found</p>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
