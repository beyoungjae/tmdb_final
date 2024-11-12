import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

function MovieCard({ movies }) {
   return (
      <Grid container spacing={2.5}>
         {movies.map((movie) => (
            <Grid size={2.4} key={movie.id}>
               <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
               </Link>
            </Grid>
         ))}
      </Grid>
   )
}

export default MovieCard
