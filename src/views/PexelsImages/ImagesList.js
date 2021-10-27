import { useState, useEffect } from 'react';
import { PexelsFetchObject } from '../../services/pexels';
import { useLS } from '../../hooks/useLS';
import { Loader } from '../../components/Loader/Loader';
import { LoadMoreBtn } from '../../components/Button/Button';
// console.log(newPexelsFetchObject);
import s from './ImagesList.module.css';
const base_url = `https://api.pexels.com/v1/`;
const api_key = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`;
// const zhenya_key = `563492ad6f917000010000018ad09ac3acee45ebbb46a78f456e8ffa`;
const newPexelsFetchObject = new PexelsFetchObject(base_url, api_key);

export function ImagesList({ searchValue, perPage }) {
  const [searchResults, setSearchResults] = useLS('pexelImages', []);
  const [searchValueLS, setSearchValueLS] = useLS('searchValue', '');
  const [searchPageLS, setSearchPageLS] = useLS('searchPage', '');

  const [status, setStatus] = useState('init');
  // =================

  useEffect(() => {
    if (!searchValue.trim()) return;
    setSearchValueLS(searchValue);
    setSearchPageLS(1);
    setStatus('pending');
    newPexelsFetchObject.resetPage();
    newPexelsFetchObject.searchQuery = searchValue;
    newPexelsFetchObject.perPage = perPage;
    newPexelsFetchObject
      .searchPhotos()
      .then(searchResults => {
        // console.log(searchResults);
        setStatus('success');
        setSearchResults(searchResults);
      })
      .catch(err => {
        // console.log(err);
        setStatus('error');
        // setStatus(() => (err ? 'error' : 'Opps'));
      })
      .finally(() => onScroll());

    // return () => alert(`UNMOUNT`);
  }, [
    searchValue,
    perPage,
    setSearchResults,
    setSearchPageLS,
    setSearchValueLS,
  ]);
  // =================
  const handleClick = () => {
    console.log(document.documentElement.scrollHeight);
    if (!searchValue && searchValueLS) {
      newPexelsFetchObject.searchQuery = searchValueLS;
      setSearchPageLS(searchPageLS + 1);
      newPexelsFetchObject.page = searchPageLS + 1;
      newPexelsFetchObject
        .searchPhotos()
        .then(searchResults => {
          setSearchResults(prev => [...prev, ...searchResults]);
          setStatus('success');
          onScroll();
        })
        .catch(err => {
          alert(err);
          setStatus('error');
        });
      // .finally(() => onScroll());
    } else {
      newPexelsFetchObject.page = 1;
      newPexelsFetchObject
        .searchPhotos()
        .then(searchResults => {
          setSearchResults(prev => [...prev, ...searchResults]);
          setStatus('success');
          onScroll();
        })
        .catch(err => {
          alert(err);
          setStatus('error');
        });
      // .finally(() => onScroll());
    }
  };
  const onScroll = () => {
    setTimeout(() => {
      console.log(`scroll`);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 0);
  };

  if (status === 'init' && searchResults.length === 0) {
    return (
      <>
        <h1>Hello! Search something</h1>
        <Loader />
      </>
    );
  }

  if (status === 'pending') {
    return <h1>Wait please!</h1>;
  }
  if (status === 'success' || (status === 'init' && searchResults.length > 0)) {
    // console.log('success', searchResults);
    return (
      <>
        <ul className={s.imagesList}>
          {searchResults.length > 0 &&
            searchResults.map(el => (
              <li key={el.id}>
                <img src={el.src.tiny} alt={el.photographer} />
              </li>
            ))}
        </ul>
        <LoadMoreBtn btnType="button" handleClick={handleClick} />
      </>
    );
  }
  if (status === 'error') {
    return <h1>ALARMA!!!</h1>;
  }
}
