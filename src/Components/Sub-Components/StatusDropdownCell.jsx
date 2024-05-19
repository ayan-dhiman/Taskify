import { useState } from "react";

const StatusDropdownCell = ({ id, value, onChange }) => {
    const [status, setStatus] = useState(value);

    const handleChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        onChange(id, newStatus);
    };

    return (
        <select value={status} onChange={handleChange} className="status-dropdown">
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="ToDo">ToDo</option>
        </select>
    );
};

export default StatusDropdownCell;