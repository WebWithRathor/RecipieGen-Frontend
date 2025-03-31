import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const baseStyles = "px-4 cursor-pointer py-2 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center";
const sizeStyles = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
};

const variantStyles = {
    primary: "bg-red-950 text-white hover:bg-red-900 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "opacity-75 bg-rose-700/[.9] text-white hover:bg-rose-900",
    ghost: "bg-gray-300 text-gray-600 hover:bg-gray-200",
};

const Btn = ({
    children,
    onClick,
    to,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    icon,
    className = "",
}) => {
    const classes = useMemo(() => {
        return `${baseStyles} ${sizeStyles[size] || ""} ${variantStyles[variant] || ""} ${fullWidth ? "w-full" : ""} ${className}`;
    }, [size, variant, fullWidth, className]);

    const iconElement = useMemo(() => {
        return icon ? <i className={icon}></i> : null;
    }, [icon]);

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children} {iconElement}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classes}>
            {children} {iconElement}
        </button>
    );
};

Btn.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullWidth: PropTypes.bool,
    icon: PropTypes.string,
    className: PropTypes.string,
};

export default Btn;