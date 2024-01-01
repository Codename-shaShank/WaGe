import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Input from './Input';
import { addVenue } from '../../actions/venue.actions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from './MessageBox';
import categories from '../../assets/data/categories'

const AddVenueModel = (props) => {

    const dispatch = useDispatch();
    const addVenueStatus = useSelector(state => state.addVenueStatus);

    const [venueName, setVenueName] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [venuePictures, setVenuePictures] = useState([]);
    const [messageModalShow, setMessageModalShow] = useState(false);

    const handleVenuePictures = (e) => {
        setVenuePictures([
            ...venuePictures,
            e.target.files[0]
        ])
    }

    const saveVenue = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('venueName', venueName);
        form.append('location', location);
        form.append('address', address);
        form.append('description', description);
        form.append('price', price);
        form.append('category', category);

        for (let picture of venuePictures) {
            form.append('venuePicture', picture);
        }
        console.log(form);
        dispatch(addVenue(form));
        setMessageModalShow(true);
    }

    return (
        <>
            <MessageBox
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
                message={addVenueStatus.message}
            />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add WaGe
                    </Modal.Title>
                    <Button onClick={props.onHide} >X</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={saveVenue}>
                        <Row>
                            <Col md={6}>
                                <Input
                                    label='Worksite'
                                    type='text'
                                    placeholder='Work places in which your available'
                                    value={venueName}
                                    onChange={(e) => setVenueName(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    label='Location'
                                    type='text'
                                    placeholder='Your Location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Input
                            label='Address'
                            type='text'
                            placeholder='Area, Street Name'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Previous Work Experience</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder='Keep it under 30 words'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Input
                                    label='Pay per hour'
                                    type='number'
                                    placeholder='Pay per hour in Indian Rupee '
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <select class="form-select" value={category} required onChange={(e) => setCategory(e.target.value)}>
                                        <option selected>-Select-</option>
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <option value={category}>{category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="success" type="submit" style={{ marginRight: '10px' }} onClick={props.onHide}>Add work+</Button>
                        <Button variant="danger" type="reset" style={{ marginLeft: '10px' }} >Reset</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddVenueModel
