import styled from '@emotion/styled'
import { AppBar, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Styledtoolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 1200,
  margin: 'auto',
  width: '100%'
})
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#fff'

})
const Navbar = () => {
  return (
    <AppBar position='sticky'>
      <Styledtoolbar>
        <Stack direction='row' spacing={2}>
          <StyledLink to='/'><img src={require('../assets/logo.png')} width='30' height='30' alt='supabase' /></StyledLink>
          <StyledLink to='/'><Typography variant='h6'>Supabase</Typography></StyledLink>
        </Stack>
        <Stack direction="row" spacing={5}>
          <StyledLink to='/'><Typography variant='h6'>Home</Typography></StyledLink>
          <StyledLink to='/create'><Typography variant='h6'>Create</Typography></StyledLink>
        </Stack>
      </Styledtoolbar>
    </AppBar>
  )
}

export default Navbar