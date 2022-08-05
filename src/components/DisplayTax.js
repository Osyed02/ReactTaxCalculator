import React from 'react'

export default function DisplayTax(props) {
    return (
        <li className="list-group-item">{props.title}: {props.val}</li>
    )
}
