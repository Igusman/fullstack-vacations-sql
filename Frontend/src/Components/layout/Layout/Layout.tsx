import { Home } from "../../home/Home/Home";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../routing/Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Header/>
            </header>
            <nav>
                <Menu/>
            </nav>
            <main>
                <Routing/>
            </main>
            <footer className="footer">
                <Footer/>
            </footer>
        </div>
    );
}
