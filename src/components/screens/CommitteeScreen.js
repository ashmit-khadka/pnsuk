import React, { useState, useEffect } from "react";
import axios from "axios";
import Member from "../Member";
import { getAllMembers } from "../../services/services";

const CommitteeScreen = () => {

  const [committee, setCommittee] = useState({
    management: [],
    trustee: [],
    members: [],
    volunteers: [],
  });


  useEffect(() => {
    getAllMembers()
      .then((response) => {
        const management = response.filter(member => member.role === 'Management');
        const trustee = response.filter(member => member.role === 'Trustee');
        const members = response.filter(member => member.role === 'Member');
        const volunteers = response.filter(member => member.role === 'Volunteer');
        setCommittee({
          management,
          trustee,
          members,
          volunteers
        });
      })
  }, []);

  const section = (title, description, people) => (
    <div>
      <div className="bg-gradient-to-r from-themeDark to-themePrimary text-white p-12 relative mb-12 rounded-lg">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <h1 className="font-lora mb-8 text-center">Committee</h1>
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