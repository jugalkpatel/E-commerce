import React from "react";

const Checkbox = () => {
    return (
        <>
            <input type="checkbox" id={item.filterLabel} onChange={() => setFilter(item.payloadInfo)} />
            <label htmlFor={item.filterLabel} className="checkbox__text">{capitalize(item.filterName)}</label>
        </>
    )
}

export { Checkbox };