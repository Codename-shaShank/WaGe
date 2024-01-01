import React from 'react';
// FooterInfo.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Rest of the code...
import { Col } from 'react-bootstrap';

const FooterInfo = ({data: {icon, info1, info2,info3,id}}) => {
    return (
        <Col md={4}>
            <div className={`d-flex fContactInfo fContactInfo${id} align-items-center`}>
                <FontAwesomeIcon icon={icon} className="fContactIcon"/>

                <div>
                    <p className={`brnName${id}`}>{info1}</p>
                    {info2 && <p>{info2}<p></p>{info3}</p>}
                </div>
            </div>
        </Col>
    );
};

export default FooterInfo;