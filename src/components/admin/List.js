import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getAllArticles, getAllMinutes, getAllEvents, getAllMembers } from '../../services/services';
import Button from '../Button';
import moment from 'moment';

const List = ({ elementType = 'minute' }) => {

  const { type } = useParams();

  const [items, setItems] = useState([]);
  const [buttonLinks, setButtonLinks] = useState({
    addButtonText: 'Add New',
    addButtonLink: "",
    editButtonLink: "",
  });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      let buttonLinks = {}
      switch (type) {
        case 'articles':
          const articles = await getAllArticles();
          data = articles.map(article => ({
            data: article, // Store the entire article object in the data property
            columns: {
            title: <div className="font-bold">{article.title}</div>, 
            date: moment(article.date).format("MMMM Do YYYY h:mm a"),
            text: article.text,
            //image: <img className='w-16 h-16 object-cover rounded-full' src={`${process.env.REACT_APP_HOST}/assets/media/images/articles/${article.images[0]?.image || ""}`} alt={article.title} />,
            },
            searchFilds: ['title', 'description'],
          }));  
          buttonLinks = {
            addButtonText: 'Add Article',
            addButtonLink: "/admin/article",
            editButtonLink: "/admin/article",
          };
          break;
        case 'minutes':
          const minutes = await getAllMinutes();
          data = minutes.map(minute => ({
            data: minute, // Store the entire minute object in the data property
            columns: {
              title: <div className="font-bold">{minute.title}</div>,
              description: minute.description,
              date: moment(minute.timestamp).format("MMMM Do YYYY h:mm a"),
              file: minute.file,
            },
            searchFilds: ['title', 'description', 'date', 'file'],
          }));
          buttonLinks = {
            addButtonText: 'Add Minute',
            addButtonLink: "/admin/minute",
            editButtonLink: "/admin/minute",
          };
          break;
        case 'events':
          const events = await getAllEvents();
          data = events.map(event => ({
            data: event, // Store the entire event object in the data property
            columns: {
              title: <div className="font-bold">{event.title}</div>,
              description: event.description,
              date: moment(event.timestamp).format("MMMM Do YYYY h:mm a"),
              location: event.location,
              contact: event.contact,
              recurring: <div className="capitalize">{event.recurring}</div>,
            },
            searchFilds: ['title', 'description', 'location', 'contact', 'recurring'],
          }));
          buttonLinks = {
            addButtonText: 'Add Event',
            addButtonLink: "/admin/event",
            editButtonLink: "/admin/event",
          };
          break;
        case 'committee':
          const members = await getAllMembers();
          data = members.map(member => ({
            data: member, // Store the entire member object in the data property
            columns: {
              name: <div className="font-bold">{member.name}</div>,
              image: <img 
                className="w-16 h-16 object-cover rounded-full"
                src={member.image} 
                alt={member.name}
              />,
              position: member.position,
              role: member.role,
              order: member.order,    
            },
            searchFilds: ['name', 'position', 'role'],
          }));
          buttonLinks = {
            addButtonText: 'Add Member',
            addButtonLink: "/admin/member",
            editButtonLink: "/admin/member",
          };
          break;
        default:
          break;
      }
      setItems(data);
      setButtonLinks(buttonLinks);
    };

    fetchData();
  }, [type]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item => {
    return Object.values(item.data).some(column => {
      if (typeof column === 'object') return false;
      return column.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const generateTableHeaders = () => {
    if (items.length === 0) return null;
    const keys = Object.keys(items[0].columns).filter(key => key !== 'id');
    return (
      <tr>
        {keys.map((key, index) => (
          <th key={index} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </p>
          </th>
        ))}
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Actions
          </p>
        </th>
      </tr>
    );
  };

  const generateTableRows = () => {
    return filteredItems.map((item, index) => {
      const filteredItem = Object.entries(item.columns).filter(([key]) => key !== 'id');
      return (
        <tr key={index} className="even:bg-blue-gray-50/50">
          {filteredItem.map(([key, value], i) => (
            <td key={i} className="p-4">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {value}
              </p>
            </td>
          ))}
          <td className="p-4 flex gap-2">
            <Button
              onClick={() => navigate(buttonLinks.editButtonLink, { state: { id: item.data.id } })}
            >
              Edit
            </Button>
            {/* <Button
              variant='red'
              onClick={() => deleteMember(item.data.id)}
            >
              Delete
            </Button> */}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="max-w-page w-full">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full mb-4 p-2 border border-gray-300"
      />
      <Button onClick={() => navigate(buttonLinks.addButtonLink)}>{buttonLinks.addButtonText}</Button>
      <table className="min-w-full bg-white mt-4">
        <thead className='mb-4'>
          {generateTableHeaders()}
        </thead>
        <tbody>
          {generateTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default List;