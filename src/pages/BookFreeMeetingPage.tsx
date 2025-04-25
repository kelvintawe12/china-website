import React from 'react';

const BookFreeMeetingPage = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Book a Free Meeting</h1>
      <p className="mb-6">
        Choose a meeting option that suits you best. We offer flexible virtual or in-person consultations with no pushy sales—just honest advice.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Meeting Options</h2>
      <ul className="list-disc list-inside mb-6">
        <li>15-min Q&A</li>
        <li>30-min Full Review</li>
        <li>Virtual or In-Person</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Schedule Your Meeting</h2>
      <p className="mb-4">
        Use the embedded calendar below to book your free consultation at a time that works for you.
      </p>
      {/* Replace the iframe src with your actual Calendly or Acuity Scheduling embed link */}
      <div className="mt-4">
        <iframe
          src="https://calendly.com/your-scheduling-link"
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Meeting Scheduler"
        ></iframe>
      </div>
    </main>
  );
};

export default BookFreeMeetingPage;
