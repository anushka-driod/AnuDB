import {
  FiHardDrive,
  FiFolder,
  FiUpload,
  FiDownload,
} from "react-icons/fi";

const cards = [

  {
    title:"Used Storage",
    value:"128 GB",
    icon:<FiHardDrive/>
  },

  {
    title:"Files",
    value:"184",
    icon:<FiFolder/>
  },

  {
    title:"Uploads",
    value:"53",
    icon:<FiUpload/>
  },

  {
    title:"Downloads",
    value:"249",
    icon:<FiDownload/>
  },

];

export default function StorageCards(){

  return(

    <div className="stats-grid">

      {cards.map((card)=>(

        <div
          className="stats-card"
          key={card.title}
        >

          <div className="stats-icon">
            {card.icon}
          </div>

          <h2>{card.value}</h2>

          <p>{card.title}</p>

        </div>

      ))}

    </div>

  );

}