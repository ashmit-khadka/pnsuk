import React, { useState, useEffect } from "react";
import axios from "axios";
import Member from "../Member";
import { getAllMembers } from "../../services/services";
import Breadcrumbs from "../Breadcrumbs";

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
    <div className="mb-16">
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
      <Breadcrumbs
        Items={[
          { href: '/', text: 'Home' },
          { href: '/committee', text: 'Committee' }
        ]}
      />

      <h1 className="font-lora mb-8 text-center">Committee</h1>
      {section(
        'Management',
        'The management team is responsible for the day-to-day running of the organisation. They are responsible for the strategic direction of the organisation and ensuring that the organisation meets its objectives.',
        committee.management,
      )}
      {section(
        'Trustees',
        'Our trustees are responsible for the overall governance and strategic direction of the organisation. They work closely with the management team to ensure that the organisation is run effectively and efficiently.',
        committee.trustee,
      )}
      {section(
        'Members',
        'Our members are the lifeblood of the organisation. They are the people who make things happen and ensure that the organisation runs smoothly. Our members are involved in all aspects of the organisation, from fundraising to event planning.',
        committee.members,
      )}
      {section(
        'Volenuteers',
        'Our volunteers are the backbone of the organisation. They are the people who give up their time and energy to help us achieve our goals. Our volunteers are involved in all aspects of the organisation, from event planning to fundraising.',
        committee.volunteers,
      )}
    </div>
  );
}

export default CommitteeScreen;