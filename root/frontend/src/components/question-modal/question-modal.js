import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Question from '../../model/question';

type QuestionModalProps = {
    model: Question,
    handleAccepted: Function,
    handleRejected: Function
};

function QuestionModal(props: QuestionModalProps) {
    const { handleAccepted, handleRejected, model } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAskeeChange = (event) => {
        model.askee = event.target.value;
    };
    const handleQuestionChange = (event) => {
        model.question = event.target.value;
    };

    return (
        <>
            <Button onClick={handleShow}>Add Question</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicAskee">
                            <Form.Label>Askee</Form.Label>
                            <Form.Control onChange={handleAskeeChange} type="text" placeholder="Enter askee name" />
                            <Form.Text className="text-muted">
                                This is the name of the person you asked the question
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control onChange={handleQuestionChange} type="text" placeholder="Enter question you asked" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleAccepted();
                        handleClose();
                    }}>
                        Accepted
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleRejected();
                        handleClose();
                    }}>
                        Rejected
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default QuestionModal;