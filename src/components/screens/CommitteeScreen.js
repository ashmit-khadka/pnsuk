import React, { useState, useEffect } from "react";
import axios from "axios";
import Member from "../Member";

const CommitteeScreen = () => {

  const [committee, setCommittee] = useState({
    management: [],
    trustee: [],
    members: [],
    volunteers: [],
  });


  useEffect(() => {
    axios.get('http://localhost:3001/members')
      .then((response) => {
        const management = response.data.filter(member => member.role === 'Management');
        const trustee = response.data.filter(member => member.role === 'Trustee');
        const members = response.data.filter(member => member.role === 'Member');
        const volunteers = response.data.filter(member => member.role === 'Volunteer');
        setCommittee({
          management,
          trustee,
          members,
          volunteers
        });
        console.log(response.data);
      })
  }, []);

  const section = (title, description, people) => (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {people.map(person => (
          <Member
            key={person.id}
            name={person.name}
            position={person.position}
            image={person.image}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h1>Committee</h1>
      {section(
        'Management',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        committee.management,
      )}
      {section(
        'Trustees',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        committee.trustee,
      )}
            {section(
        'Members',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        committee.members,
      )}
      {section(
        'Volenuteers',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        committee.volunteers,
      )}
    </div>
  );
}

export default CommitteeScreen;