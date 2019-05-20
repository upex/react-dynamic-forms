import React from "react";
import Button from '@material-ui/core/Button';

function ButtonComponent(props) {
    return (
        <>
        {props.show && <Button
            size={props.size ? props.size : 'large'} 
            color={props.color ? props.color : 'primary'}
            disabled= {props.disabled}
            onClick= { props.onClick ? (e) => props.onClick(e) : () => {} }
            className={props.className}
            fullWidth={props.fullWidth ? props.fullWidth : false}
            type= {props.type ? props.type : 'submit'}
            variant={props.variant ? props.variant : 'contained'}
            >
            {props.label ? props.label : 'submit'}
         </Button>}
         </>
    );
}

export default ButtonComponent;