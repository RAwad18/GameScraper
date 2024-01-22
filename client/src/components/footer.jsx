
const Footer = () => {
    return (
        <nav className="footer-container container">
            <ul className="footer-links">
                <li>
                    <a
                        target="_blank" href="https://github.com/RAwad18">
                        <img className="footer-icons github-icon" src="/github-icon.svg" alt="Github Icon" />
                        <span>
                            Github
                        </span>
                    </a>
                </li>
                <li>
                    <a
                        target="_blank" href="https://www.linkedin.com/in/rashed-awadallah-b19b69244/">
                        <img className="footer-icons github-icon" src="/linkedin-icon.svg" alt="LinkedIn Icon" />
                        <span>
                            LinkedIn
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Footer;