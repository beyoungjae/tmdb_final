import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Banner.css'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function Banner() {
   const [searchQuery, setSearchQuery] = useState('')
   // useNavigate 훅: 페이지를 이동할 수 있게 해주는 훅, 특정 이벤트(예: 검색 버튼 클릭)에서 페이지를 이동하거나, 폼 제출 후 페이지 이동 가능(SPA방식과 유사, 호환)
   const navigate = useNavigate()

   const handleInputChange = useCallback((e) => {
      setSearchQuery(e.target.value)
   }, [])

   // 검색 버튼 클릭시 검색 페이지로 이동
   const handleSearch = useCallback(
      (e) => {
         e.preventDefault()

         if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`) // 이동 경로 지정
         }
      },
      [searchQuery, navigate]
   )

   return (
      <div
         style={{
            width: '100%',
            height: '400px',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(/images/banner.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div className="search">
            <h1 className="header_msg">환영합니다! 수백만 개의 영화를 지금 살펴보세요.</h1>

            <form className="search_form" onSubmit={handleSearch}>
               <TextField sx={{ backgroundColor: 'white', borderRadius: 2 }} fullWidth id="fullWidth" label="영화검색" value={searchQuery} onChange={handleInputChange} />

               <Button sx={{ width: 100, height: 56, backgroundColor: 'white', borderRadius: 2 }} variant="outlined" startIcon={<SearchIcon />} type="submit">
                  검색
               </Button>
            </form>
         </div>
      </div>
   )
}

export default Banner
