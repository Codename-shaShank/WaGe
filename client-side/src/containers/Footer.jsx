import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import FooterCol from './FooterCol';
import './Footer.css';
import { usefulLink, ourServices, otherLinks, footerInfo } from './FooterData';
import FooterInfo from './FooterInfo';
import { Link } from 'react-router-dom';
import { scrollUP } from './ScrollTop/ScrollTop';


const Footer = () => {
    return (
        <section className='row footer'>
            <Row className="col-md-11 mx-auto">
                <Row className="align-items-center footerInfo">
                    {
                        footerInfo.map(data => <FooterInfo data={data} key={data.id}/>)
                    }
                </Row>
                <Col md={6} lg={3} className="fAboutUs">
                    <h5>ABOUT US</h5>
                    <span className="animate-border"></span>
                    <p className="aboutUsDes">All house owners would know, that there is always something in the house that needs to be fixed. ALWAYS! This never ends and getting them fixed is the real hassle. There’s the problem of finding the right person, and then there is this fight for negotiating the prices. Imagine this problem being solved by a tap on an app in your smartphone.</p>
                                 
                </Col>
                <FooterCol key="2" menuItems={usefulLink} title="JUKURI SHASHANK"/>
                <FooterCol key="3" menuItems={ourServices} title="SURESH NAYAK"/>
                <FooterCol key="4" menuItems={otherLinks} title="DRAKSHAM THARUN"/>
            </Row>
        </section>
    );
};

export default Footer;