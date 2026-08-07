export default function DeleteModal({

open,

title,

message,

onCancel,

onDelete,

}){

if(!open) return null;

return(

<div className="modal-overlay">

<div className="database-modal">

<h2>{title}</h2>

<p>{message}</p>

<div className="wizard-buttons">

<button
className="cancel-btn"
onClick={onCancel}
>
Cancel
</button>

<button
className="delete-btn"
onClick={onDelete}
>
Delete
</button>

</div>

</div>

</div>

);

}