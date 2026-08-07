export default function UploadBackupModal({
open,
onClose,
}){

if(!open) return null;

return(

<div className="modal-overlay">

<div className="database-modal">

<button
className="close-btn"
onClick={onClose}
>
✕
</button>

<h2>Upload Backup</h2>

<input
type="file"
/>

<button className="create-btn">

Upload

</button>

</div>

</div>

);

}