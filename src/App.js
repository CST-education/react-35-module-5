import { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';
import { Navigation } from './components/Navigation/Navigation';

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
    <>
      <header>
        <Navigation />
      </header>
      <main>
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
      </main>
      <footer>
        <p>&copy; FE-35 all rights reserved 2021</p>
      </footer>
    </>
  );
}

// export default App;
