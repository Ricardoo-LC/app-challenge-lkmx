import React from 'react';

interface CardBasicProps {
  title: string;
  children: React.ReactNode;
}

const CardBasic: React.FC<CardBasicProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <section>{children}</section>
    </div>
  );
};

export default CardBasic;
