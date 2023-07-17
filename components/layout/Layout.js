import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';


//the query method on the router object gives access to identifiers in dynamic paths


function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
