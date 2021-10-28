import { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';
import { Navigation } from './components/Navigation/Navigation';

import { useHistory, useLocation } from 'react-router';
import { routes } from './route';
console.log('routes', routes);

// // DYNAMIC IMPORTS
// const HomePage = lazy(() =>
//   import('./pages/Home/Home' /* webpackChunkName: 'Home Page'*/),
// );
// const PexelsPage = lazy(() =>
//   import('./pages/Pexels/Pexels' /* webpackChunkName: 'Pexels Page'*/),
// );
// const ProductsPage = lazy(() =>
//   import('./pages/Products/Products' /* webpackChunkName: 'Products Page'*/),
// );
// const ImageCard = lazy(() =>
//   import(
//     './views/PexelsImages/ImageCard' /* webpackChunkName: 'ImageCard Page'*/
//   ),
// );

function App() {
  const history = useHistory();
  // console.log('App history:', history);
  const location = useLocation();
  // console.log('App location:', location);

  const backToHome = () => {
    history.push(location?.state?.from?.location ?? '/');
  };
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map(route => {
              console.log(route);
              const { path, exact, component: Component } = route;
              return (
                <Route path={path} exact={exact}>
                  <Component />
                </Route>
              );
            })}
            {/* <Route exact path="/" component={HomePage} />
            <Route exact path="/pexels">
              <PexelsPage title="Main Title" />
            </Route>
            <Route path="/pexels/:imageId">
              <ImageCard />
            </Route>
            <Route exact path="/products" component={ProductsPage} /> */}
            <Route>
              <p>Page not found! please back to Home</p>
              <button type="button" onClick={backToHome}>
                back to Home
              </button>
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

export default App;
