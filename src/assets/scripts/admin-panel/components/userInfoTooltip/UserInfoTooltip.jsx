import React from 'react';
import ReactTooltip from 'react-tooltip';

export default function UserInfoTooltip(props){
  return (
    <ReactTooltip clickable className="create-cv-tooltip create-cv-tooltip--white-bg" data-tip="hello world">
      <table>
        <tbody>
        {props.data.map((dataItem) => (
          <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>{dataItem}</td>
        </tr>
        ))}
          
        </tbody>
      </table>
      
      {/* <table>
      <tbody>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        </tbody>
      </table> */}
    </ReactTooltip>
  )
}