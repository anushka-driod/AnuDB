import { Link } from "react-router-dom";

export default function NotFound(){

return(

<div className="empty-state">

<h1 style={{fontSize:"90px"}}>

404

</h1>

<h2>

Page Not Found

</h2>

<p>

The page you're looking for doesn't exist.

</p>

<Link

to="/dashboard"

className="create-btn"

>

Back to Dashboard

</Link>

</div>

);

}