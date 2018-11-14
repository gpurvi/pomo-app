import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]');

//for dev server base Url
axios.defaults.baseURL = 'http://localhost:3000';
//for dev server
axios.defaults.headers.common.Accept = 'application/json';

axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


export default axios;
