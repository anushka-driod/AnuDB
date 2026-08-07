import { FiDatabase } from "react-icons/fi";

export default function EmptyState({

title,

description,

buttonText,

}){

return(

<div className="empty-state">

<FiDatabase size={70}/>

<h2>{title}</h2>

<p>{description}</p>

<button className="create-btn">

{buttonText}

</button>

</div>

);

}