import React from 'react';
import shortid from 'shortid';

import { Container, Row, Col } from 'react-grid-system';

const Picture = ({ pictures, borderColor }) => {
    return (
        <Container fluid>
            <Row style={{ width: 400 }}>
                {pictures && pictures.map((item) => (
                    <React.Fragment key={shortid.generate()}>
                        <Col sm={6} style={{ borderStyle: "solid", borderColor: borderColor }}>
                            <Row style={{ justifyContent: "center" }}>
                                <img src={item.thumbnailUrl} alt="" />
                            </Row>
                            <Row style={{ justifyContent: "center" }}>
                                <span>{item.title}</span>
                            </Row>
                        </Col>
                    </React.Fragment>
                ))}
            </Row>
        </Container >
    );
}

export default Picture;