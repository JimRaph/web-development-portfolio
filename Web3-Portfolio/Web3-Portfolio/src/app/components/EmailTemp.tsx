import * as React from 'react';

interface EmailProps {
  name: string;
  email: string;
  message: string;
}

const Email: React.FC<Readonly<EmailProps>> = ({
  name,
  email,
  message,
}) => (
    <div className="bg-white p-6 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">
      Someone sent you an Email - web3portfolio
    </h1>
    <div className="space-y-2">
      <p className="text-gray-700"><span className="font-semibold">Name:</span> {name}</p>
      <p className="text-gray-700"><span className="font-semibold">Email:</span> {email}</p>
      <p className="text-gray-700"><span className="font-semibold">Message:</span></p>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  </div>
);

export default Email