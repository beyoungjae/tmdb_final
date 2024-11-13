// 영화 상세 페이지
import { useParams } from 'react-router-dom'
import '../styles/common.css'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import MovieDetail from '../components/MovieDetail'
import CreditsSlider from '../components/slider/CreditsSlider'

function Detail() {
   const { movieId } = useParams()
   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            <MovieDetail />
            <CreditsSlider movieId={movieId} />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Detail
