// 메인화면
import '../styles/common.css'
import React, { useState, useCallback } from 'react'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import PosterSlider from '../components/slider/PosterSlider'
import TvSlider from '../components/slider/TvSlider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

function Home() {
   const [alignment, setAlignment] = useState('movie')

   const handleChange = useCallback((event, newAlignment) => {
      setAlignment(newAlignment)
   }, [])

   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
            <div className="common_margin_tb">
               <div style={{ display: 'flex' }}>
                  <h3 style={{ height: '50px', lineHeight: '50px' }}>현재 상영중</h3>&nbsp;&nbsp;
                  <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
                     <ToggleButton value="movie">영화</ToggleButton>
                     <ToggleButton value="tv">TV</ToggleButton>
                  </ToggleButtonGroup>
               </div>
               {alignment === 'movie' ? <PosterSlider /> : <TvSlider />}
            </div>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home
