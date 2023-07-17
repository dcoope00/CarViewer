import classes from './MainNavigation.module.css';
import Link from "next/link"

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Car Viewer</div>
      <nav>
        <ul>
          <li>
           {/* Link is a built in nextJS component that takes an href as a required prop for the destination
                    It also renders an <a> element by default so <a> styling will still apply
                    Link prevents browser from reaching for a new html page and loads component to remain single page application*/}
            <Link href='/'>All Cars</Link>
          </li>
          <li>
            <Link href='/newCar'>Add New Cars</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
