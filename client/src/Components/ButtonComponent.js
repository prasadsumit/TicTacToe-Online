
function ButtonComponent({buttonText, onClick}) {   
  return (
    <div>
        <button onClick={onClick}>{buttonText}</button>
    </div>
  )
}

export default ButtonComponent