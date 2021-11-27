import React from "react";
import PropTypes from "prop-types";
// import SweetAlert from 'sweetalert2-react';
// import swal from 'sweetalert2';
import SweetAlert from 'react-bootstrap-sweetalert';
/**
 * @prop {show} (boolean) This variable helps to open and close.
 * @prop {type} (String) Defines the type of alert.
 * @prop {title} (String) Title.
 * @prop {text} (Object) Alert Content.
 * @prop {sweetAlertClose} (callback) For closing Sweet alert.
 */
function SweetAlertComponent({ ...props }) {
    const { title, type, text, confirmBtnText, backBtnText, okText } = props;
    if (type === 'success') {
        return (
            <SweetAlert success confirmBtnText={okText || 'Ok'} customClass="sweetAlertTheme" title={title} onConfirm={props.sweetAlertClose}>
                {text}
            </SweetAlert>
        );
    } else if (type === "confirmation") {
        return (
            <SweetAlert
                showCancel
                confirmBtnText={confirmBtnText ? confirmBtnText : "Yes, Cancel it!"}
                confirmBtnBsStyle="primary"
                cancelBtnText={backBtnText || 'Back'}
                cancelBtnBsStyle="default"
                title={title ? title : "Are you sure?"}
                onConfirm={props.sweetAlertClose}
                onCancel={props.onCancel}
                focusCancelBtn
            >
                {text}
            </SweetAlert>)
    } else {
        return (
            <SweetAlert
                warning
                confirmBtnText={okText || 'Ok'}
                showCancel={props.showCancel}
                cancelBtnText={backBtnText || 'Back'}
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title={title}
                onConfirm={props.sweetAlertClose}
                onCancel={props.onCancel}
            >
                {text}
            </SweetAlert>
        );
    }

}

SweetAlertComponent.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string
};

export default SweetAlertComponent;
