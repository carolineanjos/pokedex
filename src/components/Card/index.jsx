import "./styles.scss"

export const Card = ( props ) => {
  return (
      <div className="card-container">
        <img src={props.img}/>
        <label>{props.name}</label>
      </div>
  )
}
