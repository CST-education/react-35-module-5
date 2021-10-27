import axios from 'axios';

// OOP
export class PexelsFetchObject {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = '';
    this._page = 1;
    this._perPage = 5;
    this.endPoint = '';
  }
  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    if (value === 1) {
      return (this._page += value);
    } else {
      return (this._page = value);
    }
  }
  resetPage() {
    return (this._page = 1);
  }
  get perPage() {
    return this._perPage;
  }
  set perPage(value) {
    return (this._perPage = value);
  }

  async searchPhotos() {
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;

    this.endPoint = 'search';
    console.log(
      'searchQuery:',
      this.searchQuery,
      'page:',
      this.page,
      'perPage:',
      this.perPage,
    );
    if (!this.searchQuery) {
      alert(`Enter the search value please!`);
      return;
    }
    let params = `?query=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.endPoint + params;

    try {
      const result = await axios.get(url);
      const data = result.data.photos;
      if (result.status === 400) throw new Error();
      // console.log(data);
      if (result.status === 200) return data;
    } catch (err) {
      console.log('err', err);
      return err.message;
    }
  }
}
