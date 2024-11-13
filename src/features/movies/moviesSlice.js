import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies, getMovieDetails, getMovieCredits, searchMovie } from '../../api/tmdbApi'

/* 
createAsyncThunk의 async 함수에서 매개변수로 값을 여러개 받으러면, 객체 혹은 배열로 받아야 한다
*/

// 인기, 현재 상영중, 개봉 예정 영화 목록 가져오기
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ category, page }) => {
   const response = await getMovies(category, page)
   return response.data.results
})

// 영화 상세 정보 가져오기
export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
   const response = await getMovieDetails(movieId)
   return response.data
})

// 영화 출연 배우 정보 가져오기
export const fetchMovieCredits = createAsyncThunk('movies/fetchMovieCredits', async (movieId) => {
   const response = await getMovieCredits(movieId)
   return response.data
})

// 검색 결과 가져오기
export const fetchSearchResults = createAsyncThunk('movies/fetchSearchResults', async ({ query, page }) => {
   const response = await searchMovie(query, page)
   return response.data.results
})

const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false, // 로딩여부
      movies: [], // 영화 목록을 저장할 배열
      movieDetails: null, // 영화 상세 정보
      movieCredits: null, // 영화 출연 배우 정보
      searchResults: [], // 검색 결과를 저장할 배열
      error: null, // 에러 메시지
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 대기상태
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null // 새로운 요청 시 에러 초기화
         })
         // 성공상태
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false

            // 첫번째 페이지인 경우 영화 목록 초기화, 페이지가 1 일때 새로운 데이터로 state 갱신
            if (action.meta.arg.page === 1) {
               state.movies = action.payload
            } else {
               // 두번째 이후 페이지인 경우 영화 목록 추가, 페이지가 2 이상일 때 기존 데이터에 새로운 데이터 추가
               state.movies = [...state.movies, ...action.payload]
            }
         })
         // 실패상태
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })

         // 영화 상세 정보 가져오기 대기상태
         .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true
            state.error = null
         })
         // 영화 상세 정보 가져오기 성공상태
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false
            state.movieDetails = action.payload
         })
         // 영화 상세 정보 가져오기 실패상태
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })

         // 영화 출연 배우 정보 가져오기 대기상태
         .addCase(fetchMovieCredits.pending, (state) => {
            state.loading = true
            state.error = null
         })
         // 영화 출연 배우 정보 가져오기 성공상태
         .addCase(fetchMovieCredits.fulfilled, (state, action) => {
            state.loading = false
            state.movieCredits = action.payload
         })
         // 영화 출연 배우 정보 가져오기 실패상태
         .addCase(fetchMovieCredits.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         // 검색 결과 가져오기 대기상태
         .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true
            state.error = null
         })
         // 검색 결과 가져오기 성공상태
         .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.loading = false
            if (action.meta.arg.page === 1) {
               state.searchResults = action.payload
            } else {
               state.searchResults = [...state.searchResults, ...action.payload]
            }
         })
         // 검색 결과 가져오기 실패상태
         .addCase(fetchSearchResults.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default moviesSlice.reducer
