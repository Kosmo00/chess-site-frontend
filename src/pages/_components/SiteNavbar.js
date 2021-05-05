import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// react-bootstrap components
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

// chess-site providers
import { LoginContext } from '../../App'

const SiteNavbar = () => {

  const userContext = useContext(LoginContext)

  const { userState } = userContext

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed='top'>
      <Link to='/'><Navbar.Brand>Chess Site</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!userState.token && <Link to='/login' className='text-decoration-none'><Nav.Link as='span'>Login</Nav.Link></Link>}
          {!userState.token && <Link to='/register' className='text-decoration-none'><Nav.Link as='span'>Register</Nav.Link></Link>}
          {userState.token && <Link to='/logout' className='text-decoration-none'><Nav.Link as='span'>Logout</Nav.Link></Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SiteNavbar
