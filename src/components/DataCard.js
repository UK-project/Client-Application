import React from 'react'

function DataCard(props) {
    const{count,name} = props
    return (
        <div
        style={{
          width: "300px",
          height: "120px",
          backgroundColor: "white",
          borderRadius: "10px",
          marginRight: "30px",
        }}
      >
        <h1>{count}</h1>
        <h2>{name}</h2>
      </div>
    )
}

export default DataCard
