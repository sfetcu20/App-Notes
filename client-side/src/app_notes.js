import { useState, useEffect, useRef} from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

import './app_notes.css'
import { CSSTransition } from 'react-transition-group';
const App_notes = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	]);

	const adminUser={
		email:"admin@admin.com",
		password: "admin"
	}
	const[user, setuser]= useState({name:"", email:""})
	const[error, setError]=useState("");

	const Login= details=>{
		console.log(details);

	}
	const Logout= () => {
		console.log("Logout");
	}

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};






	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
			

			<Navbar>
				
				<div class="logout">

		
			<button type="submit" onClick={(event)=>{
                event.preventDefault();
                localStorage.removeItem('token');
                window.location.reload();
                }}
                value="Logout">Logout</button>
			

			

			</div>
				
			

					<NavItem icon={"Groups"}>
					<DropdownMenuGroups></DropdownMenuGroups>
					</NavItem>
					
					<NavItem icon={"Classes"}>
					<DropdownMenu></DropdownMenu>
					</NavItem>
		   </Navbar>


				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};






function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}






function DropdownMenuLogIn() {
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);
  
	useEffect(() => {
	  setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
	}, [])
  
	function calcHeight(el) {
	  const height = el.offsetHeight;
	  setMenuHeight(height);
	}
  
	function DropdownItem(props) {
	  return (
		<a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
		  <span className="icon-button">{props.leftIcon}</span>
		  {props.children}
		  <span className="icon-right">{props.rightIcon}</span>
		</a>
	  );
	}
  
	return (
	  <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
		<CSSTransition
		  in={activeMenu === 'main'}
		  timeout={500}
		  classNames="menu-primary"
		  unmountOnExit
		  onEnter={calcHeight}>
		  <div className="menu">
			<DropdownItem>Log in:</DropdownItem>
			<DropdownItem
			  leftIcon={"🎓"}
			  rightIcon={"wt"}
			  goToMenu="settings">		  
			 User:
			
			
			 
			
			 
			</DropdownItem>

			<DropdownItem
			  leftIcon="🎓"
			  rightIcon={"mt"}
			  goToMenu="animals">
			  Password:
			</DropdownItem>

			<DropdownItem
			leftIcon="🎓"
			rightIcon={"mt"}
			goToMenu="animals">
			Register:
		  </DropdownItem>
  
  
		  </div>
		</CSSTransition>
  
		<CSSTransition
		  in={activeMenu === 'settings'}
		  timeout={500}
		  classNames="menu-secondary"
		  unmountOnExit
		  onEnter={calcHeight}>
		  <div className="menu">
			<DropdownItem goToMenu="main" leftIcon={"ss"}>
			  <h2>Settings:</h2>
			</DropdownItem>
			<DropdownItem>See professor</DropdownItem>
		  
		  </div>
		</CSSTransition>
  
		<CSSTransition
		  in={activeMenu === 'animals'}
		  timeout={500}
		  classNames="menu-secondary"
		  unmountOnExit
		  onEnter={calcHeight}>
		  <div className="menu">
			<DropdownItem goToMenu="main" leftIcon={"ss"}>
			  <h2>Animals</h2>
			</DropdownItem>
			<DropdownItem>See professor</DropdownItem>
		  </div>
		</CSSTransition>
	  </div>
	);
  }


function DropdownMenuGroups() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>Groups:</DropdownItem>
          <DropdownItem
            leftIcon={"🎓"}
            rightIcon={"wt"}
            goToMenu="settings">
           Group 1
          </DropdownItem>

          <DropdownItem
            leftIcon="🎓"
            rightIcon={"mt"}
            goToMenu="animals">
            Group2
          </DropdownItem>

		  <DropdownItem
		  leftIcon="🎓"
		  rightIcon={"an"}
		  goToMenu="animals">
		 Group3
		</DropdownItem>

		<DropdownItem
		leftIcon="🎓"
		rightIcon={"po"}
		goToMenu="animals">
		Group4
	  </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={"ss"}>
            <h2>Settings:</h2>
          </DropdownItem>
          <DropdownItem>See professor</DropdownItem>
        
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={"ss"}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem>See professor</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);
  
	useEffect(() => {
	  setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
	}, [])
  
	function calcHeight(el) {
	  const height = el.offsetHeight;
	  setMenuHeight(height);
	}
  
	function DropdownItem(props) {
	  return (
		<a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
		  <span className="icon-button">{props.leftIcon}</span>
		  {props.children}
		  <span className="icon-right">{props.rightIcon}</span>
		</a>
	  );
	}
  
	return (
	  <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
		<CSSTransition
		  in={activeMenu === 'main'}
		  timeout={500}
		  classNames="menu-primary"
		  unmountOnExit
		  onEnter={calcHeight}>
		  <div className="menu">
			<DropdownItem>Classes:</DropdownItem>
			<DropdownItem
			  leftIcon={"🎓"}
			  rightIcon={"wt"}
			  goToMenu="settings">
			 Web Technology
			</DropdownItem>
  
			<DropdownItem
			  leftIcon="🎓"
			  rightIcon={"mt"}
			  goToMenu="animals">
			  Multimedia
			</DropdownItem>
  
			<DropdownItem
			leftIcon="🎓"
			rightIcon={"an"}
			goToMenu="animals">
			Android
		  </DropdownItem>
  
		  <DropdownItem
		  leftIcon="🎓"
		  rightIcon={"po"}
		  goToMenu="animals">
		  POO
		</DropdownItem>
  
		  </div>
		</CSSTransition>
  
		<CSSTransition
		  in={activeMenu === 'settings'}
		  timeout={500}
		  classNames="menu-secondary"
		  unmountOnExit
		  onEnter={calcHeight}>
		  <div className="menu">
			<DropdownItem goToMenu="main" leftIcon={"ss"}>
			  <h2>Settings:</h2>
			</DropdownItem>
			<DropdownItem>See professor</DropdownItem>
		  
		  </div>
		</CSSTransition>
  
		<CSSTransition
		  in={activeMenu === 'animals'}
		  timeout={500}
		  classNames="menu-secondary"
		  unmountOnExit
		  onEnter={calcHeight}>
		  <div className="menu">
			<DropdownItem goToMenu="main" leftIcon={"ss"}>
			  <h2>Animals</h2>
			</DropdownItem>
			<DropdownItem>See professor</DropdownItem>
		  </div>
		</CSSTransition>
	  </div>
	);
  }

export default App_notes;