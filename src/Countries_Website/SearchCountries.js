import React, { useEffect, useState } from 'react'
import './SearchCountries.css'
import axios from 'axios'

function SearchCountries() {
    const [data,setData] = useState([]);
    const [search,setSearch] = useState(data);
    const [click,setClick] = useState(true);
    const handleClick = () =>{
        setClick(!click)
    }

    useEffect(() => {
        axios('https://restcountries.com/v2/all?fields=name,region,area')
        .then(response => {
        console.log(response.data)
        setData(response.data);
        setSearch(response.data);
        })
        .catch(error => {
        console.log('Error getting fake data: ' + error);
        })
        }, []);

    const filterRegion = (catRegion) => {
        const updateItems = data.filter((curRegion) =>{
            return curRegion.region === catRegion
        });
        setSearch(updateItems)
    }
    
    const handleSearch = (event) => {
        let value = event.target.value;
        let result = [];
        console.log(value);
        result = data.filter((item) => {
        return value.name === '' ? item : item.name.toLowerCase().includes(value.toLowerCase())
        });
        setSearch(result);
        }
  return (
<div className='background-image'>
    <section className='container'>
        <div className='input-container'>
           <input onChange={(event)=>handleSearch(event)} type='text' placeholder='Search By Country Name '/>
           <div className='hamburger' onClick={handleClick}>
             <i className={click ? 'fas fa-bars' : 'fas fa-times'} />
             <div className={click ? 'display-none' : 'display-items'}> 
                <div onClick={()=>filterRegion('Asia')}><p id='asia'>→ Asian Countries</p></div>
                <div onClick={()=>filterRegion('Africa')}><p id='africa'>→ African Countries</p></div>
                <div onClick={()=>filterRegion('Europe')}><p id='europe'>→ European Countries</p></div>
                <div onClick={()=>filterRegion('Americas')}><p id='americas'>→ Americas Countries </p></div>           
                <div onClick={()=>filterRegion('Oceania')}><p id='oceania'>→ Oceania Countries</p></div>
                <div onClick={()=>filterRegion('Polar')}><p id='polar'>→ Polar Countries</p></div>
             </div>
           </div>          
        </div>
        <div className='sub-container'>
            
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Area (km²)</th>
                        <th>Region</th>       
                    </tr>
                </thead>
                <tbody>

                {search.map((item)=>{

                    return(<tr>
                        <td>{item.name}</td>
                        <td>{item.area} </td>
                        <td>{item.region}</td>
                    </tr>)

                })} 

                </tbody>
            </table>
            
        </div>
        
    </section>
    <div className='copy_right'>&#169; 2023 M Gopi Chandu</div>
    </div>
    
  )
}

export default SearchCountries
