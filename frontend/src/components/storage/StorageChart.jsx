import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data=[
{ name:"Used", value:70 },
{ name:"Free", value:30 },
];

const COLORS=[
"#2563EB",
"#1E293B",
];

export default function StorageChart(){

return(

<div className="dashboard-panel">

<h3>Storage Usage</h3>

<PieChart width={350} height={250}>

<Pie
data={data}
dataKey="value"
outerRadius={90}
label
>

{data.map((entry,index)=>(

<Cell
key={index}
fill={COLORS[index]}
/>

))}

</Pie>

<Tooltip/>

</PieChart>

</div>

);

}