

function OtherDataComp({address}) {
  

  return (
    <div style={{border : "1px solid black",
      padding : "10px",
      marginTop : "10px"
    }}>
      Street : <input type="text" value={address.street} readOnly/> <br/>
      City : <input type="text" value={address.city} readOnly/> <br/>
      Zip Code : <input type="text" value={address.zipcode} readOnly/> <br/>
    </div>
  )
}

export default OtherDataComp;
