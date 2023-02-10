export default function Die(props) {
    return(
        <div 
        className={props.dieheld===true?"die-face held":"die-face"} 
        onClick={props.hold} >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}