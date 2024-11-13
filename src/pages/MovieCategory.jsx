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

   /* 
      메뉴 클릭 시 MovieCategory 컴포넌트는 재렌더링되지 않음.
      이는 react-router-dom의 동작 방식 때문
      
      App.js에서 /popular, /now_playing, /upcoming 경로 모두 같은 MovieCategory 컴포넌트를
      재사용하고 있어서, 경로가 바뀌어도 컴포넌트가 새로 마운트되지 않고 기존 컴포넌트를 계속 사용
      
      이로 인해 페이지 state 관리에 주의가 필요:
      1. 메인 페이지에서 처음 메뉴 클릭 시 해당 카테고리의 page가 1로 설정
      2. 이후 다른 메뉴를 클릭해도 컴포넌트가 재마운트되지 않아 page state가 자동으로 초기화되지 않음
      3. 따라서 카테고리별 page state를 별도로 관리하고 카테고리 변경 시 수동으로 초기화해야 함.
*/

   // 카테고리별로 사용할 페이지 지정
   const [page, setPage] = useState({
      popular: 1,
      now_playing: 1,
      upcoming: 1,
   })

   /* 
      메인 페이지에 있다가 최초로 메뉴를 클릭했을 때는 MovieCategory 컴포넌트가 재렌더링되면서
      1번 useEffect가 실행되어 page state가 1로 초기화됨.
      
      이후 메뉴를 클릭하면 컴포넌트가 재렌더링되지 않아 page state가 초기화되지 않음.
      따라서 카테고리 변경 시 수동으로 page state를 1로 초기화해야 함.

      이러한 동작을 구현하기 위해 useRef를 사용해 최초 렌더링 여부를 확인함.

      -> page state가 1로 바뀌면서 useEffect 발생 -> 영화 데이터 로딩

      -> 따라서 useRef를 사용해 최초 렌더링 여부를 확인함.
*/

   const isFirstLoad = useRef(true)

   // 카테고리가 변경될 때 페이지 초기화
   useEffect(() => {
      if (isFirstLoad.current) {
         isFirstLoad.current = false
         return
      }

      setPage((prevPage) => ({
         ...prevPage,
         [category]: 1,
      }))
   }, [category])

   // page가 변할때마다 영화 데이터 로딩
   useEffect(() => {
      dispatch(fetchMovies({ category, page: page[category] }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, page])

   // 더보기를 누르면 해당 카테고리의 page state를 1씩 증가
   // loadMore() 실행 -> page state 변경 -> useEffect 발생 -> 영화 데이터 로딩
   const loadMore = useCallback(() => {
      setPage((prevPage) => ({
         ...prevPage,
         [category]: prevPage[category] + 1, // 1페이지씩 증가
      }))
   }, [category])

   if (loading && page === 1) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>Loading...</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }

   if (error) {
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>Error: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }

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
