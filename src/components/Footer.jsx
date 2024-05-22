import React from 'react';

const Footer = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/0${month}/${year}`;
  };

  return (
    <footer>
      <p>{getCurrentDate()}</p>
      <p>Studieguide | 2024</p>
    </footer>
  );
}

export default Footer;

