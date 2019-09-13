import React from 'react';
import { Modal } from '@salesforce/design-system-react';

const AddFileDialog = ({handleClose, children, AddFileDialog}) => {
    const showHideClassName = AddFileDialog ? "modal display-block" : "modal display-none"
    return (
    <Modal
        className={showHideClassName}>
    >
        <section className="modal-main">
            {children}
            <button onClick={handleClose}>Close</button>
        </section>
    </Modal>
    )
}

export default AddFileDialog;