import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies } from '../../api/tmdbApi'

/* 
createAsyncThunk의 async 함수에서 매개변수로 값을 여러개 받으러면, 객체 혹은 배열로 받아야 한다
*/

// 인기, 현재 상영중, 개봉 예정 영화 목록 가져오기
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ category, page }) => {
   const response = await getMovies(category, page)
   return response.data.results
})

const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false, // 로딩여부
      movies: [], // 영화 목록
      movieDetails: null, // 영화 상세 정보
      movieCredits: null, // 영화 출연 배우 정보
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
   },
})

export default moviesSlice.reducer
