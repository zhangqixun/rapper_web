import http from '../utils/http'

export default {
  getDailyMovie() {
    return http({
      method: 'get',
      // url: movieApi.dailyMovieUrl(),
      withCredentials: true
    }
    )
  },
  getMovieByType(type, page) {
    const url = '/api/movie/type?genre=' + type + '&per_page=9&page=' + page
    return http({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  searchMovieByTitle(title, page, showLoading) {
    // const url = '/imdb/?s=' + title + '&page=' + page + '&apikey=fca9f9d4&plot=full'
    const url = '/api/movie/keyword?keyword=' + title + '&per_page=9&kind=title&page=' + page
    return http({
      method: 'get',
      headers: { 'showLoading': showLoading },
      url: url,
      withCredentials: true
    })
  },
  searchMovieByID(id) {
    // const url = '/imdb/?i=' + id + '&apikey=fca9f9d4&plot=full'
    const url = '/api/movie/id?id=' + id
    return http({
      method: 'get',
      url: url,
      withCredentials: true
    })
  },
  similarityMovieByID(id) {
    const url = '/api/movie/similarity?movie=' + id
    return http({
      method: 'get',
      url: url,
      withCredentials: true
    })
  }
}
