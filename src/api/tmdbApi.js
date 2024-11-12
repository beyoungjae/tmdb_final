import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const AUTH_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWYxY2NlNzQzOWNiOTU0ZDg4ODY3N2Y0NmNmOGNiMyIsIm5iZiI6MTczMTI4Njg2OS4wNjc4ODksInN1YiI6IjY3MWFlOTk4MjdiZDU3ZDkxZjYyODA3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeqbdig6T8xkuI6fIAmjHkKNrsOBMeoiqyS4FTKNGRo'

// api 호출하기 axios 객체 생성
const tmdbApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
      Authorization: AUTH_KEY,
   },
})

// 공통 API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await tmdbApi.get(url, { params })
      return response
   } catch (error) {
      console.log(`API 요청 오류 : ${error.message}`)
      throw error
   }
}

// 인기, 상영중, 개봉 예정 영화 가져오기
export const getMovies = (category = 'popular', page = 1) => {
   // 카테고리에 맞는 endpoint를 가져옴
   const endpoint = {
      popular: '/movie/popular',
      now_playing: '/movie/now_playing',
      upcoming: '/movie/upcoming',
   }[category]

   return fetchFromApi(endpoint, {
      language: 'ko-KR',
      page,
      region: 'KR',
   })
}

// 인기, 방송 중인 tv 목록 가져오기
export const getTvs = (type, page = 1) => {
   const endpoint = {
      popular: '/tv/popular',
      on_the_air: '/tv/on_the_air',
   }[type]

   return fetchFromApi(endpoint, {
      language: 'ko-KR',
      page,
   })
}

// 영화 상세 정보 가져오기
export const getMovieDetails = (movieId) => {
   return fetchFromApi(`/movie/${movieId}`, { language: 'ko-KR' })
}

// 출연 배우 정보 가져오기
export const getMovieCredits = (movieId) => {
   return fetchFromApi(`/movie/${movieId}/credits`, { language: 'ko-KR' })
}

// 검색 API 호출
export const searchMovie = (query, page = 1) => {
   return fetchFromApi(`/search/movie`, {
      query, // 검색어 필수
      include_adult: false, // 성인 콘텐츠 제외 여부
      language: 'ko-KR',
      page,
      region: 'KR',
   })
}

export default tmdbApi
