const respUploadEmail = ({ name, email }) => {
  return `Hi User,

This is a Sample Email from ${name}. His/her email is ${email}

Attachment is found below. Thank you.`;
};

module.exports = respUploadEmail;
