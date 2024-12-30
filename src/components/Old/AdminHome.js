import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce
  } from "react-table";
  
const AdminHome = props => {

    const [rowItems, setRowItems] = useState([])
    const [columnItems, setColumnItems] = useState([])
    const colsArticle = ['title', 'image','date','text','event','aid','guest','project','home']
    const colsMember = ['name', 'position','type','image']
    
    
    const getItems = () => {
        const e = document.getElementById('item-type')
        const value = e.options[e.selectedIndex].value
        let columns = [] //copy of selected array
        let rows = [] //tr values with td
    
        if (value === 'article') {
            axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/all`)
            .then(response => {
                columns = colsArticle.map(header => 
                    <th>{header}</th>
                ) 
                rows = response.data.map(item => 
                    <Link to={`admin/action=edit&type=${'article'}&id=${item['_id']}`}>
                    <tr>
                        <td>{item['title']}</td>
                        <td>{item['image']}</td>
                        <td>{item['date']}</td>
                        <td>{item['text'].slice(0,100)}</td>
                        <td><input type="checkbox" disabled checked={item['event']} id="checkBox"/></td>
                        <td><input type="checkbox" disabled checked={item['aid']} id="checkBox"/></td>
                        <td><input type="checkbox" disabled checked={item['guest']} id="checkBox"/></td>
                        <td><input type="checkbox" disabled checked={item['project']} id="checkBox"/></td>
                        <td><input type="checkbox" disabled checked={item['home']} id="checkBox"/></td>       
                    </tr>
                    </Link>            
                )     
                setRowItems(rows)
                setColumnItems(columns)
            })
        }
        if (value === 'members') {

            axios.get(`http://${process.env.REACT_APP_HOST}:5000/members/all`)
            .then(response => {
                columns = colsMember.map(header => 
                    <th>{header}</th>
                ) 
                rows = response.data.map(item => 
                    <tr>
                        <td>{item['name']}</td>
                        <td>{item['position']}</td>
                        <td>{item['type']}</td>
                        <td>{item['image']}</td>
     
                    </tr>                                        
                )     
                setRowItems(rows)
                setColumnItems(columns)
            })
        }


        
        console.log(value)
    }


    const AddItem = () => {
        const e = document.getElementById('item-type')
        const value = e.options[e.selectedIndex].value
        document.location = `/admin/action=add&type=${value}&id=*`
    }

    useEffect(() => {
        console.log(rowItems)
    }, [rowItems])

    useEffect(() => {
        getItems()
    },[])

    return (
        <div>

            <div className='base__header'>

            </div>
            <div className='base__content'>
                <div className=''>
                    <form action="/action_page.php">
                        <select name="cars" id="item-type" onChange={getItems}>
                            <option value="article">Article</option>
                            <option value="members">Members</option>
                            <option value="minutes">Minutes</option>
                            <option value="adverts">Adverts</option>
                        </select>
                        <button type="button" onClick={AddItem}>Add</button>
                    </form> 
                    <table className='admin-table'>
                        <tr>
                            {columnItems}
                        </tr>
                            {rowItems}
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AdminHome