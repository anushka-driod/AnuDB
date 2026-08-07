import {
  FiDownload,
  FiTrash2,
} from "react-icons/fi";

const files=[

{
name:"school_backup.zip",
size:"2.4 GB",
date:"02 Aug 2026",
},

{
name:"hospital_backup.zip",
size:"8.1 GB",
date:"03 Aug 2026",
},

{
name:"crm_backup.zip",
size:"620 MB",
date:"05 Aug 2026",
},

];

export default function StorageFiles(){

return(

<div className="dashboard-panel">

<table className="database-table">

<thead>

<tr>

<th>File</th>
<th>Size</th>
<th>Date</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{files.map((file)=>(

<tr key={file.name}>

<td>{file.name}</td>

<td>{file.size}</td>

<td>{file.date}</td>

<td>

<div className="table-actions">

<button className="table-action-btn view-btn">
<FiDownload/>
</button>

<button className="table-action-btn delete-btn">
<FiTrash2/>
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}