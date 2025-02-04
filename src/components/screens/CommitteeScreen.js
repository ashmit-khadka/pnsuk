import React, { useState, useEffect } from "react";
import axios from "axios";
import Member from "../Member";
import { getAllMembers } from "../../services/services";
import Breadcrumbs from "../Breadcrumbs";

const CommitteeScreen = () => {

  const [committee, setCommittee] = useState({
    management: [],
    advisors: [],
    trustee: [],
    members: [],
    volunteers: [],
  });


  useEffect(() => {
    getAllMembers()
      .then((response) => {
        const management = response.filter(member => member.role === 'Management');
        const advisors = response.filter(member => member.role === 'Advisor');
        const trustee = response.filter(member => member.role === 'Trustee');
        const members = response.filter(member => member.role === 'Member');
        const volunteers = response.filter(member => member.role === 'Volunteer');
        setCommittee({
          management,
          advisors,
          trustee,
          members,
          volunteers
        });
      })
  }, []);

  const section = (title, description, people) => (
    <div className="w-full mb-16 flex flex-col items-center">
      <div className="w-full bg-gradient-to-r from-themeDark to-themePrimary text-white p-12 relative mb-12 rounded-lg flex items-center justify-center">
        <div className="max-w-page">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="max-w-page w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    <div className="w-full flex flex-col items-center">
      <div className="max-w-page w-full">
        <Breadcrumbs
          Items={[
            { href: '/', text: 'Home' },
            { href: '/committee', text: 'Committee' }
          ]}
        />
        <h1 className="font-lora mb-8">Committee</h1>
      </div>
      {section(
        'Management',
        'The management team is responsible for the day-to-day running of the organisation. They are responsible for the strategic direction of the organisation and ensuring that the organisation meets its objectives.',
        committee.management,
      )}
      {section(
        'Advisors',
        'Our advisors are experts in their field and provide valuable advice and guidance to the organisation. They help us to make informed decisions and ensure that we are working towards our goals.',
        committee.advisors,
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