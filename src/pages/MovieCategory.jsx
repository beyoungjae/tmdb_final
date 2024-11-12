// 인기 영화, 현재 상영중인 영화, 개봉 예정 영화 결과를 보여주는 페이지
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '../features/movies/moviesSlice'

import '../styles/common.css'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Button from '@mui/material/Button'
import MovieCard from '../components/MovieCard'

function MovieCategory({ category }) {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)

   // 카테고리별로 사용할 페이지 지정
   const [page, setPage] = useState({
      popular: 1,
      now_playing: 1,
      upcoming: 1,
   })

   // 카테고리가 변경될 때 페이지 초기화
   useEffect(() => {
      setPage((prevPage) => ({
         ...prevPage,
         [category]: 1,
      }))
   }, [category])

   // page가 변할때마다 영화 데이터 로딩
   useEffect(() => {
      console.log({ category, page: page[category] })
      dispatch(fetchMovies({ category, page: page[category] }))
   }, [dispatch, page])

   // 더보기를 누르면 해당 카테고리의 page state를 1씩 증가
   // loadMore() 실행 -> page state 변경 -> useEffect 발생 -> 영화 데이터 로딩
   const loadMore = useCallback(() => {
      setPage((prevPage) => ({
         ...prevPage,
         [category]: prevPage[category] + 1, // 1페이지씩 증가
      }))
   }, [category])

   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            {/* 영화목록 데이터를 movies props로 전달 */}
            <MovieCard movies={movies} />
            <Button variant="outlined" sx={{ margin: '20px auto', display: 'block', width: '500px' }} onClick={loadMore}>
               더보기
            </Button>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MovieCategory
