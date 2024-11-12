// TV 슬라이더
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTvs } from '../../features/tvs/tvsSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import '../css/PosterSlider.css'
import { Navigation } from 'swiper/modules'

function TvSlider() {
   const dispatch = useDispatch()
   const { tvs, loading, error } = useSelector((state) => state.tvs)

   useEffect(() => {
      dispatch(fetchTvs('on_the_air'))
   }, [dispatch])

   if (loading) return <div>Loading...</div>
   if (error) return <div>Error: {error}</div>

   return (
      <>
         <Swiper slidesPerView={5} spaceBetween={30} navigation={true} modules={[Navigation]} className="mySwiper">
            {tvs.map((tv) => (
               <SwiperSlide key={tv.id}>
                  <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.title} />
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}

export default TvSlider