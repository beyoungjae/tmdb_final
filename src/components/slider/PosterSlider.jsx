// 영화 슬라이더
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '../../features/movies/moviesSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import '../css/PosterSlider.css'
import { Navigation, Autoplay } from 'swiper/modules'

function PosterSlider() {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)

   useEffect(() => {
      dispatch(fetchMovies({ category: 'now_playing', page: 1 }))
   }, [dispatch])

   if (loading) return <div>Loading...</div>
   if (error) return <div>Error: {error}</div>

   return (
      <>
         <Swiper
            slidesPerView={5}
            spaceBetween={30}
            navigation={true}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
         >
            {movies.map((movie) => (
               <SwiperSlide key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} style={{ height: '310px' }} />
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}

export default PosterSlider
