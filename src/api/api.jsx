import Axios from 'axios';
import config from './config.json';

class DataMuseAPI {
  constructor() {
    this.axiosInstance = Axios.create(config.api.dataMuse);
  }
  
  static url = {
    word: word => `/words?rel_syn=${word.trim()}&s&max=5`,
  };

  fetchWordSynonyms(word) {
    return this.axiosInstance
      .get(DataMuseAPI.url.word(word))
      .then(({ data }) => data);
  }
}

export default new DataMuseAPI();