import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
    return (
        <footer className="text-center mt-5">
            <p>
                Created by{' '}
                <a href="https://saidinesh.netlify.app/" target="_blank" rel="noopener noreferrer">
                    Sai Dinesh Reddy
                </a>
            </p>
            <p>
                <a href="https://www.linkedin.com/in/dinesh020771/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="footer-icon linkedin-icon" />
                </a>{'  '}
                |{'  '}
                <a href="https://github.com/dinesh06003" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="footer-icon github-icon" />
                </a>{'  '}
                |{'  '}
                <a href="mailto:dinesh.ykbf53@gmail.com">
                    <BiLogoGmail className="footer-icon gmail-icon" />
                </a>
            </p>
            <p>Weather data is provided by OpenWeather API</p>
        </footer>
    );
};

export default Footer;
