// 검색 결과 페이지

import '../styles/common.css'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

function SearchResults() {
   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">SearchResults</Main>
         <Footer />
      </Wrap>
   )
}

export default SearchResults
