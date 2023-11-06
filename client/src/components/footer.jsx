
const Footer = () => {
    return (
        <nav className="footer-container container">
            <ul className="footer-links">
                <li>
                    <span className="footer-name">
                        <img className="footer-icons" src="/person-icon.svg" alt="Person Icon" />
                        <span>
                            First Lastname
                        </span>
                    </span>
                </li>
                <li>
                    <a
                        target="_blank" href="mailto:someone@example.com">
                        <img className="footer-icons email-icon" src="/email-icon.svg" alt="Email Icon" />
                        <span>
                            Email Address
                        </span>
                    </a>
                </li>
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